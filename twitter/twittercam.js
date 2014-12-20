var tessel = require('tessel');
console.log('Connecting camera...');
var camera = require('camera-vc0706').use(tessel.port['A']);

camera.on('ready', function(err) {
  if (err) return console.log('not ok - error on ready:', err);
  console.log('Camera connected. Setting resolution...');

  camera.setResolution('vga', function(err) {
    if (err) return console.log('not ok - error setting resolution:', err);
    console.log('Resolution set. Setting compression...');

    camera.setCompression(100, function(err) {
      if (err) return console.log('not ok - error setting compression:', err);
      console.log('Compression set.');

      console.log('Camera ready. Press Config button to take a picture.');

      tessel.led[0].high();
      tessel.button.on('press', function () {
        console.log('Taking picture...');
        camera.setCompression(100, function(err) {
          camera.takePicture(function(err, image) {
            if (err) return console.log('Error taking Picture:', err);
            console.log('Picture taken. Posting...');

            process.sendfile('test.jpg', image);
            tessel.led[0].low();
          });
      });
      });
    });
  });
});

camera.on('error', function (err) {
  console.log('Error: ', err);
});