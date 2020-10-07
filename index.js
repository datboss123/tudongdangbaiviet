const fetch = require("node-fetch");
const snoowrap = require("snoowrap");
require("dotenv").config();

  var se = "K5wPVjHvEZs0FQ"; // clientID
  var so = "urnhKaCrsP1T72NmCGrC-do8VWw"; //clientSecret
  var s1 = "588567144325-ewmzqfQOxOpTeCT3daejNjMeOCM"; // refreshtoken
  var s2="EAAEZBTPyaLYMBAMhYIO2KuqKtXP0AVUwhi2dPsRs6RbJuZCfXNT6mm2DsYK2qcVKYHaMCx5bRYi4ec4ZBWJkDPiOE0i0fZBT5RyV4Vstdz9c3PzdWRzwVClx5iMrQnygZCA9CB1FfxVE9ZBKMz93czUaQrdQupLa6H0DHF6ZC3VdgZDZD";
  //access token
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
      const url2 = `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=349975353109891&client_secret=10f326739451cccdfadf71ec5fe93024&fb_exchange_token=${access_token}`;
      const check = await fetch(url2, {method: "GET"});
      const checkresponse = await check.json();
      
      const messageTemplate = `Listen and enjoy to this song ${messageData.title} | Credit: ${messageData.author}
    `;
      const url = `https://graph.facebook.com/v8.0/105047911374003/feed?message=${messageTemplate}&link=${messageData.url}&access_token=${checkresponse.access_token}`;
      const postStatus = await fetch(url, {
        method: "POST"
      });
      const response = await postStatus.json();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  })();


