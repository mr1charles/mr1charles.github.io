// On-screen touch controls, laid out for iPad landscape and scaled for phones:
//   left thumb  - floating joystick (appears where you touch, push past the top to lock auto-run)
//   right thumb - a cluster of big buttons around the main action
//   anywhere else - drag to look
// Each game mode passes its own button layout. Multi-touch safe (every finger is tracked separately).

export class TouchControls {
  constructor(root, input) {
    this.root = root;
    this.input = input;
    this.buttons = [];        // {id, action, el, x, y, r}
    this.fingers = new Map(); // touch id -> {kind, ...}
    this.enabled = false;
    this.autoRun = false;
    this.stick = document.createElement("div");
    this.stick.className = "stick";
    this.knob = document.createElement("div");
    this.knob.className = "knob";
    this.stick.appendChild(this.knob);
    const opts = { passive: false };
    addEventListener("touchstart", (e) => this._start(e), opts);
    addEventListener("touchmove", (e) => this._move(e), opts);
    addEventListener("touchend", (e) => this._end(e), opts);
    addEventListener("touchcancel", (e) => this._end(e), opts);
  }

  // Button scale: iPad = 1. On short landscape phones shrink so the top rows of buttons stay clear of the
  // minimap / score HUD at the top of the screen.
  get u() {
    const base = Math.max(0.72, Math.min(1.6, Math.min(innerWidth, innerHeight) / 768));
    return Math.max(0.48, Math.min(base, (innerHeight - 150) / 470));
  }

  // layout: [{id, label, action, x, y, r, color}] with x/y measured from the bottom-right corner (design px).
  setLayout(layout) {
    this.clear();
    this.enabled = true;
    // Only show the buttons on touch screens (they appear the moment someone touches the screen).
    const touchy = navigator.maxTouchPoints > 0 || this.input.device === "touch" || new URLSearchParams(location.search).has("touch");
    this.root.style.display = touchy ? "" : "none";
    const u = this.u;
    const left = !!this.leftHanded;
    for (const b of layout) {
      const el = document.createElement("div");
      el.className = "tbtn";
      el.textContent = b.label;
      const r = Math.max(21, b.r * u);
      const x = left ? b.x * u : innerWidth - b.x * u;
      const y = innerHeight - b.y * u;
      Object.assign(el.style, { left: `${x - r}px`, top: `${y - r}px`, width: `${r * 2}px`, height: `${r * 2}px`,
        fontSize: `${Math.max(11, r * 0.34)}px` });
      el.style.setProperty("--bc", b.color || "rgba(255,255,255,.6)");
      this.root.appendChild(el);
      this.buttons.push({ ...b, el, cx: x, cy: y, rr: r });
    }
    this.stick.style.display = "block";
    this._restStick();
    this.root.appendChild(this.stick);
  }

  setLabel(id, text) {
    const b = this.buttons.find((x) => x.id === id);
    if (b) b.el.textContent = text;
  }

  clear() {
    for (const f of this.fingers.values()) if (f.kind === "btn") this.input.touchPress(f.action, false);
    this.fingers.clear();
    this.buttons = [];
    this.root.innerHTML = "";
    this.enabled = false;
    this.autoRun = false;
    this.input.touchMove.x = 0; this.input.touchMove.y = 0;
  }

  _restStick() {
    const u = this.u;
    const x = this.leftHanded ? innerWidth - 160 * u : 160 * u;
    this._setStick(x, innerHeight - 170 * u, 0, 0);
    this.stick.style.opacity = "0.55";
  }

