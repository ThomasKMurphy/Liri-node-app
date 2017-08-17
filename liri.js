var request = require('request');

var fs = require('fs');

var action = process.argv[2];
var value = process.argv[3];
var result = '';

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
        console.log('sewerWeasel: ' + tweets[i].text);
        console.log('Tweeted On: ' + tweets[i].created_at);
        fs.appendFile('log.txt', ('sewerWeasel: ' + tweets[i].text + ' | ' + tweets[i].created_at + ' \n'), (err) => {
          if (err) {
            return console.log(err);
          }
        });
      }
    };
  })
};

// Spotify
// Client ID
// ea48b89926cb46dea4abc0f5712eb362
// Client Secret
// 9cc83f9b1417415fba0a33868a7819a0
