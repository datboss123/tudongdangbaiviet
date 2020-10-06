const fetch = require("node-fetch");
const snoowrap = require("snoowrap");
require("dotenv").config();
var se = "K5wPVjHvEZs0FQ";
var so = "urnhKaCrsP1T72NmCGrC-do8VWw";
var s1 = "588567144325-ewmzqfQOxOpTeCT3daejNjMeOCM";
var s2="EAAEZBTPyaLYMBAPwKC7PJDZBebsdKpHl4gJTMKWpDDrkV0V9KLNmA3dwk5IYVyXUJ9bxqnmdr8VcU9eIqHo7g4BI06c6SZAlIlVuaMoWMAaxt6hEIHVtnAxhjE5VzBNGuDH4OwfjQwQFUIUPOm6C8ciPlJYpVAsghwJwYpxZAu2tm2N3CWZAnoi5VJ9eEgdVZB3a1K7Hk5AwZDZD";

(async () => {
  try {
    // Config Snoowrap
    
    const r = new snoowrap({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      clientId: se,
      clientSecret:so,
      refreshToken: s1
    });

    // Get Sub Reddit
    const subReddit = r.getSubreddit("listentothis");

    // Get Random post
    const randomPost = await subReddit.getRandomSubmission();
   
    // Post Status
    
    const access_token = s2;
    const messageData = {
      url: randomPost.url,
      author: randomPost.author.name,
      title: randomPost.title
    };
    const messageTemplate = `Listen and enjoy to this song ${messageData.title} | Credit: ${messageData.author}
  `;
    const url = `https://graph.facebook.com/v8.0/105047911374003/feed?message=${messageTemplate}&link=${messageData.url}&access_token=${access_token}`;
    const postStatus = await fetch(url, {
      method: "POST"
    });
    const response = await postStatus.json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
