// Storm Royale Mobile - app shell: menus, settings, pause/results, and starting game modes.
import { Engine } from "./engine.js";
import { Input } from "./input.js";
import { TouchControls } from "./touch.js";
import { unlock, sfx, setVolume } from "./audio.js";
import { Soccer } from "./soccer.js";

const DEFAULTS = { quality: "medium", autoRes: true, sens: 1.0, volume: 0.7, leftHanded: false, autoCurve: true, name: "Player" };

class App {
  constructor() {
    this.settings = { ...DEFAULTS, ...JSON.parse(localStorage.getItem("srm_settings") || "{}") };
    this.stats = { matches: 0, wins: 0, goals: 0, kills: 0, ...JSON.parse(localStorage.getItem("srm_stats") || "{}") };
    this.look = { body: 0x3d8bff, pants: 0x2b3a55, skin: 0xf2c9a0, hair: 0x3b2a1e };
    this.canvas = document.getElementById("view");
    this.engine = new Engine(this.canvas, this.settings);
    this.input = new Input(this.canvas);
    this.touch = new TouchControls(document.getElementById("touch"), this.input);
    this.ui = document.getElementById("ui");
    this.paused = false;
    this.applySettings();
    addEventListener("pointerdown", () => unlock(), { once: false });
    addEventListener("touchstart", () => unlock(), { passive: true });
    document.addEventListener("visibilitychange", () => { if (document.hidden && this.engine.mode && !this.paused) this.pause(); });
    this._fit();
    addEventListener("resize", () => this._fit());
    screen.orientation?.addEventListener?.("change", () => setTimeout(() => this._fit(), 200));
    this.menu();
    this._testHooks();
  }

  // UI scale: 1 at 1280x720, bigger on large/fullscreen displays, smaller (but readable) on short phones.
  _fit() {
    const z = Math.max(0.62, Math.min(2.2, Math.min(innerWidth / 1280, innerHeight / 720)));
    document.documentElement.style.setProperty("--z", z.toFixed(3));
    this.uiScale = z;
    if (this.engine?.mode && this.touch?.enabled && this.engine.mode._touchLayout) this.engine.mode._touchLayout();
  }

  get playerName() { return this.settings.name || "Player"; }

  applySettings() {
    this.input.sens = this.settings.sens;
    this.touch.leftHanded = this.settings.leftHanded;
    setVolume(this.settings.volume);
    this.engine.applyQuality();
  }

  saveSettings() { localStorage.setItem("srm_settings", JSON.stringify(this.settings)); this.applySettings(); }
  saveStats() { localStorage.setItem("srm_stats", JSON.stringify(this.stats)); }

  // ------------------------------------------------------------------ screens
  show(html) {
    this.ui.innerHTML = html;
    return this.ui.firstElementChild;
  }

  menu() {
    this.stopMode();
    document.body.classList.remove("playing");
    const s = this.stats;
    this.show(`
      <div class="screen">
        <div class="top">
          <div class="logo">STORM<b>ROYALE</b><small>MOBILE</small></div>
          <div class="grow"></div>
          <button class="btn ghost small" id="setBtn">Settings</button>
          <a class="btn ghost small" href="../play/" style="text-decoration:none;display:flex;align-items:center">Full version</a>
        </div>
        <div class="modes">
          <div class="mode" id="mSoccer" style="--c1:#0f5a3a;--c2:#123a6e"><span class="tag">3V3 VS BOTS</span><span class="art">⚽</span>
            <h2>Soccer</h2><p>Dribble, curve shots with the aiming arrow, volleys, headers and boost.</p></div>
          <div class="mode" id="mBr" style="--c1:#5a2a0f;--c2:#3a1a6e"><span class="tag">12 PLAYERS</span><span class="art">🌩️</span>
            <h2>Battle Royale Lite</h2><p>Glide in, grab weapons, outlast 11 bots as the storm closes.</p></div>
        </div>
        <div class="panel row" style="justify-content:space-between">
          <span class="dim">Matches <b>${s.matches}</b> &nbsp; Wins <b>${s.wins}</b> &nbsp; Goals <b>${s.goals}</b> &nbsp; Eliminations <b>${s.kills}</b></span>
          <span class="dim">Made for tablets, phones and low-end PCs. Touch, keyboard + mouse or controller.</span>
        </div>
      </div>`);
    document.getElementById("mSoccer").onclick = () => { sfx.click(); this.soccerSetup(); };
    document.getElementById("mBr").onclick = () => { sfx.click(); this.start("br", {}); };
    document.getElementById("setBtn").onclick = () => { sfx.click(); this.settingsScreen(); };
  }

