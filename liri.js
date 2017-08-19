var fs = require('fs');
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case 'my-tweets':
  tweets();
  break;
  case 'spotify-this-song':
  spotify();
  break;
  case 'movie-this':
  movie();
  break;
  case 'do-what-it-says':
  says();
  break;
}

function tweets() {
  var Twitter = require('twitter');
  var keys = require('./keys.js');
  var client = new Twitter(keys.twitterKeys);
  var params = {
    screen_name: 'sewer_weasel',
    count: 10
  };
  client.get('statuses/user_timeline', params, (err, tweets, response) => {
    if (!err && response.statusCode === 200) {
      console.log('Last 10 Tweets:')
      for (i = 0; i < tweets.length; i++) {
        console.log('==================================================');
        console.log('sewerWeasel: ' + tweets[i].text);
        console.log('Tweeted On: ' + tweets[i].created_at);
        console.log('==================================================');
        fs.appendFile('log.txt', ('sewerWeasel: ' + tweets[i].text + ' | ' + tweets[i].created_at + ' \n'), (err) => {
          if (err) {
            return console.log(err);
          }
        });
      }
    };
  });
};

function spotify() {
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
    id: 'ea48b89926cb46dea4abc0f5712eb362',
    secret: '9cc83f9b1417415fba0a33868a7819a0'
  });
  spotify.search({ type: 'track', query: value, limit: 5 }, (err, data) => {
      console.log('==================================================');
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
      console.log('==================================================');
      fs.appendFile(
        'log.txt', 
        ('\nArtist: ' + 
          data.tracks.items[0].artists[0].name + 
          '\nSong: ' + data.tracks.items[0].name + 
          '\nPreview Link: ' + data.tracks.items[0].preview_url + 
          '\nAlbum: ' + data.tracks.items[0].album.name + 
          '\n'), (err) => {
        if (err) {
          return console.log(err);
        }
      });
  });
};

function movie() {
  var request = require('request');
  // if (value === null) {
  //   value = 'Mr. Nobody';
  // }
  request('http://www.omdbapi.com/?t=' + value + '&tomatoes=true&r=json', (err, response, body) => {
    // if (!error && response.statusCode == 200) {
      console.log('==================================================');
      console.log('Title: ' + JSON.parse(body).Title);
      console.log('Year: ' + JSON.parse(body).Year);
      console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
      console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
      console.log('Country: ' + JSON.parse(body).Country);
      console.log('Language: ' + JSON.parse(body).Language);
      console.log('Plot: ' + JSON.parse(body).Plot);
      console.log('Actors: ' + JSON.parse(body).Actors);
      console.log('==================================================');
      fs.appendFile('log.txt', ('\nTitle: ' + jsonBody.Title + '\r\nYear: ' + jsonBody.Year + '\r\nIMDb Rating: ' + jsonBody.imdbRating + '\r\nCountry: ' + jsonBody.Country + '\r\nLanguage: ' + jsonBody.Language + '\r\nPlot: ' + jsonBody.Plot + '\r\nActors: ' + jsonBody.Actors + '\r\nRotten Tomatoes Rating: ' + jsonBody.tomatoRating + '\r\nRotten Tomatoes URL: ' + jsonBody.tomatoURL + '\n'), (err) => {
        if (err) {
          return console.log(err);
        }
      });
    })
};

// function movie() {
//   var request = require("request");
//   var nodeArgs = process.argv;
//   var movieName = "";
//   for (var i = 2; i < nodeArgs.length; i++) {
//     if (i > 2 && i < nodeArgs.length) {
//       movieName = movieName + "+" + nodeArgs[i];
//     } else {
//       movieName += nodeArgs[i];
//     }
//   }
//   var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
//   console.log(queryUrl);
//   request(queryUrl, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       console.log('==================================================');
//       console.log('Title: ' + JSON.parse(body).Title);
//       console.log('Year: ' + JSON.parse(body).Year);
//       console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
//       console.log('Country: ' + JSON.parse(body).Country);
//       console.log('Language: ' + JSON.parse(body).Language);
//       console.log('Plot: ' + JSON.parse(body).Plot);
//       console.log('Actors: ' + JSON.parse(body).Actors);
//       console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating);
//       console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
//       console.log('==================================================');
//       fs.appendFile('log.txt', ('\nTitle: ' + JSON.parse(body).Title + '\r\nYear: ' + JSON.parse(body).Year + '\r\nIMDb Rating: ' + JSON.parse(body).imdbRating + '\r\nCountry: ' + JSON.parse(body).Country + '\r\nLanguage: ' + JSON.parse(body).Language + '\r\nPlot: ' + JSON.parse(body).Plot + '\r\nActors: ' + JSON.parse(body).Actors + '\r\nRotten Tomatoes Rating: ' + JSON.parse(body).tomatoRating + '\r\nRotten Tomatoes URL: ' + JSON.parse(body).tomatoURL + '\n'), (err) => {
//         if (err) {
//           return console.log(err);
//         }
//       });
//     }
//   });
// }