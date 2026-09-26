// Storm Royale Mobile - Battle Royale Lite (you + 11 bots on a small island).
// Ride the storm bus, JUMP to drop, press JUMP again to open/close the glider (landing without it hurts),
// grab floor loot, heal with medkits/shields and be the last one standing as the storm closes.
import { THREE, clamp, lerp, damp, angleLerp, rand } from "./engine.js";
import { makeCharacter, animate, makeGun, mat } from "./models.js";
import { sfx } from "./audio.js";

const HALF = 200, N = 101, STEP = (HALF * 2) / (N - 1);
const ISLAND = 170;
const PLAYERS = 12;
const GRAV = 24;
const P_R = 0.5;
const WEAPONS = {
  pistol: { name: "Pistol", dmg: 22, rate: 3.5, mag: 12, reload: 1.2, spread: 0.018, range: 130, pellets: 1, snd: 0.8, best: [0, 45] },
  smg: { name: "SMG", dmg: 14, rate: 11, mag: 28, reload: 1.8, spread: 0.045, range: 90, pellets: 1, snd: 0.6, best: [0, 28] },
  shotgun: { name: "Shotgun", dmg: 11, rate: 1.1, mag: 5, reload: 2.6, spread: 0.085, range: 40, pellets: 8, snd: 1.6, best: [0, 12] },
  rifle: { name: "Rifle", dmg: 25, rate: 6, mag: 30, reload: 2.2, spread: 0.022, range: 170, pellets: 1, snd: 1, best: [15, 90] },
  sniper: { name: "Sniper", dmg: 92, rate: 0.8, mag: 4, reload: 2.8, spread: 0.05, aimSpread: 0.001, range: 320, pellets: 1, snd: 2, zoom: 22, best: [55, 320] },
};
const FISTS = { name: "Fists", dmg: 18, rate: 2, range: 2.8, melee: true };
const KIND_W = [["pistol", 26], ["smg", 22], ["shotgun", 20], ["rifle", 22], ["sniper", 10]];
const RARITY = [
  { name: "Common", col: 0x9aa5b5, css: "#9aa5b5", mult: 1 },
  { name: "Rare", col: 0x4aa3ff, css: "#4aa3ff", mult: 1.08 },
  { name: "Epic", col: 0xb46bff, css: "#b46bff", mult: 1.16 },
  { name: "Legendary", col: 0xffb02e, css: "#ffb02e", mult: 1.25 },
];
const PHASES = [
  { wait: 45, shrink: 25, r: 125, dps: 1 }, { wait: 30, shrink: 20, r: 80, dps: 2 }, { wait: 25, shrink: 18, r: 48, dps: 4 },
  { wait: 20, shrink: 15, r: 24, dps: 6 }, { wait: 15, shrink: 14, r: 9, dps: 8 }, { wait: 10, shrink: 12, r: 0, dps: 10 },
];
const POI_NAMES = ["Pine Hollow", "Rusty Docks", "Storm Point", "Sunny Fields", "Crater Lab", "Old Mill"];
const BOT_NAMES = ["Nova", "Blaze", "Kai", "Mako", "Onyx", "Iris", "Rex", "Luna", "Zed", "Pixel", "Vex", "Juno", "Ash", "Echo"];