  soccerSetup() {
    const o = { teamSize: 3, minutes: 3, golden: false };
    const el = this.show(`
      <div class="screen">
        <div class="top"><button class="btn ghost small" id="back">&lt; Back</button><div class="logo" style="font-size:32px">SOCCER</div></div>
        <div class="panel" style="margin-top:18px">
          <p class="dim">TEAM SIZE</p><div class="chips" id="size"></div>
          <p class="dim">MATCH LENGTH</p><div class="chips" id="len"></div>
          <p class="dim">MODE</p><div class="chips" id="gg"></div>
        </div>
        <div class="grow"></div>
        <button class="btn" id="go" style="font-size:24px;min-height:66px;margin-top:16px">PLAY</button>
      </div>`);
    const chips = (id, opts, key) => {
      const box = el.querySelector("#" + id);
      box.innerHTML = opts.map(([v, t]) => `<button class="chip" data-v="${v}">${t}</button>`).join("");
      const paint = () => box.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", String(o[key]) === c.dataset.v));
      box.onclick = (e) => {
        const c = e.target.closest(".chip");
        if (!c) return;
        o[key] = key === "golden" ? c.dataset.v === "true" : Number(c.dataset.v);
        sfx.click();
        paint();
      };
      paint();
    };
    chips("size", [[1, "1v1"], [2, "2v2"], [3, "3v3"]], "teamSize");
    chips("len", [[2, "2 min"], [3, "3 min"], [5, "5 min"]], "minutes");
    chips("gg", [[false, "Normal"], [true, "Golden Goal"]], "golden");
    el.querySelector("#back").onclick = () => this.menu();
    el.querySelector("#go").onclick = () => this.start("soccer", o);
  }

  settingsScreen(fromPause = false) {
    const st = this.settings;
    const el = this.show(`
      <div class="screen">
        <div class="top"><button class="btn ghost small" id="back">&lt; Back</button><div class="logo" style="font-size:32px">SETTINGS</div></div>
        <div class="panel" style="margin-top:18px;max-width:720px">
          <label class="set">Name <input id="name" maxlength="16" value="${st.name}" style="font-size:18px;padding:8px;border-radius:8px;border:1px solid #2a3556;background:#0b0e17;color:#fff"></label>
          <label class="set">Graphics <span class="chips" id="q"></span></label>
          <label class="set">Auto resolution (keeps it smooth) <input type="checkbox" id="auto" ${st.autoRes ? "checked" : ""}></label>
          <label class="set">Shot assist: auto-curve to goal <input type="checkbox" id="curve" ${st.autoCurve ? "checked" : ""}></label>
          <label class="set">Look sensitivity <input type="range" id="sens" min="0.3" max="2.5" step="0.05" value="${st.sens}"></label>
          <label class="set">Volume <input type="range" id="vol" min="0" max="1" step="0.05" value="${st.volume}"></label>
          <label class="set">Left-handed touch controls <input type="checkbox" id="lh" ${st.leftHanded ? "checked" : ""}></label>
        </div>
      </div>`);
    const q = el.querySelector("#q");
    const paint = () => {
      q.innerHTML = ["low", "medium", "high"].map((k) => `<button class="chip ${st.quality === k ? "on" : ""}" data-v="${k}">${k[0].toUpperCase() + k.slice(1)}</button>`).join("");
    };
    paint();
    q.onclick = (e) => { const c = e.target.closest(".chip"); if (c) { st.quality = c.dataset.v; this.saveSettings(); paint(); sfx.click(); } };
    el.querySelector("#auto").onchange = (e) => { st.autoRes = e.target.checked; this.saveSettings(); };
    el.querySelector("#curve").onchange = (e) => { st.autoCurve = e.target.checked; this.saveSettings(); };
    el.querySelector("#lh").onchange = (e) => { st.leftHanded = e.target.checked; this.saveSettings(); };
    el.querySelector("#sens").oninput = (e) => { st.sens = Number(e.target.value); this.saveSettings(); };
    el.querySelector("#vol").oninput = (e) => { st.volume = Number(e.target.value); this.saveSettings(); };
    el.querySelector("#name").onchange = (e) => { st.name = e.target.value.trim().slice(0, 16) || "Player"; this.saveSettings(); };
    el.querySelector("#back").onclick = () => (fromPause ? this.pause(true) : this.menu());
  }

