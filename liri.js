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

//user arguements 
var userCmd = process.argv[2]
var secondCommand = process.argv.slice(3).join(' ');
getCmd(userCmd)
//CMD Keys: 
var movieCmd = 'movie-this';
var bandCmd = 'concert-this';
var spotifyCmd = 'spotify-this-song';
var defaultCmd = 'do-what-it-says';
var ombdURL = `http://www.omdbapi.com/?t=${secondCommand}&y=&plot=short&apikey=2973baab`;
var bandsURL = `https://rest.bandsintown.com/artists/${secondCommand}/events?app_id=codingbootcamp`;


//commands
function getCmd(userCmd) {
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

getCmd(userCmd);

//fetch spotify
function spotifyThis(secondCommand) {
   
spotify
.search({ type: 'track', query: secondCommand, limit: 1 })
.then(function(response) {
    console.log(response.data);
  })
  .catch(function(err) {
    console.log(err);
  });

}


//movie-this
function omdbapi(secondCommand) {
    axios.get(ombdURL).then(
        function (response) {
            let movie = response.data;
            // console.log(movie);
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
    axios.get(bandsURL).then(

        function (response) {
            let bands = response.data;
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