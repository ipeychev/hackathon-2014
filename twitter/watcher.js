var Twitter = require('node-twitter');

var twitterRestClient = new Twitter.RestClient(
    'gOCCeomrFMI7lPFDVfXiJfmdt',
    'BDTeUTo8NLtF9AxRaoHyWGQsNDyx4X8zKaJe4iDAHzIalcB1Gr',
    '2936309172-PGEQ8LNtxL1AUAq5ntN9OhstlFOhN445V1Z4oBQ',
    'Qo1YiGIMybZhS4hosiOWdFjYRWYX7PSe0QXpH1rSTetsA'
);

var fs = require('fs');
var path = require('path');
var request = require('request');
var FormData = require('form-data');
var utf8 = require('utf8');

var postImage = function(image) {
    var status = Math.random() + ' from #liferayhackday';

    console.log('posting' + image + ' - ' + status);
    
    twitterRestClient.statusesUpdateWithMedia
    (
        {
            'status': 'Posting a tweet w/ attached media - ' + Math.random(),
            'media[]': 'assets/' + image
        },
        function(error, result) {
            if (error)
            {
                console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
            }

            if (result)
            {
                console.log(result);
            }
        }
    );
}

fs.watch(path.normalize('assets'), function(event, filename) {
    postImage(filename);
});