  // ------------------------------------------------------------------ modes
  async start(kind, opts) {
    this.ui.innerHTML = "";
    this.paused = false;
    document.body.classList.add("playing");
    this.input.clearEdges();
    if (kind === "soccer") this.engine.setMode(new Soccer(this, opts));
    else {
      const { BattleRoyale } = await import("./br.js");
      this.engine.setMode(new BattleRoyale(this, opts));
    }
    this.kind = kind;
    this.opts = opts;
  }

  stopMode() {
    if (this.engine.mode) this.engine.setMode(null);
    document.exitPointerLock?.();
    this.input.wantLock = false;
  }

  pause(reopen = false) {
    if (!this.engine.mode) return;
    this.paused = true;
    document.exitPointerLock?.();
    const el = this.show(`
      <div class="screen" style="background:rgba(8,10,20,.78);align-items:center;justify-content:center;gap:14px">
        <div class="logo">PAUSED</div>
        <button class="btn" id="res" style="min-width:260px">Resume</button>
        <button class="btn ghost" id="set" style="min-width:260px">Settings</button>
        <button class="btn ghost" id="quit" style="min-width:260px">Quit to menu</button>
      </div>`);
    el.querySelector("#res").onclick = () => { this.ui.innerHTML = ""; this.paused = false; this.input.clearEdges(); };
    el.querySelector("#set").onclick = () => this.settingsScreen(true);
    el.querySelector("#quit").onclick = () => this.menu();
  }

  results(r) {
    document.exitPointerLock?.();
    const el = this.show(`
      <div class="screen" style="background:rgba(8,10,20,.85);align-items:center;justify-content:center;gap:12px;text-align:center">
        <div class="logo" style="color:${r.color}">${r.title}</div>
        ${r.lines.map((l) => `<p style="font-size:20px;margin:2px">${l}</p>`).join("")}
        <div class="row" style="justify-content:center;margin-top:14px">
          <button class="btn" id="again">Play again</button><button class="btn ghost" id="menu">Menu</button></div>
      </div>`);
    el.querySelector("#again").onclick = () => r.again();
    el.querySelector("#menu").onclick = () => this.menu();
  }

  // ?test=soccer|br starts a mode directly; ?snap=N copies the frame into an <img> after N seconds
  // (headless screenshot tooling can't capture WebGL canvases).
  _testHooks() {
    const q = new URLSearchParams(location.search);
    if (q.get("touch")) this.input.device = "touch";
    if (q.get("test")) this.start(q.get("test"), JSON.parse(q.get("opts") || "{}"));
    if (q.get("snap")) {
      setTimeout(() => {
        const img = new Image();
        img.src = this.canvas.toDataURL();
        Object.assign(img.style, { position: "fixed", inset: "0", width: "100%", height: "100%", zIndex: 0 });
        document.body.insertBefore(img, document.body.firstChild);
        this.canvas.style.display = "none";
        document.title = "snapped";
      }, Number(q.get("snap")) * 1000);
    }
    window.__app = this;
    if (q.get("run")) import(`../tests/${q.get("run")}.js`).then((m) => setTimeout(() => m.default(this), 1500));
  }
}

new App();
