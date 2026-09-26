// Low-poly models built from primitives (no downloads): the jointed character, the ball, simple guns.
import { THREE } from "./engine.js";

const matCache = new Map();
export function mat(color) {
  const key = typeof color === "number" ? color : String(color);
  if (!matCache.has(key)) matCache.set(key, new THREE.MeshLambertMaterial({ color }));
  return matCache.get(key);
}
const G = {
  torso: new THREE.BoxGeometry(0.62, 0.72, 0.36),
  head: new THREE.SphereGeometry(0.27, 10, 8),
  hair: new THREE.SphereGeometry(0.285, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55),
  arm: new THREE.BoxGeometry(0.18, 0.62, 0.18),
  leg: new THREE.BoxGeometry(0.22, 0.86, 0.24),
  shoe: new THREE.BoxGeometry(0.24, 0.12, 0.36),
  eye: new THREE.SphereGeometry(0.035, 6, 4),
  ring: new THREE.RingGeometry(0.7, 0.85, 24),
};

// A jointed character: pivots at shoulders and hips so the code can pose it.
export function makeCharacter(look = {}) {
  const c = {
    body: look.body ?? 0x3d8bff, pants: look.pants ?? 0x2b3a55, skin: look.skin ?? 0xf2c9a0,
    hair: look.hair ?? 0x3b2a1e, shoes: look.shoes ?? 0xe8e8ee,
  };
  const root = new THREE.Group();
  const hips = new THREE.Group();
  hips.position.y = 0.95;
  root.add(hips);
  const torso = new THREE.Mesh(G.torso, mat(c.body));
  torso.position.y = 0.4;
  hips.add(torso);
  const head = new THREE.Group();
  head.position.y = 0.98;
  hips.add(head);
  head.add(new THREE.Mesh(G.head, mat(c.skin)));
  const hair = new THREE.Mesh(G.hair, mat(c.hair));
  hair.position.y = 0.03;
  head.add(hair);
  for (const s of [-1, 1]) {
    const eye = new THREE.Mesh(G.eye, mat(0x141418));
    eye.position.set(0.09 * s, 0.03, -0.25);
    head.add(eye);
  }
  const limb = (x, y, geo, color, len) => {
    const p = new THREE.Group();
    p.position.set(x, y, 0);
    const m = new THREE.Mesh(geo, mat(color));
    m.position.y = -len / 2;
    p.add(m);
    hips.add(p);
    return p;
  };
  const armL = limb(-0.41, 0.7, G.arm, c.body, 0.62);
  const armR = limb(0.41, 0.7, G.arm, c.body, 0.62);
  const legL = limb(-0.15, 0.02, G.leg, c.pants, 0.86);
  const legR = limb(0.15, 0.02, G.leg, c.pants, 0.86);
  for (const leg of [legL, legR]) {
    const shoe = new THREE.Mesh(G.shoe, mat(c.shoes));
    shoe.position.set(0, -0.9, -0.05);
    leg.add(shoe);
  }
  for (const arm of [armL, armR]) {
    const hand = new THREE.Mesh(G.eye, mat(c.skin));
    hand.scale.setScalar(3);
    hand.position.y = -0.66;
    arm.add(hand);
  }
  const ch = { root, hips, torso, head, armL, armR, legL, legR, phase: 0, kickT: 0, celebrate: 0, gun: null };
  return ch;
}

// Team ring on the ground under a player.
export function makeRing(color) {
  const m = new THREE.Mesh(G.ring, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.04;
  return m;
}

// Pose update. s = {speed, grounded, sprint, aiming}
export function animate(ch, dt, s) {
  const sp = Math.min(s.speed, 14);
  ch.phase += dt * (4 + sp * 0.9);
  const swing = Math.min(1, sp / 7) * 0.9;
  const w = Math.sin(ch.phase);
  let legL = w * swing, legR = -w * swing, armL = -w * swing * 0.8, armR = w * swing * 0.8;
  let lean = sp > 8 ? 0.22 : sp * 0.02;
  let bob = Math.abs(Math.cos(ch.phase)) * 0.06 * Math.min(1, sp / 4);
  let armLz = 0.08, armRz = -0.08;
  if (!s.grounded) {
    legL = 0.5; legR = -0.3; armL = -2.4; armR = -2.4; armLz = 0.3; armRz = -0.3; bob = 0;
  }
  if (s.aiming || ch.gun) {
    armR = -1.45 - (s.aimPitch || 0); armL = -1.2 - (s.aimPitch || 0); armLz = -0.5;
  }
  if (ch.kickT > 0) {
    ch.kickT -= dt;
    const u = 1 - ch.kickT / 0.35;
    legR = u < 0.35 ? 0.9 * (u / 0.35) : 0.9 - 2.6 * Math.min(1, (u - 0.35) / 0.3);
    armL = -0.9; lean = -0.15;
  }
  if (ch.celebrate > 0) {
    ch.celebrate -= dt;
    armL = -2.9; armR = -2.9; armLz = 0.35; armRz = -0.35;
    bob = Math.abs(Math.sin(ch.celebrate * 9)) * 0.25;
  }
  ch.legL.rotation.x = legL;
  ch.legR.rotation.x = legR;
  ch.armL.rotation.x = armL;
  ch.armR.rotation.x = armR;
  ch.armL.rotation.z = armLz;
  ch.armR.rotation.z = armRz;
  ch.hips.rotation.x = -lean;
  ch.hips.position.y = 0.95 + bob;
}

export function kick(ch) { ch.kickT = 0.35; }

export function makeBall(radius) {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 2), mat(0xf6f6f6)));
  const patch = new THREE.CircleGeometry(radius * 0.32, 5);
  const dirs = [[1, 1, 1], [-1, 1, -1], [1, -1, -1], [-1, -1, 1], [0, 1.6, 0], [0, -1.6, 0], [1.6, 0, 0], [-1.6, 0, 0], [0, 0, 1.6], [0, 0, -1.6]];
  for (const d of dirs) {
    const v = new THREE.Vector3(...d).normalize();
    const m = new THREE.Mesh(patch, mat(0x1b1c22));
    m.position.copy(v.clone().multiplyScalar(radius * 1.005));
    m.lookAt(v.clone().multiplyScalar(radius * 2));
    g.add(m);
  }
  return g;
}

// Simple gun model held in the right hand. kind: pistol | smg | shotgun | rifle | sniper
export function makeGun(kind, color = 0x9aa5b5) {
  const g = new THREE.Group();
  const len = { pistol: 0.35, smg: 0.55, shotgun: 0.8, rifle: 0.85, sniper: 1.1 }[kind] || 0.5;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, len), mat(0x2b2f3a));
  body.position.z = -len / 2;
  g.add(body);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.05, len * 0.6), mat(color));
  stripe.position.set(0, 0.06, -len * 0.45);
  g.add(stripe);
  g.position.set(0, -0.62, -0.1);
  g.rotation.x = Math.PI / 2;
  return g;
}
