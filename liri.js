var request = require('request');
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
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error && response.statusCode === 200) {
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
  // if (value === null) {
  //   output = "The Sign";
  // }
  spotify.search({ type: 'track', query: value }, (err, data) => {
    // if (!error && response.statusCode === 200) {
      console.log('==================================================');
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
      console.log('==================================================');
      if (err) {
        return console.log(err);
      }
    // }
  });
};
