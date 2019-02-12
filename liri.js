require("dotenv").config();
//requires
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
//var env = require("./env");
//var filename = './random.txt';
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var inquirer = require('inquirer');
var omdb = keys.omdb.id;
//user arguements 
// var userCmd = process.argv[2]
// var secondCommand = process.argv.slice(3).join(' ');
// getCmd(userCmd)
//CMD Keys: 
var movieCmd = 'movie-this';
var bandCmd = 'concert-this';
var spotifyCmd = 'spotify-this-song';
var defaultCmd = 'do-what-it-says';




//commands
function getCmd(userCmd, secondCommand) {
    switch (userCmd) {
        case bandCmd:
            console.log('Loading Concerts....')
            bandsapi(secondCommand)
            break;
        case spotifyCmd:
            console.log('this is a song');
            spotifyThis(secondCommand)
            break;
        case movieCmd:
            console.log('Loading Movie...')
            omdbapi(secondCommand)
            break;
        case defaultCmd:
            console.log('boring')
            break;
    }
};

// getCmd(userCmd);

//fetch spotify
function spotifyThis(secondCommand) {
    let query = secondCommand != "" ? secondCommand : "The end";
    spotify
        .search({ type: 'track', query: query, limit: 1 })
        .then(function (response) {
            let song = response.tracks.items;
            console.log(song)
            // let songResponse = [
            //     'Artist: ' + song.album.artists[0].name,
            //     'Song Name: ' + song.album.name,
            //     'Song Preview: ' + song.ablum.spotify,
            // ]
            // console.log(songResponse)
        })
        .catch(function (err) {
            console.log(err);
        });

}


//movie-this
function omdbapi(secondCommand) {
    var ombdURL = `http://www.omdbapi.com/?t=${secondCommand}&y=&plot=short&apikey=${omdb}`;
    //console.log(ombdURL)
    axios.get(ombdURL).then(
        function (response) {
            let movie = response.data;
            //console.log(movie);
            let movieResponse = [
                'Title:' + movie.Title,
                'Year: ' + movie.Year,
                'IMDB Rating: ' + movie.imdbRating,
                'Rotten Tomatoes: ' + movie.Ratings[1].Value,
                'Country: ' + movie.Country,
                'Language: ' + movie.Language,
                'Plot: ' + movie.Plot,
                'Actors: ' + movie.Actors,
            ];
             console.log(movieResponse);
        }
    );
};
//Concert - This
function bandsapi(secondCommand) {
    var bandsURL = `https://rest.bandsintown.com/artists/${secondCommand}/events?app_id=codingbootcamp`;
   // console.log(bandsURL)
    axios.get(bandsURL).then(
        function (response) {
            let bands = response.data;
          //  console.log(bands)
            for (let i = 0; i < bands.length; i++) {
                let bandEvents = bands[i];
                let concerts = [
                    'Name of the venue: ' + bandEvents.venue.name,
                    'Venue location: ' + bandEvents.venue.city + bandEvents.venue.region,
                    'Date of the Event: ' + moment(bandEvents.venue.datetime).format("MM/DD/YYYY")
                ]
                console.log(concerts);

            }
        }
    )
};

//inquirer
inquirer
    .prompt([
        // Here we give the user a list to choose from.
        {
            type: "list",
            message: "What do you want to search for today?",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "userCmd"
        },
        // Here we create a basic text prompt.
        {
            type: "input",
            message: "What would you like to search for?",
            name: "secondCommand"
        },
        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ])
    .then(function (userAnswer) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (userAnswer.confirm) {
            console.log('userCmd in inqurire ' + userAnswer.userCmd);
            console.log('secondCommand from inqurier ' + userAnswer.secondCommand);
            userCmd = userAnswer.userCmd;
            secondCommand = userAnswer.secondCommand;
            getCmd(userCmd, secondCommand);
        }
        else {
            console.log("That's ok, come back when you know what you want.");
        }
    });