const urlParams = new URLSearchParams(window.location.search);
const tokenId = urlParams.get("tokenId");
const chainId = urlParams.get("chainId");

let drums = [];
let bases = [];
let harmony = [];
let voices = [];
let example;
let filter;
let isPlaying = false;

function setup() {
  for (let i = 1; i <= 4; i++) {
    drums[i] = loadSound(`drums/${i}.wav`);
  }
  for (let i = 1; i <= 8; i++) {
    bases[i] = loadSound(`base/${i}.wav`);
  }
  for (let i = 1; i <= 8; i++) {
    harmony[i] = loadSound(`harmony/${i}.wav`);
  }
  for (let i = 1; i <= 8; i++) {
    voices[i] = loadSound(`voices/${i}.wav`);
  }
  example = loadSound("example.mp3");
  createCanvas(720, 720);
  background(0, 0, 0);
}

const drumPattern = [
  (Number(tokenId) % 4) + 1,
  ((Number(tokenId) % 7) % 4) + 1,
  ((Number(tokenId) % 9) % 4) + 1,
  ((Number(tokenId) % 13) % 4) + 1,
];
const basePattern = [
  (Number(tokenId) % 8) + 1,
  ((Number(tokenId) % 11) % 8) + 1,
  ((Number(tokenId) % 13) % 8) + 1,
  ((Number(tokenId) % 19) % 8) + 1,
];
const harmonyPattern = [
  ((Number(tokenId) % 18) % 8) + 1,
  ((Number(tokenId) % 23) % 8) + 1,
  ((Number(tokenId) % 17) % 8) + 1,
  (Number(tokenId) % 8) + 1,
];
const voicePattern = [
  ((Number(tokenId) % 15) % 8) + 1,
  ((Number(tokenId) % 26) % 8) + 1,
  ((Number(tokenId) % 17) % 8) + 1,
  (Number(tokenId) % 8) + 1,
];

const freq = Number(chainId);
const res = Number(chainId) % 20;

function mousePressed() {
  example.amp(0);
  example.play();
  filter = new p5.LowPass();
  filter.set(freq, res);
  for (let i = 0; i < 4; i++) {
    example.addCue(drums[1].duration() * i, onPlayEndDrums, drumPattern[i]);
  }
  for (let i = 0; i < 4; i++) {
    example.addCue(drums[1].duration() * i, onPlayEndBases, basePattern[i]);
  }
  for (let i = 0; i < 4; i++) {
    example.addCue(
      drums[1].duration() * i,
      onPlayEndHarmony,
      harmonyPattern[i]
    );
  }
  for (let i = 0; i < 4; i++) {
    example.addCue(drums[1].duration() * i, onPlayEndVoices, voicePattern[i]);
  }
  isPlaying = true;
}

function onPlayEndDrums(value) {
  drums[value].connect(filter);
  drums[value].play();
}

function onPlayEndBases(value) {
  bases[value].connect(filter);
  bases[value].play();
}

function onPlayEndHarmony(value) {
  harmony[value].connect(filter);
  harmony[value].play();
}

function onPlayEndVoices(value) {
  voices[value].connect(filter);
  voices[value].play();
}