  _setStick(cx, cy, dx, dy) {
    this.stickC = { x: cx, y: cy };
    this.stick.style.left = `${cx}px`;
    this.stick.style.top = `${cy}px`;
    this.knob.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  _hit(x, y) {
    let best = null, bd = 1e9;
    for (const b of this.buttons) {
      const d = Math.hypot(x - b.cx, y - b.cy);
      if (d < b.rr * 1.15 && d < bd) { best = b; bd = d; }
    }
    return best;
  }

  _stickZone(x, y) {
    const inHalf = this.leftHanded ? x > innerWidth * 0.6 : x < innerWidth * 0.42;
    return inHalf && y > innerHeight * 0.3;
  }

  _start(e) {
    if (!this.enabled) return;
    this.root.style.display = "";
    if (e.target.closest && e.target.closest("#ui .screen, .hud-tl, .slots, button")) return;
    e.preventDefault();
    this.input.device = "touch";
    for (const t of e.changedTouches) {
      const b = this._hit(t.clientX, t.clientY);
      if (b) {
        this.fingers.set(t.identifier, { kind: "btn", action: b.action, b, lx: t.clientX, ly: t.clientY });
        b.el.classList.add("down");
        this.input.touchPress(b.action, true);
        if (navigator.vibrate && (b.id === "fire" || b.id === "shoot")) navigator.vibrate(10);
      } else if (this._stickZone(t.clientX, t.clientY)) {
        this.autoRun = false;
        this.fingers.set(t.identifier, { kind: "stick", ox: t.clientX, oy: t.clientY });
        this._setStick(t.clientX, t.clientY, 0, 0);
        this.stick.style.opacity = "1";
      } else {
        this.fingers.set(t.identifier, { kind: "look", lx: t.clientX, ly: t.clientY });
      }
    }
  }

  _move(e) {
    if (!this.enabled) return;
    e.preventDefault();
    for (const t of e.changedTouches) {
      const f = this.fingers.get(t.identifier);
      if (!f) continue;
      if (f.kind === "stick") {
        const R = 85 * this.u;
        let dx = t.clientX - f.ox, dy = t.clientY - f.oy;
        this.autoRun = dy < -R * 1.6 && Math.abs(dx) < R;
        const len = Math.hypot(dx, dy);
        if (len > R && !this.autoRun) {       // the base follows the thumb
          f.ox = t.clientX - (dx / len) * R; f.oy = t.clientY - (dy / len) * R;
          dx = (dx / len) * R; dy = (dy / len) * R;
        }
        const k = Math.min(1, len / R);
        const nx = len > 0 ? (dx / Math.max(len, 1)) * k : 0, ny = len > 0 ? (dy / Math.max(len, 1)) * k : 0;
        this._setStick(f.ox, f.oy, Math.max(-R, Math.min(R, dx)), Math.max(-R, Math.min(R, dy)));
        this.input.touchMove.x = nx;
        this.input.touchMove.y = this.autoRun ? 1 : -ny;
        this.input.touchPress("sprint", this.autoRun || k > 0.95);
      } else if (f.kind === "look" || (f.kind === "btn" && f.b.drag)) {
        const dx = t.clientX - f.lx, dy = t.clientY - f.ly;
        const boost = 1 + Math.min(1, Math.hypot(dx, dy) / 40) * 0.6;
        this.input.look.x += dx * boost * 1.1;
        this.input.look.y += dy * boost * 1.1;
        f.lx = t.clientX; f.ly = t.clientY;
      }
    }
  }

  _end(e) {
    if (!this.enabled) return;
    for (const t of e.changedTouches) {
      const f = this.fingers.get(t.identifier);
      if (!f) continue;
      if (f.kind === "btn") {
        f.b.el.classList.remove("down");
        this.input.touchPress(f.action, false);
      } else if (f.kind === "stick") {
        if (!this.autoRun) {
          this.input.touchMove.x = 0; this.input.touchMove.y = 0;
          this.input.touchPress("sprint", false);
          this._restStick();
        } else {
          this.input.touchMove.x = 0; this.input.touchMove.y = 1;
          this.stick.style.opacity = "0.8";
        }
      }
      this.fingers.delete(t.identifier);
    }
  }
}
