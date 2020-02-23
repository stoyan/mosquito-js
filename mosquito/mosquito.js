
let context = new (window.AudioContext || window.webkitAudioContext)();

let oscillator = context.createOscillator();
oscillator.type = "sawtooth";
oscillator.frequency.setValueAtTime(750, context.currentTime);

const gainNode = context.createGain();
gainNode.connect(context.destination);

oscillator.connect(gainNode);

let isStopped = true
let hasBeenStarted = false

let clapAudio

// Its annoying how much logic is in here. I just want to say stop and start
document.querySelector("button").onclick = () => {
  if( isStopped ) {
    if( !hasBeenStarted ) {
      clapAudio = new Audio('./assets/clap.mp3');
      oscillator.start();
      hasBeenStarted = true
    } else {
      oscillator.connect(gainNode);
    }
  } else {
    clapAudio.play()
    oscillator.disconnect(gainNode);
  }
  isStopped = !isStopped
};