var keys = require('./keys.js');
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
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
  var params = {
    screen_name: 'sewer_weasel', 
    count: 10
  };
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error && response.statusCode === 200) {
      fs.appendFile('terminal.log', ('================ ENTRY LOG ================\n'), (err) => {
        if (err) throw error;
      });
      console.log(' ');
      console.log('Last 10 Tweets:')
      for (i = 0; i < tweets.length; i++) {
        var number = i + 1;
        console.log(' ');
        console.log([i + 1] + '. ' + tweets[i].text);
        console.log('Created on: ' + tweets[i].created_at);
        console.log(' ');
        fs.appendFile('terminal.log', (number + '. Tweet: ' + tweets[i].text + '\nCreated at: ' + tweets[i].created_at + ' \n'), (err) => {
          if (err) throw error;
        });
      }
      fs.appendFile('terminal.log', ('===========================================\n \n'), (err) => {
        if (err) throw error;
      });
    }
  });
}
