// Storm Royale Mobile - Soccer (3v3 against bots).
// Dribble by running into the ball (it stays at your feet), hold SHOOT to charge (an arrow shows where it
// will go; hold left/right to curve it), PASS to the team-mate you face, LOB over defenders, JUMP for
// volleys and headers, BOOST to sprint.
import { THREE, clamp, lerp, damp, angleLerp, rand } from "./engine.js";
import { makeCharacter, makeRing, animate, kick as kickAnim, makeBall, mat } from "./models.js";
import { sfx } from "./audio.js";

const HALF_L = 42, HALF_W = 27, WALL_H = 9, GOAL_W = 7.5, GOAL_H = 6, GOAL_D = 5;
const R = 1.1;                 // ball radius
const BALL_G = 20;
const PLAYER_R = 0.55;
const CONTROL = R + 1.05;      // dribble reach
const KICK_REACH = R + 1.9;
const CURVE_TIME = 1.2;
const TEAM_COL = [0x2f6bff, 0xff3a3a];
const BOT_NAMES = ["Nova", "Blaze", "Kai", "Mako", "Onyx", "Iris", "Rex", "Luna", "Zed", "Pixel"];

export class Soccer {
  constructor(app, opts = {}) {
    this.app = app;
    this.input = app.input;
    this.teamSize = opts.teamSize || 3;
    this.minutes = opts.minutes ?? 3;
    this.golden = !!opts.golden;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0e1630);
    this.scene.fog = new THREE.Fog(0x0e1630, 90, 220);
    this.camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.2, 400);
    this.camYaw = -Math.PI / 2;    // looking toward +x (the red goal)
    this.autoplay = new URLSearchParams(location.search).has("autoplay");   // test hook: a bot plays you
    this.camPitch = -0.18;
    this.ballCam = false;
    this.scores = [0, 0];
    this.time = this.minutes * 60;
    this.overtime = this.golden;
    this.state = "countdown";
    this.timer = 3.5;
    this.lastCount = 4;
    this.possessor = null;
    this.possT = 0;
    this.locks = new Map();
    this.players = [];
    this._buildField();
    this._buildBall();
    this._buildPlayers();
    this._buildArrow();
    this._buildHud();
    this._touchLayout();
    this.kickoff();
    app.input.wantLock = true;
  }

  // ------------------------------------------------------------------ world
  _buildField() {
    const s = this.scene;
    s.add(new THREE.HemisphereLight(0xcfe0ff, 0x223322, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(30, 60, 20);
    s.add(sun);
    // Pitch texture: stripes + lines drawn on a canvas (one draw call, crisp lines)
    const cv = document.createElement("canvas");
    cv.width = 1024; cv.height = 660;
    const g = cv.getContext("2d");
    const sx = cv.width / (HALF_L * 2), sz = cv.height / (HALF_W * 2);
    for (let i = 0; i < 12; i++) {
      g.fillStyle = i % 2 ? "#37983f" : "#2f8a3a";
      g.fillRect((i * cv.width) / 12, 0, cv.width / 12 + 1, cv.height);
    }
    g.strokeStyle = "rgba(255,255,255,.9)";
    g.lineWidth = 4;
    g.strokeRect(3, 3, cv.width - 6, cv.height - 6);
    g.beginPath(); g.moveTo(cv.width / 2, 0); g.lineTo(cv.width / 2, cv.height); g.stroke();
    g.beginPath(); g.arc(cv.width / 2, cv.height / 2, 8 * sx, 0, Math.PI * 2); g.stroke();
    for (const side of [0, 1]) {
      const bx = side ? cv.width - 12 * sx : 0;
      g.strokeRect(bx, cv.height / 2 - 12 * sz, 12 * sx, 24 * sz);
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const pitch = new THREE.Mesh(new THREE.PlaneGeometry(HALF_L * 2, HALF_W * 2), new THREE.MeshLambertMaterial({ map: tex }));
    pitch.rotation.x = -Math.PI / 2;
    s.add(pitch);
    const surround = new THREE.Mesh(new THREE.PlaneGeometry(HALF_L * 2 + 60, HALF_W * 2 + 60), mat(0x1f4a28));
    surround.rotation.x = -Math.PI / 2;
    surround.position.y = -0.02;
    s.add(surround);
    // Walls (translucent so the camera can see through them) + neon trim
    const wallMat = new THREE.MeshLambertMaterial({ color: 0x2a3350, transparent: true, opacity: 0.55 });
    const trim = new THREE.MeshBasicMaterial({ color: 0x4affe8 });
    const wall = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      m.position.set(x, y, z);
      s.add(m);
    };
    for (const sz2 of [-1, 1]) {
      wall(HALF_L * 2 + 2, WALL_H, 1, 0, WALL_H / 2, sz2 * (HALF_W + 0.5));
      const t = new THREE.Mesh(new THREE.BoxGeometry(HALF_L * 2, 0.25, 0.1), trim);
      t.position.set(0, 1.2, sz2 * (HALF_W - 0.02));
      s.add(t);
    }
    for (const sx2 of [-1, 1]) {
      const side = HALF_W - GOAL_W;
      for (const sz2 of [-1, 1]) wall(1, WALL_H, side, sx2 * (HALF_L + 0.5), WALL_H / 2, sz2 * (GOAL_W + side / 2));
      wall(1, WALL_H - GOAL_H, GOAL_W * 2, sx2 * (HALF_L + 0.5), GOAL_H + (WALL_H - GOAL_H) / 2, 0);
      // Goal: posts, bar, net box
      const col = TEAM_COL[sx2 < 0 ? 0 : 1];
      const post = mat(0xffffff);
      for (const pz of [-1, 1]) {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, GOAL_H, 8), post);
        p.position.set(sx2 * HALF_L, GOAL_H / 2, pz * GOAL_W);
        s.add(p);
      }
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, GOAL_W * 2, 8), post);
      bar.rotation.x = Math.PI / 2;
      bar.position.set(sx2 * HALF_L, GOAL_H, 0);
      s.add(bar);
      const net = new THREE.Mesh(new THREE.BoxGeometry(GOAL_D, GOAL_H, GOAL_W * 2),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, side: THREE.DoubleSide }));
      net.position.set(sx2 * (HALF_L + GOAL_D / 2), GOAL_H / 2, 0);
      s.add(net);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(GOAL_D, GOAL_W * 2), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 }));
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(sx2 * (HALF_L + GOAL_D / 2), 0.03, 0);
      s.add(floor);
    }
    // Stands: coloured crowd blocks (instanced = 1 draw call)
    const crowd = new THREE.InstancedMesh(new THREE.BoxGeometry(1.2, 1.4, 1.2), new THREE.MeshLambertMaterial(), 240);
    const m4 = new THREE.Matrix4(), c = new THREE.Color();
    let n = 0;
    for (const side of [-1, 1]) for (let row = 0; row < 4; row++) for (let i = 0; i < 30; i++) {
      m4.makeTranslation(-HALF_L + i * (HALF_L * 2 / 29), WALL_H + 1 + row * 1.8, side * (HALF_W + 4 + row * 2.2));
      crowd.setMatrixAt(n, m4);
      crowd.setColorAt(n, c.setHSL(Math.random(), 0.6, 0.55));
      n++;
    }
    s.add(crowd);
  }

  _buildBall() {
    this.ball = { pos: new THREE.Vector3(0, R, 0), vel: new THREE.Vector3(), spin: new THREE.Vector3(), spinT: 0, last: null };
    this.ballMesh = makeBall(R);
    this.scene.add(this.ballMesh);
    const sh = new THREE.Mesh(new THREE.CircleGeometry(R * 0.9, 16), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 }));
    sh.rotation.x = -Math.PI / 2;
    this.ballShadow = sh;
    this.scene.add(sh);
  }

  _buildPlayers() {
    const names = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    for (let t = 0; t < 2; t++) {
      for (let i = 0; i < this.teamSize; i++) {
        const human = t === 0 && i === 0;
        const look = human ? this.app.look : { body: TEAM_COL[t], pants: 0xf2f2f2, hair: [0x3b2a1e, 0x111111, 0xe0c060, 0x8a4a2a][i % 4], skin: [0xf2c9a0, 0xc68a5a, 0x8a5a3a, 0xf6d6b8][(i + t) % 4] };
        if (human) look.body = TEAM_COL[0];
        const ch = makeCharacter(look);
        const ring = makeRing(TEAM_COL[t]);
        ch.root.add(ring);
        this.scene.add(ch.root);
        this.players.push({ team: t, human, name: human ? this.app.playerName : names.pop(), ch, idx: i,
          pos: new THREE.Vector3(), vel: new THREE.Vector3(), yaw: 0, grounded: true, boost: 60, charge: 0, charging: false,
          kickCd: 0, stun: 0, skill: rand(0.5, 0.85), role: 1, airT: 0, holdT: 0, target: null, lift: 0.2 });
      }
    }
    this.me = this.players.find((p) => p.human);
  }

  _buildArrow() {
    const N = 48;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 2 * 3), 3));
    const idx = [];
    for (let i = 0; i < N - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    geo.setIndex(idx);
    this.arrowMat = new THREE.MeshBasicMaterial({ color: 0xffd24a, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false });
    this.arrow = new THREE.Mesh(geo, this.arrowMat);
    this.arrow.frustumCulled = false;
    this.arrow.renderOrder = 5;
    this.arrowHead = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.3, 10), this.arrowMat);
    this.arrowHead.renderOrder = 5;
    this.scene.add(this.arrow, this.arrowHead);
    this.arrowN = N;
  }

  // ------------------------------------------------------------------ HUD + touch
  _buildHud() {
    const hud = document.getElementById("hud");
    hud.innerHTML = `
      <div class="hud-top"><div class="blue" id="s0">0</div><div class="clock" id="clock">3:00</div><div class="red" id="s1">0</div></div>
      <div class="hud-tl"><button class="pill" id="pauseBtn">II</button><button class="pill" id="camBtn">BALL CAM</button></div>
      <div class="meter"><div class="hud-label" id="chargeLbl">BOOST</div><div class="bar"><i id="boostBar"></i></div>
        <div class="bar" id="chargeWrap" style="visibility:hidden"><i id="chargeBar" style="background:#ff7a3d"></i></div></div>
      <div class="center-msg" id="msg"></div><div id="banner"></div>`;
    this.el = (id) => document.getElementById(id);
    this.el("pauseBtn").onclick = () => this.app.pause();
    this.el("camBtn").onclick = () => { this.ballCam = !this.ballCam; sfx.click(); };
  }

  _touchLayout() {
    this.app.touch.setLayout([
      { id: "shoot", label: "SHOOT", action: "fire", x: 120, y: 135, r: 66, color: "#ff6b50", drag: true },
      { id: "pass", label: "PASS", action: "pass", x: 270, y: 96, r: 44, color: "#ffd24a", drag: true },
      { id: "jump", label: "JUMP", action: "jump", x: 96, y: 292, r: 46, color: "#6ddc6d" },
      { id: "boost", label: "BOOST", action: "sprint", x: 240, y: 228, r: 36, color: "#ffb02e" },
      { id: "lob", label: "LOB", action: "lob", x: 336, y: 212, r: 30, color: "#ffc070" },
      { id: "cam", label: "CAM", action: "cam", x: 110, y: 430, r: 28, color: "#7ad7ff" },
    ]);
  }

  banner(title, sub = "", color = "#fff", secs = 2.2) {
    const b = this.el("banner");
    b.innerHTML = `<div class="banner" style="--bc:${color}"><h1>${title}</h1>${sub ? `<p>${sub}</p>` : ""}</div>`;
    clearTimeout(this._bt);
    this._bt = setTimeout(() => { b.innerHTML = ""; }, secs * 1000);
  }

  // ------------------------------------------------------------------ flow
  kickoff() {
    const form = { 1: [[10, 0]], 2: [[10, 0], [30, 0]], 3: [[10, 0], [22, 11], [36, 0]] }[this.teamSize] || [[10, 0]];
    for (const p of this.players) {
      const f = form[Math.min(p.idx, form.length - 1)];
      const sx = p.team === 0 ? -1 : 1;
      p.pos.set(sx * f[0], 0, f[1] * (p.idx === 1 ? 1 : 1));
      p.vel.set(0, 0, 0);
      p.yaw = p.team === 0 ? -Math.PI / 2 : Math.PI / 2;
      p.charge = 0; p.charging = false; p.boost = Math.max(p.boost, 60);
    }
    this.camYaw = -Math.PI / 2;
    this.ball.pos.set(0, R, 0);
    this.ball.vel.set(0, 0, 0);
    this.ball.spinT = 0;
    this.ball.last = null;
    this.possessor = null;
    this.state = "countdown";
    this.timer = 3.5;
    this.lastCount = 4;
  }

  update(dt) {
    const inp = this.input;
    inp.poll();
    if (this.app.paused) return;
    if (inp.pressed("pause")) { this.app.pause(); return; }
    if (inp.pressed("cam")) this.ballCam = !this.ballCam;
    const look = inp.takeLook();
    const sens = 0.0042;
    this.camYaw -= look.x * sens;
    this.camPitch = clamp(this.camPitch - look.y * sens, -0.9, 0.35);
    for (const [k, v] of this.locks) { if (v - dt <= 0) this.locks.delete(k); else this.locks.set(k, v - dt); }

    if (this.state === "countdown") {
      this.timer -= dt;
      const c = Math.ceil(this.timer);
      if (c !== this.lastCount && c >= 1 && c <= 3) { this.lastCount = c; this.banner(String(c), "", "#fff", 0.9); sfx.click(); }
      if (this.timer <= 0) { this.state = "play"; this.banner("GO!", "", "#6ddc6d", 0.8); sfx.whistle(); }
      this._stepPlayers(dt, false);
    } else if (this.state === "play") {
      if (!this.overtime) {
        this.time -= dt;
        if (this.time <= 0) {
          this.time = 0;
          if (this.scores[0] !== this.scores[1]) return this._end();
          this.overtime = true;
          this.banner("OVERTIME", "Next goal wins!", "#ffd24a", 2.5);
          sfx.whistle();
        }
      }
      if (!this.autoplay) this._humanActions(dt);
      this._bots(dt);
      this._stepPlayers(dt, true);
      this._possession(dt);
      this._stepBall(dt);
    } else if (this.state === "goal") {
      this.timer -= dt;
      this._stepPlayers(dt, false);
      this._stepBall(dt);
      if (this.timer <= 0) {
        if (this.overtime) return this._end();
        this.kickoff();
      }
    } else if (this.state === "over") {
      this._stepPlayers(dt, false);
    }
  }

  // ------------------------------------------------------------------ human
  _humanActions(dt) {
    const p = this.me, inp = this.input;
    // Kick: hold to charge, release to strike
    if (inp.held.fire && p.kickCd <= 0) {
      p.charging = true;
      p.charge = Math.min(1, p.charge + dt / 1.0);
    } else if (p.charging) {
      p.charging = false;
      this._kick(p, p.charge, this._aimDir(), this._curveFor(p, p.charge));
      p.charge = 0;
    }
    if (inp.pressed("pass")) this._pass(p, false);
    if (inp.pressed("lob")) this._pass(p, true);
  }

  // Manual curve (hold left/right) wins; otherwise the shot assist bends it into the goal if it's on.
  _curveFor(p, charge) {
    const manual = clamp(this.input.move.x, -1, 1);
    if (Math.abs(manual) > 0.15 || !this.app.settings.autoCurve) return manual;
    return this._autoCurve(p, charge);
  }

  // Shot assist: try curve amounts and keep the one whose path crosses the goal line inside the goal,
  // closest to where you aimed. Only when you're shooting roughly toward the goal.
  _autoCurve(p, charge) {
    if (!this._inReach(p) || this._shotKind(p) === "header") return 0;
    const goalX = p.team === 0 ? HALF_L : -HALF_L;
    const dir = this._aimDir();
    const toGoal = new THREE.Vector3(goalX - this.ball.pos.x, 0, -this.ball.pos.z).normalize();
    const flat = new THREE.Vector3(dir.x, 0, dir.z).normalize();
    if (flat.dot(toGoal) < Math.cos((50 * Math.PI) / 180)) return 0;
    // Where the straight shot would cross the goal line, pulled inside the posts
    const t = (goalX - this.ball.pos.x) / (flat.x || 1e-6);
    const aimZ = this.ball.pos.z + flat.z * t;
    const wantZ = clamp(aimZ, -(GOAL_W - 1.6), GOAL_W - 1.6);
    let best = 0, bestErr = 1e9;
    for (let c = -1; c <= 1.001; c += 0.125) {
      const cross = this._crossing(p, charge, c, goalX);
      if (!cross) continue;
      let err = Math.abs(cross.z - wantZ) + (cross.y > GOAL_H - 0.8 ? 20 : 0) + Math.abs(c) * 0.5;
      const onTarget = Math.abs(cross.z) < GOAL_W - 0.3 && cross.y < GOAL_H;
      if (onTarget && err < bestErr) { bestErr = err; best = c; }
    }
    return best; // 0 when no curve can put it on target (e.g. out of range)
  }

  _crossing(p, charge, curve, goalX) {
    const path = this._predict(p, charge, curve, 120);
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1], b = path[i];
      if ((a.x - goalX) * (b.x - goalX) <= 0) {
        const k = (goalX - a.x) / (b.x - a.x || 1e-6);
        return new THREE.Vector3(goalX, a.y + (b.y - a.y) * k, a.z + (b.z - a.z) * k);
      }
    }
    return null;
  }

  _aimDir() {
    // Camera direction, lifted a bit so shots leave the ground.
    const cp = this.camPitch + 0.18;
    const d = new THREE.Vector3(-Math.sin(this.camYaw) * Math.cos(cp), Math.sin(cp), -Math.cos(this.camYaw) * Math.cos(cp));
    d.y = clamp(d.y + 0.1, 0.03, 0.85);
    return d.normalize();
  }

  _wish(p) {
    const inp = this.input;
    const f = new THREE.Vector3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    const r = new THREE.Vector3(Math.cos(this.camYaw), 0, -Math.sin(this.camYaw));
    return f.multiplyScalar(inp.move.y).add(r.multiplyScalar(inp.move.x));
  }

  // ------------------------------------------------------------------ movement
  _stepPlayers(dt, canMove) {
    for (const p of this.players) {
      p.kickCd = Math.max(0, p.kickCd - dt);
      p.stun = Math.max(0, p.stun - dt);
      let wish = new THREE.Vector3();
      let sprint = false, jump = false;
      if (canMove && p.stun <= 0) {
        if (p.human && !this.autoplay) {
          wish = this._wish(p);
          sprint = !!this.input.held.sprint;
          jump = this.input.pressed("jump");
        } else {
          wish = p.wish || wish;
          sprint = !!p.sprint;
          jump = !!p.jump;
          p.jump = false;
        }
      }
      const boosting = sprint && p.boost > 0 && wish.lengthSq() > 0.01;
      p.boost = boosting ? Math.max(0, p.boost - 30 * dt) : Math.min(100, p.boost + 7 * dt);
      const carrying = this.possessor === p;
      const speed = (boosting ? 12.8 : 8.6) * (carrying ? 0.92 : 1);
      const accel = p.grounded ? 60 : 18;
      const target = wish.clone().multiplyScalar(speed);
      p.vel.x = damp(p.vel.x, target.x, accel / speed, dt);
      p.vel.z = damp(p.vel.z, target.z, accel / speed, dt);
      if (jump && p.grounded) { p.vel.y = 9.5; p.grounded = false; if (p.human) sfx.jump(); }
      p.vel.y -= 24 * dt;
      p.pos.addScaledVector(p.vel, dt);
      if (p.pos.y <= 0) { p.pos.y = 0; p.vel.y = 0; p.grounded = true; p.airT = 0; } else { p.airT += dt; p.grounded = false; }
      // Stay on the pitch (players may step into the goal mouth)
      const inMouth = Math.abs(p.pos.z) < GOAL_W - 0.6;
      const lx = inMouth ? HALF_L + GOAL_D - 0.6 : HALF_L - PLAYER_R;
      p.pos.x = clamp(p.pos.x, -lx, lx);
      p.pos.z = clamp(p.pos.z, -(HALF_W - PLAYER_R), HALF_W - PLAYER_R);
      // Facing: aim while charging (human), else the way we run
      const hs = Math.hypot(p.vel.x, p.vel.z);
      let face = p.yaw;
      if (p.human && p.charging) face = this.camYaw;
      else if (hs > 0.8) face = Math.atan2(-p.vel.x, -p.vel.z);
      p.yaw = angleLerp(p.yaw, face, 1 - Math.exp(-12 * dt));
    }
    // Player-player separation
    for (let i = 0; i < this.players.length; i++) for (let j = i + 1; j < this.players.length; j++) {
      const a = this.players[i], b = this.players[j];
      const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
      const d = Math.hypot(dx, dz), min = PLAYER_R * 2;
      if (d < min && d > 0.001) {
        const push = (min - d) / 2;
        a.pos.x -= (dx / d) * push; a.pos.z -= (dz / d) * push;
        b.pos.x += (dx / d) * push; b.pos.z += (dz / d) * push;
      }
    }
  }

  // ------------------------------------------------------------------ ball
  _stepBall(dt) {
    const b = this.ball;
    if (this.possessor && this.state === "play") this._steerBall(this.possessor, dt);
    b.vel.y -= BALL_G * dt;
    if (b.spinT > 0) {
      b.spinT -= dt;
      b.vel.addScaledVector(b.spin, dt * clamp(b.spinT / 0.6, 0, 1));
    }
    b.vel.multiplyScalar(1 - 0.12 * dt);
    b.pos.addScaledVector(b.vel, dt);
    // Floor + rolling friction
    if (b.pos.y < R) {
      b.pos.y = R;
      b.vel.y = Math.abs(b.vel.y) > 1.5 ? -b.vel.y * 0.58 : 0;
      b.vel.x *= 1 - 0.7 * dt;
      b.vel.z *= 1 - 0.7 * dt;
    }
    if (b.pos.y > 30) { b.pos.y = 30; b.vel.y = -Math.abs(b.vel.y) * 0.6; }
    // Side walls
    if (Math.abs(b.pos.z) > HALF_W - R) { b.pos.z = Math.sign(b.pos.z) * (HALF_W - R); b.vel.z = -b.vel.z * 0.72; }
    // End walls with goal mouths
    const inMouth = Math.abs(b.pos.z) < GOAL_W - R * 0.4 && b.pos.y < GOAL_H - R * 0.4;
    if (Math.abs(b.pos.x) > HALF_L - R) {
      if (!inMouth && Math.abs(b.pos.x) < HALF_L + R) {
        b.pos.x = Math.sign(b.pos.x) * (HALF_L - R);
        b.vel.x = -b.vel.x * 0.72;
      } else if (inMouth || Math.abs(b.pos.x) >= HALF_L + R) {
        // Inside the goal box: back wall, sides, roof
        const bx = HALF_L + GOAL_D - R;
        if (Math.abs(b.pos.x) > bx) { b.pos.x = Math.sign(b.pos.x) * bx; b.vel.x = -b.vel.x * 0.35; }
        if (Math.abs(b.pos.z) > GOAL_W - R) { b.pos.z = Math.sign(b.pos.z) * (GOAL_W - R); b.vel.z = -b.vel.z * 0.4; }
        if (b.pos.y > GOAL_H - R) { b.pos.y = GOAL_H - R; b.vel.y = -Math.abs(b.vel.y) * 0.4; }
      }
    }
    // Goal?
    if (this.state === "play" && Math.abs(b.pos.x) > HALF_L + R * 0.8 && Math.abs(b.pos.z) < GOAL_W && b.pos.y < GOAL_H) {
      this._goal(b.pos.x > 0 ? 0 : 1);
    }
    // Player bodies bump the ball (loose ball only)
    if (this.state === "play") for (const p of this.players) {
      if (p === this.possessor) continue;
      const dx = b.pos.x - p.pos.x, dz = b.pos.z - p.pos.z, dy = b.pos.y - (p.pos.y + 0.9);
      const d = Math.hypot(dx, dz);
      if (d < R + PLAYER_R && Math.abs(dy) < R + 0.9 && d > 0.001) {
        const nx = dx / d, nz = dz / d;
        const rel = (p.vel.x - b.vel.x) * nx + (p.vel.z - b.vel.z) * nz;
        b.pos.x = p.pos.x + nx * (R + PLAYER_R);
        b.pos.z = p.pos.z + nz * (R + PLAYER_R);
        if (rel > 0) { b.vel.x += nx * (rel + 1.5); b.vel.z += nz * (rel + 1.5); b.vel.y += 1; b.last = p; }
      }
    }
  }

  _goal(team) {
    this.scores[team]++;
    this.state = "goal";
    this.timer = 3.6;
    this.possessor = null;
    const scorer = this.ball.last;
    const own = scorer && scorer.team !== team;
    const who = own ? "Own goal!" : scorer ? scorer.name : "";
    this.banner("GOAL!", `${who}  -  BLUE ${this.scores[0]} : ${this.scores[1]} RED`, team === 0 ? "#5b8cff" : "#ff5a5a", 3.2);
    sfx.goal();
    for (const p of this.players) if (p.team === team) p.ch.celebrate = 3.2;
    if (scorer && scorer.human && !own) this.app.stats.goals++;
    console.log(`GOAL team=${team} by=${who} score=${this.scores} t=${(this.minutes * 60 - this.time).toFixed(1)}`);
  }

  _end() {
    this.state = "over";
    const won = this.scores[0] > this.scores[1];
    won ? sfx.win() : sfx.lose();
    this.app.stats.matches++;
    if (won) this.app.stats.wins++;
    this.app.saveStats();
    setTimeout(() => this.app.results({
      title: won ? "VICTORY" : "DEFEAT", color: won ? "#ffd24a" : "#93a0bd",
      lines: [`BLUE ${this.scores[0]} : ${this.scores[1]} RED`, this.overtime ? "Decided in overtime" : "Full time"],
      again: () => this.app.start("soccer", { teamSize: this.teamSize, minutes: this.minutes, golden: this.golden }),
    }), 1800);
  }

  // ------------------------------------------------------------------ possession / dribbling
  _canControl(p) { return !this.locks.has(p) && p.airT < 0.3 && p.stun <= 0; }

  _possession(dt) {
    const b = this.ball;
    if (b.pos.y > R + 1.4) { this.possessor = null; return; }
    if (this.possessor) {
      const p = this.possessor;
      const flat = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
      if (!this._canControl(p) || flat > CONTROL + 1.5) this.possessor = null;
      else { this.possT += dt; this._tackles(dt); }
    }
    if (!this.possessor) {
      let best = null, bd = CONTROL;
      for (const p of this.players) {
        if (!this._canControl(p)) continue;
        const d = Math.hypot(b.pos.x - p.pos.x, b.pos.z - p.pos.z);
        const rel = Math.hypot(b.vel.x - p.vel.x, b.vel.z - p.vel.z);
        if (d < bd && rel < 17 && b.pos.y < R + 1.0) { bd = d; best = p; }
      }
      if (best) { this.possessor = best; this.possT = 0; b.last = best; }
    }
  }

  _tackles(dt) {
    if (this.possT < 0.35) return;
    const b = this.ball, owner = this.possessor;
    for (const p of this.players) {
      if (p.team === owner.team || !this._canControl(p)) continue;
      const tx = b.pos.x - p.pos.x, tz = b.pos.z - p.pos.z;
      const d = Math.hypot(tx, tz);
      if (d > R + 0.9) continue;
      const rush = Math.max(0, (p.vel.x * tx + p.vel.z * tz) / Math.max(d, 0.01));
      let chance = (1.0 + rush * 0.15) * (p.human ? 1.3 : lerp(0.6, 1.2, p.skill));
      if (Math.random() < chance * dt) {
        this.locks.set(owner, 0.7);
        this.possessor = p;
        this.possT = 0;
        b.last = p;
        sfx.kick(1.4);
        if (p.human) this.showMsg("TACKLE!", "#ffd24a");
        else if (owner.human) this.showMsg("STOLEN", "#ff6b6b");
        return;
      }
    }
  }

  _steerBall(p, dt) {
    const b = this.ball;
    const hs = Math.hypot(p.vel.x, p.vel.z);
    const fx = hs > 1.2 ? p.vel.x / hs : -Math.sin(p.yaw), fz = hs > 1.2 ? p.vel.z / hs : -Math.cos(p.yaw);
    const touch = 0.2 + 0.35 * Math.min(1, hs / 9) * (0.5 + 0.5 * Math.sin(this.possT * 9));
    const tx = p.pos.x + fx * (R + 0.45 + touch), tz = p.pos.z + fz * (R + 0.45 + touch);
    let cx = (tx - b.pos.x) * 14, cz = (tz - b.pos.z) * 14;
    const cl = Math.hypot(cx, cz);
    if (cl > 28) { cx *= 28 / cl; cz *= 28 / cl; }
    b.vel.x = p.vel.x + cx;
    b.vel.z = p.vel.z + cz;
    b.vel.y = Math.min(b.vel.y, 1);
  }

  showMsg(t, color = "#fff") {
    const m = this.el("msg");
    m.textContent = t;
    m.style.color = color;
    clearTimeout(this._mt);
    this._mt = setTimeout(() => (m.textContent = ""), 1200);
  }

  // ------------------------------------------------------------------ kicking
  _shotKind(p) {
    if (p.grounded) return "shot";
    const by = this.ball.pos.y - p.pos.y;
    return by > 2.4 ? "header" : by > 0.3 ? "volley" : "shot";
  }

  _power(p, charge) { return lerp(14, 38, charge) + Math.min(Math.hypot(p.vel.x, p.vel.z), 12) * 0.3; }

  _spin(dir, power, kind, curve) {
    const acc = new THREE.Vector3();
    if (kind === "header") return acc;
    if (Math.abs(curve) > 0.15) {
      const side = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
      acc.addScaledVector(side, curve * lerp(9, 22, clamp((power - 14) / 30, 0, 1)));
    }
    if (power > 26 && dir.y > 0.14 && kind === "shot") acc.y -= clamp((power - 26) * 0.8, 3, 13);
    return acc;
  }

  _inReach(p) {
    const b = this.ball.pos;
    const d = Math.hypot(b.x - p.pos.x, b.y - (p.pos.y + 0.9), b.z - p.pos.z);
    return d < KICK_REACH + (p.grounded ? 0 : 0.8);
  }

  _kick(p, charge, dir, curve) {
    if (p.kickCd > 0 || !this._inReach(p)) { if (p.human) kickAnim(p.ch); return false; }
    const b = this.ball;
    const kind = this._shotKind(p);
    let power = this._power(p, charge);
    dir = dir.clone();
    if (kind === "volley") { power = power * 1.2 + 4; dir.y = clamp(dir.y - 0.1, -0.2, 0.35); }
    if (kind === "header") { power *= 1.05; dir.y = clamp(dir.y - 0.12, -0.3, 0.4); }
    dir.normalize();
    power = Math.min(power, 46);
    b.vel.multiplyScalar(0.2).addScaledVector(dir, power);
    b.spin.copy(this._spin(dir, power, kind, curve));
    b.spinT = CURVE_TIME;
    b.last = p;
    this.possessor = null;
    this.locks.set(p, 0.35);
    p.kickCd = 0.35;
    kickAnim(p.ch);
    sfx.kick(0.8 + charge * 0.5);
    if (p.human) {
      if (kind !== "shot") this.showMsg(kind.toUpperCase() + "!", "#ff7a3d");
      else if (Math.abs(curve) > 0.15) this.showMsg(curve < 0 ? "CURVE LEFT" : "CURVE RIGHT", "#7ad7ff");
    }
    return true;
  }

  _pass(p, lob) {
    if (p.kickCd > 0 || !this._inReach(p)) return;
    const b = this.ball;
    // Team-mate closest to where we face / aim
    const aim = p.human ? new THREE.Vector3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw)) : new THREE.Vector3(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    let best = null, bs = -1e9;
    for (const m of this.players) {
      if (m === p || m.team !== p.team) continue;
      const to = new THREE.Vector3(m.pos.x - p.pos.x, 0, m.pos.z - p.pos.z);
      const d = to.length();
      if (d < 3 || d > 60) continue;
      const a = aim.dot(to.clone().normalize());
      if (a < 0.2) continue;
      const sc = a * 3 - d / 40;
      if (sc > bs) { bs = sc; best = m; }
    }
    const target = best ? best.pos.clone().addScaledVector(best.vel, 0.4) : p.pos.clone().addScaledVector(aim, 18);
    const to = new THREE.Vector3(target.x - b.pos.x, 0, target.z - b.pos.z);
    const dist = Math.max(3, to.length());
    to.normalize();
    let dir, power;
    if (lob) {
      const th = 0.65;
      power = clamp(Math.sqrt((dist * BALL_G) / Math.sin(2 * th)) * 1.06, 10, 40);
      dir = to.multiplyScalar(Math.cos(th)).add(new THREE.Vector3(0, Math.sin(th), 0)).normalize();
    } else {
      power = clamp(dist * 0.85 + 8, 11, 34);
      dir = to.add(new THREE.Vector3(0, 0.05, 0)).normalize();
    }
    b.vel.set(0, 0, 0).addScaledVector(dir, power);
    b.spinT = 0;
    b.last = p;
    this.possessor = null;
    this.locks.set(p, 0.35);
    p.kickCd = 0.3;
    kickAnim(p.ch);
    sfx.pass();
  }

  // Path of a kick right now (for the aiming arrow). Mirrors _stepBall's integration.
  _predict(p, charge, curve, steps = 70) {
    const out = [];
    if (!this._inReach(p)) return out;
    const kind = this._shotKind(p);
    let dir = this._aimDir();
    let power = this._power(p, charge);
    if (kind === "volley") { power = power * 1.2 + 4; dir.y = clamp(dir.y - 0.1, -0.2, 0.35); }
    if (kind === "header") { power *= 1.05; dir.y = clamp(dir.y - 0.12, -0.3, 0.4); }
    dir.normalize();
    power = Math.min(power, 46);
    const v = this.ball.vel.clone().multiplyScalar(0.2).addScaledVector(dir, power);
    const pos = this.ball.pos.clone();
    const spin = this._spin(dir, power, kind, curve);
    const dt = 1 / 30;
    for (let i = 0; i < steps; i++) {
      v.y -= BALL_G * dt;
      const left = CURVE_TIME - i * dt;
      if (left > 0) v.addScaledVector(spin, dt * clamp(left / 0.6, 0, 1));
      v.multiplyScalar(1 - 0.12 * dt);
      pos.addScaledVector(v, dt);
      if (pos.y < R) { pos.y = R; v.y = Math.abs(v.y) > 1.5 ? -v.y * 0.58 : 0; v.x *= 1 - 0.7 * dt; v.z *= 1 - 0.7 * dt; }
      if (Math.abs(pos.z) > HALF_W - R) { pos.z = Math.sign(pos.z) * (HALF_W - R); v.z = -v.z * 0.72; }
      out.push(pos.clone());
      if (Math.abs(pos.x) > HALF_L + 1.5) break;
    }
    return out;
  }

  _updateArrow() {
    const p = this.me;
    const show = this.state === "play" && this._inReach(p);
    this.arrow.visible = this.arrowHead.visible = false;
    if (!show) return;
    const charging = p.charging;
    const manual = Math.abs(this.input.move.x) > 0.15;
    // The assist search is a little expensive: refresh it a few times a second
    this._acT = (this._acT || 0) - 1;
    if (manual || !this.app.settings.autoCurve) this._ac = clamp(this.input.move.x, -1, 1);
    else if (this._acT <= 0 || this._ac === undefined) { this._ac = this._autoCurve(p, Math.max(p.charge, 0.35)); this._acT = 6; }
    const curve = this._ac;
    const path = this._predict(p, Math.max(p.charge, 0.35), curve);
    const n = Math.min(path.length, charging ? this.arrowN : 18);
    if (n < 3) return;
    const kind = this._shotKind(p);
    let col = kind === "shot" ? 0xffd24a : kind === "volley" ? 0xff7a3d : 0x7ad7ff;
    if (Math.abs(curve) > 0.15) col = 0x9fe3ff;
    this.arrowMat.color.setHex(col);
    this.arrowMat.opacity = charging ? 0.85 : 0.4;
    const pos = this.arrow.geometry.attributes.position;
    const w0 = charging ? 0.45 : 0.3;
    for (let i = 0; i < this.arrowN; i++) {
      const k = Math.min(i, n - 1);
      const a = path[k], b = path[Math.min(k + 1, n - 1)], prev = path[Math.max(k - 1, 0)];
      const dx = b.x - prev.x, dz = b.z - prev.z, l = Math.hypot(dx, dz) || 1;
      const w = w0 * (1 - (k / n) * 0.5);
      const sx = (-dz / l) * w, sz = (dx / l) * w;
      pos.setXYZ(i * 2, a.x + sx, a.y - R + 0.15, a.z + sz);
      pos.setXYZ(i * 2 + 1, a.x - sx, a.y - R + 0.15, a.z - sz);
    }
    pos.needsUpdate = true;
    const tip = path[n - 1], back = path[n - 3];
    this.arrowHead.position.set(tip.x, tip.y - R + 0.15, tip.z);
    const dir = new THREE.Vector3(tip.x - back.x, tip.y - back.y, tip.z - back.z).normalize();
    this.arrowHead.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    this.arrow.visible = this.arrowHead.visible = true;
  }

  // ------------------------------------------------------------------ bots
  _bots(dt) {
    const b = this.ball;
    // Roles: nearest to the ball = striker, furthest back = keeper
    for (let t = 0; t < 2; t++) {
      const team = this.players.filter((p) => p.team === t && !p.human);
      team.sort((a, c) => a.pos.distanceTo(b.pos) - c.pos.distanceTo(b.pos));
      team.forEach((p, i) => (p.role = i === 0 ? 0 : i === team.length - 1 && team.length > 1 ? 2 : 1));
    }
    for (const p of this.players) {
      if (p.human && !this.autoplay) continue;
      const enemyGoal = new THREE.Vector3(p.team === 0 ? HALF_L : -HALF_L, 0, 0);
      const ownGoal = new THREE.Vector3(-enemyGoal.x, 0, 0);
      const ballFlat = new THREE.Vector3(b.pos.x + b.vel.x * 0.3, 0, b.pos.z + b.vel.z * 0.3);
      const toGoal = enemyGoal.clone().sub(ballFlat).normalize();
      let target = ballFlat.clone();
      p.sprint = false;
      const holder = this.possessor;
      const mateHas = holder && holder.team === p.team;
      if (holder === p) {
        // Dribble at goal; shoot in range; pass under pressure
        target = enemyGoal.clone().add(new THREE.Vector3(0, 0, Math.sin(performance.now() / 700 + p.idx) * 6));
        const gd = p.pos.distanceTo(enemyGoal);
        let pressure = 99;
        for (const o of this.players) if (o.team !== p.team) pressure = Math.min(pressure, o.pos.distanceTo(p.pos));
        p.holdT += dt;
        if (gd < lerp(20, 30, p.skill) && p.holdT > 0.3) {
          const aim = enemyGoal.clone().add(new THREE.Vector3(0, 2.2, rand(-GOAL_W + 1.5, GOAL_W - 1.5))).sub(b.pos).normalize();
          aim.y = clamp(aim.y + 0.12, 0.05, 0.4);
          this._kick(p, clamp(gd / 36, 0.35, 0.95), aim.normalize(), 0);
          p.holdT = 0;
        } else if (pressure < 4 && p.holdT > 0.6 && Math.random() < 0.5) {
          p.yaw = Math.atan2(-(enemyGoal.x - p.pos.x), -(enemyGoal.z - p.pos.z));
          this._pass(p, Math.random() < 0.3);
          p.holdT = 0;
        }
        p.sprint = pressure > 5 && p.boost > 20;
      } else if (mateHas) {
        const lane = p.idx % 2 ? 11 : -11;
        target = new THREE.Vector3(b.pos.x + Math.sign(enemyGoal.x) * (p.role === 2 ? -20 : 12), 0, clamp(b.pos.z + lane, -HALF_W + 4, HALF_W - 4));
        if (p.role === 2) target.set(ownGoal.x + Math.sign(enemyGoal.x) * 8, 0, 0);
      } else if (p.role === 2) {
        target.set(ownGoal.x + Math.sign(enemyGoal.x) * 5, 0, clamp(b.pos.z * 0.6, -GOAL_W + 1, GOAL_W - 1));
        if (b.pos.distanceTo(ownGoal) < 14 && !holder) target = ballFlat.clone();
      } else if (p.role === 0) {
        if (holder) target = holder.pos.clone();       // press the carrier
        else {
          const stand = ballFlat.clone().addScaledVector(toGoal, -2.8);
          const lined = ballFlat.clone().sub(p.pos).normalize().dot(toGoal) > 0.5;
          target = lined || p.pos.distanceTo(stand) < 2.5 ? ballFlat.clone().addScaledVector(toGoal, 1.2) : stand;
          // Loose ball in reach: strike it at goal
          if (this._inReach(p) && p.kickCd <= 0 && Math.random() < 0.08 + p.skill * 0.1) {
            const aim = enemyGoal.clone().add(new THREE.Vector3(0, 2, rand(-5, 5))).sub(b.pos).normalize();
            aim.y = clamp(aim.y + 0.15, 0.06, 0.45);
            this._kick(p, rand(0.35, 0.85), aim.normalize(), 0);
          }
        }
      } else {
        target = ballFlat.clone().lerp(ownGoal, 0.4);
        target.z += p.pos.z >= 0 ? 8 : -8;
      }
      const to = target.sub(p.pos);
      to.y = 0;
      const d = to.length();
      p.wish = d > 1.0 ? to.normalize().multiplyScalar(Math.min(1, d / 3)) : new THREE.Vector3();
      if (d > 14 && p.boost > 25 && p.role !== 2) p.sprint = true;
      if (b.pos.y > 3 && b.pos.distanceTo(p.pos) < 6 && p.grounded && Math.random() < 0.05) p.jump = true;
    }
  }

  // ------------------------------------------------------------------ rendering
  frame(dt) {
    for (const p of this.players) {
      p.ch.root.position.copy(p.pos);
      p.ch.root.rotation.y = p.yaw;
      animate(p.ch, dt, { speed: Math.hypot(p.vel.x, p.vel.z), grounded: p.grounded || p.pos.y < 0.05 });
    }
    const b = this.ball;
    this.ballMesh.position.copy(b.pos);
    const hs = Math.hypot(b.vel.x, b.vel.z);
    if (hs > 0.1) {
      const axis = new THREE.Vector3(b.vel.z, 0, -b.vel.x).normalize();
      this.ballMesh.rotateOnWorldAxis(axis, (hs * dt) / R);
    }
    this.ballShadow.position.set(b.pos.x, 0.03, b.pos.z);
    this.ballShadow.scale.setScalar(Math.max(0.4, 1 - b.pos.y / 20));
    this._updateArrow();
    this._camera(dt);
    // HUD
    const t = Math.max(0, Math.ceil(this.time));
    this.el("clock").textContent = this.overtime ? "OT" : `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
    this.el("s0").textContent = this.scores[0];
    this.el("s1").textContent = this.scores[1];
    this.el("boostBar").style.width = `${this.me.boost}%`;
    const cw = this.el("chargeWrap");
    cw.style.visibility = this.me.charging ? "visible" : "hidden";
    this.el("chargeBar").style.width = `${this.me.charge * 100}%`;
    this.el("chargeLbl").textContent = this.me.charging ? "KICK POWER" : "BOOST";
    this.el("camBtn").textContent = this.ballCam ? "FREE CAM" : "BALL CAM";
  }

  _camera(dt) {
    const p = this.me;
    if (this.ballCam) {
      const to = this.ball.pos.clone().sub(p.pos);
      this.camYaw = angleLerp(this.camYaw, Math.atan2(-to.x, -to.z), 1 - Math.exp(-5 * dt));
    }
    const dist = 7.5, cp = this.camPitch;
    const back = new THREE.Vector3(Math.sin(this.camYaw) * Math.cos(cp), 0, Math.cos(this.camYaw) * Math.cos(cp));
    const want = p.pos.clone().addScaledVector(back, dist);
    want.y = p.pos.y + 2.4 - Math.sin(cp) * dist;
    want.y = Math.max(0.6, want.y);
    this.camera.position.lerp(want, 1 - Math.exp(-14 * dt));
    const look = p.pos.clone();
    look.y += 1.6;
    look.addScaledVector(back, -4);
    this.camera.lookAt(look);
  }

  dispose() {
    this.app.touch.clear();
    document.getElementById("hud").innerHTML = "";
    clearTimeout(this._bt);
  }
}
