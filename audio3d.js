var audioContext = new AudioContext();

// Create a (1st-order Ambisonic) Songbird scene.
var songbird = new Songbird(audioContext);

// Send songbird's binaural output to stereo out.
songbird.output.connect(audioContext.destination);

// Set room acoustics properties.
var dimensions = {
  width: 10.1,
  height: 10.5,
  depth: 25.4,
};

var materials = {
  left: 'brick-bare',
  right: 'curtain-heavy',
  front: 'marble',
  back: 'glass-thin',
  down: 'grass',
  up: 'transparent',
};
songbird.setRoomProperties(dimensions, materials);

// Create an audio element. Feed into audio graph.
var sound = new Audio("sound.wav");
var MediaElementSourc = audioContext.createMediaElementSource(sound);

// Create a Source, connect desired audio input to it.
let source = songbird.createSource();
MediaElementSourc.connect(source.input);

// The source position is relative to the origin
// (center of the room).
source.setPosition(-0.707, -0.707, 10);

//source.setPosition(x, y, z);
//songbird.setListenerPosition(x, y, z);
//source.setOrientation(forward_x, forward_y, forward_z, up_x, up_y, up_z);
//songbird.setListenerOrientation(forward_x, forward_y, forward_z, up_x, up_y, up_z);

// Playback the audio.
sound.play();
