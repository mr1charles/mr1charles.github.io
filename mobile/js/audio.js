// Tiny synthesized sound effects (Web Audio, no files). Audio starts after the first tap/click.
let ctx = null;
let master = null;
export let volume = 0.7;

export function unlock() {
  if (ctx) { if (ctx.state === "suspended") ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = volume;
  master.connect(ctx.destination);
}

export function setVolume(v) {
  volume = v;
  if (master) master.gain.value = v;
}

function tone(freq, dur, type = "sine", gain = 0.3, slideTo = null, delay = 0) {
  if (!ctx) return;
  const t = ctx.currentTime + delay;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

let noiseBuf = null;
function noise(dur, gain = 0.3, lp = 2000, delay = 0) {
  if (!ctx) return;
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const t = ctx.currentTime + delay;
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = lp;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f).connect(g).connect(master);
  s.start(t);
  s.stop(t + dur + 0.02);
}

export const sfx = {
  kick: (p = 1) => { tone(140 * p, 0.18, "sine", 0.5, 50); noise(0.08, 0.25, 1800); },
  pass: () => { tone(220, 0.1, "sine", 0.3, 120); },
  jump: () => tone(300, 0.15, "triangle", 0.15, 600),
  whistle: () => { tone(2400, 0.35, "square", 0.08, 2300); tone(2600, 0.25, "square", 0.05, 2500, 0.4); },
  goal: () => { noise(1.4, 0.35, 900); for (let i = 0; i < 4; i++) tone(520 + i * 130, 0.25, "triangle", 0.18, null, i * 0.12); },
  shot: (k = 1) => { noise(0.12 * k, 0.35, 3000); tone(90, 0.12, "square", 0.12, 50); },
  hit: () => tone(1200, 0.05, "square", 0.12, 800),
  pickup: () => { tone(660, 0.08, "triangle", 0.2); tone(990, 0.1, "triangle", 0.2, null, 0.07); },
  hurt: () => tone(180, 0.2, "sawtooth", 0.15, 90),
  click: () => tone(700, 0.05, "sine", 0.15, 500),
  win: () => { for (let i = 0; i < 5; i++) tone(440 * Math.pow(1.26, i), 0.3, "triangle", 0.2, null, i * 0.12); },
  lose: () => { for (let i = 0; i < 3; i++) tone(330 / Math.pow(1.2, i), 0.35, "triangle", 0.2, null, i * 0.18); },
  storm: () => tone(90, 1.2, "sawtooth", 0.1, 60),
};
