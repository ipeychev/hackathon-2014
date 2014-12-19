/**
 * Simple example for tweeting from Tessel
 */
var Twitter = require('twitter');

var twitterHandle = '@lfrtessel';

// Enter the oauth key and secret information
var client = new Twitter({
    consumer_key: '9oA8SyHcaCkUxmHI8e2vRvXA5',
    consumer_secret: 'Uy25J0jmLqqEoPiQDHm2q9Y9zekSQe8Fsk9s7mFnByKcqkJnyF',
    access_token_key: '2936309172-PGEQ8LNtxL1AUAq5ntN9OhstlFOhN445V1Z4oBQ',
    access_token_secret: 'Qo1YiGIMybZhS4hosiOWdFjYRWYX7PSe0QXpH1rSTetsA'
});

client.post('statuses/update', {status: process.argv[2], function(error, params, response) {
    if (error) console.log(error);
});