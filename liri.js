//requires

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
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
var ombdURL = `http://www.omdbapi.com/?t=${secondCommand}&y=&plot=short&apikey=2973baab`;
var bandsURL = `https://rest.bandsintown.com/artists/"${secondCommand}"/events?app_id=codingbootcamp`
//fetch spotify keys
//var spotify = new Spotify(keys.spotify);

//spotify function: 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data); 
//   });

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
            console.log('Loading Movie...')
            break;
        case defaultCmd:
            console.log('boring')
            break;
    }
};

getCmd(userCmd);

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
console.log(bandsURL);
// axios.get(bandsURL).then(
//     function(response) {
//         let band = response.data;
//         console.log(band);
//     }
// )