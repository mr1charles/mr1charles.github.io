// Unified input: keyboard + mouse (pointer lock), gamepads and the on-screen touch controls all write
// into one state object that the game modes read each step.
//   state.move {x, y}   -1..1 (y = forward)
//   state.look {x, y}   accumulated look delta since the last read (pixels-ish)
//   state.held[name]    true while pressed      state.pressed(name)  true once per press
// Button names: fire, jump, sprint, pass, aim, reload, use, cam, swap, pause, slot1..slot5

export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.move = { x: 0, y: 0 };
    this.look = { x: 0, y: 0 };
    this.held = {};
    this._edge = {};
    this.touchMove = { x: 0, y: 0 };
    this.touchHeld = {};
    this.device = "kb";          // kb | pad | touch (what was used last)
    this.sens = 1;
    this._keys = {};
    this._mouse = {};
    const KEYS = { KeyW: "up", KeyS: "down", KeyA: "left", KeyD: "right", ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left",
      ArrowRight: "right", Space: "jump", ShiftLeft: "sprint", ShiftRight: "sprint", KeyE: "pass", KeyR: "reload", KeyF: "use",
      KeyC: "cam", KeyQ: "swap", Escape: "pause", Digit1: "slot1", Digit2: "slot2", Digit3: "slot3", Digit4: "slot4", Digit5: "slot5" };
    addEventListener("keydown", (e) => {
      const k = KEYS[e.code];
      if (!k) return;
      if (!this._keys[k]) this._edge[k] = true;
      this._keys[k] = true;
      this.device = "kb";
      if (k !== "pause") e.preventDefault();
    });
    addEventListener("keyup", (e) => { const k = KEYS[e.code]; if (k) this._keys[k] = false; });
    addEventListener("blur", () => { this._keys = {}; this._mouse = {}; });
    canvas.addEventListener("mousedown", (e) => {
      if (this.device === "touch" && e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
      this.device = "kb";
      if (document.pointerLockElement !== canvas && this.wantLock) {
        canvas.requestPointerLock?.();
      }
      const b = e.button === 2 ? "aim" : e.button === 0 ? "fire" : null;
      if (b) { if (!this._mouse[b]) this._edge[b] = true; this._mouse[b] = true; }
    });
    addEventListener("mouseup", (e) => { const b = e.button === 2 ? "aim" : e.button === 0 ? "fire" : null; if (b) this._mouse[b] = false; });
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === canvas) {
        this.look.x += e.movementX;
        this.look.y += e.movementY;
      }
    });
    addEventListener("wheel", (e) => { this._edge[e.deltaY > 0 ? "next" : "prev"] = true; }, { passive: true });
  }

  _pad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const p of pads) {
      if (!p || !p.connected) continue;
      const dz = (v) => (Math.abs(v) < 0.18 ? 0 : v);
      const lx = dz(p.axes[0] || 0), ly = dz(p.axes[1] || 0), rx = dz(p.axes[2] || 0), ry = dz(p.axes[3] || 0);
      const b = (i) => !!(p.buttons[i] && p.buttons[i].pressed);
      const any = lx || ly || rx || ry || p.buttons.some((x) => x.pressed);
      if (!any) continue;
      this.device = "pad";
      return {
        move: { x: lx, y: -ly }, look: { x: rx * 14, y: ry * 10 },
        btn: { jump: b(0), pass: b(1) || b(4), reload: b(2), use: b(3), fire: b(7), aim: b(6), sprint: b(10) || b(5),
          pause: b(9), cam: b(11), swap: b(15), prev: b(14) },
      };
    }
    return null;
  }

  // Call once per simulation step.
  poll() {
    const k = this._keys;
    let mx = (k.right ? 1 : 0) - (k.left ? 1 : 0);
    let my = (k.up ? 1 : 0) - (k.down ? 1 : 0);
    const held = { ...k, ...this._mouse };
    const pad = this._pad();
    if (pad) {
      if (Math.abs(pad.move.x) + Math.abs(pad.move.y) > 0) { mx = pad.move.x; my = pad.move.y; }
      this.look.x += pad.look.x * this.sens;
      this.look.y += pad.look.y * this.sens;
      for (const [n, v] of Object.entries(pad.btn)) {
        if (v && !this._padPrev?.[n]) this._edge[n] = true;
        held[n] = held[n] || v;
      }
      this._padPrev = pad.btn;
    }
    if (Math.abs(this.touchMove.x) + Math.abs(this.touchMove.y) > 0.01) { mx = this.touchMove.x; my = this.touchMove.y; }
    for (const [n, v] of Object.entries(this.touchHeld)) held[n] = held[n] || v;
    const len = Math.hypot(mx, my);
    if (len > 1) { mx /= len; my /= len; }
    this.move.x = mx; this.move.y = my;
    this.held = held;
  }

  // Touch controls report presses through here so edges work the same way.
  touchPress(name, down) {
    if (down && !this.touchHeld[name]) this._edge[name] = true;
    this.touchHeld[name] = down;
    this.device = "touch";
  }

  pressed(name) {
    const v = !!this._edge[name];
    this._edge[name] = false;
    return v;
  }

  takeLook() {
    const l = { x: this.look.x * this.sens, y: this.look.y * this.sens };
    this.look.x = 0; this.look.y = 0;
    return l;
  }

  clearEdges() { this._edge = {}; }
}
