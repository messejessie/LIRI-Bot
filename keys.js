var keys = require("./keys.js");
//console.log('this is loaded');
require("dotenv").config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.omdb = {
    id:process.env.OMBD_KEY
};