// ---- noise ----
function hash(x, z, s) {
  let h = (x * 374761393 + z * 668265263 + s * 1442695041) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function vnoise(x, z, s) {
  const xi = Math.floor(x), zi = Math.floor(z), fx = x - xi, fz = z - zi;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = hash(xi, zi, s), b = hash(xi + 1, zi, s), c = hash(xi, zi + 1, s), d = hash(xi + 1, zi + 1, s);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}
function fbm(x, z, s) {
  let t = 0, a = 0.5, f = 1;
  for (let i = 0; i < 4; i++) { t += vnoise(x * f, z * f, s + i) * a; a *= 0.5; f *= 2; }
  return t / 0.9375;
}
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

// ---- ray helpers ----
function rayBox(o, d, mn, mx) {
  let t0 = 0, t1 = Infinity;
  for (const k of ["x", "y", "z"]) {
    const inv = 1 / (Math.abs(d[k]) < 1e-9 ? 1e-9 : d[k]);
    let ta = (mn[k] - o[k]) * inv, tb = (mx[k] - o[k]) * inv;
    if (ta > tb) { const s = ta; ta = tb; tb = s; }
    t0 = Math.max(t0, ta); t1 = Math.min(t1, tb);
    if (t0 > t1) return null;
  }
  return t0;
}
function raySphere(o, d, cx, cy, cz, r) {
  const ox = o.x - cx, oy = o.y - cy, oz = o.z - cz;
  const b = ox * d.x + oy * d.y + oz * d.z;
  const h = b * b - (ox * ox + oy * oy + oz * oz - r * r);
  if (h < 0) return null;
  const t = -b - Math.sqrt(h);
  return t >= 0 ? t : null;
}
function weighted(list) {
  let tot = 0;
  for (const [, w] of list) tot += w;
  let r = Math.random() * tot;
  for (const [k, w] of list) { r -= w; if (r <= 0) return k; }
  return list[0][0];
}
function pickRarity(bonus) {
  const r = Math.random() * (1 + bonus);
  return r > 0.97 ? 3 : r > 0.86 ? 2 : r > 0.6 ? 1 : 0;
}

export class BattleRoyale {
  constructor(app) {
    this.app = app;
    this.input = app.input;
    this.autoplay = new URLSearchParams(location.search).has("autoplay");
    this.scene = new THREE.Scene();
    const sky = 0x9ccaf0;
    this.scene.background = new THREE.Color(sky);
    const far = { low: 260, medium: 380, high: 520 }[app.settings.quality] || 380;
    this.scene.fog = new THREE.Fog(sky, far * 0.35, far);
    this.camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.2, 900);
    this.camYaw = 0;
    this.camPitch = -0.25;
    this.time = 0;
    this.over = false;
    this.feed = [];
    this.loot = [];
    this.boxes = [];
    this.solids = [];            // tree/rock circles {x, z, r}
    this.tracers = [];
    this.players = [];
    this.nearLoot = null;
    this.aimToggle = false;
    this._shotSnd = 0;
    this._miniT = 0;
    this._buildWorld();
    this._buildLoot();
    this._buildPlayers();
    this._buildBus();
    this._buildStorm();
    this._buildTracers();
    this._buildHud();
    this._touchLayout();
    this.banner("STORM ROYALE", "Press JUMP to drop from the bus", "#ffd24a", 3);
    app.input.wantLock = true;
  }

  // ------------------------------------------------------------------ world
  _buildWorld() {
    const s = this.scene;
    s.add(new THREE.HemisphereLight(0xdcecff, 0x3a4a2a, 1.5));
    const sun = new THREE.DirectionalLight(0xfff2dd, 1.5);
    sun.position.set(80, 140, 40);
    s.add(sun);
    const seed = Math.floor(Math.random() * 100000);
    this.seed = seed;
    const raw = (x, z) => {
      const r = Math.hypot(x, z) / ISLAND;
      const fall = 1 - smooth(0.62, 1.0, r);
      const n = fbm(x * 0.011 + 17, z * 0.011 - 9, seed);
      const ridge = Math.max(0, fbm(x * 0.02 + 50, z * 0.02 - 30, seed + 7) - 0.55) * 60;
      return lerp(-9, 2 + n * 20 + ridge, fall);
    };
    // Named places, spread out, on flattened ground
    this.pois = [];
    for (let tries = 0; this.pois.length < POI_NAMES.length && tries < 400; tries++) {
      const a = Math.random() * Math.PI * 2, d = rand(25, 125);
      const x = Math.cos(a) * d, z = Math.sin(a) * d;
      if (this.pois.some((p) => Math.hypot(p.x - x, p.z - z) < 62)) continue;
      const h = raw(x, z);
      if (h < 1.5) continue;
      this.pois.push({ name: POI_NAMES[this.pois.length], x, z, h: clamp(h, 2.5, 18) });
    }
    const H = new Float32Array(N * N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = -HALF + i * STEP, z = -HALF + j * STEP;
      let h = raw(x, z);
      for (const p of this.pois) h = lerp(h, p.h, 1 - smooth(18, 32, Math.hypot(x - p.x, z - p.z)));
      H[j * N + i] = h;
    }
    this.H = H;
    // Terrain mesh from the same grid the physics uses
    const pos = new Float32Array(N * N * 3), col = new Float32Array(N * N * 3);
    const c = new THREE.Color();
    const sand = new THREE.Color(0xd9c38a), g1 = new THREE.Color(0x4f9a3d), g2 = new THREE.Color(0x3a7a30),
      rock = new THREE.Color(0x8a8577), snow = new THREE.Color(0xf0f2f5), dirt = new THREE.Color(0x9a8a5a);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i, x = -HALF + i * STEP, z = -HALF + j * STEP, h = H[k];
      pos[k * 3] = x; pos[k * 3 + 1] = h; pos[k * 3 + 2] = z;
      if (h < 1.4) c.copy(sand);
      else if (h > 30) c.copy(snow);
      else if (h > 19) c.copy(rock);
      else c.copy(g1).lerp(g2, vnoise(x * 0.05, z * 0.05, seed + 3));
      for (const p of this.pois) { const d = Math.hypot(x - p.x, z - p.z); if (d < 20) c.lerp(dirt, (1 - d / 20) * 0.8); }
      col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b;
    }
    const idx = [];
    for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
      const a = j * N + i, b = a + 1, cc = a + N, d = cc + 1;
      idx.push(a, cc, b, b, cc, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    s.add(new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true })));
    const water = new THREE.Mesh(new THREE.PlaneGeometry(1800, 1800), new THREE.MeshLambertMaterial({ color: 0x2a78b8, transparent: true, opacity: 0.88 }));
    water.rotation.x = -Math.PI / 2;
    s.add(water);

    // Houses at each place (solid boxes you can stand on)
    const walls = [0xe8dcc0, 0xc9d6e3, 0xe0b89a, 0xb8d0a8, 0xd8c8e8, 0xf0e0a0];
    for (const p of this.pois) {
      const n = 4 + Math.floor(Math.random() * 3);
      p.houses = [];
      for (let t = 0; t < 40 && p.houses.length < n; t++) {
        const a = Math.random() * Math.PI * 2, d = rand(5, 17);
        const w = rand(7, 11), dp = rand(7, 11), h = rand(4.5, 7.5);
        const x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
        const mn = new THREE.Vector3(x - w / 2, p.h - 1, z - dp / 2), mx = new THREE.Vector3(x + w / 2, p.h + h, z + dp / 2);
        if (this.boxes.some((b) => mn.x < b.max.x + 3 && mx.x > b.min.x - 3 && mn.z < b.max.z + 3 && mx.z > b.min.z - 3)) continue;
        const box = { min: mn, max: mx };
        this.boxes.push(box);
        p.houses.push(box);
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h + 1, dp), mat(walls[Math.floor(Math.random() * walls.length)]));
        m.position.set(x, p.h - 1 + (h + 1) / 2, z);
        s.add(m);
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 0.8, 0.5, dp + 0.8), mat([0x8a3b2e, 0x3b4a6a, 0x4a4a4a][t % 3]));
        roof.position.set(x, p.h + h + 0.1, z);
        s.add(roof);
        box.max.y += 0.35;
        // A dark door + windows so it reads as a house
        const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 0.1), mat(0x4a3526));
        door.position.set(x, p.h + 1.2, z + dp / 2 + 0.05);
        s.add(door);
        for (const sx of [-1, 1]) {
          const win = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.1, 0.1), mat(0x9fd4ff));
          win.position.set(x + sx * w * 0.28, p.h + Math.min(h - 1.3, 3), z + dp / 2 + 0.05);
          s.add(win);
        }
      }
    }

    // Trees + rocks, instanced (2-3 draw calls for hundreds of them)
    const q = this.app.engine.q;
    const nTrees = Math.floor(420 * q.trees);
    const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.25, 0.35, 2.4, 6), mat(0x6b4a2e), nTrees);
    const leaves = new THREE.InstancedMesh(new THREE.ConeGeometry(1.7, 4.4, 7), mat(0x2f7a3a), nTrees);
    const m4 = new THREE.Matrix4(), qt = new THREE.Quaternion(), sc = new THREE.Vector3(), v = new THREE.Vector3();
    let placed = 0;
    for (let t = 0; t < nTrees * 6 && placed < nTrees; t++) {
      const x = rand(-ISLAND, ISLAND), z = rand(-ISLAND, ISLAND);
      const h = this.height(x, z);
      if (h < 2 || h > 24) continue;
      if (this.pois.some((p) => Math.hypot(p.x - x, p.z - z) < 24)) continue;
      const k = rand(0.8, 1.45);
      sc.setScalar(k);
      m4.compose(v.set(x, h + 1.2 * k, z), qt, sc);
      trunks.setMatrixAt(placed, m4);
      m4.compose(v.set(x, h + (2.4 + 2.0) * k, z), qt, sc);
      leaves.setMatrixAt(placed, m4);
      leaves.setColorAt(placed, new THREE.Color().setHSL(0.3 + Math.random() * 0.06, 0.5, 0.28 + Math.random() * 0.1));
      this.solids.push({ x, z, r: 0.45 * k });
      placed++;
    }
    trunks.count = leaves.count = placed;
    s.add(trunks, leaves);
    const nRocks = Math.floor(90 * q.trees);
    const rocks = new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1, 0), mat(0x8d8a82), nRocks);
    let rp = 0;
    for (let t = 0; t < nRocks * 5 && rp < nRocks; t++) {
      const x = rand(-ISLAND, ISLAND), z = rand(-ISLAND, ISLAND);
      const h = this.height(x, z);
      if (h < 0.5) continue;
      const k = rand(0.6, 2.4);
      qt.setFromEuler(new THREE.Euler(Math.random() * 3, Math.random() * 3, 0));
      m4.compose(v.set(x, h + k * 0.3, z), qt, sc.set(k, k * 0.75, k));
      rocks.setMatrixAt(rp++, m4);
      if (k > 1.3) this.solids.push({ x, z, r: k * 0.8 });
    }
    rocks.count = rp;
    s.add(rocks);
    // Collision grid for trees/rocks (20 m cells)
    this.solidGrid = new Map();
    for (const o of this.solids) {
      const key = `${Math.floor(o.x / 20)},${Math.floor(o.z / 20)}`;
      if (!this.solidGrid.has(key)) this.solidGrid.set(key, []);
      this.solidGrid.get(key).push(o);
    }
  }

  height(x, z) {
    const fx = (x + HALF) / STEP, fz = (z + HALF) / STEP;
    if (fx < 0 || fz < 0 || fx >= N - 1 || fz >= N - 1) return -9;
    const i = Math.floor(fx), j = Math.floor(fz), u = fx - i, v = fz - j, H = this.H;
    const a = H[j * N + i], b = H[j * N + i + 1], c = H[(j + 1) * N + i], d = H[(j + 1) * N + i + 1];
    return lerp(lerp(a, b, u), lerp(c, d, u), v);
  }

  // Ground under a point: terrain, the shallow sea floor, or a roof you are above.
  groundAt(x, z, y = 1e9) {
    let g = Math.max(this.height(x, z), -1.2);
    for (const b of this.boxes) {
      if (x > b.min.x && x < b.max.x && z > b.min.z && z < b.max.z && b.max.y <= y + 0.6) g = Math.max(g, b.max.y);
    }
    return g;
  }

  _randomLand(minH = 2) {
    for (let t = 0; t < 60; t++) {
      const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * ISLAND * 0.85;
      const x = Math.cos(a) * d, z = Math.sin(a) * d;
      if (this.height(x, z) > minH && !this.boxes.some((b) => x > b.min.x - 1 && x < b.max.x + 1 && z > b.min.z - 1 && z < b.max.z + 1)) return new THREE.Vector3(x, 0, z);
    }
    return new THREE.Vector3(0, 0, 0);
  }

  // ------------------------------------------------------------------ loot
  _buildLoot() {
    const item = (bonus) => {
      const r = Math.random();
      if (r < 0.7) return { kind: "weapon", w: { kind: weighted(KIND_W), rarity: pickRarity(bonus) } };
      return { kind: r < 0.88 ? "med" : "shield" };
    };
    for (const p of this.pois) {
      for (let i = 0; i < 8; i++) {
        const a = Math.random() * Math.PI * 2, d = rand(3, 22);
        const x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
        if (this.boxes.some((b) => x > b.min.x - 0.8 && x < b.max.x + 0.8 && z > b.min.z - 0.8 && z < b.max.z + 0.8)) { i--; continue; }
        this._spawnLoot(item(0.12), x, z);
      }
      for (const b of p.houses) if (Math.random() < 0.6) {      // roof loot: glide onto it
        this._spawnLoot({ kind: "weapon", w: { kind: weighted(KIND_W), rarity: pickRarity(0.2) } }, (b.min.x + b.max.x) / 2, (b.min.z + b.max.z) / 2);
      }
    }
    for (let i = 0; i < 40; i++) { const v = this._randomLand(); this._spawnLoot(item(0), v.x, v.z); }
  }

  _spawnLoot(it, x, z) {
    const y = this.groundAt(x, z);
    const g = new THREE.Group();
    let col = 0xffffff;
    if (it.kind === "weapon") {
      col = RARITY[it.w.rarity].col;
      const gun = makeGun(it.w.kind, col);
      gun.position.set(0, 0.7, 0);
      gun.rotation.set(0, 0, Math.PI / 2);
      gun.scale.setScalar(1.5);
      g.add(gun);
      it.w.ammo = it.w.ammo ?? WEAPONS[it.w.kind].mag;
    } else if (it.kind === "med") {
      col = 0xff5a5a;
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 0.45), mat(0xf4f4f4));
      box.position.y = 0.5;
      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.3), mat(0xe03030));
      cross.position.y = 0.5;
      const cross2 = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.3, 0.12), mat(0xe03030));
      cross2.position.y = 0.5;
      g.add(box, cross, cross2);
    } else {
      col = 0x4ab8ff;
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.7, 10), mat(0x4ab8ff));
      b.position.y = 0.55;
      g.add(b);
    }
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.8, 20), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.06;
    g.add(ring);
    if (it.kind === "weapon" && it.w.rarity >= 2) {
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 7, 6, 1, true),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.35, depthWrite: false }));
      beam.position.y = 3.5;
      g.add(beam);
    }
    g.position.set(x, y, z);
    this.scene.add(g);
    const l = { ...it, pos: new THREE.Vector3(x, y, z), mesh: g, spin: g.children[0], alive: true };
    this.loot.push(l);
    return l;
  }

  _removeLoot(l) {
    l.alive = false;
    this.scene.remove(l.mesh);
    l.mesh.traverse((o) => o.geometry && !o.isInstancedMesh && o.geometry.dispose());
  }

  _lootName(l) {
    if (l.kind === "med") return "Medkit";
    if (l.kind === "shield") return "Shield potion";
    return `${RARITY[l.w.rarity].name} ${WEAPONS[l.w.kind].name}`;
  }

  // ------------------------------------------------------------------ players
  _buildPlayers() {
    const names = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    const hues = [0x3d8bff, 0xff5a5a, 0x6ddc6d, 0xffb02e, 0xb46bff, 0x4affe8, 0xff7ad0, 0xe8e8e8, 0x2b2b2b, 0xffe04a, 0x7a5a3a, 0x3affa0];
    for (let i = 0; i < PLAYERS; i++) {
      const human = i === 0;
      const look = human ? this.app.look : { body: hues[i % hues.length], pants: [0x2b3a55, 0x3a3a3a, 0x5a4a2a][i % 3],
        skin: [0xf2c9a0, 0xc68a5a, 0x8a5a3a, 0xf6d6b8][i % 4], hair: [0x3b2a1e, 0x111111, 0xe0c060, 0x8a4a2a][(i * 3) % 4] };
      const ch = makeCharacter(look);
      const glider = new THREE.Group();
      const wing = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 1.5), mat(human ? 0xffd24a : hues[(i + 3) % hues.length]));
      wing.position.y = 3.0;
      wing.rotation.x = 0.15;
      glider.add(wing);
      for (const sx of [-1, 1]) {
        const strut = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.3, 0.05), mat(0x333333));
        strut.position.set(sx * 0.6, 2.35, 0);
        strut.rotation.z = sx * 0.35;
        glider.add(strut);
      }
      glider.visible = false;
      ch.root.add(glider);
      ch.root.visible = false;
      this.scene.add(ch.root);
      this.players.push({
        i, human, name: human ? this.app.playerName : names.pop(), ch, glider,
        pos: new THREE.Vector3(), vel: new THREE.Vector3(), wish: new THREE.Vector3(), aimDir: new THREE.Vector3(0, 0, -1),
        yaw: 0, pitch: 0, hp: 100, shield: 0, alive: true, phase: "bus", grounded: false, slots: [null, null, null], cur: 0,
        fireCd: 0, reloadT: 0, useT: 0, useKind: null, meds: 0, shields: 0, kills: 0, gunKey: "", sprint: false, aiming: false,
        wantFire: false, jumpReq: false, deadT: 0, place: 0,
        skill: rand(0.3, 0.75), jumpAt: rand(1.5, 12.5),
        ai: { scan: 0, target: null, seen: 0, react: 0, loot: null, wander: null, wanderT: 0, strafe: 1, strafeT: 0, stuck: 0, dodge: 0, dodgeDir: 1, land: null, openAt: rand(30, 55) },
      });
    }
    this.me = this.players[0];
  }

  _buildBus() {
    const a = Math.random() * Math.PI * 2, off = rand(-50, 50);
    const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const side = new THREE.Vector3(-dir.z, 0, dir.x);
    const start = dir.clone().multiplyScalar(-230).addScaledVector(side, off);
    start.y = 130;
    this.bus = { pos: start, dir, t: 0, speed: 32 };
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.2, 9), mat(0x2f6bff));
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.6, 9.1), mat(0xffd24a));
    stripe.position.y = 0.4;
    const balloon = new THREE.Mesh(new THREE.SphereGeometry(4.2, 14, 10), mat(0x4affe8));
    balloon.position.y = 6.5;
    balloon.scale.set(1, 0.8, 1.5);
    g.add(body, stripe, balloon);
    g.lookAt(dir);
    this.busMesh = g;
    this.scene.add(g);
  }

  _leaveBus(p) {
    p.phase = "fall";
    p.pos.copy(this.bus.pos).y -= 3;
    p.vel.copy(this.bus.dir).multiplyScalar(10);
    p.ch.root.visible = true;
    if (!p.human || this.autoplay) {
      const ai = p.ai;
      ai.land = Math.random() < 0.6 && this.pois.length ? (() => {
        const q = this.pois[Math.floor(Math.random() * this.pois.length)];
        return new THREE.Vector3(q.x + rand(-15, 15), 0, q.z + rand(-15, 15));
      })() : this._randomLand();
    }
    if (p.human) { sfx.jump(); this.banner("", "Press JUMP to open your glider", "#ffd24a", 2.5); }
  }

  // ------------------------------------------------------------------ storm
  _buildStorm() {
    this.storm = { phase: 0, state: "wait", t: PHASES[0].wait, c: new THREE.Vector2(0, 0), r: 240,
      from: { c: new THREE.Vector2(0, 0), r: 240 }, to: { c: new THREE.Vector2(), r: 0 }, tick: 1 };
    this._nextCircle();
    this.stormMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 56, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x8a3cff, transparent: true, opacity: 0.2, side: THREE.DoubleSide, depthWrite: false, fog: false }));
    this.stormMesh.renderOrder = 4;
    this.scene.add(this.stormMesh);
  }

  _nextCircle() {
    const s = this.storm, ph = PHASES[s.phase];
    const room = Math.max(0, s.r - ph.r) * 0.9;
    const a = Math.random() * Math.PI * 2, d = Math.random() * room;
    s.to.c.set(s.c.x + Math.cos(a) * d, s.c.y + Math.sin(a) * d);
    if (s.to.c.length() > 110) s.to.c.setLength(110);
    s.to.r = ph.r;
  }

  _stepStorm(dt) {
    const s = this.storm;
    if (s.state === "wait") {
      const before = s.t;
      s.t -= dt;
      if (before > 10 && s.t <= 10 && s.phase < PHASES.length) this.showMsg("Storm closes in 10 seconds", "#c9a0ff");
      if (s.t <= 0) {
        if (s.phase >= PHASES.length) { s.t = 1e9; return; }
        s.state = "shrink";
        s.t = PHASES[s.phase].shrink;
        s.from.c.copy(s.c); s.from.r = s.r;
        this.banner("STORM CLOSING", s.phase === PHASES.length - 1 ? "Final circle!" : "Get inside the white circle", "#b46bff", 2.2);
        sfx.storm();
      }
    } else if (s.state === "shrink") {
      s.t -= dt;
      const k = 1 - clamp(s.t / PHASES[s.phase].shrink, 0, 1);
      s.c.lerpVectors(s.from.c, s.to.c, k);
      s.r = lerp(s.from.r, s.to.r, k);
      if (s.t <= 0) {
        s.phase++;
        if (s.phase < PHASES.length) { this._nextCircle(); s.state = "wait"; s.t = PHASES[s.phase].wait; }
        else { s.state = "final"; s.t = 0; }
      }
    }
    // Damage ticks once a second
    s.tick -= dt;
    if (s.tick <= 0) {
      s.tick = 1;
      if (this.players.filter((p) => p.alive).length <= 1) return;
      const dps = PHASES[Math.min(s.phase, PHASES.length - 1)].dps;
      for (const p of this.players) {
        if (!p.alive || p.phase === "bus") continue;
        if (Math.hypot(p.pos.x - s.c.x, p.pos.z - s.c.y) > s.r) this._damage(p, dps, null, false, "storm");
      }
    }
  }

  _outside(p, margin = 0) { const s = this.storm; return Math.hypot(p.pos.x - s.c.x, p.pos.z - s.c.y) > s.r - margin; }

  // ------------------------------------------------------------------ effects
  _buildTracers() {
    const n = 64;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 6), 3));
    this.tracerMesh = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: 0xfff0a0, transparent: true, opacity: 0.85 }));
    this.tracerMesh.frustumCulled = false;
    this.tracerN = n;
    this.scene.add(this.tracerMesh);
  }

  _tracer(a, b) {
    if (this.tracers.length >= this.tracerN) this.tracers.shift();
    this.tracers.push({ a: a.clone(), b: b.clone(), t: 0.06 });
  }

  // ------------------------------------------------------------------ HUD + touch
  _buildHud() {
    const hud = document.getElementById("hud");
    hud.innerHTML = `
      <div id="hurt" class="fx-hurt"></div><div id="stormFx" class="fx-storm"></div>
      <div class="hud-tl"><button class="pill" id="pauseBtn">II</button></div>
      <canvas class="minimap" id="mini" width="150" height="150"></canvas>
      <div class="br-info"><div id="alive">12 ALIVE</div><div id="kills">0 ELIMS</div><div id="stormTxt"></div></div>
      <div class="feed" id="feed"></div>
      <div class="crosshair" id="cross"></div><div class="hitmark" id="hit"></div>
      <div class="vitals">
        <div class="ammo" id="ammo"></div>
        <div class="bar"><i id="shBar" style="background:#4ab8ff"></i></div>
        <div class="bar"><i id="hpBar" style="background:#6ddc6d;width:100%"></i></div>
        <div class="slots" id="slots"></div>
      </div>
      <div class="prompt" id="prompt"></div>
      <div class="center-msg" id="msg"></div><div id="banner"></div>`;
    this.el = (id) => document.getElementById(id);
    this.el("pauseBtn").onclick = () => this.app.pause();
    this.mini = this.el("mini");
    this._miniBase();
    this._slotsKey = "";
    this.el("slots").onclick = (e) => {
      const s = e.target.closest(".slot");
      if (!s) return;
      const i = Number(s.dataset.i);
      if (i === 3) this._startUse(this.me);
      else this._select(this.me, i);
    };
  }

  _miniBase() {
    const S = 150, cv = document.createElement("canvas");
    cv.width = cv.height = S;
    const g = cv.getContext("2d"), img = g.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const h = this.height(-HALF + (x / S) * HALF * 2, -HALF + (y / S) * HALF * 2);
      const k = (y * S + x) * 4;
      const c = h < 0 ? [42, 120, 184] : h < 1.4 ? [217, 195, 138] : h > 30 ? [240, 242, 245] : h > 19 ? [138, 133, 119] : [79 - h, 154 - h * 1.5, 61];
      img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    g.fillStyle = "#3a2a1a";
    for (const b of this.boxes) {
      const k = S / (HALF * 2);
      g.fillRect((b.min.x + HALF) * k, (b.min.z + HALF) * k, Math.max(1, (b.max.x - b.min.x) * k), Math.max(1, (b.max.z - b.min.z) * k));
    }
    this.miniImg = cv;
  }

  _touchLayout() {
    this.app.touch.setLayout([
      { id: "fire", label: "FIRE", action: "fire", x: 120, y: 135, r: 66, color: "#ff6b50", drag: true },
      { id: "aim", label: "AIM", action: "aim", x: 270, y: 96, r: 44, color: "#7ad7ff", drag: true },
      { id: "jump", label: "JUMP", action: "jump", x: 96, y: 292, r: 46, color: "#6ddc6d" },
      { id: "reload", label: "RELOAD", action: "reload", x: 240, y: 228, r: 36, color: "#ffd24a" },
      { id: "use", label: "HEAL", action: "use", x: 336, y: 212, r: 32, color: "#ffb02e" },
      { id: "swap", label: "SWAP", action: "swap", x: 110, y: 430, r: 28, color: "#c9a0ff" },
    ]);
    this._labels = {};
  }

  _label(id, text) {
    if (this._labels[id] === text) return;
    this._labels[id] = text;
    this.app.touch.setLabel(id, text);
  }

  banner(title, sub = "", color = "#fff", secs = 2.2) {
    const b = this.el("banner");
    b.innerHTML = `<div class="banner" style="--bc:${color}">${title ? `<h1>${title}</h1>` : ""}${sub ? `<p>${sub}</p>` : ""}</div>`;
    clearTimeout(this._bt);
    this._bt = setTimeout(() => { b.innerHTML = ""; }, secs * 1000);
  }

  showMsg(t, color = "#fff") {
    const m = this.el("msg");
    m.textContent = t;
    m.style.color = color;
    clearTimeout(this._mt);
    this._mt = setTimeout(() => (m.textContent = ""), 1600);
  }

  _addFeed(text) {
    this.feed.push({ text, t: 6 });
    if (this.feed.length > 5) this.feed.shift();
    this._feedDirty = true;
  }

  // ------------------------------------------------------------------ main step
  update(dt) {
    const inp = this.input;
    inp.poll();
    if (this.app.paused) return;
    if (inp.pressed("pause")) { this.app.pause(); return; }
    const look = inp.takeLook();
    const zoom = this.camera.fov / 65;
    this.camYaw -= look.x * 0.0042 * zoom;
    this.camPitch = clamp(this.camPitch - look.y * 0.0042 * zoom, -1.25, 1.0);
    this.time += dt;
    // Bus
    const bus = this.bus;
    if (bus) {
      bus.t += dt;
      bus.pos.addScaledVector(bus.dir, bus.speed * dt);
      const leaving = bus.t > 14;
      for (const p of this.players) if (p.phase === "bus" && (leaving || ((!p.human || this.autoplay) && bus.t >= p.jumpAt))) this._leaveBus(p);
      if (!this.players.some((p) => p.phase === "bus")) { this.scene.remove(this.busMesh); this.bus = null; }
    }
    this._stepStorm(dt);
    for (const p of this.players) {
      if (!p.alive) continue;
      if (p.human && !this.autoplay) this._humanControl(p, dt);
      else this._think(p, dt);
    }
    for (const p of this.players) this._stepPlayer(p, dt);
    this._aimAssist(dt);
    this._pickups();
    for (const f of this.feed) f.t -= dt;
    if (this.feed.length && this.feed[0].t <= 0) { this.feed.shift(); this._feedDirty = true; }
  }

  _humanControl(p, dt) {
    const inp = this.input;
    const f = new THREE.Vector3(-Math.sin(this.camYaw), 0, -Math.cos(this.camYaw));
    const r = new THREE.Vector3(Math.cos(this.camYaw), 0, -Math.sin(this.camYaw));
    p.wish.copy(f.multiplyScalar(inp.move.y).add(r.multiplyScalar(inp.move.x)));
    p.sprint = !!inp.held.sprint;
    if (inp.pressed("aim")) this.aimToggle = !this.aimToggle;
    p.aiming = p.phase === "ground" && (inp.device === "touch" ? this.aimToggle : !!inp.held.aim);
    p.jumpReq = false;
    if (inp.pressed("jump")) {
      if (p.phase === "bus") this._leaveBus(p);
      else if (p.phase === "fall" || p.phase === "glide") {
        const agl = p.pos.y - this.groundAt(p.pos.x, p.pos.z, p.pos.y);
        if (p.phase === "glide") p.phase = "fall";
        else if (agl > 3) { p.phase = "glide"; sfx.pickup(); }
      } else p.jumpReq = true;
    }
    p.wantFire = !!inp.held.fire && p.phase === "ground";
    if (inp.pressed("reload")) this._reload(p);
    for (let i = 0; i < 3; i++) if (inp.pressed(`slot${i + 1}`)) this._select(p, i);
    if (inp.pressed("slot4")) this._startUse(p);
    if (inp.pressed("swap") || inp.pressed("next")) this._cycle(p, 1);
    if (inp.pressed("prev")) this._cycle(p, -1);
    if (inp.pressed("use")) this._useOrSwap(p);
    p.aimDir.set(-Math.sin(this.camYaw) * Math.cos(this.camPitch), Math.sin(this.camPitch), -Math.cos(this.camYaw) * Math.cos(this.camPitch));
    p.pitch = this.camPitch;
  }

  _stepPlayer(p, dt) {
    if (!p.alive) { p.deadT += dt; return; }
    p.fireCd = Math.max(0, p.fireCd - dt);
    p.hurtT = Math.max(0, (p.hurtT || 0) - dt);
    if (p.reloadT > 0) {
      p.reloadT -= dt;
      if (p.reloadT <= 0) { const w = p.slots[p.cur]; if (w) w.ammo = WEAPONS[w.kind].mag; }
    }
    if (p.useT > 0) {
      p.useT -= dt;
      if (p.useT <= 0) {
        if (p.useKind === "med" && p.meds > 0) { p.meds--; p.hp = Math.min(100, p.hp + 50); }
        if (p.useKind === "shield" && p.shields > 0) { p.shields--; p.shield = Math.min(100, p.shield + 50); }
        if (p.human) sfx.pickup();
        p.useKind = null;
      }
    }
    if (p.phase === "bus") { p.pos.copy(this.bus ? this.bus.pos : p.pos); return; }
    if (p.phase === "fall" || p.phase === "glide") {
      const glide = p.phase === "glide";
      const hs = glide ? 15 : 22;
      p.vel.x = damp(p.vel.x, p.wish.x * hs, glide ? 2 : 1.5, dt);
      p.vel.z = damp(p.vel.z, p.wish.z * hs, glide ? 2 : 1.5, dt);
      p.vel.y = damp(p.vel.y, glide ? -7.5 : -46, glide ? 3 : 0.8, dt);
      p.pos.addScaledVector(p.vel, dt);
      this._collide(p);
      const g = this.groundAt(p.pos.x, p.pos.z, p.pos.y);
      if (p.pos.y <= g) {
        p.pos.y = g;
        if (!glide && p.vel.y < -21) this._damage(p, Math.round((-p.vel.y - 16) * 1.7), null, false, "fall");
        p.vel.set(0, 0, 0);
        p.phase = "ground";
        p.grounded = true;
        if (p.human) {
          const poi = this.pois.find((q) => Math.hypot(q.x - p.pos.x, q.z - p.pos.z) < 32);
          if (poi) this.banner(poi.name.toUpperCase(), "", "#ffd24a", 1.8);
        }
      }
      if (p.wish.lengthSq() > 0.01) p.yaw = angleLerp(p.yaw, Math.atan2(-p.wish.x, -p.wish.z), 1 - Math.exp(-4 * dt));
      return;
    }
    // On foot
    const inWater = p.pos.y < -0.2;
    const speed = (p.sprint ? 10.2 : 7.2) * (p.aiming ? 0.6 : 1) * (p.useT > 0 ? 0.45 : 1) * (inWater ? 0.6 : 1);
    const k = p.grounded ? 12 : 3;
    p.vel.x = damp(p.vel.x, p.wish.x * speed, k, dt);
    p.vel.z = damp(p.vel.z, p.wish.z * speed, k, dt);
    if (p.jumpReq && p.grounded) { p.vel.y = 9.2; p.grounded = false; if (p.human) sfx.jump(); }
    p.jumpReq = false;
    p.vel.y -= GRAV * dt;
    p.pos.addScaledVector(p.vel, dt);
    this._collide(p);
    const g = this.groundAt(p.pos.x, p.pos.z, p.pos.y);
    if (p.pos.y <= g) {
      if (p.vel.y < -21) this._damage(p, Math.round((-p.vel.y - 16) * 1.7), null, false, "fall");
      p.pos.y = g; p.vel.y = 0; p.grounded = true;
    } else if (p.grounded && p.pos.y - g < 0.7 && p.vel.y <= 0) { p.pos.y = g; p.vel.y = 0; }
    else p.grounded = false;
    // Facing: armed players face where they aim
    const armed = p.slots[p.cur] || p.wantFire;
    const hs = Math.hypot(p.vel.x, p.vel.z);
    let face = p.yaw;
    if (armed && (p.human ? true : p.ai.target)) face = Math.atan2(-p.aimDir.x, -p.aimDir.z);
    else if (hs > 0.8) face = Math.atan2(-p.vel.x, -p.vel.z);
    p.yaw = angleLerp(p.yaw, face, 1 - Math.exp(-14 * dt));
    if (p.wantFire) this._fire(p);
  }

  _collide(p) {
    // World edge
    const d = Math.hypot(p.pos.x, p.pos.z);
    if (d > 188) { p.pos.x *= 188 / d; p.pos.z *= 188 / d; }
    // Trees and big rocks
    const cx = Math.floor(p.pos.x / 20), cz = Math.floor(p.pos.z / 20);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const list = this.solidGrid.get(`${cx + i},${cz + j}`);
      if (!list) continue;
      for (const o of list) {
        const dx = p.pos.x - o.x, dz = p.pos.z - o.z, dd = Math.hypot(dx, dz), min = o.r + P_R;
        if (dd < min && dd > 1e-4 && p.pos.y < this.height(o.x, o.z) + 3) { p.pos.x = o.x + (dx / dd) * min; p.pos.z = o.z + (dz / dd) * min; }
      }
    }
    // Houses (axis-aligned boxes)
    for (const b of this.boxes) {
      if (p.pos.y >= b.max.y - 0.6 || p.pos.y + 1.9 < b.min.y) continue;
      const nx = clamp(p.pos.x, b.min.x, b.max.x), nz = clamp(p.pos.z, b.min.z, b.max.z);
      const dx = p.pos.x - nx, dz = p.pos.z - nz, dd = Math.hypot(dx, dz);
      if (dd >= P_R) continue;
      if (dd > 1e-4) { p.pos.x = nx + (dx / dd) * P_R; p.pos.z = nz + (dz / dd) * P_R; }
      else {
        const pen = [p.pos.x - b.min.x, b.max.x - p.pos.x, p.pos.z - b.min.z, b.max.z - p.pos.z];
        const m = pen.indexOf(Math.min(...pen));
        if (m === 0) p.pos.x = b.min.x - P_R; else if (m === 1) p.pos.x = b.max.x + P_R;
        else if (m === 2) p.pos.z = b.min.z - P_R; else p.pos.z = b.max.z + P_R;
      }
    }
  }

  // ------------------------------------------------------------------ weapons
  _weapon(p) { const w = p.slots[p.cur]; return w ? WEAPONS[w.kind] : FISTS; }

  _select(p, i) {
    if (i === p.cur || i < 0 || i > 2) return;
    p.cur = i;
    p.reloadT = 0;
    p.fireCd = Math.max(p.fireCd, 0.25);
    if (p.human) sfx.click();
  }

  _cycle(p, dir) {
    for (let k = 1; k <= 3; k++) {
      const i = (p.cur + dir * k + 6) % 3;
      if (p.slots[i]) return this._select(p, i);
    }
  }

  _reload(p) {
    const w = p.slots[p.cur];
    if (!w || p.reloadT > 0 || w.ammo >= WEAPONS[w.kind].mag) return;
    p.reloadT = WEAPONS[w.kind].reload;
    p.useT = 0;
    if (p.human) sfx.click();
  }

  _startUse(p) {
    if (p.useT > 0 || p.phase !== "ground") return;
    const kind = p.hp < 100 && p.meds > 0 ? "med" : p.shield < 100 && p.shields > 0 ? "shield" : null;
    if (!kind) { if (p.human) this.showMsg(p.meds + p.shields ? "Already full" : "No heals - find medkits or shields", "#93a0bd"); return; }
    p.useKind = kind;
    p.useT = kind === "med" ? 2.2 : 1.6;
    p.reloadT = 0;
  }

  _useOrSwap(p) {
    const l = this.nearLoot;
    if (l && l.alive && l.kind === "weapon") {
      const old = p.slots[p.cur];
      p.slots[p.cur] = l.w;
      this._removeLoot(l);
      if (old) this._spawnLoot({ kind: "weapon", w: old }, p.pos.x + rand(-1, 1), p.pos.z + rand(-1, 1));
      p.reloadT = 0;
      sfx.pickup();
      this.nearLoot = null;
      return;
    }
    this._startUse(p);
  }

  _fire(p) {
    if (p.fireCd > 0 || p.reloadT > 0) return;
    const d = this._weapon(p), w = p.slots[p.cur];
    if (w && w.ammo <= 0) { this._reload(p); return; }
    p.useT = 0;
    p.fireCd = (1 / d.rate) * (p.human && !this.autoplay ? 1 : rand(1.3, 2.2));   // bots shoot in looser bursts
    if (d.melee) return this._punch(p);
    w.ammo--;
    const human = p.human && !this.autoplay;
    const origin = human ? this.camera.position.clone() : p.pos.clone().setY(p.pos.y + 1.6);
    if (human) origin.addScaledVector(p.aimDir, p.aiming ? 2.4 : 4.4);
    const moving = Math.hypot(p.vel.x, p.vel.z) > 2;
    let spread = p.aiming && d.aimSpread != null ? d.aimSpread : d.spread * (p.aiming ? 0.55 : 1);
    spread *= (moving ? 1.25 : 1) * (p.grounded ? 1 : 1.6);
    const muzzle = p.pos.clone().setY(p.pos.y + 1.45).addScaledVector(p.aimDir, 0.8);
    const mult = RARITY[w.rarity].mult;
    for (let i = 0; i < d.pellets; i++) {
      const dir = p.aimDir.clone();
      dir.x += rand(-1, 1) * spread; dir.y += rand(-1, 1) * spread; dir.z += rand(-1, 1) * spread;
      dir.normalize();
      const hit = this._ray(origin, dir, d.range, p);
      this._tracer(muzzle, hit.point);
      if (hit.player) {
        const head = hit.head ? (w.kind === "sniper" ? 2 : 1.6) : 1;
        this._damage(hit.player, d.dmg * mult * head, p, hit.head);
      }
    }
    if (human) sfx.shot(d.snd);
    else if (this._shotSnd <= this.time && p.pos.distanceTo(this.me.pos) < 70) { this._shotSnd = this.time + 0.12; sfx.shot(d.snd * 0.4); }
  }

  _punch(p) {
    let best = null, bd = FISTS.range;
    for (const q of this.players) {
      if (q === p || !q.alive || q.phase !== "ground") continue;
      const dx = q.pos.x - p.pos.x, dz = q.pos.z - p.pos.z, d = Math.hypot(dx, dz);
      if (d < bd && (dx * p.aimDir.x + dz * p.aimDir.z) / Math.max(d, 0.01) > 0.4 && Math.abs(q.pos.y - p.pos.y) < 2) { bd = d; best = q; }
    }
    p.ch.kickT = 0.3;
    if (best) this._damage(best, FISTS.dmg, p, false);
    if (p.human) sfx.kick(0.7);
  }

  // Nearest thing along a ray: houses, players (head/body/legs spheres) and terrain.
  _ray(o, d, max, ignore) {
    let best = max, player = null, head = false;
    for (const b of this.boxes) {
      const t = rayBox(o, d, b.min, b.max);
      if (t !== null && t < best) { best = t; player = null; }
    }
    for (const q of this.players) {
      if (q === ignore || !q.alive || q.phase === "bus") continue;
      const dx = q.pos.x - o.x, dz = q.pos.z - o.z;
      if (dx * dx + dz * dz > (best + 3) * (best + 3)) continue;
      for (const [y, r, h] of [[1.93, 0.34, true], [1.25, 0.58, false], [0.5, 0.45, false]]) {
        const t = raySphere(o, d, q.pos.x, q.pos.y + y, q.pos.z, r);
        if (t !== null && t < best) { best = t; player = q; head = h; }
      }
    }
    const tg = this._rayTerrain(o, d, best);
    if (tg !== null) { best = tg; player = null; }
    return { t: best, player, head, point: o.clone().addScaledVector(d, best) };
  }

  _rayTerrain(o, d, max) {
    const st = 1.5;
    let prev = 0;
    for (let t = st; t <= max + st; t += st) {
      const tt = Math.min(t, max);
      const y = o.y + d.y * tt;
      if (y < Math.max(this.height(o.x + d.x * tt, o.z + d.z * tt), -1.2)) {
        let a = prev, b = tt;
        for (let i = 0; i < 6; i++) {
          const m = (a + b) / 2;
          if (o.y + d.y * m < this.height(o.x + d.x * m, o.z + d.z * m)) b = m; else a = m;
        }
        return b;
      }
      prev = tt;
      if (tt >= max) break;
    }
    return null;
  }

  _los(a, b) {
    const d = b.clone().sub(a);
    const len = d.length();
    d.divideScalar(len);
    for (const bx of this.boxes) { const t = rayBox(a, d, bx.min, bx.max); if (t !== null && t < len) return false; }
    for (let t = 3; t < len; t += 3) if (a.y + d.y * t < this.height(a.x + d.x * t, a.z + d.z * t) - 0.2) return false;
    return true;
  }

  _damage(t, dmg, from, head, cause = "") {
    if (!t.alive || dmg <= 0) return;
    let rem = dmg;
    if (t.shield > 0 && cause !== "storm") { const s = Math.min(t.shield, rem); t.shield -= s; rem -= s; }
    t.hp -= rem;
    t.hurtT = 0.3;
    t.useT = 0;
    if (t.human) {
      sfx.hurt();
      this._hurtFx = Math.min(0.75, (this._hurtFx || 0) + 0.35);
      if (cause === "fall") this.showMsg(`FALL DAMAGE -${Math.round(dmg)}`, "#ff6b6b");
    }
    if (from && from.human && !this.autoplay) {
      sfx.hit();
      this._hitT = 0.18;
      this._hitHead = head;
    }
    if (from && !t.ai.target && from !== t) { t.ai.target = from; t.ai.react = 0.3; }
    if (t.hp <= 0) this._kill(t, from, cause);
  }

  _kill(t, from, cause) {
    t.alive = false;
    t.hp = 0;
    t.deadT = 0;
    t.place = this.players.filter((p) => p.alive).length + 1;
    // Drop everything
    for (const w of t.slots) if (w) this._spawnLoot({ kind: "weapon", w }, t.pos.x + rand(-1.5, 1.5), t.pos.z + rand(-1.5, 1.5));
    for (let i = 0; i < t.meds; i++) this._spawnLoot({ kind: "med" }, t.pos.x + rand(-1.5, 1.5), t.pos.z + rand(-1.5, 1.5));
    for (let i = 0; i < t.shields; i++) this._spawnLoot({ kind: "shield" }, t.pos.x + rand(-1.5, 1.5), t.pos.z + rand(-1.5, 1.5));
    t.slots = [null, null, null];
    t.meds = t.shields = 0;
    if (from && from !== t) {
      from.kills++;
      if (from.human) {
        this.app.stats.kills++;
        this.showMsg(`ELIMINATED ${t.name}`, "#ffd24a");
      }
      this._addFeed(`${from.name} ⟶ ${t.name}`);
    } else this._addFeed(cause === "storm" ? `${t.name} was lost in the storm` : cause === "fall" ? `${t.name} fell too far` : `${t.name} was eliminated`);
    for (const p of this.players) if (p.ai.target === t) p.ai.target = null;
    console.log(`KILL ${t.name} by=${from ? from.name : cause} alive=${this.players.filter((p) => p.alive).length} t=${this.time.toFixed(1)}`);
    const alive = this.players.filter((p) => p.alive);
    if (t === this.me) this._end(false);
    else if (alive.length === 1 && alive[0] === this.me) this._end(true);
    else if (alive.length === 1 && !this.me.alive) console.log(`WINNER ${alive[0].name}`);
  }

  _end(won) {
    if (this.over) return;
    this.over = true;
    const me = this.me;
    const place = won ? 1 : me.place;
    won ? sfx.win() : sfx.lose();
    if (won) this.banner("VICTORY ROYALE", `${me.kills} eliminations`, "#ffd24a", 3);
    else this.banner(`#${place}`, "Eliminated", "#ff6b6b", 2.5);
    this.app.stats.matches++;
    if (won) this.app.stats.wins++;
    this.app.saveStats();
    console.log(`BR END won=${won} place=${place} kills=${me.kills} t=${this.time.toFixed(1)}`);
    const t = Math.floor(this.time);
    this._endT = setTimeout(() => this.app.results({
      title: won ? "VICTORY ROYALE" : `#${place} OF ${PLAYERS}`, color: won ? "#ffd24a" : "#93a0bd",
      lines: [`${me.kills} eliminations`, `Survived ${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`],
      again: () => this.app.start("br", {}),
    }), 2600);
  }

  _pickups() {
    this.nearLoot = null;
    for (const p of this.players) {
      if (!p.alive || p.phase !== "ground") continue;
      for (const l of this.loot) {
        if (!l.alive) continue;
        const dx = l.pos.x - p.pos.x, dz = l.pos.z - p.pos.z;
        if (dx * dx + dz * dz > 3.2 || Math.abs(l.pos.y - p.pos.y) > 2.5) continue;
        if (l.kind === "med" || l.kind === "shield") {
          const key = l.kind === "med" ? "meds" : "shields";
          if (p[key] < 3) { p[key]++; this._removeLoot(l); if (p.human) { sfx.pickup(); this.showMsg(`+1 ${this._lootName(l)}`, "#6ddc6d"); } }
          continue;
        }
        const empty = p.slots.indexOf(null);
        if (empty >= 0) {
          p.slots[empty] = l.w;
          if (!p.slots[p.cur]) p.cur = empty;
          this._removeLoot(l);
          if (p.human) { sfx.pickup(); this.showMsg(this._lootName(l), RARITY[l.w.rarity].css); }
        } else if (p.human && !this.autoplay) {
          this.nearLoot = l;
        } else {
          // Bots swap their worst gun for a better one
          let worst = 0;
          for (let i = 1; i < 3; i++) if (p.slots[i].rarity < p.slots[worst].rarity) worst = i;
          if (l.w.rarity > p.slots[worst].rarity) {
            const old = p.slots[worst];
            p.slots[worst] = l.w;
            this._removeLoot(l);
            this._spawnLoot({ kind: "weapon", w: old }, p.pos.x + rand(-1, 1), p.pos.z + rand(-1, 1));
          }
        }
      }
    }
    if (this.loot.length > 160) this.loot = this.loot.filter((l) => l.alive);
  }

  // Touch/controller aim assist: gently pull the crosshair toward an enemy that is already close to it.
  _aimAssist(dt) {
    const p = this.me;
    if (this.autoplay || !p.alive || p.phase !== "ground" || this.input.device === "kb") return;
    if (!(p.wantFire || p.aiming) || !p.slots[p.cur]) return;
    const d = this._weapon(p);
    const eye = this.camera.position;
    let best = null, ba = 0.1;
    for (const q of this.players) {
      if (q === p || !q.alive || q.phase === "bus") continue;
      const to = q.pos.clone().setY(q.pos.y + 1.3).sub(eye);
      const dist = to.length();
      if (dist > d.range) continue;
      const ang = to.normalize().angleTo(p.aimDir);
      if (ang < ba) { ba = ang; best = { q, to }; }
    }
    if (!best) return;
    const wantYaw = Math.atan2(-best.to.x, -best.to.z), wantPitch = Math.asin(clamp(best.to.y, -1, 1));
    const k = 1 - Math.exp(-3.5 * dt);
    this.camYaw = angleLerp(this.camYaw, wantYaw, k);
    this.camPitch = lerp(this.camPitch, wantPitch, k);
  }

  // ------------------------------------------------------------------ bots
  _think(p, dt) {
    const ai = p.ai;
    p.wantFire = false; p.jumpReq = false; p.sprint = false; p.aiming = false;
    if (p.phase === "bus") return;
    if (p.phase === "fall" || p.phase === "glide") {
      const to = new THREE.Vector3(ai.land.x - p.pos.x, 0, ai.land.z - p.pos.z);
      const dist = to.length();
      p.wish.copy(dist > 3 ? to.divideScalar(dist) : to.set(0, 0, 0));
      if (p.phase === "fall" && p.pos.y - this.groundAt(p.pos.x, p.pos.z, p.pos.y) < ai.openAt) p.phase = "glide";
      if (p.human) { this.camYaw = angleLerp(this.camYaw, p.yaw, 0.05); }
      return;
    }
    ai.scan -= dt;
    if (ai.scan <= 0) { ai.scan = rand(0.3, 0.5); this._scan(p); }
    ai.react -= dt;
    if (p.useT > 0) { p.wish.set(0, 0, 0); return; }
    if (!ai.target || !ai.seen) {
      if (p.hp < 65 && p.meds > 0) return this._startUse(p);
      if (p.shield < 50 && p.shields > 0) return this._startUse(p);
    }
    const s = this.storm;
    const safeD = Math.hypot(p.pos.x - s.to.c.x, p.pos.z - s.to.c.y);
    const urgent = this._outside(p, 4) || (safeD > s.to.r * 0.8 && (s.state === "shrink" || s.t < 18));
    let goal = null;
    const t = ai.target;
    if (urgent) { goal = new THREE.Vector3(s.to.c.x, 0, s.to.c.y); p.sprint = true; }
    if (t && t.alive) {
      const to = t.pos.clone().sub(p.pos);
      const dist = Math.hypot(to.x, to.z);
      // Pick the best gun for the range
      let bestI = -1, bestScore = -1;
      for (let i = 0; i < 3; i++) {
        const w = p.slots[i];
        if (!w) continue;
        const b = WEAPONS[w.kind].best;
        const score = (dist >= b[0] && dist <= b[1] ? 10 : 0) + w.rarity + (w.ammo > 0 ? 1 : 0);
        if (score > bestScore) { bestScore = score; bestI = i; }
      }
      if (bestI >= 0 && bestI !== p.cur && p.fireCd <= 0) this._select(p, bestI);
      const d = this._weapon(p);
      // Aim with an error that shrinks with skill and grows with distance
      const err = (1.8 - p.skill) * (0.7 + dist * 0.05);
      const aim = t.pos.clone().add(new THREE.Vector3(rand(-err, err), 1.3 + rand(-err, err) * 0.7, rand(-err, err)));
      p.aimDir.copy(aim.sub(p.pos.clone().setY(p.pos.y + 1.6))).normalize();
      p.pitch = Math.asin(clamp(p.aimDir.y, -1, 1));
      if (ai.seen && ai.react <= 0 && dist < d.range) {
        p.wantFire = true;
        p.aiming = !d.melee && dist > 25;
      }
      if (!goal) {
        const want = d.melee ? 1.5 : clamp(d.range * 0.35, 6, 32);
        ai.strafeT -= dt;
        if (ai.strafeT <= 0) { ai.strafeT = rand(0.7, 1.8); ai.strafe = Math.random() < 0.5 ? -1 : 1; if (Math.random() < 0.25) p.jumpReq = true; }
        const fwd = new THREE.Vector3(to.x, 0, to.z).normalize();
        const side = new THREE.Vector3(-fwd.z, 0, fwd.x).multiplyScalar(ai.strafe * 0.8);
        const push = dist > want + 4 ? 1 : dist < want - 4 ? -0.6 : 0;
        p.wish.copy(fwd.multiplyScalar(push).add(side));
        if (!ai.seen) p.wish.copy(new THREE.Vector3(to.x, 0, to.z).normalize());
      }
    } else if (ai.target) ai.target = null;
    if (!goal && !(t && t.alive)) {
      if (ai.loot && ai.loot.alive) goal = ai.loot.pos;
      else {
        ai.wanderT -= dt;
        if (!ai.wander || ai.wanderT <= 0 || Math.hypot(ai.wander.x - p.pos.x, ai.wander.z - p.pos.z) < 3) {
          const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * s.to.r * 0.7;
          ai.wander = new THREE.Vector3(s.to.c.x + Math.cos(a) * d, 0, s.to.c.y + Math.sin(a) * d);
          ai.wanderT = rand(6, 14);
        }
        goal = ai.wander;
      }
    }
    if (goal) {
      const to = new THREE.Vector3(goal.x - p.pos.x, 0, goal.z - p.pos.z);
      const len = to.length();
      p.wish.copy(len > 0.5 ? to.divideScalar(len) : to.set(0, 0, 0));
      if (!p.wantFire) p.aimDir.set(p.wish.x, 0, p.wish.z);
    }
    // Unstick: sidestep + hop when blocked
    if (ai.dodge > 0) {
      ai.dodge -= dt;
      p.wish.set(-p.wish.z * ai.dodgeDir + p.wish.x * 0.3, 0, p.wish.x * ai.dodgeDir + p.wish.z * 0.3).normalize();
    } else if (p.wish.lengthSq() > 0.25 && Math.hypot(p.vel.x, p.vel.z) < 1.2 && p.grounded) {
      ai.stuck += dt;
      if (ai.stuck > 0.6) { ai.stuck = 0; ai.dodge = rand(0.5, 1.0); ai.dodgeDir = Math.random() < 0.5 ? -1 : 1; p.jumpReq = true; }
    } else ai.stuck = 0;
    if (p.human) this.camYaw = angleLerp(this.camYaw, Math.atan2(-p.aimDir.x, -p.aimDir.z), 0.1);
  }

  _scan(p) {
    const ai = p.ai;
    const eye = p.pos.clone().setY(p.pos.y + 1.6);
    // Keep the current target while we can still see it
    if (ai.target && ai.target.alive) {
      ai.seen = this._los(eye, ai.target.pos.clone().setY(ai.target.pos.y + 1.4)) && p.pos.distanceTo(ai.target.pos) < 90;
      if (!ai.seen) { ai.lost = (ai.lost || 0) + 0.4; if (ai.lost > 3) { ai.target = null; ai.lost = 0; } }
      else ai.lost = 0;
    }
    const guns = p.slots.filter(Boolean).length;
    if (!ai.target) {
      let best = null, bd = guns ? 45 : 5;       // unarmed bots only fight what is in their face
      for (const q of this.players) {
        if (q === p || !q.alive || q.phase !== "ground") continue;
        const d = p.pos.distanceTo(q.pos);
        if (d < bd && this._los(eye, q.pos.clone().setY(q.pos.y + 1.4))) { bd = d; best = q; }
      }
      if (best) { ai.target = best; ai.seen = true; ai.react = rand(0.5, 1.2) * (1.6 - p.skill); }
    }
    // Loot goal
    if (!ai.loot || !ai.loot.alive) {
      ai.loot = null;
      let bd = guns === 0 ? 90 : 45;
      for (const l of this.loot) {
        if (!l.alive) continue;
        const useful = l.kind === "weapon" ? guns < 3 || l.w.rarity > Math.min(...p.slots.map((w) => w.rarity))
          : l.kind === "med" ? p.meds < 3 : p.shields < 3;
        if (!useful) continue;
        const d = Math.hypot(l.pos.x - p.pos.x, l.pos.z - p.pos.z);
        if (d < bd && Math.abs(l.pos.y - this.height(l.pos.x, l.pos.z)) < 1) { bd = d; ai.loot = l; }
      }
    }
    // Unarmed bots avoid fights they can't win (unless cornered)
    if (guns === 0 && ai.target && p.pos.distanceTo(ai.target.pos) > 6 && ai.loot) ai.target = null;
  }

  // ------------------------------------------------------------------ rendering
  frame(dt) {
    const me = this.me;
    for (const p of this.players) {
      const ch = p.ch;
      if (p.phase === "bus") continue;
      ch.root.position.copy(p.pos);
      ch.root.rotation.y = p.yaw;
      // Gun in hand
      const w = p.slots[p.cur];
      const key = w ? `${w.kind}${w.rarity}` : "";
      if (key !== p.gunKey) {
        if (ch.gun) ch.armR.remove(ch.gun);
        ch.gun = w ? makeGun(w.kind, RARITY[w.rarity].col) : null;
        if (ch.gun) ch.armR.add(ch.gun);
        p.gunKey = key;
      }
      if (!p.alive) {
        ch.hips.rotation.x = damp(ch.hips.rotation.x, -1.45, 6, dt);
        ch.hips.position.y = damp(ch.hips.position.y, 0.35, 6, dt);
        p.glider.visible = false;
        if (p.deadT > 5) ch.root.visible = false;
        continue;
      }
      const air = p.phase === "fall" || p.phase === "glide";
      animate(ch, dt, { speed: air ? 0 : Math.hypot(p.vel.x, p.vel.z), grounded: p.grounded && !air, aiming: p.aiming, aimPitch: p.pitch });
      p.glider.visible = p.phase === "glide";
      if (p.phase === "fall") { ch.hips.rotation.x = -1.25; ch.armL.rotation.x = ch.armR.rotation.x = -2.9; }
      if (p.phase === "glide") { ch.armL.rotation.x = ch.armR.rotation.x = -3.0; ch.legL.rotation.x = 0.2; ch.legR.rotation.x = -0.1; }
    }
    if (this.bus) this.busMesh.position.copy(this.bus.pos);
    for (const l of this.loot) if (l.alive) l.spin.rotation.y += dt * 1.6;
    const s = this.storm;
    this.stormMesh.scale.set(Math.max(0.1, s.r), 300, Math.max(0.1, s.r));
    this.stormMesh.position.set(s.c.x, 100, s.c.y);
    // Tracers
    const arr = this.tracerMesh.geometry.attributes.position.array;
    let n = 0;
    for (const t of this.tracers) {
      t.t -= dt;
      if (t.t <= 0) continue;
      arr.set([t.a.x, t.a.y, t.a.z, t.b.x, t.b.y, t.b.z], n * 6);
      n++;
    }
    this.tracers = this.tracers.filter((t) => t.t > 0);
    this.tracerMesh.geometry.setDrawRange(0, n * 2);
    this.tracerMesh.geometry.attributes.position.needsUpdate = true;
    this._camera(dt);
    this._hud(dt);
  }

  _camera(dt) {
    const p = this.me;
    const cam = this.camera;
    const cy = this.camYaw, cp = this.camPitch;
    const fwd = new THREE.Vector3(-Math.sin(cy) * Math.cos(cp), Math.sin(cp), -Math.cos(cy) * Math.cos(cp));
    const right = new THREE.Vector3(Math.cos(cy), 0, -Math.sin(cy));
    let pivot, dist;
    if (p.phase === "bus" && this.bus) { pivot = this.bus.pos.clone(); dist = 24; }
    else {
      const air = p.phase === "fall" || p.phase === "glide";
      dist = air ? 9 : p.aiming ? 2.4 : 4.4;
      pivot = p.pos.clone().setY(p.pos.y + (p.alive ? 1.75 : 1)).addScaledVector(right, air ? 0 : p.aiming ? 0.85 : 0.7);
    }
    const want = pivot.clone().addScaledVector(fwd, -dist);
    want.y = Math.max(want.y, this.groundAt(want.x, want.z, want.y) + 0.4);
    cam.position.copy(want);
    cam.lookAt(pivot.clone().addScaledVector(fwd, 50));
    const w = p.slots[p.cur];
    const fov = p.aiming ? (w && WEAPONS[w.kind].zoom) || 45 : p.phase === "fall" ? 75 : 65;
    if (Math.abs(cam.fov - fov) > 0.05) { cam.fov = damp(cam.fov, fov, 14, dt); cam.updateProjectionMatrix(); }
  }

  _hud(dt) {
    const p = this.me, el = this.el, s = this.storm;
    el("hpBar").style.width = `${Math.max(0, p.hp)}%`;
    el("shBar").style.width = `${p.shield}%`;
    const alive = this.players.filter((q) => q.alive).length;
    el("alive").textContent = `${alive} ALIVE`;
    el("kills").textContent = `${p.kills} ELIMS`;
    const st = Math.ceil(s.t), mmss = `${Math.floor(st / 60)}:${String(st % 60).padStart(2, "0")}`;
    el("stormTxt").textContent = s.state === "final" ? "FINAL CIRCLE" : s.state === "shrink" ? `STORM CLOSING ${mmss}` : `STORM IN ${mmss}`;
    const w = p.slots[p.cur], d = this._weapon(p);
    el("ammo").innerHTML = p.useT > 0 ? `${p.useKind === "med" ? "HEALING" : "SHIELDING"}…` : p.reloadT > 0 ? "RELOADING…"
      : w ? `<span style="color:${RARITY[w.rarity].css}">${d.name}</span> ${w.ammo}/${d.mag}` : "Fists - find a weapon!";
    const key = p.slots.map((x) => (x ? x.kind + x.rarity : "-")).join() + p.cur + p.meds + p.shields;
    if (key !== this._slotsKey) {
      this._slotsKey = key;
      el("slots").innerHTML = p.slots.map((x, i) => `<div class="slot ${i === p.cur ? "sel" : ""}" data-i="${i}" style="${x ? `border-bottom:4px solid ${RARITY[x.rarity].css}` : ""}">
        <span>${i + 1}</span>${x ? WEAPONS[x.kind].name : "—"}</div>`).join("") +
        `<div class="slot" data-i="3"><span>❤ ${p.meds}</span>🛡 ${p.shields}</div>`;
    }
    // Prompts
    let prompt = "";
    const agl = p.pos.y - this.groundAt(p.pos.x, p.pos.z, p.pos.y);
    if (p.phase === "bus") prompt = "Press JUMP to drop";
    else if (p.phase === "fall") prompt = agl < 45 ? "<b style='color:#ff6b6b'>OPEN YOUR GLIDER! (JUMP)</b>" : "JUMP: open glider";
    else if (p.phase === "glide") prompt = "JUMP: close glider (dive faster)";
    else if (this.nearLoot) prompt = `USE: swap for <b style="color:${RARITY[this.nearLoot.w.rarity].css}">${this._lootName(this.nearLoot)}</b>`;
    if (prompt !== this._prompt) { this._prompt = prompt; el("prompt").innerHTML = prompt; }
    this._label("jump", p.phase === "fall" ? "GLIDE" : p.phase === "glide" ? "DIVE" : p.phase === "bus" ? "DROP" : "JUMP");
    this._label("use", this.nearLoot ? "SWAP" : "HEAL");
    this._label("aim", this.aimToggle && this.input.device === "touch" ? "AIM ✓" : "AIM");
    el("cross").style.display = p.phase === "ground" && p.alive ? "" : "none";
    el("cross").classList.toggle("tight", p.aiming);
    // Effects
    this._hitT = Math.max(0, (this._hitT || 0) - dt);
    el("hit").style.opacity = this._hitT > 0 ? 1 : 0;
    el("hit").style.borderColor = this._hitHead ? "#ffd24a" : "#fff";
    this._hurtFx = Math.max(0, (this._hurtFx || 0) - dt * 1.2);
    el("hurt").style.opacity = this._hurtFx;
    el("stormFx").style.opacity = p.alive && p.phase !== "bus" && this._outside(p) ? 0.55 : 0;
    if (this._feedDirty) { this._feedDirty = false; el("feed").innerHTML = this.feed.map((f) => `<div>${f.text}</div>`).join(""); }
    this._miniT -= dt;
    if (this._miniT <= 0) { this._miniT = 0.15; this._drawMini(); }
  }

  _drawMini() {
    const c = this.mini, g = c.getContext("2d"), S = c.width, k = S / (HALF * 2), s = this.storm;
    const X = (x) => (x + HALF) * k;
    g.drawImage(this.miniImg, 0, 0);
    g.fillStyle = "rgba(130,60,230,.45)";
    g.beginPath();
    g.rect(0, 0, S, S);
    g.arc(X(s.c.x), X(s.c.y), Math.max(0, s.r * k), 0, Math.PI * 2, true);
    g.fill();
    if (s.state !== "final") {
      g.strokeStyle = "#fff"; g.lineWidth = 1.5;
      g.beginPath(); g.arc(X(s.to.c.x), X(s.to.c.y), Math.max(0.5, s.to.r * k), 0, Math.PI * 2); g.stroke();
    }
    if (this.bus) {
      g.strokeStyle = "rgba(255,210,74,.8)"; g.setLineDash([4, 3]);
      const a = this.bus.pos, e = a.clone().addScaledVector(this.bus.dir, 400);
      g.beginPath(); g.moveTo(X(a.x), X(a.z)); g.lineTo(X(e.x), X(e.z)); g.stroke();
      g.setLineDash([]);
    }
    const p = this.me;
    const ang = Math.atan2(-Math.cos(this.camYaw), -Math.sin(this.camYaw));
    g.save();
    g.translate(X(p.pos.x), X(p.pos.z));
    g.rotate(ang);
    g.fillStyle = "#ffd24a"; g.strokeStyle = "#000";
    g.beginPath(); g.moveTo(7, 0); g.lineTo(-5, 4.5); g.lineTo(-3, 0); g.lineTo(-5, -4.5); g.closePath(); g.fill(); g.stroke();
    g.restore();
  }

  dispose() {
    this.app.touch.clear();
    document.getElementById("hud").innerHTML = "";
    clearTimeout(this._bt); clearTimeout(this._mt); clearTimeout(this._endT);
    this.scene.traverse((o) => o.geometry && o.geometry.dispose());
  }
}
