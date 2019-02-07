//requires
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var filename = './random.txt';
var spotify = require('node-spotify-api');
//user arguements 
var userCommand = process.argv[2]
var secondCommand = process.argv[3]
//fetch spotify keys
var spotify = new Spotify(keys.spotify);

//function: 


