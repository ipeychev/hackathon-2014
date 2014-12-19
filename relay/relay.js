var tessel = require('tessel');
var relaylib = require('relay-mono');

var relay = relaylib.use(tessel.port['D']);

// Wait for the module to connect
relay.on('ready', function relayReady() {
  console.log('Ready! Toggling relay 1...');

  setInterval(function toggle() {
    // Toggle relay channel 1
    relay.toggle(1, function toggleOneResult(err) {
        if (err) {
            console.log('Error toggling 1', err);
        }
    });
  }, 500); // Every 2 seconds (2000ms)
});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
    console.log('latch on relay channel ' + channel + ' switched to', value);
});