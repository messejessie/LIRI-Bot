//requires

var fs = require("fs");
var keys = require("./keys.js");
require("dotenv").config();
var filename = './random.txt';
var spotify = require('node-spotify-api');
//user arguements 
var userCmd = process.argv[2]
var secondCommand = process.argv[3]
getCmd(userCmd)
//CMD Keys: 
var movieCmd = 'movie-this';
var bandCmd = 'concert-this';
var spotifyCmd = 'spotify-this-song';
var defaultCmd = 'do-what-it-says';

//fetch spotify keys
// var spotify = new Spotify(keys.spotify);

//spotify function: 

// spotify pending 

//commands
function getCmd(userCmd) {
    switch (userCmd) {
        case bandCmd:
            console.log('this is the band')
            break;
        case spotifyCmd:
            console.log('this is a song');
            break;
        case movieCmd:
            console.log('this is a movie')
            break;
        case defaultCmd:
            console.log('boring')
            break;
    }
};

getCmd(userCmd);

