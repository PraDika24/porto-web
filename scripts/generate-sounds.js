// Script to generate simple WAV sound files for SFX
// Run: node scripts/generate-sounds.js

const fs = require('fs');
const path = require('path');

function generateWav(frequency, duration, type = 'sine', volume = 0.3) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // Mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 5); // exponential decay
    let sample;
    if (type === 'square') {
      sample = Math.sign(Math.sin(2 * Math.PI * frequency * t)) * volume * envelope;
    } else {
      sample = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    }
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }
  return buffer;
}

function generateClick(frequency, duration, type = 'sine', volume = 0.3) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 20);
    const sample = Math.sin(2 * Math.PI * frequency * t) * volume * envelope;
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }
  return buffer;
}

const sounds = [
  { name: 'open.wav', frequency: 600, duration: 0.15, type: 'square', volume: 0.25 },
  { name: 'close.wav', frequency: 300, duration: 0.15, type: 'square', volume: 0.25 },
  { name: 'click.wav', frequency: 800, duration: 0.08, type: 'sine', volume: 0.3 },
  { name: 'theme.wav', frequency: 440, duration: 0.2, type: 'sine', volume: 0.25 },
];

const outDir = path.join(__dirname, '..', 'public', 'assets', 'sounds');

sounds.forEach(({ name, frequency, duration, type, volume }) => {
  const buf = generateWav(frequency, duration, type, volume);
  fs.writeFileSync(path.join(outDir, name), buf);
  console.log(`Generated: ${name}`);
});

console.log('All sound files generated!');
