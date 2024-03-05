let synth = new Tone.PolySynth(Tone.FMSynth);
let bend = new Tone.PitchShift();

bend.pitch = 0;
synth.connect(bend);
bend.toDestination();

let bgImage;
let playButton;
let sequence = [
  {note: '6', duration: '0.9'}, {note: '3', duration: '1.1'}, {note: '3', duration: '0.25'}, 
  {note: '4', duration: '0.25'}, {note: '5', duration: '0.4'}, {note: '4', duration: '0.4'}, 
  {note: '3', duration: '0.25'}, {note: '2', duration: '0.4'}, {note: '3', duration: '0.4'}, 
  {note: '4', duration: '0.3'}, {note: '6', duration: '0.9'}, {note: '9', duration: '1.1'}, 
  {note: '1', duration: '0.25'}, {note: '2', duration: '0.25'}, {note: '3', duration: '0.4'}, 
  {note: '4', duration: '0.4'}, {note: '3', duration: '0.25'}, {note: '2', duration: '0.4'}, 
  {note: '8', duration: '0.3'}, {note: '7', duration: '0.3'}, {note: '6', duration: '0.9'}, 
  {note: '3', duration: '1.1'}
];

function preload() {
  bgImage = loadImage('assets/PucciPraise.jpg');
}

function setup() {
  createCanvas(720, 403);
  textSize(19);
  textAlign(CENTER, CENTER);
  
  pitchSlider = createSlider(-12, 12, -12, 0.1);
  pitchSlider.position(290, 350);
  pitchSlider.mouseMoved(() => bend.pitch = pitchSlider.value());

  playButton = createButton('Press for a Golden Experience :)');
  playButton.position(250, 10);
  playButton.mousePressed(playSequence);
}

function playSequence() {
  let time = 0; 
  sequence.forEach(item => {
    Tone.Transport.scheduleOnce(time => {
      synth.triggerAttack(notes[item.note]);
      Tone.Transport.scheduleOnce(time => {
        synth.triggerRelease(notes[item.note]);
      }, `+${item.duration}`);
    }, `+${time}`);
    time += parseFloat(item.duration); 
  });
  Tone.Transport.start();
}

let notes = {
  '1': 'C4',
  '2': 'D4',
  '3': 'E4',
  '4': 'F4',
  '5': 'G4',
  '6': 'A4',
  '7': 'B4',
  '8': 'C5',
  '9': 'D5'
};

function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased() {
  let playNotes = notes[key];
  synth.triggerRelease(playNotes);
}

function draw() {
  background(bgImage);
  text('Press 1-9 to unleash the will of God. Adjust slider to make God inhale helium (pitch).', width / 2, 386);
}
