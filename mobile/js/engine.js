// Storm Royale Mobile - rendering + main loop.
// A fixed 60 Hz simulation step with interpolation-free rendering, and a quality system that lowers the
// render resolution automatically when the frame rate drops (for low-end tablets and Chromebooks).
import * as THREE from "../vendor/three.module.min.js";

export const QUALITY = {
  low: { scale: 0.55, shadows: false, trees: 0.5, fog: true },
  medium: { scale: 0.8, shadows: false, trees: 0.8, fog: true },
  high: { scale: 1.0, shadows: true, trees: 1.0, fog: true },
};

export class Engine {
  constructor(canvas, settings) {
    this.canvas = canvas;
    this.settings = settings;
    this.renderer = new THREE.WebGLRenderer({
      canvas, antialias: false, powerPreference: "high-performance",
      preserveDrawingBuffer: new URLSearchParams(location.search).has("snap"),
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.dyn = 1.0;              // dynamic resolution multiplier
    this.mode = null;            // the running game mode (has update(dt), render())
    this.fixed = 1 / 60;
    this._acc = 0;
    this._last = performance.now();
    this._fpsT = 0;
    this._frames = 0;
    this.fps = 60;
    this.applyQuality();
    addEventListener("resize", () => this.resize());
    this.resize();
    requestAnimationFrame((t) => this._frame(t));
  }

  get q() { return QUALITY[this.settings.quality] || QUALITY.medium; }

  applyQuality() {
    this.renderer.shadowMap.enabled = this.q.shadows;
    this.resize();
  }

  resize() {
    const w = innerWidth, h = innerHeight;
    const pr = Math.min(devicePixelRatio || 1, 2) * this.q.scale * this.dyn;
    this.renderer.setPixelRatio(Math.max(0.35, pr));
    this.renderer.setSize(w, h, false);
    if (this.mode && this.mode.camera) {
      this.mode.camera.aspect = w / h;
      this.mode.camera.updateProjectionMatrix();
    }
  }

  setMode(mode) {
    if (this.mode && this.mode.dispose) this.mode.dispose();
    this.mode = mode;
    this.resize();
  }

  _frame(t) {
    requestAnimationFrame((tt) => this._frame(tt));
    let dt = (t - this._last) / 1000;
    this._last = t;
    if (dt > 0.25) dt = 0.25;               // tab was hidden: don't try to catch up for ages
    // FPS meter + dynamic resolution
    this._fpsT += dt; this._frames++;
    if (this._fpsT >= 1) {
      this.fps = this._frames / this._fpsT;
      this._fpsT = 0; this._frames = 0;
      if (this.settings.autoRes) {
        const prev = this.dyn;
        if (this.fps < 40) this.dyn = Math.max(0.55, this.dyn - 0.1);
        else if (this.fps > 57) this.dyn = Math.min(1.0, this.dyn + 0.05);
        if (prev !== this.dyn) this.resize();
      }
    }
    if (!this.mode) return;
    this._acc += dt;
    let steps = 0;
    while (this._acc >= this.fixed && steps < 5) {
      this.mode.update(this.fixed);
      this._acc -= this.fixed;
      steps++;
    }
    if (steps === 5) this._acc = 0;
    if (this.mode.frame) this.mode.frame(dt);
    if (this.mode.scene && this.mode.camera) this.renderer.render(this.mode.scene, this.mode.camera);
  }
}

// ---- small helpers shared by the modes ----
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
export function angleLerp(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
export const rand = (a, b) => a + Math.random() * (b - a);
export { THREE };
