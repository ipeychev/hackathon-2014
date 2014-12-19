var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var relaylib = require('relay-mono');

var relay = relaylib.use(tessel.port['D']);
var ambient = ambientlib.use(tessel.port['C']);

ambient.on('ready', function () {
 // Get points of light and sound data.
    setInterval( function () {
        ambient.getLightLevel( function(err, ldata) {
            ambient.getSoundLevel( function(err, sdata) {
                console.log('Light level:', ldata.toFixed(8), ' ', 'Sound Level:', sdata.toFixed(8));
            });
        });
    }, 200); // The readings will happen every .5 seconds unless the trigger is hit

    ambient.setLightTrigger(0.5);

    // Set a light level trigger
    // The trigger is a float between 0 and 1
    ambient.on('light-trigger', function(data) {
        console.log('Our light trigger was hit:', data);

        // Clear the trigger so it stops firing
        ambient.clearLightTrigger();

        //After 1.5 seconds reset light trigger
        setTimeout(function () {
            ambient.setLightTrigger(0.5);

        }, 200);
    });

    // Set a sound level trigger
    // The trigger is a float between 0 and 1
    ambient.setSoundTrigger(0.1);

    ambient.on('sound-trigger', function(data) {
        console.log('Something happened with sound: ', data);

        relay.toggle(1, function toggleOneResult(err) {
            if (err) {
                console.log('Error toggling 1', err);
            }
        });

        // Clear it
        ambient.clearSoundTrigger();

        //After .2 seconds reset sound trigger
        setTimeout(function () {
            ambient.setSoundTrigger(0.1);
        }, 200);

    });
});

ambient.on('error', function (err) {
  console.log(err);
});