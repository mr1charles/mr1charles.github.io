<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TOB OS — v17.0 DYNAMIC ISLAND &amp; STORY EDITION</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
/* ══════════════════════════════════════════════════════════════
   TOB OS v7.0 — NEXUS EDITION
   Modules: Core · Grid · WM · Music · TobTube · Mods · Admin · TaskMgr · ControlCenter
══════════════════════════════════════════════════════════════ */
:root {
  --bg:#010812;--bg2:#050f1e;--panel:rgba(5,20,45,.9);
  --panel-solid:#03111e;--panel-border:rgba(0,180,255,.22);
  --win-bar:rgba(3,14,30,.98);--taskbar:rgba(2,8,22,.97);
  --neon:#00b4ff;--neon2:#0055ff;--neon3:#00ffcc;
  --accent:#ff2d6e;--gold:#ffd700;--green:#39ff14;
  --text:#c8e8ff;--text-dim:rgba(150,200,240,.5);--text-muted:rgba(100,160,210,.35);
  --glow-lg:0 0 25px rgba(0,180,255,.55),0 0 70px rgba(0,80,220,.2);
  --glow-sm:0 0 10px rgba(0,180,255,.4);--glow-xs:0 0 6px rgba(0,180,255,.3);
  --radius:12px;--sb-h:28px;--tb-h:44px;--win-bar-h:36px;
  --tr:.25s cubic-bezier(.4,0,.2,1);
  --icon-w:80px;--icon-h:90px;
}
html[data-theme="light"]{
  --bg:#daeeff;--bg2:#c4e4ff;--panel:rgba(210,235,255,.94);
  --panel-solid:#cce4f8;--panel-border:rgba(0,100,200,.28);
  --win-bar:rgba(195,220,248,.98);--taskbar:rgba(195,220,248,.98);
  --text:#002244;--text-dim:rgba(0,60,140,.6);--text-muted:rgba(0,40,100,.35);
  --neon:#0066cc;--neon3:#007755;
  --glow-lg:0 0 20px rgba(0,100,200,.3);--glow-sm:0 0 8px rgba(0,100,200,.25);
}
/* Glass mod override */
html[data-mod-glass="1"] .os-window{backdrop-filter:blur(30px) saturate(180%);background:rgba(5,20,60,.45)!important;border-color:rgba(255,255,255,.18)!important;}
html[data-mod-glass="1"] #taskbar{backdrop-filter:blur(40px) saturate(200%);background:rgba(2,8,30,.5)!important;}
html[data-mod-glass="1"] .win-bar{background:rgba(5,15,40,.5)!important;backdrop-filter:blur(20px);}
/* Win11 mod */
html[data-mod-win11="1"] .os-window{border-radius:8px!important;}
html[data-mod-win11="1"] .win-bar{border-radius:8px 8px 0 0!important;}
html[data-mod-win11="1"] #taskbar{justify-content:center;}
html[data-mod-win11="1"] .desk-icon .icon-img{border-radius:6px!important;}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html,body{width:100%;height:100%;overflow:hidden;font-family:'Rajdhani',sans-serif;background:var(--bg);}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-track{background:rgba(0,20,50,.2);}
::-webkit-scrollbar-thumb{background:rgba(0,150,255,.35);border-radius:2px;}

/* ── BACKGROUND ── */
#bg-layer{position:fixed;inset:0;z-index:0;background:var(--bg);transition:background .5s;}
#bg-layer.wp-grid{background:#010812;background-image:linear-gradient(rgba(0,180,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,.06) 1px,transparent 1px),radial-gradient(ellipse at 50% 50%,rgba(0,50,130,.3) 0%,#010812 70%);background-size:44px 44px,44px 44px,100% 100%;}
#bg-layer.wp-stadium{background:radial-gradient(ellipse at 50% 85%,rgba(0,60,20,.8) 0%,transparent 50%),radial-gradient(ellipse at 50% 0%,rgba(0,20,80,.6) 0%,transparent 60%),linear-gradient(180deg,#001128 0%,#001a08 60%,#010812 100%);}
#bg-layer.wp-gradient{background:linear-gradient(135deg,#010812 0%,#0a0020 30%,#001035 60%,#040210 100%);}
#bg-layer.wp-energy{background:radial-gradient(ellipse at 25% 35%,rgba(0,70,200,.35) 0%,transparent 55%),radial-gradient(ellipse at 75% 65%,rgba(0,200,170,.18) 0%,transparent 50%),#010812;}
#bg-layer.wp-custom{background-size:cover;background-position:center;}
#particle-canvas{position:fixed;inset:0;z-index:1;pointer-events:none;}
#scanlines{position:fixed;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.025) 2px,rgba(0,0,0,.025) 4px);}
.amb-ring{position:fixed;border-radius:50%;pointer-events:none;border:1px solid rgba(0,140,255,.05);transform:translate(-50%,-50%);animation:ambRing 9s ease-in-out infinite;}
@keyframes ambRing{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.5}50%{transform:translate(-50%,-50%) scale(1.09);opacity:.1}}

/* ── STATUS BAR ── */
#statusbar{position:fixed;top:0;left:0;right:0;height:var(--sb-h);z-index:300;background:rgba(1,6,16,.95);border-bottom:1px solid var(--panel-border);display:flex;align-items:center;justify-content:space-between;padding:0 12px;backdrop-filter:blur(16px);font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--text-dim);}
html[data-theme="light"] #statusbar{background:rgba(195,220,248,.97);}
.sb-group{display:flex;align-items:center;gap:10px;}
.sb-dot{width:5px;height:5px;border-radius:50%;background:var(--neon);box-shadow:var(--glow-xs);animation:sbPulse 2.2s ease-in-out infinite;}
@keyframes sbPulse{0%,100%{opacity:1}50%{opacity:.35}}
#sb-clock{color:var(--text);font-size:12px;font-weight:600;}
#sb-battery{display:flex;align-items:center;gap:4px;font-size:10px;}
.bat-icon{width:20px;height:11px;border:1px solid var(--text-dim);border-radius:2px;position:relative;display:flex;align-items:center;padding:1px;}
.bat-icon::after{content:'';position:absolute;right:-4px;top:50%;transform:translateY(-50%);width:3px;height:5px;background:var(--text-dim);border-radius:0 1px 1px 0;}
.bat-fill{height:100%;background:var(--green);border-radius:1px;transition:width .5s;}
.bat-fill.low{background:var(--accent);}.bat-fill.med{background:var(--gold);}
#sb-ver-badge{font-size:9px;padding:1px 6px;border-radius:4px;cursor:pointer;}
#sb-ver-badge.ok{color:var(--green);border:1px solid rgba(57,255,20,.2);}
#sb-ver-badge.update{color:var(--gold);border:1px solid rgba(255,215,0,.35);animation:sbPulse 1s infinite;}
#sb-active-title{color:var(--text-dim);font-size:10px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* ── DESKTOP ── */
#desktop{position:fixed;left:0;right:0;top:var(--sb-h);bottom:var(--tb-h);z-index:10;overflow:hidden;}
.home-watermark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:56px;font-weight:900;color:rgba(0,180,255,.03);letter-spacing:16px;user-select:none;pointer-events:none;}

/* ── ICONS ── */
#icon-grid{position:absolute;inset:0;z-index:11;}
.desk-icon{position:absolute;width:var(--icon-w);height:var(--icon-h);display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 4px 4px;cursor:pointer;border-radius:16px;user-select:none;z-index:12;transition:transform .15s cubic-bezier(.34,1.56,.64,1);}
.desk-icon:active{transform:scale(.92);}
.desk-icon.drag-over{background:rgba(0,180,255,.12);outline:2px dashed rgba(0,180,255,.5);}
.desk-icon.is-dragging{opacity:.4;pointer-events:none;}
.desk-icon.snap-anim{animation:snapIn .25s cubic-bezier(.34,1.56,.64,1);}
@keyframes snapIn{0%{transform:scale(.85)}100%{transform:scale(1)}}
.icon-img{width:52px;height:52px;border-radius:14px;background:var(--panel);border:1.5px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:24px;position:relative;overflow:hidden;transition:all .2s;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,.4);}
.icon-img::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 60%);}
.desk-icon:hover .icon-img{transform:scale(1.06) translateY(-3px);border-color:rgba(0,180,255,.5);box-shadow:var(--glow-sm),0 6px 20px rgba(0,0,0,.5);}
.icon-lbl{font-size:10px;font-weight:600;color:var(--text);text-align:center;line-height:1.2;max-width:74px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-shadow:0 1px 4px rgba(0,0,0,.9);padding:1px 3px;}
.desk-icon.jiggle{animation:jiggle .3s infinite;}
@keyframes jiggle{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
.icon-del-btn{position:absolute;top:-3px;left:-3px;width:18px;height:18px;border-radius:50%;background:#ff3b30;border:2px solid #fff;color:#fff;font-size:10px;cursor:pointer;display:none;align-items:center;justify-content:center;z-index:20;line-height:1;font-weight:900;}
.delete-mode .desk-icon .icon-del-btn{display:flex;}
/* ── DESKTOP CONTEXT MENU ── */
#desktop-ctx{position:fixed;z-index:500;pointer-events:none;opacity:0;transition:opacity .18s,transform .2s cubic-bezier(.34,1.56,.64,1);transform:scale(.82);transform-origin:top left;}
#desktop-ctx.open{opacity:1;pointer-events:auto;transform:scale(1);}
.dctx-panel{background:rgba(2,8,24,.97);border:1px solid rgba(0,180,255,.3);border-radius:16px;padding:6px;backdrop-filter:blur(28px);box-shadow:0 12px 50px rgba(0,0,0,.75),0 0 30px rgba(0,180,255,.07);min-width:196px;}
.dctx-item{display:flex;align-items:center;gap:11px;padding:10px 13px;border-radius:10px;cursor:pointer;transition:background .12s;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;letter-spacing:.5px;}
.dctx-item:hover,.dctx-item:active{background:rgba(0,180,255,.1);}
.dctx-item-icon{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.dctx-sep{height:1px;background:rgba(0,180,255,.13);margin:4px 8px;}
.dctx-label{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--neon);letter-spacing:3px;padding:8px 14px 4px;}
.dctx-wp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;padding:6px 10px 10px;}
.dctx-wp-btn{border-radius:9px;border:1px solid var(--panel-border);padding:8px 4px;text-align:center;cursor:pointer;font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-dim);background:rgba(0,15,40,.5);transition:all .15s;letter-spacing:1px;}
.dctx-wp-btn:hover,.dctx-wp-btn.active{border-color:rgba(0,180,255,.55);color:var(--neon);background:rgba(0,180,255,.1);}
.dctx-upload-btn{display:flex;align-items:center;justify-content:center;gap:6px;margin:0 10px 10px;padding:7px;border-radius:9px;background:rgba(0,180,255,.06);border:1px dashed rgba(0,180,255,.25);color:var(--neon);font-size:9px;font-family:'Share Tech Mono',monospace;cursor:pointer;letter-spacing:1px;transition:all .15s;}
.dctx-upload-btn:hover{background:rgba(0,180,255,.12);border-color:rgba(0,180,255,.5);}
.dctx-back{display:flex;align-items:center;gap:5px;padding:8px 13px 5px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer;letter-spacing:1px;transition:color .12s;}
.dctx-back:hover{color:var(--neon);}
.drag-ghost{position:fixed;width:52px;height:52px;border-radius:14px;pointer-events:none;z-index:9999;opacity:.75;transform:scale(1.1) rotate(4deg);}

/* ── TASKBAR ── */
#taskbar{position:fixed;bottom:0;left:0;right:0;height:var(--tb-h);z-index:250;background:var(--taskbar);border-top:1px solid var(--panel-border);backdrop-filter:blur(20px);display:flex;align-items:center;padding:0 10px;gap:6px;}
#taskbar-start{width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:all .18s;box-shadow:var(--glow-xs);}
#taskbar-start:hover{transform:scale(1.08);box-shadow:var(--glow-sm);}
#tb-sep{width:1px;height:28px;background:var(--panel-border);flex-shrink:0;margin:0 2px;}
#tb-apps{display:flex;gap:4px;flex:1;overflow-x:auto;align-items:center;scrollbar-width:none;}
#tb-apps::-webkit-scrollbar{display:none;}
.tb-app{min-width:100px;max-width:150px;height:34px;border-radius:7px;display:flex;align-items:center;gap:6px;padding:0 8px;cursor:pointer;background:rgba(255,255,255,.04);border:1px solid transparent;transition:all .15s;flex-shrink:0;}
.tb-app:hover{background:rgba(0,180,255,.08);border-color:rgba(0,180,255,.2);}
.tb-app.active{background:rgba(0,180,255,.14);border-color:rgba(0,180,255,.38);box-shadow:var(--glow-xs);}
.tb-app.minimized{opacity:.55;}
.tb-app-icon{font-size:15px;flex-shrink:0;}
.tb-app-label{font-size:11px;font-weight:600;color:var(--text-dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.tb-app.active .tb-app-label{color:var(--neon);}
.tb-indicator{width:4px;height:4px;border-radius:50%;background:var(--neon);box-shadow:0 0 5px var(--neon);margin-left:auto;flex-shrink:0;}
#tb-right{display:flex;align-items:center;gap:8px;flex-shrink:0;margin-left:auto;}
#tb-clock{font-family:'Share Tech Mono',monospace;font-size:12px;color:var(--text-dim);}
.tb-music-btn{background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:14px;padding:2px;transition:color .15s;}
.tb-music-btn:hover{color:var(--neon);}
#tb-np{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--neon);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* ── WINDOW SYSTEM ── */
.os-window{position:absolute;z-index:50;min-width:300px;min-height:200px;display:flex;flex-direction:column;border-radius:var(--radius);overflow:hidden;border:1px solid var(--panel-border);box-shadow:0 18px 55px rgba(0,0,0,.7);animation:winOpen .28s cubic-bezier(.34,1.56,.64,1) both;}
.os-window.focused{border-color:rgba(0,180,255,.42);box-shadow:0 22px 70px rgba(0,0,0,.8),var(--glow-lg);}
@keyframes winOpen{from{opacity:0;transform:scale(.87) translateY(18px)}to{opacity:1;transform:scale(1) translateY(0)}}
.os-window.anim-close{animation:winClose .22s ease forwards;pointer-events:none;}
@keyframes winClose{to{opacity:0;transform:scale(.88);filter:blur(3px)}}
.os-window.anim-minimize{animation:winMin .28s cubic-bezier(.4,0,1,1) forwards;pointer-events:none;}
@keyframes winMin{to{opacity:0;transform:scale(.45) translateY(80px)}}
.os-window.anim-maximize{animation:winMax .22s cubic-bezier(.4,0,.2,1) both;}
@keyframes winMax{from{opacity:.8;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.win-bar{height:var(--win-bar-h);flex-shrink:0;background:var(--win-bar);border-bottom:1px solid var(--panel-border);display:flex;align-items:center;padding:0 10px;gap:8px;cursor:move;user-select:none;}
.win-controls{display:flex;gap:5px;align-items:center;flex-shrink:0;}
.wc{width:12px;height:12px;border-radius:50%;border:none;cursor:pointer;flex-shrink:0;transition:all .12s;}
.wc:hover{filter:brightness(1.3);transform:scale(1.15);}
.wc-close{background:#ff5f57;}.wc-min{background:#febc2e;}.wc-max{background:#27c840;}
.win-title{flex:1;text-align:center;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:var(--text-dim);letter-spacing:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.win-body{flex:1;overflow:hidden;position:relative;background:var(--bg);}
.win-body iframe{width:100%;height:100%;border:none;display:block;}
.win-resize-handle{position:absolute;bottom:0;right:0;width:18px;height:18px;cursor:se-resize;z-index:99;}
.win-resize-handle::after{content:'';position:absolute;bottom:4px;right:4px;width:9px;height:9px;border-right:2px solid var(--panel-border);border-bottom:2px solid var(--panel-border);}

/* pets removed */

/* ── TOAST ── */
#toast{position:fixed;top:calc(var(--sb-h) + 8px);left:50%;transform:translateX(-50%);z-index:1000;background:var(--panel);border:1px solid var(--neon);border-radius:8px;padding:7px 18px;font-size:11px;color:var(--text);font-family:'Share Tech Mono',monospace;letter-spacing:1px;box-shadow:var(--glow-sm);pointer-events:none;opacity:0;transition:opacity .28s;white-space:nowrap;max-width:90vw;}
#toast.show{opacity:1;}

/* ── BOOT ── */
#boot{position:fixed;inset:0;z-index:9999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;}
#boot.fade{animation:bootFade .7s ease forwards;}
@keyframes bootFade{to{opacity:0;pointer-events:none}}
.boot-logo{font-family:'Orbitron',sans-serif;font-size:36px;font-weight:900;color:#00b4ff;letter-spacing:14px;text-shadow:0 0 40px #00b4ff,0 0 80px rgba(0,80,200,.5);animation:bootIn .5s ease;}
@keyframes bootIn{from{opacity:0;transform:scale(.72) translateY(22px)}to{opacity:1;transform:scale(1)}}
.boot-sub{font-family:'Share Tech Mono',monospace;font-size:11px;color:rgba(0,180,255,.55);letter-spacing:5px;}
.boot-bar-wrap{width:220px;height:3px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden;}
.boot-bar{height:100%;background:linear-gradient(90deg,#0033cc,#00b4ff,#00ffcc);animation:bootBar 2.2s ease forwards;}
@keyframes bootBar{from{width:0}to{width:100%}}
.boot-msg{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(0,180,255,.38);letter-spacing:2px;animation:stBlink .6s infinite;}
@keyframes stBlink{0%,100%{opacity:1}50%{opacity:.25}}

/* ── START MENU ── */
#start-menu{position:fixed;bottom:var(--tb-h);left:6px;width:280px;background:var(--panel-solid);border:1px solid var(--panel-border);border-radius:14px 14px 4px 4px;padding:14px;z-index:260;box-shadow:var(--glow-lg);display:none;}
#start-menu.open{display:block;animation:smOpen .2s cubic-bezier(.34,1.56,.64,1);}
@keyframes smOpen{from{opacity:0;transform:translateY(14px) scale(.95)}to{opacity:1;transform:none}}
.sm-title{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:var(--neon);letter-spacing:4px;margin-bottom:10px;}
.sm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:10px;}
.sm-app{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px;border-radius:8px;cursor:pointer;transition:background var(--tr);}
.sm-app:hover{background:rgba(0,180,255,.1);}
.sm-app-icon{font-size:22px;}
.sm-app-lbl{font-size:8px;font-weight:600;color:var(--text-dim);text-align:center;}
.sm-sep{height:1px;background:var(--panel-border);margin:8px 0;}
.sm-actions{display:flex;justify-content:flex-end;gap:8px;}
.sm-action{background:rgba(255,255,255,.05);border:1px solid var(--panel-border);border-radius:6px;color:var(--text-dim);font-size:10px;padding:5px 10px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:600;transition:all .15s;}
.sm-action:hover{background:rgba(0,180,255,.1);color:var(--neon);}

/* ── MODAL ── */
.modal-backdrop{position:fixed;inset:0;z-index:500;background:rgba(0,4,12,.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .25s;}
.modal-backdrop.open{opacity:1;pointer-events:all;}
.modal-dialog{background:var(--panel-solid);border:1px solid var(--panel-border);border-radius:14px;padding:20px;max-height:88vh;overflow-y:auto;box-shadow:var(--glow-lg);animation:modalOpen .28s cubic-bezier(.34,1.56,.64,1) both;}
@keyframes modalOpen{from{opacity:0;transform:scale(.85) translateY(20px)}to{opacity:1;transform:none}}
.modal-title{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:var(--neon);letter-spacing:4px;margin-bottom:16px;text-align:center;}
.modal-field{margin-bottom:12px;}
.modal-label{display:block;font-size:11px;font-weight:600;color:var(--text-dim);letter-spacing:2px;margin-bottom:5px;font-family:'Share Tech Mono',monospace;}
.modal-input,.modal-select,.modal-textarea{width:100%;padding:8px 10px;border-radius:8px;background:rgba(0,15,35,.8);border:1px solid var(--panel-border);color:var(--text);font-family:'Rajdhani',sans-serif;font-size:13px;outline:none;transition:border-color .18s;}
.modal-input:focus,.modal-select:focus,.modal-textarea:focus{border-color:var(--neon);}
.modal-textarea{resize:vertical;min-height:60px;}
.modal-select option{background:#03111e;}
.modal-btns{display:flex;gap:8px;margin-top:14px;}
.modal-btn{flex:1;padding:9px;border-radius:9px;border:none;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;transition:all .18s;color:#fff;}
.modal-btn-primary{background:linear-gradient(135deg,#004499,#00b4ff);}
.modal-btn-primary:hover{transform:scale(1.04);}
.modal-btn-cancel{background:rgba(255,255,255,.06);border:1px solid var(--panel-border);}

/* ── SHARED APP UI ── */
.set-root{width:100%;height:100%;overflow-y:auto;padding:16px;}
.set-title{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--neon);letter-spacing:4px;border-bottom:1px solid var(--panel-border);padding-bottom:9px;margin-bottom:14px;}
.set-section{background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;margin-bottom:12px;}
.set-section-title{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--neon);letter-spacing:3px;margin-bottom:10px;text-transform:uppercase;}
.toggle-row{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.toggle-lbl{font-size:14px;font-weight:600;color:var(--text);}
.toggle-sw{width:42px;height:22px;border-radius:11px;cursor:pointer;background:rgba(255,255,255,.08);border:1px solid var(--panel-border);position:relative;transition:background .28s;}
.toggle-sw.on{background:rgba(0,180,255,.3);border-color:var(--neon);}
.toggle-sw::after{content:'';position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .28s;}
.toggle-sw.on::after{left:23px;background:var(--neon);}
.wp-grid-ui{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
.wp-opt{height:48px;border-radius:8px;cursor:pointer;border:2px solid transparent;transition:all .18s;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:rgba(255,255,255,.75);}
.wp-opt:hover{transform:scale(1.04);}
.wp-opt.active{border-color:var(--neon);box-shadow:0 0 14px rgba(0,180,255,.28);}
.wp-grid-opt{background:linear-gradient(135deg,#010812,#001030);}
.wp-stadium-opt{background:linear-gradient(135deg,#001a0d,#001a44);}
.wp-gradient-opt{background:linear-gradient(135deg,#010812,#1a0030);}
.wp-energy-opt{background:linear-gradient(135deg,#001050,#003333);}
.wp-custom-opt{background:linear-gradient(135deg,#1a0a00,#331500);}
.wp-upload-btn,.generic-btn{width:100%;padding:7px;border-radius:7px;cursor:pointer;background:rgba(0,180,255,.07);border:1px dashed rgba(0,180,255,.3);color:var(--neon);font-size:11px;font-weight:600;font-family:'Rajdhani',sans-serif;transition:all .18s;margin-top:6px;}
.generic-btn{border-style:solid;}
.wp-upload-btn:hover,.generic-btn:hover{background:rgba(0,180,255,.14);border-color:var(--neon);}
.track-btns{display:flex;gap:5px;flex-wrap:wrap;}
.track-btn{padding:4px 10px;border-radius:6px;cursor:pointer;border:1px solid var(--panel-border);background:rgba(0,20,50,.5);color:var(--text-dim);font-family:'Share Tech Mono',monospace;font-size:9px;transition:all .18s;}
.track-btn.active{border-color:var(--neon);color:var(--neon);background:rgba(0,180,255,.1);}
.music-row{display:flex;align-items:center;gap:8px;}
.music-play-btn{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(135deg,#003399,#00b4ff);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:var(--glow-xs);transition:all .18s;}
.music-play-btn:hover{transform:scale(1.1);}
.vol-range{flex:1;-webkit-appearance:none;appearance:none;height:4px;border-radius:2px;background:rgba(255,255,255,.12);outline:none;cursor:pointer;}
.vol-range::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:var(--neon);cursor:pointer;}

/* ── CHANGELOG ── */
.changelog-entry{border-left:3px solid var(--neon);padding:8px 10px;margin-bottom:8px;background:rgba(0,180,255,.04);border-radius:0 6px 6px 0;}
.changelog-version{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:var(--neon);letter-spacing:2px;margin-bottom:5px;}
.changelog-item{font-size:11px;color:var(--text-dim);line-height:1.8;display:flex;gap:6px;align-items:flex-start;}
.changelog-item::before{content:'•';color:var(--neon);flex-shrink:0;margin-top:1px;}
.changelog-major .changelog-item::before{content:'★';color:var(--gold);}
.changelog-tag{display:inline-block;font-size:8px;font-weight:700;padding:1px 5px;border-radius:4px;margin-right:4px;font-family:'Share Tech Mono',monospace;vertical-align:middle;}
.tag-new{background:rgba(57,255,20,.15);color:var(--green);}
.tag-fix{background:rgba(255,215,0,.15);color:var(--gold);}
.tag-change{background:rgba(0,180,255,.15);color:var(--neon);}

/* ── CALCULATOR APP ── */
.calc-app{width:100%;height:100%;background:#020b1a;display:flex;flex-direction:column;padding:16px;gap:10px;}
.calc-display{background:rgba(0,10,30,.8);border:1px solid var(--panel-border);border-radius:10px;padding:16px;text-align:right;}
.calc-expr{font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--text-dim);min-height:16px;word-break:break-all;}
.calc-result{font-family:'Orbitron',sans-serif;font-size:32px;font-weight:700;color:var(--text);margin-top:4px;word-break:break-all;}
.calc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;flex:1;}
.calc-btn{border:none;border-radius:10px;font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .12s;display:flex;align-items:center;justify-content:center;min-height:48px;}
.calc-btn:active{transform:scale(.93);}
.calc-btn-num{background:rgba(10,30,70,.8);border:1px solid var(--panel-border);color:var(--text);}
.calc-btn-num:hover{background:rgba(0,60,140,.5);border-color:var(--neon);}
.calc-btn-op{background:rgba(0,40,120,.7);border:1px solid rgba(0,140,255,.3);color:var(--neon);}
.calc-btn-op:hover{background:rgba(0,70,180,.5);}
.calc-btn-eq{background:linear-gradient(135deg,#003399,#00b4ff);color:#fff;box-shadow:var(--glow-xs);}
.calc-btn-eq:hover{transform:scale(1.04);box-shadow:var(--glow-sm);}
.calc-btn-clr{background:rgba(180,40,40,.25);border:1px solid rgba(255,80,80,.3);color:#ff6666;}
.calc-btn-clr:hover{background:rgba(200,50,50,.4);}
.calc-btn-wide{grid-column:span 2;}

/* ── MUSIC APP ── */
.music-app{width:100%;height:100%;background:#020b1a;display:flex;overflow:hidden;}
.music-sidebar{width:200px;flex-shrink:0;background:rgba(1,5,15,.9);border-right:1px solid var(--panel-border);display:flex;flex-direction:column;overflow:hidden;}
.music-sidebar-top{padding:12px;}
.music-folder-btn{width:100%;padding:8px 12px;border-radius:9px;cursor:pointer;background:linear-gradient(135deg,rgba(0,210,211,.1),rgba(0,180,255,.08));border:1px solid rgba(0,210,211,.35);color:var(--neon3);font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:1px;transition:all .18s;display:flex;align-items:center;justify-content:center;gap:6px;}
.music-folder-btn:hover{background:rgba(0,180,255,.18);transform:scale(1.02);}
.folder-status{margin-top:8px;padding:7px 10px;background:rgba(0,0,0,.3);border-radius:7px;font-size:9px;font-family:'Share Tech Mono',monospace;color:var(--text-muted);line-height:1.6;}
.folder-status .hi{color:var(--neon3);}
.music-sidebar-divider{height:1px;background:var(--panel-border);margin:8px 12px;}
.music-sidebar-label{font-size:9px;color:var(--text-muted);letter-spacing:2px;font-family:'Share Tech Mono',monospace;padding:0 12px 4px;text-transform:uppercase;}
.music-nav-item{display:flex;align-items:center;gap:8px;padding:7px 12px;cursor:pointer;transition:background var(--tr);color:var(--text-dim);font-size:12px;font-weight:600;}
.music-nav-item:hover{background:rgba(0,180,255,.08);}
.music-nav-item.active{background:rgba(0,180,255,.12);color:var(--neon);border-right:2px solid var(--neon);}
.music-sidebar-bottom{margin-top:auto;padding:10px 12px;border-top:1px solid var(--panel-border);}
.music-main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.music-header{padding:12px 16px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;justify-content:space-between;}
.music-header-title{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:var(--text);}
.music-scan-btn{padding:5px 12px;background:rgba(0,210,211,.1);border:1px solid rgba(0,210,211,.3);border-radius:7px;color:var(--neon3);cursor:pointer;font-size:10px;font-family:'Orbitron',sans-serif;font-weight:700;letter-spacing:1px;transition:all .18s;}
.music-scan-btn:hover{background:rgba(0,210,211,.2);}
.music-track-list{flex:1;overflow-y:auto;padding:6px 8px;}
.music-track{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background var(--tr);}
.music-track:hover{background:rgba(255,255,255,.04);}
.music-track.playing{background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.25);}
.track-num{width:24px;text-align:center;font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;flex-shrink:0;}
.track-info{flex:1;min-width:0;}
.track-title{font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.track-artist{font-size:10px;color:var(--text-dim);margin-top:1px;}
.track-dur{font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;flex-shrink:0;}
.music-now-playing{flex-shrink:0;background:rgba(1,5,15,.95);border-top:1px solid var(--panel-border);padding:10px 14px;display:flex;align-items:center;gap:12px;}
.np-album-art{width:44px;height:44px;border-radius:8px;background:linear-gradient(135deg,#001840,#003399);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;}
.np-info{flex:1;min-width:0;}
.np-title{font-size:13px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.np-artist{font-size:10px;color:var(--text-dim);}
.np-controls{display:flex;flex-direction:column;gap:5px;}
.np-ctrl-row{display:flex;align-items:center;gap:7px;}
.np-btn{background:none;border:none;cursor:pointer;color:var(--text-dim);font-size:16px;padding:2px;transition:all .15s;}
.np-btn:hover{color:var(--neon);transform:scale(1.1);}
.np-btn.main{width:32px;height:32px;border-radius:50%;background:var(--neon);color:#001840;font-size:13px;display:flex;align-items:center;justify-content:center;box-shadow:0 0 14px var(--neon);}
.np-progress-row{display:flex;align-items:center;gap:6px;width:260px;}
.np-time{font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;flex-shrink:0;min-width:28px;}
.np-progress{flex:1;-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,.12);outline:none;cursor:pointer;}
.np-progress::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;border-radius:50%;background:var(--neon);}
.np-visualizer{display:flex;align-items:flex-end;gap:2px;height:28px;flex-shrink:0;}
.np-bar{width:3px;border-radius:1px;background:var(--neon);transition:height .1s ease;opacity:.7;}
.music-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--text-muted);}
.music-empty-icon{font-size:48px;opacity:.3;}
.music-empty-text{font-size:11px;letter-spacing:2px;font-family:'Share Tech Mono',monospace;}

/* ── MOD MANAGER ── */
.mod-app{width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;}
.mod-tabs{display:flex;gap:0;border-bottom:1px solid var(--panel-border);flex-shrink:0;}
.mod-tab{padding:8px 16px;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;color:var(--text-dim);border-bottom:2px solid transparent;transition:all .18s;}
.mod-tab:hover{color:var(--text);}
.mod-tab.active{color:var(--gold);border-bottom-color:var(--gold);}
.mod-content{flex:1;overflow-y:auto;padding:14px;}
.mod-title{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--gold);letter-spacing:4px;border-bottom:1px solid rgba(255,215,0,.2);padding-bottom:9px;margin-bottom:14px;}
.mod-section-title{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--text-muted);letter-spacing:3px;margin-bottom:8px;text-transform:uppercase;}
.mod-card{background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;}
.mod-card-icon{font-size:24px;flex-shrink:0;}
.mod-card-info{flex:1;min-width:0;}
.mod-card-name{font-size:14px;font-weight:700;color:var(--text);}
.mod-card-desc{font-size:10px;color:var(--text-dim);margin-top:2px;}
.mod-card-version{font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:2px;}
.mod-card-actions{display:flex;gap:6px;align-items:center;flex-shrink:0;}
.mod-toggle{width:38px;height:20px;border-radius:10px;cursor:pointer;background:rgba(255,255,255,.07);border:1px solid var(--panel-border);position:relative;transition:all .28s;}
.mod-toggle.on{background:rgba(0,180,255,.3);border-color:var(--neon);}
.mod-toggle::after{content:'';position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .28s;}
.mod-toggle.on::after{left:20px;}
.mod-uninstall{background:none;border:1px solid rgba(255,50,50,.2);border-radius:5px;color:rgba(255,80,80,.5);font-size:9px;padding:3px 8px;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:all .15s;}
.mod-uninstall:hover{border-color:rgba(255,50,50,.5);color:#ff4444;}
.mod-install-area{border:1px dashed var(--panel-border);border-radius:10px;padding:16px;text-align:center;cursor:pointer;transition:all .18s;margin-top:8px;}
.mod-install-area:hover{border-color:var(--neon);background:rgba(0,180,255,.04);}

/* ── ADMIN PANEL ── */
.admin-app{width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;background:#020b1a;}
.admin-header{padding:10px 14px;background:rgba(180,0,50,.08);border-bottom:1px solid rgba(255,45,110,.25);flex-shrink:0;display:flex;align-items:center;gap:10px;}
.admin-badge{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--accent);letter-spacing:3px;border:1px solid rgba(255,45,110,.4);padding:2px 8px;border-radius:4px;}
.admin-content{flex:1;overflow-y:auto;padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.admin-card{background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;}
.admin-card-title{font-family:'Orbitron',sans-serif;font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:8px;}
.admin-stat{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--text-dim);padding:3px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.admin-stat-val{color:var(--neon);font-family:'Share Tech Mono',monospace;}
.admin-btn-grid{display:flex;flex-direction:column;gap:6px;}
.admin-btn{padding:7px 10px;border-radius:7px;border:none;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:1px;transition:all .15s;text-align:left;}
.admin-btn-danger{background:rgba(255,45,110,.12);border:1px solid rgba(255,45,110,.3);color:var(--accent);}
.admin-btn-danger:hover{background:rgba(255,45,110,.22);}
.admin-btn-info{background:rgba(0,180,255,.07);border:1px solid rgba(0,180,255,.25);color:var(--neon);}
.admin-btn-info:hover{background:rgba(0,180,255,.14);}
.admin-btn-warn{background:rgba(255,215,0,.08);border:1px solid rgba(255,215,0,.25);color:var(--gold);}
.admin-btn-warn:hover{background:rgba(255,215,0,.15);}
.admin-log{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--neon3);background:rgba(0,0,0,.5);border-radius:7px;padding:8px;height:100px;overflow-y:auto;line-height:1.6;}
.admin-proc-item{display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:11px;}
.admin-proc-name{color:var(--text);font-weight:600;}
.admin-proc-kill{background:rgba(255,50,50,.15);border:1px solid rgba(255,50,50,.3);border-radius:4px;color:#ff6666;font-size:8px;padding:2px 6px;cursor:pointer;font-family:'Share Tech Mono',monospace;}
.admin-proc-kill:hover{background:rgba(255,50,50,.3);}

/* ── UPDATE LOG ── */
.updatelog-app{width:100%;height:100%;overflow-y:auto;padding:16px;}

/* ── VAULT ── */
.vault-app{width:100%;height:100%;overflow-y:auto;padding:16px;}
.vault-title{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--accent);letter-spacing:4px;border-bottom:1px solid rgba(255,45,110,.2);padding-bottom:9px;margin-bottom:14px;}
.vault-subtitle{font-size:11px;color:var(--text-dim);margin-bottom:14px;font-family:'Share Tech Mono',monospace;line-height:1.6;}
.vault-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;}
.vault-card{background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;text-align:center;transition:all .18s;}
.vault-card:hover{border-color:rgba(0,180,255,.35);}
.vault-card-icon{font-size:30px;display:block;margin-bottom:5px;}
.vault-card-name{font-size:11px;font-weight:600;color:var(--text);margin-bottom:8px;}
.vault-restore-btn{width:100%;padding:5px;border-radius:6px;border:none;cursor:pointer;background:linear-gradient(135deg,#004499,#00b4ff);color:#fff;font-size:9px;font-family:'Orbitron',sans-serif;font-weight:700;transition:all .18s;}
.vault-restore-btn:hover{transform:scale(1.05);}
.vault-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:10px;color:var(--text-muted);}


.pet-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:8px;}
.pet-card{background:var(--panel);border:1.5px solid var(--panel-border);border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .18s;}
.pet-card:hover{border-color:rgba(0,180,255,.4);}
.pet-card.active{border-color:var(--neon);background:rgba(0,180,255,.1);}
.pet-card-emoji{font-size:28px;display:block;margin-bottom:4px;}
.pet-card-name{font-size:10px;font-weight:600;color:var(--text-dim);}
.pet-card.active .pet-card-name{color:var(--neon);}

/* ── PETTUBE ── */
.pettube-app{width:100%;height:100%;display:flex;flex-direction:column;background:#020b1a;font-family:'Rajdhani',sans-serif;}
.pettube-topbar{padding:10px 14px;background:rgba(0,5,20,.9);border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:10px;flex-shrink:0;}
.pettube-logo{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:900;color:var(--accent);letter-spacing:2px;}
.pettube-search{flex:1;background:rgba(0,10,30,.8);border:1px solid var(--panel-border);border-radius:8px;padding:6px 12px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:13px;outline:none;}
.pettube-search:focus{border-color:var(--neon);}
.pettube-body{display:flex;flex:1;overflow:hidden;}
.pettube-sidebar{width:180px;flex-shrink:0;border-right:1px solid var(--panel-border);padding:8px 0;overflow-y:auto;}
.pettube-nav{display:flex;align-items:center;gap:8px;padding:7px 14px;cursor:pointer;font-size:12px;font-weight:600;color:var(--text-dim);transition:all .15s;}
.pettube-nav:hover{background:rgba(0,180,255,.07);color:var(--text);}
.pettube-nav.active{background:rgba(0,180,255,.12);color:var(--neon);}
.pettube-main{flex:1;overflow-y:auto;padding:12px;}
.pettube-player{background:rgba(0,5,20,.9);border:1px solid var(--panel-border);border-radius:10px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-bottom:12px;cursor:pointer;}
.pettube-player-play{font-size:56px;opacity:.8;transition:transform .2s;}
.pettube-player:hover .pettube-player-play{transform:scale(1.1);}
.pettube-player-label{position:absolute;bottom:10px;left:10px;font-family:'Orbitron',sans-serif;font-size:9px;color:rgba(255,255,255,.7);background:rgba(0,0,0,.5);padding:3px 8px;border-radius:4px;}
.pettube-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;}
.pettube-card{background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .18s;}
.pettube-card:hover{border-color:rgba(0,180,255,.35);transform:translateY(-2px);}
.pettube-thumb{height:90px;display:flex;align-items:center;justify-content:center;font-size:36px;background:rgba(0,10,30,.5);}
.pettube-card-info{padding:8px;}
.pettube-card-title{font-size:11px;font-weight:600;color:var(--text);}
.pettube-card-meta{font-size:9px;color:var(--text-muted);margin-top:2px;font-family:'Share Tech Mono',monospace;}

.music-artist-card{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background .15s;border:1px solid transparent;margin-bottom:6px;}
.music-artist-card:hover{background:rgba(0,180,255,.07);border-color:var(--panel-border);}
.music-artist-songs{padding:0 8px 8px 56px;}
.music-main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.music-header{display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid var(--panel-border);flex-shrink:0;}
.music-track-list{flex:1;overflow-y:auto;}

@keyframes spin{to{transform:rotate(360deg)}}

/* ══════════════════════════════════════
   TOB OS v10.0 — NEW FEATURE STYLES
══════════════════════════════════════ */

/* ── LIVE WALLPAPER CANVAS ── */
#live-wp-canvas{position:fixed;inset:0;z-index:1;pointer-events:none;display:none;}

/* ── DYNAMIC NOTCH ── */
#dynamic-notch{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#000;border-radius:20px;padding:4px 16px;cursor:pointer;z-index:310;transition:all .35s cubic-bezier(.4,0,.2,1);border:1px solid rgba(0,180,255,.18);box-shadow:0 2px 12px rgba(0,0,0,.6);min-width:88px;display:flex;align-items:center;justify-content:center;}
#dynamic-notch.expanded{border-radius:16px;padding:10px 14px;min-width:250px;background:rgba(2,8,22,.98);border-color:rgba(0,180,255,.4);box-shadow:0 8px 35px rgba(0,0,0,.85),0 0 20px rgba(0,180,255,.15);top:calc(50% + 80px);}
#notch-idle{display:flex;align-items:center;gap:7px;font-size:9px;color:rgba(200,232,255,.5);font-family:'Share Tech Mono',monospace;transition:all .2s;}
.notch-dot{width:5px;height:5px;border-radius:50%;background:var(--neon);box-shadow:0 0 5px var(--neon);animation:notchPulse 1.8s ease-in-out infinite;}
@keyframes notchPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.75)}}
#notch-expanded{display:none;width:100%;}
.notch-exp-content{display:flex;flex-direction:column;gap:9px;width:100%;animation:notchExpAnim .28s cubic-bezier(.4,0,.2,1);}
@keyframes notchExpAnim{from{opacity:0;transform:scaleY(.5)}to{opacity:1;transform:scaleY(1)}}
.notch-exp-header{display:flex;justify-content:space-between;align-items:center;}
.notch-exp-brand{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--neon);letter-spacing:2px;}
.notch-music-row{display:flex;align-items:center;gap:7px;}
.notch-disc{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#001040,#003399);border:1.5px solid rgba(0,180,255,.35);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;transition:animation .2s;}
.notch-disc.spin{animation:discSpin 3s linear infinite;}
@keyframes discSpin{to{transform:rotate(360deg)}}
.notch-track-name{flex:1;font-size:9px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;}
.notch-ctrl-btn{background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);border-radius:5px;color:var(--text);font-size:10px;padding:2px 7px;cursor:pointer;transition:all .12s;line-height:1.4;}
.notch-ctrl-btn:hover{background:rgba(0,180,255,.25);border-color:var(--neon);}
.notch-toggles{display:flex;gap:6px;}
.notch-mini-toggle{flex:1;background:rgba(0,180,255,.07);border:1px solid rgba(0,180,255,.15);border-radius:8px;padding:5px 4px;text-align:center;cursor:pointer;font-size:10px;transition:all .15s;}
.notch-mini-toggle:hover,.notch-mini-toggle.on{background:rgba(0,180,255,.2);border-color:var(--neon);}
.notch-mini-toggle-label{font-size:8px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-top:2px;}

/* ── CONTROL CENTER V2 ── */
#control-center{position:fixed;top:calc(var(--sb-h) + 8px);right:10px;width:310px;background:rgba(2,8,22,.97);border:1px solid rgba(0,180,255,.3);border-radius:20px;padding:16px;z-index:400;backdrop-filter:blur(40px) saturate(200%);box-shadow:0 24px 70px rgba(0,0,0,.85),0 0 30px rgba(0,180,255,.1);animation:ccIn .28s cubic-bezier(.34,1.56,.64,1);}
@keyframes ccIn{from{opacity:0;transform:translateY(-8px) scale(.96)}to{opacity:1;transform:none}}
.cc2-header{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--neon);letter-spacing:3px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;}
.cc2-close-btn{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:14px;line-height:1;padding:0 2px;transition:color .15s;}
.cc2-close-btn:hover{color:var(--accent);}
.cc2-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;}
.cc2-tile{background:rgba(0,180,255,.06);border:1px solid rgba(0,180,255,.14);border-radius:14px;padding:10px 6px;cursor:pointer;text-align:center;transition:all .18s;position:relative;overflow:hidden;}
.cc2-tile::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.05),transparent 60%);border-radius:inherit;}
.cc2-tile:hover{background:rgba(0,180,255,.14);border-color:rgba(0,180,255,.4);transform:scale(1.04);}
.cc2-tile.on{background:rgba(0,180,255,.22);border-color:var(--neon);box-shadow:0 0 12px rgba(0,180,255,.25);}
.cc2-tile-icon{font-size:20px;}
.cc2-tile-label{font-size:9px;font-weight:700;color:var(--text);margin-top:4px;}
.cc2-tile-status{font-size:8px;color:var(--neon3);margin-top:1px;}
.cc2-music-bar{background:rgba(0,180,255,.06);border:1px solid rgba(0,180,255,.14);border-radius:13px;padding:10px;display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.cc2-music-disc{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#001040,#003399);border:2px solid rgba(0,180,255,.3);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;}
.cc2-music-info{flex:1;min-width:0;}
.cc2-music-title{font-size:10px;font-weight:700;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cc2-music-sub{font-size:8px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:1px;}
.cc2-music-btns{display:flex;gap:4px;flex-shrink:0;}
.cc2-mbtn{background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);border-radius:6px;color:var(--text-dim);font-size:11px;padding:4px 7px;cursor:pointer;transition:all .12s;}
.cc2-mbtn:hover{color:var(--neon);border-color:rgba(0,180,255,.5);}
.cc2-slider-wrap{margin-bottom:10px;}
.cc2-slider-label{display:flex;justify-content:space-between;font-size:9px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-bottom:5px;}
input.cc2-range{width:100%;accent-color:var(--neon);cursor:pointer;}
.cc2-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:12px;}
.cc2-act{background:rgba(255,255,255,.04);border:1px solid var(--panel-border);border-radius:10px;color:var(--text-dim);font-size:10px;font-family:'Share Tech Mono',monospace;padding:8px 6px;cursor:pointer;text-align:center;transition:all .15s;}
.cc2-act:hover{background:rgba(0,180,255,.1);color:var(--neon);border-color:rgba(0,180,255,.3);}

/* ── FINDER ── */
.finder-app{display:flex;height:100%;background:var(--bg);}
.finder-sidebar{width:155px;flex-shrink:0;background:rgba(2,7,18,.95);border-right:1px solid var(--panel-border);padding:10px 0;overflow-y:auto;}
.finder-sb-title{font-family:'Orbitron',sans-serif;font-size:7px;font-weight:700;color:var(--neon);letter-spacing:2px;padding:4px 14px 7px;opacity:.6;}
.finder-nav-item{padding:6px 14px;font-size:12px;font-weight:600;color:var(--text-dim);cursor:pointer;transition:all .13s;display:flex;align-items:center;gap:8px;white-space:nowrap;}
.finder-nav-item:hover{background:rgba(0,180,255,.07);color:var(--text);}
.finder-nav-item.active{background:rgba(0,180,255,.13);color:var(--neon);}
.finder-sep{height:1px;background:var(--panel-border);margin:6px 0;}
.finder-main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.finder-toolbar{height:36px;flex-shrink:0;padding:0 12px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:8px;background:rgba(2,7,18,.5);}
.finder-path{flex:1;font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);}
.finder-vbtn{background:none;border:1px solid var(--panel-border);border-radius:5px;color:var(--text-dim);font-size:12px;padding:2px 8px;cursor:pointer;transition:all .13s;}
.finder-vbtn.active,.finder-vbtn:hover{background:rgba(0,180,255,.1);color:var(--neon);border-color:rgba(0,180,255,.3);}
.finder-upbtn{background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.25);border-radius:7px;color:var(--neon);font-size:9px;padding:4px 10px;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:all .13s;white-space:nowrap;}
.finder-upbtn:hover{background:rgba(0,180,255,.2);}
.finder-content{flex:1;overflow-y:auto;padding:12px;position:relative;}
.finder-file-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:10px;}
.finder-file{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:10px;cursor:pointer;transition:all .13s;text-align:center;user-select:none;}
.finder-file:hover{background:rgba(0,180,255,.1);}
.finder-file.sel{background:rgba(0,180,255,.2);outline:1.5px solid rgba(0,180,255,.5);}
.finder-icon{width:48px;height:48px;border-radius:10px;background:rgba(0,20,50,.8);border:1px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:22px;overflow:hidden;flex-shrink:0;}
.finder-icon img{width:100%;height:100%;border-radius:9px;object-fit:cover;}
.finder-fname{font-size:9px;color:var(--text);font-weight:600;max-width:76px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.2;}
.finder-ftype{font-size:8px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;}
.finder-file-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:8px;cursor:pointer;transition:background .12s;}
.finder-file-row:hover{background:rgba(0,180,255,.07);}
.finder-file-row.sel{background:rgba(0,180,255,.15);}
.finder-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60%;gap:12px;}
.finder-empty-ico{font-size:46px;opacity:.2;}
.finder-empty-txt{font-family:'Orbitron',sans-serif;font-size:11px;color:var(--text-muted);letter-spacing:2px;}
.finder-drop-zone{position:absolute;inset:0;background:rgba(0,180,255,.1);border:2.5px dashed rgba(0,180,255,.6);border-radius:12px;display:none;align-items:center;justify-content:center;z-index:50;font-family:'Orbitron',sans-serif;font-size:14px;color:var(--neon);pointer-events:none;}
.finder-drop-zone.show{display:flex;}
.finder-statusbar{height:22px;flex-shrink:0;border-top:1px solid var(--panel-border);padding:0 12px;display:flex;align-items:center;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);background:rgba(1,4,12,.5);}

/* ── LIVE WALLPAPER OPTIONS ── */
.lwp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:8px;margin-top:8px;}
.lwp-opt{background:rgba(0,10,30,.8);border:2px solid var(--panel-border);border-radius:10px;padding:10px 6px;cursor:pointer;text-align:center;transition:all .18s;}
.lwp-opt:hover{border-color:rgba(0,180,255,.4);}
.lwp-opt.active{border-color:var(--neon);box-shadow:0 0 10px rgba(0,180,255,.3);background:rgba(0,30,70,.6);}
.lwp-opt-icon{font-size:18px;}
.lwp-opt-label{font-size:8px;font-weight:700;color:var(--text-dim);margin-top:4px;font-family:'Share Tech Mono',monospace;}


/* ── DYNAMIC ISLAND v17 ── */
#dynamic-notch{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#000;border-radius:24px;padding:0 12px;cursor:pointer;z-index:310;transition:all .4s cubic-bezier(.4,0,.2,1);border:1px solid rgba(0,180,255,.1);box-shadow:0 2px 14px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.04);min-width:96px;height:26px;display:flex;align-items:center;justify-content:center;overflow:hidden;}
#dynamic-notch.has-music{min-width:132px;background:linear-gradient(180deg,#0a0a0a,#000);}
#dynamic-notch.expanded{border-radius:22px;padding:12px 14px;min-width:320px;height:auto;background:rgba(2,6,18,.98);border-color:rgba(0,180,255,.3);box-shadow:0 14px 50px rgba(0,0,0,.9),0 0 30px rgba(0,180,255,.08),inset 0 1px 0 rgba(255,255,255,.06);top:calc(50% + 96px);}
#notch-idle{display:flex;align-items:center;gap:6px;font-size:9px;color:rgba(200,232,255,.45);font-family:'Share Tech Mono',monospace;width:100%;justify-content:center;transition:all .3s;}
.notch-dot{width:5px;height:5px;border-radius:50%;background:var(--neon);box-shadow:0 0 6px var(--neon);animation:notchPulse 1.8s ease-in-out infinite;flex-shrink:0;}
.notch-vis-bars{display:flex;align-items:flex-end;gap:1.5px;height:12px;}
.notch-vis-bar{width:2px;border-radius:1px;background:var(--neon3);animation:notchBar var(--spd,0.6s) ease-in-out infinite alternate;}
@keyframes notchBar{0%{height:2px}100%{height:var(--h,10px)}}
.notch-idle-track{font-size:8px;color:rgba(0,180,255,.6);max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:'Share Tech Mono',monospace;}
#notch-expanded{display:none;width:100%;}
.notch-exp-content{display:flex;flex-direction:column;gap:10px;width:100%;animation:notchExpAnim .32s cubic-bezier(.4,0,.2,1);}
@keyframes notchExpAnim{from{opacity:0;transform:scale(.94) translateY(-4px)}to{opacity:1;transform:none}}
.notch-exp-header{display:flex;justify-content:space-between;align-items:center;}
.notch-exp-brand{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--neon);letter-spacing:3px;}
.notch-exp-time{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(200,232,255,.5);letter-spacing:1px;}
.notch-status-row{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}
.notch-chip{background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.18);border-radius:9px;padding:5px 6px;}
.notch-chip-label{display:block;font-size:7px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;letter-spacing:1px;}
.notch-chip-val{display:block;font-size:9px;color:var(--text);font-weight:700;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.notch-music-row{display:flex;align-items:center;gap:8px;background:rgba(0,180,255,.05);border:1px solid rgba(0,180,255,.1);border-radius:12px;padding:8px 10px;}
.notch-disc{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#001040,#003399);border:1.5px solid rgba(0,180,255,.35);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;}
.notch-disc.spin{animation:discSpin 3s linear infinite;}
@keyframes discSpin{to{transform:rotate(360deg)}}
.notch-track-info{flex:1;min-width:0;}
.notch-track-name{font-size:9px;color:var(--text);font-family:'Share Tech Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;}
.notch-track-artist{font-size:8px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-top:1px;}
.notch-prog-bar{width:100%;height:2px;background:rgba(255,255,255,.08);border-radius:1px;margin-top:5px;overflow:hidden;}
.notch-prog-fill{height:100%;background:linear-gradient(90deg,var(--neon2),var(--neon));border-radius:1px;transition:width .5s linear;}
.notch-btns{display:flex;gap:4px;flex-shrink:0;}
.notch-ctrl-btn{background:rgba(0,180,255,.12);border:1px solid rgba(0,180,255,.2);border-radius:6px;color:var(--text);font-size:10px;padding:3px 7px;cursor:pointer;transition:all .12s;line-height:1.4;}
.notch-ctrl-btn:hover{background:rgba(0,180,255,.28);border-color:var(--neon);}
.notch-big-vis{display:flex;align-items:flex-end;gap:2px;height:32px;padding:0 2px;}
.notch-big-bar{flex:1;border-radius:2px 2px 0 0;background:linear-gradient(0deg,var(--neon2),var(--neon3));transition:height .08s ease;min-height:3px;}
.notch-tools{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}
.notch-tool-btn{background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.2);border-radius:8px;padding:6px 4px;text-align:center;font-size:8px;font-family:'Share Tech Mono',monospace;color:var(--text-dim);cursor:pointer;transition:all .14s;}
.notch-tool-btn:hover{background:rgba(0,180,255,.2);border-color:var(--neon);color:var(--neon);}
.notch-toggles{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;}
.notch-mini-toggle{background:rgba(0,180,255,.07);border:1px solid rgba(0,180,255,.14);border-radius:10px;padding:6px 4px;text-align:center;cursor:pointer;font-size:11px;transition:all .15s;}
.notch-mini-toggle:hover,.notch-mini-toggle.on{background:rgba(0,180,255,.22);border-color:var(--neon);}
.notch-mini-toggle-label{font-size:7px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-top:2px;}

/* ── APP STORE SVG ICONS ── */
.store-svg-icon{
  width:100%;height:100%;display:flex;align-items:center;
  justify-content:center;
}
.store-svg-icon svg{width:100%;height:100%;}
.store-featured-icon .store-svg-icon{width:40px;height:40px;}
.store-app-icon .store-svg-icon{width:34px;height:34px;margin:0 auto;}
.store-detail-icon .store-svg-icon{width:52px;height:52px;}

/* Icon backgrounds */
.icon-bg-blue{background:linear-gradient(135deg,#001a50,#003399);}
.icon-bg-purple{background:linear-gradient(135deg,#1a0040,#5500aa);}
.icon-bg-green{background:linear-gradient(135deg,#002218,#005533);}
.icon-bg-orange{background:linear-gradient(135deg,#301000,#804000);}
.icon-bg-red{background:linear-gradient(135deg,#300010,#880030);}
.icon-bg-teal{background:linear-gradient(135deg,#001a20,#004455);}
.icon-bg-gold{background:linear-gradient(135deg,#201000,#604000);}
.icon-bg-pink{background:linear-gradient(135deg,#2a0020,#770040);}

/* ── LOCK SCREEN ── */
#lock-screen{position:fixed;inset:0;z-index:9000;background:rgba(0,4,12,.97);backdrop-filter:blur(30px);display:none;flex-direction:column;align-items:center;justify-content:center;gap:16px;cursor:pointer;}
#lock-screen.show{display:flex;animation:lockIn .4s ease;}
@keyframes lockIn{from{opacity:0}to{opacity:1}}
.lock-time{font-family:'Orbitron',sans-serif;font-size:54px;font-weight:900;color:#fff;text-shadow:0 0 40px rgba(0,180,255,.4);letter-spacing:4px;}
.lock-date{font-family:'Share Tech Mono',monospace;font-size:13px;color:rgba(200,232,255,.4);letter-spacing:3px;}
.lock-logo{font-family:'Orbitron',sans-serif;font-size:11px;color:rgba(0,180,255,.3);letter-spacing:6px;margin-top:24px;}
.lock-hint{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(200,232,255,.2);margin-top:28px;animation:sbPulse 2.2s ease-in-out infinite;}


/* ══════════════════════════════════════
   TOB OS v11.0 — INNOVATION UPDATE CSS
══════════════════════════════════════ */

/* ── BOOT ANIMATION SYSTEM ── */
#boot-canvas{position:absolute;inset:0;z-index:0;}
.boot-overlay{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;width:100%;height:100%;}
.boot-block-grid{display:grid;gap:4px;margin:10px 0;}
.boot-block{width:18px;height:18px;border-radius:3px;background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.15);transition:all .2s;}
.boot-block.lit{background:var(--neon);border-color:var(--neon);box-shadow:0 0 8px var(--neon),0 0 16px rgba(0,180,255,.4);}
.boot-style-select{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0;}
.boot-style-btn{padding:4px 12px;border-radius:20px;border:1px solid rgba(0,180,255,.25);background:rgba(0,180,255,.06);color:var(--text-dim);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer;transition:all .15s;}
.boot-style-btn.active{background:rgba(0,180,255,.2);border-color:var(--neon);color:var(--neon);}

/* ── TASKBAR UPGRADES ── */
#taskbar.centered #tb-apps{justify-content:center;}
.tb-pin-btn{background:none;border:none;color:var(--text-muted);font-size:11px;cursor:pointer;padding:2px;opacity:0;transition:opacity .15s;}
.tb-app:hover .tb-pin-btn{opacity:1;}
.tb-app.pinned{border-color:rgba(0,180,255,.2);}
.tb-app.pinned .tb-pin-btn{opacity:.6;color:var(--neon);}
.tb-run-dot{width:3px;height:3px;border-radius:50%;background:var(--neon);position:absolute;bottom:2px;left:50%;transform:translateX(-50%);box-shadow:0 0 4px var(--neon);}
.tb-preview{position:fixed;bottom:calc(var(--tb-h) + 8px);background:rgba(2,8,22,.97);border:1px solid rgba(0,180,255,.3);border-radius:10px;padding:8px;z-index:260;backdrop-filter:blur(20px);box-shadow:0 8px 30px rgba(0,0,0,.7);pointer-events:none;min-width:140px;max-width:200px;animation:previewIn .15s ease;}
@keyframes previewIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.tb-preview-title{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--neon);letter-spacing:2px;margin-bottom:6px;}
.tb-preview-thumb{width:100%;height:70px;border-radius:6px;background:rgba(0,20,50,.5);border:1px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:28px;}
.tb-ctx-menu{position:fixed;background:rgba(2,8,22,.97);border:1px solid rgba(0,180,255,.3);border-radius:10px;padding:6px;z-index:900;backdrop-filter:blur(20px);box-shadow:0 8px 30px rgba(0,0,0,.8);min-width:160px;animation:previewIn .12s ease;}
.tb-ctx-item{padding:7px 12px;border-radius:6px;font-size:11px;font-weight:600;color:var(--text-dim);cursor:pointer;transition:all .12s;display:flex;align-items:center;gap:8px;}
.tb-ctx-item:hover{background:rgba(0,180,255,.1);color:var(--neon);}
.tb-ctx-sep{height:1px;background:var(--panel-border);margin:4px 0;}
#tb-widgets-btn{width:30px;height:30px;border-radius:7px;background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.2);color:var(--text-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:all .15s;}
#tb-widgets-btn:hover{background:rgba(0,180,255,.18);color:var(--neon);}
#tb-notif-btn{width:30px;height:30px;border-radius:7px;background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;position:relative;transition:color .15s;}
#tb-notif-btn:hover{color:var(--neon);}
.tb-notif-badge{position:absolute;top:2px;right:2px;width:8px;height:8px;border-radius:50%;background:var(--accent);border:1.5px solid var(--taskbar);font-size:6px;display:none;}
.tb-notif-badge.show{display:block;}

/* ── WIDGET DASHBOARD ── */
#widget-panel{position:fixed;left:-340px;top:var(--sb-h);bottom:var(--tb-h);width:320px;background:rgba(2,8,22,.97);border-right:1px solid rgba(0,180,255,.2);z-index:245;backdrop-filter:blur(30px);transition:left .35s cubic-bezier(.4,0,.2,1);overflow-y:auto;overflow-x:hidden;padding:12px 10px;}
#widget-panel.open{left:0;}
.widget-panel-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--panel-border);}
.widget-panel-title{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:var(--neon);letter-spacing:3px;}
.widget-close-btn{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;transition:color .15s;}
.widget-close-btn:hover{color:var(--accent);}
.widget{background:rgba(5,15,40,.8);border:1px solid rgba(0,180,255,.18);border-radius:14px;padding:12px;margin-bottom:10px;position:relative;cursor:grab;user-select:none;transition:border-color .18s;}
.widget:hover{border-color:rgba(0,180,255,.38);}
.widget button,.widget input,.widget textarea,.widget select{cursor:default;}
.widget button:hover{cursor:pointer;}
.widget.dragging{opacity:.5;cursor:grabbing;}
.widget-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.widget-title{font-family:'Share Tech Mono',monospace;font-size:8px;font-weight:700;color:var(--neon);letter-spacing:2px;text-transform:uppercase;}
.widget-remove{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:11px;opacity:0;transition:opacity .15s;}
.widget:hover .widget-remove{opacity:1;}
.widget-remove:hover{color:var(--accent);}
/* Clock widget */
.w-clock-time{font-family:'Orbitron',sans-serif;font-size:32px;font-weight:900;color:var(--text);text-align:center;line-height:1;}
.w-clock-date{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);text-align:center;margin-top:4px;letter-spacing:2px;}
/* Music widget */
.w-music-track{font-size:11px;font-weight:700;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:6px;}
.w-music-btns{display:flex;gap:6px;justify-content:center;}
.w-mbtn{background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);border-radius:6px;color:var(--text-dim);font-size:12px;padding:5px 10px;cursor:pointer;transition:all .12s;}
.w-mbtn:hover{color:var(--neon);border-color:var(--neon);}
/* Stats widget */
.w-stat-row{display:flex;justify-content:space-between;align-items:center;font-size:10px;padding:3px 0;border-bottom:1px solid rgba(0,180,255,.06);}
.w-stat-label{color:var(--text-dim);font-family:'Share Tech Mono',monospace;}
.w-stat-val{color:var(--neon);font-family:'Share Tech Mono',monospace;font-weight:700;}
.w-stat-bar{height:3px;border-radius:2px;background:rgba(0,180,255,.15);margin-top:3px;overflow:hidden;}
.w-stat-fill{height:100%;background:linear-gradient(90deg,var(--neon2),var(--neon));border-radius:2px;transition:width .5s;}
/* Notes widget */
.w-notes-area{width:100%;min-height:70px;background:rgba(0,10,30,.6);border:1px solid var(--panel-border);border-radius:7px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:12px;padding:8px;resize:none;outline:none;}
.w-notes-area:focus{border-color:rgba(0,180,255,.4);}
/* Shortcuts widget */
.w-shortcuts-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
.w-shortcut{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 3px;border-radius:8px;cursor:pointer;transition:background .13s;}
.w-shortcut:hover{background:rgba(0,180,255,.1);}
.w-shortcut-icon{width:32px;height:32px;border-radius:8px;background:rgba(0,20,50,.8);border:1px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:14px;}
.w-shortcut-lbl{font-size:7px;color:var(--text-dim);text-align:center;}
/* Calendar widget */
.w-cal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.w-cal-title{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--neon);}
.w-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;}
.w-cal-day-hdr{font-size:7px;color:var(--text-muted);padding:2px 0;font-family:'Share Tech Mono',monospace;}
.w-cal-day{font-size:9px;color:var(--text-dim);padding:3px 0;border-radius:4px;cursor:pointer;transition:background .12s;}
.w-cal-day:hover{background:rgba(0,180,255,.1);}
.w-cal-day.today{background:rgba(0,180,255,.2);color:var(--neon);font-weight:700;}
/* Edge swipe indicator */
#edge-swipe-indicator{position:fixed;left:0;top:50%;transform:translateY(-50%);width:4px;height:60px;border-radius:0 3px 3px 0;background:rgba(0,180,255,.3);z-index:239;pointer-events:none;transition:opacity .3s;}

/* ── BLOCK LOADER ── */
.block-loader-overlay{position:absolute;inset:0;z-index:200;background:rgba(1,6,16,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:inherit;backdrop-filter:blur(8px);}
.block-loader-grid{display:grid;gap:3px;}
.bl-block{width:14px;height:14px;border-radius:2px;background:rgba(0,180,255,.07);border:1px solid rgba(0,180,255,.12);}
.bl-block.lit{background:var(--neon);border-color:var(--neon);box-shadow:0 0 6px var(--neon);}
.block-loader-label{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:2px;animation:stBlink .6s infinite;}

/* ── APP STORE ── */
.store-app{display:flex;flex-direction:column;height:100%;background:var(--bg);}
.store-topbar{height:44px;flex-shrink:0;padding:0 14px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:10px;background:rgba(2,7,18,.5);}
.store-logo{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:var(--neon);letter-spacing:3px;}
.store-search{flex:1;padding:5px 10px;border-radius:16px;background:rgba(0,15,35,.7);border:1px solid var(--panel-border);color:var(--text);font-family:'Rajdhani',sans-serif;font-size:12px;outline:none;transition:border-color .18s;}
.store-search:focus{border-color:rgba(0,180,255,.4);}
.store-tabs{display:flex;gap:2px;padding:0 14px;border-bottom:1px solid var(--panel-border);background:rgba(2,7,18,.3);flex-shrink:0;}
.store-tab{padding:8px 14px;font-family:'Share Tech Mono',monospace;font-size:9px;font-weight:700;color:var(--text-muted);cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;letter-spacing:1px;}
.store-tab.active{color:var(--neon);border-bottom-color:var(--neon);}
.store-body{flex:1;overflow-y:auto;padding:14px;}
.store-section-title{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--neon);letter-spacing:3px;margin-bottom:10px;margin-top:4px;}
.store-featured-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:18px;}
.store-featured-card{background:linear-gradient(135deg,rgba(0,30,80,.9),rgba(0,10,30,.9));border:1px solid rgba(0,180,255,.2);border-radius:14px;padding:14px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.store-featured-card::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;border-radius:50%;background:rgba(0,180,255,.06);transform:translate(25px,-25px);}
.store-featured-card:hover{border-color:rgba(0,180,255,.5);transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,.5);}
.store-featured-icon{font-size:32px;margin-bottom:8px;}
.store-featured-name{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:var(--text);letter-spacing:1px;}
.store-featured-desc{font-size:10px;color:var(--text-dim);margin-top:4px;line-height:1.5;}
.store-featured-tag{display:inline-block;padding:2px 8px;border-radius:10px;font-size:8px;font-family:'Share Tech Mono',monospace;font-weight:700;margin-top:6px;}
.store-featured-tag.free{background:rgba(57,255,20,.12);color:var(--green);border:1px solid rgba(57,255,20,.2);}
.store-featured-tag.new{background:rgba(0,180,255,.12);color:var(--neon);border:1px solid rgba(0,180,255,.2);}
.store-app-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:8px;margin-bottom:18px;}
.store-app-card{background:rgba(5,15,40,.8);border:1px solid rgba(0,180,255,.15);border-radius:12px;padding:12px;cursor:pointer;transition:all .18s;text-align:center;}
.store-app-card:hover{border-color:rgba(0,180,255,.4);background:rgba(5,20,55,.8);}
.store-app-card.installed{border-color:rgba(57,255,20,.25);background:rgba(0,20,10,.6);}
.store-app-icon{font-size:28px;margin-bottom:6px;}
.store-app-name{font-size:10px;font-weight:700;color:var(--text);font-family:'Orbitron',sans-serif;letter-spacing:1px;}
.store-app-cat{font-size:8px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:2px;}
.store-install-btn{margin-top:8px;padding:5px 12px;border-radius:20px;border:none;font-family:'Share Tech Mono',monospace;font-size:8px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .15s;}
.store-install-btn.get{background:linear-gradient(135deg,#003399,#00b4ff);color:#fff;}
.store-install-btn.installed{background:rgba(57,255,20,.12);color:var(--green);border:1px solid rgba(57,255,20,.3);pointer-events:none;}
.store-install-btn.installing{background:rgba(0,180,255,.12);color:var(--neon);border:1px solid rgba(0,180,255,.3);pointer-events:none;}
/* Install animation overlay */
.store-anim-overlay{position:absolute;inset:0;z-index:10;background:rgba(1,6,16,.95);border-radius:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;}
.store-anim-canvas{width:80px;height:80px;}
.store-anim-label{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);letter-spacing:2px;animation:stBlink .7s infinite;}
/* App detail panel */
.store-detail{padding:16px;}
.store-detail-header{display:flex;gap:14px;align-items:flex-start;margin-bottom:14px;}
.store-detail-icon{font-size:48px;flex-shrink:0;}
.store-detail-info{flex:1;}
.store-detail-name{font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;color:var(--text);}
.store-detail-dev{font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:3px;}
.store-detail-desc{font-size:12px;color:var(--text-dim);line-height:1.7;margin-bottom:14px;}
.store-screenshots{display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:14px;}
.store-screenshot{width:140px;height:90px;flex-shrink:0;border-radius:8px;background:rgba(0,20,50,.6);border:1px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:28px;}
.store-back-btn{background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.25);border-radius:7px;color:var(--neon);font-family:'Share Tech Mono',monospace;font-size:9px;padding:5px 12px;cursor:pointer;margin-bottom:14px;transition:all .13s;}
.store-back-btn:hover{background:rgba(0,180,255,.18);}

/* ── SWIPE CC GESTURE INDICATOR ── */
#cc-swipe-zone{position:fixed;top:0;left:50%;transform:translateX(-50%);width:200px;height:var(--sb-h);z-index:299;cursor:pointer;}


/* ══ WHAT'S NEW POPUP v14 ══ */
#whats-new-overlay{position:fixed;inset:0;z-index:9500;background:rgba(0,4,12,.88);backdrop-filter:blur(18px);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .4s;}
#whats-new-overlay.show{opacity:1;pointer-events:all;}
.wn-dialog{background:linear-gradient(160deg,#030e22,#010812);border:1px solid rgba(0,180,255,.35);border-radius:20px;width:min(620px,95vw);max-height:90vh;display:flex;flex-direction:column;box-shadow:0 0 60px rgba(0,180,255,.18),0 24px 80px rgba(0,0,0,.8);animation:wn-in .45s cubic-bezier(.34,1.56,.64,1) both;}
@keyframes wn-in{from{opacity:0;transform:scale(.84) translateY(28px)}to{opacity:1;transform:scale(1)}}
.wn-header{padding:24px 26px 0;text-align:center;flex-shrink:0;}
.wn-badge{display:inline-flex;align-items:center;gap:7px;background:rgba(0,180,255,.12);border:1px solid rgba(0,180,255,.3);border-radius:20px;padding:4px 14px;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--neon);letter-spacing:2px;margin-bottom:10px;}
.wn-title{font-family:'Orbitron',sans-serif;font-size:24px;font-weight:900;color:#fff;letter-spacing:4px;margin-bottom:4px;}
.wn-sub{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(0,180,255,.5);letter-spacing:2px;}
.wn-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,180,255,.3),transparent);margin:16px 26px;}
.wn-body{overflow-y:auto;padding:0 26px 6px;flex:1;}
.wn-section{margin-bottom:14px;}
.wn-section-label{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;letter-spacing:3px;padding:3px 10px;border-radius:10px;display:inline-block;margin-bottom:8px;}
.wn-label-new{background:rgba(57,255,20,.12);color:#39ff14;border:1px solid rgba(57,255,20,.2);}
.wn-label-fix{background:rgba(255,215,0,.1);color:#ffd700;border:1px solid rgba(255,215,0,.2);}
.wn-label-removed{background:rgba(255,45,110,.1);color:#ff2d6e;border:1px solid rgba(255,45,110,.2);}
.wn-items{display:flex;flex-direction:column;gap:5px;}
.wn-item{display:flex;align-items:flex-start;gap:9px;padding:8px 10px;background:rgba(0,180,255,.04);border:1px solid rgba(0,180,255,.08);border-radius:8px;font-size:12px;color:var(--text-dim);line-height:1.5;}
.wn-item-icon{font-size:14px;flex-shrink:0;margin-top:1px;}
.wn-footer{padding:16px 26px 22px;display:flex;gap:10px;flex-shrink:0;}
.wn-btn-primary{flex:1;padding:12px;border-radius:12px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all .2s;}
.wn-btn-primary:hover{transform:scale(1.03);box-shadow:0 0 20px rgba(0,180,255,.4);}
.wn-btn-secondary{padding:12px 20px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--text-dim);font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;cursor:pointer;transition:all .2s;}
.wn-btn-secondary:hover{background:rgba(255,255,255,.1);}

/* ══ USER PROFILE SYSTEM ══ */
#user-login-screen{position:fixed;inset:0;z-index:9800;background:rgba(0,4,12,.98);backdrop-filter:blur(30px);display:none;flex-direction:column;align-items:center;justify-content:center;gap:0;}
#user-login-screen.show{display:flex;}
.ulogin-wrap{display:flex;flex-direction:column;align-items:center;gap:18px;animation:wn-in .5s cubic-bezier(.34,1.56,.64,1);}
.ulogin-avatar{width:90px;height:90px;border-radius:50%;border:3px solid rgba(0,180,255,.4);background:rgba(0,20,60,.8);display:flex;align-items:center;justify-content:center;font-size:42px;box-shadow:0 0 30px rgba(0,180,255,.2);position:relative;}
.ulogin-avatar-badge{position:absolute;bottom:0;right:0;width:24px;height:24px;border-radius:50%;background:var(--neon);border:2px solid #010812;display:flex;align-items:center;justify-content:center;font-size:10px;}
.ulogin-name{font-family:'Orbitron',sans-serif;font-size:22px;font-weight:900;color:#fff;letter-spacing:3px;text-align:center;}
.ulogin-sub{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(0,180,255,.4);letter-spacing:2px;}
.ulogin-pin-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}
.ulogin-pin-dots{display:flex;gap:10px;margin-bottom:4px;}
.ulogin-dot{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.12);border:1.5px solid rgba(0,180,255,.3);transition:all .2s;}
.ulogin-dot.filled{background:var(--neon);border-color:var(--neon);box-shadow:0 0 8px var(--neon);}
.ulogin-dot.error{background:var(--accent);border-color:var(--accent);animation:shake .3s ease;}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
.ulogin-numpad{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:240px;}
.ulogin-key{height:56px;border-radius:12px;background:rgba(0,20,60,.7);border:1px solid rgba(0,180,255,.2);color:#fff;font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:all .18s;display:flex;align-items:center;justify-content:center;}
.ulogin-key:hover{background:rgba(0,60,160,.5);border-color:rgba(0,180,255,.5);transform:scale(1.04);}
.ulogin-key:active{transform:scale(.93);}
.ulogin-key.del{background:rgba(255,45,110,.08);border-color:rgba(255,45,110,.2);color:var(--accent);}
.ulogin-key.del:hover{background:rgba(255,45,110,.18);}
.ulogin-error-msg{font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--accent);height:14px;text-align:center;letter-spacing:1px;transition:opacity .3s;}
.ulogin-guest-btn{background:none;border:none;color:rgba(0,180,255,.35);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer;margin-top:8px;letter-spacing:1px;transition:color .2s;}
.ulogin-guest-btn:hover{color:rgba(0,180,255,.7);}
#profile-setup-overlay{position:fixed;inset:0;z-index:9600;background:rgba(0,4,12,.9);backdrop-filter:blur(16px);display:none;align-items:center;justify-content:center;}
#profile-setup-overlay.show{display:flex;}
.psetup-dialog{background:linear-gradient(160deg,#030e22,#010812);border:1px solid rgba(0,180,255,.35);border-radius:20px;width:min(440px,95vw);max-height:92vh;overflow-y:auto;padding:28px;box-shadow:0 0 60px rgba(0,180,255,.15),0 24px 80px rgba(0,0,0,.8);animation:wn-in .4s cubic-bezier(.34,1.56,.64,1);}
.psetup-title{font-family:'Orbitron',sans-serif;font-size:16px;font-weight:900;color:var(--neon);letter-spacing:4px;text-align:center;margin-bottom:4px;}
.psetup-sub{font-family:'Share Tech Mono',monospace;font-size:9px;color:rgba(0,180,255,.4);letter-spacing:2px;text-align:center;margin-bottom:20px;}
.psetup-avatar-row{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
.psetup-av{width:44px;height:44px;border-radius:11px;background:rgba(0,20,60,.7);border:2px solid rgba(0,180,255,.15);display:flex;align-items:center;justify-content:center;font-size:22px;cursor:pointer;transition:all .18s;}
.psetup-av:hover,.psetup-av.sel{border-color:var(--neon);background:rgba(0,60,160,.4);box-shadow:0 0 12px rgba(0,180,255,.3);transform:scale(1.1);}
.psetup-field{margin-bottom:14px;}
.psetup-label{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);letter-spacing:2px;display:block;margin-bottom:5px;}
.psetup-input{width:100%;background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.22);border-radius:10px;padding:10px 14px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:14px;outline:none;transition:border-color .18s;}
.psetup-input:focus{border-color:var(--neon);}
.psetup-pin-info{font-family:'Share Tech Mono',monospace;font-size:9px;color:rgba(0,180,255,.3);margin-top:4px;line-height:1.6;}
.psetup-btn{width:100%;padding:12px;border-radius:12px;border:none;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all .2s;margin-top:6px;}
.psetup-btn-primary{background:linear-gradient(135deg,#003399,#00b4ff);color:#fff;box-shadow:0 0 20px rgba(0,180,255,.2);}
.psetup-btn-primary:hover{transform:scale(1.02);}
.psetup-btn-ghost{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:var(--text-dim);}
#sb-profile-btn{display:flex;align-items:center;gap:6px;cursor:pointer;padding:2px 8px;border-radius:12px;transition:background .15s;}
#sb-profile-btn:hover{background:rgba(0,180,255,.1);}
.sb-profile-avatar{font-size:14px;line-height:1;}
.sb-profile-name{font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-dim);max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* ══ BOOT STUDIO ══ */
.boot-studio-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:8px 0;}
.bs-card{background:rgba(0,10,30,.7);border:2px solid rgba(0,180,255,.15);border-radius:14px;padding:14px 10px;cursor:pointer;text-align:center;transition:all .2s;position:relative;overflow:hidden;}
.bs-card::before{content:'';position:absolute;inset:0;border-radius:inherit;opacity:0;transition:opacity .2s;}
.bs-card:hover{border-color:rgba(0,180,255,.5);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.4);}
.bs-card.active{border-color:var(--neon);box-shadow:0 0 18px rgba(0,180,255,.25),0 8px 24px rgba(0,0,0,.3);}
.bs-card.active::before{opacity:1;}
.bs-preview{height:60px;border-radius:8px;margin-bottom:8px;position:relative;overflow:hidden;background:#000;}
.bs-preview canvas{width:100%;height:100%;display:block;}
.bs-name{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--text);letter-spacing:2px;}
.bs-desc{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);margin-top:3px;letter-spacing:.5px;}
.bs-check{position:absolute;top:8px;right:8px;width:18px;height:18px;border-radius:50%;background:var(--neon);color:#000;font-size:9px;display:none;align-items:center;justify-content:center;font-weight:900;}
.bs-card.active .bs-check{display:flex;}
.bs-sliders{display:flex;flex-direction:column;gap:10px;margin:10px 0;}
.bs-slider-row{display:flex;flex-direction:column;gap:5px;}
.bs-slider-label{display:flex;justify-content:space-between;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-dim);letter-spacing:1px;}
.bs-color-row{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;}
.bs-color{width:28px;height:28px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .18s;flex-shrink:0;}
.bs-color:hover,.bs-color.active{border-color:#fff;transform:scale(1.15);box-shadow:0 0 10px rgba(255,255,255,.4);}
.bs-msg-input{width:100%;background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.2);border-radius:8px;padding:8px 12px;color:var(--text);font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;transition:border-color .18s;letter-spacing:1px;}
.bs-msg-input:focus{border-color:var(--neon);}
.bs-logo-input{width:100%;background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.2);border-radius:8px;padding:8px 12px;color:var(--text);font-family:'Orbitron',sans-serif;font-size:14px;font-weight:700;outline:none;transition:border-color .18s;letter-spacing:3px;}
.bs-logo-input:focus{border-color:var(--neon);}
.bs-test-btn{width:100%;padding:10px;border-radius:10px;background:linear-gradient(135deg,rgba(0,50,130,.6),rgba(0,130,200,.4));border:1px solid rgba(0,180,255,.4);color:var(--neon);font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;cursor:pointer;letter-spacing:2px;transition:all .2s;margin-top:4px;}
.bs-test-btn:hover{background:linear-gradient(135deg,rgba(0,70,170,.7),rgba(0,160,240,.5));box-shadow:0 0 18px rgba(0,180,255,.25);}

/* ══ WIDGET DESIGNER ══ */
.wd-root{display:flex;flex-direction:column;height:100%;overflow:hidden;}
.wd-toolbar{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--panel-border);flex-shrink:0;background:rgba(2,8,20,.5);}
.wd-toolbar-title{font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;color:var(--neon);letter-spacing:3px;}
.wd-body{display:flex;flex:1;overflow:hidden;}
.wd-sidebar{width:200px;flex-shrink:0;border-right:1px solid var(--panel-border);overflow-y:auto;padding:10px 0;}
.wd-type-item{display:flex;align-items:center;gap:10px;padding:9px 14px;cursor:pointer;transition:all .13s;font-size:12px;font-weight:600;color:var(--text-dim);}
.wd-type-item:hover{background:rgba(0,180,255,.07);color:var(--text);}
.wd-type-item.active{background:rgba(0,180,255,.13);color:var(--neon);border-right:2px solid var(--neon);}
.wd-type-icon{font-size:18px;width:28px;text-align:center;flex-shrink:0;}
.wd-canvas{flex:1;overflow-hidden;position:relative;background:radial-gradient(ellipse at 50% 50%,rgba(0,40,100,.18) 0%,transparent 70%),var(--bg);}
.wd-canvas-hint{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;pointer-events:none;}
.wd-canvas-hint-icon{font-size:48px;opacity:.12;}
.wd-canvas-hint-text{font-family:'Orbitron',sans-serif;font-size:12px;color:rgba(0,180,255,.2);letter-spacing:3px;margin-top:8px;}
.wd-options{width:240px;flex-shrink:0;border-left:1px solid var(--panel-border);overflow-y:auto;padding:12px 14px;}
.wd-opt-section{margin-bottom:14px;}
.wd-opt-title{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--text-muted);letter-spacing:3px;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid var(--panel-border);}
.wd-opt-row{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-dim);margin-bottom:8px;gap:8px;}
.wd-opt-label{flex-shrink:0;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:.5px;}
.wd-opt-input{flex:1;background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.2);border-radius:7px;padding:5px 9px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:12px;outline:none;min-width:0;transition:border-color .15s;}
.wd-opt-input:focus{border-color:var(--neon);}
.wd-opt-select{flex:1;background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.2);border-radius:7px;padding:5px 9px;color:var(--text);font-family:'Rajdhani',sans-serif;font-size:12px;outline:none;cursor:pointer;}
.wd-opt-select option{background:#03111e;}
.wd-color-swatch{width:26px;height:26px;border-radius:7px;cursor:pointer;border:2px solid transparent;transition:all .15s;flex-shrink:0;}
.wd-color-swatch:hover,.wd-color-swatch.sel{border-color:#fff;transform:scale(1.12);}
.wd-color-grid{display:flex;gap:5px;flex-wrap:wrap;margin-top:4px;}
.wd-place-btn{width:100%;padding:10px;border-radius:10px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;cursor:pointer;letter-spacing:2px;transition:all .2s;margin-top:8px;}
.wd-place-btn:hover{transform:scale(1.02);box-shadow:0 0 18px rgba(0,180,255,.35);}
/* Live preview inside Widget Designer */
.wd-live-preview{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:220px;background:rgba(3,10,28,.85);border:1px solid rgba(0,180,255,.3);border-radius:16px;padding:14px;box-shadow:0 8px 32px rgba(0,0,0,.5);transition:all .3s;}

/* Desktop widget overrides */
.dw-widget{position:absolute;background:rgba(3,10,28,.82);border:1px solid rgba(0,180,255,.22);border-radius:16px;backdrop-filter:blur(18px);box-shadow:0 8px 32px rgba(0,0,0,.5);min-width:160px;min-height:80px;overflow:hidden;transition:border-color .15s,box-shadow .15s;user-select:none;display:flex;flex-direction:column;}
.dw-widget:hover{border-color:rgba(0,180,255,.42);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 20px rgba(0,180,255,.07);}
.dw-widget.dragging{opacity:.88;border-color:rgba(0,180,255,.6);box-shadow:0 16px 48px rgba(0,0,0,.7),0 0 30px rgba(0,180,255,.2);cursor:grabbing;transition:none;}
.dw-widget-bar{height:28px;flex-shrink:0;display:flex;align-items:center;padding:0 10px;gap:6px;cursor:grab;background:rgba(0,5,20,.4);border-bottom:1px solid rgba(0,180,255,.1);}
.dw-widget-title{font-family:'Share Tech Mono',monospace;font-size:8px;font-weight:700;color:rgba(0,180,255,.55);letter-spacing:2px;flex:1;text-transform:uppercase;}
.dw-widget-close{background:none;border:none;color:rgba(255,255,255,.2);cursor:pointer;font-size:11px;line-height:1;padding:0 2px;transition:color .15s;}
.dw-widget-close:hover{color:var(--accent);}
.dw-widget-body{flex:1;padding:10px 12px;overflow:auto;}
.dw-widget-resize{position:absolute;bottom:3px;right:3px;width:12px;height:12px;cursor:se-resize;}
.dw-widget-resize::before,.dw-widget-resize::after{content:'';position:absolute;background:rgba(0,180,255,.3);border-radius:1px;}
.dw-widget-resize::before{width:8px;height:2px;bottom:3px;right:0;}
.dw-widget-resize::after{width:2px;height:8px;bottom:0;right:3px;}
/* Desktop widget layer */
#dw-layer{position:fixed;left:0;right:0;top:var(--sb-h);bottom:var(--tb-h);z-index:15;pointer-events:none;}
#dw-layer .dw-widget{pointer-events:all;}

/* ══ APP FOLDERS ══ */
.desk-folder{position:absolute;width:var(--icon-w);height:var(--icon-h);display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 4px 4px;cursor:pointer;border-radius:16px;user-select:none;z-index:12;transition:transform .15s cubic-bezier(.34,1.56,.64,1);}
.desk-folder:active{transform:scale(.92);}
.folder-img{width:52px;height:52px;border-radius:14px;background:rgba(0,50,120,.7);border:1.5px solid rgba(0,180,255,.45);display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;padding:5px;gap:3px;position:relative;overflow:hidden;transition:all .2s;box-shadow:0 4px 12px rgba(0,0,0,.4);}
.folder-img::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.12),transparent 60%);border-radius:inherit;}
.desk-folder:hover .folder-img{transform:scale(1.06) translateY(-3px);border-color:rgba(0,180,255,.7);box-shadow:var(--glow-sm),0 6px 20px rgba(0,0,0,.5);}
.folder-mini-icon{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:11px;background:rgba(0,20,60,.6);border-radius:4px;}
.folder-lbl{font-size:10px;font-weight:600;color:var(--text);text-align:center;max-width:74px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-shadow:0 1px 4px rgba(0,0,0,.9);}
.folder-name-input{font-size:10px;font-weight:600;color:var(--text);text-align:center;background:rgba(0,10,30,.9);border:1px solid var(--neon);border-radius:4px;padding:1px 4px;width:72px;outline:none;font-family:Rajdhani,sans-serif;}
.desk-icon.folder-drop-target .icon-img,.desk-folder.folder-drop-target .folder-img{outline:3px solid var(--neon);box-shadow:0 0 18px rgba(0,180,255,.6);transform:scale(1.1) translateY(-4px);}
/* Folder modal */
#folder-modal{position:fixed;inset:0;z-index:600;display:flex;align-items:center;justify-content:center;background:rgba(0,4,14,.75);backdrop-filter:blur(14px);opacity:0;pointer-events:none;transition:opacity .28s;}
#folder-modal.open{opacity:1;pointer-events:all;}
.folder-modal-box{background:linear-gradient(160deg,#050e28,#020c1c);border:1px solid rgba(0,180,255,.4);border-radius:22px;width:min(480px,94vw);max-height:80vh;display:flex;flex-direction:column;box-shadow:0 0 60px rgba(0,180,255,.18),0 24px 80px rgba(0,0,0,.9);animation:wn-in .35s cubic-bezier(.34,1.56,.64,1) both;}
.folder-modal-top{display:flex;align-items:center;gap:10px;padding:16px 20px 12px;border-bottom:1px solid rgba(0,180,255,.15);}
.folder-modal-icon{font-size:28px;}
.folder-modal-name{font-family:Orbitron,sans-serif;font-size:14px;font-weight:900;color:var(--text);letter-spacing:2px;flex:1;}
.folder-modal-rename{background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:14px;padding:4px 8px;border-radius:6px;transition:all .15s;}
.folder-modal-rename:hover{color:var(--neon);background:rgba(0,180,255,.1);}
.folder-modal-close{width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:var(--text-dim);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .18s;}
.folder-modal-close:hover{background:rgba(239,68,68,.2);border-color:var(--accent);color:var(--accent);}
.folder-modal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:8px;padding:16px;overflow-y:auto;flex:1;}
.folder-app-item{display:flex;flex-direction:column;align-items:center;gap:5px;padding:8px 4px;border-radius:12px;cursor:pointer;transition:background .13s;}
.folder-app-item:hover{background:rgba(0,180,255,.1);}
.folder-app-img{width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;border:1.5px solid var(--panel-border);}
.folder-app-lbl{font-size:9px;color:var(--text);font-weight:600;text-align:center;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.folder-empty-hint{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;gap:8px;color:var(--text-muted);}
.folder-empty-hint span{font-size:32px;opacity:.3;}
.folder-empty-hint p{font-family:Share Tech Mono,monospace;font-size:9px;letter-spacing:2px;}

/* ══ PROFILE PICTURE UPLOAD ══ */
.profile-pic-wrap{display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:14px;}
.profile-pic-preview{width:80px;height:80px;border-radius:50%;border:3px solid rgba(0,180,255,.4);background:rgba(0,20,60,.8);display:flex;align-items:center;justify-content:center;font-size:38px;overflow:hidden;cursor:pointer;transition:all .2s;position:relative;}
.profile-pic-preview:hover{border-color:var(--neon);box-shadow:0 0 18px rgba(0,180,255,.3);}
.profile-pic-preview img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
.profile-pic-hint{font-family:Share Tech Mono,monospace;font-size:8px;color:rgba(0,180,255,.4);letter-spacing:1px;text-align:center;}
.profile-pic-btns{display:flex;gap:6px;}
.profile-pic-btn{padding:4px 12px;border-radius:16px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.25);color:var(--neon);font-family:Share Tech Mono,monospace;font-size:9px;cursor:pointer;transition:all .15s;letter-spacing:1px;}
.profile-pic-btn:hover{background:rgba(0,180,255,.2);}

/* ══ THEMES: BEN 10 + STRANGER THINGS ══ */
/* Ben 10 theme vars applied via JS on html element */
html[data-theme-id="ben10"]{
  --neon:#00e050;--neon2:#007730;--neon3:#55ff88;--accent:#00cc44;
  --bg:#020d06;--bg2:#041208;--panel:rgba(4,18,8,.9);--panel-solid:#031008;
  --panel-border:rgba(0,200,80,.22);--win-bar:rgba(3,14,6,.98);--taskbar:rgba(2,8,4,.97);
  --text:#c8ffda;--text-dim:rgba(120,220,150,.55);--text-muted:rgba(60,180,90,.35);
  --glow-lg:0 0 25px rgba(0,220,60,.55),0 0 70px rgba(0,80,20,.2);
  --glow-sm:0 0 10px rgba(0,200,60,.4);--glow-xs:0 0 6px rgba(0,200,60,.3);
}
html[data-theme-id="ben10"] #bg-layer{background:#020d06;}
html[data-theme-id="ben10"] .boot-logo{color:#00e050;text-shadow:0 0 40px #00e050;}

/* Omnitrix dial */
#omnitrix-hud{position:fixed;bottom:calc(var(--tb-h) + 12px);right:16px;z-index:240;display:none;cursor:pointer;user-select:none;}
html[data-theme-id="ben10"] #omnitrix-hud{display:block;}
.omnitrix-ring{width:56px;height:56px;border-radius:50%;background:radial-gradient(circle,#1a1a1a 38%,#2a2a2a 38%,#2a2a2a 48%,#00e050 48%,#00e050 55%,#111 55%);border:3px solid #00e050;box-shadow:0 0 20px #00e050,0 0 40px rgba(0,200,60,.4);display:flex;align-items:center;justify-content:center;position:relative;animation:omnitrixPulse 2s ease-in-out infinite;}
@keyframes omnitrixPulse{0%,100%{box-shadow:0 0 20px #00e050,0 0 40px rgba(0,200,60,.4)}50%{box-shadow:0 0 30px #00e050,0 0 60px rgba(0,200,60,.6)}}
.omnitrix-core{width:18px;height:18px;border-radius:50%;background:#00e050;box-shadow:0 0 12px #00e050;transition:all .3s;}
.omnitrix-ring.active .omnitrix-core{background:#ffffff;box-shadow:0 0 20px #fff,0 0 40px #00e050;}
#omnitrix-flash{position:fixed;inset:0;z-index:9100;background:rgba(0,220,80,.0);pointer-events:none;transition:none;}
#omnitrix-flash.flash{animation:omniFlash .6s ease forwards;}
@keyframes omniFlash{0%{background:rgba(0,220,80,.0)}20%{background:rgba(0,220,80,.7)}100%{background:rgba(0,220,80,.0)}}
.alien-badge{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);z-index:9110;background:rgba(0,20,8,.95);border:2px solid #00e050;border-radius:16px;padding:12px 24px;font-family:Orbitron,sans-serif;font-size:18px;font-weight:900;color:#00e050;letter-spacing:4px;pointer-events:none;text-shadow:0 0 20px #00e050;box-shadow:0 0 40px rgba(0,220,80,.4);}
.alien-badge.show{animation:alienIn .5s cubic-bezier(.34,1.56,.64,1) forwards,alienOut .3s ease 1.8s forwards;}
@keyframes alienIn{to{transform:translate(-50%,-50%) scale(1)}}
@keyframes alienOut{to{transform:translate(-50%,-50%) scale(0);opacity:0}}

/* Stranger Things theme */
html[data-theme-id="stranger"]{
  --neon:#ff2020;--neon2:#aa0000;--neon3:#ff6060;--accent:#ff4444;
  --bg:#030002;--bg2:#080002;--panel:rgba(18,2,2,.9);--panel-solid:#0d0101;
  --panel-border:rgba(200,20,20,.22);--win-bar:rgba(14,2,2,.98);--taskbar:rgba(8,1,1,.97);
  --text:#ffd0d0;--text-dim:rgba(220,100,100,.55);--text-muted:rgba(180,60,60,.35);
  --glow-lg:0 0 25px rgba(220,20,20,.55),0 0 70px rgba(80,0,0,.2);
  --glow-sm:0 0 10px rgba(200,20,20,.4);--glow-xs:0 0 6px rgba(200,20,20,.3);
  --radius:4px;
}
html[data-theme-id="stranger"] #bg-layer{background:#030002;}
/* Upside-down vine overlay */
#stranger-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;display:none;}
html[data-theme-id="stranger"] #stranger-overlay{display:block;}
.st-vine{position:absolute;background:rgba(180,10,10,.18);border-radius:2px;transform-origin:top left;}
/* String lights (blinking colored dots across the top) */
#string-lights{position:fixed;top:var(--sb-h);left:0;right:0;z-index:4;pointer-events:none;display:none;height:20px;overflow:hidden;}
html[data-theme-id="stranger"] #string-lights{display:block;}
.light-bulb{position:absolute;top:4px;width:9px;height:9px;border-radius:50%;animation:lightBlink 3s infinite;}
@keyframes lightBlink{0%,100%{opacity:1}50%{opacity:.15}70%{opacity:.9}}
/* Scanlines heavy for ST */
html[data-theme-id="stranger"] #scanlines{opacity:.6;}
/* Upside-down text filter */
html[data-theme-id="stranger"] .os-window.upsidedown-anim{animation:stFlip .4s ease;}
@keyframes stFlip{0%{transform:rotateX(10deg) scale(.97)}100%{transform:rotateX(0) scale(1)}}
/* Particle dust for ST */
html[data-theme-id="stranger"] #particle-canvas{opacity:.35;}

/* ══ MIRACULOUS LADYBUG THEME ══ */
html[data-theme-id="miraculous"]{
  --neon:#ff0055;--neon2:#cc0044;--neon3:#ff66aa;--accent:#ff0055;
  --bg:#0a000a;--bg2:#140014;--panel:rgba(20,0,20,.9);--panel-solid:#0d000d;
  --panel-border:rgba(255,0,85,.22);--win-bar:rgba(14,0,14,.98);--taskbar:rgba(8,0,8,.97);
  --text:#ffd0e8;--text-dim:rgba(255,100,160,.55);--text-muted:rgba(200,50,120,.35);
  --glow-lg:0 0 25px rgba(255,0,85,.55),0 0 70px rgba(100,0,50,.2);
  --glow-sm:0 0 10px rgba(255,0,85,.4);--glow-xs:0 0 6px rgba(255,0,85,.3);
  --radius:16px;
}
html[data-theme-id="miraculous"] #bg-layer{background:#0a000a;}
#miraculous-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;display:none;}
html[data-theme-id="miraculous"] #miraculous-overlay{display:block;}
#kwami-hud{position:fixed;bottom:calc(var(--tb-h) + 12px);right:16px;z-index:240;display:none;cursor:pointer;user-select:none;}
html[data-theme-id="miraculous"] #kwami-hud{display:block;}
.kwami-ring{width:56px;height:56px;border-radius:50%;background:radial-gradient(circle,#ff0055 30%,#cc0044 70%);border:3px solid #ff0055;box-shadow:0 0 20px #ff0055,0 0 40px rgba(255,0,85,.4);display:flex;align-items:center;justify-content:center;font-size:24px;animation:kwamiBounce 2s ease-in-out infinite;}
@keyframes kwamiBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.kwami-ring.active{animation:kwamiBounce .3s ease;}
#miraculous-flash{position:fixed;inset:0;z-index:9100;background:rgba(255,0,85,.0);pointer-events:none;transition:none;}
#miraculous-flash.flash{animation:mirFlash .7s ease forwards;}
@keyframes mirFlash{0%{background:rgba(255,0,85,0)}20%{background:rgba(255,0,85,.6)}100%{background:rgba(255,0,85,0)}}
.miraculous-badge{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);z-index:9110;background:rgba(20,0,10,.95);border:2px solid #ff0055;border-radius:16px;padding:12px 24px;font-family:Orbitron,sans-serif;font-size:16px;font-weight:900;color:#ff0055;letter-spacing:3px;pointer-events:none;text-shadow:0 0 20px #ff0055;box-shadow:0 0 40px rgba(255,0,85,.4);}
.miraculous-badge.show{animation:mirBadgeIn .5s cubic-bezier(.34,1.56,.64,1) forwards,mirBadgeOut .3s ease 2s forwards;}
@keyframes mirBadgeIn{to{transform:translate(-50%,-50%) scale(1)}}
@keyframes mirBadgeOut{to{transform:translate(-50%,-50%) scale(0);opacity:0}}
/* ══ JUJUTSU KAISEN THEME ══ */
html[data-theme-id="jjk"]{
  --neon:#6600ff;--neon2:#4400bb;--neon3:#aa44ff;--accent:#cc00ff;
  --bg:#050005;--bg2:#080010;--panel:rgba(8,0,18,.92);--panel-solid:#060010;
  --panel-border:rgba(100,0,255,.22);--win-bar:rgba(6,0,16,.98);--taskbar:rgba(4,0,10,.97);
  --text:#e8d0ff;--text-dim:rgba(160,100,255,.55);--text-muted:rgba(100,50,200,.35);
  --glow-lg:0 0 25px rgba(100,0,255,.55),0 0 70px rgba(60,0,150,.25);
  --glow-sm:0 0 12px rgba(100,0,255,.5);--glow-xs:0 0 8px rgba(100,0,255,.35);
  --radius:6px;
}
html[data-theme-id="jjk"] #bg-layer{background:#050005;}
#jjk-overlay{position:fixed;inset:0;z-index:2;pointer-events:none;display:none;}
html[data-theme-id="jjk"] #jjk-overlay{display:block;}
#domain-hud{position:fixed;bottom:calc(var(--tb-h)+12px);right:80px;z-index:240;display:none;cursor:pointer;user-select:none;}
html[data-theme-id="jjk"] #domain-hud{display:block;}
.domain-ring{width:56px;height:56px;border-radius:8px;background:radial-gradient(circle,#3300aa 30%,#110022 80%);border:2px solid #6600ff;box-shadow:0 0 16px #6600ff,0 0 40px rgba(100,0,255,.35);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;font-family:Orbitron,monospace;color:#aa44ff;letter-spacing:1px;animation:domainPulse 3s ease-in-out infinite;}
@keyframes domainPulse{0%,100%{box-shadow:0 0 16px #6600ff}50%{box-shadow:0 0 30px #6600ff,0 0 60px rgba(100,0,255,.4)}}
#domain-flash{position:fixed;inset:0;z-index:9100;pointer-events:none;}
.domain-expansion-screen{position:fixed;inset:0;z-index:9105;pointer-events:none;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(0,0,0,.92);backdrop-filter:blur(4px);}
.domain-expansion-screen.show{display:flex;animation:domainScreenIn .6s ease;}
@keyframes domainScreenIn{0%{opacity:0;transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
.domain-name-text{font-family:Orbitron,sans-serif;font-size:clamp(16px,3vw,28px);font-weight:900;color:#aa44ff;letter-spacing:4px;text-align:center;text-shadow:0 0 30px #6600ff;margin-bottom:8px;}
.domain-sub-text{font-family:Share Tech Mono,monospace;font-size:11px;color:rgba(150,80,255,.6);letter-spacing:3px;text-align:center;}
.domain-circle{width:200px;height:200px;border-radius:50%;border:2px solid rgba(100,0,255,.4);position:absolute;animation:domainCircleIn .8s ease forwards;}
@keyframes domainCircleIn{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}

/* ══ EXPANDED BUILT-IN THEMES ══ */
html[data-theme-id="cyber_sunset"]{
  --neon:#ff7a18;--neon2:#ff3c81;--neon3:#ffd166;--accent:#ff4d6d;
  --bg:#140312;--bg2:#22061d;--panel:rgba(38,8,32,.9);--panel-solid:#190514;
  --panel-border:rgba(255,122,24,.28);--win-bar:rgba(28,6,22,.98);--taskbar:rgba(18,4,14,.97);
  --text:#ffe3d2;--text-dim:rgba(255,186,145,.62);--text-muted:rgba(255,121,97,.36);
  --glow-lg:0 0 28px rgba(255,122,24,.45),0 0 72px rgba(255,60,129,.18);
  --glow-sm:0 0 12px rgba(255,122,24,.35);--glow-xs:0 0 8px rgba(255,122,24,.28);
}
html[data-theme-id="cyber_sunset"] #bg-layer{background:radial-gradient(circle at top,rgba(255,122,24,.25),transparent 35%),linear-gradient(180deg,#2a0830 0%,#140312 58%,#080109 100%);}
html[data-theme-id="cyber_sunset"] #taskbar,html[data-theme-id="cyber_sunset"] #statusbar{backdrop-filter:blur(24px) saturate(140%);}

html[data-theme-id="arctic_frost"]{
  --neon:#7ae7ff;--neon2:#4bb8ff;--neon3:#d5f7ff;--accent:#9de7ff;
  --bg:#021019;--bg2:#041b27;--panel:rgba(8,28,40,.9);--panel-solid:#061924;
  --panel-border:rgba(122,231,255,.24);--win-bar:rgba(7,24,34,.98);--taskbar:rgba(4,16,24,.97);
  --text:#e6fbff;--text-dim:rgba(164,229,245,.62);--text-muted:rgba(120,190,210,.36);
  --glow-lg:0 0 24px rgba(122,231,255,.38),0 0 68px rgba(59,130,246,.16);
  --glow-sm:0 0 10px rgba(122,231,255,.34);--glow-xs:0 0 6px rgba(122,231,255,.26);
}
html[data-theme-id="arctic_frost"] #bg-layer{background:radial-gradient(circle at 15% 20%,rgba(122,231,255,.18),transparent 28%),radial-gradient(circle at 80% 18%,rgba(213,247,255,.12),transparent 22%),linear-gradient(180deg,#05202f 0%,#021019 100%);}
html[data-theme-id="arctic_frost"] .os-window{backdrop-filter:blur(26px) saturate(150%);}

html[data-theme-id="volcanic_core"]{
  --neon:#ff5a36;--neon2:#c81d25;--neon3:#ffb703;--accent:#ff6b35;
  --bg:#170504;--bg2:#290805;--panel:rgba(34,8,6,.92);--panel-solid:#1a0403;
  --panel-border:rgba(255,90,54,.24);--win-bar:rgba(24,6,4,.98);--taskbar:rgba(18,4,3,.97);
  --text:#ffe7d9;--text-dim:rgba(255,176,132,.58);--text-muted:rgba(210,110,76,.34);
  --glow-lg:0 0 26px rgba(255,90,54,.42),0 0 72px rgba(255,183,3,.14);
  --glow-sm:0 0 11px rgba(255,90,54,.34);--glow-xs:0 0 7px rgba(255,90,54,.26);
}
html[data-theme-id="volcanic_core"] #bg-layer{background:radial-gradient(circle at 50% 120%,rgba(255,183,3,.22),transparent 30%),radial-gradient(circle at 20% 10%,rgba(255,90,54,.16),transparent 30%),linear-gradient(180deg,#2a0805 0%,#170504 100%);}
html[data-theme-id="volcanic_core"] #scanlines{opacity:.22;}

html[data-theme-id="synthwave_grid"]{
  --neon:#ff4df3;--neon2:#7c3aed;--neon3:#55ddff;--accent:#ff4df3;
  --bg:#0b0820;--bg2:#140b33;--panel:rgba(18,12,42,.9);--panel-solid:#0f0a25;
  --panel-border:rgba(255,77,243,.24);--win-bar:rgba(15,10,33,.98);--taskbar:rgba(10,8,24,.97);
  --text:#f5ddff;--text-dim:rgba(216,151,255,.6);--text-muted:rgba(125,140,230,.34);
  --glow-lg:0 0 28px rgba(255,77,243,.4),0 0 80px rgba(85,221,255,.16);
  --glow-sm:0 0 12px rgba(255,77,243,.34);--glow-xs:0 0 8px rgba(85,221,255,.28);
}
html[data-theme-id="synthwave_grid"] #bg-layer{background:linear-gradient(180deg,#1b1140 0%,#0b0820 60%),repeating-linear-gradient(90deg,rgba(85,221,255,.08) 0 1px,transparent 1px 40px),repeating-linear-gradient(0deg,rgba(255,77,243,.08) 0 1px,transparent 1px 40px);background-blend-mode:screen,normal,normal;}
html[data-theme-id="synthwave_grid"] .home-watermark{color:rgba(255,77,243,.06);}

html[data-theme-id="starlight_gold"]{
  --neon:#ffd166;--neon2:#f4a261;--neon3:#fff3b0;--accent:#ffd166;
  --bg:#06111f;--bg2:#0d1b2a;--panel:rgba(10,22,38,.9);--panel-solid:#081524;
  --panel-border:rgba(255,209,102,.26);--win-bar:rgba(8,20,35,.98);--taskbar:rgba(6,16,30,.97);
  --text:#fff4d8;--text-dim:rgba(255,221,149,.62);--text-muted:rgba(196,170,112,.34);
  --glow-lg:0 0 24px rgba(255,209,102,.36),0 0 72px rgba(59,130,246,.1);
  --glow-sm:0 0 10px rgba(255,209,102,.32);--glow-xs:0 0 6px rgba(255,209,102,.24);
}
html[data-theme-id="starlight_gold"] #bg-layer{background:radial-gradient(circle at 20% 18%,rgba(255,209,102,.18),transparent 18%),radial-gradient(circle at 75% 22%,rgba(255,243,176,.12),transparent 14%),linear-gradient(180deg,#10233f 0%,#06111f 100%);}
html[data-theme-id="starlight_gold"] .sb-dot{background:var(--gold);box-shadow:0 0 10px rgba(255,209,102,.6);}
/* ═══════════════════════════════════════════════════════════
   TOBOS UPDATE 17 — CUSTOM CURSOR · THEME VAULT · TAMAGOTCHIS
   PASTE THIS ENTIRE BLOCK JUST BEFORE </style>
═══════════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR SYSTEM ── */
html.cursor-custom,html.cursor-custom *{cursor:none!important;}
#tob-cursor-cv{position:fixed;inset:0;width:100vw;height:100vh;z-index:99999;pointer-events:none;}

/* ── THEME VAULT APP ── */
.tv-root{display:flex;flex-direction:column;height:100%;overflow:hidden;background:var(--bg);}
.tv-topbar{padding:12px 16px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:12px;flex-shrink:0;background:rgba(2,8,20,.5);}
.tv-logo{font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:#ffd700;letter-spacing:3px;}
.tv-body{flex:1;overflow-y:auto;padding:16px;}
.tv-sec{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;color:var(--text-muted);letter-spacing:3px;margin-bottom:10px;margin-top:14px;padding-bottom:5px;border-bottom:1px solid var(--panel-border);}
.tv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:11px;margin-bottom:4px;}
.tv-card{border-radius:14px;overflow:hidden;cursor:pointer;transition:all .22s;border:2px solid var(--panel-border);position:relative;}
.tv-card:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.28);box-shadow:0 8px 28px rgba(0,0,0,.5);}
.tv-card.tv-on{border-color:var(--neon)!important;box-shadow:0 0 20px rgba(0,180,255,.25);}
.tv-prev{height:84px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.tv-prev-label{font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;letter-spacing:2px;margin-top:5px;text-align:center;}
.tv-card-body{padding:8px 12px 10px;background:rgba(2,8,22,.88);}
.tv-card-name{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--text);}
.tv-card-sub{font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:2px;}
.tv-card-acts{display:flex;gap:5px;margin-top:7px;}
.tv-btn{flex:1;padding:5px;border-radius:7px;border:none;font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .15s;}
.tv-btn-p{background:linear-gradient(135deg,#003399,#00b4ff);color:#fff;}
.tv-btn-p:hover{opacity:.9;transform:scale(1.03);}
.tv-btn-g{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:var(--text-dim);pointer-events:none;opacity:.6;}
.tv-rand{padding:9px 22px;border-radius:16px;background:linear-gradient(135deg,#440088,#9900ff);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;cursor:pointer;letter-spacing:2px;transition:all .2s;margin-left:auto;}
.tv-rand:hover{transform:scale(1.04);box-shadow:0 0 18px rgba(150,0,255,.45);}
.tv-cursor-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:7px;margin-bottom:8px;}
.tv-cur-card{padding:10px 6px;border-radius:10px;background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.14);cursor:pointer;text-align:center;transition:all .15s;}
.tv-cur-card:hover{border-color:rgba(0,180,255,.4);}
.tv-cur-card.tv-cur-on{border-color:var(--neon);background:rgba(0,30,80,.6);box-shadow:0 0 10px rgba(0,180,255,.18);}
.tv-cur-icon{font-size:22px;margin-bottom:4px;}
.tv-cur-name{font-family:'Share Tech Mono',monospace;font-size:7px;color:var(--text-dim);letter-spacing:.5px;}
.tv-tama-row{display:flex;gap:8px;flex-wrap:wrap;padding-bottom:16px;}
.tv-tama-btn{padding:8px 14px;border-radius:10px;background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.18);color:var(--text);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px;}
.tv-tama-btn:hover{background:rgba(0,40,100,.6);border-color:rgba(0,180,255,.45);}
.tv-cursor-toggle-row{display:flex;align-items:center;gap:12px;padding:8px 0 12px;}

/* ── TAMAGOTCHI DESKTOP WIDGETS ── */
.tama-widget{position:fixed;z-index:222;width:190px;background:rgba(2,8,24,.97);border-radius:18px;border:2px solid rgba(0,180,255,.22);box-shadow:0 12px 42px rgba(0,0,0,.7),0 0 24px rgba(0,0,0,.3);overflow:hidden;user-select:none;font-family:'Rajdhani',sans-serif;transition:border-color .2s,box-shadow .2s;}
.tama-widget:hover{box-shadow:0 16px 52px rgba(0,0,0,.8);}
.tama-bar{height:29px;display:flex;align-items:center;padding:0 10px;gap:5px;background:rgba(0,5,20,.6);border-bottom:1px solid rgba(0,180,255,.1);cursor:grab;flex-shrink:0;}
.tama-bar:active{cursor:grabbing;}
.tama-ttl{font-family:'Orbitron',sans-serif;font-size:7px;font-weight:700;letter-spacing:2px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tama-x{background:none;border:none;color:rgba(255,255,255,.25);cursor:pointer;font-size:12px;padding:0 2px;transition:color .12s;line-height:1;}
.tama-x:hover{color:#ff5f57;}
.tama-screen{height:128px;margin:8px 8px 4px;border-radius:11px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.tama-bg-layer{position:absolute;inset:0;}
.tama-char{font-size:52px;position:relative;z-index:2;cursor:pointer;transition:transform .1s;filter:drop-shadow(0 0 12px var(--tg,rgba(0,180,255,.4)));animation:taIdle 3.5s ease-in-out infinite;}
.tama-char:active{transform:scale(.85)!important;}
@keyframes taIdle{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-5px) scale(1.04)}}
.tama-char.s-happy{animation:taHappy .25s ease infinite;}
@keyframes taHappy{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.14) rotate(6deg)}}
.tama-char.s-eat{animation:taEat .18s ease infinite;}
@keyframes taEat{0%,100%{transform:scale(1.1) translateY(0)}50%{transform:scale(.9) translateY(2px)}}
.tama-char.s-sleep{animation:taSleep 2.5s ease infinite;opacity:.6;}
@keyframes taSleep{0%,100%{transform:scale(1)}50%{transform:scale(.94)}}
.tama-char.s-sick{animation:taSick .55s ease infinite;}
@keyframes taSick{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
.tama-char.s-power{animation:taPow .12s ease infinite;}
@keyframes taPow{0%,100%{transform:scale(1.2)}50%{transform:scale(.85) rotate(-8deg)}}
.tama-stats{padding:0 10px 4px;flex-shrink:0;}
.tama-sr{display:flex;align-items:center;gap:5px;margin-bottom:4px;}
.tama-si{font-size:10px;width:13px;flex-shrink:0;text-align:center;}
.tama-sbar{flex:1;height:4px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden;}
.tama-sfill{height:100%;border-radius:2px;transition:width .5s;}
.tama-sv{font-size:8px;font-family:'Share Tech Mono',monospace;color:var(--text-muted);min-width:20px;text-align:right;}
.tama-msg{font-size:8px;font-family:'Share Tech Mono',monospace;color:var(--text-dim);padding:0 10px 4px;text-align:center;line-height:1.55;min-height:22px;flex-shrink:0;}
.tama-acts{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;padding:0 8px 5px;flex-shrink:0;}
.tama-abtn{padding:5px 2px;border-radius:6px;border:1px solid rgba(0,180,255,.14);background:rgba(0,15,45,.8);font-size:14px;cursor:pointer;transition:all .1s;display:flex;align-items:center;justify-content:center;}
.tama-abtn:hover{background:rgba(0,50,130,.5);border-color:rgba(0,180,255,.44);transform:scale(1.08);}
.tama-abtn:active{transform:scale(.87);}
.tama-spec{margin:0 8px 6px;padding:6px;border-radius:8px;border:none;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:7px;font-weight:700;letter-spacing:1px;width:calc(100% - 16px);transition:all .2s;flex-shrink:0;}
.tama-foot{display:flex;justify-content:space-between;padding:0 10px 8px;font-family:'Share Tech Mono',monospace;font-size:7.5px;color:var(--text-muted);flex-shrink:0;}
.tama-notif{position:absolute;top:-1px;right:-1px;min-width:18px;height:18px;border-radius:9px;background:var(--accent);border:2px solid rgba(2,8,24,.9);font-size:9px;display:none;align-items:center;justify-content:center;color:#fff;font-weight:700;animation:taNPop .35s cubic-bezier(.34,1.56,.64,1);}
.tama-notif.show{display:flex;}
@keyframes taNPop{from{transform:scale(0)}to{transform:scale(1)}}
.tama-spawn-btn{position:fixed;bottom:calc(var(--tb-h)+12px);right:80px;z-index:240;width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#001840,#003090);border:2px solid rgba(0,100,255,.5);box-shadow:0 4px 16px rgba(0,80,200,.35);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:all .18s;}
.tama-spawn-btn:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(0,100,255,.5);}

/* Blue Lock theme override */
html[data-theme-id="blue_lock"]{
  --neon:#0055ff;--neon2:#0033cc;--neon3:#4488ff;--accent:#0055ff;
  --bg:#000510;--bg2:#000820;--panel:rgba(0,10,30,.92);--panel-solid:#000618;
  --panel-border:rgba(0,80,255,.22);--win-bar:rgba(0,4,18,.98);--taskbar:rgba(0,3,12,.97);
  --text:#c8d8ff;--text-dim:rgba(100,150,255,.55);--text-muted:rgba(50,100,200,.35);
  --glow-lg:0 0 25px rgba(0,80,255,.55),0 0 70px rgba(0,30,120,.2);
  --glow-sm:0 0 10px rgba(0,80,255,.4);--glow-xs:0 0 6px rgba(0,80,255,.3);
}
html[data-theme-id="blue_lock"] #bg-layer{background:#000510;}

/* Tamagotchi spawn menu */
.tama-menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;}
.tama-menu-card{background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.18);border-radius:14px;padding:14px;text-align:center;transition:all .2s;}
.tama-menu-card:hover{border-color:rgba(0,180,255,.5);transform:translateY(-2px);}
.tama-menu-icon{font-size:38px;margin-bottom:8px;}
.tama-menu-name{font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:1px;margin-bottom:3px;}
.tama-menu-sub{font-family:'Share Tech Mono',monospace;font-size:8px;color:var(--text-muted);margin-bottom:10px;}
.tama-menu-spawn{width:100%;padding:7px;border-radius:8px;border:none;font-family:'Orbitron',sans-serif;font-size:8px;font-weight:700;cursor:pointer;letter-spacing:1px;transition:all .18s;color:#fff;}
.tama-menu-spawn:hover{transform:scale(1.04);}

</style>
</head>
<body>

<!-- BOOT -->
<div id="boot">
  <canvas id="boot-canvas"></canvas>
  <div class="boot-overlay">
    <div class="boot-logo">TOB OS</div>
    <div class="boot-sub">DYNAMIC ISLAND &amp; STORY EDITION v17.0</div>
    <div class="boot-bar-wrap"><div class="boot-bar"></div></div>
    <div class="boot-msg" id="boot-msg">INITIALIZING CORE...</div>
  </div>
</div>

<div class="amb-ring" style="width:700px;height:700px;left:50%;top:50%;"></div>
<div class="amb-ring" style="width:1100px;height:1100px;left:50%;top:50%;animation-delay:-5s;animation-duration:13s;"></div>

<div id="bg-layer" class="wp-grid"></div>
<canvas id="particle-canvas"></canvas>
<div id="scanlines"></div>
<div id="toast"></div>

<!-- STATUS BAR -->
<div id="statusbar">
  <div class="sb-group">
    <div class="sb-dot"></div>
    <span style="font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;color:var(--neon);letter-spacing:3px;">TOB OS</span>
    <span id="sb-active-title">DESKTOP</span>
  </div>
  
  <!-- DYNAMIC NOTCH -->
  <div id="dynamic-notch" onclick="notchSystem.toggle(event)">
    <div id="notch-idle"><div class="notch-dot"></div></div>
    <div id="notch-expanded"></div>
  </div>

  <div class="sb-group">
    <div id="sb-battery">
      <div class="bat-icon"><div class="bat-fill" id="bat-fill" style="width:70%"></div></div>
      <span id="bat-pct">—%</span>
      <span id="bat-charge" style="display:none">⚡</span>
    </div>
    <span id="sb-ver-badge" class="ok" title="Version Info">v17.0</span>
    <span id="sb-clock">00:00</span>
  </div>
</div>

<!-- DESKTOP -->
<div id="desktop">
  <div class="home-watermark">TOB OS</div>
  <div id="icon-grid"></div>
  <div id="delete-hint" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);background:rgba(255,59,48,.85);color:#fff;padding:4px 16px;border-radius:20px;font-size:10px;font-family:'Share Tech Mono',monospace;display:none;z-index:30;backdrop-filter:blur(8px);">
    ✕ TAP APPS TO HIDE — TAP ELSEWHERE TO EXIT
  </div>
</div>

<!-- DESKTOP CONTEXT MENU -->
<div id="desktop-ctx"></div>

<!-- pets removed -->

<!-- LOCK SCREEN -->
<div id="lock-screen" onclick="unlockScreen()">
  <div class="lock-time" id="lock-clock">00:00</div>
  <div class="lock-date" id="lock-date">MONDAY · MARCH · 2026</div>
  <div class="lock-logo">TOB OS</div>
  <div class="lock-hint">◈ CLICK TO UNLOCK ◈</div>
</div>

<!-- TASKBAR -->
<div id="taskbar">
  <button id="taskbar-start" onclick="toggleStartMenu()" title="Start Menu">⬡</button>
  <div id="tb-sep"></div>
  <div id="tb-apps"></div>
  <div id="tb-right">
    <button class="tb-music-btn" id="tb-play-btn" onclick="toggleMusic()">▶</button>
    <span id="tb-np">— TOB OS —</span>
    <span id="tb-clock">00:00</span>
  </div>
</div>

<!-- START MENU -->
<div id="start-menu">
  <div class="sm-title">◈ ALL APPS</div>
  <div class="sm-grid" id="sm-app-grid"></div>
  <div class="sm-sep"></div>
  <div class="sm-actions">
    <button class="sm-action" onclick="openApp('settings');toggleStartMenu(false)">⚙ Settings</button>
    <button class="sm-action" onclick="toggleStartMenu(false);applyTheme(OS.theme==='dark'?'light':'dark')">☀ Theme</button>
  </div>
</div>

<!-- APP CREATOR MODAL -->
<div class="modal-backdrop" id="ac-modal">
  <div class="modal-dialog" style="width:min(400px,92vw)">
    <div class="modal-title">◈ CREATE APP</div>
    <div class="modal-field">
      <label class="modal-label">APP NAME</label>
      <input class="modal-input" id="ac-name" type="text" placeholder="My App..." maxlength="20">
    </div>
    <div class="modal-field">
      <label class="modal-label">ICON EMOJI</label>
      <div style="display:flex;gap:8px;align-items:center;">
        <div id="ac-icon-preview" style="width:48px;height:48px;border-radius:12px;border:1.5px solid var(--panel-border);background:var(--panel);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">📱</div>
        <input class="modal-input" id="ac-emoji" type="text" placeholder="Emoji e.g. 🚀" maxlength="4" oninput="updateIconPreview()">
      </div>
    </div>
    <div class="modal-field">
      <label class="modal-label">CONTENT TYPE</label>
      <select class="modal-select" id="ac-type" onchange="updateCreatorType()">
        <option value="url">URL / External Page</option>
        <option value="html">Custom HTML</option>
      </select>
    </div>
    <div class="modal-field" id="ac-url-field">
      <label class="modal-label">URL</label>
      <input class="modal-input" id="ac-url" type="text" placeholder="https://...">
    </div>
    <div class="modal-field" id="ac-html-field" style="display:none">
      <label class="modal-label">HTML CONTENT</label>
      <textarea class="modal-textarea" id="ac-html" placeholder="<h1>Hello!</h1>"></textarea>
    </div>
    <div class="modal-field">
      <label class="modal-label">WINDOW SIZE</label>
      <select class="modal-select" id="ac-size">
        <option value="md">Medium (700×480)</option>
        <option value="lg">Large (900×580)</option>
        <option value="sm">Small (480×360)</option>
      </select>
    </div>
    <div class="modal-btns">
      <button class="modal-btn modal-btn-cancel" onclick="closeModal('ac-modal')">✕ CANCEL</button>
      <button class="modal-btn modal-btn-primary" onclick="saveCustomApp()">✦ CREATE</button>
    </div>
  </div>
</div>

<!-- ADMIN KEY MODAL -->
<div class="modal-backdrop" id="admin-key-modal">
  <div class="modal-dialog" style="width:min(340px,90vw)">
    <div class="modal-title" style="color:var(--accent)">🔐 ADMIN ACCESS</div>
    <div style="font-size:12px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-bottom:14px;text-align:center;">Enter admin key to unlock the Admin Panel</div>
    <div class="modal-field">
      <input class="modal-input" id="admin-key-input" type="password" placeholder="Enter admin.key..." maxlength="32">
    </div>
    <div class="modal-btns">
      <button class="modal-btn modal-btn-cancel" onclick="closeModal('admin-key-modal')">CANCEL</button>
      <button class="modal-btn" style="background:linear-gradient(135deg,#440022,#ff2d6e);" onclick="checkAdminKey()">🔓 UNLOCK</button>
    </div>
    <div style="text-align:center;margin-top:8px;font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;">Hint: try "TOBOS-ADMIN-2025"</div>
  </div>
</div>

<!-- VERSION MODAL -->
<div class="modal-backdrop" id="ver-modal">
  <div class="modal-dialog" style="width:min(340px,90vw)">
    <div class="modal-title" id="ver-modal-title">◈ VERSION INFO</div>
    <div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:var(--text-dim);line-height:2;text-align:center;" id="ver-modal-body"></div>
    <div class="modal-btns" style="margin-top:14px">
      <button class="modal-btn modal-btn-cancel" onclick="closeModal('ver-modal')">CLOSE</button>
    </div>
  </div>
</div>

<!-- HIDDEN INPUTS -->
<input type="file" id="wp-file-input" accept="image/*" style="display:none" onchange="handleWallpaperUpload(event)">
<input type="file" id="mod-file-input" accept=".json" style="display:none" onchange="handleModInstall(event)">
<input type="file" id="admin-key-file" accept=".key" style="display:none" onchange="handleAdminKeyFile(event)">
<audio id="audio-el" style="display:none"></audio>
<input type="file" id="finder-file-input" multiple style="display:none" onchange="finderHandleUpload(event)">

<script>
'use strict';
/* ══════════════════════════════════════════════════════════════
   TOB OS v6.0 — Core Engine
══════════════════════════════════════════════════════════════ */

/* ══ 1. STATE ══ */
const TOB_VERSION='17.0.0';
const LS={
  get:(k,d=null)=>{try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):d;}catch(e){return d;}},
  set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}},
};
const OS={
  theme:LS.get('tob_theme','dark'),wallpaper:LS.get('tob_wallpaper','wp-grid'),
  wpCustom:LS.get('tob_wp_custom',null),track:LS.get('tob_track','ambient'),
  volume:LS.get('tob_volume',0.5),customApps:LS.get('tob_apps',[]),
  hiddenApps:LS.get('tob_hidden',[]),gridSlots:LS.get('tob_grid',{}),
  mods:LS.get('tob_mods',[]),adminUnlocked:LS.get('tob_admin',false),
};
let _deleteMode=false;

/* ══ 2. THEME ══ */
function applyTheme(t){OS.theme=t;document.documentElement.setAttribute('data-theme',t);LS.set('tob_theme',t);toast(t==='dark'?'◈ Dark Mode':'☀ Light Mode');}
function applyWallpaper(cls,url=null){
  const bg=document.getElementById('bg-layer');
  [...bg.classList].filter(c=>c.startsWith('wp-')).forEach(c=>bg.classList.remove(c));
  if(cls==='wp-custom'&&url){bg.classList.add('wp-custom');bg.style.backgroundImage=`url("${url}")`;}
  else{bg.classList.add(cls);bg.style.backgroundImage='';}
  OS.wallpaper=cls;LS.set('tob_wallpaper',cls);
  document.querySelectorAll('.wp-opt').forEach(o=>o.classList.toggle('active',o.dataset.wp===cls));
}

/* ══ 3. PARTICLES ══ */
(()=>{
  const cv=document.getElementById('particle-canvas'),ctx=cv.getContext('2d');
  let W,H;const pts=[];
  const resize=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;};
  resize();addEventListener('resize',resize,{passive:true});
  class P{constructor(){this.respawn();this.y=Math.random()*H;}
    respawn(){this.x=Math.random()*W;this.y=H+5;this.vx=(Math.random()-.5)*.25;this.vy=-(Math.random()*.28+.06);this.r=Math.random()*1.4+.8;this.a=Math.random()*.35+.1;this.c=Math.random()<.72?'0,180,255':'0,255,200';}
    tick(){this.x+=this.vx;this.y+=this.vy;this.a-=.0004;if(this.y<-4||this.a<=0)this.respawn();}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.c},${this.a})`;ctx.fill();}
  }
  for(let i=0;i<55;i++)pts.push(new P());
  (function loop(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.tick();p.draw();});requestAnimationFrame(loop);})();
})();

/* ══ 4. CLOCK ══ */
function updateClock(){
  const n=new Date(),t=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
  document.getElementById('sb-clock').textContent=t;
  document.getElementById('tb-clock').textContent=t;
}
updateClock();setInterval(updateClock,15000);

/* ══ 5. BATTERY ══ */
async function initBattery(){
  try{
    const bat=await navigator.getBattery();
    const upd=()=>{
      const pct=Math.round(bat.level*100);
      const fill=document.getElementById('bat-fill');
      if(fill){fill.style.width=pct+'%';fill.className='bat-fill'+(pct<20?' low':pct<50?' med':'');}
      const pctEl=document.getElementById('bat-pct');if(pctEl)pctEl.textContent=pct+'%';
      const chEl=document.getElementById('bat-charge');if(chEl)chEl.style.display=bat.charging?'inline':'none';
    };
    upd();bat.addEventListener('levelchange',upd);bat.addEventListener('chargingchange',upd);
  }catch(e){const p=document.getElementById('bat-pct');if(p)p.textContent='N/A';}
}

/* ══ 6. VERSION ══ */
function checkVersion(){
  const badge=document.getElementById('sb-ver-badge');
  if(badge){badge.className='ok';badge.textContent=`v${TOB_VERSION} ✓`;badge.onclick=()=>{document.getElementById('ver-modal-title').textContent='◈ UP TO DATE';document.getElementById('ver-modal-body').innerHTML=`<div style="color:var(--green)">✓ TOB OS v${TOB_VERSION}</div><div>System is up to date.</div>`;openModal('ver-modal');};}
}

/* ══ 7. TOAST ══ */
let _toastT;
function toast(msg,dur=2400){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');clearTimeout(_toastT);_toastT=setTimeout(()=>el.classList.remove('show'),dur);}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));

/* ══ 8. GRID SYSTEM ══ */
const GRID={
  PAD_X:20,PAD_TOP:16,PAD_BOTTOM:16,ICON_W:80,ICON_H:90,
  cols:()=>Math.max(1,Math.floor((document.getElementById('desktop').offsetWidth-40)/80)),
  rows:()=>Math.max(1,Math.floor((document.getElementById('desktop').offsetHeight-32)/90)),
  slotX:(col)=>20+col*80,slotY:(row)=>16+row*90,
};
function assignGridSlots(){
  const apps=getVisibleApps(),slots=Object.assign({},OS.gridSlots);
  const usedSlots=new Set(Object.entries(slots).filter(([id])=>apps.find(a=>a.id===id)).map(([,s])=>`${s.col},${s.row}`));
  let nextIdx=0;
  apps.forEach(app=>{
    if(slots[app.id])usedSlots.add(`${slots[app.id].col},${slots[app.id].row}`);
    else{while(true){const col=nextIdx%GRID.cols(),row=Math.floor(nextIdx/GRID.cols()),key=`${col},${row}`;if(!usedSlots.has(key)){slots[app.id]={col,row};usedSlots.add(key);nextIdx++;break;}nextIdx++;if(nextIdx>1000)break;}}
  });
  OS.gridSlots=slots;LS.set('tob_grid',slots);return slots;
}
function buildDesktopIcons(){
  const grid=document.getElementById('icon-grid');grid.innerHTML='';
  const apps=getVisibleApps(),slots=assignGridSlots();
  apps.forEach(app=>grid.appendChild(makeDesktopIcon(app,slots[app.id]||{col:0,row:0})));
  buildStartMenu();syncTaskbar();
}
function makeDesktopIcon(app,slot){
  if(app.isFolder) return FolderSystem._makeFolderIcon(app,slot);
  const div=document.createElement('div');div.className='desk-icon';div.dataset.appId=app.id;
  positionIcon(div,slot.col,slot.row);
  const frame=document.createElement('div');frame.className='icon-img';
  if(app.imageData){const img=document.createElement('img');img.src=app.imageData;img.style.cssText='width:100%;height:100%;object-fit:cover;border-radius:12px;';frame.appendChild(img);}
  else{frame.style.background=app.color||'var(--panel)';frame.textContent=app.icon||'📱';}
  const lbl=document.createElement('div');lbl.className='icon-lbl';lbl.textContent=(app.label||app.id).replace('\n',' ');
  const delBtn=document.createElement('div');delBtn.className='icon-del-btn';delBtn.textContent='✕';
  delBtn.onclick=(e)=>{e.stopPropagation();hideApp(app.id);};
  div.appendChild(frame);div.appendChild(lbl);div.appendChild(delBtn);
  let _lc=0;
  div.addEventListener('click',()=>{if(_deleteMode)return;const now=Date.now();if(now-_lc<380)launchIcon(div,app);_lc=now;});
  div.addEventListener('mousedown',startIconDrag.bind(null,div,app));
  div.addEventListener('touchstart',e=>startIconDrag(div,app,e.touches[0]),{passive:true});
  return div;
}
function positionIcon(div,col,row){div.style.left=GRID.slotX(col)+'px';div.style.top=GRID.slotY(row)+'px';}
function launchIcon(div,app){div.classList.add('snap-anim');setTimeout(()=>div.classList.remove('snap-anim'),250);openApp(app.id);closeStartMenuIfOpen();}

/* Drag rearrange */
function startIconDrag(div,app,e){
  if(_deleteMode)return;
  let moved=false;const sx=e.clientX,sy=e.clientY;
  const ghost=document.createElement('div');ghost.className='drag-ghost';
  ghost.style.background=div.querySelector('.icon-img').style.background||'var(--panel)';ghost.style.fontSize='24px';ghost.textContent=app.icon||'📱';ghost.style.display='flex';ghost.style.alignItems='center';ghost.style.justifyContent='center';
  document.body.appendChild(ghost);
  const move=(me)=>{
    const cx=me.touches?me.touches[0].clientX:me.clientX,cy=me.touches?me.touches[0].clientY:me.clientY;
    if(!moved&&Math.abs(cx-sx)+Math.abs(cy-sy)<5)return;
    moved=true;div.classList.add('is-dragging');ghost.style.left=(cx-26)+'px';ghost.style.top=(cy-26)+'px';
  };
  const up=(me)=>{
    document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);
    document.removeEventListener('touchmove',move);document.removeEventListener('touchend',up);
    if(ghost.parentNode)ghost.parentNode.removeChild(ghost);div.classList.remove('is-dragging');
    document.querySelectorAll('.desk-icon.drag-over').forEach(el=>el.classList.remove('drag-over'));
    if(!moved)return;
    const cx=me.touches?me.changedTouches[0].clientX:(me.clientX||sx),cy=me.touches?me.changedTouches[0].clientY:(me.clientY||sy);
    const desktop=document.getElementById('desktop'),rect=desktop.getBoundingClientRect();
    const col=Math.max(0,Math.min(GRID.cols()-1,Math.round((cx-rect.left-20)/80)));
    const row=Math.max(0,Math.min(GRID.rows()-1,Math.round((cy-rect.top-16)/90)));
    const apps=getVisibleApps();
    // Check if dropped ON an existing app icon — create folder
    const occupant=apps.find(a=>a.id!==app.id&&OS.gridSlots[a.id]&&OS.gridSlots[a.id].col===col&&OS.gridSlots[a.id].row===row);
    if(occupant&&!occupant.isFolder){
      // Create folder from two apps
      FolderSystem.createFromDrop(app,occupant,col,row);
    } else if(occupant&&occupant.isFolder){
      // Drop onto existing folder — add app to it
      FolderSystem.addToFolder(occupant.id,app);
    } else {
      const myOldSlot=Object.assign({},OS.gridSlots[app.id]);
      OS.gridSlots[app.id]={col,row};positionIcon(div,col,row);div.classList.add('snap-anim');setTimeout(()=>div.classList.remove('snap-anim'),250);LS.set('tob_grid',OS.gridSlots);
    }
  };
  document.addEventListener('mousemove',move);document.addEventListener('mouseup',up);
  document.addEventListener('touchmove',move,{passive:true});document.addEventListener('touchend',up);
}

/* Delete mode */
function enterDeleteMode(){_deleteMode=true;document.getElementById('icon-grid').classList.add('delete-mode');document.querySelectorAll('.desk-icon').forEach(el=>el.classList.add('jiggle'));document.getElementById('delete-hint').style.display='block';toast('✕ Tap apps to hide them');}
function exitDeleteMode(){_deleteMode=false;document.getElementById('icon-grid').classList.remove('delete-mode');document.querySelectorAll('.desk-icon').forEach(el=>el.classList.remove('jiggle'));document.getElementById('delete-hint').style.display='none';}

/* ══ DESKTOP CONTEXT MENU ══ */
let _longPressT, _dctxWpOpen=false;

function hideDeskCtx(){document.getElementById('desktop-ctx').classList.remove('open');}

function _renderDctx(menu){
  if(_dctxWpOpen){
    const wps=[{cls:'wp-grid',lbl:'GRID'},{cls:'wp-stadium',lbl:'STADIUM'},{cls:'wp-gradient',lbl:'GRADIENT'},{cls:'wp-energy',lbl:'ENERGY'},{cls:'wp-custom',lbl:'CUSTOM'}];
    menu.innerHTML=`<div class="dctx-panel">
      <div class="dctx-back" onclick="_dctxWpOpen=false;_renderDctx(document.getElementById('desktop-ctx'))">‹ BACK</div>
      <div class="dctx-label">WALLPAPER</div>
      <div class="dctx-wp-grid">${wps.map(w=>`<div class="dctx-wp-btn${OS.wallpaper===w.cls?' active':''}" onclick="applyWallpaper('${w.cls}');hideDeskCtx();toast('◈ Wallpaper changed')">${w.lbl}</div>`).join('')}</div>
      <div class="dctx-upload-btn" onclick="document.getElementById('wp-file-input').click();hideDeskCtx()">⬆ UPLOAD CUSTOM</div>
    </div>`;
  } else {
    menu.innerHTML=`<div class="dctx-panel">
      <div class="dctx-item" onclick="toggleWidgetPanel(true);hideDeskCtx()">
        <div class="dctx-item-icon" style="background:rgba(0,180,255,.13)">⊟</div><span>Add Widgets</span>
      </div>
      <div class="dctx-item" onclick="_dctxWpOpen=true;_renderDctx(document.getElementById('desktop-ctx'))">
        <div class="dctx-item-icon" style="background:rgba(0,255,200,.1)">◈</div><span>Wallpaper</span>
      </div>
      <div class="dctx-sep"></div>
      <div class="dctx-item" onclick="enterDeleteMode();hideDeskCtx()">
        <div class="dctx-item-icon" style="background:rgba(255,45,110,.12)">✕</div>
        <span style="color:rgba(255,130,150,.95)">Remove Apps</span>
      </div>
    </div>`;
  }
}

function showDesktopCtx(x,y){
  const menu=document.getElementById('desktop-ctx');
  _dctxWpOpen=false;
  _renderDctx(menu);
  const mx=Math.min(x,innerWidth-210), my=Math.min(y,innerHeight-210);
  menu.style.left=mx+'px';menu.style.top=my+'px';
  // flip origin so it always pops toward center
  const ox=x>innerWidth/2?'right':'left', oy=y>innerHeight/2?'bottom':'top';
  menu.style.transformOrigin=`${oy} ${ox}`;
  menu.classList.add('open');
  if(navigator.vibrate)navigator.vibrate(18);
}

const _deskEl=document.getElementById('desktop');
const _isDeskTarget=t=>(t===_deskEl||t===document.getElementById('icon-grid')||t.classList.contains('home-watermark'));
function _onDeskPointerDown(x,y,e){
  if(!_isDeskTarget(e.target))return;
  closeStartMenuIfOpen();
  if(_deleteMode){exitDeleteMode();return;}
  clearTimeout(_longPressT);
  _longPressT=setTimeout(()=>showDesktopCtx(x,y),500);
}
_deskEl.addEventListener('mousedown',e=>_onDeskPointerDown(e.clientX,e.clientY,e));
_deskEl.addEventListener('mouseup',()=>clearTimeout(_longPressT));
_deskEl.addEventListener('mouseleave',()=>clearTimeout(_longPressT));
_deskEl.addEventListener('touchstart',e=>{const t=e.touches[0];_onDeskPointerDown(t.clientX,t.clientY,e);},{passive:true});
_deskEl.addEventListener('touchend',()=>clearTimeout(_longPressT));
_deskEl.addEventListener('touchcancel',()=>clearTimeout(_longPressT));
document.addEventListener('mousedown',e=>{if(!e.target.closest('#desktop-ctx'))hideDeskCtx();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(_deleteMode)exitDeleteMode();hideDeskCtx();}});
/* Backtick key instantly locks screen */
document.addEventListener('keydown',function(e){if(e.code==='Backquote'&&!e.ctrlKey&&!e.altKey&&!e.metaKey){const tag=document.activeElement&&document.activeElement.tagName;if(tag==='INPUT'||tag==='TEXTAREA')return;e.preventDefault();window.lockScreen();toast('\uD83D\uDD12 Screen locked');}});

function hideApp(id){if(!OS.hiddenApps.includes(id))OS.hiddenApps.push(id);LS.set('tob_hidden',OS.hiddenApps);delete OS.gridSlots[id];LS.set('tob_grid',OS.gridSlots);buildDesktopIcons();toast(`✕ App hidden — recover in Vault`);}
function restoreApp(id){OS.hiddenApps=OS.hiddenApps.filter(h=>h!==id);LS.set('tob_hidden',OS.hiddenApps);buildDesktopIcons();toast(`✦ App restored!`);}
function getVisibleApps(){
  const base=[...BUILTIN_APPS,...OS.customApps].filter(a=>!OS.hiddenApps.includes(a.id));
  const folders=FolderSystem.getAll().map(f=>({...f,isFolder:true}));
  return [...base,...folders];
}
function getAllApps(){
  const folders=FolderSystem.getAll().map(f=>({...f,isFolder:true}));
  return[...BUILTIN_APPS,...OS.customApps,...folders];
}

/* ══ 9. TASKBAR ══ */
function syncTaskbar(){
  const container=document.getElementById('tb-apps');container.innerHTML='';
  WM.windows.forEach(w=>{
    const app=getAllApps().find(a=>a.id===w.id)||{id:w.id,label:w.title||w.id,icon:w.icon||'📱'};
    const btn=document.createElement('div');btn.className='tb-app';
    if(w.id===WM.focusedId)btn.classList.add('active');
    if(w.el.style.display==='none')btn.classList.add('minimized');
    btn.innerHTML=`<span class="tb-app-icon">${app.icon||w.icon||'📱'}</span><span class="tb-app-label">${(app.label||w.title||'App').replace('\n',' ')}</span><span class="tb-indicator"></span>`;
    btn.onclick=()=>{if(w.el.style.display==='none')restoreWindow(w);else if(w.id===WM.focusedId)WM.minimize(w.id);else WM.focus(w.id);};
    container.appendChild(btn);
  });
}
function setSbTitle(t){const el=document.getElementById('sb-active-title');if(el)el.textContent=t||'DESKTOP';}

/* ══ 10. WINDOW MANAGER ══ */
const WM={
  windows:new Map(),zCounter:60,focusedId:null,
  create(id,title,icon,width,height,fillFn){
    if(this.windows.has(id)){const w=this.windows.get(id);if(w.el.style.display==='none')restoreWindow(w);else this.focus(id);return w;}
    const desktop=document.getElementById('desktop');
    const dW=desktop.offsetWidth,dH=desktop.offsetHeight;
    const left=Math.max(10,(dW-width)/2),top=Math.max(10,Math.min((dH-height)/2,dH-height-10));
    const el=document.createElement('div');el.className='os-window focused';
    el.style.cssText=`width:${width}px;height:${height}px;left:${left}px;top:${top}px;z-index:${++this.zCounter};`;
    const bar=document.createElement('div');bar.className='win-bar';
    bar.innerHTML=`<div class="win-controls"><div class="wc wc-close"></div><div class="wc wc-min"></div><div class="wc wc-max"></div></div><div class="win-title">${icon||''} ${title}</div><div style="width:44px;flex-shrink:0"></div>`;
    const body=document.createElement('div');body.className='win-body';body.style.flex='1';
    const rh=document.createElement('div');rh.className='win-resize-handle';
    el.appendChild(bar);el.appendChild(body);el.appendChild(rh);
    desktop.appendChild(el);
    const w={id,el,body,bar,title,icon:icon||'📱',state:'open',prevGeom:null};
    this.windows.set(id,w);fillFn(body);
    bar.querySelector('.wc-close').onclick=e=>{e.stopPropagation();this.close(id);};
    bar.querySelector('.wc-min').onclick=e=>{e.stopPropagation();this.minimize(id);};
    bar.querySelector('.wc-max').onclick=e=>{e.stopPropagation();this.toggleMax(id);};
    this._makeDraggable(el,bar);this._makeResizable(el,rh);
    el.addEventListener('mousedown',()=>this.focus(id),true);
    this.focus(id);adminLog(`Opened: ${title}`);return w;
  },
  focus(id){const w=this.windows.get(id);if(!w)return;document.querySelectorAll('.os-window').forEach(el=>el.classList.remove('focused'));w.el.classList.add('focused');w.el.style.zIndex=++this.zCounter;this.focusedId=id;setSbTitle(w.title);syncTaskbar();},
  close(id){
    const w=this.windows.get(id);if(!w)return;
    w.el.classList.add('anim-close');
    // Clean up any iframes to prevent background processes
    w.el.querySelectorAll('iframe').forEach(f=>{f.src='about:blank';});
    setTimeout(()=>{if(w.el.parentNode)w.el.parentNode.removeChild(w.el);this.windows.delete(id);
      const rem=[...this.windows.values()].filter(x=>x.el.style.display!=='none');
      if(rem.length){const top=rem.sort((a,b)=>parseInt(b.el.style.zIndex||0)-parseInt(a.el.style.zIndex||0))[0];this.focus(top.id);}
      else{this.focusedId=null;setSbTitle('DESKTOP');}syncTaskbar();adminLog(`Closed: ${w.title}`);
    },220);
  },
  minimize(id){const w=this.windows.get(id);if(!w||w.state==='minimized')return;w.state='minimized';w.el.classList.add('anim-minimize');setTimeout(()=>{w.el.style.display='none';w.el.classList.remove('anim-minimize');syncTaskbar();},280);const rem=[...this.windows.values()].filter(x=>x.id!==id&&x.el.style.display!=='none');if(rem.length){const top=rem.sort((a,b)=>parseInt(b.el.style.zIndex||0)-parseInt(a.el.style.zIndex||0))[0];this.focus(top.id);}else{this.focusedId=null;setSbTitle('DESKTOP');syncTaskbar();}},
  toggleMax(id){const w=this.windows.get(id);if(!w)return;if(w.state!=='maximized'){w.prevGeom={left:w.el.style.left,top:w.el.style.top,width:w.el.style.width,height:w.el.style.height};w.state='maximized';const d=document.getElementById('desktop');Object.assign(w.el.style,{left:'0',top:'0',width:d.offsetWidth+'px',height:d.offsetHeight+'px',borderRadius:'0'});w.el.classList.add('anim-maximize');setTimeout(()=>w.el.classList.remove('anim-maximize'),220);}else{w.state='open';const g=w.prevGeom||{};Object.assign(w.el.style,{left:g.left||'40px',top:g.top||'40px',width:g.width||'700px',height:g.height||'480px',borderRadius:''});w.el.classList.add('anim-maximize');setTimeout(()=>w.el.classList.remove('anim-maximize'),220);}},
  _makeDraggable(el,handle){let drag=false,ox,oy,sx,sy;const start=(x,y)=>{if(el.style.borderRadius==='0px')return;drag=true;ox=parseInt(el.style.left)||0;oy=parseInt(el.style.top)||0;sx=x;sy=y;};const move=(x,y)=>{if(!drag)return;const d=document.getElementById('desktop');el.style.left=Math.max(0,Math.min(d.offsetWidth-80,ox+(x-sx)))+'px';el.style.top=Math.max(0,Math.min(d.offsetHeight-40,oy+(y-sy)))+'px';};const end=()=>drag=false;handle.addEventListener('mousedown',e=>{e.preventDefault();start(e.clientX,e.clientY);});document.addEventListener('mousemove',e=>move(e.clientX,e.clientY));document.addEventListener('mouseup',end);handle.addEventListener('touchstart',e=>start(e.touches[0].clientX,e.touches[0].clientY),{passive:true});document.addEventListener('touchmove',e=>{if(drag)move(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});document.addEventListener('touchend',end);},
  _makeResizable(el,rh){let r=false,sx,sy,sw,sh;rh.addEventListener('mousedown',e=>{r=true;e.preventDefault();e.stopPropagation();sx=e.clientX;sy=e.clientY;sw=el.offsetWidth;sh=el.offsetHeight;});document.addEventListener('mousemove',e=>{if(!r)return;el.style.width=Math.max(300,sw+(e.clientX-sx))+'px';el.style.height=Math.max(200,sh+(e.clientY-sy))+'px';});document.addEventListener('mouseup',()=>r=false);},
};
function restoreWindow(w){w.state='open';w.el.style.display='';w.el.classList.add('anim-maximize');setTimeout(()=>w.el.classList.remove('anim-maximize'),220);WM.focus(w.id);syncTaskbar();}

/* ══ 11. START MENU ══ */
let _smOpen=false;
function toggleStartMenu(force){_smOpen=force!==undefined?force:!_smOpen;document.getElementById('start-menu').classList.toggle('open',_smOpen);}
function closeStartMenuIfOpen(){if(_smOpen)toggleStartMenu(false);}
function buildStartMenu(){
  const grid=document.getElementById('sm-app-grid');if(!grid)return;grid.innerHTML='';
  getAllApps().forEach(app=>{const div=document.createElement('div');div.className='sm-app';div.innerHTML=`<span class="sm-app-icon">${app.icon||'📱'}</span><span class="sm-app-lbl">${(app.label||app.id).replace('\n',' ')}</span>`;div.onclick=()=>{openApp(app.id);toggleStartMenu(false);};grid.appendChild(div);});
}

/* pets removed */

/* ══ 13. MUSIC ══ */
const MUSIC={
  songs:[],currentIdx:-1,playing:false,
  dirHandle:null,dirName:'',
  knownFiles:new Set(),scanInterval:null
};
const AUDIO_EXTS=['mp3','flac','aac','ogg','wav','m4a','opus'];

async function connectMusicFolder(){
  if(!('showDirectoryPicker' in window)){
    toast('⚠ Use Chrome or Edge for folder support');return;
  }
  try{
    const handle=await window.showDirectoryPicker({mode:'read'});
    MUSIC.dirHandle=handle;MUSIC.dirName=handle.name;
    MUSIC.knownFiles=new Set();
    toast(`📂 ${handle.name} — scanning…`);
    await scanMusicFolder(true);
    startMusicAutoScan();
    refreshMusicApp();
  }catch(e){if(e.name!=='AbortError')toast('⚠ '+e.message);}
}

function disconnectMusicFolder(){
  if(MUSIC.scanInterval){clearInterval(MUSIC.scanInterval);MUSIC.scanInterval=null;}
  MUSIC.dirHandle=null;MUSIC.dirName='';
  MUSIC.knownFiles=new Set();MUSIC.songs=[];
  MUSIC.currentIdx=-1;MUSIC.playing=false;
  const el=document.getElementById('audio-el');if(el){el.pause();el.src='';}
  refreshMusicApp();toast('📂 Folder disconnected');
}

function startMusicAutoScan(){
  if(MUSIC.scanInterval)clearInterval(MUSIC.scanInterval);
  MUSIC.scanInterval=setInterval(()=>{if(MUSIC.dirHandle)scanMusicFolder(false);},20000);
}

async function scanMusicFolder(showNotif){
  if(!MUSIC.dirHandle)return;
  // Show scanning indicator
  const btn=document.querySelector('.music-folder-btn');
  if(btn)btn.textContent='⏳ Scanning…';
  let newCount=0;
  try{
    const perm=await MUSIC.dirHandle.requestPermission({mode:'read'});
    if(perm!=='granted'){toast('⚠ Folder permission denied');return;}
    for await(const entry of MUSIC.dirHandle.values()){
      if(entry.kind!=='file')continue;
      const ext=entry.name.split('.').pop().toLowerCase();
      if(!AUDIO_EXTS.includes(ext))continue;
      if(MUSIC.knownFiles.has(entry.name))continue;
      MUSIC.knownFiles.add(entry.name);
      const file=await entry.getFile();
      const nameNoExt=entry.name.replace(/\.[^.]+$/,'');
      let artist='Unknown',name=nameNoExt;
      if(nameNoExt.includes(' - ')){const p=nameNoExt.split(' - ');artist=p[0].trim();name=p.slice(1).join(' - ').trim();}
      const src=URL.createObjectURL(file);
      const song={id:'song_'+Date.now()+'_'+Math.random().toString(36).slice(2),name,artist,src,duration:null,fileName:entry.name};
      const a=document.createElement('audio');a.src=src;
      a.addEventListener('loadedmetadata',()=>{song.duration=a.duration;refreshMusicApp();},{once:true});
      MUSIC.songs.push(song);newCount++;
    }
  }catch(e){console.warn('Scan error:',e);}
  if(newCount>0){
    if(showNotif)toast(`🎵 Found ${newCount} new track${newCount>1?'s':''}`);
    refreshMusicApp();
  } else {
    refreshMusicApp(); // still update button state
  }
}
function mp3Play(idx){const el=document.getElementById('audio-el');if(!el||idx<0||idx>=MUSIC.songs.length)return;MUSIC.currentIdx=idx;MUSIC.playing=true;const song=MUSIC.songs[idx];el.src=song.src;el.play().catch(()=>{});document.getElementById('tb-np').textContent=song.name;refreshMusicApp();}
function mp3Pause(){const el=document.getElementById('audio-el');if(!el)return;if(el.paused){el.play().catch(()=>{});MUSIC.playing=true;}else{el.pause();MUSIC.playing=false;}refreshMusicApp();}
function mp3Next(){if(MUSIC.songs.length)mp3Play((MUSIC.currentIdx+1)%MUSIC.songs.length);}
function mp3Prev(){if(MUSIC.songs.length)mp3Play((MUSIC.currentIdx-1+MUSIC.songs.length)%MUSIC.songs.length);}
function fmtTime(s){if(!isFinite(s))return'--:--';return`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;}
let _visRaf;
function startVisualizer(){cancelAnimationFrame(_visRaf);function step(){_visRaf=requestAnimationFrame(step);const el=document.getElementById('audio-el');const playing=el&&!el.paused&&MUSIC.playing;document.querySelectorAll('.np-bar').forEach((b,i)=>{const h=playing?(8+Math.sin(Date.now()*.003+i*.8)*10+Math.random()*7):(2+Math.sin(Date.now()*.002+i)*1.5);b.style.height=Math.max(2,h)+'px';});}step();}
// refreshMusicApp is defined inside buildMusicApp as a closure and overrides this stub
let refreshMusicApp=function(){/* stub — will be replaced by buildMusicApp */};
function buildMusicApp(body){
  body.style.overflow='hidden';body.style.padding='0';
  let _musicTab='songs'; // 'artists'|'songs'|'nowplaying'
  body.innerHTML=`<div class="music-app">
  <div class="music-sidebar">
    <div class="music-sidebar-top">
      <button class="music-folder-btn" id="music-conn-btn" onclick="connectMusicFolder()">📂 Connect Folder</button>
      <button class="music-disconn-btn" id="music-disconn-btn" style="display:none;margin-top:6px;width:100%;padding:6px;border-radius:8px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer;" onclick="disconnectMusicFolder()">✕ Disconnect</button>
      <div class="folder-status" id="music-folder-status">No folder connected.<br>Connect a music folder to get started.</div>
    </div>
    <div class="music-sidebar-divider"></div>
    <div class="music-sidebar-label">LIBRARY</div>
    <div class="music-nav-item" id="mnav-artists" onclick="setMusicTab('artists',this)">🎤 Artists</div>
    <div class="music-nav-item active" id="mnav-songs" onclick="setMusicTab('songs',this)">🎵 All Songs</div>
    <div class="music-nav-item" id="mnav-nowplaying" onclick="setMusicTab('nowplaying',this)">▶ Now Playing</div>
    <div class="music-sidebar-divider"></div>
    <div class="music-sidebar-label">OST PLAYER</div>
    <div class="music-sidebar-bottom">
      <div class="track-btns">
        <div class="track-btn ${OS.track==='ambient'?'active':''}" onclick="selectOSTTrack('ambient')">AMB</div>
        <div class="track-btn ${OS.track==='battle'?'active':''}" onclick="selectOSTTrack('battle')">BATTLE</div>
        <div class="track-btn ${OS.track==='calm'?'active':''}" onclick="selectOSTTrack('calm')">CALM</div>
      </div>
      <div class="music-row">
        <button class="music-play-btn" id="ost-sidebar-btn" onclick="toggleMusic()">${_ostPlaying?'⏸':'▶'}</button>
        <input class="vol-range" type="range" min="0" max="1" step=".02" value="${OS.volume}" oninput="setVolume(this.value)">
      </div>
    </div>
  </div>
  <div class="music-main" id="music-main-panel"></div>
</div>`;

  window.setMusicTab=(tab,navEl)=>{
    _musicTab=tab;
    body.querySelectorAll('.music-nav-item').forEach(n=>n.classList.remove('active'));
    if(navEl)navEl.classList.add('active');
    else{const el=body.querySelector('#mnav-'+tab);if(el)el.classList.add('active');}
    renderMusicMain();
  };

  function renderMusicMain(){
    const panel=body.querySelector('#music-main-panel');if(!panel)return;
    if(_musicTab==='artists') renderArtistsTab(panel);
    else if(_musicTab==='songs') renderSongsTab(panel);
    else renderNowPlayingTab(panel);
  }

  function renderArtistsTab(panel){
    const artists={};
    MUSIC.songs.forEach(s=>{if(!artists[s.artist])artists[s.artist]=[];artists[s.artist].push(s);});
    if(!Object.keys(artists).length){
      panel.innerHTML=`<div class="music-empty"><div class="music-empty-icon">🎤</div><div class="music-empty-text">NO ARTISTS</div><div style="font-size:10px;color:var(--text-muted)">Connect a folder with audio files</div></div>`;return;
    }
    let html=`<div class="music-header"><span class="music-header-title">ARTISTS <span style="font-size:10px;font-weight:400;color:var(--text-muted)">(${Object.keys(artists).length})</span></span><button class="music-scan-btn" onclick="scanMusicFolder(true)" ${MUSIC.dirHandle?'':'disabled'}>↻ SCAN</button></div>`;
    html+=`<div style="flex:1;overflow-y:auto;padding:12px;">`;
    Object.entries(artists).sort((a,b)=>a[0].localeCompare(b[0])).forEach(([artist,songs])=>{
      const colors=['#001040','#100020','#002010','#201000'];
      const colIdx=artist.charCodeAt(0)%colors.length;
      html+=`<div class="music-artist-card" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'">
        <div style="width:44px;height:44px;border-radius:10px;background:${colors[colIdx]};border:1px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🎤</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px;color:var(--text)">${artist}</div>
          <div style="font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace">${songs.length} song${songs.length!==1?'s':''}</div>
        </div>
        <div style="font-size:16px;color:var(--text-muted)">›</div>
      </div>
      <div class="music-artist-songs" style="display:none">`;
      songs.forEach((s,i)=>{
        const idx=MUSIC.songs.indexOf(s);
        html+=`<div class="music-track${idx===MUSIC.currentIdx?' playing':''}" onclick="mp3Play(${idx})">
          <div class="track-num">${idx===MUSIC.currentIdx?'♪':(i+1)}</div>
          <div class="track-info"><div class="track-title">${s.name}</div></div>
          <div class="track-dur">${fmtTime(s.duration)}</div>
        </div>`;
      });
      html+=`</div>`;
    });
    html+=`</div>`;
    panel.innerHTML=html;
  }

  function renderSongsTab(panel){
    panel.innerHTML=`<div class="music-header"><span class="music-header-title">ALL SONGS <span style="font-size:10px;font-weight:400;color:var(--text-muted)">(${MUSIC.songs.length})</span></span><button class="music-scan-btn" onclick="scanMusicFolder(true)" ${MUSIC.dirHandle?'':'disabled'}>↻ SCAN</button></div><div class="music-track-list" id="music-track-list"></div>`;
    const list=panel.querySelector('#music-track-list');
    if(!MUSIC.songs.length){
      list.innerHTML=`<div class="music-empty"><div class="music-empty-icon">🎵</div><div class="music-empty-text">NO TRACKS</div><div style="font-size:10px;color:var(--text-muted);opacity:.6">${MUSIC.dirHandle?'No audio files found in folder':'Connect a folder with MP3/FLAC/WAV files'}</div></div>`;
    } else {
      MUSIC.songs.forEach((song,i)=>{
        const div=document.createElement('div');div.className='music-track'+(i===MUSIC.currentIdx?' playing':'');
        div.innerHTML=`<div class="track-num">${i===MUSIC.currentIdx?'♪':(i+1)}</div><div class="track-info"><div class="track-title">${song.name}</div><div class="track-artist">${song.artist}</div></div><div class="track-dur">${fmtTime(song.duration)}</div>`;
        div.addEventListener('click',()=>mp3Play(i));list.appendChild(div);
      });
    }
  }

  function renderNowPlayingTab(panel){
    const song=MUSIC.songs[MUSIC.currentIdx]||null;
    panel.innerHTML=`<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;gap:16px;">
      <div style="width:140px;height:140px;border-radius:20px;background:linear-gradient(135deg,#001a40,#003080);border:2px solid var(--panel-border);display:flex;align-items:center;justify-content:center;font-size:56px;box-shadow:0 10px 40px rgba(0,100,255,.2);">🎵</div>
      <div style="text-align:center;">
        <div style="font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;color:var(--text);margin-bottom:4px" id="np-big-title">${song?song.name:'No track selected'}</div>
        <div style="font-size:12px;color:var(--text-dim);font-family:'Share Tech Mono',monospace" id="np-big-artist">${song?song.artist:'—'}</div>
      </div>
      <div class="np-visualizer" style="margin:0">${Array.from({length:14},()=>'<div class="np-bar" style="height:3px"></div>').join('')}</div>
      <div style="width:100%;max-width:340px">
        <div style="display:flex;justify-content:space-between;font-size:10px;font-family:'Share Tech Mono',monospace;color:var(--text-muted);margin-bottom:4px">
          <span id="mp3-cur">0:00</span><span id="mp3-dur">0:00</span>
        </div>
        <input class="np-progress" type="range" min="0" max="100" value="0" id="mp3-prog" oninput="seekMP3(this.value)" style="width:100%">
      </div>
      <div class="np-ctrl-row" style="gap:16px">
        <button class="np-btn" onclick="mp3Prev()" style="width:44px;height:44px;font-size:20px">⏮</button>
        <button class="np-btn main" id="mp3-play-btn" onclick="mp3Pause()" style="width:56px;height:56px;font-size:24px">${MUSIC.playing?'⏸':'▶'}</button>
        <button class="np-btn" onclick="mp3Next()" style="width:44px;height:44px;font-size:20px">⏭</button>
      </div>
    </div>`;
  }

  // Wire audio element events for Now Playing
  const ael=document.getElementById('audio-el');
  ael.ontimeupdate=()=>{
    const np=body.querySelector('#mp3-prog');if(np&&ael.duration)np.value=(ael.currentTime/ael.duration)*100;
    const cur=body.querySelector('#mp3-cur');if(cur)cur.textContent=fmtTime(ael.currentTime);
    const dur=body.querySelector('#mp3-dur');if(dur)dur.textContent=fmtTime(ael.duration);
  };
  ael.onended=()=>mp3Next();

  refreshMusicApp=function(){
    // Update folder status
    const fs=body.querySelector('#music-folder-status');
    const cb=body.querySelector('#music-conn-btn');
    const db=body.querySelector('#music-disconn-btn');
    if(MUSIC.dirHandle){
      if(fs)fs.innerHTML=`<span style="color:var(--neon3)">📂 ${MUSIC.dirName}</span><br>${MUSIC.songs.length} track${MUSIC.songs.length!==1?'s':''} · auto-scan 20s`;
      if(cb){cb.textContent='📂 '+MUSIC.dirName;cb.classList.add('connected');}
      if(db)db.style.display='block';
    } else {
      if(fs)fs.innerHTML='No folder connected.<br>Connect a music folder to get started.';
      if(cb){cb.textContent='📂 Connect Folder';cb.classList.remove('connected');}
      if(db)db.style.display='none';
    }
    // Update main panel
    renderMusicMain();
    // Update np title/artist if on now playing tab
    const npT=body.querySelector('#np-big-title'),npA=body.querySelector('#np-big-artist');
    const s=MUSIC.songs[MUSIC.currentIdx];
    if(npT)npT.textContent=s?s.name:'No track selected';
    if(npA)npA.textContent=s?s.artist:'—';
    const pb=body.querySelector('#mp3-play-btn');if(pb)pb.textContent=MUSIC.playing?'⏸':'▶';
    const ostBtn=body.querySelector('#ost-sidebar-btn');if(ostBtn)ostBtn.textContent=_ostPlaying?'⏸':'▶';
    // keep taskbar in sync too
    _updateMusicBtns();
  };

  renderMusicMain();startVisualizer();
}
function seekMP3(v){const el=document.getElementById('audio-el');if(el&&el.duration)el.currentTime=(v/100)*el.duration;}

/* ══ OST ══ */
const OST_TRACKS={ambient:{name:'FUTURISTIC AMBIENT',notes:[220,277,330,415],tempo:.85,wave:'sine'},battle:{name:'ANIME BATTLE',notes:[293,349,440,523,659],tempo:.32,wave:'square'},calm:{name:'CALM ELECTRONIC',notes:[261,311,392,466,523],tempo:1.15,wave:'triangle'}};
let _audioCtx=null,_masterGain=null,_oscNodes=[],_gainNodes=[],_ostPlaying=false;
function getACtx(){if(!_audioCtx){_audioCtx=new(window.AudioContext||window.webkitAudioContext)();_masterGain=_audioCtx.createGain();_masterGain.gain.value=OS.volume;_masterGain.connect(_audioCtx.destination);}return _audioCtx;}
function stopOscs(){
  // Instantly silence master gain so music cuts immediately
  if(_masterGain){_masterGain.gain.cancelScheduledValues(_audioCtx.currentTime);_masterGain.gain.setValueAtTime(0,_audioCtx.currentTime);}
  // Stop and disconnect all oscillators
  for(const n of _oscNodes){try{n.stop();n.disconnect();}catch(e){}}
  _oscNodes=[];
  // Disconnect all gain/filter nodes from master
  for(const n of _gainNodes){try{n.disconnect();}catch(e){}}
  _gainNodes=[];
  // Restore master gain volume for next play
  setTimeout(()=>{if(_masterGain&&!_ostPlaying)_masterGain.gain.setValueAtTime(OS.volume,_audioCtx.currentTime);},50);
}
function playOST(id){
  const ctx=getACtx();
  if(ctx.state==='suspended')ctx.resume();
  // Restore master gain
  if(_masterGain){_masterGain.gain.cancelScheduledValues(ctx.currentTime);_masterGain.gain.setValueAtTime(OS.volume,ctx.currentTime);}
  const def=OST_TRACKS[id]||OST_TRACKS.ambient;stopOscs();
  // After stopOscs restores gain, we need gain back immediately for playing
  if(_masterGain){_masterGain.gain.cancelScheduledValues(ctx.currentTime);_masterGain.gain.setValueAtTime(OS.volume,ctx.currentTime);}
  const now=ctx.currentTime;
  def.notes.forEach((freq,i)=>{const osc=ctx.createOscillator(),gn=ctx.createGain(),flt=ctx.createBiquadFilter();osc.type=def.wave;osc.frequency.value=freq;flt.type='lowpass';flt.frequency.value=1100;gn.gain.value=0;osc.connect(flt);flt.connect(gn);gn.connect(_masterGain);osc.start();const period=def.tempo*def.notes.length,offset=i*def.tempo;for(let k=0;k<250;k++){const t=now+k*period;gn.gain.setValueAtTime(0,t+(offset%period));gn.gain.linearRampToValueAtTime(.075,t+(offset%period)+.04);gn.gain.linearRampToValueAtTime(0,t+(offset%period)+def.tempo*.68);}_oscNodes.push(osc);_gainNodes.push(gn);_gainNodes.push(flt);});
  const bass=ctx.createOscillator(),bg=ctx.createGain();bass.type='sine';bass.frequency.value=def.notes[0]/2;bg.gain.value=.035;bass.connect(bg);bg.connect(_masterGain);bass.start();_oscNodes.push(bass);_gainNodes.push(bg);
}
function _updateMusicBtns(){const b=document.getElementById('tb-play-btn');if(b)b.textContent=_ostPlaying?'⏸':'▶';const s=document.getElementById('ost-sidebar-btn');if(s)s.textContent=_ostPlaying?'⏸':'▶';const t=document.getElementById('settings-ost-btn');if(t)t.textContent=_ostPlaying?'⏸':'▶';}
function toggleMusic(){
  getACtx();
  if(_ostPlaying){
    _ostPlaying=false;
    stopOscs();
    if(_audioCtx&&_audioCtx.state==='running')_audioCtx.suspend();
  } else {
    _ostPlaying=true;
    if(_audioCtx&&_audioCtx.state==='suspended')_audioCtx.resume();
    playOST(OS.track);
    
  }
  _updateMusicBtns();
}
function selectOSTTrack(id){OS.track=id;LS.set('tob_track',id);if(_ostPlaying)playOST(id);}
function setVolume(v){OS.volume=parseFloat(v);if(_masterGain&&_ostPlaying)_masterGain.gain.value=OS.volume;LS.set('tob_volume',OS.volume);}

/* ══ CALCULATOR APP ══ */
function buildCalculatorApp(body){
  body.style.overflow='hidden';body.style.padding='0';
  // State: operand1, operator, operand2, justPressedOp, justPressedEq
  let disp='0',op=null,val1=null,freshOp=false,freshEq=false;

  body.innerHTML=`<div class="calc-app">
    <div class="calc-display">
      <div class="calc-expr" id="calc-expr"></div>
      <div class="calc-result" id="calc-result">0</div>
    </div>
    <div class="calc-grid">
      <button class="calc-btn calc-btn-clr" data-action="clear">AC</button>
      <button class="calc-btn calc-btn-clr" data-action="sign">+/−</button>
      <button class="calc-btn calc-btn-clr" data-action="percent">%</button>
      <button class="calc-btn calc-btn-op" data-op="/">÷</button>
      <button class="calc-btn calc-btn-num" data-digit="7">7</button>
      <button class="calc-btn calc-btn-num" data-digit="8">8</button>
      <button class="calc-btn calc-btn-num" data-digit="9">9</button>
      <button class="calc-btn calc-btn-op" data-op="*">×</button>
      <button class="calc-btn calc-btn-num" data-digit="4">4</button>
      <button class="calc-btn calc-btn-num" data-digit="5">5</button>
      <button class="calc-btn calc-btn-num" data-digit="6">6</button>
      <button class="calc-btn calc-btn-op" data-op="-">−</button>
      <button class="calc-btn calc-btn-num" data-digit="1">1</button>
      <button class="calc-btn calc-btn-num" data-digit="2">2</button>
      <button class="calc-btn calc-btn-num" data-digit="3">3</button>
      <button class="calc-btn calc-btn-op" data-op="+">+</button>
      <button class="calc-btn calc-btn-num calc-btn-wide" data-digit="0">0</button>
      <button class="calc-btn calc-btn-num" data-action="dot">.</button>
      <button class="calc-btn calc-btn-eq" data-action="equal">=</button>
    </div>
  </div>`;

  const resEl=body.querySelector('#calc-result'),exprEl=body.querySelector('#calc-expr');
  const showDisp=()=>{resEl.textContent=disp;};

  // Digit press
  body.querySelectorAll('[data-digit]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const d=btn.dataset.digit;
      if(freshOp||freshEq){disp=d;freshOp=false;freshEq=false;}
      else disp=(disp==='0'?d:(disp+d));
      showDisp();
    });
  });

  // Dot
  body.querySelector('[data-action="dot"]').addEventListener('click',()=>{
    if(freshOp||freshEq){disp='0.';freshOp=false;freshEq=false;}
    else if(!disp.includes('.'))disp+='.';
    showDisp();
  });

  // Operator press — never auto-insert numbers
  body.querySelectorAll('[data-op]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const newOp=btn.dataset.op;
      // If we already have val1 and op, and user typed a new number → compute first
      if(val1!==null&&op&&!freshOp){
        const result=compute(val1,parseFloat(disp),op);
        disp=fmtNum(result);val1=result;
        exprEl.textContent=fmtNum(result)+' '+opSymbol(newOp);
      } else {
        val1=parseFloat(disp);
        exprEl.textContent=disp+' '+opSymbol(newOp);
      }
      op=newOp;freshOp=true;freshEq=false;
      showDisp();
    });
  });

  // Equal
  body.querySelector('[data-action="equal"]').addEventListener('click',()=>{
    if(op===null||val1===null)return;
    const val2=parseFloat(disp);
    const result=compute(val1,val2,op);
    exprEl.textContent=fmtNum(val1)+' '+opSymbol(op)+' '+fmtNum(val2)+' =';
    disp=fmtNum(result);val1=null;op=null;freshEq=true;freshOp=false;
    showDisp();
  });

  body.querySelector('[data-action="clear"]').addEventListener('click',()=>{
    disp='0';op=null;val1=null;freshOp=false;freshEq=false;exprEl.textContent='';showDisp();
  });
  body.querySelector('[data-action="sign"]').addEventListener('click',()=>{
    disp=String(parseFloat(disp)*-1);showDisp();
  });
  body.querySelector('[data-action="percent"]').addEventListener('click',()=>{
    disp=String(parseFloat(disp)/100);showDisp();
  });

  function compute(a,b,o){
    const r=o==='+'?a+b:o==='-'?a-b:o==='*'?a*b:o==='/'?(b!==0?a/b:0):0;
    return parseFloat(r.toFixed(10));
  }
  function fmtNum(n){const s=String(n);return s.length>12?parseFloat(n.toPrecision(8)).toString():s;}
  function opSymbol(o){return o==='/'?'÷':o==='*'?'×':o;}

  // Keyboard support
  const kh=(e)=>{
    if(!body.closest('.os-window'))return;
    const k=e.key;
    if(/^[0-9]$/.test(k)){body.querySelector(`[data-digit="${k}"]`).click();}
    else if(k==='+')body.querySelector('[data-op="+"]').click();
    else if(k==='-')body.querySelector('[data-op="-"]').click();
    else if(k==='*'||k==='x')body.querySelector('[data-op="*"]').click();
    else if(k==='/')body.querySelector('[data-op="/"]').click();
    else if(k==='Enter'||k==='=')body.querySelector('[data-action="equal"]').click();
    else if(k==='Backspace'){if(!freshOp&&!freshEq){disp=disp.slice(0,-1)||'0';showDisp();}}
    else if(k==='Escape')body.querySelector('[data-action="clear"]').click();
    else if(k==='.')body.querySelector('[data-action="dot"]').click();
  };
  document.addEventListener('keydown',kh);
  const obs=new MutationObserver(()=>{if(!document.contains(body)){document.removeEventListener('keydown',kh);obs.disconnect();}});
  obs.observe(document,{childList:true,subtree:true});
}

/* ══ TOBTUBE ══ */
function buildTobTubeApp(body){
  body.style.overflow='hidden';body.style.padding='0';
  const TT={videos:[],currentIdx:-1,dirHandle:null,dirName:'',knownFiles:new Set(),scanInterval:null};
  const VID_EXTS=['mp4','webm','mov','mkv','avi','m4v'];

  body.innerHTML=`<div class="pettube-app">
    <div class="pettube-topbar">
      <div class="pettube-logo" style="color:var(--neon)">▶ TobTube</div>
      <input class="pettube-search" id="tt-search" placeholder="Search videos..." oninput="ttFilter(this.value)">
      <button id="tt-folder-btn" onclick="ttConnectFolder()" style="padding:6px 14px;border-radius:8px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.3);color:var(--neon);font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;cursor:pointer;white-space:nowrap;letter-spacing:1px;">📂 CONNECT FOLDER</button>
      <button id="tt-disconn-btn" onclick="ttDisconnect()" style="display:none;padding:6px 10px;border-radius:8px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent);font-size:9px;cursor:pointer;font-family:'Share Tech Mono',monospace;">✕</button>
    </div>
    <div class="pettube-body">
      <div class="pettube-sidebar">
        <div class="pettube-nav active" id="tt-nav-home" onclick="ttSetView('home',this)">🏠 Home</div>
        <div class="pettube-nav" id="tt-nav-recent" onclick="ttSetView('recent',this)">🕐 Recent</div>
        <div style="height:1px;background:var(--panel-border);margin:8px 0"></div>
        <div id="tt-folder-bar" style="padding:8px 14px;font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;line-height:1.9">
          No folder connected.<br>Click Connect Folder.
        </div>
        <button onclick="ttScan()" id="tt-scan-btn" disabled style="margin:4px 10px;padding:5px 10px;border-radius:6px;background:rgba(0,180,255,.07);border:1px solid rgba(0,180,255,.2);color:var(--neon);font-size:9px;font-family:'Orbitron',sans-serif;cursor:pointer;width:calc(100% - 20px);">↻ SCAN NOW</button>
      </div>
      <div class="pettube-main" id="tt-main">
        <div id="tt-player-area" style="display:none;margin-bottom:12px;">
          <video id="tt-video-el" controls style="width:100%;border-radius:10px;background:#000;max-height:300px;display:block;"></video>
          <div style="margin-top:8px;">
            <div id="tt-now-title" style="font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--text)"></div>
            <div id="tt-now-meta" style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-top:2px"></div>
            <div id="tt-creator" style="font-size:11px;color:var(--neon);margin-top:4px;font-weight:600"></div>
          </div>
        </div>
        <div id="tt-grid-label" style="font-family:'Orbitron',sans-serif;font-size:10px;color:var(--neon);letter-spacing:3px;margin-bottom:10px;display:none">◈ YOUR VIDEOS</div>
        <div id="tt-empty" style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;gap:14px;">
          <div style="font-size:56px;opacity:.25">▶</div>
          <div style="font-family:'Orbitron',sans-serif;font-size:16px;color:var(--neon);letter-spacing:4px">TOBTUBE</div>
          <div style="font-size:12px;color:var(--text-dim);text-align:center;max-width:280px;line-height:1.7">Connect a video folder to auto-load all your MP4 and WebM files. Drop new videos in the folder and they appear automatically.</div>
          <button onclick="ttConnectFolder()" style="padding:10px 28px;border-radius:10px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;box-shadow:0 0 20px rgba(0,180,255,.3);">📂 CONNECT FOLDER</button>
        </div>
        <div class="pettube-grid" id="tt-grid" style="display:none"></div>
      </div>
    </div>
  </div>`;

  const videoEl=body.querySelector('#tt-video-el');
  videoEl.addEventListener('ended',()=>{if(TT.currentIdx<TT.videos.length-1)ttPlay(TT.currentIdx+1);});

  async function ttConnectFolder(){
    if(!('showDirectoryPicker' in window)){toast('⚠ Use Chrome or Edge for folder support');return;}
    try{
      const handle=await window.showDirectoryPicker({mode:'read'});
      TT.dirHandle=handle;TT.dirName=handle.name;TT.knownFiles=new Set();
      ttUpdateFolderBar();toast(`📂 ${handle.name} connected`);
      await ttScanInternal(true);
      // Auto-scan every 20 seconds
      if(TT.scanInterval)clearInterval(TT.scanInterval);
      TT.scanInterval=setInterval(()=>ttScanInternal(false),20000);
    }catch(e){if(e.name!=='AbortError')toast('⚠ '+e.message);}
  }
  window.ttConnectFolder=ttConnectFolder;

  async function ttScanInternal(notify){
    if(!TT.dirHandle)return;
    const scanBtn=body.querySelector('#tt-scan-btn');if(scanBtn)scanBtn.textContent='⏳ Scanning…';
    try{
      const perm=await TT.dirHandle.requestPermission({mode:'read'});
      if(perm!=='granted'){toast('⚠ Permission denied');return;}
      let newCount=0;
      for await(const entry of TT.dirHandle.values()){
        if(entry.kind!=='file')continue;
        const ext=entry.name.split('.').pop().toLowerCase();
        if(!VID_EXTS.includes(ext))continue;
        if(TT.knownFiles.has(entry.name))continue;
        TT.knownFiles.add(entry.name);
        const file=await entry.getFile();
        const name=entry.name.replace(/\.[^.]+$/,'');
        const parts=name.split(' - ');
        const creator=parts.length>1?parts[0].trim():'Unknown';
        const title=parts.length>1?parts.slice(1).join(' - ').trim():name;
        const sizeStr=file.size>1048576?(file.size/1048576).toFixed(1)+' MB':(file.size/1024).toFixed(0)+' KB';
        TT.videos.push({name:title,creator,fileName:entry.name,src:URL.createObjectURL(file),size:sizeStr,ext:ext.toUpperCase()});
        newCount++;
      }
      if(newCount>0){if(notify)toast(`📺 Found ${newCount} video${newCount>1?'s':''}`);ttRenderGrid();}
    }catch(e){console.warn(e);}
    if(scanBtn){scanBtn.textContent='↻ SCAN NOW';}
    ttUpdateFolderBar();
  }
  window.ttScan=()=>ttScanInternal(true);

  function ttDisconnect(){
    if(TT.scanInterval){clearInterval(TT.scanInterval);TT.scanInterval=null;}
    TT.dirHandle=null;TT.dirName='';TT.videos=[];TT.knownFiles=new Set();TT.currentIdx=-1;
    videoEl.pause();videoEl.src='';
    body.querySelector('#tt-player-area').style.display='none';
    ttUpdateFolderBar();ttRenderGrid();toast('📂 Folder disconnected');
  }
  window.ttDisconnect=ttDisconnect;

  function ttUpdateFolderBar(){
    const bar=body.querySelector('#tt-folder-bar');
    const btn=body.querySelector('#tt-folder-btn');
    const dbtn=body.querySelector('#tt-disconn-btn');
    const sbtn=body.querySelector('#tt-scan-btn');
    if(TT.dirHandle){
      if(bar)bar.innerHTML=`<span style="color:var(--neon3)">📂 ${TT.dirName}</span><br>${TT.videos.length} video${TT.videos.length!==1?'s':''} · auto-scan 20s`;
      if(btn){btn.textContent='📂 '+TT.dirName;btn.style.background='rgba(0,180,255,.15)';}
      if(dbtn)dbtn.style.display='inline-block';
      if(sbtn)sbtn.disabled=false;
    } else {
      if(bar)bar.innerHTML='No folder connected.<br>Click Connect Folder.';
      if(btn){btn.textContent='📂 CONNECT FOLDER';btn.style.background='rgba(0,180,255,.1)';}
      if(dbtn)dbtn.style.display='none';
      if(sbtn)sbtn.disabled=true;
    }
  }

  function ttRenderGrid(filter=''){
    const emptyEl=body.querySelector('#tt-empty');
    const grid=body.querySelector('#tt-grid');
    const label=body.querySelector('#tt-grid-label');
    const vids=TT.videos.filter(v=>!filter||v.name.toLowerCase().includes(filter.toLowerCase())||v.creator.toLowerCase().includes(filter.toLowerCase()));
    if(!TT.videos.length){emptyEl.style.display='flex';grid.style.display='none';if(label)label.style.display='none';return;}
    emptyEl.style.display='none';grid.style.display='grid';if(label)label.style.display='block';
    const bgCols=['linear-gradient(135deg,#001040,#002070)','linear-gradient(135deg,#100020,#300050)','linear-gradient(135deg,#002010,#004030)','linear-gradient(135deg,#201000,#402000)'];
    grid.innerHTML='';
    vids.forEach((v,i)=>{
      const idx=TT.videos.indexOf(v);
      const card=document.createElement('div');card.className='pettube-card';
      card.innerHTML=`<div class="pettube-thumb" style="background:${bgCols[i%bgCols.length]};position:relative;">
        <div style="font-size:28px">▶</div>
        <div style="position:absolute;bottom:4px;right:5px;font-size:8px;font-family:'Share Tech Mono',monospace;background:rgba(0,0,0,.7);color:rgba(255,255,255,.6);padding:1px 5px;border-radius:3px">${v.ext}</div>
        <div style="position:absolute;bottom:4px;left:5px;font-size:8px;font-family:'Share Tech Mono',monospace;background:rgba(0,0,0,.7);color:rgba(255,255,255,.5);padding:1px 5px;border-radius:3px">${v.size}</div>
      </div>
      <div class="pettube-card-info">
        <div class="pettube-card-title">${v.name}</div>
        <div class="pettube-card-meta" style="color:var(--neon);margin-top:1px">${v.creator}</div>
      </div>`;
      card.addEventListener('click',()=>ttPlay(idx));
      grid.appendChild(card);
    });
    if(!vids.length)grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;font-size:11px;color:var(--text-muted);font-family:'Share Tech Mono',monospace">No videos match "${filter}"</div>`;
  }

  function ttPlay(idx){
    if(idx<0||idx>=TT.videos.length)return;
    TT.currentIdx=idx;const v=TT.videos[idx];
    body.querySelector('#tt-player-area').style.display='block';
    videoEl.src=v.src;videoEl.play().catch(()=>{});
    body.querySelector('#tt-now-title').textContent=v.name;
    body.querySelector('#tt-now-meta').textContent=`${v.ext} · ${v.size}`;
    body.querySelector('#tt-creator').textContent='▶ '+v.creator;
    body.querySelector('#tt-player-area').scrollIntoView({behavior:'smooth'});
    // Highlight active card
    body.querySelectorAll('.pettube-card').forEach((c,i)=>c.style.outline=i===idx?'2px solid rgba(0,180,255,.5)':'');
  }

  window.ttFilter=(q)=>ttRenderGrid(q);
  window.ttSetView=(view,navEl)=>{
    body.querySelectorAll('.pettube-nav').forEach(n=>n.classList.remove('active'));
    if(navEl)navEl.classList.add('active');
    ttRenderGrid();
  };

  ttUpdateFolderBar();
}

/* ══ MOD MANAGER ══ */
const BUILTIN_MODS=[
  {id:'neon_pink',name:'Neon Pink Theme',desc:'Hot pink accent overlay',version:'1.0',icon:'🌸',enabled:false,builtin:true,tab:'system'},
  {id:'matrix_bg',name:'Matrix Rain',desc:'Classic green matrix effect',version:'1.2',icon:'💚',enabled:false,builtin:true,tab:'system'},
  {id:'crt_heavy',name:'Heavy CRT Filter',desc:'Strong scanline effect',version:'1.0',icon:'📺',enabled:false,builtin:true,tab:'system'},
  {id:'glass_ui',name:'Liquid Glass UI',desc:'Apple-style glass blur panels',version:'2.0',icon:'🔮',enabled:false,builtin:true,tab:'system'},
  {id:'win11',name:'Windows 11 Theme',desc:'Fluent UI rounded corners',version:'1.1',icon:'🪟',enabled:false,builtin:true,tab:'system'},
  {id:'blue_theme',name:'Blue Theme',desc:'Deep ocean blue accent & wallpaper',version:'1.0',icon:'🔵',enabled:false,builtin:true,tab:'system'},
  {id:'cyber_sunset',name:'Cyber Sunset Theme',desc:'Neon magenta and amber skyline glow',version:'1.0',icon:'🌆',enabled:false,builtin:true,tab:'system'},
  {id:'arctic_frost',name:'Arctic Frost Theme',desc:'Ice-blue glass with frosted aurora accents',version:'1.0',icon:'🧊',enabled:false,builtin:true,tab:'system'},
  {id:'volcanic_core',name:'Volcanic Core Theme',desc:'Molten lava reds with ember highlights',version:'1.0',icon:'🌋',enabled:false,builtin:true,tab:'system'},
  {id:'synthwave_grid',name:'Synthwave Grid Theme',desc:'Retro purple grid with hot pink neon',version:'1.0',icon:'🌃',enabled:false,builtin:true,tab:'system'},
  {id:'starlight_gold',name:'Starlight Gold Theme',desc:'Deep space navy with gilded highlights',version:'1.0',icon:'✨',enabled:false,builtin:true,tab:'system'},
  {id:'ui_sounds',name:'UI Sound FX',desc:'Adds click sound effects',version:'1.1',icon:'🔊',enabled:false,builtin:true,tab:'system'},
  {id:'calc_sci',name:'Calculator: Sci Mode',desc:'Scientific calculator mode',version:'1.0',icon:'🧮',enabled:false,builtin:true,tab:'apps'},
  {id:'tobtube_hd',name:'TobTube: HD Mode',desc:'Higher resolution video thumbnails',version:'1.0',icon:'📺',enabled:false,builtin:true,tab:'apps'},
  {id:'ben10',name:'Ben 10 Theme',desc:'Omnitrix green UI, alien transformation FX, animated Omnitrix dial',version:'1.0',icon:'🟢',enabled:false,builtin:true,tab:'system'},
  {id:'stranger',name:'Stranger Things Theme',desc:'Upside Down red UI, string lights, vine overlay, heavy scanlines',version:'1.0',icon:'🔴',enabled:false,builtin:true,tab:'system'},
  {id:'miraculous',name:'Miraculous Ladybug Theme',desc:'Pink/red spotted UI, Kwami transformation FX, Ladybug & Cat Noir vibes',version:'1.0',icon:'🐞',enabled:false,builtin:true,tab:'system'},
  {id:'jjk',name:'Jujutsu Kaisen Theme',desc:'Cursed energy purple UI, Domain Expansion activation, curse technique effects',version:'1.0',icon:'💜',enabled:false,builtin:true,tab:'system'},
];
function getActiveMods(){return[...BUILTIN_MODS,...OS.mods];}
const EXCLUSIVE_THEME_MOD_IDS=['ben10','stranger','miraculous','jjk','cyber_sunset','arctic_frost','volcanic_core','synthwave_grid','starlight_gold'];
function disableThemeSideEffects(id){
  if(id==='ben10')document.getElementById('omnitrix-hud')&&(document.getElementById('omnitrix-hud').style.display='none');
  if(id==='stranger')StrangerFX&&StrangerFX.destroy();
  if(id==='miraculous')MiraculousFX&&MiraculousFX.destroy();
  if(id==='jjk')JJKFxSystem&&JJKFxSystem.destroy();
}
function activateExclusiveTheme(modId, onEnable){
  EXCLUSIVE_THEME_MOD_IDS.forEach(tid=>{
    if(tid===modId)return;
    const m2=getActiveMods().find(m=>m.id===tid);
    if(m2&&m2.enabled){
      m2.enabled=false;
      disableThemeSideEffects(tid);
      LS.set('tob_mod_'+tid,false);
    }
  });
  document.documentElement.setAttribute('data-theme-id',modId);
  if(typeof onEnable==='function')onEnable();
}
function toggleMod(id){
  const mod=getActiveMods().find(m=>m.id===id);if(!mod)return;
  mod.enabled=!mod.enabled;
  if(!mod.builtin){const idx=OS.mods.findIndex(m=>m.id===id);if(idx>=0)OS.mods[idx].enabled=mod.enabled;LS.set('tob_mods',OS.mods);}
  LS.set('tob_mod_'+id,mod.enabled);applyMod(mod);refreshModApp();
  toast(`${mod.enabled?'✓ Enabled':'✗ Disabled'}: ${mod.name}`);adminLog(`Mod ${mod.enabled?'enabled':'disabled'}: ${mod.name}`);
}
function applyMod(mod){
  if(mod.id==='neon_pink')document.documentElement.style.setProperty('--neon',mod.enabled?'#ff2d9e':'');
  if(mod.id==='crt_heavy'){const s=document.getElementById('scanlines');if(s)s.style.opacity=mod.enabled?'4':'1';}
  if(mod.id==='matrix_bg'){mod.enabled?startMatrixRain():stopMatrixRain();}
  if(mod.id==='glass_ui')document.documentElement.setAttribute('data-mod-glass',mod.enabled?'1':'0');
  if(mod.id==='win11')document.documentElement.setAttribute('data-mod-win11',mod.enabled?'1':'0');
  if(mod.id==='ui_sounds'&&mod.enabled)enableSoundFX();
  if(mod.id==='ben10'){
    if(mod.enabled){
      activateExclusiveTheme('ben10',()=>OmnitrixFX.init());
    } else {
      if(document.documentElement.getAttribute('data-theme-id')==='ben10')
        document.documentElement.removeAttribute('data-theme-id');
      document.getElementById('omnitrix-hud').style.display='none';
    }
  }
  if(mod.id==='stranger'){
    if(mod.enabled){
      activateExclusiveTheme('stranger',()=>StrangerFX.init());
    } else {
      if(document.documentElement.getAttribute('data-theme-id')==='stranger')
        document.documentElement.removeAttribute('data-theme-id');
      StrangerFX.destroy();
    }
  }
  if(mod.id==='blue_theme'){
    if(mod.enabled){
      document.documentElement.style.setProperty('--neon','#1e90ff');
      document.documentElement.style.setProperty('--accent','#1e90ff');
      document.documentElement.style.setProperty('--neon3','#00bfff');
      applyWallpaper('wp-energy');
    } else {
      document.documentElement.style.removeProperty('--neon');
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--neon3');
    }
  }
  if(mod.id==='miraculous'){
    if(mod.enabled){
      activateExclusiveTheme('miraculous',()=>MiraculousFX.init());
    } else {
      if(document.documentElement.getAttribute('data-theme-id')==='miraculous')
        document.documentElement.removeAttribute('data-theme-id');
      MiraculousFX.destroy();
    }
  }
  if(mod.id==='jjk'){
    if(mod.enabled){
      activateExclusiveTheme('jjk',()=>JJKFxSystem.init());
    } else {
      if(document.documentElement.getAttribute('data-theme-id')==='jjk')
        document.documentElement.removeAttribute('data-theme-id');
      JJKFxSystem.destroy();
    }
  }
  if(mod.id==='cyber_sunset' || mod.id==='arctic_frost' || mod.id==='volcanic_core' || mod.id==='synthwave_grid' || mod.id==='starlight_gold'){
    if(mod.enabled){
      activateExclusiveTheme(mod.id);
    } else if(document.documentElement.getAttribute('data-theme-id')===mod.id){
      document.documentElement.removeAttribute('data-theme-id');
    }
  }
  /* storeApps: inject/remove entries from APP_STORE_CATALOG */
  if(mod.storeApps && Array.isArray(mod.storeApps)){
    if(mod.enabled){
      mod.storeApps.forEach(function(app){
        if(!APP_STORE_CATALOG.find(function(a){return a.id===app.id;})){
          APP_STORE_CATALOG.push(app);
        }
      });
    } else {
      var ids=new Set(mod.storeApps.map(function(a){return a.id;}));
      for(var i=APP_STORE_CATALOG.length-1;i>=0;i--){
        if(ids.has(APP_STORE_CATALOG[i].id)) APP_STORE_CATALOG.splice(i,1);
      }
    }
  }
}
let _matrixCv=null;
function startMatrixRain(){if(_matrixCv)return;_matrixCv=document.createElement('canvas');_matrixCv.style.cssText='position:fixed;inset:0;z-index:3;pointer-events:none;opacity:0.08;';document.body.appendChild(_matrixCv);const ctx=_matrixCv.getContext('2d');const resize=()=>{_matrixCv.width=innerWidth;_matrixCv.height=innerHeight;};resize();addEventListener('resize',resize,{passive:true});const drops=Array(500).fill(1);setInterval(()=>{if(!_matrixCv)return;ctx.fillStyle='rgba(0,0,0,.05)';ctx.fillRect(0,0,_matrixCv.width,_matrixCv.height);ctx.fillStyle='#00ff41';ctx.font='13px monospace';drops.forEach((y,i)=>{ctx.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*14,y*14);drops[i]=y*14>_matrixCv.height&&Math.random()>.975?0:y+1;});},45);}
function stopMatrixRain(){if(_matrixCv){_matrixCv.remove();_matrixCv=null;}}
function enableSoundFX(){const ctx=getACtx();const click=()=>{try{const o=ctx.createOscillator(),g=ctx.createGain();o.connect(g);g.connect(ctx.destination);o.frequency.value=800;g.gain.setValueAtTime(.04,ctx.currentTime);g.gain.linearRampToValueAtTime(0,ctx.currentTime+.06);o.start();o.stop(ctx.currentTime+.06);}catch(e){}};if(!document.body.dataset.sfxOn){document.body.dataset.sfxOn='1';document.body.addEventListener('click',click,{capture:true});}}
function handleModInstall(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const mod=JSON.parse(r.result);if(!mod.id||!mod.name)throw new Error('Invalid');mod.builtin=false;mod.tab=mod.tab||'system';mod.enabled=!!(mod.storeApps);if(!OS.mods.find(m=>m.id===mod.id)){OS.mods.push(mod);LS.set('tob_mods',OS.mods);}applyMod(mod);refreshModApp();var sc=mod.storeApps?' ('+mod.storeApps.length+' games added to App Store)':'';toast('📦 Installed: '+mod.name+sc);}catch(err){toast('⚠ Invalid mod file');}};r.readAsText(f);e.target.value='';}
function uninstallMod(id){OS.mods=OS.mods.filter(m=>m.id!==id);LS.set('tob_mods',OS.mods);refreshModApp();toast('🗑 Mod removed');}
let _modActiveTab='system';
function refreshModApp(){const r=document.querySelector('.mod-content');if(!r)return;r.innerHTML=buildModTabContent(_modActiveTab);}
function buildModTabContent(tab){
  const mods=getActiveMods().filter(m=>m.tab===tab||(tab==='installed'&&!m.builtin));
  let h='';
  if(tab==='installed'){
    const custom=getActiveMods().filter(m=>!m.builtin);
    if(!custom.length)h=`<div style="font-size:11px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;padding:20px;text-align:center">No custom mods installed</div>`;
    custom.forEach(m=>{h+=modCardHTML(m);});
    h+=`<div class="mod-install-area" onclick="document.getElementById('mod-file-input').click()"><div style="font-size:28px">📦</div><div style="font-size:12px;font-weight:600;color:var(--text-dim);margin-top:4px">Install Mod Package (.json)</div></div>`;
  }else{
    const filtered=getActiveMods().filter(m=>m.tab===tab);
    if(!filtered.length)h=`<div style="font-size:11px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;padding:20px;text-align:center">No mods in this category</div>`;
    filtered.forEach(m=>{h+=modCardHTML(m);});
  }
  return h;
}
function modCardHTML(m){return`<div class="mod-card"><div class="mod-card-icon">${m.icon||'📦'}</div><div class="mod-card-info"><div class="mod-card-name">${m.name}</div><div class="mod-card-desc">${m.desc||''}</div><div class="mod-card-version">v${m.version||'1.0'}</div></div><div class="mod-card-actions"><div class="mod-toggle ${m.enabled?'on':''}" onclick="toggleMod('${m.id}')"></div>${!m.builtin?`<button class="mod-uninstall" onclick="uninstallMod('${m.id}')">REMOVE</button>`:''}</div></div>`;}
function buildModApp(body){
  body.style.overflow='hidden';body.style.background='var(--bg)';
  const root=document.createElement('div');root.className='mod-app';
  root.innerHTML=`<div class="mod-tabs"><div class="mod-tab active" data-tab="system">SYSTEM</div><div class="mod-tab" data-tab="apps">APPS</div><div class="mod-tab" data-tab="installed">INSTALLED</div></div><div class="mod-content"></div>`;
  body.appendChild(root);
  root.querySelectorAll('.mod-tab').forEach(t=>{t.addEventListener('click',()=>{root.querySelectorAll('.mod-tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');_modActiveTab=t.dataset.tab;refreshModApp();});});
  refreshModApp();
}

/* ══ ADMIN PANEL ══ */
const _adminLog=[];
function adminLog(msg){_adminLog.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);if(_adminLog.length>50)_adminLog.pop();const el=document.querySelector('.admin-log');if(el)el.innerHTML=_adminLog.join('<br>');}
function checkAdminKey(){const input=document.getElementById('admin-key-input').value.trim();const VALID_KEYS=['TOBOS-ADMIN-2025','admin.key','TOB_ADMIN'];if(VALID_KEYS.includes(input)){OS.adminUnlocked=true;LS.set('tob_admin',true);closeModal('admin-key-modal');openApp('admin');toast('🔓 Admin Panel Unlocked!');}else{toast('⚠ Invalid admin key');document.getElementById('admin-key-input').style.borderColor='var(--accent)';setTimeout(()=>{document.getElementById('admin-key-input').style.borderColor='';},1500);}}
function handleAdminKeyFile(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{document.getElementById('admin-key-input').value=r.result.trim();checkAdminKey();};r.readAsText(f);e.target.value='';}
function buildAdminApp(body){
  body.style.overflow='hidden';
  const perfData={memory:Math.round(performance.memory?.usedJSHeapSize/1048576)||'N/A',total:Math.round(performance.memory?.totalJSHeapSize/1048576)||'N/A'};
  body.innerHTML=`<div class="admin-app">
    <div class="admin-header">
      <div class="admin-badge">🔐 ADMIN</div>
      <span style="font-family:'Orbitron',sans-serif;font-size:10px;color:var(--accent);letter-spacing:2px">TOB OS ADMIN PANEL</span>
      <span style="margin-left:auto;font-size:9px;font-family:'Share Tech Mono',monospace;color:var(--text-muted)">v${TOB_VERSION}</span>
    </div>
    <div class="admin-content">
      <div class="admin-card">
        <div class="admin-card-title">SYSTEM STATS</div>
        <div class="admin-stat"><span>OS Version</span><span class="admin-stat-val">${TOB_VERSION}</span></div>
        <div class="admin-stat"><span>JS Heap</span><span class="admin-stat-val">${perfData.memory}MB</span></div>
        <div class="admin-stat"><span>Heap Limit</span><span class="admin-stat-val">${perfData.total}MB</span></div>
        <div class="admin-stat"><span>Open Windows</span><span class="admin-stat-val" id="admin-win-count">${WM.windows.size}</span></div>
        <div class="admin-stat"><span>Active Mods</span><span class="admin-stat-val">${getActiveMods().filter(m=>m.enabled).length}</span></div>
        <div class="admin-stat"><span>Apps Visible</span><span class="admin-stat-val">${getVisibleApps().length}</span></div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">CONTROLS</div>
        <div class="admin-btn-grid">
          <button class="admin-btn admin-btn-info" onclick="adminReload()">↻ Reload OS</button>
          <button class="admin-btn admin-btn-info" onclick="adminCloseAll()">✕ Close All Windows</button>
          <button class="admin-btn admin-btn-warn" onclick="adminClearStorage()">🗑 Clear All Data</button>
          <button class="admin-btn admin-btn-warn" onclick="adminResetGrid()">⊞ Reset Desktop Grid</button>
          <button class="admin-btn admin-btn-danger" onclick="adminUnlockAll()">🔓 Restore All Hidden Apps</button>
          <button class="admin-btn admin-btn-info" onclick="adminToggleDebug()">🐛 Toggle Debug Mode</button>
          <button class="admin-btn admin-btn-warn" onclick="adminStressTest()">⚡ Stress Test</button>
          <button class="admin-btn" style="background:rgba(100,255,100,.08);border:1px solid rgba(100,255,100,.3);color:#80ff80;" onclick="document.getElementById('admin-key-file').click()">📂 Load admin.key File</button>
        </div>
      </div>
      <div class="admin-card">
        <div class="admin-card-title">RUNNING PROCESSES</div>
        <div id="admin-procs"></div>
      </div>
      <div class="admin-card" style="grid-column:span 1">
        <div class="admin-card-title">SYSTEM LOG</div>
        <div class="admin-log" id="admin-sys-log">${_adminLog.join('<br>')||'No events yet.'}</div>
      </div>
    </div>
  </div>`;
  function updateProcs(){const el=body.querySelector('#admin-procs');if(!el)return;let h='';WM.windows.forEach(w=>{h+=`<div class="admin-proc-item"><span class="admin-proc-name">${w.icon} ${w.title}</span><button class="admin-proc-kill" onclick="WM.close('${w.id}');updateAdminProcs()">KILL</button></div>`;});el.innerHTML=h||'<div style="font-size:10px;color:var(--text-muted)">No processes running</div>';}
  window.updateAdminProcs=updateProcs;updateProcs();
  setInterval(()=>{const wc=body.querySelector('#admin-win-count');if(wc)wc.textContent=WM.windows.size;const sl=body.querySelector('#admin-sys-log');if(sl)sl.innerHTML=_adminLog.join('<br>')||'No events.';updateProcs();},2000);
}
function adminReload(){toast('↻ Reloading OS...');setTimeout(()=>location.reload(),1000);}
function adminCloseAll(){[...WM.windows.keys()].forEach(id=>WM.close(id));toast('✕ All windows closed');}
function adminClearStorage(){if(confirm('Clear ALL TOB OS data? This cannot be undone.')){localStorage.clear();adminReload();}}
function adminResetGrid(){OS.gridSlots={};LS.set('tob_grid',{});buildDesktopIcons();toast('⊞ Grid reset');}
function adminUnlockAll(){OS.hiddenApps=[];LS.set('tob_hidden',[]);buildDesktopIcons();toast('🔓 All apps restored');}
function adminToggleDebug(){document.body.classList.toggle('debug');toast('🐛 Debug mode '+(document.body.classList.contains('debug')?'ON':'OFF'));}
function adminStressTest(){let count=0;const interval=setInterval(()=>{toast('⚡ Stress test frame '+count);count++;if(count>20)clearInterval(interval);},100);toast('⚡ Running stress test...');}

/* ══ UPDATE LOG ══ */
function buildUpdateLogApp(body){
  body.style.overflow='hidden';
  const root=document.createElement('div');root.className='updatelog-app';
  root.innerHTML=`<div class="set-title">📋 UPDATE LOG</div>
  <div class="changelog-entry changelog-major">
    <div class="changelog-version">◈ TOB OS v17.0.0 <span style="color:var(--text-muted);font-size:9px">— CURRENT · DYNAMIC ISLAND &amp; STORY EDITION</span></div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Dynamic Island Hub</strong> — live farm day/event chips, quick open buttons, and richer media controls</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Pocket Farmer 2.0</strong> — multi-seed economy, weather, random events, pests, contracts, and crossover boosts</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Interactive Storybook</strong> — branching dialogue chapters with multiple endings and bond tracking</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>NeonShell v2.0</strong> — package commands like <strong>sudo apt install minecraft</strong> with store sync</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>BlockVerse United</strong> — Minecraft-style crossover run inspired by Pokemon, Miraculous, Fortnite, One Piece, and Blue Lock</div>
    <div class="changelog-item"><span class="changelog-tag tag-fix">FIX</span>First-launch update log trigger now keys off version 17.0.0 and appears automatically after boot</div>
    <div class="changelog-item"><span class="changelog-tag tag-change">REMOVED</span>Abil Pixel Quest removed from App Store catalog</div>
    <div class="changelog-item"><span class="changelog-tag tag-change">REMOVED</span>Codex Dashboard removed from App Store catalog</div>
  </div>
  <div class="changelog-entry changelog-major">
    <div class="changelog-version">◈ TOB OS v6.0.0</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Built-in <strong>Calculator App</strong> — basic and scientific operations, keyboard support</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Built-in <strong>Web Browser</strong> — tabbed browsing, bookmarks, crash detection & auto-close</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Browser tabs now clean up memory on close — no background instances</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>PetTube</strong> rewritten from scratch — fast, no lag, instant load</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Admin Panel</strong> — unlock with admin.key file or key code "TOBOS-ADMIN-2025"</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Admin Panel shows running processes, system stats, log, and controls</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Mod Manager</strong> now has tabs — System, Apps, Installed</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Liquid Glass UI mod</strong> — Apple-style blur/transparency</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span><strong>Windows 11 theme mod</strong> — Fluent UI rounded corners</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Update Log now has its own dedicated app</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Calculator: Sci Mode and Browser: Dark Reader as app mods</div>
    <div class="changelog-item"><span class="changelog-tag tag-fix">FIX</span>All windows now properly terminate iframes on close — zero background lag</div>
    <div class="changelog-item"><span class="changelog-tag tag-fix">FIX</span>PetTube no longer freezes OS during load</div>
    <div class="changelog-item"><span class="changelog-tag tag-fix">FIX</span>Browser tabs clean up memory on close</div>
    <div class="changelog-item"><span class="changelog-tag tag-change">CHANGE</span>Mod Manager reorganized with category tabs</div>
  </div>
  <div class="changelog-entry changelog-major">
    <div class="changelog-version">◈ TOB OS v5.0.0</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Renamed from NEXOS to TOB OS</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>iOS-style snapping icon grid</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>App Vault — recover hidden apps</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Music player with File System Access API folder watching</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>Music auto-scans folder every 20 seconds</div>
    <div class="changelog-item"><span class="changelog-tag tag-new">NEW</span>PetTube integration via iframe</div>
    <div class="changelog-item"><span class="changelog-tag tag-fix">FIX</span>Icon positions persist after drag-swap</div>
  </div>
  <div class="changelog-entry">
    <div class="changelog-version">◈ NEXOS OS v4.0.0</div>
    <div class="changelog-item">Windows-style taskbar with live running apps</div>
    <div class="changelog-item">Battery monitor via Navigator Battery API</div>
    <div class="changelog-item">Desktop Pets system (5 pixel art pets)</div>
    <div class="changelog-item">Mod Manager with built-in and custom mods</div>
    <div class="changelog-item">Synth OST music (3 tracks, no audio files needed)</div>
    <div class="changelog-item">Start Menu launcher</div>
  </div>
  <div class="changelog-entry">
    <div class="changelog-version">◈ NEXOS OS v3.0.0</div>
    <div class="changelog-item">Sidebar-based app launcher</div>
    <div class="changelog-item">Fractured Frames game integration</div>
    <div class="changelog-item">Blue Lock Striker mini-game</div>
    <div class="changelog-item">Custom app creator</div>
    <div class="changelog-item">Wallpaper system with localStorage persistence</div>
  </div>`;
  body.appendChild(root);
}

/* ══ APPS ══ */
const BUILTIN_APPS=[
  {id:'calc',      label:'Calculator',    icon:'🧮',color:'#001830'},
  {id:'music',     label:'Music Player',  icon:'🎵',color:'#001030'},
  {id:'video',     label:'TobTube',       icon:'📺',color:'#150020'},
  {id:'taskmgr',   label:'Task Manager',  icon:'📊',color:'#001520'},
  {id:'mods',      label:'Mod Manager',   icon:'🔧',color:'#1a1000'},
  {id:'pets',      label:'Desktop Pets',  icon:'🐱',color:'#001520'},
  {id:'vault',     label:'App Vault',     icon:'🗄️',color:'#1a0010'},
  {id:'creator',   label:'App Creator',   icon:'✦',  color:'#0a0030'},
  {id:'modtutorial',label:'Mod Guide',    icon:'📖', color:'#0a1800'},
  {id:'updatelog', label:'Update Log',    icon:'📋', color:'#001820'},
  {id:'appstore',  label:'App Store',  icon:'🛍️',color:'#001030'},
  {id:'finder',    label:'Finder',         icon:'📁', color:'#001530'},
  {id:'boot-studio',label:'Boot Studio',  icon:'🎨', color:'#001428'},
  {id:'widget-lab', label:'Widget Lab',   icon:'🧩', color:'#001428'},
  {id:'settings',  label:'Settings',      icon:'⚙️',color:'#030e1e'},
  {id:'rhythmforge',label:'RhythmForge',   icon:'🎵',color:'#050005'},
];

function openApp(id){
  if(_deleteMode){hideApp(id);return;}
  const custom=OS.customApps.find(a=>a.id===id);
  if(custom){openCustomApp(custom);return;}
  switch(id){
    case 'pets':       WM.create('pets','DESKTOP PETS','🐱',440,380,buildPetsApp);break;
    case 'calc':       WM.create('calc','CALCULATOR','🧮',320,480,buildCalculatorApp);break;
    case 'music':      WM.create('music','MUSIC PLAYER','🎵',860,560,buildMusicApp);break;
    case 'video':      WM.create('video','TOBTUBE','📺',860,580,buildTobTubeApp);break;
    case 'taskmgr':    WM.create('taskmgr','TASK MANAGER','📊',640,480,buildTaskMgrApp);break;
    case 'mods':       WM.create('mods','MOD MANAGER','🔧',560,480,buildModApp);break;
    case 'vault':      openVault();break;
    case 'creator':    openModal('ac-modal');break;
    case 'modtutorial':WM.create('modtutorial','MOD GUIDE','📖',620,520,buildModTutorialApp);break;
    case 'updatelog':  WM.create('updatelog','UPDATE LOG','📋',600,500,buildUpdateLogApp);break;
    case 'admin':      openSettings();toast('🔐 Admin panel is now in Settings');break;
    case 'appstore':   openAppStore();break;
    case 'finder':     openFinder();break;
    case 'settings':   openSettings();break;
    case 'boot-studio': BootStudio.open();break;
    case 'rhythmforge':WM.create('rhythmforge','RHYTHMFORGE','🎵',920,600,buildRhythmForgeApp);break;
    case 'widget-lab':  WidgetLab.open();break;
    default:toast('⚠ App not found: '+id);
  }
  closeStartMenuIfOpen();
}

function openCustomApp(meta){
  const s={sm:[480,360],md:[700,480],lg:[900,580]};const[w,h]=s[meta.size]||s.md;
  WM.create(meta.id,(meta.label||meta.id).replace('\n',' '),meta.icon||'📱',w,h,body=>{
    const iframe=document.createElement('iframe');
    if(meta.type==='html')iframe.srcdoc=meta.html||`<body style="background:#010812;color:#fff;padding:20px">No content
<!-- WIDGET PANEL -->
<div id="widget-panel">
  <div class="widget-panel-header">
    <span class="widget-panel-title">◈ WIDGETS</span>
    <button class="widget-close-btn" onclick="toggleWidgetPanel(false)">✕</button>
  </div>
  <div id="widget-list"></div>
</div>
<div id="edge-swipe-indicator"></div>
<!-- SWIPE CC ZONE -->
<div id="cc-swipe-zone"></div>

</body>`;
    else iframe.src=meta.url||'about:blank';
    iframe.style.cssText='width:100%;height:100%;border:none;';body.appendChild(iframe);
  });
}

/* ── Vault ── */
function openVault(){WM.create('vault','APP VAULT','🗄️',500,420,buildVaultApp);}
function buildVaultApp(body){
  body.style.overflow='hidden';const root=document.createElement('div');root.className='vault-app';
  root.innerHTML=`<div class="vault-title">🗄️ APP VAULT</div><div class="vault-subtitle">Apps hidden from the desktop.<br>Tap RESTORE to bring any app back.</div>`;
  if(OS.hiddenApps.length===0){root.innerHTML+=`<div class="vault-empty"><div style="font-size:48px;opacity:.3">✨</div><div style="font-size:11px;font-family:'Share Tech Mono',monospace;color:var(--text-muted)">NO HIDDEN APPS</div></div>`;}
  else{const grid=document.createElement('div');grid.className='vault-grid';OS.hiddenApps.forEach(id=>{const app=getAllApps().find(a=>a.id===id);if(!app)return;const card=document.createElement('div');card.className='vault-card';card.innerHTML=`<span class="vault-card-icon">${app.icon||'📱'}</span><div class="vault-card-name">${(app.label||app.id).replace('\n',' ')}</div><button class="vault-restore-btn" onclick="restoreApp('${id}')">↑ RESTORE</button>`;grid.appendChild(card);});root.appendChild(grid);}
  body.appendChild(root);
}

/* ── Pet Settings ── */

/* ── Settings ── */
function openSettings(){
  WM.create('settings','SETTINGS','⚙️',500,640,body=>{
    body.style.overflow='hidden';
    const root=document.createElement('div');root.className='set-root';
    root.style.height='100%';root.style.overflowY='auto';

    function renderSettings(){
      const perfData={memory:Math.round(performance.memory?.usedJSHeapSize/1048576)||'N/A',total:Math.round(performance.memory?.totalJSHeapSize/1048576)||'N/A'};
      root.innerHTML=`<div class="set-title">◈ SYSTEM SETTINGS</div>

      <div class="set-section"><div class="set-section-title">Display</div>
        <div class="toggle-row"><span class="toggle-lbl">Dark Mode</span><div class="toggle-sw ${OS.theme==='dark'?'on':''}" id="dark-toggle"></div></div>
      </div>


      <div class="set-section"><div class="set-section-title">🚀 Boot Animation</div>
        <div style="font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-bottom:8px">Choose the animation style shown when TOB OS starts up.</div>
        <div class="boot-style-select" id="boot-style-sel">
          <div class="boot-style-btn ${LS.get('tob_boot_style','neon_pulse')==='neon_pulse'?'active':''}" onclick="BOOT_ANIM.style='neon_pulse';LS.set('tob_boot_style','neon_pulse');document.querySelectorAll('.boot-style-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');toast('🌟 Neon Pulse selected')">Neon Pulse</div>
          <div class="boot-style-btn ${LS.get('tob_boot_style','neon_pulse')==='cyber_grid'?'active':''}" onclick="BOOT_ANIM.style='cyber_grid';LS.set('tob_boot_style','cyber_grid');document.querySelectorAll('.boot-style-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');toast('⬛ Cyber Grid selected')">Cyber Grid</div>
          <div class="boot-style-btn ${LS.get('tob_boot_style','neon_pulse')==='matrix_boot'?'active':''}" onclick="BOOT_ANIM.style='matrix_boot';LS.set('tob_boot_style','matrix_boot');document.querySelectorAll('.boot-style-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');toast('💚 Matrix Boot selected')">Matrix Boot</div>
          <div class="boot-style-btn ${LS.get('tob_boot_style','neon_pulse')==='energy_wave'?'active':''}" onclick="BOOT_ANIM.style='energy_wave';LS.set('tob_boot_style','energy_wave');document.querySelectorAll('.boot-style-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active');toast('🌊 Energy Wave selected')">Energy Wave</div>
        </div>
        <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between;gap:10px">
          <span style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace">🎨 Color</span>
          <input type="color" value="${LS.get('tob_boot_color','#00b4ff')}" style="width:32px;height:24px;border:none;background:none;cursor:pointer" oninput="BOOT_ANIM.color=this.value;LS.set('tob_boot_color',this.value)">
        </div>
        <div style="margin-top:8px">
          <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-bottom:5px"><span>⚡ Animation Speed</span><span>${Math.round(LS.get('tob_boot_speed',1)*100)}%</span></div>
          <input type="range" min="20" max="300" value="${Math.round(LS.get('tob_boot_speed',1)*100)}" style="width:100%;accent-color:var(--neon)" oninput="BOOT_ANIM.speed=this.value/100;LS.set('tob_boot_speed',BOOT_ANIM.speed)">
        </div>
        <div class="toggle-row" style="margin-top:10px"><span class="toggle-lbl" style="font-size:12px">🔊 Boot Sound</span><div class="toggle-sw ${LS.get('tob_boot_sound',false)?'on':''}" onclick="BOOT_ANIM.sound=!BOOT_ANIM.sound;LS.set('tob_boot_sound',BOOT_ANIM.sound);this.classList.toggle('on',BOOT_ANIM.sound)"></div></div>
      </div>

      <div class="set-section"><div class="set-section-title">⊟ Widget Dashboard</div>
        <div style="font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-bottom:10px">Add or remove widgets from the side panel.</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px">
          ${['clock','music','stats','notes','shortcuts','calendar'].map(w=>`<button onclick="WidgetSystem.addWidget('${w}');toggleWidgetPanel(true)" style="padding:4px 12px;border-radius:16px;background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.2);color:var(--neon);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer">+ ${w}</button>`).join('')}
        </div>
        <button class="generic-btn" onclick="toggleWidgetPanel(true)">⊟ Open Widget Panel</button>
      </div>

      <div class="set-section"><div class="set-section-title">Wallpapers</div>
        <div class="wp-grid-ui">
          <div class="wp-opt wp-grid-opt ${OS.wallpaper==='wp-grid'?'active':''}" data-wp="wp-grid">GRID</div>
          <div class="wp-opt wp-stadium-opt ${OS.wallpaper==='wp-stadium'?'active':''}" data-wp="wp-stadium">STADIUM</div>
          <div class="wp-opt wp-gradient-opt ${OS.wallpaper==='wp-gradient'?'active':''}" data-wp="wp-gradient">GRADIENT</div>
          <div class="wp-opt wp-energy-opt ${OS.wallpaper==='wp-energy'?'active':''}" data-wp="wp-energy">ENERGY</div>
          <div class="wp-opt wp-custom-opt ${OS.wallpaper==='wp-custom'?'active':''}" data-wp="wp-custom">CUSTOM</div>
        </div>
        <button class="wp-upload-btn" onclick="document.getElementById('wp-file-input').click()">📁 Upload Wallpaper</button>
      </div>


      <div class="set-section"><div class="set-section-title">🌊 Live Wallpapers</div>
        <div style="font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-bottom:8px">Canvas-based animated wallpapers. Disables static wallpaper while active.</div>
        <div class="lwp-grid">
          <div class="lwp-opt ${LS.get('tob_live_wp',null)==='waves'?'active':''}" data-lwp="waves" onclick="liveWP.start('waves');root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp==='waves'));toast('🌊 Energy Waves')"><div class="lwp-opt-icon">🌊</div><div class="lwp-opt-label">WAVES</div></div>
          <div class="lwp-opt ${LS.get('tob_live_wp',null)==='galaxy'?'active':''}" data-lwp="galaxy" onclick="liveWP.start('galaxy');root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp==='galaxy'));toast('✨ Particle Galaxy')"><div class="lwp-opt-icon">✨</div><div class="lwp-opt-label">GALAXY</div></div>
          <div class="lwp-opt ${LS.get('tob_live_wp',null)==='grid'?'active':''}" data-lwp="grid" onclick="liveWP.start('grid');root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp==='grid'));toast('⬛ Neon Grid')"><div class="lwp-opt-icon">⬛</div><div class="lwp-opt-label">NEON GRID</div></div>
          <div class="lwp-opt ${LS.get('tob_live_wp',null)==='aurora'?'active':''}" data-lwp="aurora" onclick="liveWP.start('aurora');root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp==='aurora'));toast('🌌 Aurora')"><div class="lwp-opt-icon">🌌</div><div class="lwp-opt-label">AURORA</div></div>
          <div class="lwp-opt ${LS.get('tob_live_wp',null)==='matrix'?'active':''}" data-lwp="matrix" onclick="liveWP.start('matrix');root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp==='matrix'));toast('💚 Matrix Rain')"><div class="lwp-opt-icon">💚</div><div class="lwp-opt-label">MATRIX</div></div>
          <div class="lwp-opt" onclick="liveWP.stop();root.querySelectorAll('.lwp-opt').forEach(o=>o.classList.remove('active'));toast('⬛ Live WP Off')"><div class="lwp-opt-icon">⬛</div><div class="lwp-opt-label">OFF</div></div>
        </div>
        <div style="margin-top:10px">
          <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-bottom:5px"><span>⚡ Animation Speed</span><span id="lwp-speed-val">${Math.round(liveWP.speed*100)}%</span></div>
          <input type="range" min="10" max="200" value="${Math.round(liveWP.speed*100)}" style="width:100%;accent-color:var(--neon)" oninput="liveWP.speed=this.value/100;document.getElementById('lwp-speed-val').textContent=this.value+'%'">
        </div>
        <div style="margin-top:8px">
          <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-dim);font-family:'Share Tech Mono',monospace;margin-bottom:5px"><span>☀ Brightness</span><span id="lwp-bright-val">${Math.round(liveWP.brightness*100)}%</span></div>
          <input type="range" min="10" max="100" value="${Math.round(liveWP.brightness*100)}" style="width:100%;accent-color:var(--gold)" oninput="liveWP.brightness=this.value/100;document.getElementById('lwp-bright-val').textContent=this.value+'%'">
        </div>
      </div>

      <div class="set-section"><div class="set-section-title">📁 Finder & Files</div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);margin-bottom:10px">Virtual file system stored in browser localStorage.</div>
        <button class="generic-btn" onclick="openFinder();WM.close('settings')">📁 Open Finder</button>
        <button class="generic-btn" style="background:rgba(255,59,48,.08);border-color:rgba(255,59,48,.3);color:#ff5f57;margin-top:6px" onclick="if(confirm('Clear ALL files from virtual FS?')){LS.set('tob_vfs',null);toast('🗑 VFS cleared');}">🗑 Clear All Files</button>
      </div>

      <div class="set-section"><div class="set-section-title">Background Music</div>
        <div class="track-btns"><div class="track-btn ${OS.track==='ambient'?'active':''}" data-track="ambient">AMBIENT</div><div class="track-btn ${OS.track==='battle'?'active':''}" data-track="battle">BATTLE</div><div class="track-btn ${OS.track==='calm'?'active':''}" data-track="calm">CALM</div></div>
        <div class="music-row" style="margin-top:8px">
          <button class="music-play-btn" id="settings-ost-btn" onclick="toggleMusic()">${_ostPlaying?'⏸':'▶'}</button>
          <input class="vol-range" type="range" min="0" max="1" step=".02" value="${OS.volume}" oninput="setVolume(this.value)">
        </div>
      </div>

      <div class="set-section"><div class="set-section-title">&#128100; User Profile</div>
        ${(()=>{const p=UserProfile.get();const editBtn='<button class=\"generic-btn\" onclick=\"UserProfile.showEdit()\">&#9998; Edit Profile</button>';const createBtn='<button class=\"generic-btn\" onclick=\"UserProfile.showSetup(()=>{})\">&#128100; Create Profile</button>';if(p){return '<div style=\"display:flex;align-items:center;gap:12px;padding:8px 0;margin-bottom:10px\"><div style=\"width:48px;height:48px;border-radius:50%;background:rgba(0,20,60,.8);border:2px solid rgba(0,180,255,.3);display:flex;align-items:center;justify-content:center;font-size:24px\">'+p.avatar+'</div><div><div style=\"font-family:Orbitron,sans-serif;font-size:13px;font-weight:700;color:var(--text)\">'+p.name+'</div><div style=\"font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);margin-top:2px\">'+(p.pinHash?'&#128274; PIN protected':'&#128275; No PIN')+' </div></div></div>'+editBtn;}else{return '<div style=\"font-family:Share Tech Mono,monospace;font-size:10px;color:var(--text-muted);margin-bottom:10px\">No profile yet.</div>'+createBtn;}})()}
      </div>

      <div class="set-section"><div class="set-section-title">&#127912; Boot &amp; Widgets</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px">
          <button class="generic-btn" onclick="BootStudio.open()">&#127912; Boot Studio</button>
          <button class="generic-btn" onclick="WidgetLab.open()">&#129521; Widget Lab</button>
          <button class="generic-btn" onclick="DesktopWidgets.init();toast('Widgets reloaded')">&#8635; Reload Widgets</button>
        </div>
      </div>

      <div class="set-section"><div class="set-section-title">System Controls</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">
          <button class="admin-btn admin-btn-info" onclick="adminReload()">↻ Reload OS</button>
          <button class="admin-btn admin-btn-info" onclick="adminCloseAll()">✕ Close All Windows</button>
          <button class="admin-btn admin-btn-warn" onclick="adminResetGrid()">⊞ Reset Desktop Grid</button>
          <button class="admin-btn admin-btn-warn" onclick="adminUnlockAll()">🔓 Restore All Hidden Apps</button>
          <button class="admin-btn admin-btn-danger" style="grid-column:span 2" onclick="adminClearStorage()">🗑 Clear All Data &amp; Reset</button>
        </div>
      </div>

      <div class="set-section" id="set-admin-section">
        <div class="set-section-title">🔐 Admin Panel</div>
        ${OS.adminUnlocked ? `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px">
          <div class="admin-stat" style="grid-column:span 2;background:rgba(0,180,255,.05);border:1px solid var(--panel-border);border-radius:8px;padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px;">
            <span style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace">JS Heap: <span style="color:var(--neon)">${perfData.memory}MB</span></span>
            <span style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace">Windows: <span style="color:var(--neon)">${WM.windows.size}</span></span>
            <span style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace">Active Mods: <span style="color:var(--neon)">${getActiveMods().filter(m=>m.enabled).length}</span></span>
            <span style="font-size:10px;color:var(--text-dim);font-family:'Share Tech Mono',monospace">Apps: <span style="color:var(--neon)">${getVisibleApps().length} visible</span></span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <button class="admin-btn admin-btn-info" onclick="adminToggleDebug()">🐛 Toggle Debug</button>
          <button class="admin-btn admin-btn-info" onclick="adminStressTest()">⚡ Stress Test</button>
          <button class="admin-btn" style="background:rgba(100,255,100,.08);border:1px solid rgba(100,255,100,.3);color:#80ff80;grid-column:span 2" onclick="document.getElementById('admin-key-file').click()">📂 Load admin.key File</button>
        </div>
        <div style="margin-top:10px">
          <div style="font-size:9px;font-family:'Orbitron',sans-serif;color:var(--neon);letter-spacing:2px;margin-bottom:5px">SYSTEM LOG</div>
          <div style="background:rgba(0,0,0,.4);border:1px solid var(--panel-border);border-radius:6px;padding:8px;max-height:80px;overflow-y:auto;font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted);line-height:1.7">${_adminLog.slice(0,8).join('<br>')||'No events yet.'}</div>
        </div>` : `
        <div style="font-size:11px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-bottom:10px">Enter your admin key to unlock advanced controls.</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input class="modal-input" id="settings-admin-key" type="password" placeholder="Admin key..." style="flex:1;font-size:12px">
          <button class="admin-btn admin-btn-info" style="white-space:nowrap;flex-shrink:0" onclick="checkSettingsAdminKey()">🔓 Unlock</button>
        </div>
        <div style="font-size:9px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:5px">Hint: try "TOBOS-ADMIN-2025"</div>`}
      </div>

      <div class="set-section"><div class="set-section-title">About</div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);line-height:2;">
          <div><span style="color:var(--neon)">TOB OS NEXUS EDITION</span> v${TOB_VERSION}</div>
          <div>APPS: ${getVisibleApps().length} visible · ${OS.hiddenApps.length} hidden</div>
          <div>MODS: ${getActiveMods().filter(m=>m.enabled).length} active</div>
          <div style="margin-top:6px"><button class="generic-btn" style="margin-top:0" onclick="openApp('updatelog');WM.close('settings')">📋 View Full Update Log</button></div>
        </div>
      </div>`;

      // Wire dark toggle
      const dt=root.querySelector('#dark-toggle');
      if(dt)dt.onclick=()=>{applyTheme(OS.theme==='dark'?'light':'dark');dt.classList.toggle('on',OS.theme==='dark');};
      // Wire wallpaper options
      root.querySelectorAll('.wp-opt').forEach(opt=>{opt.onclick=()=>{const wp=opt.dataset.wp;if(wp==='wp-custom'){if(OS.wpCustom)applyWallpaper('wp-custom',OS.wpCustom);else document.getElementById('wp-file-input').click();}else applyWallpaper(wp);toast('◈ Wallpaper changed');};});
      // Wire track buttons
      root.querySelectorAll('.track-btn').forEach(btn=>{btn.onclick=()=>{root.querySelectorAll('.track-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');selectOSTTrack(btn.dataset.track);};});
    }

    window.checkSettingsAdminKey=()=>{
      const input=root.querySelector('#settings-admin-key');if(!input)return;
      const val=input.value.trim();
      const VALID=['TOBOS-ADMIN-2025','admin.key','TOB_ADMIN'];
      if(VALID.includes(val)){OS.adminUnlocked=true;LS.set('tob_admin',true);toast('🔓 Admin Panel Unlocked!');renderSettings();}
      else{toast('⚠ Invalid admin key');input.style.borderColor='var(--accent)';setTimeout(()=>input.style.borderColor='',1500);}
    };

    renderSettings();
    body.appendChild(root);
  });
}
function handleWallpaperUpload(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{OS.wpCustom=r.result;LS.set('tob_wp_custom',OS.wpCustom);applyWallpaper('wp-custom',OS.wpCustom);toast('◈ Wallpaper set!');};r.readAsDataURL(f);}

/* ══ APP CREATOR ══ */
function updateIconPreview(){const e=document.getElementById('ac-emoji').value.trim();if(e)document.getElementById('ac-icon-preview').textContent=e;}
function updateCreatorType(){const t=document.getElementById('ac-type').value;document.getElementById('ac-url-field').style.display=t==='url'?'block':'none';document.getElementById('ac-html-field').style.display=t==='html'?'block':'none';}
function saveCustomApp(){
  const name=document.getElementById('ac-name').value.trim();if(!name){toast('⚠ Enter a name');return;}
  const app={id:'usr_'+Date.now(),label:name,icon:document.getElementById('ac-emoji').value.trim()||'📱',type:document.getElementById('ac-type').value,url:document.getElementById('ac-url').value.trim(),html:document.getElementById('ac-html').value,color:'var(--panel)',size:document.getElementById('ac-size').value};
  OS.customApps.push(app);LS.set('tob_apps',OS.customApps);buildDesktopIcons();closeModal('ac-modal');toast(`✦ "${name}" created!`);
  ['ac-name','ac-emoji','ac-url','ac-html'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}

/* ══ TASK MANAGER ══ */
function buildTaskMgrApp(body){
  body.style.overflow='hidden';body.style.background='var(--bg)';
  body.innerHTML=`<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:'Share Tech Mono',monospace;">
    <div style="padding:12px 16px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:12px;background:var(--win-bar);flex-shrink:0">
      <span style="font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:var(--neon);letter-spacing:3px">📊 TASK MANAGER</span>
      <span style="margin-left:auto;font-size:9px;color:var(--text-muted)" id="tm-uptime"></span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;padding:12px;flex-shrink:0">
      <div style="background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;">
        <div style="font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:6px">CPU</div>
        <div style="font-size:22px;font-weight:700;color:var(--neon)" id="tm-cpu">—%</div>
        <div style="background:rgba(0,0,0,.3);border-radius:3px;height:4px;margin-top:6px"><div id="tm-cpu-bar" style="height:4px;border-radius:3px;background:var(--neon);width:0%;transition:width .5s"></div></div>
      </div>
      <div style="background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;">
        <div style="font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:6px">MEMORY</div>
        <div style="font-size:22px;font-weight:700;color:var(--gold)" id="tm-mem">—MB</div>
        <div style="background:rgba(0,0,0,.3);border-radius:3px;height:4px;margin-top:6px"><div id="tm-mem-bar" style="height:4px;border-radius:3px;background:var(--gold);width:0%;transition:width .5s"></div></div>
      </div>
      <div style="background:var(--panel);border:1px solid var(--panel-border);border-radius:10px;padding:12px;">
        <div style="font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:6px">PROCESSES</div>
        <div style="font-size:22px;font-weight:700;color:var(--green)" id="tm-proc-count">0</div>
        <div style="font-size:9px;color:var(--text-muted);margin-top:6px">running apps</div>
      </div>
    </div>
    <div style="padding:0 12px 8px;font-size:9px;color:var(--text-muted);letter-spacing:2px;flex-shrink:0">RUNNING APPLICATIONS</div>
    <div id="tm-process-list" style="flex:1;overflow-y:auto;padding:0 12px 12px;"></div>
  </div>`;

  const startT=Date.now();
  function updateTM(){
    // Uptime
    const upEl=body.querySelector('#tm-uptime');if(upEl){const s=Math.floor((Date.now()-startT)/1000);upEl.textContent=`Uptime: ${Math.floor(s/60)}m ${s%60}s`;}
    // Memory
    const mem=performance.memory;
    const memMB=mem?Math.round(mem.usedJSHeapSize/1048576):null;
    const memTotalMB=mem?Math.round(mem.totalJSHeapSize/1048576):null;
    const memEl=body.querySelector('#tm-mem');if(memEl)memEl.textContent=memMB?memMB+'MB':'N/A';
    const memBar=body.querySelector('#tm-mem-bar');if(memBar&&memMB&&memTotalMB)memBar.style.width=Math.min(100,(memMB/memTotalMB*100))+'%';
    // CPU (estimate via task count)
    const cpuEst=Math.min(100,WM.windows.size*8+5);
    const cpuEl=body.querySelector('#tm-cpu');if(cpuEl)cpuEl.textContent=cpuEst+'%';
    const cpuBar=body.querySelector('#tm-cpu-bar');if(cpuBar)cpuBar.style.width=cpuEst+'%';
    // Process count
    const pc=body.querySelector('#tm-proc-count');if(pc)pc.textContent=WM.windows.size;
    // Process list
    const list=body.querySelector('#tm-process-list');if(!list)return;
    list.innerHTML='';
    if(!WM.windows.size){list.innerHTML=`<div style="padding:20px;text-align:center;font-size:10px;color:var(--text-muted)">No running apps</div>`;return;}
    WM.windows.forEach(w=>{
      const row=document.createElement('div');
      row.style.cssText='display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:var(--panel);border:1px solid var(--panel-border);margin-bottom:6px;';
      const memEst=Math.round(2+Math.random()*8);
      row.innerHTML=`<span style="font-size:18px">${w.icon||'📱'}</span>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:700;color:var(--text)">${w.title}</div>
          <div style="font-size:9px;color:var(--text-muted);margin-top:2px">PID: ${w.id} · ~${memEst}MB</div>
        </div>
        <div style="width:60px;text-align:right">
          <div style="background:rgba(0,0,0,.3);border-radius:2px;height:3px;margin-bottom:3px"><div style="height:3px;background:var(--neon);width:${5+Math.random()*30}%;border-radius:2px"></div></div>
          <div style="font-size:8px;color:var(--text-muted)">CPU</div>
        </div>
        <button onclick="WM.close('${w.id}')" style="padding:4px 10px;border-radius:5px;background:rgba(255,50,50,.12);border:1px solid rgba(255,50,50,.3);color:#ff6666;font-size:9px;cursor:pointer;font-family:'Share Tech Mono',monospace;transition:all .15s;" onmouseover="this.style.background='rgba(255,50,50,.25)'" onmouseout="this.style.background='rgba(255,50,50,.12)'">END</button>`;
      list.appendChild(row);
    });
  }
  updateTM();const tmInterval=setInterval(updateTM,1500);
  const obs=new MutationObserver(()=>{if(!document.contains(body)){clearInterval(tmInterval);obs.disconnect();}});
  obs.observe(document,{childList:true,subtree:true});
}

/* ══ MOD TUTORIAL ══ */
function buildModTutorialApp(body){
  body.style.overflow='hidden';
  const root=document.createElement('div');root.style.cssText='width:100%;height:100%;overflow-y:auto;padding:16px;';
  root.innerHTML=`<div class="set-title">📖 MOD CREATION GUIDE</div>
  <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);line-height:1.9">

  <div style="background:rgba(0,180,255,.06);border:1px solid rgba(0,180,255,.2);border-radius:10px;padding:14px;margin-bottom:14px">
    <div style="color:var(--neon);font-weight:700;margin-bottom:8px;font-size:12px">◈ WHAT IS A MOD?</div>
    A mod is a <span style="color:var(--neon3)">.json</span> file that tells TOB OS to change visual settings, colors, or behaviors. Install mods through the Mod Manager → Installed tab.
  </div>

  <div style="background:rgba(0,180,255,.04);border:1px solid var(--panel-border);border-radius:10px;padding:14px;margin-bottom:14px">
    <div style="color:var(--gold);font-weight:700;margin-bottom:8px;font-size:11px">◈ MOD.JSON STRUCTURE</div>
    <div style="background:#000;border-radius:8px;padding:12px;line-height:2;color:var(--green)">
{<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"id"</span>: <span style="color:var(--gold)">"my-mod"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"name"</span>: <span style="color:var(--gold)">"My Cool Mod"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"version"</span>: <span style="color:var(--gold)">"1.0"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"author"</span>: <span style="color:var(--gold)">"Your Name"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"icon"</span>: <span style="color:var(--gold)">"🎨"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"desc"</span>: <span style="color:var(--gold)">"What this mod does"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"tab"</span>: <span style="color:var(--gold)">"system"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"changes"</span>: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--neon)">"accentColor"</span>: <span style="color:var(--gold)">"#ff6600"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--neon)">"wallpaper"</span>: <span style="color:var(--gold)">"wp-gradient"</span><br>
&nbsp;&nbsp;}<br>
}
    </div>
  </div>

  <div style="background:rgba(0,180,255,.04);border:1px solid var(--panel-border);border-radius:10px;padding:14px;margin-bottom:14px">
    <div style="color:var(--neon3);font-weight:700;margin-bottom:8px;font-size:11px">◈ FIELD REFERENCE</div>
    <div style="display:grid;gap:6px">
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">id</span><span>Unique mod identifier (no spaces)</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">name</span><span>Display name shown in Mod Manager</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">version</span><span>Mod version string (e.g. "1.0")</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">icon</span><span>Emoji shown next to mod name</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">desc</span><span>Short description of what the mod does</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:var(--neon)">tab</span><span>"system" or "apps" — which tab to show it in</span></div>
      <div style="display:grid;grid-template-columns:100px 1fr;gap:8px;padding:5px 0"><span style="color:var(--neon)">changes</span><span>Object with modification keys (see below)</span></div>
    </div>
  </div>

  <div style="background:rgba(0,180,255,.04);border:1px solid var(--panel-border);border-radius:10px;padding:14px;margin-bottom:14px">
    <div style="color:var(--accent);font-weight:700;margin-bottom:8px;font-size:11px">◈ EXAMPLE: BLUE THEME MOD</div>
    <div style="background:#000;border-radius:8px;padding:12px;line-height:2;color:var(--green)">
{<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"id"</span>: <span style="color:var(--gold)">"blue-theme"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"name"</span>: <span style="color:var(--gold)">"Blue Theme"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"version"</span>: <span style="color:var(--gold)">"1.0"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"author"</span>: <span style="color:var(--gold)">"Example"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"icon"</span>: <span style="color:var(--gold)">"🔵"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"desc"</span>: <span style="color:var(--gold)">"Deep ocean blue theme"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"tab"</span>: <span style="color:var(--gold)">"system"</span>,<br>
&nbsp;&nbsp;<span style="color:var(--neon)">"changes"</span>: {<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--neon)">"accentColor"</span>: <span style="color:var(--gold)">"#1e90ff"</span>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:var(--neon)">"wallpaper"</span>: <span style="color:var(--gold)">"wp-energy"</span><br>
&nbsp;&nbsp;}<br>
}
    </div>
    <button onclick="downloadExampleMod()" style="margin-top:10px;padding:7px 16px;border-radius:7px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;cursor:pointer;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:2px">⬇ DOWNLOAD EXAMPLE MOD</button>
  </div>

  <div style="background:rgba(0,180,255,.04);border:1px solid var(--panel-border);border-radius:10px;padding:14px">
    <div style="color:var(--green);font-weight:700;margin-bottom:8px;font-size:11px">◈ HOW TO INSTALL</div>
    <div style="display:grid;gap:8px">
      <div style="display:flex;gap:8px"><span style="background:var(--neon);color:#000;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0">1</span><span>Save your mod.json file to your computer</span></div>
      <div style="display:flex;gap:8px"><span style="background:var(--neon);color:#000;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0">2</span><span>Open the <strong style="color:var(--text)">Mod Manager</strong> app</span></div>
      <div style="display:flex;gap:8px"><span style="background:var(--neon);color:#000;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0">3</span><span>Click the <strong style="color:var(--text)">Installed</strong> tab</span></div>
      <div style="display:flex;gap:8px"><span style="background:var(--neon);color:#000;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0">4</span><span>Click the <strong style="color:var(--text)">📦 Install Mod Package</strong> area</span></div>
      <div style="display:flex;gap:8px"><span style="background:var(--neon);color:#000;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;flex-shrink:0">5</span><span>Select your .json file — it will appear in the list instantly!</span></div>
    </div>
  </div>

  </div>`;
  body.appendChild(root);

  window.downloadExampleMod=()=>{
    const mod={id:'blue-theme',name:'Blue Theme',version:'1.0',author:'TOB OS User',icon:'🔵',desc:'Deep ocean blue accent and wallpaper',tab:'system',changes:{accentColor:'#1e90ff',wallpaper:'wp-energy'}};
    const blob=new Blob([JSON.stringify(mod,null,2)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='blue-theme.json';a.click();
    toast('⬇ blue-theme.json downloaded');
  };
}

/* CC moved to new module above */
// Add CC button to status bar
(()=>{
  const sbRight=document.querySelector('#statusbar .sb-group:last-child');
  if(sbRight){
    const ccBtn=document.createElement('button');
    ccBtn.style.cssText='background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:13px;padding:2px 4px;transition:color .15s;';
    ccBtn.textContent='⊞';ccBtn.title='Control Center';
    ccBtn.onmouseover=()=>ccBtn.style.color='var(--neon)';
    ccBtn.onmouseout=()=>ccBtn.style.color='var(--text-dim)';
    ccBtn.onclick=(e)=>{e.stopPropagation();toggleControlCenter();};
    sbRight.insertBefore(ccBtn,sbRight.firstChild);
  }
})();
function init(){
  // ── Fix: Init boot animation BEFORE boot overlay disappears
  BOOT_ANIM.style=LS.get('tob_boot_style','neon_pulse');
  BOOT_ANIM.color=LS.get('tob_boot_color','#00b4ff');
  BOOT_ANIM.speed=LS.get('tob_boot_speed',1.0);
  BOOT_ANIM.sound=LS.get('tob_boot_sound',false);
  // Run boot canvas animation immediately
  (()=>{
    const cv=document.getElementById('boot-canvas');
    if(!cv)return;
    cv.width=innerWidth;cv.height=innerHeight;
    const ctx=cv.getContext('2d');
    const col=BOOT_ANIM.color;
    const style=BOOT_ANIM.style;
    let t=0;
    const drops=style==='matrix_boot'?Array(Math.floor(innerWidth/8)).fill(1):null;
    const loop=()=>{
      if(!document.getElementById('boot-canvas'))return;
      requestAnimationFrame(loop);
      ctx.clearRect(0,0,cv.width,cv.height);
      t+=0.04*BOOT_ANIM.speed;
      const r=parseInt(col.slice(1,3),16)||0,g=parseInt(col.slice(3,5),16)||180,b=parseInt(col.slice(5,7),16)||255;
      if(style==='neon_pulse'){
        const gr=ctx.createRadialGradient(cv.width/2,cv.height/2,0,cv.width/2,cv.height/2,cv.width*.6);
        gr.addColorStop(0,`rgba(${r*0.3},${g*0.3},${b*0.5},${0.1+Math.sin(t)*.05})`);
        gr.addColorStop(1,'transparent');
        ctx.fillStyle=gr;ctx.fillRect(0,0,cv.width,cv.height);
        for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(cv.width/2,cv.height/2,(80+i*55)*(1+Math.sin(t+i)*.1),0,Math.PI*2);ctx.strokeStyle=`rgba(${r},${g},${b},${0.06+Math.sin(t+i)*.03})`;ctx.lineWidth=1.5;ctx.stroke();}
      } else if(style==='cyber_grid'){
        const C=44,off=(t*18)%C;ctx.strokeStyle=`rgba(${r},${g},${b},.06)`;ctx.lineWidth=.8;
        for(let x=off-C;x<cv.width+C;x+=C){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke();}
        for(let y=off-C;y<cv.height+C;y+=C){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke();}
        const hy=cv.height*.55,grd=ctx.createLinearGradient(0,hy-30,0,hy+30);
        grd.addColorStop(0,'transparent');grd.addColorStop(.5,`rgba(${r},${g},${b},.12)`);grd.addColorStop(1,'transparent');
        ctx.fillStyle=grd;ctx.fillRect(0,hy-30,cv.width,60);
      } else if(style==='matrix_boot'){
        ctx.fillStyle='rgba(0,0,0,.06)';ctx.fillRect(0,0,cv.width,cv.height);
        ctx.fillStyle=`rgba(${r},${g},${b},.7)`;ctx.font='9px monospace';
        if(drops)drops.forEach((y,i)=>{ctx.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*8,y*8);drops[i]=y*8>cv.height&&Math.random()>.96?0:y+.6;});
      } else if(style==='energy_wave'){
        for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(0,cv.height*.48);for(let x=0;x<=cv.width;x+=3)ctx.lineTo(x,cv.height*.48+Math.sin(x*.007+t+i*.9)*30);ctx.strokeStyle=`rgba(${r},${g},${b},${.08+i*.02})`;ctx.lineWidth=1.2;ctx.stroke();}
      } else {
        // aurora/starfield/plasma/glitch fallbacks
        const gr2=ctx.createRadialGradient(cv.width/2,cv.height/2,0,cv.width/2,cv.height/2,cv.width*.5);
        gr2.addColorStop(0,`rgba(${r},${g},${b},.08)`);gr2.addColorStop(1,'transparent');
        ctx.fillStyle=gr2;ctx.fillRect(0,0,cv.width,cv.height);
      }
    };loop();
  })();
  applyTheme(OS.theme);
  applyWallpaper(OS.wallpaper,OS.wallpaper==='wp-custom'?OS.wpCustom:null);
  if(_masterGain)_masterGain.gain.value=OS.volume;
  checkVersion();initBattery();buildDesktopIcons();
  BUILTIN_MODS.forEach(m=>{const saved=LS.get('tob_mod_'+m.id,false);m.enabled=saved;if(m.enabled)applyMod(m);});
  const msgs=['LOADING CORE MODULES...','INIT DESKTOP ENVIRONMENT...','iOS GRID SYSTEM...','LOADING APPS...','STARTING SERVICES...','TOB OS v17.0 READY.'];
  let mi=0;const msgEl=document.getElementById('boot-msg');
  const mInt=setInterval(()=>{if(msgEl)msgEl.textContent=msgs[Math.min(mi++,msgs.length-1)];if(mi>=msgs.length)clearInterval(mInt);},400);
  setTimeout(()=>{const boot=document.getElementById('boot');if(boot){boot.classList.add('fade');setTimeout(()=>{boot.remove();/* initPet removed */},700);}},2600);

  // Init new systems delegated to bootWithProfile
  adminLog('TOB OS v'+TOB_VERSION+' booted');
  bootWithProfile();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

/* ══════════════════════════════════════════════════════════
   TOB OS v10 — NEW MODULES
══════════════════════════════════════════════════════════ */

/* ── VIRTUAL FILE SYSTEM ── */
const VFS={
  get(){return LS.get('tob_vfs',{'/Desktop':[], '/Documents':[], '/Downloads':[], '/Music':[], '/Pictures':[], '/Mods':[]});},
  save(fs){LS.set('tob_vfs',fs);},
  addFile(folder,file){const fs=this.get();if(!fs[folder])fs[folder]=[];const idx=fs[folder].findIndex(f=>f.name===file.name);if(idx>=0)fs[folder][idx]=file;else fs[folder].push(file);this.save(fs);},
  deleteFile(folder,name){const fs=this.get();if(fs[folder])fs[folder]=fs[folder].filter(f=>f.name!==name);this.save(fs);},
  getFiles(folder){return this.get()[folder]||[];},
  clearFolder(folder){const fs=this.get();fs[folder]=[];this.save(fs);}
};

/* ── LIVE WALLPAPER ENGINE ── */
const liveWP={
  active:null,canvas:null,ctx:null,raf:null,
  speed:1,brightness:0.85,
  init(){
    let cv=document.getElementById('live-wp-canvas');
    if(!cv){cv=document.createElement('canvas');cv.id='live-wp-canvas';cv.style.cssText='position:fixed;inset:0;z-index:1;pointer-events:none;display:none;';const pc=document.getElementById('particle-canvas');if(pc)pc.before(cv);else document.body.appendChild(cv);}
    this.canvas=cv;this.ctx=cv.getContext('2d');
    const resize=()=>{cv.width=innerWidth;cv.height=innerHeight;};resize();addEventListener('resize',resize,{passive:true});
    const saved=LS.get('tob_live_wp',null);if(saved)this.start(saved);
  },
  start(type){
    this.stop();this.active=type;LS.set('tob_live_wp',type);
    this.canvas.style.display='block';
    document.querySelectorAll('.lwp-opt').forEach(o=>o.classList.toggle('active',o.dataset.lwp===type));
    if(type==='waves')this._waves();
    else if(type==='galaxy')this._galaxy();
    else if(type==='grid')this._grid();
    else if(type==='aurora')this._aurora();
    else if(type==='matrix'){startMatrixRain();this.canvas.style.display='none';}
  },
  stop(){
    cancelAnimationFrame(this.raf);
    if(this.active==='matrix')stopMatrixRain();
    this.active=null;LS.set('tob_live_wp',null);
    if(this.canvas)this.canvas.style.display='none';
    document.querySelectorAll('.lwp-opt').forEach(o=>o.classList.remove('active'));
  },
  _waves(){
    const cv=this.canvas,ctx=this.ctx;let t=0;
    const W=[
      {freq:.006,amp:40,ph:0,col:'0,180,255',y:.3},
      {freq:.008,amp:55,ph:1.2,col:'0,255,200',y:.45},
      {freq:.005,amp:35,ph:2.5,col:'0,80,255',y:.6},
      {freq:.009,amp:48,ph:.7,col:'100,0,255',y:.35},
    ];
    const loop=()=>{this.raf=requestAnimationFrame(loop);ctx.clearRect(0,0,cv.width,cv.height);t+=.01*this.speed;
      W.forEach(w=>{
        ctx.beginPath();ctx.moveTo(0,cv.height*w.y);
        for(let x=0;x<=cv.width;x+=4){ctx.lineTo(x,cv.height*w.y+Math.sin(x*w.freq+t+w.ph)*w.amp);}
        ctx.lineTo(cv.width,cv.height);ctx.lineTo(0,cv.height);ctx.closePath();
        const g=ctx.createLinearGradient(0,0,0,cv.height);g.addColorStop(0,`rgba(${w.col},${.09*this.brightness})`);g.addColorStop(1,'transparent');
        ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.moveTo(0,cv.height*w.y);
        for(let x=0;x<=cv.width;x+=4){ctx.lineTo(x,cv.height*w.y+Math.sin(x*w.freq+t+w.ph)*w.amp);}
        ctx.strokeStyle=`rgba(${w.col},${.3*this.brightness})`;ctx.lineWidth=1.5;ctx.stroke();
      });
    };loop();
  },
  _galaxy(){
    const cv=this.canvas,ctx=this.ctx;
    const N=this.brightness>0.5?120:60;
    const stars=Array.from({length:N},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.8+.2,vx:(Math.random()-.5)*.12,vy:(Math.random()-.5)*.12,a:Math.random()*.6+.1,tw:Math.random()*Math.PI*2,ts:.02+Math.random()*.03,col:Math.random()<.7?'200,232,255':Math.random()<.5?'0,255,200':'180,100,255'}));
    let t=0;
    const loop=()=>{this.raf=requestAnimationFrame(loop);ctx.clearRect(0,0,cv.width,cv.height);t+=.01;
      [{x:.2,y:.3,r:220,c:'0,80,200'},{x:.8,y:.65,r:190,c:'80,0,200'},{x:.5,y:.85,r:170,c:'0,150,100'}].forEach(n=>{
        const gx=cv.width*n.x,gy=cv.height*n.y,gr=ctx.createRadialGradient(gx,gy,0,gx,gy,n.r);
        gr.addColorStop(0,`rgba(${n.c},${.07*this.brightness})`);gr.addColorStop(1,'transparent');
        ctx.fillStyle=gr;ctx.beginPath();ctx.arc(gx,gy,n.r,0,Math.PI*2);ctx.fill();
      });
      stars.forEach(s=>{s.x+=s.vx*this.speed;s.y+=s.vy*this.speed;s.tw+=s.ts;if(s.x<0)s.x=cv.width;if(s.x>cv.width)s.x=0;if(s.y<0)s.y=cv.height;if(s.y>cv.height)s.y=0;
        const a=s.a*(0.5+0.5*Math.sin(s.tw))*this.brightness;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(${s.col},${a})`;ctx.fill();
        if(s.r>1.2){const g=ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r*4);g.addColorStop(0,`rgba(${s.col},${a*.4})`);g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(s.x,s.y,s.r*4,0,Math.PI*2);ctx.fill();}
      });
    };loop();
  },
  _grid(){
    const cv=this.canvas,ctx=this.ctx;let t=0;const CELL=44;
    const loop=()=>{this.raf=requestAnimationFrame(loop);ctx.clearRect(0,0,cv.width,cv.height);t+=.008*this.speed;
      const off=(t*28)%CELL,al=.06*this.brightness;
      ctx.strokeStyle=`rgba(0,180,255,${al})`;ctx.lineWidth=.8;
      for(let x=-off;x<cv.width+CELL;x+=CELL){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke();}
      const hor=cv.height*.5;
      for(let i=0;i<22;i++){const p=((i/22)+t*.5)%1;const y=hor+(cv.height-hor)*p;const ya=al*(1-(1-p)*.7);ctx.strokeStyle=`rgba(0,180,255,${ya})`;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke();}
      const gr=ctx.createRadialGradient(cv.width/2,hor,0,cv.width/2,hor,cv.width*.4);gr.addColorStop(0,`rgba(0,80,200,${.08*this.brightness})`);gr.addColorStop(1,'transparent');ctx.fillStyle=gr;ctx.fillRect(0,0,cv.width,cv.height);
    };loop();
  },
  _aurora(){
    const cv=this.canvas,ctx=this.ctx;let t=0;
    const bands=[{y:.3,c:['0,200,100','0,180,255'],w:.22,ph:0},{y:.42,c:['100,0,200','0,180,255'],w:.18,ph:1.5},{y:.25,c:['0,255,150','100,0,200'],w:.14,ph:3},{y:.38,c:['50,150,255','0,200,100'],w:.17,ph:.8}];
    const loop=()=>{this.raf=requestAnimationFrame(loop);ctx.clearRect(0,0,cv.width,cv.height);t+=.005*this.speed;
      bands.forEach(b=>{const cy=cv.height*(b.y+Math.sin(t+b.ph)*.06),bh=cv.height*b.w;
        for(let x=0;x<cv.width;x+=6){const wy=cy+Math.sin(x*.005+t*2+b.ph)*28;const a=(0.06+Math.sin(x*.01+t+b.ph)*.025)*this.brightness;
          const g=ctx.createLinearGradient(x,wy-bh,x,wy+bh);g.addColorStop(0,'transparent');g.addColorStop(.3,`rgba(${b.c[0]},${a})`);g.addColorStop(.7,`rgba(${b.c[1]},${a*.55})`);g.addColorStop(1,'transparent');
          ctx.fillStyle=g;ctx.fillRect(x,wy-bh,6,bh*2);
        }
      });
    };loop();
  }
};

/* ── DYNAMIC NOTCH SYSTEM ── */
const notchSystem={
  expanded:false,_clockInt:null,_visRaf:null,
  init(){
    this.update();setInterval(()=>this.update(),2000);
    document.addEventListener('click',e=>{if(!document.getElementById('dynamic-notch')?.contains(e.target)&&this.expanded)this.collapse();});
    this._startIdleVis();
  },
  _getHubData(){
    const hub={day:1,coins:0,event:'Calm day'};
    try{
      const farm=JSON.parse(localStorage.getItem('pocket_farmer_v2')||'null');
      if(farm){hub.day=farm.day||1;hub.coins=farm.coins||0;hub.event=farm.lastEvent||'Calm day';}
    }catch(err){}
    return hub;
  },
  _startIdleVis(){
    const bars=()=>{
      const idle=document.getElementById('notch-idle');
      if(!idle)return;
      const visEls=idle.querySelectorAll('.notch-vis-bar');
      if(!visEls.length)return;
      const playing=MUSIC.playing||_ostPlaying;
      visEls.forEach(b=>{
        const h=playing?(3+Math.random()*9):(1+Math.sin(Date.now()*.002+Math.random())*1);
        b.style.height=Math.max(2,h)+'px';
      });
    };
    setInterval(bars,80);
  },
  update(){
    if(this.expanded)return;
    const idle=document.getElementById('notch-idle');if(!idle)return;
    const mPlay=(MUSIC.playing&&MUSIC.currentIdx>=0)||_ostPlaying;
    const notch=document.getElementById('dynamic-notch');
    idle.innerHTML='';
    if(mPlay){
      notch.classList.add('has-music');
      const dot=document.createElement('div');dot.className='notch-dot';dot.style.background='var(--neon3)';idle.appendChild(dot);
      // Visualizer bars
      const vis=document.createElement('div');vis.className='notch-vis-bars';
      const speeds=[0.55,0.4,0.7,0.5,0.65,0.45,0.6];
      const heights=[8,10,6,12,9,11,7];
      speeds.forEach((spd,i)=>{const b=document.createElement('div');b.className='notch-vis-bar';b.style.cssText='--spd:'+spd+'s;--h:'+heights[i]+'px;height:3px;';vis.appendChild(b);});
      idle.appendChild(vis);
      const s=MUSIC.songs[MUSIC.currentIdx];
      const nm=document.createElement('span');nm.className='notch-idle-track';nm.textContent=s?s.name.substring(0,10)+(s.name.length>10?'…':''):(_ostPlaying?'OST':'♪');idle.appendChild(nm);
    } else {
      notch.classList.remove('has-music');
      const dot=document.createElement('div');dot.className='notch-dot';idle.appendChild(dot);
      const hub=this._getHubData();
      const lbl=document.createElement('span');
      lbl.style.cssText='font-size:8px;color:rgba(0,180,255,.3);font-family:"Share Tech Mono",monospace;letter-spacing:1px;';
      lbl.textContent='DAY '+hub.day+' · '+hub.event.substring(0,16);
      idle.appendChild(lbl);
    }
  },
  _openStoreApp(id){
    if(!APP_STORE_CATALOG.find(a=>a.id===id)){toast('⚠ App not found');return;}
    if(!AppStore.isInstalled(id))AppStore.install(id);
    setTimeout(()=>openStoreCatalogApp(id),120);
  },
  toggle(e){e&&e.stopPropagation();this.expanded?this.collapse():this.expand();},
  expand(){
    this.expanded=true;
    const notch=document.getElementById('dynamic-notch');notch.classList.add('expanded');
    document.getElementById('notch-idle').style.display='none';
    const exp=document.getElementById('notch-expanded');exp.style.display='block';
    const mPlay=(MUSIC.playing&&MUSIC.currentIdx>=0);const oel=document.getElementById('audio-el');
    const s=MUSIC.songs[MUSIC.currentIdx];
    const sName=s?s.name:(_ostPlaying?'OST: '+OS.track:'No track playing');
    const sArtist=s?s.artist:(_ostPlaying?'TOB OS Synth':'—');
    const prog=oel&&oel.duration&&s?(oel.currentTime/oel.duration*100):0;
    const hub=this._getHubData();
    exp.innerHTML=`<div class="notch-exp-content">
      <div class="notch-exp-header">
        <span class="notch-exp-brand">◈ TOB HUB</span>
        <span class="notch-exp-time" id="n-clock"></span>
      </div>
      <div class="notch-status-row">
        <div class="notch-chip"><span class="notch-chip-label">FARM DAY</span><span class="notch-chip-val">${hub.day}</span></div>
        <div class="notch-chip"><span class="notch-chip-label">COINS</span><span class="notch-chip-val">${hub.coins}</span></div>
        <div class="notch-chip"><span class="notch-chip-label">EVENT</span><span class="notch-chip-val">${hub.event}</span></div>
      </div>
      <div class="notch-big-vis" id="n-big-vis">${Array.from({length:18},(_,i)=>`<div class="notch-big-bar" id="nvb${i}" style="height:3px;opacity:0.7;"></div>`).join('')}</div>
      <div class="notch-music-row">
        <div class="notch-disc ${mPlay?'spin':''}" id="n-disc">${mPlay?'♪':'🎵'}</div>
        <div class="notch-track-info">
          <div class="notch-track-name">${sName}</div>
          <div class="notch-track-artist">${sArtist}</div>
          <div class="notch-prog-bar"><div class="notch-prog-fill" id="n-prog" style="width:${prog}%"></div></div>
        </div>
        <div class="notch-btns">
          <button class="notch-ctrl-btn" onclick="event.stopPropagation();mp3Prev();notchSystem._refreshMusic()">⏮</button>
          <button class="notch-ctrl-btn" id="n-play-btn" onclick="event.stopPropagation();${MUSIC.dirHandle?'mp3Pause()':'toggleMusic()'};notchSystem._refreshMusic()">${(mPlay||_ostPlaying)?'⏸':'▶'}</button>
          <button class="notch-ctrl-btn" onclick="event.stopPropagation();mp3Next();notchSystem._refreshMusic()">⏭</button>
        </div>
      </div>
      <div class="notch-tools">
        <button class="notch-tool-btn" onclick="event.stopPropagation();notchSystem._openStoreApp('as_pocketfarmer')">OPEN FARM</button>
        <button class="notch-tool-btn" onclick="event.stopPropagation();notchSystem._openStoreApp('as_storybook')">OPEN STORY</button>
        <button class="notch-tool-btn" onclick="event.stopPropagation();notchSystem._openStoreApp('as_multiverse_blockarena')">OPEN BLOCKVERSE</button>
      </div>
      <div class="notch-toggles">
        <div class="notch-mini-toggle ${OS.theme==='dark'?'on':''}" id="n-dark-t" onclick="event.stopPropagation();applyTheme(OS.theme==='dark'?'light':'dark');this.classList.toggle('on',OS.theme==='dark')">
          <div style="font-size:13px">🌙</div><div class="notch-mini-toggle-label">DARK</div>
        </div>
        <div class="notch-mini-toggle" onclick="event.stopPropagation();toggleControlCenter();notchSystem.collapse()">
          <div style="font-size:13px">⊞</div><div class="notch-mini-toggle-label">CC</div>
        </div>
        <div class="notch-mini-toggle" onclick="event.stopPropagation();openFinder();notchSystem.collapse()">
          <div style="font-size:13px">📁</div><div class="notch-mini-toggle-label">FILES</div>
        </div>
        <div class="notch-mini-toggle" onclick="event.stopPropagation();lockScreen();notchSystem.collapse()">
          <div style="font-size:13px">🔒</div><div class="notch-mini-toggle-label">LOCK</div>
        </div>
      </div>
    </div>`;
    const tick=()=>{const el=document.getElementById('n-clock');if(el){const n=new Date();el.textContent=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}:${String(n.getSeconds()).padStart(2,'0')}`;}};
    tick();this._clockInt=setInterval(tick,1000);
    this._startBigVis();
    this._progInt=setInterval(()=>{
      const ae=document.getElementById('audio-el');const pf=document.getElementById('n-prog');
      if(ae&&ae.duration&&pf)pf.style.width=(ae.currentTime/ae.duration*100)+'%';
    },500);
  },
  _startBigVis(){
    const bars=document.querySelectorAll('[id^="nvb"]');
    if(!bars.length)return;
    const anim=()=>{
      if(!this.expanded)return;
      requestAnimationFrame(anim);
      const playing=MUSIC.playing||_ostPlaying;
      bars.forEach((b,i)=>{
        const h=playing?(4+Math.abs(Math.sin(Date.now()*.003+i*.7))*24+Math.random()*4):
                       (2+Math.sin(Date.now()*.001+i*.5)*1.5);
        b.style.height=Math.max(3,h)+'px';
      });
    };requestAnimationFrame(anim);
  },
  _refreshMusic(){
    setTimeout(()=>{
      const mPlay=(MUSIC.playing&&MUSIC.currentIdx>=0);
      const s=MUSIC.songs[MUSIC.currentIdx];
      const tn=document.querySelector('.notch-track-name');const ta=document.querySelector('.notch-track-artist');
      if(tn)tn.textContent=s?s.name:(_ostPlaying?'OST: '+OS.track:'No track playing');
      if(ta)ta.textContent=s?s.artist:(_ostPlaying?'TOB OS Synth':'—');
      const disc=document.getElementById('n-disc');if(disc)disc.className='notch-disc '+(mPlay?'spin':'');
      const pb=document.getElementById('n-play-btn');if(pb)pb.textContent=(mPlay||_ostPlaying)?'⏸':'▶';
    },100);
  },
  collapse(){
    this.expanded=false;clearInterval(this._clockInt);clearInterval(this._progInt);
    const notch=document.getElementById('dynamic-notch');notch.classList.remove('expanded');
    document.getElementById('notch-idle').style.display='';
    const exp=document.getElementById('notch-expanded');exp.style.display='none';exp.innerHTML='';
    this.update();
  }
};

/* ── ENHANCED CONTROL CENTER ── */
let _ccOpen=false;
function toggleControlCenter(){
  _ccOpen=!_ccOpen;
  const existing=document.getElementById('control-center');
  if(existing){existing.remove();_ccOpen=false;return;}
  const cc=document.createElement('div');cc.id='control-center';
  const mPlay=MUSIC.playing&&MUSIC.currentIdx>=0;
  const song=MUSIC.songs[MUSIC.currentIdx];
  const songTitle=song?song.name:(_ostPlaying?'OST — '+OS.track:'Nothing playing');
  const particlesOn=LS.get('tob_particles',true);
  cc.innerHTML=`
  <div class="cc2-header">◈ CONTROL CENTER<button class="cc2-close-btn" onclick="toggleControlCenter()">✕</button></div>
  <div class="cc2-music-bar">
    <div class="cc2-music-disc">${mPlay?'♪':'🎵'}</div>
    <div class="cc2-music-info">
      <div class="cc2-music-title">${songTitle}</div>
      <div class="cc2-music-sub">${mPlay?'Now Playing — MP3':(_ostPlaying?'OST Active':'Paused')}</div>
    </div>
    <div class="cc2-music-btns">
      <button class="cc2-mbtn" onclick="mp3Prev()">⏮</button>
      <button class="cc2-mbtn" onclick="${MUSIC.dirHandle?'mp3Pause()':'toggleMusic()'}">${(mPlay||_ostPlaying)?'⏸':'▶'}</button>
      <button class="cc2-mbtn" onclick="mp3Next()">⏭</button>
    </div>
  </div>
  <div class="cc2-tiles">
    <div class="cc2-tile ${OS.theme==='dark'?'on':''}" id="cc-dark-tile" onclick="applyTheme(OS.theme==='dark'?'light':'dark');this.classList.toggle('on',OS.theme==='dark');this.querySelector('.cc2-tile-status').textContent=OS.theme==='dark'?'Dark':'Light'">
      <div class="cc2-tile-icon">🌙</div><div class="cc2-tile-label">Dark Mode</div><div class="cc2-tile-status">${OS.theme==='dark'?'Dark':'Light'}</div>
    </div>
    <div class="cc2-tile" onclick="toast('📶 Wi-Fi — visual only')">
      <div class="cc2-tile-icon">📶</div><div class="cc2-tile-label">Wi-Fi</div><div class="cc2-tile-status" style="color:var(--neon3)">Connected</div>
    </div>
    <div class="cc2-tile" onclick="toast('🔵 Bluetooth — visual only')">
      <div class="cc2-tile-icon">🔵</div><div class="cc2-tile-label">Bluetooth</div><div class="cc2-tile-status">Off</div>
    </div>
    <div class="cc2-tile" onclick="openApp('taskmgr');toggleControlCenter()">
      <div class="cc2-tile-icon">📊</div><div class="cc2-tile-label">Task Mgr</div><div class="cc2-tile-status">${WM.windows.size} apps</div>
    </div>
    <div class="cc2-tile" onclick="openFinder();toggleControlCenter()">
      <div class="cc2-tile-icon">📁</div><div class="cc2-tile-label">Finder</div><div class="cc2-tile-status">Files</div>
    </div>
  </div>
  <div class="cc2-slider-wrap">
    <div class="cc2-slider-label"><span>🔊 Volume</span><span id="cc2-vol-val">${Math.round(OS.volume*100)}%</span></div>
    <input type="range" class="cc2-range" min="0" max="1" step=".02" value="${OS.volume}" oninput="setVolume(this.value);document.getElementById('cc2-vol-val').textContent=Math.round(this.value*100)+'%'">
  </div>
  <div class="cc2-slider-wrap">
    <div class="cc2-slider-label"><span>☀ Brightness</span><span id="cc2-bright-val">100%</span></div>
    <input type="range" class="cc2-range" min="20" max="100" value="100" style="accent-color:var(--gold)" oninput="document.body.style.filter='brightness('+this.value+'%)';document.getElementById('cc2-bright-val').textContent=this.value+'%'">
  </div>
  <div class="cc2-actions">
    <button class="cc2-act" onclick="openApp('settings');toggleControlCenter()">⚙ Settings</button>
    <button class="cc2-act" onclick="openFinder();toggleControlCenter()">📁 Finder</button>
    <button class="cc2-act" onclick="lockScreen();toggleControlCenter()">🔒 Lock Screen</button>
    <button class="cc2-act" onclick="adminReload()">↻ Restart OS</button>
  </div>`;
  document.body.appendChild(cc);
  cc.addEventListener('click',e=>e.stopPropagation());
  setTimeout(()=>document.addEventListener('click',()=>{if(_ccOpen){_ccOpen=false;cc.remove();}},{once:true}),50);
}

/* ── LOCK SCREEN ── */
function lockScreen(){
  const ls=document.getElementById('lock-screen');if(!ls)return;
  const updateLock=()=>{const n=new Date(),t=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;const days=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];document.getElementById('lock-clock').textContent=t;document.getElementById('lock-date').textContent=`${days[n.getDay()]} · ${months[n.getMonth()]} ${n.getDate()} · ${n.getFullYear()}`;};
  updateLock();const lockInt=setInterval(updateLock,1000);ls.classList.add('show');ls._int=lockInt;
}
function unlockScreen(){const ls=document.getElementById('lock-screen');if(!ls)return;clearInterval(ls._int);ls.classList.remove('show');toast('🔓 Unlocked');}

/* ── FINDER ── */
window._finderFolder='/Desktop';
window._finderView='grid';

function openFinder(){WM.create('finder','FINDER','📁',780,520,buildFinderApp);}

function finderHandleUpload(e){
  const files=e.target.files;if(!files.length)return;
  const folder=window._finderFolder||'/Desktop';
  let n=0;
  Array.from(files).forEach(file=>{
    if(file.size>5*1024*1024){toast('⚠ Too large (max 5MB): '+file.name);return;}
    const r=new FileReader();
    r.onload=ev=>{const type=file.type.startsWith('image/')?'image':file.type.startsWith('audio/')?'audio':file.type==='text/html'?'html':file.name.endsWith('.json')?'json':'file';VFS.addFile(folder,{name:file.name,type,size:file.size,data:ev.target.result,created:Date.now()});n++;toast(`📁 ${n} file${n>1?'s':''} added to ${folder}`);window.finderRefresh?.();};
    r.readAsDataURL(file);
  });
  e.target.value='';
}

window.finderHandleDrop=function(e){
  e.preventDefault();e.currentTarget.querySelector('.finder-drop-zone')?.classList.remove('show');
  const files=e.dataTransfer.files;if(!files.length)return;
  const folder=window._finderFolder||'/Desktop';let n=0;
  Array.from(files).forEach(file=>{if(file.size>5*1024*1024){toast('⚠ Too large: '+file.name);return;}const r=new FileReader();r.onload=ev=>{const type=file.type.startsWith('image/')?'image':file.type.startsWith('audio/')?'audio':file.type==='text/html'?'html':file.name.endsWith('.json')?'json':'file';VFS.addFile(folder,{name:file.name,type,size:file.size,data:ev.target.result,created:Date.now()});n++;if(n===files.length){toast(`📁 ${n} file${n>1?'s':''} added`);window.finderRefresh?.();}};r.readAsDataURL(file);});
};

function buildFinderApp(body){
  body.style.cssText='overflow:hidden;padding:0;';
  const folders=['/Desktop','/Documents','/Downloads','/Music','/Pictures','/Mods'];
  const fIcons={'/Desktop':'🖥️','/Documents':'📄','/Downloads':'⬇️','/Music':'🎵','/Pictures':'🖼️','/Mods':'🔧'};
  
  window.finderRefresh=()=>{const fw=WM.windows.get('finder');if(fw&&fw.body)buildFinderApp(fw.body);};

  const currentFolder=window._finderFolder;
  const viewMode=window._finderView||'grid';
  const files=VFS.getFiles(currentFolder);

  body.innerHTML=`<div class="finder-app">
    <div class="finder-sidebar">
      <div class="finder-sb-title">FAVOURITES</div>
      ${folders.map(f=>`<div class="finder-nav-item ${f===currentFolder?'active':''}" onclick="window._finderFolder='${f}';finderRefresh()">${fIcons[f]||'📁'} ${f.slice(1)}</div>`).join('')}
      <div class="finder-sep"></div>
      <div class="finder-sb-title">ACTIONS</div>
      <div class="finder-nav-item" onclick="document.getElementById('finder-file-input').click()">⬆️ Upload</div>
      <div class="finder-nav-item" onclick="VFS.clearFolder(window._finderFolder);finderRefresh();toast('🗑 Cleared')">🗑️ Clear Folder</div>
    </div>
    <div class="finder-main">
      <div class="finder-toolbar">
        <span class="finder-path">◈ / ${currentFolder.slice(1)}</span>
        <button class="finder-vbtn ${viewMode==='grid'?'active':''}" onclick="window._finderView='grid';finderRefresh()">⊞</button>
        <button class="finder-vbtn ${viewMode==='list'?'active':''}" onclick="window._finderView='list';finderRefresh()">☰</button>
        <button class="finder-upbtn" onclick="document.getElementById('finder-file-input').click()">⬆ Upload</button>
      </div>
      <div class="finder-content" id="finder-content"
        ondragover="event.preventDefault();this.querySelector('.finder-drop-zone').classList.add('show')"
        ondragleave="this.querySelector('.finder-drop-zone').classList.remove('show')"
        ondrop="finderHandleDrop(event)">
        <div class="finder-drop-zone">📁 Drop files here to upload</div>
        ${files.length===0?`<div class="finder-empty"><div class="finder-empty-ico">${fIcons[currentFolder]||'📁'}</div><div class="finder-empty-txt">EMPTY FOLDER</div><div style="font-size:10px;color:var(--text-muted);font-family:'Share Tech Mono',monospace;margin-top:4px">Upload or drag & drop files here</div></div>`
        : viewMode==='grid'
          ? `<div class="finder-file-grid">${files.map((f,i)=>`<div class="finder-file" id="ff${i}" onclick="finderSel(${i})" ondblclick="finderOpen(${i})"><div class="finder-icon">${f.type==='image'?`<img src="${f.data}" alt="">`:'text/audio/html/json/file'.split('/').map((t,ti)=>['🔊','🌐','⚙️','📄'][ti])[['audio','html','json','file'].indexOf(f.type)]??'📄'}</div><div class="finder-fname">${f.name}</div><div class="finder-ftype">${f.type.toUpperCase()}</div></div>`).join('')}</div>`
          : `<div>${files.map((f,i)=>`<div class="finder-file-row ${window._finderSel===i?'sel':''}" id="ff${i}" onclick="finderSel(${i})" ondblclick="finderOpen(${i})"><div class="finder-icon" style="width:32px;height:32px;font-size:14px;border-radius:6px;flex-shrink:0;">${f.type==='image'?`<img src="${f.data}" alt="">`:f.type==='audio'?'🔊':f.type==='html'?'🌐':f.type==='json'?'⚙️':'📄'}</div><div style="flex:1;min-width:0"><div class="finder-fname" style="max-width:none;font-size:12px">${f.name}</div><div class="finder-ftype">${(f.size/1024).toFixed(1)} KB · ${new Date(f.created).toLocaleDateString()}</div></div><button onclick="event.stopPropagation();VFS.deleteFile(window._finderFolder,'${f.name.replace(/'/g,"\\'")}');finderRefresh();toast('🗑 Deleted')" style="background:none;border:none;color:var(--accent);cursor:pointer;padding:4px 8px;border-radius:4px;opacity:.4;font-size:14px;transition:opacity .15s" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.4">✕</button></div>`).join('')}</div>`
        }
      </div>
      <div class="finder-statusbar">${files.length} item${files.length!==1?'s':''} · ${currentFolder} · Virtual FS</div>
    </div>
  </div>`;

  window.finderSel=idx=>{window._finderSel=idx;body.querySelectorAll('.finder-file,.finder-file-row').forEach((el,i)=>el.classList.toggle('sel',i===idx));};
  window.finderOpen=idx=>{
    const f=files[idx];if(!f)return;
    if(f.type==='image'){WM.create('img_'+idx,f.name,'🖼️',620,520,b=>{b.innerHTML=`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#000;padding:12px"><img src="${f.data}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px"></div>`;});}
    else if(f.type==='audio'){WM.create('aud_'+idx,f.name,'🎵',420,220,b=>{b.innerHTML=`<div style="padding:24px;text-align:center"><div style="font-size:48px;margin-bottom:16px">🎵</div><div style="font-family:'Orbitron',sans-serif;font-size:12px;color:var(--neon);margin-bottom:16px">${f.name}</div><audio controls src="${f.data}" style="width:100%"></audio></div>`;});}
    else if(f.type==='html'){WM.create('html_'+idx,f.name,'🌐',720,540,b=>{const iframe=document.createElement('iframe');try{const decoded=atob(f.data.split(',')[1]||'');iframe.srcdoc=decoded;}catch(e){iframe.srcdoc='<body>Could not decode</body>';}iframe.style.cssText='width:100%;height:100%;border:none;';b.appendChild(iframe);});}
    else if(f.type==='json'){try{const obj=JSON.parse(atob(f.data.split(',')[1]||''));if(obj.id&&obj.name){obj.builtin=false;obj.enabled=false;obj.tab=obj.tab||'system';if(!OS.mods.find(m=>m.id===obj.id)){OS.mods.push(obj);LS.set('tob_mods',OS.mods);}toast('📦 Mod installed: '+obj.name);}else{toast('📄 '+f.name);}}catch(e){toast('📄 '+f.name);}}
    else{toast('📄 '+f.name);}
  };
}

/* ── OVERRIDE CONTROL CENTER BUTTON SETUP ── */
// Will be added by CC button init code further down


/* ═══════════════════════════════════════════════════════════
   TOB OS v11.0 — INNOVATION UPDATE MODULES
═══════════════════════════════════════════════════════════ */

/* ── 1. BOOT ANIMATION SYSTEM ── */
const BOOT_ANIM = {
  style: 'neon_pulse',
  color: '#00b4ff',
  speed: 1.0,
  sound: false,
  styles: ['neon_pulse','cyber_grid','matrix_boot','energy_wave'],

  init() {
    this.style = LS.get('tob_boot_style','neon_pulse');
    this.color = LS.get('tob_boot_color','#00b4ff');
    this.speed = LS.get('tob_boot_speed',1.0);
    this.sound = LS.get('tob_boot_sound',false);
    this._upgradeBoot();
  },

  _upgradeBoot() {
    const boot = document.getElementById('boot');
    if (!boot) return;
    // Ensure canvas exists
    let cv = document.getElementById('boot-canvas');
    if (!cv) {
      cv = document.createElement('canvas');
      cv.id = 'boot-canvas';
      cv.style.cssText = 'position:absolute;inset:0;z-index:0;width:100%;height:100%;';
      boot.style.position = 'relative';
      boot.style.overflow = 'hidden';
      boot.insertBefore(cv, boot.firstChild);
    }
    cv.width = innerWidth; cv.height = innerHeight;
    this._runBgAnim(cv);
    this._buildBlockGrid(boot);
  },

  _runBgAnim(cv) {
    const ctx = cv.getContext('2d');
    const c = this.color;
    const s = this.style;
    let t = 0;
    const loop = () => {
      if (!document.getElementById('boot-canvas') || !document.getElementById('boot')) return;
      requestAnimationFrame(loop);
      ctx.clearRect(0,0,cv.width,cv.height);
      t += 0.02 * this.speed;
      if (s === 'neon_pulse') {
        const g = ctx.createRadialGradient(cv.width/2,cv.height/2,0,cv.width/2,cv.height/2,cv.width*.6);
        const al = 0.08 + Math.sin(t)*0.05;
        g.addColorStop(0,`rgba(0,80,200,${al})`);
        g.addColorStop(1,'transparent');
        ctx.fillStyle = g; ctx.fillRect(0,0,cv.width,cv.height);
        for(let i=0;i<3;i++){
          ctx.beginPath();
          ctx.arc(cv.width/2,cv.height/2,(120+i*60)*(1+Math.sin(t+i)*0.08),0,Math.PI*2);
          ctx.strokeStyle = `rgba(0,180,255,${0.04+Math.sin(t+i*1.2)*0.02})`;
          ctx.lineWidth = 1.5; ctx.stroke();
        }
      } else if (s === 'cyber_grid') {
        const CELL = 40;
        const off = (t * 20) % CELL;
        ctx.strokeStyle = 'rgba(0,180,255,0.05)'; ctx.lineWidth = 0.8;
        for(let x=-off;x<cv.width+CELL;x+=CELL){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke();}
        for(let y=-off;y<cv.height+CELL;y+=CELL){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke();}
        // horizon glow
        const hy = cv.height * 0.55;
        const gr = ctx.createLinearGradient(0,hy-80,0,hy+80);
        gr.addColorStop(0,'transparent');
        gr.addColorStop(0.5,`rgba(0,180,255,${0.08+Math.sin(t)*0.03})`);
        gr.addColorStop(1,'transparent');
        ctx.fillStyle = gr; ctx.fillRect(0,hy-80,cv.width,160);
      } else if (s === 'energy_wave') {
        for(let i=0;i<4;i++){
          ctx.beginPath(); ctx.moveTo(0,cv.height*0.45);
          for(let x=0;x<=cv.width;x+=4){
            ctx.lineTo(x, cv.height*0.45 + Math.sin(x*0.006+t+i*0.8)*40);
          }
          ctx.strokeStyle = `rgba(0,${160+i*20},255,${0.06+Math.sin(t+i)*0.02})`;
          ctx.lineWidth = 1.5; ctx.stroke();
        }
      }
      // matrix_boot handled by existing matrix rain
    };
    loop();
    if (s === 'matrix_boot') {
      const mCv = document.createElement('canvas');
      mCv.style.cssText = 'position:absolute;inset:0;opacity:0.1;pointer-events:none;z-index:0;';
      mCv.width = innerWidth; mCv.height = innerHeight;
      document.getElementById('boot')?.appendChild(mCv);
      const mCtx = mCv.getContext('2d');
      const drops = Array(200).fill(1);
      setInterval(()=>{
        if (!document.getElementById('boot')) return;
        mCtx.fillStyle = 'rgba(0,0,0,.07)';
        mCtx.fillRect(0,0,mCv.width,mCv.height);
        mCtx.fillStyle = '#00ff41'; mCtx.font = '13px monospace';
        drops.forEach((y,i)=>{
          mCtx.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*14,y*14);
          drops[i] = y*14>mCv.height && Math.random()>.97 ? 0 : y+1;
        });
      }, 45);
    }
  },

  _buildBlockGrid(boot) {
    const COLS = 8, ROWS = 4;
    if (boot.querySelector('.boot-block-grid')) return;
    // Boot overlay is already in HTML - just reference it
    const ov = boot.querySelector('.boot-overlay') || boot;
    const grid = document.createElement('div');
    grid.className = 'boot-block-grid';
    grid.style.cssText = `display:grid;grid-template-columns:repeat(${COLS},1fr);gap:4px;margin:8px 0;`;
    for(let i=0;i<COLS*ROWS;i++){
      const b = document.createElement('div'); b.className='boot-block'; grid.appendChild(b);
    }
    // Insert after boot-bar-wrap if it exists, else after boot-msg
    const barWrap = (ov||boot).querySelector('.boot-bar-wrap');
    const msg = (ov||boot).querySelector('.boot-msg');
    if (barWrap) barWrap.after(grid);
    else if (msg) msg.after(grid);
    else (ov||boot).appendChild(grid);
    // Animate blocks filling
    const blocks = grid.querySelectorAll('.boot-block');
    let idx = 0;
    const interval = setInterval(()=>{
      if (idx < blocks.length) { blocks[idx].classList.add('lit'); idx++; }
      else clearInterval(interval);
    }, Math.max(20, Math.round(100 / this.speed)));
    // Play boot sound
    if (this.sound) {
      try {
        const ac = new AudioContext();
        const o = ac.createOscillator(); const g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.frequency.setValueAtTime(220,ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(880,ac.currentTime+0.8);
        g.gain.setValueAtTime(0.06,ac.currentTime);
        g.gain.linearRampToValueAtTime(0,ac.currentTime+1.2);
        o.start(); o.stop(ac.currentTime+1.2);
      } catch(e){}
    }
  }
};

/* ── 2. BLOCK LOADER ── */
function showBlockLoader(parentEl, label, duration, onDone) {
  const ov = document.createElement('div');
  ov.className = 'block-loader-overlay';
  const COLS = 6, ROWS = 4;
  const grid = document.createElement('div');
  grid.className = 'block-loader-grid';
  grid.style.cssText = `display:grid;grid-template-columns:repeat(${COLS},1fr);gap:3px;`;
  const blocks = [];
  for(let i=0;i<COLS*ROWS;i++){
    const b=document.createElement('div');b.className='bl-block';grid.appendChild(b);blocks.push(b);
  }
  const lbl = document.createElement('div');
  lbl.className = 'block-loader-label';
  lbl.textContent = label || 'LOADING...';
  ov.appendChild(grid); ov.appendChild(lbl);
  parentEl.style.position='relative'; parentEl.appendChild(ov);
  // Fill blocks
  let idx=0;
  const interval = setInterval(()=>{
    if(idx<blocks.length){blocks[idx].classList.add('lit');idx++;}
    else { clearInterval(interval); setTimeout(()=>{ ov.remove(); if(onDone)onDone(); },120); }
  }, Math.max(10, Math.round((duration||600)/(COLS*ROWS))));
}

/* ── 3. SWIPE DOWN CONTROL CENTER GESTURE ── */
(()=>{
  const zone = document.getElementById('cc-swipe-zone');
  if(!zone) return;
  let startY=0, startX=0, tracking=false;
  const THRESHOLD = 30;
  const onStart = (x,y) => { startY=y; startX=x; tracking=true; };
  const onMove = (x,y) => {
    if(!tracking) return;
    if(Math.abs(x-startX)>30){tracking=false;return;}
    if(y-startY > THRESHOLD){
      tracking=false;
      if(!document.getElementById('control-center')) toggleControlCenter();
    }
  };
  const onEnd = () => tracking=false;
  zone.addEventListener('mousedown',e=>onStart(e.clientX,e.clientY));
  document.addEventListener('mousemove',e=>{ if(tracking) onMove(e.clientX,e.clientY); });
  document.addEventListener('mouseup',onEnd);
  zone.addEventListener('touchstart',e=>onStart(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  document.addEventListener('touchmove',e=>{ if(tracking) onMove(e.touches[0].clientX,e.touches[0].clientY); },{passive:true});
  document.addEventListener('touchend',onEnd);
  // Also set clock label as swipe hint
  const sbClock = document.getElementById('sb-clock');
  if(sbClock){ sbClock.title='Click or swipe ↓ for Control Center'; sbClock.style.cursor='pointer'; sbClock.style.userSelect='none'; sbClock.addEventListener('click',e=>{e.stopPropagation();toggleControlCenter();}); }
})();

/* ── 4. TASKBAR UPGRADES ── */
const TaskbarPro = {
  centered: LS.get('tob_tb_centered',false),
  pinnedApps: LS.get('tob_tb_pinned',[]),
  _previewTimer: null,
  _ctxMenu: null,

  init() {
    this._addWidgetBtn();
    this._addNotifBtn();
    this._applyCentered();
    this._initEdgeSwipe();
    // Intercept existing syncTaskbar to add pro features
    const origSync = syncTaskbar;
    window.syncTaskbar = () => { origSync(); this._enhanceTaskbarItems(); };
    // Context menu
    document.getElementById('taskbar').addEventListener('contextmenu',e=>{
      e.preventDefault(); this._showTaskbarCtxMenu(e);
    });
  },

  _addWidgetBtn() {
    const tbRight = document.getElementById('tb-right');
    if(!tbRight || document.getElementById('tb-widgets-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'tb-widgets-btn'; btn.title = 'Widgets';
    btn.textContent = '⊟';
    btn.onclick = () => toggleWidgetPanel();
    tbRight.insertBefore(btn, tbRight.firstChild);
    const notifBtn = document.createElement('button');
    notifBtn.id = 'tb-notif-btn'; notifBtn.title = 'Notifications';
    notifBtn.innerHTML = '🔔<span class="tb-notif-badge" id="notif-badge"></span>';
    notifBtn.onclick = () => { toast('◈ No new notifications'); };
    tbRight.insertBefore(notifBtn, btn);
  },

  _addNotifBtn() {}, // handled in _addWidgetBtn

  _applyCentered() {
    const tb = document.getElementById('taskbar');
    if(!tb) return;
    tb.classList.toggle('centered', this.centered);
  },

  _enhanceTaskbarItems() {
    document.querySelectorAll('.tb-app').forEach(el=>{
      const id = el.dataset.winId;
      if(!id) return;
      // Add run dot
      if(!el.querySelector('.tb-run-dot')){
        const dot = document.createElement('div'); dot.className='tb-run-dot'; el.appendChild(dot);
      }
      // Hover preview
      el.addEventListener('mouseenter',()=>{
        clearTimeout(this._previewTimer);
        this._previewTimer = setTimeout(()=>this._showPreview(el,id), 400);
      });
      el.addEventListener('mouseleave',()=>{
        clearTimeout(this._previewTimer);
        document.getElementById('tb-preview-popup')?.remove();
      });
      // Right click
      el.addEventListener('contextmenu',e=>{
        e.preventDefault(); e.stopPropagation();
        this._showAppCtxMenu(e,id,el);
      });
    });
  },

  _showPreview(tbEl, winId) {
    document.getElementById('tb-preview-popup')?.remove();
    if(!winId) return;
    const w = WM.windows.get(winId);
    if(!w || !w.el || w.el.style.display==='none') return;
    const pop = document.createElement('div');
    pop.id='tb-preview-popup'; pop.className='tb-preview';
    const rect = tbEl.getBoundingClientRect();
    pop.style.left = Math.max(4,rect.left-20)+'px';
    const icon = tbEl.querySelector('.tb-app-icon')?.textContent||'📱';
    const label = tbEl.querySelector('.tb-app-label')?.textContent||winId;
    pop.innerHTML = `<div class="tb-preview-title">${label.toUpperCase()}</div><div class="tb-preview-thumb">${icon}</div>`;
    document.body.appendChild(pop);
  },

  _showAppCtxMenu(e, winId, tbEl) {
    this._closeCtxMenu();
    const menu = document.createElement('div');
    menu.className = 'tb-ctx-menu'; menu.id='tb-ctx-menu';
    const menuBottom=innerHeight-e.clientY+4; const menuLeft=Math.min(Math.max(4,e.clientX-10),innerWidth-180); menu.style.cssText = `left:${menuLeft}px;bottom:${Math.max(50,menuBottom)}px;`;
    const pinned = this.pinnedApps.includes(winId);
    const icon = tbEl.querySelector('.tb-app-icon')?.textContent||'📱';
    const label = tbEl.querySelector('.tb-app-label')?.textContent||winId;
    menu.innerHTML = `
      <div class="tb-ctx-item" style="font-family:'Orbitron',sans-serif;font-size:9px;color:var(--text);pointer-events:none;opacity:.7">${icon} ${label}</div>
      <div class="tb-ctx-sep"></div>
      <div class="tb-ctx-item" onclick="WM.focus('${winId}');TaskbarPro._closeCtxMenu()">⬆ Restore</div>
      <div class="tb-ctx-item" onclick="WM.minimize('${winId}');TaskbarPro._closeCtxMenu()">⬇ Minimize</div>
      <div class="tb-ctx-item" onclick="WM.toggleMax('${winId}');TaskbarPro._closeCtxMenu()">⬜ Maximize</div>
      <div class="tb-ctx-sep"></div>
      <div class="tb-ctx-item" onclick="TaskbarPro.togglePin('${winId}');TaskbarPro._closeCtxMenu()">${pinned?'📌 Unpin':'📌 Pin to Taskbar'}</div>
      <div class="tb-ctx-sep"></div>
      <div class="tb-ctx-item" style="color:var(--accent)" onclick="WM.close('${winId}');TaskbarPro._closeCtxMenu()">✕ Close</div>`;
    document.body.appendChild(menu);
    this._ctxMenu = menu;
    setTimeout(()=>document.addEventListener('click',this._closeCtxMenu.bind(this),{once:true}),50);
  },

  _showTaskbarCtxMenu(e) {
    this._closeCtxMenu();
    const menu = document.createElement('div');
    menu.className='tb-ctx-menu'; menu.id='tb-ctx-menu';
    const tbMenuBottom=innerHeight-e.clientY+4; const tbMenuLeft=Math.min(Math.max(4,e.clientX),innerWidth-200); menu.style.cssText = `left:${tbMenuLeft}px;bottom:${Math.max(50,tbMenuBottom)}px;`;
    menu.innerHTML = `
      <div class="tb-ctx-item" onclick="TaskbarPro.toggleCentered();TaskbarPro._closeCtxMenu()">
        ${this.centered?'◀ Left-align Icons':'↔ Center Icons'}
      </div>
      <div class="tb-ctx-item" onclick="toggleWidgetPanel();TaskbarPro._closeCtxMenu()">⊟ Toggle Widgets</div>
      <div class="tb-ctx-item" onclick="toggleControlCenter();TaskbarPro._closeCtxMenu()">⊞ Control Center</div>
      <div class="tb-ctx-sep"></div>
      <div class="tb-ctx-item" onclick="openApp('settings');TaskbarPro._closeCtxMenu()">⚙ Taskbar Settings</div>`;
    document.body.appendChild(menu);
    this._ctxMenu = menu;
    setTimeout(()=>document.addEventListener('click',this._closeCtxMenu.bind(this),{once:true}),50);
  },

  _closeCtxMenu() {
    document.getElementById('tb-ctx-menu')?.remove();
    this._ctxMenu=null;
  },

  toggleCentered() {
    this.centered=!this.centered; LS.set('tob_tb_centered',this.centered);
    this._applyCentered(); toast(this.centered?'↔ Icons centered':'◀ Icons left-aligned');
  },

  togglePin(winId) {
    const idx=this.pinnedApps.indexOf(winId);
    if(idx>=0) this.pinnedApps.splice(idx,1); else this.pinnedApps.push(winId);
    LS.set('tob_tb_pinned',this.pinnedApps);
    document.querySelectorAll('.tb-app').forEach(el=>{
      if(el.dataset.winId===winId) el.classList.toggle('pinned',this.pinnedApps.includes(winId));
    });
    toast(this.pinnedApps.includes(winId)?'📌 Pinned to taskbar':'📌 Unpinned');
  },

  _initEdgeSwipe() {
    let startX=0,startY=0,tracking=false;
    const onStart=(x,y)=>{ if(x<20){tracking=true;startX=x;startY=y;} };
    const onMove=(x,y)=>{ if(!tracking)return; if(x-startX>60){tracking=false;toggleWidgetPanel(true);} };
    const onEnd=()=>tracking=false;
    document.addEventListener('mousedown',e=>onStart(e.clientX,e.clientY));
    document.addEventListener('mousemove',e=>{if(tracking)onMove(e.clientX,e.clientY);});
    document.addEventListener('mouseup',onEnd);
    document.addEventListener('touchstart',e=>onStart(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
    document.addEventListener('touchmove',e=>{if(tracking)onMove(e.touches[0].clientX,e.touches[0].clientY);},{passive:true});
    document.addEventListener('touchend',onEnd);
  }
};

/* ── 5. WIDGET DASHBOARD ── */
const WidgetSystem = {
  activeWidgets: [],
  _clockInt: null,
  _statsInt: null,

  defaultWidgets: ['clock','music','stats','shortcuts','notes','calendar'],

  init() {
    this.activeWidgets = LS.get('tob_widgets', this.defaultWidgets);
    this.render();
    this._startClock();
    this._startStats();
  },

  render() {
    const list = document.getElementById('widget-list');
    if(!list) return;
    list.innerHTML = '';
    this.activeWidgets.forEach(id => {
      const el = this._buildWidget(id);
      if(el) list.appendChild(el);
    });
  },

  _buildWidget(id) {
    const w = document.createElement('div');
    w.className = 'widget'; w.dataset.wid = id;
    const header = `<div class="widget-header"><span class="widget-title">${this._widgetTitle(id)}</span><button class="widget-remove" onclick="WidgetSystem.removeWidget('${id}')">✕</button></div>`;
    if(id==='clock'){
      const n=new Date();
      const t=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
      const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const d=`${days[n.getDay()]} · ${months[n.getMonth()]} ${n.getDate()}`;
      w.innerHTML=header+`<div class="w-clock-time" id="w-clock-time">${t}</div><div class="w-clock-date" id="w-clock-date">${d}</div>`;
    } else if(id==='music'){
      const song=(MUSIC.currentIdx>=0)?MUSIC.songs[MUSIC.currentIdx]:null;
      const title=song?song.name:(_ostPlaying?'OST: '+OS.track:'Nothing playing');
      w.innerHTML=header+`<div class="w-music-track" id="w-music-track">${title}</div><div class="w-music-btns"><button class="w-mbtn" onclick="mp3Prev()">⏮</button><button class="w-mbtn" id="w-play-btn" onclick="${MUSIC.dirHandle?'mp3Pause()':'toggleMusic()'}">${(MUSIC.playing||_ostPlaying)?'⏸':'▶'}</button><button class="w-mbtn" onclick="mp3Next()">⏭</button></div>`;
    } else if(id==='stats'){
      const mem=Math.round(performance.memory?.usedJSHeapSize/1048576)||0;
      const memMax=Math.round(performance.memory?.jsHeapSizeLimit/1048576)||256;
      const memPct=Math.min(100,Math.round(mem/memMax*100));
      w.innerHTML=header+`<div id="w-stats-body">
        <div class="w-stat-row"><span class="w-stat-label">JS Heap</span><span class="w-stat-val" id="ws-mem">${mem}MB</span></div>
        <div class="w-stat-bar"><div class="w-stat-fill" id="ws-mem-bar" style="width:${memPct}%"></div></div>
        <div class="w-stat-row" style="margin-top:5px"><span class="w-stat-label">Windows</span><span class="w-stat-val" id="ws-wins">${WM.windows.size}</span></div>
        <div class="w-stat-row"><span class="w-stat-label">Active Mods</span><span class="w-stat-val" id="ws-mods">${getActiveMods().filter(m=>m.enabled).length}</span></div>
        <div class="w-stat-row"><span class="w-stat-label">Live WP</span><span class="w-stat-val">${liveWP.active||'Off'}</span></div>
      </div>`;
    } else if(id==='notes'){
      const saved=LS.get('tob_widget_notes','');
      w.innerHTML=header+`<textarea class="w-notes-area" placeholder="Type a note..." oninput="LS.set('tob_widget_notes',this.value)">${saved}</textarea>`;
    } else if(id==='shortcuts'){
      const apps=[{id:'finder',icon:'📁',label:'Finder'},{id:'music',icon:'🎵',label:'Music'},{id:'calc',icon:'🧮',label:'Calc'},{id:'appstore',icon:'🛍️',label:'Store'},{id:'settings',icon:'⚙️',label:'Settings'},{id:'mods',icon:'🔧',label:'Mods'},{id:'taskmgr',icon:'📊',label:'Tasks'},{id:'updatelog',icon:'📋',label:'Updates'}];
      w.innerHTML=header+`<div class="w-shortcuts-grid">${apps.map(a=>`<div class="w-shortcut" onclick="openApp('${a.id}')"><div class="w-shortcut-icon">${a.icon}</div><div class="w-shortcut-lbl">${a.label}</div></div>`).join('')}</div>`;
    } else if(id==='calendar'){
      const n=new Date();
      const y=n.getFullYear(),m=n.getMonth(),d=n.getDate();
      const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
      const firstDay=new Date(y,m,1).getDay();
      const daysInMonth=new Date(y,m+1,0).getDate();
      let cells='';
      for(let i=0;i<firstDay;i++) cells+='<div class="w-cal-day"></div>';
      for(let i=1;i<=daysInMonth;i++) cells+=`<div class="w-cal-day${i===d?' today':''}">${i}</div>`;
      w.innerHTML=header+`<div class="w-cal-header"><span class="w-cal-title">${months[m]} ${y}</span></div><div class="w-cal-grid"><div class="w-cal-day-hdr">S</div><div class="w-cal-day-hdr">M</div><div class="w-cal-day-hdr">T</div><div class="w-cal-day-hdr">W</div><div class="w-cal-day-hdr">T</div><div class="w-cal-day-hdr">F</div><div class="w-cal-day-hdr">S</div>${cells}</div>`;
    }
    return w;
  },

  _widgetTitle(id){return{clock:'🕐 Clock',music:'🎵 Music',stats:'📊 System',notes:'📝 Notes',shortcuts:'⚡ Shortcuts',calendar:'📅 Calendar'}[id]||id;},

  removeWidget(id){
    this.activeWidgets=this.activeWidgets.filter(w=>w!==id);
    LS.set('tob_widgets',this.activeWidgets);this.render();
  },

  addWidget(id){
    if(!this.activeWidgets.includes(id)){this.activeWidgets.push(id);LS.set('tob_widgets',this.activeWidgets);this.render();toggleWidgetPanel(true);}
  },

  _startClock(){
    clearInterval(this._clockInt); this._clockInt=null;
    this._clockInt=setInterval(()=>{
      const n=new Date();
      const t=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;
      const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const d=`${days[n.getDay()]} · ${months[n.getMonth()]} ${n.getDate()}`;
      const te=document.getElementById('w-clock-time');const de=document.getElementById('w-clock-date');
      if(te)te.textContent=t;if(de)de.textContent=d;
    },5000);
  },

  _startStats(){
    clearInterval(this._statsInt); this._statsInt=null;
    this._statsInt=setInterval(()=>{
      const mem=Math.round(performance.memory?.usedJSHeapSize/1048576)||0;
      const memMax=Math.round(performance.memory?.jsHeapSizeLimit/1048576)||256;
      const memPct=Math.min(100,Math.round(mem/memMax*100));
      const me=document.getElementById('ws-mem');const mb=document.getElementById('ws-mem-bar');
      const we=document.getElementById('ws-wins');const mode=document.getElementById('ws-mods');
      if(me)me.textContent=mem+'MB';if(mb)mb.style.width=memPct+'%';
      if(we)we.textContent=WM.windows.size;if(mode)mode.textContent=getActiveMods().filter(m=>m.enabled).length;
      // Update music widget
      const mt=document.getElementById('w-music-track');
      if(mt){const song=MUSIC.songs[MUSIC.currentIdx];mt.textContent=song?song.name:(_ostPlaying?'OST: '+OS.track:'Nothing playing');}
    },3000);
  }
};

let _widgetOpen=false;
function toggleWidgetPanel(force){
  _widgetOpen = force!==undefined ? force : !_widgetOpen;
  const panel=document.getElementById('widget-panel');
  if(!panel) return;
  panel.classList.toggle('open',_widgetOpen);
  if(_widgetOpen) WidgetSystem.render();
}

/* ── 6. APP STORE ── */

/* ── SVG ICON REGISTRY ── */
const SVG_ICONS = {
  chess: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="18" height="18" rx="2" fill="rgba(0,180,255,0.15)" stroke="rgba(0,180,255,0.4)" stroke-width="1.5"/>
    <rect x="26" y="4" width="18" height="18" rx="2" fill="rgba(0,180,255,0.05)" stroke="rgba(0,180,255,0.2)" stroke-width="1.5"/>
    <rect x="4" y="26" width="18" height="18" rx="2" fill="rgba(0,180,255,0.05)" stroke="rgba(0,180,255,0.2)" stroke-width="1.5"/>
    <rect x="26" y="26" width="18" height="18" rx="2" fill="rgba(0,180,255,0.15)" stroke="rgba(0,180,255,0.4)" stroke-width="1.5"/>
    <circle cx="13" cy="11" r="4" fill="#00b4ff"/>
    <rect x="10" y="15" width="6" height="5" rx="1" fill="#00b4ff"/>
    <path d="M35 8 L37 13 L33 13 Z" fill="#00ffcc"/>
    <rect x="33" y="13" width="6" height="4" rx="1" fill="#00ffcc"/>
  </svg>`,

  synth: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="16" width="40" height="20" rx="4" fill="rgba(100,0,200,0.2)" stroke="rgba(150,0,255,0.5)" stroke-width="1.5"/>
    <rect x="7" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="13" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="19" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="25" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="31" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="37" y="20" width="4" height="12" rx="1" fill="rgba(255,255,255,0.7)"/>
    <rect x="9.5" y="19" width="3" height="8" rx="1" fill="#9900ff"/>
    <rect x="15.5" y="19" width="3" height="8" rx="1" fill="#9900ff"/>
    <rect x="21.5" y="19" width="3" height="8" rx="1" fill="#9900ff"/>
    <rect x="27.5" y="19" width="3" height="8" rx="1" fill="#9900ff"/>
    <rect x="33.5" y="19" width="3" height="8" rx="1" fill="#9900ff"/>
    <path d="M8 12 Q16 6 24 12 Q32 18 40 12" stroke="#9900ff" stroke-width="1.5" fill="none" opacity="0.8"/>
    <circle cx="24" cy="12" r="2" fill="#cc44ff"/>
  </svg>`,

  terminal: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="40" height="32" rx="6" fill="rgba(0,10,30,0.9)" stroke="rgba(0,180,255,0.4)" stroke-width="1.5"/>
    <rect x="4" y="8" width="40" height="8" rx="6" fill="rgba(0,180,255,0.15)"/>
    <rect x="12" y="10" width="4" height="4" rx="1" fill="#ff5f57" opacity="0.9"/>
    <rect x="18" y="10" width="4" height="4" rx="1" fill="#febc2e" opacity="0.9"/>
    <rect x="24" y="10" width="4" height="4" rx="1" fill="#27c840" opacity="0.9"/>
    <text x="8" y="28" font-family="monospace" font-size="7" fill="#00ffcc">$ run --power</text>
    <text x="8" y="36" font-family="monospace" font-size="7" fill="#00b4ff">▶ executing_</text>
    <rect x="8" y="32" width="1.5" height="6" rx="1" fill="#00b4ff" opacity="0.8"/>
  </svg>`,

  habits: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" stroke="rgba(0,255,150,0.3)" stroke-width="2" fill="none"/>
    <path d="M24 6 A18 18 0 0 1 42 24" stroke="#39ff14" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M24 6 A18 18 0 0 1 38 37" stroke="#00ffcc" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
    <circle cx="24" cy="24" r="6" fill="rgba(57,255,20,0.2)" stroke="#39ff14" stroke-width="1.5"/>
    <path d="M20 24 L23 27 L28 21" stroke="#39ff14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="24" cy="6" r="2.5" fill="#39ff14"/>
  </svg>`,

  rpg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,4 44,16 44,32 24,44 4,32 4,16" fill="rgba(255,215,0,0.08)" stroke="rgba(255,215,0,0.4)" stroke-width="1.5"/>
    <path d="M24 10 L38 18 L38 30 L24 38 L10 30 L10 18 Z" fill="rgba(255,215,0,0.05)" stroke="rgba(255,215,0,0.2)" stroke-width="1"/>
    <text x="24" y="27" font-family="serif" font-size="14" fill="#ffd700" text-anchor="middle" font-weight="bold">⚔</text>
    <circle cx="24" cy="8" r="2" fill="#ffd700"/>
    <circle cx="40" cy="17" r="2" fill="#ffd700"/>
    <circle cx="40" cy="31" r="2" fill="#ffd700"/>
    <circle cx="24" cy="40" r="2" fill="#ffd700"/>
    <circle cx="8" cy="31" r="2" fill="#ffd700"/>
    <circle cx="8" cy="17" r="2" fill="#ffd700"/>
  </svg>`,

  flashcards: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="36" height="26" rx="4" fill="rgba(0,180,255,0.06)" stroke="rgba(0,180,255,0.25)" stroke-width="1.5"/>
    <rect x="10" y="8" width="36" height="26" rx="4" fill="rgba(0,180,255,0.04)" stroke="rgba(0,180,255,0.15)" stroke-width="1.5"/>
    <rect x="14" y="4" width="20" height="30" rx="4" fill="rgba(2,8,22,0.95)" stroke="rgba(0,180,255,0.4)" stroke-width="1.5"/>
    <text x="24" y="17" font-family="monospace" font-size="8" fill="#00b4ff" text-anchor="middle">WHAT IS</text>
    <line x1="17" y1="20" x2="31" y2="20" stroke="rgba(0,180,255,0.3)" stroke-width="1"/>
    <text x="24" y="27" font-family="monospace" font-size="7" fill="#00ffcc" text-anchor="middle">RIFT?</text>
    <text x="24" y="32" font-family="monospace" font-size="5" fill="rgba(0,180,255,0.4)" text-anchor="middle">TAP TO REVEAL</text>
  </svg>`,

  budget: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="40" height="36" rx="5" fill="rgba(0,200,100,0.06)" stroke="rgba(0,200,100,0.3)" stroke-width="1.5"/>
    <rect x="9" y="30" width="6" height="8" rx="1" fill="rgba(57,255,20,0.6)"/>
    <rect x="18" y="22" width="6" height="16" rx="1" fill="rgba(0,180,255,0.7)"/>
    <rect x="27" y="25" width="6" height="13" rx="1" fill="rgba(57,255,20,0.5)"/>
    <rect x="36" y="14" width="6" height="24" rx="1" fill="rgba(0,255,200,0.7)"/>
    <path d="M12 26 L21 18 L30 22 L39 10" stroke="#39ff14" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    <circle cx="12" cy="26" r="1.5" fill="#39ff14"/>
    <circle cx="21" cy="18" r="1.5" fill="#39ff14"/>
    <circle cx="30" cy="22" r="1.5" fill="#39ff14"/>
    <circle cx="39" cy="10" r="1.5" fill="#39ff14"/>
    <text x="9" y="12" font-family="monospace" font-size="7" fill="rgba(57,255,20,0.7)">CREDITS</text>
  </svg>`,

  clan: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="16" r="6" fill="rgba(255,45,110,0.15)" stroke="rgba(255,45,110,0.5)" stroke-width="1.5"/>
    <circle cx="10" cy="34" r="5" fill="rgba(0,180,255,0.15)" stroke="rgba(0,180,255,0.4)" stroke-width="1.5"/>
    <circle cx="38" cy="34" r="5" fill="rgba(0,255,200,0.15)" stroke="rgba(0,255,200,0.4)" stroke-width="1.5"/>
    <line x1="24" y1="22" x2="13" y2="30" stroke="rgba(255,45,110,0.4)" stroke-width="1.5"/>
    <line x1="24" y1="22" x2="35" y2="30" stroke="rgba(255,45,110,0.4)" stroke-width="1.5"/>
    <line x1="15" y1="34" x2="33" y2="34" stroke="rgba(0,180,255,0.3)" stroke-width="1"/>
    <circle cx="24" cy="16" r="2.5" fill="#ff2d6e"/>
    <circle cx="10" cy="34" r="2" fill="#00b4ff"/>
    <circle cx="38" cy="34" r="2" fill="#00ffcc"/>
    <path d="M20 6 L24 2 L28 6" stroke="rgba(255,215,0,0.6)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  abilitytest: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,4 30,18 44,18 33,27 37,41 24,32 11,41 15,27 4,18 18,18" fill="rgba(255,215,0,0.1)" stroke="rgba(255,215,0,0.5)" stroke-width="1.5"/>
    <polygon points="24,12 27,20 36,20 29,25 32,33 24,28 16,33 19,25 12,20 21,20" fill="rgba(255,215,0,0.2)" stroke="rgba(255,215,0,0.3)" stroke-width="1"/>
    <circle cx="24" cy="24" r="4" fill="#ffd700" opacity="0.9"/>
    <path d="M24 20 L24 8" stroke="#ffd700" stroke-width="1" opacity="0.5"/>
  </svg>`,

  worldmap: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="24" rx="18" ry="18" stroke="rgba(0,180,255,0.4)" stroke-width="1.5" fill="rgba(0,20,60,0.5)"/>
    <ellipse cx="24" cy="24" rx="8" ry="18" stroke="rgba(0,180,255,0.2)" stroke-width="1" fill="none"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke="rgba(0,180,255,0.2)" stroke-width="1"/>
    <line x1="6" y1="16" x2="42" y2="16" stroke="rgba(0,180,255,0.1)" stroke-width="0.8"/>
    <line x1="6" y1="32" x2="42" y2="32" stroke="rgba(0,180,255,0.1)" stroke-width="0.8"/>
    <path d="M14 14 L20 18 L18 24 L22 26 L24 22 L28 24 L32 20 L28 16 Z" fill="rgba(0,180,255,0.25)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
    <path d="M10 27 L14 28 L16 32 L12 34 Z" fill="rgba(0,180,255,0.2)" stroke="rgba(0,180,255,0.3)" stroke-width="1"/>
    <circle cx="30" cy="28" r="3" fill="rgba(255,45,110,0.5)" stroke="rgba(255,45,110,0.8)" stroke-width="1"/>
    <circle cx="30" cy="28" r="1" fill="#ff2d6e"/>
  </svg>`,

  waveform: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="40" height="40" rx="8" fill="rgba(0,5,20,0.8)" stroke="rgba(100,0,200,0.3)" stroke-width="1.5"/>
    <path d="M4 24 Q8 24 10 16 Q12 8 14 24 Q16 40 18 24 Q20 8 22 24 Q24 40 26 24 Q28 8 30 24 Q32 40 34 24 Q36 8 38 24 Q40 40 44 24" stroke="#9900ff" stroke-width="1.5" fill="none" opacity="0.9"/>
    <path d="M4 24 Q8 24 10 20 Q12 16 14 24 Q16 32 18 24 Q20 16 22 24 Q24 32 26 24 Q28 16 30 24 Q32 32 34 24 Q36 16 38 24 Q40 32 44 24" stroke="#00ffcc" stroke-width="1" fill="none" opacity="0.5"/>
    <line x1="4" y1="24" x2="44" y2="24" stroke="rgba(255,255,255,0.06)" stroke-width="0.8"/>
  </svg>`,

  spaceshooter: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="48" height="48" rx="4" fill="rgba(0,0,10,0.95)"/>
    <circle cx="8" cy="8" r="1" fill="white" opacity="0.6"/>
    <circle cx="20" cy="5" r="1.5" fill="white" opacity="0.8"/>
    <circle cx="35" cy="12" r="1" fill="white" opacity="0.5"/>
    <circle cx="43" cy="6" r="1" fill="white" opacity="0.7"/>
    <circle cx="5" cy="35" r="1" fill="white" opacity="0.4"/>
    <circle cx="40" cy="40" r="1.5" fill="white" opacity="0.6"/>
    <polygon points="24,8 30,28 24,24 18,28" fill="rgba(0,180,255,0.9)" stroke="#00b4ff" stroke-width="1"/>
    <path d="M18 28 L14 34 L24 30 L34 34 L30 28" fill="rgba(0,80,200,0.7)" stroke="rgba(0,180,255,0.4)" stroke-width="0.8"/>
    <ellipse cx="24" cy="26" rx="3" ry="2" fill="rgba(0,255,200,0.6)"/>
    <line x1="24" y1="28" x2="24" y2="44" stroke="#00ffcc" stroke-width="1.5" opacity="0.7" stroke-dasharray="2,2"/>
    <polygon points="12,10 16,14 12,14" fill="rgba(255,45,110,0.8)"/>
    <polygon points="36,16 40,14 40,18" fill="rgba(255,45,110,0.8)"/>
  </svg>`,
};

function renderSVGIcon(id, bgClass) {
  const svg = SVG_ICONS[id];
  if(!svg) return null;
  const wrap = document.createElement('div');
  wrap.className = 'store-svg-icon ' + (bgClass||'');
  wrap.innerHTML = svg;
  return wrap;
}

const APP_STORE_CATALOG = [
  {id:'as_notes',name:'QuickNotes',icon:'📝',cat:'Productivity',desc:'A fast, minimal note-taking app with markdown support.',screenshots:['📝','✏️','📄'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:#010812;color:#c8e8ff;font-family:Rajdhani,sans-serif;padding:16px;}textarea{width:100%;height:calc(100vh - 80px);background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.25);border-radius:10px;color:#c8e8ff;font-size:14px;padding:12px;resize:none;outline:none;box-sizing:border-box;}h2{font-size:12px;color:#00b4ff;font-family:monospace;letter-spacing:3px;margin-bottom:10px;}button{padding:5px 14px;border-radius:6px;background:rgba(0,180,255,.15);border:1px solid rgba(0,180,255,.3);color:#00b4ff;cursor:pointer;font-size:10px;}</style></head><body><h2>◈ QUICKNOTES</h2><button onclick="document.querySelector('textarea').value='';localStorage.removeItem('qn')">+ New</button> <button onclick="localStorage.setItem('qn',document.querySelector('textarea').value);alert('Saved!')">💾 Save</button><textarea placeholder="Start typing..."></textarea><script>const ta=document.querySelector('textarea');ta.value=localStorage.getItem('qn')||'';<\/script></body></html>`},
  {id:'as_draw',name:'PixelDraw',icon:'🎨',cat:'Creative',desc:'Draw on a canvas with neon brushes. Express your creativity inside TOB OS.',screenshots:['🎨','✏️','🖼️'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:#010812;display:flex;flex-direction:column;height:100vh;}#tb{height:40px;background:rgba(2,8,22,.9);border-bottom:1px solid rgba(0,180,255,.2);display:flex;align-items:center;gap:8px;padding:0 12px;flex-shrink:0;}button{padding:4px 10px;border-radius:5px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.25);color:#00b4ff;cursor:pointer;font-size:10px;}canvas{flex:1;cursor:crosshair;display:block;}</style></head><body><div id="tb"><b style="color:#00b4ff;font-family:monospace;font-size:10px">◈ PIXELDRAW</b> <input type="color" value="#00b4ff" id="cl" style="width:26px;height:22px;border:none;background:none;cursor:pointer;"> <input type="range" min="1" max="20" value="4" id="sz"> <button onclick="ctx.clearRect(0,0,cv.width,cv.height)">Clear</button></div><canvas id="cv"></canvas><script>const cv=document.getElementById('cv');const ctx=cv.getContext('2d');function resize(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}resize();window.onresize=resize;let drawing=false,lx=0,ly=0;cv.addEventListener('mousedown',e=>{drawing=true;const r=cv.getBoundingClientRect();lx=e.clientX-r.left;ly=e.clientY-r.top;});cv.addEventListener('mousemove',e=>{if(!drawing)return;const r=cv.getBoundingClientRect();const x=e.clientX-r.left,y=e.clientY-r.top;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(x,y);ctx.strokeStyle=document.getElementById('cl').value;ctx.lineWidth=document.getElementById('sz').value;ctx.lineCap='round';ctx.stroke();lx=x;ly=y;});cv.addEventListener('mouseup',()=>drawing=false);<\/script></body></html>`},
  {id:'as_timer',name:'Focus Timer',icon:'⏱️',cat:'Productivity',desc:'Pomodoro-style focus timer to boost your productivity.',screenshots:['⏱️','🎯','📊'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:#010812;color:#c8e8ff;font-family:Orbitron,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:20px;}#t{font-size:72px;font-weight:900;color:#00b4ff;text-shadow:0 0 30px #00b4ff;}button{padding:10px 28px;border-radius:20px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;cursor:pointer;font-family:Orbitron,monospace;font-size:11px;font-weight:700;letter-spacing:2px;margin:4px;}#status{font-size:11px;color:rgba(0,180,255,.5);letter-spacing:3px;}</style></head><body><div id="status">FOCUS SESSION</div><div id="t">25:00</div><div><button onclick="startTimer()">▶ START</button><button onclick="resetTimer()" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)">↻ RESET</button></div><script>let secs=25*60,intv=null;function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}function startTimer(){if(intv)return;intv=setInterval(()=>{if(secs<=0){clearInterval(intv);intv=null;document.getElementById('status').textContent='DONE!';return;}secs--;document.getElementById('t').textContent=fmt(secs);},1000);}function resetTimer(){clearInterval(intv);intv=null;secs=25*60;document.getElementById('t').textContent=fmt(secs);document.getElementById('status').textContent='FOCUS SESSION';}<\/script></body></html>`},
  {id:'as_snake',name:'Neon Snake',icon:'🐍',cat:'Games',desc:'Classic snake game with a neon TOB OS skin.',screenshots:['🐍','🎮','⚡'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:#010812;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:10px;}canvas{border:1px solid rgba(0,180,255,.3);border-radius:8px;}#info{color:rgba(0,180,255,.5);font-family:monospace;font-size:11px;letter-spacing:2px;}#score{color:#00b4ff;font-family:Orbitron,monospace;font-size:14px;font-weight:700;}</style></head><body><div id="score">SCORE: 0</div><canvas id="c" width="300" height="300"></canvas><div id="info">Arrow keys to move · R to restart</div><script>const c=document.getElementById('c');const ctx=c.getContext('2d');const SZ=15,COLS=20,ROWS=20;let snake=[{x:10,y:10}],dir={x:1,y:0},food={x:5,y:5},score=0,running=true;function rFood(){food={x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)};}function draw(){ctx.fillStyle='#010812';ctx.fillRect(0,0,300,300);ctx.fillStyle='#ff2d6e';ctx.fillRect(food.x*SZ,food.y*SZ,SZ-1,SZ-1);snake.forEach((s,i)=>{ctx.fillStyle=i===0?'#00ffcc':'#00b4ff';ctx.fillRect(s.x*SZ,s.y*SZ,SZ-2,SZ-2);});}function tick(){if(!running)return;const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(s=>s.x===head.x&&s.y===head.y)){running=false;document.getElementById('info').textContent='GAME OVER · R to restart';return;}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score++;document.getElementById('score').textContent='SCORE: '+score;rFood();}else snake.pop();draw();}setInterval(tick,130);document.addEventListener('keydown',e=>{if(e.key==='ArrowUp'&&dir.y===0)dir={x:0,y:-1};else if(e.key==='ArrowDown'&&dir.y===0)dir={x:0,y:1};else if(e.key==='ArrowLeft'&&dir.x===0)dir={x:-1,y:0};else if(e.key==='ArrowRight'&&dir.x===0)dir={x:1,y:0};else if(e.key==='r'||e.key==='R'){snake=[{x:10,y:10}];dir={x:1,y:0};score=0;running=true;document.getElementById('score').textContent='SCORE: 0';document.getElementById('info').textContent='Arrow keys to move · R to restart';rFood();}});rFood();draw();<\/script></body></html>`},
  {id:'as_weather',name:'WeatherDesk',icon:'🌤️',cat:'Utilities',desc:'Minimal weather widget with animated sky display.',screenshots:['🌤️','⛅','🌧️'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:linear-gradient(180deg,#001040,#010812);color:#c8e8ff;font-family:Orbitron,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:10px;text-align:center;}#ico{font-size:80px;}#tmp{font-size:48px;font-weight:900;color:#fff;}#desc{font-size:11px;color:rgba(200,232,255,.5);letter-spacing:3px;}#loc{font-size:9px;color:rgba(0,180,255,.4);margin-top:8px;}</style></head><body><div id="ico">🌤️</div><div id="tmp">--°</div><div id="desc">CHECKING WEATHER...</div><div id="loc">Fetching location</div><script>const icons={Clear:'☀️',Clouds:'⛅',Rain:'🌧️',Snow:'❄️',Thunderstorm:'⛈️',Drizzle:'🌦️',Mist:'🌫️'};fetch('https://ipapi.co/json/').then(r=>{if(!r.ok)throw new Error(r.status);return r.json();}).then(data=>{return fetch('https://wttr.in/'+data.city+'?format=j1').then(r=>r.json()).then(w=>{const cc=w.current_condition[0];document.getElementById('tmp').textContent=cc.temp_C+'°C';document.getElementById('desc').textContent=cc.weatherDesc[0].value.toUpperCase();document.getElementById('loc').textContent=data.city+', '+data.country_name;const main=cc.weatherDesc[0].value;const key=Object.keys(icons).find(k=>main.toLowerCase().includes(k.toLowerCase()));document.getElementById('ico').textContent=icons[key]||'🌡️';});}).catch(()=>{document.getElementById('tmp').textContent='?°';document.getElementById('desc').textContent='WEATHER UNAVAILABLE';document.getElementById('loc').textContent='No internet or API unavailable';});<\/script></body></html>`},
  {id:'as_markdown',name:'MarkdownPad',icon:'📋',cat:'Productivity',desc:'Write in Markdown and see a live preview instantly.',screenshots:['📋','✍️','👁️'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;}body{margin:0;background:#010812;display:grid;grid-template-columns:1fr 1fr;height:100vh;gap:0;}textarea{background:#010c22;color:#c8e8ff;border:none;border-right:1px solid rgba(0,180,255,.15);padding:14px;font-family:'Courier New',monospace;font-size:13px;resize:none;outline:none;}#preview{padding:14px;color:#c8e8ff;font-family:Rajdhani,sans-serif;font-size:14px;overflow-y:auto;line-height:1.7;}h1,h2,h3{color:#00b4ff;}code{background:rgba(0,180,255,.1);padding:2px 5px;border-radius:3px;font-size:12px;}pre{background:rgba(0,0,0,.4);border-radius:6px;padding:10px;overflow-x:auto;}</style></head><body><textarea id="ed" placeholder="# Hello TOB OS&#10;&#10;Write **markdown** here..." oninput="update()"></textarea><div id="preview"></div><script>function update(){const md=document.getElementById('ed').value;let h=md.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>');document.getElementById('preview').innerHTML=h;}update();<\/script></body></html>`},
  {id:'as_color',name:'ColorPicker',icon:'🎨',cat:'Creative',desc:'Pick and explore colors with hex codes and neon previews.',screenshots:['🎨','🔵','✨'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>body{margin:0;background:#010812;color:#c8e8ff;font-family:Orbitron,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:18px;}#swatch{width:150px;height:150px;border-radius:20px;border:2px solid rgba(0,180,255,.3);transition:all .3s;box-shadow:0 0 40px var(--c,#00b4ff);}#hex{font-size:20px;font-weight:700;letter-spacing:4px;color:#fff;}input[type=color]{width:60px;height:40px;border:none;background:none;cursor:pointer;}label{font-size:9px;color:rgba(0,180,255,.4);letter-spacing:2px;}</style></head><body><label>SELECT COLOR</label><input type="color" value="#00b4ff" id="cp" oninput="update(this.value)"><div id="swatch"></div><div id="hex">#00B4FF</div><script>function update(v){document.getElementById('swatch').style.cssText='width:150px;height:150px;border-radius:20px;border:2px solid rgba(0,180,255,.3);background:'+v+';box-shadow:0 0 40px '+v;document.getElementById('hex').textContent=v.toUpperCase();}update('#00b4ff');<\/script></body></html>`},

  // ── NEW v12 APPS ──
  {id:'as_chess',name:'NeonChess',svgIcon:'chess',bgClass:'icon-bg-blue',cat:'Games',desc:'Play chess against a smart AI opponent. Full piece movement rules, check detection, and neon visual effects.',screenshots:['♟','👑','🎯'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Orbitron,monospace;gap:10px;}#info{font-size:10px;color:#00b4ff;letter-spacing:2px;padding:6px 14px;background:rgba(0,180,255,.08);border:1px solid rgba(0,180,255,.2);border-radius:20px;}#board{display:grid;grid-template-columns:repeat(8,1fr);width:min(400px,90vw);height:min(400px,90vw);border:2px solid rgba(0,180,255,.3);border-radius:6px;overflow:hidden;box-shadow:0 0 30px rgba(0,80,200,.3);}  .sq{display:flex;align-items:center;justify-content:center;font-size:clamp(20px,4.5vw,32px);cursor:pointer;transition:all .12s;position:relative;user-select:none;}.sq.light{background:rgba(0,30,80,.7);}.sq.dark{background:rgba(0,10,40,.9);}.sq.sel{background:rgba(0,180,255,.4)!important;box-shadow:inset 0 0 10px rgba(0,180,255,.5);}.sq.move{background:rgba(57,255,20,.2)!important;}.sq.move::after{content:'';position:absolute;width:30%;height:30%;border-radius:50%;background:rgba(57,255,20,.5);}#status{font-size:11px;color:rgba(0,180,255,.6);letter-spacing:1px;}</style></head><body>
<div id="info">◈ NEON CHESS — YOUR TURN (WHITE)</div>
<div id="board"></div>
<div id="status">♟ Click a piece to move</div>
<script>
const PIECES={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
const INIT=['rnbqkbnr','pppppppp','........','........','........','........','PPPPPPPP','RNBQKBNR'];
let board=INIT.map(r=>r.split('')),sel=null,moves=[],turn='w',gameOver=false;
function isWhite(p){return p===p.toUpperCase()&&p!=='.';}
function isBlack(p){return p===p.toLowerCase()&&p!=='.';}
function isEnemy(p,t){return t==='w'?isBlack(p):isWhite(p);}
function inBounds(r,c){return r>=0&&r<8&&c>=0&&c<8;}
function getMoves(r,c){
  const p=board[r][c],ms=[];
  if(p==='.')return ms;
  const wh=isWhite(p),pt=p.toLowerCase();
  const add=(nr,nc)=>{if(!inBounds(nr,nc))return false;const t=board[nr][nc];if(t==='.'||(wh?isBlack(t):isWhite(t))){ms.push([nr,nc]);}return t==='.';}
  if(pt==='p'){const dir=wh?-1:1;const sr=wh?6:1;if(inBounds(r+dir,c)&&board[r+dir][c]==='.')ms.push([r+dir,c]);if(r===sr&&board[r+dir][c]==='.'&&board[r+2*dir][c]==='.')ms.push([r+2*dir,c]);[-1,1].forEach(dc=>{if(inBounds(r+dir,c+dc)&&isEnemy(board[r+dir][c+dc],wh?'w':'b'))ms.push([r+dir,c+dc]);});}
  if(pt==='r'||pt==='q'){[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr,dc])=>{let nr=r+dr,nc=c+dc;while(add(nr,nc)){nr+=dr;nc+=dc;}});}
  if(pt==='b'||pt==='q'){[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr,dc])=>{let nr=r+dr,nc=c+dc;while(add(nr,nc)){nr+=dr;nc+=dc;}});}
  if(pt==='n'){[[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]].forEach(([dr,dc])=>add(r+dr,c+dc));}
  if(pt==='k'){[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].forEach(([dr,dc])=>add(r+dr,c+dc));}
  return ms;
}
function aiMove(){
  const all=[];
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){if(isBlack(board[r][c])){getMoves(r,c).forEach(([nr,nc])=>all.push({r,c,nr,nc,score:scoreMove(r,c,nr,nc)}));}}
  if(!all.length)return;
  all.sort((a,b)=>b.score-a.score);const best=all[0];
  board[best.nr][best.nc]=board[best.r][best.c];board[best.r][best.c]='.';
  turn='w';render();document.getElementById('info').textContent='◈ NEON CHESS — YOUR TURN (WHITE)';
}
function scoreMove(r,c,nr,nc){
  const vals={p:1,n:3,b:3,r:5,q:9,k:0};const cap=board[nr][nc];
  let s=cap!='.'?vals[cap.toLowerCase()]*10:0;
  s+=(nr===3||nr===4)&&(nc===3||nc===4)?2:0;return s+Math.random();
}
function render(){
  const bd=document.getElementById('board');bd.innerHTML='';
  for(let r=0;r<8;r++)for(let c=0;c<8;c++){
    const sq=document.createElement('div');const light=(r+c)%2===0;
    sq.className='sq '+(light?'light':'dark');
    const isSel=sel&&sel[0]===r&&sel[1]===c;const isMove=moves.some(([mr,mc])=>mr===r&&mc===c);
    if(isSel)sq.classList.add('sel');if(isMove)sq.classList.add('move');
    const p=board[r][c];if(p!=='.')sq.textContent=PIECES[p]||p;
    sq.onclick=()=>click(r,c);bd.appendChild(sq);
  }
}
function click(r,c){
  if(gameOver)return;
  if(sel){
    const mv=moves.find(([mr,mc])=>mr===r&&mc===c);
    if(mv){
      const cap=board[r][c];board[r][c]=board[sel[0]][sel[1]];board[sel[0]][sel[1]]='.';
      if(board[r][c]==='P'&&r===0)board[r][c]='Q';
      if(board[r][c]==='p'&&r===7)board[r][c]='q';
      if(cap==='k'){gameOver=true;document.getElementById('info').textContent='🏆 YOU WIN! Refresh to restart';render();return;}
      if(cap==='K'){gameOver=true;document.getElementById('info').textContent='💀 AI WINS! Refresh to restart';render();return;}
      sel=null;moves=[];turn='b';render();document.getElementById('info').textContent='◈ AI THINKING...';
      setTimeout(()=>{aiMove();if(!gameOver)document.getElementById('status').textContent='Your turn — click a white piece';},300);return;
    }
    sel=null;moves=[];
  }
  if(board[r][c]!=='.'&&(turn==='w'?isWhite(board[r][c]):isBlack(board[r][c]))){sel=[r,c];moves=getMoves(r,c);document.getElementById('status').textContent=PIECES[board[r][c]]+' selected — click a green square';}
  else{sel=null;moves=[];}render();
}
render();
<\/script></body></html>`},

  {id:'as_synth',name:'PocketSynth',svgIcon:'synth',bgClass:'icon-bg-purple',cat:'Creative',desc:'Play a playable synthesizer keyboard inside TOB OS. Multiple waveforms and octaves.',screenshots:['🎹','🎵','🔊'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#050008;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:14px;font-family:Orbitron,monospace;}h2{font-size:10px;color:#9900ff;letter-spacing:3px;}.controls{display:flex;gap:12px;align-items:center;}.ctrl-lbl{font-size:8px;color:rgba(150,100,255,.5);letter-spacing:1px;margin-bottom:3px;}select,input{background:rgba(100,0,200,.15);border:1px solid rgba(150,0,255,.3);border-radius:6px;color:#cc88ff;font-family:Orbitron,monospace;font-size:9px;padding:4px 8px;outline:none;}#keyboard{display:flex;position:relative;height:120px;gap:2px;padding:0 12px;}.white-key{width:36px;height:110px;background:linear-gradient(180deg,rgba(255,255,255,.85),rgba(220,200,255,.7));border:1px solid rgba(100,0,200,.3);border-radius:0 0 6px 6px;cursor:pointer;position:relative;display:flex;align-items:flex-end;justify-content:center;padding-bottom:5px;font-size:7px;color:rgba(100,0,200,.5);font-family:monospace;transition:all .08s;box-shadow:0 4px 8px rgba(0,0,0,.4);}.white-key:active,.white-key.pressed{background:linear-gradient(180deg,rgba(180,100,255,.9),rgba(140,60,255,.8));color:white;transform:scaleY(.97);box-shadow:0 0 15px rgba(150,0,255,.5);}.black-key{width:24px;height:68px;background:linear-gradient(180deg,#1a0030,#0d0018);border:1px solid rgba(150,0,255,.4);border-radius:0 0 5px 5px;cursor:pointer;position:absolute;top:0;z-index:2;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;font-size:6px;color:rgba(200,100,255,.4);font-family:monospace;transition:all .08s;box-shadow:0 4px 10px rgba(0,0,0,.6);}.black-key:active,.black-key.pressed{background:linear-gradient(180deg,#5500aa,#330066);box-shadow:0 0 12px rgba(150,0,255,.6);transform:scaleY(.97);}#vis{width:min(400px,90vw);height:40px;border-radius:8px;background:rgba(0,0,10,.8);border:1px solid rgba(150,0,255,.2);}</style></head><body>
<h2>◈ POCKET SYNTH</h2>
<canvas id="vis" width="400" height="40"></canvas>
<div class="controls">
  <div><div class="ctrl-lbl">WAVE</div><select id="wave"><option value="sine">SINE</option><option value="square">SQR</option><option value="sawtooth">SAW</option><option value="triangle">TRI</option></select></div>
  <div><div class="ctrl-lbl">OCTAVE</div><select id="oct"><option value="3">3</option><option value="4" selected>4</option><option value="5">5</option></select></div>
  <div><div class="ctrl-lbl">REVERB</div><input type="range" id="rev" min="0" max="1" step=".05" value=".2" style="width:70px"></div>
</div>
<div id="keyboard"></div>
<script>
const ac=new AudioContext();const rev=ac.createConvolver();const convBuf=ac.createBuffer(2,ac.sampleRate*1.5,ac.sampleRate);[0,1].forEach(ch=>{const d=convBuf.getChannelData(ch);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);});rev.buffer=convBuf;const revGain=ac.createGain();revGain.gain.value=0.2;rev.connect(revGain);revGain.connect(ac.destination);const dry=ac.createGain();dry.connect(ac.destination);
const NOTES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const WHITE=['C','D','E','F','G','A','B'];const BLACK=['C#','D#','F#','G#','A#'];
const freq=(note,oct)=>{const n=NOTES.indexOf(note);return 440*Math.pow(2,(n+(oct-4)*12-9)/12);};
const oscs={};
function play(note){
  if(ac.state==='suspended')ac.resume();
  const oct=parseInt(document.getElementById('oct').value);
  const wave=document.getElementById('wave').value;
  const o=ac.createOscillator();const g=ac.createGain();
  o.type=wave;o.frequency.value=freq(note,oct);
  g.gain.setValueAtTime(0.001,ac.currentTime);
  g.gain.linearRampToValueAtTime(0.4,ac.currentTime+0.01);
  o.connect(g);g.connect(dry);g.connect(rev);
  o.start();oscs[note]={o,g};
}
function stop(note){if(!oscs[note])return;const{o,g}=oscs[note];g.gain.linearRampToValueAtTime(0.001,ac.currentTime+0.2);o.stop(ac.currentTime+0.2);delete oscs[note];}
document.getElementById('rev').oninput=e=>revGain.gain.value=parseFloat(e.target.value);
const kb=document.getElementById('keyboard');
let wLeft=0;
WHITE.forEach(n=>{const k=document.createElement('div');k.className='white-key';k.dataset.note=n;k.textContent=n;k.onpointerdown=e=>{e.preventDefault();k.classList.add('pressed');play(n);};k.onpointerup=k.onpointerleave=()=>{k.classList.remove('pressed');stop(n);};kb.appendChild(k);});
BLACK.forEach(n=>{const k=document.createElement('div');k.className='black-key';k.dataset.note=n;k.textContent=n.replace('#','♯');
const wi=WHITE.indexOf({'C#':'C','D#':'D','F#':'F','G#':'G','A#':'A'}[n]);k.style.left=(wi*38+22)+'px';
k.onpointerdown=e=>{e.preventDefault();k.classList.add('pressed');play(n);};k.onpointerup=k.onpointerleave=()=>{k.classList.remove('pressed');stop(n);};kb.appendChild(k);});
// Visualizer
const vcv=document.getElementById('vis');const vctx=vcv.getContext('2d');
const ana=ac.createAnalyser();ana.fftSize=256;dry.connect(ana);
const buf=new Uint8Array(ana.frequencyBinCount);
(function loop(){requestAnimationFrame(loop);ana.getByteTimeDomainData(buf);vctx.clearRect(0,0,400,40);vctx.fillStyle='rgba(0,0,10,0.3)';vctx.fillRect(0,0,400,40);vctx.beginPath();buf.forEach((v,i)=>{const x=(i/buf.length)*400,y=((v/128)-1)*16+20;i===0?vctx.moveTo(x,y):vctx.lineTo(x,y);});vctx.strokeStyle='rgba(150,0,255,0.8)';vctx.lineWidth=1.5;vctx.stroke();})();
<\/script></body></html>`},

  {id:'as_terminal',name:'NeonShell',svgIcon:'terminal',bgClass:'icon-bg-teal',cat:'Utilities',desc:'A simulated terminal with package install commands. Try sudo apt install minecraft.',screenshots:['💻','⌨️','📦'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;height:100vh;display:flex;flex-direction:column;font-family:'Courier New',monospace;}#header{padding:8px 14px;background:rgba(0,180,255,.06);border-bottom:1px solid rgba(0,180,255,.15);display:flex;align-items:center;gap:8px;flex-shrink:0;}#title{font-size:10px;color:#00b4ff;letter-spacing:2px;font-family:Orbitron,monospace;}#out{flex:1;overflow-y:auto;padding:12px 14px;line-height:1.9;}#input-row{display:flex;align-items:center;gap:8px;padding:8px 14px;border-top:1px solid rgba(0,180,255,.1);background:rgba(0,5,15,.5);flex-shrink:0;}#prompt{color:#00ffcc;font-size:12px;white-space:nowrap;}#cmd{flex:1;background:none;border:none;color:#c8e8ff;font-family:'Courier New',monospace;font-size:12px;outline:none;caret-color:#00b4ff;}.line{font-size:11px;margin-bottom:2px;}.out-line{color:rgba(200,232,255,.7);}.err-line{color:#ff5f57;}.cmd-line{color:#00ffcc;}.sys-line{color:#00b4ff;font-weight:bold;}</style></head><body>
<div id="header"><div style="display:flex;gap:5px"><div style="width:10px;height:10px;border-radius:50%;background:#ff5f57"></div><div style="width:10px;height:10px;border-radius:50%;background:#febc2e"></div><div style="width:10px;height:10px;border-radius:50%;background:#27c840"></div></div><div id="title">◈ NEOSHELL v2.0</div></div>
<div id="out"><div class="line sys-line">TOB OS NeoShell v2.0 — Type <span style="color:#ffd700">help</span> for commands</div><div class="line out-line">Package mode enabled. Use sudo apt install &lt;app&gt;.</div></div>
<div id="input-row"><span id="prompt">tobos@nexus:~$</span><input id="cmd" autofocus spellcheck="false" placeholder="Type a command..."></div>
<script>
const out=document.getElementById('out');const cmd=document.getElementById('cmd');
const PKG_MAP={minecraft:'as_multiverse_blockarena',pokemon:'as_multiverse_blockarena',onepiece:'as_multiverse_blockarena',bluelock:'as_multiverse_blockarena',fortnite:'as_multiverse_blockarena',miraculous:'as_multiverse_blockarena',storybook:'as_storybook',pocketfarmer:'as_pocketfarmer',farmer:'as_pocketfarmer'};
const PKG_NAME={minecraft:'BlockVerse United',pokemon:'BlockVerse United',onepiece:'BlockVerse United',bluelock:'BlockVerse United',fortnite:'BlockVerse United',miraculous:'BlockVerse United',storybook:'Interactive Storybook',pocketfarmer:'Pocket Farmer',farmer:'Pocket Farmer'};
function print(type,val){const div=document.createElement('div');div.className='line '+(type==='sys'?'sys-line':type==='e'?'err-line':'out-line');div.textContent=val;out.appendChild(div);out.scrollTop=out.scrollHeight;}
function getPkgs(){try{return JSON.parse(localStorage.getItem('neoshell_packages_v1')||'[]');}catch(e){return[];}}
function savePkg(name){const p=getPkgs();if(!p.includes(name)){p.push(name);localStorage.setItem('neoshell_packages_v1',JSON.stringify(p));}}
function installStoreApp(id){try{const pw=window.parent;if(pw&&pw.AppStore){if(!pw.AppStore.isInstalled(id))pw.AppStore.install(id);return true;}}catch(e){}return false;}
function openAlias(a){const k=(a||'').toLowerCase();const id=PKG_MAP[k];if(!id){print('e','Unknown app alias');return;}try{window.parent.openStoreCatalogApp(id);print('sys','Opening '+(PKG_NAME[k]||k)+' ...');}catch(e){print('e','Unable to open app');}}
function handleApt(args){if(args[0]==='list'){print('sys','◈ SPECIAL PACKAGES');Object.keys(PKG_MAP).forEach(k=>print('o','  '+k+' -> '+PKG_NAME[k]));return;}if(args[0]!=='install'){print('e','Usage: apt list | sudo apt install <package>');return;}const pkg=(args[1]||'').toLowerCase();if(!PKG_MAP[pkg]){print('e','Package not found: '+pkg);return;}print('o','Reading package lists... Done');print('o','Building dependency tree... Done');const ok=installStoreApp(PKG_MAP[pkg]);savePkg(pkg);print('sys','Installed: '+PKG_NAME[pkg]);print('o',ok?'App unlocked in App Store':'Package added locally');}
const CMDS={help:()=>[{t:'sys',v:'◈ AVAILABLE COMMANDS'},{t:'o',v:'  apt list'},{t:'o',v:'  sudo apt install <app>'},{t:'o',v:'  packages'},{t:'o',v:'  open <app>'},{t:'o',v:'  neofetch, ls, pwd, whoami, date, uptime, matrix, flip, roll, joke, echo, clear, color'}],neofetch:()=>[{t:'o',v:'OS: TOB OS Story Edition v17.0'},{t:'o',v:'Shell: NeoShell v2.0'},{t:'o',v:'Packages: '+getPkgs().length}],ls:()=>['Desktop/','Documents/','Downloads/','Music/','Games/','Apps/'].map(v=>({t:'o',v:'  '+v})),pwd:()=>[{t:'o',v:'/home/tobos/desktop'}],whoami:()=>[{t:'o',v:'tobos-user (UID: 1337)'}],date:()=>[{t:'o',v:new Date().toString()}],uptime:()=>[{t:'o',v:'up '+Math.floor(performance.now()/60000)+' minutes'}],matrix:()=>{setTimeout(()=>{const chars='アイウエオカキクケコサシスセソタチツテト';let i=0;const iv=setInterval(()=>{print('o',Array.from({length:6},()=>chars[Math.floor(Math.random()*chars.length)]).join(' '));i++;if(i>8)clearInterval(iv);},120);},0);return[{t:'sys',v:'ENTERING THE MATRIX...'}];},flip:()=>[{t:'o',v:Math.random()<.5?'🪙 HEADS':'🪙 TAILS'}],clear:()=>{out.innerHTML='';return[];},joke:()=>[{t:'o',v:'Q: Why was the game dev calm?'},{t:'o',v:'A: Every bug was a side quest.'}]};
cmd.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const val=cmd.value.trim();if(!val)return;cmd.value='';print('sys','$ '+val);const parts=val.split(/\s+/);const name=(parts[0]||'').toLowerCase();const args=parts.slice(1);if(name==='echo'){print('o',args.join(' ')||'');return;}if(name==='roll'){const n=parseInt(args[0],10)||6;print('o','🎲 Rolling d'+n+': '+Math.ceil(Math.random()*n));return;}if(name==='color'){document.documentElement.style.setProperty('--neon',args[0]||'#00b4ff');print('sys','◈ Accent color changed');return;}if(name==='packages'){const p=getPkgs();if(!p.length){print('o','No packages installed yet.');return;}p.forEach(x=>print('o','- '+x+' ('+(PKG_NAME[x]||'custom')+')'));return;}if(name==='open'){openAlias(args[0]);return;}if(name==='apt'){handleApt(args);return;}if(name==='sudo'&&args[0]==='apt'){handleApt(args.slice(1));return;}if(CMDS[name]){(CMDS[name](args)||[]).forEach(({t,v})=>print(t,v));}else print('e','Command not found: '+name+' (try help)');});
<\/script></body></html>`},

  {id:'as_habits',name:'HabitForge',svgIcon:'habits',bgClass:'icon-bg-green',cat:'Productivity',desc:'Track your daily habits with a satisfying streak system and neon progress rings.',screenshots:['✅','🔥','📊'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;color:#c8e8ff;font-family:Rajdhani,sans-serif;display:flex;flex-direction:column;height:100vh;overflow:hidden;}#header{padding:12px 16px;border-bottom:1px solid rgba(0,180,255,.15);background:rgba(0,10,25,.5);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}#title{font-family:Orbitron,monospace;font-size:11px;color:#00ffcc;letter-spacing:3px;}#date{font-family:Share Tech Mono,monospace;font-size:10px;color:rgba(0,180,255,.5);}#list{flex:1;overflow-y:auto;padding:12px;}#addbtn{margin:8px 16px 16px;padding:10px;border-radius:10px;background:rgba(0,255,150,.08);border:1px dashed rgba(0,255,150,.3);color:#00ffcc;font-family:Orbitron,monospace;font-size:10px;cursor:pointer;transition:all .18s;width:calc(100% - 32px);}#addbtn:hover{background:rgba(0,255,150,.15);}.habit{background:rgba(0,10,30,.8);border:1px solid rgba(0,255,150,.15);border-radius:12px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:12px;transition:all .2s;}.habit.done{background:rgba(0,40,20,.6);border-color:rgba(57,255,20,.3);}.ring{width:40px;height:40px;border-radius:50%;border:3px solid rgba(0,255,150,.2);position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:all .2s;}.ring.done{border-color:#39ff14;box-shadow:0 0 12px rgba(57,255,20,.4);}.ring:hover{transform:scale(1.08);}.tick{font-size:16px;}.habit-info{flex:1;min-width:0;}.habit-name{font-size:14px;font-weight:700;color:#c8e8ff;}.streak{font-size:10px;color:#39ff14;font-family:Share Tech Mono,monospace;margin-top:2px;}.del{background:none;border:none;color:rgba(255,80,80,.4);cursor:pointer;font-size:16px;padding:4px;transition:opacity .15s;opacity:0;}.habit:hover .del{opacity:1;}#empty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;gap:10px;color:rgba(0,255,150,.3);}#empty-ico{font-size:48px;}.inp-row{display:flex;gap:8px;padding:12px 16px 0;flex-shrink:0;display:none;}#new-inp{flex:1;background:rgba(0,15,35,.8);border:1px solid rgba(0,255,150,.3);border-radius:8px;padding:8px 12px;color:#c8e8ff;font-family:Rajdhani,sans-serif;font-size:13px;outline:none;}#add-ok{padding:8px 14px;border-radius:8px;background:linear-gradient(135deg,#003322,#00aa55);border:none;color:#fff;font-family:Orbitron,monospace;font-size:9px;cursor:pointer;}</style></head><body>
<div id="header"><div id="title">◈ HABITFORGE</div><div id="date"></div></div>
<div id="list"><div id="empty"><div id="empty-ico">◎</div><div style="font-size:11px;letter-spacing:2px;font-family:Share Tech Mono,monospace">NO HABITS YET</div><div style="font-size:10px">Add your first habit below</div></div></div>
<div class="inp-row" id="inp-row"><input id="new-inp" placeholder="New habit name..." maxlength="30"><button id="add-ok">✓ ADD</button></div>
<button id="addbtn" onclick="toggleAdd()">＋ ADD HABIT</button>
<script>
const key='tob_habits_v1';
let data=JSON.parse(localStorage.getItem(key)||'{"habits":[],"date":""}');
const today=new Date().toDateString();
if(data.date!==today){data.habits.forEach(h=>{if(h.done&&data.date)h.streak=(h.streak||0)+1;h.done=false;});data.date=today;save();}
document.getElementById('date').textContent=today;
function save(){localStorage.setItem(key,JSON.stringify(data));}
function toggleAdd(){const r=document.getElementById('inp-row');r.style.display=r.style.display==='flex'?'none':'flex';if(r.style.display==='flex')document.getElementById('new-inp').focus();}
document.getElementById('add-ok').onclick=addHabit;document.getElementById('new-inp').addEventListener('keydown',e=>{if(e.key==='Enter')addHabit();});
function addHabit(){const n=document.getElementById('new-inp').value.trim();if(!n)return;data.habits.push({id:Date.now(),name:n,done:false,streak:0});save();render();document.getElementById('new-inp').value='';document.getElementById('inp-row').style.display='none';}
function toggle(id){const h=data.habits.find(x=>x.id===id);if(!h)return;h.done=!h.done;if(!h.done&&h.streak>0)h.streak--;save();render();}
function del(id){data.habits=data.habits.filter(x=>x.id!==id);save();render();}
function render(){const list=document.getElementById('list');const empty=document.getElementById('empty');if(!data.habits.length){list.innerHTML='';list.appendChild(empty);return;}list.innerHTML='';data.habits.forEach(h=>{const div=document.createElement('div');div.className='habit'+(h.done?' done':'');div.innerHTML='<div class="ring '+(h.done?'done':'')+'" onclick="toggle('+h.id+')"><span class="tick">'+(h.done?'✓':'○')+'</span></div><div class="habit-info"><div class="habit-name">'+h.name+'</div><div class="streak">'+(h.streak?'🔥 '+h.streak+' day streak':'Start today!')+'</div></div><button class="del" onclick="del('+h.id+')">✕</button>';list.appendChild(div);});}
render();
<\/script></body></html>`},

  {id:'as_rpg',name:'AbilityRPG',svgIcon:'rpg',bgClass:'icon-bg-gold',cat:'Games',desc:'RPG battle game inspired by Abil lore. Choose your ability, fight monsters from the SCP archives.',screenshots:['⚔️','🌟','💥'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;color:#c8e8ff;font-family:Rajdhani,sans-serif;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:14px;overflow:hidden;gap:10px;}h2{font-family:Orbitron,monospace;font-size:11px;color:#ffd700;letter-spacing:3px;}#pick{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}#pick h3{font-size:10px;color:rgba(255,215,0,.6);letter-spacing:2px;font-family:Share Tech Mono,monospace;}.ability-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%;max-width:400px;}.ability-btn{padding:10px;border-radius:10px;background:rgba(0,20,50,.8);border:1px solid rgba(0,180,255,.2);color:#c8e8ff;cursor:pointer;text-align:center;transition:all .18s;font-family:Rajdhani,sans-serif;font-size:13px;font-weight:700;}.ability-btn:hover{border-color:var(--neon,#ffd700);background:rgba(0,30,80,.8);transform:scale(1.03);}#game{display:none;width:100%;max-width:460px;flex-direction:column;gap:10px;}#mon-box{background:rgba(0,5,20,.8);border:1px solid rgba(255,45,110,.25);border-radius:12px;padding:14px;text-align:center;}#mon-name{font-family:Orbitron,monospace;font-size:12px;color:#ff2d6e;letter-spacing:2px;margin-bottom:6px;}#mon-hp-bar{height:8px;background:rgba(255,255,255,.08);border-radius:4px;overflow:hidden;margin-bottom:6px;}#mon-hp-fill{height:100%;background:linear-gradient(90deg,#ff2d6e,#ff6699);border-radius:4px;transition:width .4s;}#mon-emoji{font-size:42px;margin:8px 0;}#mon-desc{font-size:10px;color:rgba(200,232,255,.4);font-family:Share Tech Mono,monospace;}#player-box{background:rgba(0,10,30,.8);border:1px solid rgba(0,180,255,.25);border-radius:12px;padding:12px;}#player-info{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}#player-name{font-family:Orbitron,monospace;font-size:10px;color:#00b4ff;letter-spacing:2px;}#player-hp{font-size:10px;color:#00ffcc;font-family:Share Tech Mono,monospace;}#p-hp-bar{height:6px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;}#p-hp-fill{height:100%;background:linear-gradient(90deg,#00b4ff,#00ffcc);border-radius:3px;transition:width .4s;}#actions{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;}#log-box{background:rgba(0,0,0,.4);border:1px solid rgba(0,180,255,.1);border-radius:8px;padding:8px;max-height:70px;overflow-y:auto;}#log{font-size:9px;color:rgba(200,232,255,.6);font-family:Share Tech Mono,monospace;line-height:1.8;}.act-btn{padding:8px;border-radius:8px;border:1px solid rgba(0,180,255,.25);background:rgba(0,20,60,.7);color:#c8e8ff;cursor:pointer;font-family:Rajdhani,sans-serif;font-size:12px;font-weight:700;transition:all .15s;}.act-btn:hover:not(:disabled){background:rgba(0,50,120,.7);border-color:var(--neon,#00b4ff);transform:scale(1.03);}.act-btn:disabled{opacity:.3;cursor:not-allowed;}#result-msg{font-family:Orbitron,monospace;font-size:12px;text-align:center;display:none;padding:10px;border-radius:10px;}</style></head><body>
<h2>◈ ABILITY RPG</h2>
<div id="pick">
  <h3>CHOOSE YOUR ABILITY</h3>
  <div class="ability-grid">
    <div class="ability-btn" onclick="startGame('Lightning God','⚡','Electric bolt that paralyzes',45,20)">⚡ LIGHTNING GOD<br><span style="font-size:9px;color:rgba(0,180,255,.5)">HIGH DAMAGE</span></div>
    <div class="ability-btn" onclick="startGame('Flame Bearer','🔥','Tornado of fire and heat',40,25)">🔥 FLAME BEARER<br><span style="font-size:9px;color:rgba(255,100,0,.5)">AOE BURN</span></div>
    <div class="ability-btn" onclick="startGame('Frame Control','⏱','Freeze frames, strike twice',30,35)">⏱ FRAME CONTROL<br><span style="font-size:9px;color:rgba(0,255,200,.5)">DOUBLE HIT</span></div>
    <div class="ability-btn" onclick="startGame('Soul Chain','⛓','Rip life force from enemies',35,20)">⛓ SOUL CHAIN<br><span style="font-size:9px;color:rgba(200,0,255,.5)">LIFE STEAL</span></div>
  </div>
</div>
<div id="game">
  <div id="mon-box">
    <div id="mon-name">MR. SANDMAN</div>
    <div id="mon-hp-bar"><div id="mon-hp-fill" style="width:100%"></div></div>
    <div id="mon-emoji">👻</div>
    <div id="mon-desc">Origin: The In-Between Realm</div>
  </div>
  <div id="player-box">
    <div id="player-info"><div id="player-name">HERO</div><div id="player-hp">100 HP</div></div>
    <div id="p-hp-bar"><div id="p-hp-fill" style="width:100%"></div></div>
  </div>
  <div id="actions">
    <button class="act-btn" id="btn-attack" onclick="doAttack()">⚔ ATTACK</button>
    <button class="act-btn" id="btn-special" onclick="doSpecial()">✨ SPECIAL</button>
    <button class="act-btn" id="btn-heal" onclick="doHeal()">💚 HEAL</button>
    <button class="act-btn" id="btn-dodge" onclick="doDodge()">💨 DODGE</button>
  </div>
  <div id="log-box"><div id="log">Battle started! Choose your action.</div></div>
  <div id="result-msg"></div>
</div>
<script>
const MONSTERS=[{name:'Mr. Sandman',emoji:'👻',desc:'Origin: The In-Between Realm',hp:80,atk:18,def:5},{name:'Frame Walker',emoji:'🌀',desc:'SCP-000-F: Outside recorded time',hp:100,atk:22,def:8},{name:'Core Breaker',emoji:'💀',desc:'Anti-Bio Weapon',hp:70,atk:28,def:3},{name:'Ash Judge',emoji:'🌋',desc:'Volcanic Tribunal Entity',hp:90,atk:15,def:12},{name:'Blackout Leviathan',emoji:'⚫',desc:'Rogue Tech-Beast',hp:120,atk:20,def:6}];
let player={hp:100,maxHp:100,atk:0,special:0,healing:15,name:'HERO',dodging:false,specUsed:0};let mon,monMaxHp;let turn=0,busy=false;
function log(msg,col){const el=document.getElementById('log');const d=document.createElement('div');d.style.color=col||'rgba(200,232,255,.7)';d.textContent=msg;el.appendChild(d);el.scrollTop=el.scrollHeight;}
function startGame(name,icon,desc,atk,heal){player.name=name;player.atk=atk;player.healing=heal;player.specUsed=0;const m=MONSTERS[Math.floor(Math.random()*MONSTERS.length)];mon={...m,cur:m.hp};monMaxHp=m.hp;document.getElementById('pick').style.display='none';document.getElementById('game').style.display='flex';document.getElementById('player-name').textContent=name;document.getElementById('mon-name').textContent=mon.name;document.getElementById('mon-emoji').textContent=mon.emoji;document.getElementById('mon-desc').textContent=mon.desc;updateUI();log('⚡ '+name+' vs '+mon.name+'!','#ffd700');}
function updateUI(){document.getElementById('mon-hp-fill').style.width=Math.max(0,mon.cur/monMaxHp*100)+'%';document.getElementById('p-hp-fill').style.width=Math.max(0,player.hp/player.maxHp*100)+'%';document.getElementById('player-hp').textContent=player.hp+' HP';}
function monAttack(){if(player.dodging){log('💨 Dodged '+mon.name+"'s attack!",'#00ffcc');player.dodging=false;return;}const dmg=Math.max(1,Math.floor(Math.random()*mon.atk+mon.atk*.5)-2);player.hp=Math.max(0,player.hp-dmg);log('👹 '+mon.name+' hits for '+dmg+'!','#ff6666');updateUI();if(player.hp<=0)endGame(false);}
function doAttack(){if(busy)return;busy=true;const dmg=Math.max(1,Math.floor(Math.random()*player.atk+player.atk*.3)-mon.def);mon.cur=Math.max(0,mon.cur-dmg);log('⚔ You strike for '+dmg+' damage!','#00b4ff');updateUI();if(mon.cur<=0){endGame(true);return;}setTimeout(()=>{monAttack();updateUI();busy=false;},600);}
function doSpecial(){if(busy||player.specUsed>=2)return;busy=true;player.specUsed++;const dmg=Math.max(5,Math.floor(player.atk*1.8+Math.random()*20)-mon.def);mon.cur=Math.max(0,mon.cur-dmg);log('✨ SPECIAL — '+dmg+' DAMAGE!','#ffd700');if(player.name==='Soul Chain'){const steal=Math.min(20,dmg*.3|0);player.hp=Math.min(player.maxHp,player.hp+steal);log('⛓ Life stolen: +'+steal+'HP','#cc88ff');}if(player.name==='Frame Control'){const dmg2=Math.max(3,Math.floor(player.atk*.8));mon.cur=Math.max(0,mon.cur-dmg2);log('⏱ Frame repeated! +'+dmg2,'#00ffcc');}updateUI();if(mon.cur<=0){endGame(true);return;}setTimeout(()=>{monAttack();updateUI();busy=false;},700);if(player.specUsed>=2)document.getElementById('btn-special').textContent='✨ DEPLETED';}
function doHeal(){if(busy)return;busy=true;const h=player.healing+Math.floor(Math.random()*8);player.hp=Math.min(player.maxHp,player.hp+h);log('💚 Healed for '+h+' HP!','#39ff14');updateUI();setTimeout(()=>{monAttack();updateUI();busy=false;},600);}
function doDodge(){if(busy)return;busy=true;player.dodging=true;log("💨 Ready to dodge next attack!",'#00ffcc');setTimeout(()=>{monAttack();updateUI();busy=false;},600);}
function endGame(won){['btn-attack','btn-special','btn-heal','btn-dodge'].forEach(id=>{const b=document.getElementById(id);if(b)b.disabled=true;});const res=document.getElementById('result-msg');res.style.display='block';if(won){res.style.background='rgba(0,50,20,.8)';res.style.border='1px solid #39ff14';res.style.color='#39ff14';res.textContent='🏆 VICTORY! '+mon.name+' defeated!';}else{res.style.background='rgba(50,0,10,.8)';res.style.border='1px solid #ff2d6e';res.style.color='#ff2d6e';res.textContent='💀 DEFEATED. Reload to try again.';}log(won?'🏆 Battle won!':'💀 You have fallen.','#ffd700');}
<\/script></body></html>`},

  {id:'as_flashcards',name:'FlashForge',svgIcon:'flashcards',bgClass:'icon-bg-blue',cat:'Productivity',desc:'Create and study flashcard decks. Flip cards, mark as learned, track progress.',screenshots:['📚','🧠','✨'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;color:#c8e8ff;font-family:Rajdhani,sans-serif;height:100vh;display:flex;flex-direction:column;overflow:hidden;}#header{padding:10px 14px;border-bottom:1px solid rgba(0,180,255,.15);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}#title{font-family:Orbitron,monospace;font-size:10px;color:#00b4ff;letter-spacing:3px;}#stats{font-size:9px;color:rgba(0,180,255,.4);font-family:Share Tech Mono,monospace;}#main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:16px;}.card-wrap{perspective:1000px;width:min(340px,90vw);height:180px;cursor:pointer;}.card{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.4,0,.2,1);}.card.flipped{transform:rotateY(180deg);}.card-face{position:absolute;inset:0;border-radius:16px;display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;backface-visibility:hidden;}.front{background:rgba(0,15,40,.9);border:1px solid rgba(0,180,255,.3);box-shadow:0 8px 30px rgba(0,0,0,.5);font-size:14px;font-weight:700;color:#c8e8ff;}.back{background:rgba(0,30,20,.9);border:1px solid rgba(0,255,150,.3);box-shadow:0 8px 30px rgba(0,50,20,.3);transform:rotateY(180deg);font-size:13px;color:#00ffcc;}.card-hint{font-size:9px;color:rgba(0,180,255,.35);font-family:Share Tech Mono,monospace;letter-spacing:1px;}#controls{display:flex;gap:10px;}#controls button{padding:8px 18px;border-radius:20px;border:none;cursor:pointer;font-family:Orbitron,monospace;font-size:9px;font-weight:700;transition:all .18s;}#btn-know{background:linear-gradient(135deg,#003322,#00aa55);color:#fff;}#btn-skip{background:linear-gradient(135deg,#220010,#880030);color:#fff;}#btn-know:hover{transform:scale(1.06);}#btn-skip:hover{transform:scale(1.06);}#progress{width:min(340px,90vw);height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;}#prog-fill{height:100%;background:linear-gradient(90deg,#00b4ff,#00ffcc);border-radius:3px;transition:width .4s;}#add-area{display:flex;gap:8px;width:min(340px,90vw);}.txt-inp{flex:1;background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.2);border-radius:8px;padding:7px 10px;color:#c8e8ff;font-family:Rajdhani,sans-serif;font-size:12px;outline:none;}.add-btn{padding:7px 12px;border-radius:8px;background:rgba(0,180,255,.15);border:1px solid rgba(0,180,255,.3);color:#00b4ff;font-size:10px;cursor:pointer;font-family:Orbitron,monospace;white-space:nowrap;}</style></head><body>
<div id="header"><div id="title">◈ FLASHFORGE</div><div id="stats">0/0 learned</div></div>
<div id="main">
  <div id="progress"><div id="prog-fill" style="width:0%"></div></div>
  <div class="card-wrap" onclick="flip()"><div class="card" id="card">
    <div class="card-face front"><span id="front-text">Add cards below to start!</span></div>
    <div class="card-face back"><span id="back-text">Answer here</span></div>
  </div></div>
  <div class="card-hint" id="hint">TAP CARD TO FLIP</div>
  <div id="controls">
    <button id="btn-skip" onclick="markCard(false)">✗ SKIP</button>
    <button id="btn-know" onclick="markCard(true)">✓ GOT IT</button>
  </div>
  <div id="add-area">
    <input class="txt-inp" id="front-inp" placeholder="Question...">
    <input class="txt-inp" id="back-inp" placeholder="Answer...">
    <button class="add-btn" onclick="addCard()">+</button>
  </div>
</div>
<script>
let decks=JSON.parse(localStorage.getItem('tob_flashcards')||'[]');let idx=0;let flipped=false;
const DEFAULTS=[['What are the 6 ranked stat categories in Abil?','Powers, Abilities, Intelligence, Speed, Strength (+ base ranking A/B/C/D/F)'],["Who founded the Neydis Clan?",'Wally Neydis, after being rejected and granted Frame Control'],['What is a Domain Expansion in Abil?','Combining positive + negative ability inside a forced domain'],['What is the ACOTW?','Advanced Children of the World — progressive organization of powered individuals']];
DEFAULTS.forEach(([q,a])=>{if(!decks.find(c=>c.q===q))decks.push({q,a,learned:false});});save();
function save(){localStorage.setItem('tob_flashcards',JSON.stringify(decks));}
function render(){if(!decks.length)return;const c=decks[idx];document.getElementById('front-text').textContent=c.q;document.getElementById('back-text').textContent=c.a;flipped=false;document.getElementById('card').classList.remove('flipped');const done=decks.filter(x=>x.learned).length;document.getElementById('stats').textContent=done+'/'+decks.length+' learned';document.getElementById('prog-fill').style.width=(done/decks.length*100)+'%';}
function flip(){document.getElementById('card').classList.toggle('flipped');flipped=!flipped;document.getElementById('hint').textContent=flipped?'MARKED BELOW':'TAP CARD TO FLIP';}
function markCard(know){if(!decks.length)return;decks[idx].learned=know;save();idx=(idx+1)%decks.length;render();}
function addCard(){const q=document.getElementById('front-inp').value.trim(),a=document.getElementById('back-inp').value.trim();if(!q||!a)return;decks.push({q,a,learned:false});save();document.getElementById('front-inp').value='';document.getElementById('back-inp').value='';idx=decks.length-1;render();}
render();
<\/script></body></html>`},

  {id:'as_worldmap',name:'NexusAtlas',svgIcon:'worldmap',bgClass:'icon-bg-teal',cat:'Utilities',desc:'Explore an interactive map of the Abil universe — clans, territories, and key locations.',screenshots:['🗺️','📍','🌍'],featured:false,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#010812;height:100vh;display:flex;flex-direction:column;overflow:hidden;font-family:Rajdhani,sans-serif;}#header{padding:8px 14px;border-bottom:1px solid rgba(0,180,255,.15);display:flex;align-items:center;gap:10px;flex-shrink:0;}#title{font-family:Orbitron,monospace;font-size:10px;color:#00b4ff;letter-spacing:3px;}#info-box{margin-left:auto;font-size:9px;color:rgba(0,180,255,.5);font-family:Share Tech Mono,monospace;}#map-area{flex:1;position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 60%,rgba(0,30,80,.3),transparent 70%),#010812;}canvas#world{width:100%;height:100%;cursor:crosshair;display:block;}#tooltip{position:absolute;background:rgba(2,8,22,.95);border:1px solid rgba(0,180,255,.35);border-radius:10px;padding:10px 14px;pointer-events:none;opacity:0;transition:opacity .2s;min-width:160px;z-index:10;}#tooltip h3{font-family:Orbitron,monospace;font-size:10px;color:var(--clr,#00b4ff);letter-spacing:2px;margin-bottom:6px;}#tooltip p{font-size:10px;color:rgba(200,232,255,.7);line-height:1.6;}#legend{position:absolute;bottom:12px;left:12px;background:rgba(2,6,18,.85);border:1px solid rgba(0,180,255,.15);border-radius:8px;padding:10px 12px;}#legend h4{font-family:Orbitron,monospace;font-size:8px;color:rgba(0,180,255,.5);letter-spacing:2px;margin-bottom:6px;}  .leg-row{display:flex;align-items:center;gap:6px;font-size:9px;color:rgba(200,232,255,.6);margin-bottom:3px;}.leg-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}</style></head><body>
<div id="header"><div id="title">◈ NEXUS ATLAS</div><div id="info-box">HOVER REGIONS</div></div>
<div id="map-area">
  <canvas id="world"></canvas>
  <div id="tooltip"><h3 id="tt-name">Region</h3><p id="tt-desc">Info</p></div>
  <div id="legend">
    <h4>CLANS</h4>
    <div class="leg-row"><div class="leg-dot" style="background:#00b4ff"></div>Flint Clan (AUS)</div>
    <div class="leg-row"><div class="leg-dot" style="background:#00ffcc"></div>Elemental Clan (ASIA)</div>
    <div class="leg-row"><div class="leg-dot" style="background:#9900ff"></div>Saeo Clan (RUS)</div>
    <div class="leg-row"><div class="leg-dot" style="background:#ff2d6e"></div>Neydis Clan (AFR)</div>
    <div class="leg-row"><div class="leg-dot" style="background:#ffd700"></div>ACOTW (MARS)</div>
    <div class="leg-row"><div class="leg-dot" style="background:#ff6600"></div>ROP (AMERICAS)</div>
  </div>
</div>
<script>
const cv=document.getElementById('world');const ctx=cv.getContext('2d');const tt=document.getElementById('tooltip');
function resize(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;draw();}
const REGIONS=[
  {name:'FLINT CLAN',desc:'1 billion+ members. Controlled territory: all of Australia. Powers: Transforming Control, Cloning, Slime Manipulation.',clr:'#00b4ff',x:.72,y:.62,r:.1,shape:'circle'},
  {name:'ELEMENTAL CLAN',desc:'Peaceful clan. Territory: Japan, Korea, most of Asia. Powers: Fire, Lightning, Earth, Water, Air.',clr:'#00ffcc',x:.77,y:.35,r:.08,shape:'circle'},
  {name:'SAEO CLAN',desc:'Most diverse abilities. Territory: Russia and surrounding regions. Largest army.',clr:'#9900ff',x:.6,y:.22,r:.1,shape:'circle'},
  {name:'NEYDIS CLAN',desc:'Founded by Wally Neydis. Territory: South/West Africa. Mission: eradicate non-powered humans.',clr:'#ff2d6e',x:.52,y:.55,r:.07,shape:'circle'},
  {name:'ACOTW',desc:'Not on Earth — colonized Mars + Mercury. Population of hyper-intelligent individuals. Lead by Council of 12.',clr:'#ffd700',x:.17,y:.2,r:.07,shape:'circle'},
  {name:'ROP',desc:'Republic of People — non-powered humans. North + South America. 2 billion citizens. Created dimensional travel.',clr:'#ff6600',x:.25,y:.45,r:.09,shape:'circle'},
  {name:'IN-BETWEEN REALM',desc:'A dimension between worlds. Home of Mr. Sandman and other SCP entities. Avoid at all costs.',clr:'#aa00ff',x:.44,y:.78,r:.05,shape:'circle'},
  {name:'THE MOON',desc:'First colony: 1843a. Gateway between Earth and Mars colonies.',clr:'#888888',x:.83,y:.68,r:.04,shape:'circle'},
];
let hovered=null;
function draw(){
  ctx.clearRect(0,0,cv.width,cv.height);
  // Stars
  if(!draw._stars){draw._stars=Array.from({length:80},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.5+.5,a:Math.random()*.5+.2}));}
  draw._stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x*cv.width,s.y*cv.height,s.r,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,'+s.a+')';ctx.fill();});
  // Grid lines (world map feel)
  ctx.strokeStyle='rgba(0,180,255,0.05)';ctx.lineWidth=1;
  for(let x=0;x<cv.width;x+=cv.width/10){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke();}
  for(let y=0;y<cv.height;y+=cv.height/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke();}
  // Connections
  ctx.strokeStyle='rgba(0,180,255,0.06)';ctx.lineWidth=1;ctx.setLineDash([4,6]);
  [[0,2],[2,1],[1,4],[3,6]].forEach(([a,b])=>{const ra=REGIONS[a],rb=REGIONS[b];ctx.beginPath();ctx.moveTo(ra.x*cv.width,ra.y*cv.height);ctx.lineTo(rb.x*cv.width,rb.y*cv.height);ctx.stroke();});
  ctx.setLineDash([]);
  // Regions
  REGIONS.forEach((r,i)=>{
    const cx=r.x*cv.width,cy=r.y*cv.height,rad=r.r*Math.min(cv.width,cv.height);
    const isH=hovered===i;
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
    g.addColorStop(0,r.clr+'44');g.addColorStop(1,r.clr+'08');
    ctx.beginPath();ctx.arc(cx,cy,rad,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
    ctx.beginPath();ctx.arc(cx,cy,rad,0,Math.PI*2);ctx.strokeStyle=isH?r.clr:r.clr+'66';ctx.lineWidth=isH?2:1;ctx.stroke();
    if(isH){ctx.beginPath();ctx.arc(cx,cy,rad+4,0,Math.PI*2);ctx.strokeStyle=r.clr+'33';ctx.lineWidth=3;ctx.stroke();}
    ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fillStyle=r.clr;ctx.fill();
    ctx.font='bold 8px Orbitron,monospace';ctx.fillStyle=r.clr;ctx.textAlign='center';ctx.fillText(r.name.split(' ')[0],cx,cy+rad+12);
  });
}
cv.onmousemove=e=>{const rect=cv.getBoundingClientRect();const mx=(e.clientX-rect.left)/rect.width,my=(e.clientY-rect.top)/rect.height;let found=-1;REGIONS.forEach((r,i)=>{const dx=mx-r.x,dy=my-r.y;if(Math.sqrt(dx*dx+dy*dy)<r.r*1.2)found=i;});if(found!==hovered){hovered=found;draw();}if(found>=0){const r=REGIONS[found];tt.style.opacity='1';tt.style.left=Math.min(e.clientX-rect.left+10,rect.width-200)+'px';tt.style.top=Math.max(10,e.clientY-rect.top-60)+'px';document.getElementById('tt-name').textContent=r.name;document.getElementById('tt-name').style.setProperty('--clr',r.clr);document.getElementById('tt-desc').textContent=r.desc;}else{tt.style.opacity='0';}};
cv.onmouseleave=()=>{hovered=null;tt.style.opacity='0';draw();};
window.onresize=resize;resize();
<\/script></body></html>`},

  {id:'as_spaceshooter',name:'Rift Blaster',svgIcon:'spaceshooter',bgClass:'icon-bg-red',cat:'Games',desc:'Dodge and destroy. A neon space shooter set in the TOB OS universe. How long can you survive?',screenshots:['🚀','💥','⭐'],featured:true,htmlApp:`<!DOCTYPE html><html><head><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#000010;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:Orbitron,monospace;gap:8px;}#ui{display:flex;justify-content:space-between;width:min(400px,90vw);font-size:10px;color:#00b4ff;letter-spacing:2px;}canvas{display:block;border:1px solid rgba(0,180,255,.2);border-radius:4px;box-shadow:0 0 20px rgba(0,50,200,.3);}#over{display:none;flex-direction:column;align-items:center;gap:10px;position:absolute;}#over h2{color:#ff2d6e;font-size:14px;letter-spacing:3px;}#over button{padding:8px 22px;border-radius:20px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:Orbitron,monospace;font-size:10px;cursor:pointer;}</style></head><body>
<div id="ui"><span>HP: <span id="hp-disp">3</span> ♥</span><span>SCORE: <span id="score-disp">0</span></span><span>LEVEL: <span id="lvl-disp">1</span></span></div>
<canvas id="c" width="400" height="320"></canvas>
<div id="over"><h2>GAME OVER</h2><div id="final-score" style="color:#ffd700;font-size:11px;"></div><button onclick="restartGame()">↻ RESTART</button></div>
<script>
const cv=document.getElementById('c');const ctx=cv.getContext('2d');
let ship,bullets,enemies,particles,score,hp,lvl,raf,keys,gameOver,eInterval,shootInterval;
function init(){ship={x:200,y:270,w:20,h:28,spd:4};bullets=[];enemies=[];particles=[];score=0;hp=3;lvl=1;gameOver=false;keys={};clearInterval(eInterval);clearInterval(shootInterval);document.getElementById('over').style.display='none';eInterval=setInterval(spawnEnemy,800);shootInterval=setInterval(autoShoot,350);if(raf)cancelAnimationFrame(raf);loop();}
function autoShoot(){if(gameOver||!ship)return;bullets.push({x:ship.x,y:ship.y-16,dy:-7,clr:'#00ffcc',w:3,h:10,own:true});}
function spawnEnemy(){if(gameOver)return;const x=Math.random()*380+10;enemies.push({x,y:-20,w:16,h:16,hp:1+(lvl>3?1:0),spd:1+lvl*.3+Math.random()});}
function addParticles(x,y,clr,n){for(let i=0;i<n;i++)particles.push({x,y,vx:(Math.random()-0.5)*4,vy:(Math.random()-1.5)*4,life:1,clr});}
function loop(){raf=requestAnimationFrame(loop);ctx.fillStyle='rgba(0,0,16,0.25)';ctx.fillRect(0,0,400,320);
// Ship
if(keys['ArrowLeft']||keys['a'])ship.x=Math.max(12,ship.x-ship.spd);
if(keys['ArrowRight']||keys['d'])ship.x=Math.min(388,ship.x+ship.spd);
ctx.fillStyle='#00b4ff';ctx.beginPath();ctx.moveTo(ship.x,ship.y-16);ctx.lineTo(ship.x-12,ship.y+12);ctx.lineTo(ship.x,ship.y+6);ctx.lineTo(ship.x+12,ship.y+12);ctx.closePath();ctx.fill();ctx.shadowColor='#00b4ff';ctx.shadowBlur=12;ctx.fill();ctx.shadowBlur=0;
// Bullets
bullets=bullets.filter(b=>{b.y+=b.dy;if(b.y<-10||b.y>330)return false;ctx.fillStyle=b.clr;ctx.shadowColor=b.clr;ctx.shadowBlur=6;ctx.fillRect(b.x-b.w/2,b.y,b.w,b.h);ctx.shadowBlur=0;return true;});
// Enemies
enemies=enemies.filter(e=>{e.y+=e.spd;ctx.fillStyle='#ff2d6e';ctx.shadowColor='#ff2d6e';ctx.shadowBlur=8;ctx.beginPath();ctx.moveTo(e.x,e.y+e.h);ctx.lineTo(e.x-e.w,e.y);ctx.lineTo(e.x+e.w,e.y);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
if(e.y>330){hp--;document.getElementById('hp-disp').textContent=hp;addParticles(e.x,300,'#ff2d6e',5);if(hp<=0)endGame();return false;}
// Bullet collision
let hit=false;bullets=bullets.filter(b=>{if(b.own&&Math.abs(b.x-e.x)<e.w+2&&Math.abs(b.y-e.y)<e.h+8){e.hp--;if(e.hp<=0){score+=10+(lvl*2);document.getElementById('score-disp').textContent=score;addParticles(e.x,e.y,'#ffd700',8);hit=true;if(score>0&&score%50===0){lvl++;document.getElementById('lvl-disp').textContent=lvl;}}return false;}return true;});return!hit;});
// Particles
particles=particles.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.life-=0.04;ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle=p.clr+(Math.floor(p.life*255).toString(16).padStart(2,'0'));ctx.fill();return p.life>0;});
}
function endGame(){gameOver=true;clearInterval(eInterval);clearInterval(shootInterval);cancelAnimationFrame(raf);document.getElementById('over').style.display='flex';document.getElementById('final-score').textContent='Final Score: '+score+' | Level: '+lvl;}
function restartGame(){init();}
document.addEventListener('keydown',e=>{keys[e.key]=true;});document.addEventListener('keyup',e=>{keys[e.key]=false;});
// Touch
let touchX=200;cv.addEventListener('touchmove',e=>{e.preventDefault();const r=cv.getBoundingClientRect();ship.x=(e.touches[0].clientX-r.left)/(r.right-r.left)*400;},{passive:false});
init();
<\/script></body></html>`},

  {id:'as_rhythmforge',name:'RhythmForge',icon:'🎵',cat:'Music',desc:'Drop any MP3 and play a DFJK rhythm game. Auto-generates note maps from beat detection. Record your own maps in Editor mode.',featured:true,screenshots:['🎵','🎮','⚡'],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#050005;color:#e8d0ff;font-family:'Segoe UI',sans-serif;height:100vh;display:flex;flex-direction:column;overflow:hidden;user-select:none;}
#header{padding:8px 14px;background:rgba(0,0,10,.8);border-bottom:1px solid rgba(100,0,255,.25);display:flex;align-items:center;gap:10px;flex-shrink:0;}
#logo{font-family:monospace;font-size:12px;font-weight:700;color:#aa44ff;letter-spacing:3px;}
#stats{display:flex;gap:12px;margin-left:auto;font-family:monospace;font-size:10px;}
.stat-val{color:#aa44ff;font-weight:700;}
#mode-btns{display:flex;gap:6px;}
.mode-btn{padding:4px 12px;border-radius:16px;border:1px solid rgba(100,0,255,.3);background:rgba(50,0,100,.2);color:#aa44ff;font-size:9px;cursor:pointer;font-family:monospace;transition:all .15s;}
.mode-btn.active{background:rgba(100,0,255,.3);border-color:#6600ff;box-shadow:0 0 10px rgba(100,0,255,.3);}
#main{flex:1;display:grid;grid-template-columns:minmax(220px,280px) 1fr;overflow:hidden;position:relative;}

/* ─ DROP ZONE ─ */
#drop-zone{position:absolute;inset:0;z-index:50;grid-column:1 / -1;background:rgba(5,0,15,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;backdrop-filter:blur(4px);}
#drop-zone.hidden{display:none;}
.drop-icon{font-size:64px;opacity:.6;}
.drop-title{font-family:monospace;font-size:16px;color:#aa44ff;letter-spacing:4px;}
.drop-sub{font-size:11px;color:rgba(150,80,255,.5);font-family:monospace;}
#drop-zone.drag-over{background:rgba(80,0,200,.2);border:2px dashed #6600ff;}
#file-pick-btn{padding:10px 28px;border-radius:20px;background:linear-gradient(135deg,#3300aa,#6600ff);border:none;color:#fff;font-family:monospace;font-size:11px;cursor:pointer;letter-spacing:2px;}

/* ─ LIBRARY ─ */
#library-panel{background:rgba(10,0,20,.85);border-right:1px solid rgba(100,0,255,.16);display:flex;flex-direction:column;min-width:0;}
.library-head{padding:14px;border-bottom:1px solid rgba(100,0,255,.15);display:flex;flex-direction:column;gap:8px;}
.library-title{font-family:monospace;font-size:13px;color:#aa44ff;letter-spacing:3px;}
.library-sub{font-family:monospace;font-size:9px;color:rgba(170,68,255,.58);line-height:1.5;}
.library-actions{display:flex;gap:6px;flex-wrap:wrap;}
.library-btn{flex:1;min-width:88px;padding:7px 10px;border-radius:14px;border:1px solid rgba(100,0,255,.28);background:rgba(45,0,90,.28);color:#dcb8ff;font-family:monospace;font-size:9px;cursor:pointer;letter-spacing:1px;transition:all .15s;}
.library-btn:hover{background:rgba(100,0,255,.24);border-color:#aa44ff;}
#library-list{flex:1;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px;}
.library-empty{padding:18px 14px;border:1px dashed rgba(100,0,255,.22);border-radius:14px;color:rgba(170,68,255,.55);font-family:monospace;font-size:10px;line-height:1.7;text-align:center;}
.library-item{padding:10px;border-radius:14px;border:1px solid rgba(100,0,255,.16);background:rgba(32,0,60,.32);display:flex;flex-direction:column;gap:7px;}
.library-item.active{border-color:#aa44ff;box-shadow:0 0 16px rgba(100,0,255,.22);background:rgba(60,0,110,.32);}
.library-name{font-family:monospace;font-size:11px;color:#f1deff;letter-spacing:1px;}
.library-meta{font-family:monospace;font-size:8px;color:rgba(170,68,255,.58);line-height:1.6;}
.library-item .ctrl-btn{padding:4px 10px;font-size:8px;}
.library-row{display:flex;gap:6px;flex-wrap:wrap;}

/* ─ GAME AREA ─ */
#game-area{flex:1;display:flex;flex-direction:column;overflow:hidden;}
#track-info{padding:6px 14px;background:rgba(0,0,10,.6);border-bottom:1px solid rgba(100,0,255,.15);display:flex;align-items:center;gap:10px;flex-shrink:0;}
#track-name{font-family:monospace;font-size:10px;color:#aa44ff;letter-spacing:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
#play-controls{display:flex;gap:6px;margin-left:auto;flex-shrink:0;}
.ctrl-btn{padding:4px 12px;border-radius:16px;border:1px solid rgba(100,0,255,.3);background:rgba(50,0,100,.2);color:#aa44ff;font-family:monospace;font-size:9px;cursor:pointer;transition:all .15s;}
.ctrl-btn:hover{background:rgba(100,0,255,.25);}

/* ─ RHYTHM LANE ─ */
#rhythm-wrap{flex:1;position:relative;overflow:hidden;}
#lane-bg{position:absolute;inset:0;display:grid;grid-template-columns:repeat(4,1fr);}
.lane-col{border-right:1px solid rgba(100,0,255,.08);position:relative;}
.lane-col:last-child{border-right:none;}
.lane-key-label{position:absolute;bottom:68px;left:50%;transform:translateX(-50%);font-family:monospace;font-size:14px;font-weight:700;color:rgba(150,80,255,.35);pointer-events:none;}
#hit-zone{position:absolute;bottom:56px;left:0;right:0;height:6px;background:rgba(100,0,255,.15);z-index:5;}
#notes-canvas{position:absolute;inset:0;width:100%;height:100%;}
/* ─ KEY INDICATORS ─ */
#keys-row{position:absolute;bottom:0;left:0;right:0;height:56px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;background:rgba(0,0,10,.6);border-top:1px solid rgba(100,0,255,.2);z-index:10;}
.key-pad{border-radius:8px;background:rgba(30,0,60,.7);border:2px solid rgba(100,0,255,.3);display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:16px;font-weight:700;color:rgba(150,80,255,.5);transition:all .06s;}
.key-pad.pressed{background:rgba(100,0,255,.4);border-color:#aa44ff;color:#aa44ff;box-shadow:0 0 16px rgba(100,0,255,.5);}
.key-pad.hit{background:rgba(200,100,255,.6);border-color:#fff;color:#fff;box-shadow:0 0 24px rgba(200,100,255,.7);}
.key-pad.miss{background:rgba(255,0,80,.2);border-color:#ff0055;}

/* ─ HIT FEEDBACK ─ */
.hit-text{position:absolute;font-family:monospace;font-size:18px;font-weight:700;letter-spacing:2px;pointer-events:none;animation:hitFade .6s ease forwards;z-index:20;}
@keyframes hitFade{0%{opacity:1;transform:translateY(0) scale(1.2)}100%{opacity:0;transform:translateY(-40px) scale(.9)}}

/* ─ EDITOR MODE ─ */
#editor-panel{padding:10px 14px;background:rgba(0,0,10,.7);border-top:1px solid rgba(100,0,255,.15);flex-shrink:0;display:none;}
#editor-panel.show{display:block;}
.edit-row{display:flex;align-items:center;gap:10px;font-family:monospace;font-size:10px;color:rgba(150,80,255,.7);}
.edit-hint{font-size:9px;color:rgba(100,0,255,.5);margin-top:4px;letter-spacing:1px;}

/* ─ RESULTS OVERLAY ─ */
#results-overlay{position:absolute;inset:0;z-index:80;background:rgba(0,0,10,.9);display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;backdrop-filter:blur(6px);}
#results-overlay.show{display:flex;}
.result-grade{font-family:monospace;font-size:64px;font-weight:900;text-shadow:0 0 40px currentColor;}
.result-score{font-family:monospace;font-size:22px;font-weight:700;color:#e8d0ff;letter-spacing:3px;}
.result-stats{font-family:monospace;font-size:11px;color:rgba(150,80,255,.7);text-align:center;line-height:2;}
.result-btn{padding:10px 28px;border-radius:20px;background:linear-gradient(135deg,#3300aa,#6600ff);border:none;color:#fff;font-family:monospace;font-size:11px;cursor:pointer;letter-spacing:2px;margin-top:4px;}
</style></head><body>

<div id="header">
  <div id="logo">◈ RHYTHMFORGE</div>
  <div id="mode-btns">
    <div class="mode-btn active" id="mb-play" onclick="setMode('play')">▶ PLAY</div>
    <div class="mode-btn" id="mb-edit" onclick="setMode('edit')">✏ EDITOR</div>
  </div>
  <div id="stats">
    <span>SCORE: <span class="stat-val" id="score-disp">0</span></span>
    <span>COMBO: <span class="stat-val" id="combo-disp">0</span>x</span>
    <span>ACCURACY: <span class="stat-val" id="acc-disp">--%</span></span>
  </div>
</div>

<div id="main">
  <!-- Drop zone -->
  <div id="drop-zone">
    <div class="drop-icon">🎵</div>
    <div class="drop-title">DROP MP3 HERE</div>
    <div class="drop-sub">or click to browse · supports MP3, WAV, OGG</div>
    <button id="file-pick-btn" onclick="document.getElementById('hidden-file').click()">📂 BROWSE FILE</button>
    <div class="drop-sub" style="margin-top:8px;font-size:8px;letter-spacing:2px">KEYS: D F J K · HIT NOTES AS THEY REACH THE LINE</div>
    <input type="file" id="hidden-file" accept="audio/*" style="display:none" onchange="loadAudioFile(this.files[0])">
  </div>

  <aside id="library-panel">
    <div class="library-head">
      <div class="library-title">LIBRARY</div>
      <div class="library-sub">Save multiple rhythm maps by name. Audio files stay local to your browser session, so load the matching song before you play a saved chart.</div>
      <div class="library-actions">
        <button class="library-btn" onclick="saveMap()">💾 SAVE TRACK</button>
        <button class="library-btn" onclick="refreshLibraryList()">⟳ REFRESH</button>
      </div>
    </div>
    <div id="library-list"></div>
  </aside>

  <!-- Game area -->
  <div id="game-area">
    <div id="track-info">
      <div id="track-name">NO TRACK LOADED</div>
      <div id="play-controls">
        <div class="ctrl-btn" id="btn-playback" onclick="togglePlayback()">▶ PLAY</div>
        <div class="ctrl-btn" onclick="restartTrack()">↺ RESTART</div>
        <div class="ctrl-btn" onclick="showDropZone()">📂 LOAD</div>
        <div class="ctrl-btn" id="btn-automap" onclick="autoGenMap()" title="Auto-generate a map from beat detection">🎲 AUTO MAP</div>
      </div>
    </div>
    <div id="rhythm-wrap">
      <div id="lane-bg">
        <div class="lane-col"><div class="lane-key-label">D</div></div>
        <div class="lane-col"><div class="lane-key-label">F</div></div>
        <div class="lane-col"><div class="lane-key-label">J</div></div>
        <div class="lane-col"><div class="lane-key-label">K</div></div>
      </div>
      <div id="hit-zone"></div>
      <canvas id="notes-canvas"></canvas>
      <div id="keys-row">
        <div class="key-pad" id="kp-d">D</div>
        <div class="key-pad" id="kp-f">F</div>
        <div class="key-pad" id="kp-j">J</div>
        <div class="key-pad" id="kp-k">K</div>
      </div>
    </div>
    <div id="editor-panel">
      <div class="edit-row">
        <span style="color:#aa44ff;font-weight:700">✏ MAP EDITOR</span>
        <span style="color:rgba(150,80,255,.5)">—</span>
        <span>Press <b style="color:#aa44ff">PLAY</b> then tap <b style="color:#aa44ff">D F J K</b> to record notes in real-time</span>
        <div class="ctrl-btn" onclick="clearMap()" style="margin-left:auto">🗑 CLEAR MAP</div>
        <div class="ctrl-btn" onclick="saveMap()">💾 SAVE MAP</div>
        <div class="ctrl-btn" onclick="loadSavedMap()">📂 LOAD SELECTED</div>
      </div>
      <div class="edit-hint">TIP: Start playback first, then tap D/F/J/K with the beat. Notes are recorded at the current audio time.</div>
    </div>
  </div>

  <!-- Results overlay -->
  <div id="results-overlay">
    <div class="result-grade" id="result-grade">S</div>
    <div class="result-score" id="result-score">0</div>
    <div class="result-stats" id="result-stats"></div>
    <button class="result-btn" onclick="restartTrack()">↺ PLAY AGAIN</button>
    <button class="result-btn" style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15)" onclick="document.getElementById('results-overlay').classList.remove('show')">✕ CLOSE</button>
  </div>
</div>

<script>
'use strict';
// ─── STATE ───
const LANES = 4;
const KEYS  = ['d','f','j','k'];
const KEY_IDS = ['kp-d','kp-f','kp-j','kp-k'];
const COLORS  = ['#ff2d9e','#aa44ff','#00b4ff','#00ffcc'];
const NOTE_SPEED  = 280;   // px per second
const HIT_WINDOW  = 0.09;  // seconds tolerance for perfect
const OK_WINDOW   = 0.18;  // seconds tolerance for OK
const NOTE_HEIGHT = 18;
const NOTE_RADIUS = 5;

let audioCtx=null, audioSrc=null, audioBuffer=null, audioNode=null;
let isPlaying=false, startTime=0, pauseOffset=0, trackDuration=0;
let mode='play', isEditing=false;
let notes=[]; // {lane:0-3, time:float, hit:bool, shown:bool}
let score=0, combo=0, maxCombo=0, totalNotes=0, hitCount=0, missCount=0, perfectCount=0, okCount=0;
let animId=null;
let wrapEl, cvEl, ctx2;
let pressedKeys=new Set();
let currentTrackName='';
let currentMapId=null;
const MAP_LIBRARY_KEY='tob_rhythmmap_library_v2';

// ─── INIT ───
window.addEventListener('load',()=>{
  wrapEl = document.getElementById('rhythm-wrap');
  cvEl   = document.getElementById('notes-canvas');
  ctx2   = cvEl.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize',resizeCanvas);
  setupDropZone();
  refreshLibraryList();
  gameLoop();
});

function resizeCanvas(){
  if(!cvEl)return;
  cvEl.width  = wrapEl.offsetWidth;
  cvEl.height = wrapEl.offsetHeight;
}

function getCurrentTime(){
  if(!isPlaying) return pauseOffset;
  if(!audioCtx)  return 0;
  return pauseOffset + (audioCtx.currentTime - startTime);
}

// ─── AUDIO ───
function loadAudioFile(file){
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    if(!audioCtx) audioCtx=new AudioContext();
    audioCtx.decodeAudioData(ev.target.result.slice(0),buf=>{
      audioBuffer=buf;
      trackDuration=buf.duration;
      const name=file.name.replace(/\.[^.]+$/,'');
      currentTrackName=name;
      document.getElementById('track-name').textContent='♪ '+name.toUpperCase();
      document.getElementById('drop-zone').classList.add('hidden');
      pauseOffset=0; stopPlayback();
      autoGenMap();
      document.getElementById('btn-playback').textContent='▶ PLAY';
      toast2('🎵 Loaded: '+name);
    },err=>toast2('⚠ Could not decode audio'));
  };
  reader.readAsArrayBuffer(file);
}

function startPlayback(){
  if(!audioBuffer||!audioCtx) return;
  if(audioCtx.state==='suspended') audioCtx.resume();
  if(audioNode){audioNode.stop();audioNode.disconnect();}
  audioNode=audioCtx.createBufferSource();
  audioNode.buffer=audioBuffer;
  audioNode.connect(audioCtx.destination);
  audioNode.start(0,pauseOffset);
  startTime=audioCtx.currentTime;
  isPlaying=true;
  audioNode.onended=()=>{ if(isPlaying) onTrackEnd(); };
  document.getElementById('btn-playback').textContent='⏸ PAUSE';
}

function stopPlayback(){
  if(audioNode){audioNode.stop();audioNode.disconnect();audioNode=null;}
  pauseOffset=0; isPlaying=false;
  document.getElementById('btn-playback').textContent='▶ PLAY';
}

function togglePlayback(){
  if(!audioBuffer){toast2('⚠ Load an MP3 first');return;}
  if(isPlaying){
    pauseOffset=getCurrentTime();
    audioNode&&audioNode.stop();
    audioNode=null; isPlaying=false;
    document.getElementById('btn-playback').textContent='▶ PLAY';
  } else { startPlayback(); }
}

function restartTrack(){
  stopPlayback();
  pauseOffset=0; score=0; combo=0; maxCombo=0; hitCount=0; missCount=0; perfectCount=0; okCount=0;
  notes.forEach(n=>{n.hit=false;n.missed=false;n.shown=false;});
  document.getElementById('score-disp').textContent='0';
  document.getElementById('combo-disp').textContent='0';
  document.getElementById('acc-disp').textContent='--%';
  document.getElementById('results-overlay').classList.remove('show');
  if(audioBuffer) startPlayback();
}

function onTrackEnd(){
  isPlaying=false; pauseOffset=trackDuration;
  document.getElementById('btn-playback').textContent='▶ PLAY';
  setTimeout(showResults, 800);
}

// ─── AUTO MAP GENERATOR ───
function autoGenMap(){
  if(!audioBuffer){toast2('⚠ Load an audio file first');return;}
  notes=[];
  // Offline analysis: compute RMS energy in short windows
  const sampleRate=audioBuffer.sampleRate;
  const ch=audioBuffer.getChannelData(0);
  const windowSecs=0.06; // 60ms windows
  const hopSecs=0.04;    // 40ms hops
  const winSamples=Math.round(windowSecs*sampleRate);
  const hopSamples=Math.round(hopSecs*sampleRate);
  const energies=[];
  for(let i=0;i<ch.length-winSamples;i+=hopSamples){
    let rms=0;
    for(let j=i;j<i+winSamples;j++) rms+=ch[j]*ch[j];
    energies.push({t:i/sampleRate, e:Math.sqrt(rms/winSamples)});
  }
  // Compute local threshold (median-based)
  const sorted=[...energies].sort((a,b)=>a.e-b.e);
  const threshold=sorted[Math.floor(sorted.length*.65)].e*1.3;
  // Pick beats: must exceed threshold and be at least 200ms from last note
  const minGap=0.2;
  let lastTime=-1;
  let lane=0;
  const lanePattern=[0,2,1,3,0,1,2,3,1,3,0,2];
  let patIdx=0;
  energies.forEach(({t,e})=>{
    if(e>threshold && t-lastTime>minGap && t<audioBuffer.duration-0.5){
      // Vary lanes using pattern + some randomness
      const l=lanePattern[patIdx%lanePattern.length];
      patIdx++;
      // occasionally add a second note nearby
      notes.push({lane:l,time:t,hit:false,missed:false,shown:false});
      if(Math.random()<0.12 && t-lastTime>0.35){
        const l2=(l+2)%4;
        notes.push({lane:l2,time:t+0.05,hit:false,missed:false,shown:false});
      }
      lastTime=t;
    }
  });
  notes.sort((a,b)=>a.time-b.time);
  totalNotes=notes.length;
  toast2('🎲 Auto-mapped '+notes.length+' notes!');
}

// ─── MAP RECORDING ───
function recordNoteForKey(lane){
  if(!isEditing||!isPlaying) return;
  const t=getCurrentTime();
  notes.push({lane,time:t,hit:false,missed:false,shown:false});
  notes.sort((a,b)=>a.time-b.time);
  totalNotes=notes.length;
}

function clearMap(){ notes=[]; totalNotes=0; currentMapId=null; toast2('🗑 Map cleared'); }
function getMapLibrary(){
  try{
    const parsed=JSON.parse(localStorage.getItem(MAP_LIBRARY_KEY)||'[]');
    return Array.isArray(parsed)?parsed:[];
  }catch(err){
    return [];
  }
}
function setMapLibrary(items){
  localStorage.setItem(MAP_LIBRARY_KEY,JSON.stringify(items));
}
function formatStamp(ts){
  if(!ts)return 'unknown';
  const d=new Date(ts);
  return d.toLocaleDateString()+' '+d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}
function refreshLibraryList(){
  const list=document.getElementById('library-list');
  if(!list)return;
  const items=getMapLibrary().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
  if(!items.length){
    list.innerHTML='<div class="library-empty">No saved tracks yet.<br>Load audio, build a map, then save it here.</div>';
    return;
  }
  list.innerHTML='';
  items.forEach(item=>{
    const card=document.createElement('div');
    card.className='library-item'+(item.id===currentMapId?' active':'');

    const name=document.createElement('div');
    name.className='library-name';
    name.textContent=item.name||'UNTITLED TRACK';
    card.appendChild(name);

    const meta=document.createElement('div');
    meta.className='library-meta';
    meta.innerHTML='Song: '+escapeHtml(item.trackName||'Unknown')+'<br>Notes: '+((item.notes&&item.notes.length)||0)+' · Updated: '+escapeHtml(formatStamp(item.updatedAt));
    card.appendChild(meta);

    const row=document.createElement('div');
    row.className='library-row';
    [
      ['▶ LOAD',()=>loadSavedMap(item.id)],
      ['✎ RENAME',()=>renameMap(item.id)],
      ['🗑 DELETE',()=>deleteMap(item.id)]
    ].forEach(([label,handler])=>{
      const btn=document.createElement('div');
      btn.className='ctrl-btn';
      btn.textContent=label;
      btn.onclick=handler;
      row.appendChild(btn);
    });
    card.appendChild(row);
    list.appendChild(card);
  });
}
function saveMap(){
  if(!notes.length){toast2('⚠ No notes to save');return;}
  const library=getMapLibrary();
  const existing=library.find(item=>item.id===currentMapId);
  const fallbackName=(currentTrackName||'Track')+' Map';
  const suggested=existing?.name||fallbackName;
  const name=(prompt('Save track as:',suggested)||'').trim();
  if(!name){toast2('⚠ Save cancelled');return;}
  const now=Date.now();
  const payload={
    id:existing?.id||('map_'+now.toString(36)+Math.random().toString(36).slice(2,7)),
    name,
    trackName:currentTrackName||existing?.trackName||'Unloaded Track',
    createdAt:existing?.createdAt||now,
    updatedAt:now,
    notes:notes.map(n=>({l:n.lane,t:+n.time.toFixed(3)}))
  };
  const next=library.filter(item=>item.id!==payload.id);
  next.push(payload);
  currentMapId=payload.id;
  setMapLibrary(next);
  refreshLibraryList();
  toast2('💾 Saved '+name+' ('+notes.length+' notes)');
}
function loadSavedMap(mapId){
  const library=getMapLibrary();
  const target=library.find(item=>item.id===(mapId||currentMapId))||library[0];
  if(!target){toast2('⚠ No saved map');return;}
  notes=(target.notes||[]).map(n=>({lane:n.l,time:n.t,hit:false,missed:false,shown:false}));
  totalNotes=notes.length;
  currentMapId=target.id;
  refreshLibraryList();
  toast2('📂 Loaded '+target.name+' ('+notes.length+' notes)');
  if(target.trackName && currentTrackName && target.trackName!==currentTrackName){
    toast2('ℹ Saved for '+target.trackName+' · current song is '+currentTrackName);
  }
}
function renameMap(mapId){
  const library=getMapLibrary();
  const idx=library.findIndex(item=>item.id===mapId);
  if(idx<0)return;
  const name=(prompt('Rename track:',library[idx].name)||'').trim();
  if(!name)return;
  library[idx].name=name;
  library[idx].updatedAt=Date.now();
  setMapLibrary(library);
  currentMapId=mapId;
  refreshLibraryList();
  toast2('✎ Renamed to '+name);
}
function deleteMap(mapId){
  const library=getMapLibrary();
  const target=library.find(item=>item.id===mapId);
  if(!target)return;
  if(!confirm('Delete '+target.name+' from the library?'))return;
  setMapLibrary(library.filter(item=>item.id!==mapId));
  if(currentMapId===mapId)currentMapId=null;
  refreshLibraryList();
  toast2('🗑 Removed '+target.name);
}
function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

// ─── INPUT ───
document.addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();
  const idx=KEYS.indexOf(k);
  if(idx<0)return;
  if(pressedKeys.has(k))return;
  pressedKeys.add(k);
  const pad=document.getElementById(KEY_IDS[idx]);
  if(pad)pad.classList.add('pressed');
  if(mode==='edit'&&isEditing&&isPlaying){recordNoteForKey(idx);return;}
  processHit(idx);
});
document.addEventListener('keyup',e=>{
  const k=e.key.toLowerCase();
  const idx=KEYS.indexOf(k);
  if(idx<0)return;
  pressedKeys.delete(k);
  const pad=document.getElementById(KEY_IDS[idx]);
  if(pad)pad.classList.remove('pressed');
});

function processHit(lane){
  if(!isPlaying)return;
  const now=getCurrentTime();
  // Find nearest unlit note in this lane
  let best=null, bestDist=Infinity;
  notes.forEach(n=>{
    if(n.lane===lane&&!n.hit&&!n.missed){
      const dist=Math.abs(n.time-now);
      if(dist<bestDist){bestDist=dist;best=n;}
    }
  });
  if(!best||bestDist>OK_WINDOW){
    // Miss / empty hit
    flashKey(lane,'miss');
    showHitText(lane,'MISS',false);
    return;
  }
  best.hit=true; hitCount++; combo++;
  if(combo>maxCombo)maxCombo=combo;
  if(bestDist<=HIT_WINDOW){ perfectCount++; score+=300+combo*10; showHitText(lane,'PERFECT',true,true); }
  else { okCount++; score+=150+combo*5; showHitText(lane,'OK',true,false); }
  flashKey(lane,'hit');
  updateScoreUI();
}

function flashKey(lane,type){
  const pad=document.getElementById(KEY_IDS[lane]);
  if(!pad)return;
  pad.classList.add(type);
  setTimeout(()=>pad.classList.remove(type),160);
}

function showHitText(lane,text,good,perfect){
  const el=document.createElement('div');
  el.className='hit-text';
  const laneW=cvEl.width/4;
  el.style.left=(lane*laneW+laneW/2-30)+'px';
  el.style.bottom='80px';
  el.style.color=perfect?'#ffd700':good?'#aa44ff':'#ff0055';
  el.textContent=text;
  document.getElementById('rhythm-wrap').appendChild(el);
  setTimeout(()=>el.remove(),600);
}

function updateScoreUI(){
  document.getElementById('score-disp').textContent=score;
  document.getElementById('combo-disp').textContent=combo;
  const total=hitCount+missCount;
  if(total>0)document.getElementById('acc-disp').textContent=Math.round(hitCount/total*100)+'%';
}

// ─── MISSED NOTE DETECTION ───
function checkMissedNotes(){
  if(!isPlaying)return;
  const now=getCurrentTime();
  notes.forEach(n=>{
    if(!n.hit&&!n.missed&&n.time<now-OK_WINDOW){
      n.missed=true;
      missCount++;
      combo=0;
      document.getElementById('combo-disp').textContent='0';
      updateScoreUI();
    }
  });
}

// ─── RENDERING ───
function gameLoop(){
  animId=requestAnimationFrame(gameLoop);
  checkMissedNotes();
  renderNotes();
}

function renderNotes(){
  if(!cvEl||!ctx2)return;
  const W=cvEl.width,H=cvEl.height;
  ctx2.clearRect(0,0,W,H);
  if(!isPlaying&&pauseOffset===0) return;
  const laneW=W/4;
  const hitY=H-62; // hit zone y center
  const now=getCurrentTime();
  // Draw lane separators
  ctx2.strokeStyle='rgba(100,0,255,.07)';ctx2.lineWidth=1;
  for(let i=1;i<4;i++){ctx2.beginPath();ctx2.moveTo(i*laneW,0);ctx2.lineTo(i*laneW,H-56);ctx2.stroke();}
  // Draw hit zone glow
  ctx2.fillStyle='rgba(100,0,255,.1)';ctx2.fillRect(0,hitY-4,W,8);
  // Draw notes
  notes.forEach(n=>{
    if(n.hit||n.missed)return;
    const dt=n.time-now; // positive = in future
    if(dt>3||dt<-OK_WINDOW)return; // too far or passed
    const y=hitY - dt*NOTE_SPEED;
    if(y<-NOTE_HEIGHT||y>H-40)return;
    const x=n.lane*laneW;
    const col=COLORS[n.lane];
    // Glow
    const grd=ctx2.createRadialGradient(x+laneW/2,y,0,x+laneW/2,y,laneW*.4);
    grd.addColorStop(0,col+'88');grd.addColorStop(1,col+'00');
    ctx2.fillStyle=grd;ctx2.fillRect(x,y-20,laneW,40);
    // Note body
    const nW=laneW-12,nX=x+6;
    ctx2.fillStyle=col;
    ctx2.shadowColor=col;ctx2.shadowBlur=12;
    ctx2.beginPath();
    ctx2.roundRect?ctx2.roundRect(nX,y-NOTE_HEIGHT/2,nW,NOTE_HEIGHT,NOTE_RADIUS):ctx2.rect(nX,y-NOTE_HEIGHT/2,nW,NOTE_HEIGHT);
    ctx2.fill();
    ctx2.shadowBlur=0;
    // Shine
    ctx2.fillStyle='rgba(255,255,255,.2)';
    ctx2.beginPath();
    if(ctx2.roundRect)ctx2.roundRect(nX+2,y-NOTE_HEIGHT/2+2,nW*.6,NOTE_HEIGHT*.4,NOTE_RADIUS*.5);
    else ctx2.rect(nX+2,y-NOTE_HEIGHT/2+2,nW*.6,NOTE_HEIGHT*.4);
    ctx2.fill();
  });
  // Progress bar
  if(trackDuration>0){
    const prog=now/trackDuration;
    ctx2.fillStyle='rgba(100,0,255,.3)';ctx2.fillRect(0,H-57,W,2);
    ctx2.fillStyle='#6600ff';ctx2.fillRect(0,H-57,W*Math.min(1,prog),2);
  }
}

// ─── RESULTS ───
function showResults(){
  const total=hitCount+missCount+notes.filter(n=>!n.hit&&!n.missed).length;
  const acc=total>0?Math.round(hitCount/Math.max(1,total)*100):0;
  let grade,gCol;
  if(acc>=98){grade='SS';gCol='#ffd700';}
  else if(acc>=90){grade='S';gCol='#aa44ff';}
  else if(acc>=80){grade='A';gCol='#00ffcc';}
  else if(acc>=65){grade='B';gCol='#00b4ff';}
  else if(acc>=50){grade='C';gCol='#ff8800';}
  else{grade='F';gCol='#ff0055';}
  const rg=document.getElementById('result-grade');
  rg.textContent=grade;rg.style.color=gCol;
  document.getElementById('result-score').textContent='SCORE: '+score.toLocaleString();
  document.getElementById('result-stats').innerHTML=
    'PERFECT: '+perfectCount+' &nbsp; OK: '+okCount+' &nbsp; MISS: '+missCount+'<br>'+
    'MAX COMBO: '+maxCombo+'x &nbsp; ACCURACY: '+acc+'%';
  document.getElementById('results-overlay').classList.add('show');
}

// ─── DROP ZONE ───
function setupDropZone(){
  const dz=document.getElementById('drop-zone');
  const ga=document.getElementById('game-area');
  ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag-over');}));
  dz.addEventListener('dragleave',()=>dz.classList.remove('drag-over'));
  dz.addEventListener('drop',e=>{e.preventDefault();dz.classList.remove('drag-over');const f=e.dataTransfer.files[0];if(f)loadAudioFile(f);});
  // Also allow drop on game area when track is loaded
  ['dragenter','dragover'].forEach(ev=>ga.addEventListener(ev,e=>e.preventDefault()));
  ga.addEventListener('drop',e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)loadAudioFile(f);});
}

function showDropZone(){
  document.getElementById('drop-zone').classList.remove('hidden');
}

// ─── MODE SWITCH ───
function setMode(m){
  mode=m;isEditing=(m==='edit');
  document.getElementById('mb-play').classList.toggle('active',m==='play');
  document.getElementById('mb-edit').classList.toggle('active',m==='edit');
  const ep=document.getElementById('editor-panel');
  ep.classList.toggle('show',m==='edit');
}

// ─── TOAST ───
function toast2(msg){
  let t=document.getElementById('rf-toast');
  if(!t){t=document.createElement('div');t.id='rf-toast';t.style.cssText='position:fixed;bottom:70px;left:50%;transform:translateX(-50%);background:rgba(30,0,60,.95);border:1px solid rgba(100,0,255,.4);border-radius:20px;padding:6px 18px;font-family:monospace;font-size:10px;color:#aa44ff;z-index:999;pointer-events:none;transition:opacity .3s;white-space:nowrap;';document.body.appendChild(t);}
  t.textContent=msg;t.style.opacity='1';
  clearTimeout(t._to);t._to=setTimeout(()=>t.style.opacity='0',2500);
}
<\/script></body></html>`},
  {id:"gp1_minesweeper",name:"Minesweeper",icon:"\ud83d\udca3",cat:'Games',desc:"Flag all 10 mines on a 9\u00d79 grid. Right-click to flag.",featured:true,screenshots:["\ud83d\udca3", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#board{display:grid;gap:2px;}
.cell{width:28px;height:28px;border-radius:5px;border:1px solid rgba(0,180,255,.18);
  background:rgba(0,50,110,.65);color:#c8e8ff;font-size:12px;font-weight:700;
  cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .1s;}
.cell:hover{background:rgba(0,100,200,.5);}
.cell.open{background:rgba(0,15,50,.5);cursor:default;}
.cell.boom{background:rgba(220,30,30,.45);}
.cell.flagged{background:rgba(255,200,0,.2);}
</style></head><body>
<div class="sc" id="sc">MINESWEEPER</div>
<div id="board"></div>
<div class="info" id="info">Left-click reveal · Right-click flag</div>
<button onclick="newGame()">New Game</button>
<script>

var R=9, C=9, MINES=10;
var board=[], revealed=[], flagged=[], dead=false, won=false;

function adj(i){
  var r=Math.floor(i/C), c=i%C, a=[];
  for(var dr=-1;dr<=1;dr++) for(var dc=-1;dc<=1;dc++){
    if(!dr&&!dc) continue;
    var nr=r+dr, nc=c+dc;
    if(nr>=0&&nr<R&&nc>=0&&nc<C) a.push(nr*C+nc);
  }
  return a;
}

function newGame(){
  dead=false; won=false;
  board=new Array(R*C).fill(0);
  revealed=new Array(R*C).fill(false);
  flagged=new Array(R*C).fill(false);
  // place mines
  var placed=0;
  while(placed<MINES){
    var i=Math.floor(Math.random()*R*C);
    if(board[i]!==-1){board[i]=-1; placed++;}
  }
  // count neighbors
  for(var i=0;i<R*C;i++){
    if(board[i]===-1) continue;
    var cnt=0;
    adj(i).forEach(function(j){if(board[j]===-1) cnt++;});
    board[i]=cnt;
  }
  render();
}

// Iterative BFS flood-fill — no recursion, no stack overflow
function reveal(start){
  if(revealed[start]||flagged[start]) return;
  var queue=[start];
  while(queue.length>0){
    var i=queue.shift();
    if(revealed[i]) continue;
    revealed[i]=true;
    if(board[i]===0){
      adj(i).forEach(function(j){
        if(!revealed[j]&&!flagged[j]) queue.push(j);
      });
    }
  }
}

function click(i){
  if(dead||won||flagged[i]) return;
  if(board[i]===-1){
    dead=true;
    for(var j=0;j<R*C;j++) if(board[j]===-1) revealed[j]=true;
    render(); return;
  }
  reveal(i);
  var openCount=revealed.filter(Boolean).length;
  if(openCount===R*C-MINES){ won=true; }
  render();
}

function flag(i){
  if(dead||won||revealed[i]) return;
  flagged[i]=!flagged[i];
  render();
}

function render(){
  var bd=document.getElementById('board');
  bd.style.gridTemplateColumns='repeat('+C+',28px)';
  bd.innerHTML='';
  var numColors=['','#4af','#4fa','#f44','#44f','#f84','#4ff','#f4f','#aaa'];
  for(var i=0;i<R*C;i++){
    var d=document.createElement('div');
    d.className='cell';
    if(revealed[i]){
      d.classList.add('open');
      if(board[i]===-1) d.classList.add('boom');
      if(board[i]===-1) d.textContent='💣';
      else if(board[i]>0){ d.textContent=board[i]; d.style.color=numColors[board[i]]||'#fff'; }
    } else if(flagged[i]){
      d.classList.add('flagged'); d.textContent='🚩';
    }
    (function(idx){
      d.onclick=function(){click(idx);};
      d.oncontextmenu=function(e){e.preventDefault();flag(idx);};
    })(i);
    bd.appendChild(d);
  }
  var sc=document.getElementById('sc');
  var info=document.getElementById('info');
  var remaining=MINES-flagged.filter(Boolean).length;
  if(won){ sc.textContent='🎉 YOU WIN!'; info.textContent='All mines found!'; }
  else if(dead){ sc.textContent='💥 BOOM!'; info.textContent='Better luck next time'; }
  else { sc.textContent='MINESWEEPER'; info.textContent='Mines left: '+remaining; }
}

newGame();

<\/script></body></html>`},
  {id:"gp1_breakout",name:"Breakout",icon:"\ud83e\uddf1",cat:'Games',desc:"Smash all bricks with the ball. Mouse or arrow keys for the paddle.",featured:true,screenshots:["\ud83e\uddf1", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
canvas{border:1px solid rgba(0,180,255,.3);border-radius:6px;display:block;}
</style></head><body>
<div class="sc" id="sc">SCORE: 0 &nbsp; LIVES: ♥♥♥</div>
<canvas id="cv" width="320" height="240"></canvas>
<div class="info">Mouse or ← → to move paddle</div>
<button id="startBtn" onclick="startGame()">▶ START</button>
<script>

var cv=document.getElementById('cv'), ctx=cv.getContext('2d');
var W=320, H=240, PW=56, PH=8, BALL=6;
var px, py, bx, by, bdx, bdy, score, lives, bricks, running, animId;
var COLS=['#00b4ff','#00ffcc','#ff2d9e','#ffd700','#a855f7','#ff6644'];
var keys={};

function mkBricks(){
  bricks=[];
  for(var r=0;r<5;r++) for(var c=0;c<8;c++){
    bricks.push({x:4+c*39,y:26+r*17,w:35,h:13,alive:true,col:COLS[r%COLS.length]});
  }
}

function startGame(){
  document.getElementById('startBtn').textContent='↺ RESTART';
  cancelAnimationFrame(animId);
  px=W/2-PW/2; py=H-18;
  bx=W/2; by=H-30;
  bdx=2.8; bdy=-2.8;
  score=0; lives=3;
  mkBricks(); running=true;
  loop();
}

function draw(){
  ctx.fillStyle='#010812'; ctx.fillRect(0,0,W,H);
  // bricks
  bricks.forEach(function(b){
    if(!b.alive) return;
    ctx.fillStyle=b.col;
    ctx.beginPath();
    if(ctx.roundRect) ctx.roundRect(b.x,b.y,b.w,b.h,3);
    else ctx.rect(b.x,b.y,b.w,b.h);
    ctx.fill();
  });
  // paddle
  ctx.fillStyle='rgba(0,180,255,.85)';
  ctx.beginPath();
  if(ctx.roundRect) ctx.roundRect(px,py,PW,PH,4);
  else ctx.rect(px,py,PW,PH);
  ctx.fill();
  // ball
  ctx.beginPath(); ctx.arc(bx,by,BALL,0,Math.PI*2);
  ctx.fillStyle='#ffffff'; ctx.fill();
  // HUD
  document.getElementById('sc').textContent=
    'SCORE: '+score+'   LIVES: '+('♥').repeat(lives)+('♡').repeat(3-lives);
}

function update(){
  // keyboard paddle
  if(keys['ArrowLeft']) px=Math.max(0,px-14);
  if(keys['ArrowRight']) px=Math.min(W-PW,px+14);

  bx+=bdx; by+=bdy;
  // walls
  if(bx-BALL<=0||bx+BALL>=W) bdx=-bdx;
  if(by-BALL<=0) bdy=-bdy;
  // paddle
  if(by+BALL>=py && by+BALL<=py+PH+4 && bx>=px-BALL && bx<=px+PW+BALL){
    bdy=-Math.abs(bdy);
    var hit=(bx-(px+PW/2))/(PW/2);
    bdx=hit*3.5;
    by=py-BALL-1;
  }
  // bottom — lose life
  if(by-BALL>H){
    lives--;
    if(lives<=0){ running=false; document.getElementById('sc').textContent='GAME OVER! Final: '+score; return; }
    bx=W/2; by=H-60; bdx=2.8; bdy=-2.8;
  }
  // bricks
  var allDead=true;
  bricks.forEach(function(b){
    if(!b.alive){ return; }
    allDead=false;
    if(bx+BALL>b.x && bx-BALL<b.x+b.w && by+BALL>b.y && by-BALL<b.y+b.h){
      b.alive=false; score+=10;
      // determine bounce axis
      var overlapL=bx+BALL-b.x, overlapR=b.x+b.w-bx+BALL;
      var overlapT=by+BALL-b.y, overlapB=b.y+b.h-by+BALL;
      var minX=Math.min(overlapL,overlapR), minY=Math.min(overlapT,overlapB);
      if(minY<minX) bdy=-bdy; else bdx=-bdx;
    }
  });
  if(allDead){ running=false; document.getElementById('sc').textContent='🎉 YOU WIN! Score: '+score; }
}

function loop(){
  animId=requestAnimationFrame(loop);
  if(!running){ draw(); return; }
  update(); draw();
}

document.addEventListener('mousemove',function(e){
  var r=cv.getBoundingClientRect();
  px=Math.max(0,Math.min(W-PW,(e.clientX-r.left)-PW/2));
});
document.addEventListener('keydown',function(e){ keys[e.key]=true; if(e.key==='ArrowLeft'||e.key==='ArrowRight') e.preventDefault(); });
document.addEventListener('keyup',function(e){ keys[e.key]=false; });

// draw idle screen
ctx.fillStyle='#010812'; ctx.fillRect(0,0,W,H);
ctx.fillStyle='rgba(0,180,255,.3)'; ctx.font='14px Orbitron,monospace';
ctx.textAlign='center'; ctx.fillText('Press START to play',W/2,H/2);

<\/script></body></html>`},
  {id:"gp1_memory",name:"Memory Match",icon:"\ud83c\udccf",cat:'Games',desc:"Flip cards and find all 8 matching pairs with the fewest moves.",featured:false,screenshots:["\ud83c\udccf", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#grid{display:grid;grid-template-columns:repeat(4,64px);gap:8px;}
.card{width:64px;height:64px;border-radius:12px;background:rgba(0,30,80,.85);
  border:1.5px solid rgba(0,180,255,.25);font-size:28px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:transform .18s,background .18s;}
.card:hover{background:rgba(0,60,140,.6);}
.card.flipped,.card.matched{background:rgba(0,60,150,.65);border-color:#00b4ff;transform:scale(1.06);}
.card.matched{background:rgba(0,100,60,.6);border-color:#00ffcc;cursor:default;transform:scale(1);}
</style></head><body>
<div class="sc" id="sc">PAIRS: 0 / 8</div>
<div id="grid"></div>
<div class="info" id="info">Find all matching pairs</div>
<button onclick="newGame()">New Game</button>
<script>

var EMOJIS=['🚀','💎','🔥','⚡','🌊','🎯','🦊','🎮'];
var cards=[], flipped=[], matched=[], locked=false, moves=0;

function newGame(){
  flipped=[]; matched=[]; locked=false; moves=0;
  var deck=EMOJIS.concat(EMOJIS);
  // Fisher-Yates shuffle
  for(var i=deck.length-1;i>0;i--){
    var j=Math.floor(Math.random()*(i+1));
    var tmp=deck[i]; deck[i]=deck[j]; deck[j]=tmp;
  }
  cards=deck;
  render();
  document.getElementById('sc').textContent='PAIRS: 0 / 8';
  document.getElementById('info').textContent='Find all matching pairs';
}

function render(){
  var g=document.getElementById('grid'); g.innerHTML='';
  cards.forEach(function(emoji,i){
    var d=document.createElement('div');
    d.className='card';
    if(flipped.indexOf(i)>=0) d.classList.add('flipped');
    if(matched.indexOf(i)>=0) d.classList.add('matched');
    if(flipped.indexOf(i)>=0||matched.indexOf(i)>=0) d.textContent=emoji;
    else d.textContent='';
    (function(idx){ d.onclick=function(){ flip(idx); }; })(i);
    g.appendChild(d);
  });
}

function flip(i){
  if(locked) return;
  if(flipped.indexOf(i)>=0) return;
  if(matched.indexOf(i)>=0) return;
  if(flipped.length>=2) return;

  flipped.push(i);
  render();

  if(flipped.length===2){
    moves++;
    locked=true;
    var a=flipped[0], b=flipped[1];
    if(cards[a]===cards[b]){
      // match!
      matched.push(a); matched.push(b);
      flipped=[];
      locked=false;
      var pairs=matched.length/2;
      document.getElementById('sc').textContent='PAIRS: '+pairs+' / 8';
      if(matched.length===16){
        document.getElementById('info').textContent='🎉 All pairs found in '+moves+' moves!';
      }
      render();
    } else {
      setTimeout(function(){
        flipped=[];
        locked=false;
        render();
      },900);
    }
  }
}

newGame();

<\/script></body></html>`},
  {id:"gp1_whackamole",name:"Whack-a-Mole",icon:"\ud83d\udd28",cat:'Games',desc:"Hit moles for +1, avoid bombs (\u20135). 30-second timed frenzy!",featured:false,screenshots:["\ud83d\udd28", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:240px;}
.hole{width:72px;height:72px;border-radius:50%;background:rgba(0,20,50,.85);
  border:2px solid rgba(0,180,255,.2);font-size:32px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .12s;user-select:none;}
.hole:active{transform:scale(.9);}
.hole.up{background:rgba(0,70,180,.6);border-color:#00b4ff;transform:scale(1.05);}
.hole.bomb{background:rgba(200,30,30,.5);border-color:#ff4444;}
.info{color:#ffd700;}
</style></head><body>
<div class="sc" id="sc">WHACK-A-MOLE</div>
<div class="info" id="info">Press Start!</div>
<div id="grid"></div>
<button id="startBtn" onclick="startGame()">▶ START</button>
<script>

var score=0, timeLeft=30, running=false, moleTimers=[], tickTimer;
var moleUp=new Array(9).fill(false);
var moleType=new Array(9).fill(0); // 0=mole,1=bomb

function buildGrid(){
  var g=document.getElementById('grid'); g.innerHTML='';
  for(var i=0;i<9;i++){
    var h=document.createElement('div');
    h.className='hole'; h.id='hole'+i;
    h.textContent='🕳️';
    (function(idx){
      h.onclick=function(){ whack(idx); };
    })(i);
    g.appendChild(h);
  }
}

function whack(i){
  if(!running||!moleUp[i]) return;
  if(moleType[i]===1){
    // bomb!
    score=Math.max(0,score-5);
    document.getElementById('sc').textContent='SCORE: '+score+'  (-5!)';
  } else {
    score++;
    document.getElementById('sc').textContent='SCORE: '+score;
  }
  moleUp[i]=false;
  clearTimeout(moleTimers[i]);
  var h=document.getElementById('hole'+i);
  if(h){ h.className='hole'; h.textContent='🕳️'; }
}

function popMole(){
  var free=[];
  for(var i=0;i<9;i++) if(!moleUp[i]) free.push(i);
  if(!free.length||!running) return;
  var idx=free[Math.floor(Math.random()*free.length)];
  var isBomb=Math.random()<0.2;
  moleUp[idx]=true; moleType[idx]=isBomb?1:0;
  var h=document.getElementById('hole'+idx);
  if(h){
    h.className='hole up'+(isBomb?' bomb':'');
    h.textContent=isBomb?'💣':'(^‿^)';
  }
  var delay=600+Math.random()*700;
  moleTimers[idx]=setTimeout(function(){
    moleUp[idx]=false;
    var el=document.getElementById('hole'+idx);
    if(el){ el.className='hole'; el.textContent='🕳️'; }
  }, delay);
}

function startGame(){
  buildGrid();
  score=0; timeLeft=30; running=true;
  moleTimers.forEach(clearTimeout); moleTimers=new Array(9).fill(null);
  moleUp=new Array(9).fill(false);
  document.getElementById('startBtn').textContent='↺ RESTART';
  document.getElementById('sc').textContent='SCORE: 0';

  clearInterval(tickTimer);
  tickTimer=setInterval(function(){
    if(!running) return;
    timeLeft--;
    document.getElementById('info').textContent='Time: '+timeLeft+'s';
    if(timeLeft<=0){
      running=false;
      clearInterval(tickTimer);
      moleTimers.forEach(clearTimeout);
      document.getElementById('sc').textContent='DONE! Score: '+score;
      document.getElementById('info').textContent='Game over!';
    }
  },1000);

  var popInt=setInterval(function(){
    if(!running){ clearInterval(popInt); return; }
    popMole();
  },520);
}

buildGrid();

<\/script></body></html>`},
  {id:"gp1_simon",name:"Simon Says",icon:"\ud83d\udd35",cat:'Games',desc:"Watch the colour sequence and repeat it. How many levels can you reach?",featured:true,screenshots:["\ud83d\udd35", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#pads{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:200px;}
.pad{width:90px;height:90px;border-radius:16px;cursor:pointer;
  border:2px solid rgba(255,255,255,.15);transition:opacity .1s,transform .1s;opacity:.55;}
.pad:hover{opacity:.7;}
.pad.lit{opacity:1;transform:scale(1.07);filter:brightness(1.7);}
</style></head><body>
<div class="sc" id="sc">SIMON SAYS</div>
<div id="pads">
  <div class="pad" id="p0" style="background:#cc2222"></div>
  <div class="pad" id="p1" style="background:#2244cc"></div>
  <div class="pad" id="p2" style="background:#22aa22"></div>
  <div class="pad" id="p3" style="background:#ccaa00"></div>
</div>
<div class="info" id="info">Press Start to play</div>
<button id="startBtn" onclick="startGame()">▶ START</button>
<script>

var seq=[], playerSeq=[], level=0, accepting=false, ac;
var FREQS=[261,329,392,523];
var NAMES=['Red','Blue','Green','Yellow'];

function beep(idx){
  try{
    if(!ac) ac=new (window.AudioContext||window.webkitAudioContext)();
    var o=ac.createOscillator(), g=ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type='sine'; o.frequency.value=FREQS[idx];
    g.gain.setValueAtTime(0.22,ac.currentTime);
    g.gain.linearRampToValueAtTime(0,ac.currentTime+0.25);
    o.start(); o.stop(ac.currentTime+0.28);
  }catch(e){}
}

function light(idx,on){
  var p=document.getElementById('p'+idx);
  if(on) p.classList.add('lit'); else p.classList.remove('lit');
}

function playSeq(seq,onDone){
  accepting=false;
  var i=0;
  function step(){
    if(i>=seq.length){ setTimeout(function(){ accepting=true; if(onDone) onDone(); },300); return; }
    var idx=seq[i++];
    light(idx,true); beep(idx);
    setTimeout(function(){ light(idx,false); setTimeout(step,250); }, 420);
  }
  setTimeout(step,600);
}

function startGame(){
  seq=[]; level=0; playerSeq=[];
  document.getElementById('startBtn').textContent='↺ RESTART';
  nextRound();
}

function nextRound(){
  level++;
  seq.push(Math.floor(Math.random()*4));
  playerSeq=[];
  document.getElementById('sc').textContent='LEVEL: '+level;
  document.getElementById('info').textContent='Watch the pattern...';
  playSeq(seq,function(){
    document.getElementById('info').textContent='Your turn! ('+seq.length+' steps)';
  });
}

function guess(idx){
  if(!accepting) return;
  light(idx,true); beep(idx);
  setTimeout(function(){ light(idx,false); },200);
  playerSeq.push(idx);
  var pos=playerSeq.length-1;
  if(playerSeq[pos]!==seq[pos]){
    // wrong
    accepting=false;
    document.getElementById('sc').textContent='WRONG! Level '+(level-1);
    document.getElementById('info').textContent='Press Start to try again';
    return;
  }
  if(playerSeq.length===seq.length){
    accepting=false;
    document.getElementById('info').textContent='Correct! ⭐';
    setTimeout(nextRound,800);
  }
}

// Wire buttons
for(var _i=0;_i<4;_i++){
  (function(idx){
    document.getElementById('p'+idx).onclick=function(){ guess(idx); };
  })(_i);
}

<\/script></body></html>`},
  {id:"gp1_reaction",name:"Reaction Test",icon:"\u26a1",cat:'Games',desc:"Click the moment it turns green. Track your best and average reaction time.",featured:false,screenshots:["\u26a1", "\ud83c\udfae", "\ud83c\udfc6"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#box{width:280px;height:150px;border-radius:16px;display:flex;align-items:center;
  justify-content:center;cursor:pointer;font-size:15px;font-weight:700;
  letter-spacing:1px;transition:background .2s,color .2s;user-select:none;
  border:2px solid rgba(0,180,255,.25);}
#hist{font-family:monospace;font-size:10px;color:rgba(0,180,255,.4);text-align:center;min-height:38px;}
</style></head><body>
<div class="sc" id="sc">REACTION TEST</div>
<div id="box" onclick="boxClick()">Click to start</div>
<div id="hist"></div>
<script>

var state='idle', startTime=0, waitTimer, times=[];

function setBox(bg,col,txt){
  var b=document.getElementById('box');
  b.style.background=bg; b.style.color=col; b.textContent=txt;
}

function boxClick(){
  if(state==='idle'||state==='result'){
    state='waiting';
    setBox('rgba(160,20,20,.4)','rgba(255,120,120,.8)','Wait for green...');
    clearTimeout(waitTimer);
    waitTimer=setTimeout(function(){
      state='go';
      startTime=Date.now();
      setBox('rgba(0,160,50,.6)','#00ff88','CLICK NOW!');
    },1200+Math.random()*2500);

  } else if(state==='waiting'){
    clearTimeout(waitTimer);
    state='idle';
    setBox('rgba(0,40,100,.5)','rgba(255,180,0,.8)','Too early! Click to retry');

  } else if(state==='go'){
    var ms=Date.now()-startTime;
    times.push(ms);
    if(times.length>6) times.shift();
    var best=Math.min.apply(null,times);
    var avg=Math.round(times.reduce(function(a,b){return a+b;},0)/times.length);
    state='result';
    setBox('rgba(0,50,120,.5)','#00b4ff',ms+' ms');
    document.getElementById('sc').textContent='BEST: '+best+'ms  AVG: '+avg+'ms';
    document.getElementById('hist').textContent='History: '+times.join('ms, ')+'ms';
  }
}

setBox('rgba(0,40,100,.5)','rgba(0,180,255,.6)','Click to start');

<\/script></body></html>`},
  {id:"gp1_2048",name:"2048",icon:"\ud83d\udd22",cat:'Games',desc:"Slide tiles to combine and reach 2048! Arrow keys or swipe.",featured:true,screenshots:["\ud83d\udd22", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#board{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;
  width:268px;background:rgba(0,8,28,.9);padding:9px;border-radius:12px;
  border:1px solid rgba(0,180,255,.2);}
.tile{width:58px;height:58px;border-radius:9px;display:flex;align-items:center;
  justify-content:center;font-size:16px;font-weight:900;font-family:monospace;transition:all .1s;}
</style></head><body>
<div class="sc" id="sc">SCORE: 0</div>
<div id="board"></div>
<div class="info" id="info">Arrow keys or swipe to slide</div>
<button onclick="init2048()">New Game</button>
<script>

var grid=new Array(16).fill(0), score2=0;
var BG={
  0:'rgba(0,12,38,.6)',
  2:'rgba(0,60,130,.7)',4:'rgba(0,80,160,.7)',8:'rgba(0,110,180,.7)',
  16:'rgba(0,150,190,.7)',32:'rgba(0,170,160,.7)',64:'rgba(0,190,110,.7)',
  128:'rgba(80,190,40,.7)',256:'rgba(180,170,0,.7)',512:'rgba(210,120,0,.7)',
  1024:'rgba(210,50,50,.7)',2048:'rgba(180,0,200,.7)'
};

function addTile(){
  var empty=[];
  for(var i=0;i<16;i++) if(grid[i]===0) empty.push(i);
  if(!empty.length) return;
  var pos=empty[Math.floor(Math.random()*empty.length)];
  grid[pos]=Math.random()<0.9?2:4;
}

function init2048(){
  grid=new Array(16).fill(0); score2=0;
  addTile(); addTile(); render2048();
}

function slide(row){
  var filtered=row.filter(function(v){return v!==0;});
  var merged=[];
  for(var i=0;i<filtered.length;i++){
    if(i+1<filtered.length && filtered[i]===filtered[i+1]){
      var val=filtered[i]*2; merged.push(val); score2+=val; i++;
    } else { merged.push(filtered[i]); }
  }
  while(merged.length<4) merged.push(0);
  return merged;
}

function move(dir){
  var prev=grid.slice();
  if(dir==='left'||dir==='right'){
    for(var r=0;r<4;r++){
      var row=grid.slice(r*4,r*4+4);
      if(dir==='right') row.reverse();
      var n=slide(row);
      if(dir==='right') n.reverse();
      for(var c=0;c<4;c++) grid[r*4+c]=n[c];
    }
  } else {
    for(var c2=0;c2<4;c2++){
      var col=[grid[c2],grid[4+c2],grid[8+c2],grid[12+c2]];
      if(dir==='down') col.reverse();
      var n2=slide(col);
      if(dir==='down') n2.reverse();
      for(var r2=0;r2<4;r2++) grid[r2*4+c2]=n2[r2];
    }
  }
  // check if changed
  var changed=false;
  for(var i=0;i<16;i++) if(grid[i]!==prev[i]){ changed=true; break; }
  if(changed) addTile();
  render2048();
}

function render2048(){
  var b=document.getElementById('board'); b.innerHTML='';
  var max=0;
  grid.forEach(function(v){
    var d=document.createElement('div'); d.className='tile';
    d.textContent=v||''; if(v>max) max=v;
    var bg=BG[Math.min(v,2048)]||BG[2048];
    d.style.background=bg;
    d.style.color=v>=8?'#fff':'rgba(200,220,255,.7)';
    d.style.fontSize=v>=1000?'13px':v>=100?'15px':'17px';
    b.appendChild(d);
  });
  document.getElementById('sc').textContent='SCORE: '+score2;
  if(max>=2048) document.getElementById('info').textContent='🎉 YOU REACHED 2048!';
}

document.addEventListener('keydown',function(e){
  var map={'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'up','ArrowDown':'down'};
  if(map[e.key]){ e.preventDefault(); move(map[e.key]); }
});
var tx2,ty2;
document.addEventListener('touchstart',function(e){tx2=e.touches[0].clientX;ty2=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',function(e){
  var dx=e.changedTouches[0].clientX-tx2, dy=e.changedTouches[0].clientY-ty2;
  if(Math.abs(dx)>Math.abs(dy)) move(dx>0?'right':'left'); else move(dy>0?'down':'up');
},{passive:true});

init2048();

<\/script></body></html>`},
  {id:"gp1_wordscramble",name:"Word Scramble",icon:"\ud83d\udcdd",cat:'Games',desc:"Unscramble tech words before time runs out! More time = more points.",featured:false,screenshots:["\ud83d\udcdd", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#scrambled{font-size:30px;font-weight:900;font-family:monospace;color:#00b4ff;
  letter-spacing:10px;text-transform:uppercase;min-height:44px;text-align:center;}
#hint{font-size:10px;color:rgba(0,180,255,.4);letter-spacing:2px;}
input{background:rgba(0,15,40,.85);border:1px solid rgba(0,180,255,.3);border-radius:8px;
  padding:9px 14px;color:#c8e8ff;font-size:16px;letter-spacing:3px;outline:none;
  text-align:center;width:200px;font-family:monospace;text-transform:uppercase;}
input:focus{border-color:#00b4ff;}
#fb{font-size:12px;min-height:18px;font-weight:700;color:#00ffcc;}
.tm{color:#ffd700;font-size:13px;font-family:monospace;letter-spacing:2px;}
</style></head><body>
<div class="sc" id="sc">SCORE: 0</div>
<div class="tm" id="tm">20s</div>
<div id="scrambled">------</div>
<div id="hint"></div>
<input id="inp" placeholder="type answer..." autocomplete="off">
<div id="fb"></div>
<button onclick="nextWord()">Skip →</button>
<script>

var WORDS=[
  ['python','language'],['binary','code'],['matrix','array'],
  ['kernel','core'],['module','package'],['syntax','grammar'],
  ['cursor','pointer'],['packet','data'],['buffer','memory'],
  ['canvas','drawing'],['shader','graphics'],['socket','network'],
  ['thread','process'],['vector','math'],['signal','event'],
  ['parser','reading'],['router','network'],['branch','git'],
  ['render','display'],['filter','search']
];
var score=0, timeLeft=20, answer='', tickInt, answered=false;

function scramble(word){
  var arr=word.split(''), out;
  var tries=0;
  do {
    for(var i=arr.length-1;i>0;i--){
      var j=Math.floor(Math.random()*(i+1));
      var tmp=arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    out=arr.join(''); tries++;
  } while(out===word && tries<20);
  return out;
}

function nextWord(){
  clearInterval(tickInt);
  answered=false;
  timeLeft=20;
  var pair=WORDS[Math.floor(Math.random()*WORDS.length)];
  answer=pair[0];
  document.getElementById('scrambled').textContent=scramble(answer).toUpperCase();
  document.getElementById('hint').textContent='HINT: '+pair[1];
  document.getElementById('inp').value='';
  document.getElementById('fb').textContent='';
  document.getElementById('fb').style.color='#00ffcc';
  updateTimer();
  tickInt=setInterval(function(){
    timeLeft--;
    updateTimer();
    if(timeLeft<=0){
      clearInterval(tickInt);
      if(!answered){
        document.getElementById('fb').textContent='Time! Answer: '+answer.toUpperCase();
        document.getElementById('fb').style.color='#ff5544';
        setTimeout(nextWord,1500);
      }
    }
  },1000);
}

function updateTimer(){
  document.getElementById('tm').textContent=timeLeft+'s';
  document.getElementById('tm').style.color=timeLeft<=5?'#ff4444':'#ffd700';
}

function checkAnswer(){
  var val=document.getElementById('inp').value.trim().toLowerCase();
  if(!val) return;
  if(val===answer){
    answered=true;
    clearInterval(tickInt);
    score+=timeLeft;
    document.getElementById('sc').textContent='SCORE: '+score;
    document.getElementById('fb').textContent='CORRECT! +'+timeLeft+' pts';
    document.getElementById('fb').style.color='#00ffcc';
    setTimeout(nextWord,800);
  } else {
    document.getElementById('fb').textContent='Wrong, try again...';
    document.getElementById('fb').style.color='#ff8844';
  }
}

document.getElementById('inp').addEventListener('keydown',function(e){
  if(e.key==='Enter') checkAnswer();
});

nextWord();

<\/script></body></html>`},
  {id:"gp1_asteroids",name:"Asteroids",icon:"\ud83d\ude80",cat:'Games',desc:"Shoot asteroids with \u2190\u2192\u2191 and Space. Enter to start. 3 lives.",featured:true,screenshots:["\ud83d\ude80", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
canvas{border:1px solid rgba(0,180,255,.2);border-radius:8px;display:block;}
#controls{font-size:9px;color:rgba(0,180,255,.35);font-family:monospace;letter-spacing:1px;}
</style></head><body>
<div class="sc" id="sc">SCORE: 0 &nbsp; LIVES: ♥♥♥</div>
<canvas id="cv" width="310" height="230"></canvas>
<div id="controls">←→ rotate · ↑ thrust · Space shoot · Enter start</div>
<script>

var cv=document.getElementById('cv'), ctx=cv.getContext('2d');
var W=310, H=230;
var ship, bullets, asteroids2, score3, lives2, keys3={}, gameRunning=false, animId2;

function initGame(){
  ship={x:W/2,y:H/2,a:-Math.PI/2,vx:0,vy:0,alive:true,iframes:0};
  bullets=[]; asteroids2=[];
  score3=0; lives2=3;
  spawnAsteroids(4,0);
  gameRunning=true;
  if(!animId2) gameLoop();
}

function rndPts(r){
  var pts=[];
  for(var i=0;i<9;i++){
    var a=i/9*Math.PI*2, rad=r*0.6+Math.random()*r*0.4;
    pts.push({x:Math.cos(a)*rad, y:Math.sin(a)*rad});
  }
  return pts;
}

function spawnAsteroids(n, minR){
  for(var i=0;i<n;i++){
    var r=minR+(20+Math.random()*16);
    var x,y,tries=0;
    do{
      x=Math.random()*W; y=Math.random()*H; tries++;
    }while(tries<30 && Math.hypot(x-ship.x,y-ship.y)<80);
    var a=Math.random()*Math.PI*2;
    var sp=0.6+Math.random()*0.8;
    asteroids2.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:r,pts:rndPts(r)});
  }
}

function shoot(){
  if(!gameRunning||!ship.alive) return;
  bullets.push({
    x:ship.x+Math.cos(ship.a)*16,
    y:ship.y+Math.sin(ship.a)*16,
    vx:Math.cos(ship.a)*9+ship.vx,
    vy:Math.sin(ship.a)*9+ship.vy,
    life:48
  });
}

function wrap(obj){
  if(obj.x<0) obj.x+=W; if(obj.x>W) obj.x-=W;
  if(obj.y<0) obj.y+=H; if(obj.y>H) obj.y-=H;
}

function update3(){if(!ship)return;
  if(!gameRunning||!ship.alive) return;
  if(keys3['ArrowLeft']) ship.a-=0.065;
  if(keys3['ArrowRight']) ship.a+=0.065;
  if(keys3['ArrowUp']||keys3['w']){
    ship.vx+=Math.cos(ship.a)*0.22;
    ship.vy+=Math.sin(ship.a)*0.22;
  }
  ship.vx*=0.98; ship.vy*=0.98;
  ship.x+=ship.vx; ship.y+=ship.vy; wrap(ship);
  if(ship.iframes>0) ship.iframes--;

  bullets=bullets.filter(function(b){ b.x+=b.vx; b.y+=b.vy; wrap(b); return --b.life>0; });

  var newAsts=[];
  for(var ai=0;ai<asteroids2.length;ai++){
    var ast=asteroids2[ai];
    ast.x+=ast.vx; ast.y+=ast.vy; wrap(ast);
    var hit=false;
    for(var bi=bullets.length-1;bi>=0;bi--){
      if(Math.hypot(bullets[bi].x-ast.x,bullets[bi].y-ast.y)<ast.r){
        bullets.splice(bi,1); hit=true; score3+=10; break;
      }
    }
    if(hit){
      if(ast.r>14){ // split
        for(var s=0;s<2;s++){
          var a2=Math.random()*Math.PI*2;
          var sp2=0.8+Math.random();
          newAsts.push({x:ast.x,y:ast.y,vx:Math.cos(a2)*sp2,vy:Math.sin(a2)*sp2,r:ast.r*0.55,pts:rndPts(ast.r*0.55)});
        }
      }
    } else {
      newAsts.push(ast);
      // ship collision
      if(ship.iframes===0 && Math.hypot(ship.x-ast.x,ship.y-ast.y)<ast.r-4){
        lives2--;
        ship.iframes=80;
        if(lives2<=0){ ship.alive=false; gameRunning=false; }
      }
    }
  }
  asteroids2=newAsts;
  if(asteroids2.length===0) spawnAsteroids(4+Math.floor(score3/80),0);
  document.getElementById('sc').textContent='SCORE: '+score3+'   LIVES: '+('♥').repeat(lives2)+('♡').repeat(3-lives2);
}

function draw3(){
  ctx.fillStyle='#010812'; ctx.fillRect(0,0,W,H);
  // stars
  ctx.fillStyle='rgba(200,220,255,.25)';
  for(var i=0;i<40;i++){
    var sx=(i*73)%W, sy=(i*97)%H;
    ctx.fillRect(sx,sy,1,1);
  }
  if(!ship){
    ctx.fillStyle='rgba(0,180,255,.5)'; ctx.font='12px monospace'; ctx.textAlign='center';
    ctx.fillText('ASTEROIDS - Press Enter to start',W/2,H/2);
    return;
  }
  // ship
  if(ship.alive&&(ship.iframes===0||Math.floor(ship.iframes/6)%2===0)){
    ctx.save(); ctx.translate(ship.x,ship.y); ctx.rotate(ship.a);
    ctx.strokeStyle='#00b4ff'; ctx.lineWidth=1.8; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(13,0); ctx.lineTo(-8,7); ctx.lineTo(-5,0); ctx.lineTo(-8,-7); ctx.closePath();
    ctx.stroke();
    if(keys3['ArrowUp']||keys3['w']){
      ctx.strokeStyle='rgba(255,140,0,.8)';
      ctx.beginPath(); ctx.moveTo(-5,0); ctx.lineTo(-14,0); ctx.stroke();
    }
    ctx.restore();
  }
  // bullets
  bullets.forEach(function(b){
    ctx.beginPath(); ctx.arc(b.x,b.y,2.5,0,Math.PI*2);
    ctx.fillStyle='#fff'; ctx.fill();
  });
  // asteroids
  asteroids2.forEach(function(a){
    ctx.save(); ctx.translate(a.x,a.y);
    ctx.strokeStyle='rgba(100,180,255,.7)'; ctx.lineWidth=1.4;
    ctx.beginPath();
    a.pts.forEach(function(p,i){ i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y); });
    ctx.closePath(); ctx.stroke();
    ctx.restore();
  });
  if(!ship.alive){
    ctx.fillStyle='rgba(0,180,255,.8)'; ctx.font='bold 14px monospace'; ctx.textAlign='center';
    ctx.fillText('GAME OVER — Score: '+score3,W/2,H/2-10);
    ctx.font='10px monospace'; ctx.fillStyle='rgba(0,180,255,.4)';
    ctx.fillText('Press Enter to restart',W/2,H/2+14);
  } else if(!gameRunning){
    ctx.fillStyle='rgba(0,180,255,.6)'; ctx.font='12px monospace'; ctx.textAlign='center';
    ctx.fillText('Press Enter to start',W/2,H/2);
  }
}

function gameLoop(){
  animId2=requestAnimationFrame(gameLoop);
  update3(); draw3();
}

document.addEventListener('keydown',function(e){
  keys3[e.key]=true;
  if(e.key===' '){ e.preventDefault(); shoot(); }
  if(e.key==='Enter'){ initGame(); }
});
document.addEventListener('keyup',function(e){ keys3[e.key]=false; });

// idle draw
draw3();

<\/script></body></html>`},
  {id:'as_storybook',name:'Interactive Storybook',icon:'📖',cat:'Games',desc:'Branching dialogue adventure with chapter choices and collectible endings.',screenshots:['📖','💬','✨'],featured:true,htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#0a0f1e;color:#d7ecff;font-family:Rajdhani,sans-serif;height:100vh;display:flex;flex-direction:column;}#top{padding:10px 14px;border-bottom:1px solid rgba(0,180,255,.22);display:flex;justify-content:space-between;align-items:center;background:rgba(1,8,24,.86);}#title{font-family:Orbitron,monospace;font-size:11px;color:#8ad6ff;letter-spacing:2px;}#meta{font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(140,220,255,.65);}#story{flex:1;padding:14px;overflow:auto;line-height:1.7;}#line{font-size:14px;color:#d7ecff;margin-bottom:12px;min-height:62px;}#speaker{font-family:Orbitron,monospace;font-size:10px;color:#8ad6ff;letter-spacing:2px;margin-bottom:8px;}#choices{display:grid;gap:8px;}button{padding:10px;border-radius:10px;border:1px solid rgba(0,180,255,.25);background:rgba(0,30,70,.55);color:#d7ecff;font-size:12px;cursor:pointer;text-align:left;}button:hover{background:rgba(0,60,115,.7);border-color:rgba(0,180,255,.5);}#foot{padding:8px 14px;border-top:1px solid rgba(0,180,255,.16);font-size:10px;color:rgba(190,230,255,.6);font-family:'Share Tech Mono',monospace;display:flex;justify-content:space-between;}.tag{color:#00ffcc;}</style></head><body><div id="top"><div id="title">◈ INTERACTIVE STORYBOOK</div><div id="meta">Chapter <span id="chp">1</span> · Bond <span id="bond">0</span></div></div><div id="story"><div id="speaker">NARRATOR</div><div id="line"></div><div id="choices"></div></div><div id="foot"><span>new routes unlock from choices</span><span class="tag" id="ending">ENDING: --</span></div><script>(function(){var K='storybook_v1';var st={node:'start',bond:0,chapter:1,ending:'--'};try{var d=JSON.parse(localStorage.getItem(K)||'null');if(d)st=d;}catch(e){}var N={start:{s:'NARRATOR',t:'A new update drops. Who leads the first mission?',c:[['Follow Marinette in the city','marinette'],['Train with Isagi','isagi'],['Inspect the terminal portal','terminal']]},marinette:{s:'MARINETTE',t:'Hope and strategy win together. The city trusts your next call.',b:2,c:[['Protect civilians first','safe'],['Rush the objective','rush']]},isagi:{s:'ISAGI',t:'Read the field. Move before everyone else sees the lane.',b:2,c:[['Team play route','safe'],['Solo striker route','rush']]},terminal:{s:'NEOSHELL',t:'sudo apt install minecraft accepted. A voxel gate opens.',b:1,c:[['Open crossover finale','finale']]},safe:{s:'NARRATOR',t:'The team bond grows and allies gather.',b:1,c:[['Go to chapter 2','ch2']]},rush:{s:'NARRATOR',t:'Fast progress, but trust slips.',b:-1,c:[['Go to chapter 2','ch2']]},ch2:{s:'NARRATOR',t:'A pirate signal and a monster capsule appear at once.',chapter:2,c:[['Protect capsule','capsule'],['Chase pirate signal','pirate']]},capsule:{s:'ALLY',t:'A partner creature joins the squad.',b:2,c:[['Enter finale','finale']]},pirate:{s:'ALLY',t:'The squad gains hidden gear and maps.',b:1,c:[['Enter finale','finale']]},finale:{s:'NARRATOR',t:'Final choice: what ending should the team write?',chapter:3,c:[['UNITED GRID ending','end_team'],['SHADOW MVP ending','end_solo'],['CODEX ECHO ending','end_echo']]},end_team:{s:'SYSTEM',t:'Ending unlocked: UNITED GRID.',end:'UNITED GRID',c:[['Restart story','start']]},end_solo:{s:'SYSTEM',t:'Ending unlocked: SHADOW MVP.',end:'SHADOW MVP',c:[['Restart story','start']]},end_echo:{s:'SYSTEM',t:'Ending unlocked: CODEX ECHO.',end:'CODEX ECHO',c:[['Restart story','start']]}};var sp=document.getElementById('speaker'),ln=document.getElementById('line'),ch=document.getElementById('choices');function save(){localStorage.setItem(K,JSON.stringify(st));}function go(id){var n=N[id];if(!n)return;st.node=id;if(typeof n.b==='number')st.bond=Math.max(-5,Math.min(15,st.bond+n.b));if(n.chapter)st.chapter=n.chapter;if(n.end)st.ending=n.end;sp.textContent=n.s;ln.textContent=n.t;document.getElementById('bond').textContent=st.bond;document.getElementById('chp').textContent=st.chapter;document.getElementById('ending').textContent='ENDING: '+st.ending;ch.innerHTML='';n.c.forEach(function(c){var b=document.createElement('button');b.textContent='• '+c[0];b.onclick=function(){if(c[1]==='start')st={node:'start',bond:0,chapter:1,ending:'--'};go(c[1]);save();};ch.appendChild(b);});save();}go(st.node||'start');})();<\/script></body></html>`},
  {id:'as_pocketfarmer',name:'Pocket Farmer',icon:'🌾',cat:'Games',desc:'Expanded farm sim with seeds, weather, random events, contracts, and crossover boosts.',screenshots:['🌾','🌧️','🎯'],featured:true,htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#111a22;color:#dcf6ff;font-family:Rajdhani,sans-serif;height:100vh;display:flex;flex-direction:column;gap:8px;padding:10px;}#hud{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;font-family:'Share Tech Mono',monospace;font-size:10px;}.chip{background:rgba(0,20,35,.72);border:1px solid rgba(120,220,255,.22);border-radius:8px;padding:6px;}.lab{display:block;color:rgba(190,235,255,.62);font-size:8px;}.val{display:block;color:#d8f3ff;font-weight:700;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}#toolbar{display:flex;gap:6px;flex-wrap:wrap;}button{padding:6px 10px;border-radius:8px;border:1px solid rgba(120,220,255,.35);background:rgba(0,45,70,.55);color:#d8f3ff;cursor:pointer;font-size:10px;}button.active{background:rgba(20,110,150,.68);border-color:rgba(120,220,255,.7);}#farm{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;background:rgba(0,10,20,.7);padding:8px;border-radius:10px;border:1px solid rgba(120,220,255,.2);}.tile{height:44px;border-radius:6px;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;user-select:none;position:relative;}.soil{background:#3a2b1e;}.seed{background:#4f3a22;}.grow{background:#3d5a2a;}.ripe{background:#4a7a1f;}.wet{box-shadow:inset 0 0 0 2px rgba(120,190,255,.35);}.pest::after{content:'🐛';position:absolute;font-size:12px;right:2px;bottom:1px;}#event,#contract{font-size:10px;color:rgba(210,240,255,.76);line-height:1.5;background:rgba(0,16,30,.6);border:1px solid rgba(120,220,255,.18);padding:8px;border-radius:8px;}</style></head><body><div id="hud"></div><div id="toolbar"></div><div id="farm"></div><div id="event"></div><div id="contract"></div><script>(function(){var K='pocket_farmer_v2';var SEEDS={wheat:{name:'Wheat',emoji:'🌾',buy:4,sell:8,days:2},berry:{name:'Berry',emoji:'🍓',buy:7,sell:15,days:3},carrot:{name:'Carrot',emoji:'🥕',buy:6,sell:12,days:2},moon:{name:'Moonflower',emoji:'🌙',buy:12,sell:26,days:4}};var WEATHER=['Sunny','Rainy','Windy','Storm'];var EVENTS=[{t:'Merchant bonus: berries +4.',fx:function(s){s.market.berry+=4;s.lastEvent='Merchant bonus';}},{t:'Festival: wheat +3.',fx:function(s){s.market.wheat+=3;s.lastEvent='Festival rush';}},{t:'Pokemon patrol clears pests.',fx:function(s){s.tiles.forEach(function(t){t.pest=false;});s.lastEvent='Pokemon clean-up';}},{t:'Pirate trader drops +18 coins.',fx:function(s){s.coins+=18;s.lastEvent='Pirate coin drop';}},{t:'Blue Lock drill: next harvest +2.',fx:function(s){s.buff=2;s.lastEvent='Blue Lock boost';}},{t:'Fortnite balloon gives 2 moonflower seeds.',fx:function(s){s.inv.moon+=2;s.lastEvent='Supply balloon';}}];var st={coins:45,day:1,season:'Spring',weather:'Sunny',sel:'wheat',inv:{wheat:6,berry:3,carrot:4,moon:1},tiles:Array.from({length:24},function(){return{kind:null,age:0,stage:0,pest:false,wet:false};}),market:{wheat:8,berry:15,carrot:12,moon:26},lastEvent:'Calm morning',contract:{kind:'wheat',need:6,done:0,reward:30},buff:0};function save(){localStorage.setItem(K,JSON.stringify(st));}function load(){var d=localStorage.getItem(K);if(d){try{var p=JSON.parse(d);if(p&&p.tiles&&p.inv)st=p;}catch(e){}}}function season(d){if(d<11)return'Spring';if(d<21)return'Summer';if(d<31)return'Autumn';return'Winter';}function cls(t){if(!t.kind)return'soil';if(t.stage===1)return'seed';if(t.stage===2)return'grow';return'ripe';}function em(t){if(!t.kind)return'·';if(t.stage<3)return t.stage===1?'🌱':'🌿';return SEEDS[t.kind].emoji;}function reroll(){var k=Object.keys(SEEDS)[Math.floor(Math.random()*4)];st.contract={kind:k,need:4+Math.floor(Math.random()*5),done:0,reward:24+Math.floor(Math.random()*28)};}function ui(){var hud=document.getElementById('hud');hud.innerHTML='';[['DAY',st.day],['SEASON',st.season],['WEATHER',st.weather],['COINS',st.coins],['EVENT',st.lastEvent],['INSTALL',((JSON.parse(localStorage.getItem('neoshell_packages_v1')||'[]').slice(-1)[0])||'none')]].forEach(function(c){var el=document.createElement('div');el.className='chip';el.innerHTML='<span class="lab">'+c[0]+'</span><span class="val">'+c[1]+'</span>';hud.appendChild(el);});var tb=document.getElementById('toolbar');tb.innerHTML='';Object.keys(SEEDS).forEach(function(k){var d=SEEDS[k];var b=document.createElement('button');b.className=st.sel===k?'active':'';b.textContent=d.emoji+' '+d.name+' ['+st.inv[k]+']';b.onclick=function(){st.sel=k;save();ui();};tb.appendChild(b);});var n=document.createElement('button');n.textContent='NEXT DAY';n.onclick=nextDay;tb.appendChild(n);var s=document.createElement('button');s.textContent='SPRAY PESTS (8)';s.onclick=function(){if(st.coins<8)return;st.coins-=8;st.tiles.forEach(function(t){t.pest=false;});st.lastEvent='Field sprayed';save();render();};tb.appendChild(s);var b=document.createElement('button');b.textContent='BUY '+SEEDS[st.sel].name+' ('+SEEDS[st.sel].buy+')';b.onclick=function(){var c=SEEDS[st.sel].buy;if(st.coins<c)return;st.coins-=c;st.inv[st.sel]+=1;save();render();};tb.appendChild(b);}function contract(kind){if(kind!==st.contract.kind)return;st.contract.done++;if(st.contract.done>=st.contract.need){st.coins+=st.contract.reward;st.lastEvent='Contract complete +'+st.contract.reward;reroll();}}function render(){ui();var f=document.getElementById('farm');f.innerHTML='';st.tiles.forEach(function(t){var d=document.createElement('div');d.className='tile '+cls(t)+(t.wet?' wet':'')+(t.pest?' pest':'');d.textContent=em(t);d.onclick=function(){if(!t.kind){if(st.inv[st.sel]<=0)return;st.inv[st.sel]--;t.kind=st.sel;t.age=0;t.stage=1;t.pest=false;t.wet=false;st.lastEvent='Planted '+SEEDS[st.sel].name;}else if(t.stage===3){var gain=Math.max(1,st.market[t.kind]+(t.wet?2:0)-(t.pest?3:0)+st.buff);st.coins+=gain;contract(t.kind);t.kind=null;t.stage=0;t.age=0;t.pest=false;t.wet=false;st.lastEvent='Harvested for '+gain;}save();render();};f.appendChild(d);});document.getElementById('event').textContent='Today: '+st.lastEvent;document.getElementById('contract').textContent='Contract: deliver '+st.contract.need+' '+SEEDS[st.contract.kind].name+' ('+st.contract.done+'/'+st.contract.need+') · Reward '+st.contract.reward;localStorage.setItem('pocket_farmer_v2',JSON.stringify(st));}function randomEvent(){if(Math.random()>0.58)return;var ev=EVENTS[Math.floor(Math.random()*EVENTS.length)];ev.fx(st);}function nextDay(){st.day++;st.season=season(st.day);st.weather=WEATHER[Math.floor(Math.random()*WEATHER.length)];st.buff=0;Object.keys(st.market).forEach(function(k){st.market[k]+=Math.floor(Math.random()*5)-2;});if(st.weather==='Rainy'){st.market.berry+=2;st.market.moon+=1;}st.tiles.forEach(function(t){if(!t.kind)return;if(Math.random()<0.14)t.pest=true;if(st.weather==='Rainy')t.wet=true;if(st.weather==='Storm'&&Math.random()<0.18)t.age=Math.max(0,t.age-1);if(t.pest)t.age=Math.max(0,t.age-1);t.age++;var req=SEEDS[t.kind].days;if(t.age>=req)t.stage=3;else if(t.age>=1)t.stage=2;});randomEvent();save();render();}load();if(!st.contract||!SEEDS[st.contract.kind])reroll();render();})();<\/script></body></html>`},
  {id:'as_multiverse_blockarena',name:'BlockVerse United',icon:'🧱',cat:'Games',desc:'Minecraft-style crossover run with Pokemon, Miraculous, Fortnite, One Piece, and Blue Lock inspired skills.',screenshots:['🧱','⚡','🏴'],featured:true,htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#0b1220;color:#d8ecff;font-family:Rajdhani,sans-serif;height:100vh;display:flex;flex-direction:column;}#top{padding:10px 12px;border-bottom:1px solid rgba(0,180,255,.22);display:flex;justify-content:space-between;align-items:center;background:rgba(1,10,25,.9);}#title{font-family:Orbitron,monospace;font-size:10px;letter-spacing:2px;color:#9fddff;}#stats{font-family:'Share Tech Mono',monospace;font-size:10px;color:#87d5ff;}#arena{flex:1;display:grid;grid-template-columns:2fr 1fr;min-height:0;}#left{padding:10px;display:flex;flex-direction:column;gap:8px;}#map{background:linear-gradient(180deg,#1a2f4f,#142338);border:1px solid rgba(110,210,255,.24);border-radius:10px;flex:1;position:relative;overflow:hidden;}#hero{position:absolute;width:18px;height:18px;background:#ffe66d;border:2px solid #2b1b00;border-radius:4px;left:14px;top:14px;transition:left .12s,top .12s;}.loot{position:absolute;font-size:14px;}#log{min-height:90px;max-height:120px;overflow:auto;background:rgba(0,8,20,.75);border:1px solid rgba(110,210,255,.15);border-radius:8px;padding:8px;font-size:10px;line-height:1.6;color:#bde9ff;}#right{padding:10px;border-left:1px solid rgba(0,180,255,.18);display:flex;flex-direction:column;gap:8px;background:rgba(0,7,20,.72);}button{padding:8px;border-radius:8px;border:1px solid rgba(120,220,255,.3);background:rgba(0,40,85,.6);color:#d8f3ff;cursor:pointer;font-size:11px;text-align:left;}button:hover{background:rgba(0,70,120,.76);}#quest{font-size:10px;color:#c5e9ff;line-height:1.6;background:rgba(0,20,40,.6);border:1px solid rgba(120,220,255,.15);border-radius:8px;padding:8px;}</style></head><body><div id="top"><div id="title">◈ BLOCKVERSE UNITED</div><div id="stats">HP <span id="hp">100</span> · POWER <span id="pow">12</span> · TOKENS <span id="tok">0</span></div></div><div id="arena"><div id="left"><div id="map"><div id="hero"></div></div><div id="log">World sync ready. Move with WASD/arrow keys and collect crossover loot.</div></div><div id="right"><div id="quest">Quest: collect 5 crossover tokens, then trigger Final Combo.</div><button id="b-poke">⚡ Pokemon Partner Skill</button><button id="b-lady">🐞 Miraculous Shield</button><button id="b-fort">🪂 Fortnite Supply Drop</button><button id="b-piece">🏴 One Piece Rush</button><button id="b-blue">⚽ Blue Lock Finisher</button><button id="b-final">🌌 Final Combo</button></div></div><script>(function(){var map=document.getElementById('map'),hero=document.getElementById('hero'),log=document.getElementById('log');var st={x:14,y:14,hp:100,power:12,tokens:0,shield:0,questDone:false};var loots=[];var icons=['⚡','🐞','🪂','🏴','⚽','🧱','✨'];function w(){return map.clientWidth-22;}function h(){return map.clientHeight-22;}function rnd(m){return Math.floor(Math.random()*m);}function say(t){log.innerHTML=t+'<br>'+log.innerHTML.split('<br>').slice(0,9).join('<br>');}function update(){hero.style.left=st.x+'px';hero.style.top=st.y+'px';document.getElementById('hp').textContent=st.hp;document.getElementById('pow').textContent=st.power;document.getElementById('tok').textContent=st.tokens;document.getElementById('quest').textContent=st.questDone?'Quest complete. Use Final Combo to end the run.':'Quest: collect 5 crossover tokens, then trigger Final Combo.';}function spawn(){while(loots.length<7){var el=document.createElement('div');el.className='loot';el.textContent=icons[rnd(icons.length)];el.style.left=(8+rnd(Math.max(30,w())))+'px';el.style.top=(8+rnd(Math.max(30,h())))+'px';map.appendChild(el);loots.push(el);}}function touch(){loots=loots.filter(function(el){var lx=parseInt(el.style.left,10),ly=parseInt(el.style.top,10);if(Math.abs(st.x-lx)<16&&Math.abs(st.y-ly)<16){st.tokens++;st.power+=2;st.hp=Math.min(100,st.hp+4);say('Collected '+el.textContent+' token.');el.remove();if(st.tokens>=5)st.questDone=true;return false;}return true;});if(Math.random()<0.14){var dmg=st.shield>0?1:5;st.hp=Math.max(0,st.hp-dmg);if(st.hp===0){say('Defeat. Resetting run...');st={x:14,y:14,hp:100,power:12,tokens:0,shield:0,questDone:false};loots.forEach(function(l){l.remove();});loots=[];}}if(st.shield>0)st.shield--;spawn();update();}function mv(dx,dy){st.x=Math.max(0,Math.min(w(),st.x+dx));st.y=Math.max(0,Math.min(h(),st.y+dy));touch();}document.addEventListener('keydown',function(e){if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d','W','A','S','D'].indexOf(e.key)<0)return;e.preventDefault();if(e.key==='ArrowUp'||e.key==='w'||e.key==='W')mv(0,-14);if(e.key==='ArrowDown'||e.key==='s'||e.key==='S')mv(0,14);if(e.key==='ArrowLeft'||e.key==='a'||e.key==='A')mv(-14,0);if(e.key==='ArrowRight'||e.key==='d'||e.key==='D')mv(14,0);});document.getElementById('b-poke').onclick=function(){st.power+=6;say('Pokemon partner used Volt Burst.');update();};document.getElementById('b-lady').onclick=function(){st.shield=8;say('Miraculous shield active.');};document.getElementById('b-fort').onclick=function(){st.tokens+=2;st.hp=Math.min(100,st.hp+10);say('Fortnite supply drop delivered tokens.');update();};document.getElementById('b-piece').onclick=function(){st.x=Math.min(w(),st.x+60);st.y=Math.max(0,st.y-40);say('One Piece rush dash.');touch();};document.getElementById('b-blue').onclick=function(){if(st.tokens<3){say('Need 3 tokens for Blue Lock finisher.');return;}st.tokens-=3;st.power+=10;say('Blue Lock finisher executed.');update();};document.getElementById('b-final').onclick=function(){if(!st.questDone){say('Collect at least 5 tokens first.');return;}say('Final Combo activated. Worlds stabilized.');st.power+=20;update();};spawn();update();})();<\/script></body></html>`},
  {id:"gp1_connect4",name:"Connect Four",icon:"\ud83d\udd34",cat:'Games',desc:"Drop discs to get 4 in a row. Play against the AI. First to connect 4 wins!",featured:true,screenshots:["\ud83d\udd34", "\ud83c\udfae", "\u26a1"],htmlApp:`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{margin:0;overflow:hidden;background:#010812;color:#c8e8ff;font-family:'Segoe UI',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:8px;user-select:none;}button{padding:7px 20px;border-radius:16px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-size:11px;font-weight:700;cursor:pointer;letter-spacing:1px;}button:hover{filter:brightness(1.15);}button:active{transform:scale(.95);}.sc{font-size:15px;font-weight:700;color:#00b4ff;letter-spacing:2px;font-family:monospace;}.info{font-size:10px;color:rgba(0,180,255,.45);letter-spacing:1px;font-family:monospace;}
#board{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;
  background:rgba(0,25,90,.75);padding:10px;border-radius:12px;
  border:1px solid rgba(0,180,255,.3);width:258px;}
.cell{width:30px;height:30px;border-radius:50%;
  background:rgba(0,10,40,.9);border:1px solid rgba(0,180,255,.1);
  cursor:pointer;transition:background .12s;}
.cell:hover{border-color:rgba(0,180,255,.5);}
.cell.r{background:#ee2222;box-shadow:0 0 7px #ee2222;cursor:default;}
.cell.y{background:#ffd700;box-shadow:0 0 6px #ffd700;cursor:default;}
.cell.win{animation:wink .4s infinite alternate;}
@keyframes wink{to{filter:brightness(1.5);}}
</style></head><body>
<div class="sc" id="sc">CONNECT FOUR</div>
<div class="info" id="info">Your turn (Red 🔴)</div>
<div id="board"></div>
<button onclick="initC4()">New Game</button>
<script>

var ROWS=6, COLS=7;
var grid4=new Array(ROWS*COLS).fill(0);
var turn4=1, over4=false;

function initC4(){
  grid4=new Array(ROWS*COLS).fill(0);
  turn4=1; over4=false;
  document.getElementById('sc').textContent='CONNECT FOUR';
  document.getElementById('info').textContent='Your turn (Red 🔴)';
  renderC4([]);
}

function dropC4(col){
  if(over4) return;
  var row=-1;
  for(var r=ROWS-1;r>=0;r--){
    if(grid4[r*COLS+col]===0){ row=r; break; }
  }
  if(row<0) return;
  grid4[row*COLS+col]=turn4;
  var winCells=checkWinC4(row,col);
  if(winCells.length){
    over4=true;
    document.getElementById('sc').textContent=(turn4===1?'🔴 RED WINS!':'🟡 AI WINS!');
    document.getElementById('info').textContent='Press New Game to play again';
    renderC4(winCells); return;
  }
  if(grid4.every(function(v){return v!==0;})){
    over4=true;
    document.getElementById('sc').textContent='DRAW!';
    renderC4([]); return;
  }
  turn4=3-turn4;
  renderC4([]);
  if(turn4===2&&!over4){
    document.getElementById('info').textContent='AI thinking...';
    setTimeout(aiMoveC4,320);
  } else {
    document.getElementById('info').textContent='Your turn (Red 🔴)';
  }
}

function aiMoveC4(){
  if(over4) return;
  var col=bestMoveC4();
  dropC4(col);
}

function scoreC4(line,player){
  var cnt=0,empty=0;
  line.forEach(function(v){if(v===player)cnt++;else if(v===0)empty++;});
  if(cnt===4) return 10000;
  if(cnt===3&&empty===1) return 100;
  if(cnt===2&&empty===2) return 10;
  return 0;
}

function evalBoard(){
  var s=0;
  // check all windows of 4
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS-3;c++){
    var w=[grid4[r*COLS+c],grid4[r*COLS+c+1],grid4[r*COLS+c+2],grid4[r*COLS+c+3]];
    s+=scoreC4(w,2)-scoreC4(w,1)*1.1;
  }
  for(var r=0;r<ROWS-3;r++) for(var c=0;c<COLS;c++){
    var w=[grid4[r*COLS+c],grid4[(r+1)*COLS+c],grid4[(r+2)*COLS+c],grid4[(r+3)*COLS+c]];
    s+=scoreC4(w,2)-scoreC4(w,1)*1.1;
  }
  for(var r=0;r<ROWS-3;r++) for(var c=0;c<COLS-3;c++){
    var w=[grid4[r*COLS+c],grid4[(r+1)*COLS+c+1],grid4[(r+2)*COLS+c+2],grid4[(r+3)*COLS+c+3]];
    s+=scoreC4(w,2)-scoreC4(w,1)*1.1;
  }
  for(var r=3;r<ROWS;r++) for(var c=0;c<COLS-3;c++){
    var w=[grid4[r*COLS+c],grid4[(r-1)*COLS+c+1],grid4[(r-2)*COLS+c+2],grid4[(r-3)*COLS+c+3]];
    s+=scoreC4(w,2)-scoreC4(w,1)*1.1;
  }
  return s;
}

function bestMoveC4(){
  // block player win first
  for(var c=0;c<COLS;c++){
    var r=-1;
    for(var rr=ROWS-1;rr>=0;rr--) if(grid4[rr*COLS+c]===0){r=rr;break;}
    if(r<0) continue;
    grid4[r*COLS+c]=1;
    if(checkWinC4(r,c).length){grid4[r*COLS+c]=0; return c;}
    grid4[r*COLS+c]=0;
  }
  // pick best scoring move
  var best=-Infinity, bestCol=3;
  for(var c=0;c<COLS;c++){
    var r=-1;
    for(var rr=ROWS-1;rr>=0;rr--) if(grid4[rr*COLS+c]===0){r=rr;break;}
    if(r<0) continue;
    grid4[r*COLS+c]=2;
    var s=evalBoard();
    grid4[r*COLS+c]=0;
    if(s>best){best=s;bestCol=c;}
  }
  // try own win
  for(var c=0;c<COLS;c++){
    var r=-1;
    for(var rr=ROWS-1;rr>=0;rr--) if(grid4[rr*COLS+c]===0){r=rr;break;}
    if(r<0) continue;
    grid4[r*COLS+c]=2;
    if(checkWinC4(r,c).length){grid4[r*COLS+c]=0; return c;}
    grid4[r*COLS+c]=0;
  }
  return bestCol;
}

function checkWinC4(row,col){
  var v=grid4[row*COLS+col];
  var dirs=[[0,1],[1,0],[1,1],[1,-1]];
  for(var di=0;di<dirs.length;di++){
    var dr=dirs[di][0],dc=dirs[di][1];
    var cells=[row*COLS+col];
    for(var d=1;d<4;d++){
      var nr=row+dr*d, nc=col+dc*d;
      if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid4[nr*COLS+nc]===v) cells.push(nr*COLS+nc);
      else break;
    }
    for(var d=1;d<4;d++){
      var nr=row-dr*d, nc=col-dc*d;
      if(nr>=0&&nr<ROWS&&nc>=0&&nc<COLS&&grid4[nr*COLS+nc]===v) cells.push(nr*COLS+nc);
      else break;
    }
    if(cells.length>=4) return cells;
  }
  return [];
}

function renderC4(winCells){
  var b=document.getElementById('board'); b.innerHTML='';
  for(var r=0;r<ROWS;r++) for(var c=0;c<COLS;c++){
    var d=document.createElement('div'); d.className='cell';
    var idx=r*COLS+c;
    if(grid4[idx]===1) d.classList.add('r');
    else if(grid4[idx]===2) d.classList.add('y');
    if(winCells.indexOf(idx)>=0) d.classList.add('win');
    (function(col2){ d.onclick=function(){ dropC4(col2); }; })(c);
    b.appendChild(d);
  }
}

initC4();

<\/script></body></html>`},
];

const AppStore = {
  installed: [],
  _view: 'home',
  _detail: null,
  _tab: 'featured',
  _search: '',

  init() {
    this.installed = LS.get('tob_store_installed',[]);
  },

  isInstalled(id){ return this.installed.includes(id); },

  install(id) {
    if(this.isInstalled(id)) return;
    this.installed.push(id); LS.set('tob_store_installed',this.installed);
    const app = APP_STORE_CATALOG.find(a=>a.id===id);
    if(!app) return;
    // Add to custom apps (avoid duplicates)
    if(!OS.customApps.find(a=>a.id===id)){
      OS.customApps.push({id,label:app.name,icon:app.icon,type:'html',html:app.htmlApp||'',size:'md'});
      LS.set('tob_apps',OS.customApps);
    }
    try{ buildDesktopIcons(); }catch(e){}
    try{ buildStartMenu(); }catch(e){}
    toast('✅ ' + app.name + ' installed!');
  },

  uninstall(id){
    this.installed=this.installed.filter(i=>i!==id); LS.set('tob_store_installed',this.installed);
    OS.customApps=OS.customApps.filter(a=>a.id!==id); LS.set('tob_apps',OS.customApps);
    buildDesktopIcons(); buildStartMenu(); toast('🗑 Uninstalled');
  }
};

function openAppStore(){ AppStore.init(); WM.create('appstore','APP STORE','🛍️',860,600,buildAppStoreApp); }

function buildAppStoreApp(body){
  body.style.cssText='overflow:hidden;padding:0;';
  AppStore.init();
  let tab = AppStore._tab || 'featured';
  let search = '';
  let detailApp = null;

  const render = () => {
    if(detailApp){ renderDetail(); return; }
    const catalog = search ? APP_STORE_CATALOG.filter(a=>a.name.toLowerCase().includes(search)||a.cat.toLowerCase().includes(search)) : APP_STORE_CATALOG;
    const featured = catalog.filter(a=>a.featured);
    const all = catalog;
    body.innerHTML = `
    <div class="store-app">
      <div class="store-topbar">
        <span class="store-logo">🛍️ APP STORE</span>
        <input class="store-search" placeholder="Search apps..." value="${search}" oninput="__storeSearch(this.value)">
      </div>
      <div class="store-tabs">
        <div class="store-tab ${tab==='featured'?'active':''}" onclick="__storeTab('featured')">⭐ FEATURED</div>
        <div class="store-tab ${tab==='all'?'active':''}" onclick="__storeTab('all')">ALL APPS</div>
        <div class="store-tab ${tab==='games'?'active':''}" onclick="__storeTab('games')">🎮 GAMES</div>
        <div class="store-tab ${tab==='installed'?'active':''}" onclick="__storeTab('installed')">✅ INSTALLED</div>
        <div class="store-tab ${tab==='upload'?'active':''}" onclick="__storeTab('upload')">📦 UPLOAD APP</div>
      </div>
      <div class="store-body" id="store-body"></div>
    </div>`;
    const storeBody = body.querySelector('#store-body');

    if(tab==='featured'){
      storeBody.innerHTML = `<div class="store-section-title">⭐ FEATURED APPS</div><div class="store-featured-row" id="store-featured"></div><div class="store-section-title" style="margin-top:8px">📦 ALL APPS</div><div class="store-app-grid" id="store-grid"></div>`;
      const fr = storeBody.querySelector('#store-featured');
      featured.forEach(app=>{ fr.appendChild(makeFeaturedCard(app)); });
      const gr = storeBody.querySelector('#store-grid');
      all.forEach(app=>{ gr.appendChild(makeAppCard(app)); });
    } else if(tab==='games'){
      const games=all.filter(a=>a.cat==='Games'||a.cat==='games');
      storeBody.innerHTML = `<div class="store-section-title">🎮 ALL GAMES (${games.length})</div><div class="store-app-grid" id="store-grid"></div>`;
      const gr=storeBody.querySelector('#store-grid');
      games.forEach(app=>{ gr.appendChild(makeAppCard(app)); });
    } else if(tab==='upload'){
      storeBody.innerHTML = `<div class="store-section-title">📦 UPLOAD CUSTOM APP</div>
      <div style="background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.2);border-radius:14px;padding:20px;margin-bottom:14px;">
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);line-height:2;margin-bottom:14px">
          Install apps from <b style="color:var(--neon)">.json</b> mod files — each file can contain one or multiple apps that appear in the App Store and on your Desktop.
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
          <div style="background:rgba(0,10,30,.6);border:1px solid rgba(0,180,255,.15);border-radius:10px;padding:14px;">
            <div style="font-family:'Orbitron',sans-serif;font-size:9px;color:var(--neon);letter-spacing:2px;margin-bottom:8px">📦 INSTALL MOD PACK</div>
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;font-family:'Share Tech Mono',monospace">Install a .json mod file containing apps, themes, or UI changes.</div>
            <button onclick="document.getElementById('mod-file-input').click()" style="width:100%;padding:8px;border-radius:8px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;cursor:pointer;letter-spacing:1px">📦 INSTALL .JSON MOD</button>
          </div>
          <div style="background:rgba(0,10,30,.6);border:1px solid rgba(0,180,255,.15);border-radius:10px;padding:14px;">
            <div style="font-family:'Orbitron',sans-serif;font-size:9px;color:var(--neon3);letter-spacing:2px;margin-bottom:8px">✨ CREATE NEW APP</div>
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:10px;font-family:'Share Tech Mono',monospace">Use the App Creator to build a custom app with a URL or HTML content.</div>
            <button onclick="openModal('ac-modal')" style="width:100%;padding:8px;border-radius:8px;background:linear-gradient(135deg,#003322,#00aa55);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;cursor:pointer;letter-spacing:1px">✦ OPEN APP CREATOR</button>
          </div>
        </div>
        <div style="font-family:'Orbitron',sans-serif;font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:8px;border-top:1px solid rgba(0,180,255,.1);padding-top:12px">INSTALLED CUSTOM APPS</div>
        <div id="custom-apps-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;"></div>
      </div>`;
      // Fill custom apps list
      const cal=storeBody.querySelector('#custom-apps-list');
      if(OS.customApps.length===0){
        cal.innerHTML='<div style="grid-column:1/-1;font-family:\'Share Tech Mono\',monospace;font-size:9px;color:var(--text-muted);padding:14px">No custom apps installed yet.</div>';
      } else {
        OS.customApps.forEach(app=>{
          const card=document.createElement('div');
          card.style.cssText='background:rgba(0,15,40,.8);border:1px solid rgba(0,180,255,.15);border-radius:10px;padding:10px;text-align:center;';
          card.innerHTML='<div style="font-size:26px;margin-bottom:5px">'+(app.icon||'📱')+'</div><div style="font-family:\'Orbitron\',sans-serif;font-size:9px;color:var(--text);margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+(app.label||app.id).replace('\n',' ')+'</div><button onclick="openApp(\''+app.id+'\')" style="width:100%;padding:4px;border-radius:6px;background:rgba(0,180,255,.12);border:1px solid rgba(0,180,255,.25);color:var(--neon);font-family:\'Share Tech Mono\',monospace;font-size:8px;cursor:pointer">▶ OPEN</button>';
          cal.appendChild(card);
        });
      }
    } else if(tab==='all'){
      storeBody.innerHTML = `<div class="store-section-title">📦 ALL APPS (${all.length})</div><div class="store-app-grid" id="store-grid"></div>`;
      const gr = storeBody.querySelector('#store-grid');
      all.forEach(app=>{ gr.appendChild(makeAppCard(app)); });
    } else {
      const installedList = APP_STORE_CATALOG.filter(a=>AppStore.isInstalled(a.id));
      if(!installedList.length){
        storeBody.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60%;gap:14px"><div style="font-size:48px;opacity:.2">🛍️</div><div style="font-family:'Orbitron',sans-serif;font-size:12px;color:var(--neon);letter-spacing:3px">NO APPS INSTALLED</div><div style="font-size:11px;color:var(--text-dim)">Browse Featured or All Apps to install.</div></div>`;
      } else {
        storeBody.innerHTML = `<div class="store-section-title">✅ INSTALLED APPS</div><div class="store-app-grid" id="store-grid"></div>`;
        const gr = storeBody.querySelector('#store-grid');
        installedList.forEach(app=>{ gr.appendChild(makeAppCard(app)); });
      }
    }

    window.__storeSearch = v=>{ search=v.toLowerCase(); render(); };
    window.__storeTab = t=>{ tab=t; AppStore._tab=t; render(); };
    window.__storeDetail = id=>{ detailApp=APP_STORE_CATALOG.find(a=>a.id===id); render(); };
    window.__storeInstall = id=>{ runInstallAnim(id); };
    window.__storeUninstall = id=>{ AppStore.uninstall(id); render(); };
  };

  const makeFeaturedCard = (app) => {
    const inst = AppStore.isInstalled(app.id);
    const card = document.createElement('div');
    card.className = 'store-featured-card'; card.style.position='relative';
    // SVG icon support
    if(app.svgIcon && SVG_ICONS[app.svgIcon]) {
      const svgWrap = document.createElement('div');
      svgWrap.style.cssText='width:44px;height:44px;border-radius:12px;padding:6px;margin-bottom:10px;display:flex;align-items:center;justify-content:center;'+
        (app.bgClass==='icon-bg-blue'?'background:linear-gradient(135deg,#001a50,#003399);':
        app.bgClass==='icon-bg-purple'?'background:linear-gradient(135deg,#1a0040,#5500aa);':
        app.bgClass==='icon-bg-green'?'background:linear-gradient(135deg,#002218,#005533);':
        app.bgClass==='icon-bg-orange'?'background:linear-gradient(135deg,#301000,#804000);':
        app.bgClass==='icon-bg-red'?'background:linear-gradient(135deg,#300010,#880030);':
        app.bgClass==='icon-bg-teal'?'background:linear-gradient(135deg,#001a20,#004455);':
        app.bgClass==='icon-bg-gold'?'background:linear-gradient(135deg,#201000,#604000);':
        app.bgClass==='icon-bg-pink'?'background:linear-gradient(135deg,#2a0020,#770040);':'background:rgba(0,20,60,.8);');
      svgWrap.innerHTML = SVG_ICONS[app.svgIcon];
      card.insertBefore(svgWrap, card.firstChild);
    } else {
      const iEl=document.createElement('div');iEl.className='store-featured-icon';iEl.textContent=app.icon;card.insertBefore(iEl,card.firstChild);
    }
    card.innerHTML += `
      <div class="store-featured-name">${app.name}</div>
      <div class="store-featured-desc">${app.desc}</div>
      <span class="store-featured-tag new">NEW</span>
      <button class="store-install-btn ${inst?'installed':'get'}" style="position:absolute;top:10px;right:10px" onclick="event.stopPropagation();${inst?'':'__storeInstall(\''+app.id+'\')'}">
        ${inst?'✅ INSTALLED':'GET'}
      </button>`;
    card.onclick = () => { detailApp=app; render(); };
    return card;
  };

  const makeAppCard = (app) => {
    const inst = AppStore.isInstalled(app.id);
    const card = document.createElement('div');
    card.className = `store-app-card ${inst?'installed':''}`;
    // Build icon
    const iconArea = document.createElement('div');
    iconArea.className = 'store-app-icon';
    if(app.svgIcon && SVG_ICONS[app.svgIcon]) {
      const svgWrap = document.createElement('div');
      svgWrap.style.cssText='width:42px;height:42px;border-radius:11px;padding:5px;margin:0 auto 6px;display:flex;align-items:center;justify-content:center;'+
        (app.bgClass==='icon-bg-blue'?'background:linear-gradient(135deg,#001a50,#003399);':
        app.bgClass==='icon-bg-purple'?'background:linear-gradient(135deg,#1a0040,#5500aa);':
        app.bgClass==='icon-bg-green'?'background:linear-gradient(135deg,#002218,#005533);':
        app.bgClass==='icon-bg-orange'?'background:linear-gradient(135deg,#301000,#804000);':
        app.bgClass==='icon-bg-red'?'background:linear-gradient(135deg,#300010,#880030);':
        app.bgClass==='icon-bg-teal'?'background:linear-gradient(135deg,#001a20,#004455);':
        app.bgClass==='icon-bg-gold'?'background:linear-gradient(135deg,#201000,#604000);':
        app.bgClass==='icon-bg-pink'?'background:linear-gradient(135deg,#2a0020,#770040);':'background:rgba(0,20,60,.8);');
      svgWrap.innerHTML = SVG_ICONS[app.svgIcon];
      iconArea.appendChild(svgWrap);
    } else {
      iconArea.textContent = app.icon;
    }
    card.appendChild(iconArea);
    card.innerHTML += `
      <div class="store-app-name">${app.name}</div>
      <div class="store-app-cat">${app.cat}</div>
      <button class="store-install-btn ${inst?'installed':'get'}" onclick="event.stopPropagation();${inst?'__storeUninstall(\''+app.id+'\')':'__storeInstall(\''+app.id+'\')'}">
        ${inst?'🗑 REMOVE':'GET'}
      </button>`;
    card.onclick = ()=>{ detailApp=app; render(); };
    return card;
  };

  const renderDetail = () => {
    if(!detailApp) return;
    const inst = AppStore.isInstalled(detailApp.id);
    body.innerHTML = `
    <div class="store-app">
      <div class="store-topbar">
        <span class="store-logo">🛍️ APP STORE</span>
        <input class="store-search" placeholder="Search apps..." oninput="__storeSearch(this.value)">
      </div>
      <div class="store-body">
        <button class="store-back-btn" onclick="__storeBack()">← Back</button>
        <div class="store-detail">
          <div class="store-detail-header">
            <div class="store-detail-icon">${detailApp.icon}</div>
            <div class="store-detail-info">
              <div class="store-detail-name">${detailApp.name}</div>
              <div class="store-detail-dev">${detailApp.cat} · Free</div>
              <button class="store-install-btn ${inst?'installed':'get'}" style="margin-top:8px" onclick="${inst?'__storeUninstall(\''+detailApp.id+'\')':'__storeInstall(\''+detailApp.id+'\')'}">
                ${inst?'🗑 REMOVE':'🛍️ GET APP'}
              </button>
            </div>
          </div>
          <div class="store-detail-desc">${detailApp.desc}</div>
          <div class="store-section-title">PREVIEW</div>
          <div class="store-screenshots">${(detailApp.screenshots||[]).map(s=>`<div class="store-screenshot">${s}</div>`).join('')}</div>
        </div>
      </div>
    </div>`;
    window.__storeBack = ()=>{ detailApp=null; render(); };
    window.__storeSearch = v=>{ search=v.toLowerCase(); detailApp=null; render(); };
    window.__storeInstall = id=>{ runInstallAnim(id); };
    window.__storeUninstall = id=>{ AppStore.uninstall(id); detailApp=null; render(); };
  };

  const ANIM_TYPES = ['circuit','data_stream','energy_core','cogs'];
  const runInstallAnim = (id) => {
    const app = APP_STORE_CATALOG.find(a=>a.id===id);
    if(!app) return;
    const animType = ANIM_TYPES[Math.floor(Math.random()*ANIM_TYPES.length)];
    // Show animation in a centered fixed overlay over the store body
    const storeBody = body.querySelector('.store-body') || body;
    const overlay = document.createElement('div');
    overlay.className='store-anim-overlay';
    overlay.style.cssText='position:absolute;inset:0;z-index:20;background:rgba(1,6,16,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;border-radius:inherit;';
    const cv = document.createElement('canvas');
    cv.className='store-anim-canvas'; cv.width=80; cv.height=80;
    const lbl = document.createElement('div');
    lbl.className='store-anim-label'; lbl.textContent='INSTALLING '+app.name.toUpperCase()+'...';
    overlay.appendChild(cv); overlay.appendChild(lbl);
    storeBody.style.position='relative';
    storeBody.appendChild(overlay);
    runInstallCanvas(cv, animType, ()=>{
      overlay.remove();
      AppStore.install(id);
      render();
    });
  };

  render();
}

function runInstallCanvas(cv, type, onDone){
  const ctx = cv.getContext('2d');
  const W=cv.width, H=cv.height;
  let t=0, frame=0, raf;
  const MAX_FRAMES=90;
  const loop=()=>{
    if(frame>=MAX_FRAMES){ cancelAnimationFrame(raf); if(onDone)onDone(); return; }
    raf=requestAnimationFrame(loop);
    ctx.clearRect(0,0,W,H); t+=0.08; frame++;
    const prog=frame/MAX_FRAMES;
    if(type==='circuit'){
      ctx.strokeStyle=`rgba(0,180,255,${0.3+Math.sin(t)*0.2})`; ctx.lineWidth=1.5;
      const segments=[[[5,40],[35,40]],[[35,40],[35,20]],[[35,20],[55,20]],[[55,20],[55,50]],[[55,50],[75,50]],[[40,40],[40,60]],[[20,40],[20,60]],[[20,60],[60,60]]];
      const show=Math.floor(prog*segments.length);
      for(let si=0;si<show;si++){const [a,b]=segments[si];ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();}
      if(show<segments.length){const [a,b]=segments[show];const p2=(prog*segments.length-show);if(p2>0){ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(a[0]+(b[0]-a[0])*p2,a[1]+(b[1]-a[1])*p2);ctx.stroke();}}
      const nodeCount=Math.max(1,show+1);[[5,40],[35,40],[35,20],[55,20],[55,50],[75,50]].slice(0,Math.min(nodeCount,6)).forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle='#00b4ff';ctx.fill();});
    } else if(type==='data_stream'){
      for(let i=0;i<12;i++){
        const x=(i*(W/12)+t*40)%W;const y=20+Math.sin(t*2+i*0.7)*25;
        ctx.beginPath();ctx.arc(x,y+H*0.3,3,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,200,${0.2+prog*0.6})`;ctx.fill();
        ctx.beginPath();ctx.arc(x,y+H*0.5,2,0,Math.PI*2);ctx.fillStyle=`rgba(0,180,255,${0.15+prog*0.5})`;ctx.fill();
      }
      ctx.fillStyle=`rgba(0,180,255,${prog*0.8})`; ctx.font='bold 10px monospace';
      ctx.fillText(`${Math.round(prog*100)}%`,W/2-12,H-8);
    } else if(type==='energy_core'){
      const pulse=0.7+Math.sin(t*3)*0.3;
      const g=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,30*prog*pulse);
      g.addColorStop(0,`rgba(0,255,200,${0.6*prog})`);g.addColorStop(0.5,`rgba(0,180,255,${0.3*prog})`);g.addColorStop(1,'transparent');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(W/2,H/2,35,0,Math.PI*2);ctx.fill();
      for(let i=0;i<6;i++){const a=t+i*(Math.PI/3);const r=20+prog*12;ctx.beginPath();ctx.arc(W/2+Math.cos(a)*r,H/2+Math.sin(a)*r,3,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,200,${0.5+Math.sin(t+i)*0.3})`;ctx.fill();}
      ctx.strokeStyle=`rgba(0,255,200,${0.3+Math.sin(t)*0.2})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(W/2,H/2,30*prog,0,Math.PI*2);ctx.stroke();
    } else if(type==='cogs'){
      const drawCog=(cx,cy,r,teeth,angle,col)=>{ctx.save();ctx.translate(cx,cy);ctx.rotate(angle);ctx.beginPath();for(let i=0;i<teeth;i++){const a1=i/teeth*Math.PI*2,a2=(i+0.4)/teeth*Math.PI*2,a3=(i+0.6)/teeth*Math.PI*2,a4=(i+1)/teeth*Math.PI*2;ctx.lineTo(Math.cos(a1)*r,Math.sin(a1)*r);ctx.lineTo(Math.cos(a1)*(r+5),Math.sin(a1)*(r+5));ctx.lineTo(Math.cos(a2)*(r+5),Math.sin(a2)*(r+5));ctx.lineTo(Math.cos(a2)*r,Math.sin(a2)*r);}ctx.closePath();ctx.strokeStyle=col;ctx.lineWidth=1.5;ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*0.4,0,Math.PI*2);ctx.stroke();ctx.restore();};
      drawCog(25,30,14,8,t,`rgba(0,180,255,${0.4+prog*0.4})`);
      drawCog(54,30,10,6,-t*1.4,`rgba(0,255,200,${0.3+prog*0.5})`);
      drawCog(40,52,8,5,t*1.75,`rgba(100,100,255,${0.35+prog*0.4})`);
    }
  };
  loop();
}

/* ── OVERRIDE openApp to add new routes ── */
const _origOpenApp = openApp;
window.openApp = function(id){
  if(id==='appstore'){ openAppStore();  closeStartMenuIfOpen(); return; }
  if(id==='widgets'){ toggleWidgetPanel(); return; }
  _origOpenApp(id);
};


/* ══════════════════════════════════════════════════════════════
   TOB OS v14.0 — WHAT'S NEW + USER PROFILES + BOOT STUDIO + WIDGET LAB
══════════════════════════════════════════════════════════════ */

/* ── WHAT'S NEW ── */
const WhatsNew = {
  VERSION: '17.0.0',
  CHANGES: {
    NEW: [
      { icon: '🧠', text: 'Dynamic Island upgraded into TOB Hub: real-time farm status, quick launcher buttons, richer controls, and better idle feed.' },
      { icon: '🌾', text: 'Pocket Farmer 2.0: added seed types, weather shifts, random events, pests, market drift, contracts, and crossover bonuses.' },
      { icon: '📖', text: 'Interactive Storybook added with chapter choices and dialogue routes, replacing Abil Pixel Quest and Codex Dashboard.' },
      { icon: '⌨️', text: 'NeonShell now supports sudo apt install style commands for specialized app installs and quick opening of installed apps.' },
      { icon: '🧱', text: 'BlockVerse United added: Minecraft-style crossover action with Pokemon, Miraculous, Fortnite, One Piece, and Blue Lock inspired skills.' },
      { icon: '🚀', text: 'This update log now appears automatically on first boot of version 17.0.0.' },
    ],
    FIXED: [
      { icon: '🧰', text: 'Terminal package installs now sync immediately with App Store installs without manual refresh.' },
      { icon: '🎚️', text: 'Dynamic Island music controls and quick-open actions now refresh state more reliably.' },
    ],
    REMOVED: [
      { icon: '🗑️', text: 'Abil Pixel Quest removed from catalog.' },
      { icon: '🗑️', text: 'Codex Dashboard removed from catalog.' },
    ],
  },
  init() {
    if (LS.get('tob_wn_seen_version', null) !== this.VERSION) {
      setTimeout(() => this.show(), 3200);
    }
  },
  show() {
    const el = document.getElementById('whats-new-overlay');
    const body = document.getElementById('wn-body');
    if (!el || !body) return;
    let html = '';
    const sec = (label, cls, items) => {
      if (!items.length) return '';
      return '<div class="wn-section"><span class="wn-section-label ' + cls + '">' + label + '</span><div class="wn-items">'
        + items.map(c => '<div class="wn-item"><span class="wn-item-icon">' + c.icon + '</span><span>' + c.text + '</span></div>').join('')
        + '</div></div>';
    };
    html += sec('NEW', 'wn-label-new', this.CHANGES.NEW);
    html += sec('FIXED', 'wn-label-fix', this.CHANGES.FIXED);
    html += sec('REMOVED', 'wn-label-removed', this.CHANGES.REMOVED);
    body.innerHTML = html;
    el.classList.add('show');
  },
  dismiss() {
    LS.set('tob_wn_seen_version', this.VERSION);
    const el = document.getElementById('whats-new-overlay');
    if (el) { el.style.opacity = '0'; setTimeout(() => { el.classList.remove('show'); el.style.opacity = ''; }, 400); }
  },
};

/* ── USER PROFILE SYSTEM ── */
const UserProfile = {
  AVATARS: ['👤','🧑','👩','👨','🧙','🧝','🧛','🤖','👾','🦊','🐱','🐸','🦁','🐼','🐺','🚀','🌟','⚡','🔥','💎'],
  get() { return LS.get('tob_user_profile', null); },
  save(p) { LS.set('tob_user_profile', p); },
  exists() { return !!this.get(); },
  hashPin(pin) { let h=0; for(let i=0;i<pin.length;i++) h=((h<<5)-h+pin.charCodeAt(i))|0; return String(h+2147483648); },
  verifyPin(pin) { const p=this.get(); if(!p||!p.pinHash) return true; return this.hashPin(pin)===p.pinHash; },
  hasPin() { const p=this.get(); return !!(p&&p.pinHash); },

  showSetup(onDone) {
    const overlay = document.getElementById('profile-setup-overlay');
    const dialog = document.getElementById('psetup-dialog');
    if (!overlay || !dialog) { if(onDone) onDone(); return; }
    let selAvatar = this.AVATARS[0], pendingName = '', step = 1;
    const avRow = () => this.AVATARS.map(a =>
      '<div class="psetup-av' + (a===selAvatar?' sel':'') + '" onclick="UserProfile._pSelAv(\'' + a + '\')">' + a + '</div>'
    ).join('');
    const render = () => {
      if (step === 1) {
        dialog.innerHTML =
          '<div class="psetup-title">CREATE PROFILE</div>' +
          '<div class="psetup-sub">PERSONALIZE YOUR TOB OS ACCOUNT</div>' +
          '<div class="psetup-field"><span class="psetup-label">CHOOSE AVATAR</span>' +
          '<div class="psetup-avatar-row" id="psetup-av-row">' + avRow() + '</div></div>' +
          '<div class="psetup-field"><span class="psetup-label">USERNAME</span>' +
          '<input class="psetup-input" id="psetup-name" type="text" placeholder="Enter your name..." maxlength="18"></div>' +
          '<button class="psetup-btn psetup-btn-primary" onclick="UserProfile._pNext()">NEXT &#8594;</button>' +
          '<button class="psetup-btn psetup-btn-ghost" style="margin-top:8px" onclick="UserProfile._pSkip()">Skip — Use as Guest</button>';
      } else {
        dialog.innerHTML =
          '<div class="psetup-title">SET PIN</div>' +
          '<div class="psetup-sub">OPTIONAL &middot; LEAVE BLANK TO SKIP</div>' +
          '<div style="text-align:center;padding:8px 0"><div style="font-size:44px">' + selAvatar + '</div>' +
          '<div style="font-family:Orbitron,sans-serif;font-size:14px;font-weight:700;color:var(--neon);margin-top:5px">' + (pendingName||'User') + '</div></div>' +
          '<div class="psetup-field"><span class="psetup-label">4-DIGIT PIN (OPTIONAL)</span>' +
          '<input class="psetup-input" id="psetup-pin" type="password" inputmode="numeric" placeholder="Leave blank for no password" maxlength="4">' +
          '<div class="psetup-pin-info">&#9670; If set, required at the lock screen. Numbers only, 4 digits.</div></div>' +
          '<div class="psetup-field"><span class="psetup-label">CONFIRM PIN</span>' +
          '<input class="psetup-input" id="psetup-pin2" type="password" inputmode="numeric" placeholder="Repeat PIN..." maxlength="4"></div>' +
          '<div id="psetup-pin-err" style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--accent);text-align:center;min-height:14px;margin-bottom:6px"></div>' +
          '<button class="psetup-btn psetup-btn-primary" onclick="UserProfile._pFinish()">&#10003; CREATE PROFILE</button>' +
          '<button class="psetup-btn psetup-btn-ghost" style="margin-top:8px" onclick="UserProfile._pBack()">&#8592; BACK</button>';
      }
    };
    this._pSelAv = (a) => {
      selAvatar = a;
      document.querySelectorAll('.psetup-av').forEach(el => el.classList.toggle('sel', el.textContent === a));
    };
    this._pNext = () => {
      const n = (document.getElementById('psetup-name')||{}).value||'';
      if (!n.trim()) { toast('\u26a0 Enter a username'); return; }
      pendingName = n.trim(); step = 2; render();
    };
    this._pBack = () => { step = 1; render(); };
    this._pSkip = () => { overlay.classList.remove('show'); if(onDone) onDone(); };
    this._pFinish = () => {
      const pin = ((document.getElementById('psetup-pin')||{}).value||'').trim();
      const pin2 = ((document.getElementById('psetup-pin2')||{}).value||'').trim();
      const err = document.getElementById('psetup-pin-err');
      if (pin && !/^\d{4}$/.test(pin)) { if(err) err.textContent='PIN must be exactly 4 digits.'; return; }
      if (pin && pin !== pin2) { if(err) err.textContent='PINs do not match.'; return; }
      const profile = { name: pendingName||'User', avatar: selAvatar, pinHash: pin ? this.hashPin(pin) : null, created: Date.now() };
      this.save(profile);
      overlay.classList.remove('show');
      this._updateStatusBar();
      toast('\u2746 Welcome, ' + profile.name + '!');
      if(onDone) onDone();
    };
    render();
    overlay.classList.add('show');
  },

  showEdit() {
    const p = this.get() || { name: 'User', avatar: '👤', pinHash: null };
    const overlay = document.getElementById('profile-setup-overlay');
    const dialog = document.getElementById('psetup-dialog');
    if (!overlay || !dialog) return;
    let selAvatar = p.avatar || '👤';
    dialog.innerHTML =
      '<div class="psetup-title">EDIT PROFILE</div>' +
      '<div class="psetup-sub">UPDATE YOUR TOB OS ACCOUNT</div>' +
      '<div class="psetup-field"><span class="psetup-label">AVATAR</span>' +
      '<div class="psetup-avatar-row">' +
      this.AVATARS.map(a => '<div class="psetup-av' + (a===selAvatar?' sel':'') + '" onclick="UserProfile._eSelAv(\'' + a + '\')">' + a + '</div>').join('') +
      '</div></div>' +
      '<div class="psetup-field"><span class="psetup-label">USERNAME</span>' +
      '<input class="psetup-input" id="pedit-name" type="text" value="' + p.name.replace(/"/g,'&quot;') + '" maxlength="18"></div>' +
      '<div class="psetup-field"><span class="psetup-label">NEW PIN (blank = keep current)</span>' +
      '<input class="psetup-input" id="pedit-pin" type="password" inputmode="numeric" placeholder="' + (p.pinHash ? 'Enter new PIN...' : 'Set a PIN...') + '" maxlength="4"></div>' +
      (p.pinHash ? '<button class="psetup-btn psetup-btn-ghost" style="background:rgba(255,45,110,.08);border-color:rgba(255,45,110,.2);color:var(--accent);margin-bottom:8px" onclick="UserProfile._removePin()">&#10005; Remove PIN</button>' : '') +
      '<div id="pedit-err" style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--accent);text-align:center;min-height:14px;margin-bottom:6px"></div>' +
      '<button class="psetup-btn psetup-btn-primary" onclick="UserProfile._eSave()">&#10003; SAVE CHANGES</button>' +
      '<button class="psetup-btn psetup-btn-ghost" style="margin-top:8px" onclick="document.getElementById(\'profile-setup-overlay\').classList.remove(\'show\')">CANCEL</button>' +
      '<div style="margin-top:14px;border-top:1px solid rgba(255,45,110,.15);padding-top:14px">' +
      '<button class="psetup-btn" style="background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent)" onclick="UserProfile._deleteProfile()">&#128465; Delete Profile</button></div>';
    this._eSelAv = (a) => {
      selAvatar = a;
      dialog.querySelectorAll('.psetup-av').forEach(el => el.classList.toggle('sel', el.textContent === a));
    };
    this._eSave = () => {
      const name = ((document.getElementById('pedit-name')||{}).value||'').trim();
      const pin = ((document.getElementById('pedit-pin')||{}).value||'').trim();
      const err = document.getElementById('pedit-err');
      if (!name) { toast('\u26a0 Name required'); return; }
      if (pin && !/^\d{4}$/.test(pin)) { if(err) err.textContent='PIN must be 4 digits.'; return; }
      const updated = { ...p, name, avatar: selAvatar };
      if (pin) updated.pinHash = this.hashPin(pin);
      this.save(updated);
      overlay.classList.remove('show');
      this._updateStatusBar();
      toast('&#10003; Profile updated!');
    };
    this._removePin = () => {
      if (!confirm('Remove your PIN? Lock screen will no longer require a password.')) return;
      this.save({ ...p, pinHash: null });
      overlay.classList.remove('show');
      this._updateStatusBar();
      toast('&#10003; PIN removed');
    };
    this._deleteProfile = () => {
      if (!confirm('Delete your profile? You will need to create a new one.')) return;
      LS.set('tob_user_profile', null);
      overlay.classList.remove('show');
      this._updateStatusBar();
      toast('&#128465; Profile deleted');
    };
    overlay.classList.add('show');
  },

  showLogin(onSuccess) {
    const p = this.get();
    const screen = document.getElementById('user-login-screen');
    const wrap = document.getElementById('ulogin-wrap');
    if (!screen || !wrap || !p) { if(onSuccess) onSuccess(); return; }
    let entered = '';
    const MAX = 4;
    const updateDots = (err) => {
      const d = document.getElementById('upin-dots');
      if (d) d.innerHTML = Array.from({length:MAX}, (_, i) =>
        '<div class="ulogin-dot' + (i<entered.length?' filled':'') + (err?' error':'') + '"></div>'
      ).join('');
    };
    wrap.innerHTML =
      '<div class="ulogin-avatar"><span>' + (p.avatar||'👤') + '</span><div class="ulogin-avatar-badge">&#128274;</div></div>' +
      '<div class="ulogin-name">' + p.name + '</div>' +
      '<div class="ulogin-sub">ENTER PIN TO CONTINUE</div>' +
      '<div class="ulogin-pin-wrap">' +
      '<div class="ulogin-pin-dots" id="upin-dots">' + Array.from({length:MAX},()=>'<div class="ulogin-dot"></div>').join('') + '</div>' +
      '<div class="ulogin-numpad">' +
      [1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => {
        if (k === '') return '<div></div>';
        return '<button class="ulogin-key' + (k==='⌫'?' del':'') + '" onclick="UserProfile._lKey(\'' + k + '\')">' + k + '</button>';
      }).join('') +
      '</div><div class="ulogin-error-msg" id="upin-err"></div></div>' +
      '<button class="ulogin-guest-btn" onclick="UserProfile._lGuest()">&#9670; Continue as Guest</button>';
    this._lKey = (k) => {
      if (k === '⌫') { entered = entered.slice(0,-1); updateDots(); return; }
      if (entered.length >= MAX) return;
      entered += String(k); updateDots();
      if (entered.length === MAX) {
        setTimeout(() => {
          if (this.verifyPin(entered)) {
            screen.style.transition='opacity .4s'; screen.style.opacity='0';
            setTimeout(()=>{ screen.classList.remove('show'); screen.style.cssText=''; this._updateStatusBar(); if(onSuccess) onSuccess(); }, 400);
          } else {
            updateDots(true);
            const err = document.getElementById('upin-err');
            if (err) err.textContent = 'Incorrect PIN';
            setTimeout(()=>{ entered=''; updateDots(); if(err) err.textContent=''; }, 900);
          }
        }, 180);
      }
    };
    this._lGuest = () => {
      screen.style.transition='opacity .4s'; screen.style.opacity='0';
      setTimeout(()=>{ screen.classList.remove('show'); screen.style.cssText=''; if(onSuccess) onSuccess(); }, 400);
    };
    const kb = (e) => { if(/^[0-9]$/.test(e.key)) this._lKey(e.key); if(e.key==='Backspace') this._lKey('⌫'); };
    document.addEventListener('keydown', kb);
    const origSuccess = onSuccess;
    onSuccess = () => { document.removeEventListener('keydown', kb); if(origSuccess) origSuccess(); };
    screen.classList.add('show');
  },

  lockWithPin() {
    const p = this.get();
    const ls = document.getElementById('lock-screen');
    if (!ls) return;
    const updateLock = () => {
      const n=new Date();
      const t=String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0');
      const days=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
      const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      const cl=document.getElementById('lock-clock'); if(cl) cl.textContent=t;
      const dl=document.getElementById('lock-date'); if(dl) dl.textContent=days[n.getDay()]+' · '+months[n.getMonth()]+' '+n.getDate()+' · '+n.getFullYear();
    };
    updateLock();
    const lockInt = setInterval(updateLock, 1000);
    ls._int = lockInt;
    if (!p || !p.pinHash) {
      ls.classList.add('show');
      ls.onclick = () => { clearInterval(lockInt); ls.classList.remove('show'); ls.onclick=null; toast('🔓 Unlocked'); };
      return;
    }
    ls.onclick = null;
    ls.classList.add('show');
    let lockPin = '';
    const MAX = 4;
    const pinWrap = document.createElement('div');
    pinWrap.id = 'lock-pin-wrap';
    pinWrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:12px;margin-top:16px;';
    const updateLD = (err) => {
      const d=document.getElementById('lpin-dots');
      if(d) d.innerHTML=Array.from({length:MAX},(_,i)=>'<div class="ulogin-dot'+(i<lockPin.length?' filled':'')+(err?' error':'')+'"></div>').join('');
    };
    pinWrap.innerHTML =
      '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:rgba(0,180,255,.4);letter-spacing:3px">ENTER PIN TO UNLOCK</div>' +
      '<div id="lpin-dots" style="display:flex;gap:10px;">' + Array.from({length:MAX},()=>'<div class="ulogin-dot"></div>').join('') + '</div>' +
      '<div class="ulogin-numpad">' +
      [1,2,3,4,5,6,7,8,9,'',0,'⌫'].map(k => {
        if (k==='') return '<div></div>';
        return '<button class="ulogin-key' + (k==='⌫'?' del':'') + '" id="lpk_' + k + '">' + k + '</button>';
      }).join('') +
      '</div><div class="ulogin-error-msg" id="lpin-err"></div>';
    ls.appendChild(pinWrap);
    const handleKey = (k) => {
      if (k==='⌫') { lockPin=lockPin.slice(0,-1); updateLD(); return; }
      if (lockPin.length>=MAX) return;
      lockPin+=String(k); updateLD();
      if (lockPin.length===MAX) {
        setTimeout(()=>{
          if (this.verifyPin(lockPin)) {
            clearInterval(lockInt); ls.classList.remove('show'); ls.onclick=null;
            if(pinWrap.parentNode) pinWrap.parentNode.removeChild(pinWrap);
            document.removeEventListener('keydown', kbL);
            toast('🔓 Unlocked');
          } else {
            updateLD(true);
            const e=document.getElementById('lpin-err'); if(e) e.textContent='Incorrect PIN';
            setTimeout(()=>{ lockPin=''; updateLD(); if(e) e.textContent=''; },900);
          }
        },180);
      }
    };
    pinWrap.querySelectorAll('.ulogin-key').forEach(btn=>btn.addEventListener('click', e=>{e.stopPropagation();handleKey(btn.textContent);}));
    const kbL = (e)=>{ if(/^[0-9]$/.test(e.key)) handleKey(e.key); if(e.key==='Backspace') handleKey('⌫'); };
    document.addEventListener('keydown', kbL);
  },

  _updateStatusBar() {
    const p = this.get();
    let btn = document.getElementById('sb-profile-btn');
    if (!btn) {
      btn = document.createElement('div'); btn.id='sb-profile-btn';
      const sbLeft = document.querySelector('#statusbar .sb-group:first-child');
      if (sbLeft) sbLeft.appendChild(btn);
    }
    if (p) {
      btn.innerHTML = '<span class="sb-profile-avatar">'+p.avatar+'</span><span class="sb-profile-name">'+p.name+'</span>';
      btn.title='Edit Profile'; btn.onclick=()=>UserProfile.showEdit();
    } else {
      btn.innerHTML = '<span class="sb-profile-avatar">&#128100;</span><span class="sb-profile-name">Guest</span>';
      btn.title='Create Profile'; btn.onclick=()=>UserProfile.showSetup(()=>{});
    }
  },
};

/* Override lockScreen / unlockScreen */
const _origLock = lockScreen;
window.lockScreen = () => UserProfile.hasPin() ? UserProfile.lockWithPin() : _origLock();
const _origUnlock = unlockScreen;
window.unlockScreen = () => { if (document.getElementById('lock-pin-wrap')) return; _origUnlock(); };

/* ── BOOT STUDIO APP ── */
const BootStudio = {
  THEMES: [
    {
      id:'neon_pulse', name:'Neon Pulse', desc:'Glowing radial rings',
      render(cv,t,col) {
        const ctx=cv.getContext('2d'); ctx.clearRect(0,0,cv.width,cv.height);
        const g=ctx.createRadialGradient(cv.width/2,cv.height/2,0,cv.width/2,cv.height/2,cv.width*.6);
        g.addColorStop(0,'rgba(0,40,120,.15)'); g.addColorStop(1,'transparent');
        ctx.fillStyle=g; ctx.fillRect(0,0,cv.width,cv.height);
        for(let i=0;i<4;i++){
          ctx.beginPath();
          ctx.arc(cv.width/2,cv.height/2,(20+i*14)*(1+Math.sin(t+i)*.08),0,Math.PI*2);
          const r=parseInt(col.slice(1,3),16), gr=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
          ctx.strokeStyle='rgba('+r+','+gr+','+b+','+(0.35+Math.sin(t+i*.7)*.15)+')';
          ctx.lineWidth=1.5; ctx.stroke();
        }
      }
    },
    {
      id:'cyber_grid', name:'Cyber Grid', desc:'Scrolling perspective grid',
      render(cv,t,col) {
        const ctx=cv.getContext('2d'); ctx.clearRect(0,0,cv.width,cv.height);
        const C=14, off=(t*8)%C;
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        ctx.strokeStyle='rgba('+r+','+g+','+b+',.18)'; ctx.lineWidth=.6;
        for(let x=off;x<cv.width+C;x+=C){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,cv.height);ctx.stroke();}
        for(let y=off;y<cv.height+C;y+=C){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cv.width,y);ctx.stroke();}
        const hy=cv.height*.55, gr2=ctx.createLinearGradient(0,hy-20,0,hy+20);
        gr2.addColorStop(0,'transparent'); gr2.addColorStop(.5,'rgba('+r+','+g+','+b+',.2)'); gr2.addColorStop(1,'transparent');
        ctx.fillStyle=gr2; ctx.fillRect(0,hy-20,cv.width,40);
      }
    },
    {
      id:'matrix_rain', name:'Matrix Rain', desc:'Falling katakana characters',
      _drops:null,
      render(cv,t,col) {
        const ctx=cv.getContext('2d');
        if(!this._drops||this._drops.length!==Math.floor(cv.width/8)) this._drops=Array(Math.floor(cv.width/8)).fill(1);
        ctx.fillStyle='rgba(0,0,0,.07)'; ctx.fillRect(0,0,cv.width,cv.height);
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        ctx.fillStyle='rgba('+r+','+g+','+b+',.8)'; ctx.font='7px monospace';
        this._drops.forEach((y,i)=>{
          ctx.fillText(String.fromCharCode(0x30A0+Math.random()*96),i*8,y*8);
          this._drops[i]=y*8>cv.height&&Math.random()>.95?0:y+.5;
        });
      }
    },
    {
      id:'energy_wave', name:'Energy Wave', desc:'Flowing sine waves',
      render(cv,t,col) {
        const ctx=cv.getContext('2d'); ctx.clearRect(0,0,cv.width,cv.height);
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        for(let i=0;i<4;i++){
          ctx.beginPath(); ctx.moveTo(0,cv.height*.5);
          for(let x=0;x<=cv.width;x+=2) ctx.lineTo(x,cv.height*.5+Math.sin(x*.012+t+i*.7)*12);
          ctx.strokeStyle='rgba('+r+','+g+','+b+','+(0.2+i*.06)+')';
          ctx.lineWidth=1.2; ctx.stroke();
        }
      }
    },
    {
      id:'starfield', name:'Starfield', desc:'Flying through stars',
      _stars:null,
      render(cv,t,col) {
        const ctx=cv.getContext('2d');
        if(!this._stars) this._stars=Array.from({length:80},()=>({x:Math.random()*cv.width-cv.width/2,y:Math.random()*cv.height-cv.height/2,z:Math.random()*cv.width}));
        ctx.fillStyle='rgba(0,0,0,.12)'; ctx.fillRect(0,0,cv.width,cv.height);
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        const cx=cv.width/2, cy=cv.height/2;
        this._stars.forEach(s=>{
          s.z-=1.5; if(s.z<=0){s.x=(Math.random()-0.5)*cv.width;s.y=(Math.random()-0.5)*cv.height;s.z=cv.width;}
          const sx=s.x/s.z*cv.width+cx, sy=s.y/s.z*cv.height+cy;
          const sz=Math.max(0.2,(1-s.z/cv.width)*2.5);
          const al=Math.min(1,(1-s.z/cv.width)*1.5);
          ctx.beginPath(); ctx.arc(sx,sy,sz,0,Math.PI*2);
          ctx.fillStyle='rgba('+r+','+g+','+b+','+al+')'; ctx.fill();
        });
      }
    },
    {
      id:'plasma', name:'Plasma', desc:'Colourful plasma field',
      render(cv,t,col) {
        const ctx=cv.getContext('2d');
        const img=ctx.createImageData(cv.width,cv.height);
        const r0=parseInt(col.slice(1,3),16), g0=parseInt(col.slice(3,5),16), b0=parseInt(col.slice(5,7),16);
        const sc=6;
        for(let y=0;y<cv.height;y+=sc) for(let x=0;x<cv.width;x+=sc){
          const v=Math.sin(x*.04+t)+Math.sin(y*.03+t*.8)+Math.sin((x+y)*.025+t*.6);
          const n=(v+3)/6; const i=(y*cv.width+x)*4;
          img.data[i]=r0*n; img.data[i+1]=g0*n; img.data[i+2]=b0*n; img.data[i+3]=180;
        }
        ctx.putImageData(img,0,0);
      }
    },
    {
      id:'aurora', name:'Aurora', desc:'Northern lights shimmer',
      render(cv,t,col) {
        const ctx=cv.getContext('2d'); ctx.clearRect(0,0,cv.width,cv.height);
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        for(let i=0;i<3;i++){
          const cy2=cv.height*(0.3+i*.12+Math.sin(t*.3+i)*.04);
          for(let x=0;x<cv.width;x+=4){
            const wy=cy2+Math.sin(x*.008+t*1.5+i*1.2)*16;
            const al=(0.04+Math.sin(x*.01+t+i)*.02);
            const gr=ctx.createLinearGradient(x,wy-20,x,wy+20);
            gr.addColorStop(0,'transparent'); gr.addColorStop(.5,'rgba('+r+','+g+','+b+','+al+')'); gr.addColorStop(1,'transparent');
            ctx.fillStyle=gr; ctx.fillRect(x,wy-20,4,40);
          }
        }
      }
    },
    {
      id:'glitch', name:'Glitch', desc:'Digital glitch artefacts',
      render(cv,t,col) {
        const ctx=cv.getContext('2d');
        ctx.fillStyle='rgba(0,0,0,.1)'; ctx.fillRect(0,0,cv.width,cv.height);
        const r=parseInt(col.slice(1,3),16), g=parseInt(col.slice(3,5),16), b=parseInt(col.slice(5,7),16);
        for(let i=0;i<6;i++){
          if(Math.random()<.4){
            const gy=Math.random()*cv.height, gh=Math.random()*6+1, gx=Math.random()*cv.width*.3;
            ctx.fillStyle='rgba('+r+','+g+','+b+','+(0.15+Math.random()*.2)+')';
            ctx.fillRect(gx,gy,cv.width*.7+Math.random()*cv.width*.3,gh);
          }
        }
        ctx.fillStyle='rgba('+r+','+g+','+b+',.06)'; ctx.fillRect(0,Math.sin(t*3)*cv.height*.4+cv.height*.3,cv.width,2);
      }
    },
  ],

  _rafs: {},

  open() {
    WM.create('boot-studio', 'BOOT STUDIO', '🎨', 820, 580, body => this._build(body));
  },

  _build(body) {
    body.style.cssText = 'overflow:hidden;padding:0;background:var(--bg);';
    const saved = LS.get('tob_boot_style', 'neon_pulse');
    const savedColor = LS.get('tob_boot_color', '#00b4ff');
    const savedSpeed = LS.get('tob_boot_speed', 1.0);
    const savedLogo = LS.get('tob_boot_logo', 'TOB OS');
    const savedMsg = LS.get('tob_boot_msg', 'INITIALIZING...');
    const savedSound = LS.get('tob_boot_sound', false);

    body.innerHTML = [
      '<div style="display:flex;flex-direction:column;height:100%;font-family:Rajdhani,sans-serif;">',
      '<div style="padding:12px 16px;border-bottom:1px solid var(--panel-border);display:flex;align-items:center;gap:12px;background:rgba(2,8,20,.5);flex-shrink:0">',
      '<span style="font-family:Orbitron,sans-serif;font-size:11px;font-weight:700;color:var(--neon);letter-spacing:3px">🎨 BOOT STUDIO</span>',
      '<span style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted)">Customize your startup screen</span>',
      '<button onclick="BootStudio.preview()" style="margin-left:auto;padding:6px 18px;border-radius:8px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:Orbitron,sans-serif;font-size:9px;font-weight:700;cursor:pointer;letter-spacing:2px">&#9654; PREVIEW BOOT</button>',
      '</div>',
      '<div style="display:flex;flex:1;overflow:hidden;">',

      // LEFT: theme picker
      '<div style="width:310px;flex-shrink:0;border-right:1px solid var(--panel-border);overflow-y:auto;padding:14px;">',
      '<div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:700;color:var(--text-muted);letter-spacing:3px;margin-bottom:10px">ANIMATION STYLE</div>',
      '<div class="boot-studio-grid" id="bs-theme-grid"></div>',
      '</div>',

      // RIGHT: controls
      '<div style="flex:1;overflow-y:auto;padding:16px;">',
      '<div style="font-family:Orbitron,sans-serif;font-size:8px;font-weight:700;color:var(--text-muted);letter-spacing:3px;margin-bottom:12px">CUSTOMIZATION</div>',

      // Accent color
      '<div class="bs-slider-row" style="margin-bottom:14px">',
      '<div class="bs-slider-label"><span>ACCENT COLOR</span></div>',
      '<div class="bs-color-row" id="bs-colors">',
      ['#00b4ff','#ff2d9e','#00ffcc','#ffd700','#a855f7','#ff4444','#39ff14','#ffffff'].map((c,i) =>
        '<div class="bs-color' + (c===savedColor?' active':'') + '" style="background:' + c + '" onclick="BootStudio._setColor(\'' + c + '\')" data-c="' + c + '"></div>'
      ).join(''),
      '<input type="color" value="' + savedColor + '" id="bs-custom-color" style="width:28px;height:28px;border-radius:7px;border:2px solid rgba(255,255,255,.3);cursor:pointer;padding:1px;" oninput="BootStudio._setColor(this.value)">',
      '</div></div>',

      // Speed
      '<div class="bs-slider-row" style="margin-bottom:14px">',
      '<div class="bs-slider-label"><span>ANIMATION SPEED</span><span id="bs-speed-val">' + Math.round(savedSpeed*100) + '%</span></div>',
      '<input type="range" min="20" max="300" value="' + Math.round(savedSpeed*100) + '" style="width:100%;accent-color:var(--neon)" id="bs-speed" oninput="BootStudio._setSpeed(this.value)">',
      '</div>',

      // Logo text
      '<div class="bs-slider-row" style="margin-bottom:14px">',
      '<div class="bs-slider-label" style="margin-bottom:5px"><span>BOOT LOGO TEXT</span></div>',
      '<input class="bs-logo-input" id="bs-logo" value="' + savedLogo.replace(/"/g,'&quot;') + '" maxlength="16" placeholder="TOB OS" oninput="BootStudio._setLogo(this.value)">',
      '</div>',

      // Status message
      '<div class="bs-slider-row" style="margin-bottom:14px">',
      '<div class="bs-slider-label" style="margin-bottom:5px"><span>STATUS MESSAGE</span></div>',
      '<input class="bs-msg-input" id="bs-msg" value="' + savedMsg.replace(/"/g,'&quot;') + '" maxlength="40" placeholder="INITIALIZING..." oninput="BootStudio._setMsg(this.value)">',
      '</div>',

      // Sound toggle
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">',
      '<span style="font-family:Share Tech Mono,monospace;font-size:10px;color:var(--text-dim)">&#128266; BOOT SOUND</span>',
      '<div class="toggle-sw ' + (savedSound?'on':'') + '" id="bs-sound-toggle" onclick="BootStudio._toggleSound(this)"></div>',
      '</div>',

      // Apply button
      '<button class="bs-test-btn" onclick="BootStudio.applyAll()">&#10003; APPLY &amp; SAVE</button>',
      '<div id="bs-apply-msg" style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--neon3);text-align:center;margin-top:8px;min-height:14px"></div>',

      '</div></div></div>'
    ].join('');

    // Build theme cards
    const grid = body.querySelector('#bs-theme-grid');
    this.THEMES.forEach(theme => {
      const card = document.createElement('div');
      card.className = 'bs-card' + (theme.id === saved ? ' active' : '');
      card.dataset.tid = theme.id;
      card.innerHTML =
        '<div class="bs-preview"><canvas id="bscv_' + theme.id + '" width="140" height="60"></canvas></div>' +
        '<div class="bs-name">' + theme.name + '</div>' +
        '<div class="bs-desc">' + theme.desc + '</div>' +
        '<div class="bs-check">&#10003;</div>';
      card.onclick = () => this._selectTheme(theme.id, body);
      grid.appendChild(card);
    });

    // Start live previews
    this._startPreviews(savedColor);
  },

  _startPreviews(col) {
    const color = col || LS.get('tob_boot_color','#00b4ff');
    this.THEMES.forEach(theme => {
      const cv = document.getElementById('bscv_' + theme.id);
      if (!cv) return;
      let t = 0;
      const loop = () => {
        if (!document.getElementById('bscv_' + theme.id)) return;
        this._rafs[theme.id] = requestAnimationFrame(loop);
        t += 0.06;
        theme.render(cv, t, color);
      };
      cancelAnimationFrame(this._rafs[theme.id]);
      loop();
    });
  },

  _selectTheme(id, body) {
    body = body || document.querySelector('.win-body');
    LS.set('tob_boot_style', id);
    BOOT_ANIM.style = id;
    body && body.querySelectorAll('.bs-card').forEach(c => c.classList.toggle('active', c.dataset.tid === id));
  },

  _setColor(c) {
    LS.set('tob_boot_color', c);
    BOOT_ANIM.color = c;
    const el = document.getElementById('bs-custom-color'); if(el) el.value = c;
    document.querySelectorAll('.bs-color').forEach(el => el.classList.toggle('active', el.dataset.c === c));
    this._startPreviews(c);
  },

  _setSpeed(v) {
    const speed = v / 100;
    LS.set('tob_boot_speed', speed);
    BOOT_ANIM.speed = speed;
    const el = document.getElementById('bs-speed-val'); if(el) el.textContent = v + '%';
  },

  _setLogo(v) { LS.set('tob_boot_logo', v); },
  _setMsg(v) { LS.set('tob_boot_msg', v); },

  _toggleSound(el) {
    const on = !el.classList.contains('on');
    el.classList.toggle('on', on);
    LS.set('tob_boot_sound', on);
    BOOT_ANIM.sound = on;
  },

  applyAll() {
    const style = LS.get('tob_boot_style','neon_pulse');
    const color = LS.get('tob_boot_color','#00b4ff');
    const speed = LS.get('tob_boot_speed',1.0);
    const logo  = LS.get('tob_boot_logo','TOB OS');
    const msg   = LS.get('tob_boot_msg','INITIALIZING...');
    BOOT_ANIM.style = style; BOOT_ANIM.color = color; BOOT_ANIM.speed = speed;
    const msgEl = document.getElementById('bs-apply-msg');
    if (msgEl) { msgEl.textContent = '✓ Saved! Takes effect on next boot.'; setTimeout(()=>msgEl.textContent='',3000); }
    toast('🎨 Boot screen saved!');
  },

  preview() {
    // Show a full-screen overlay preview of the boot screen
    const existing = document.getElementById('bs-preview-overlay');
    if (existing) { existing.remove(); return; }
    const ov = document.createElement('div');
    ov.id = 'bs-preview-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9100;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;cursor:pointer;';
    ov.innerHTML =
      '<canvas id="bs-full-cv" style="position:absolute;inset:0;width:100%;height:100%;"></canvas>' +
      '<div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;">' +
      '<div id="bs-prev-logo" style="font-family:Orbitron,sans-serif;font-size:36px;font-weight:900;letter-spacing:14px;text-shadow:0 0 40px currentColor;animation:wn-in .5s ease">' + (LS.get('tob_boot_logo','TOB OS')) + '</div>' +
      '<div style="font-family:Share Tech Mono,monospace;font-size:11px;letter-spacing:5px;opacity:.55">' + (LS.get('tob_boot_msg','INITIALIZING...')) + '</div>' +
      '<div style="width:200px;height:3px;background:rgba(255,255,255,.08);border-radius:2px;overflow:hidden"><div style="height:100%;background:currentColor;animation:bootBar 1.8s ease forwards;border-radius:2px;opacity:.8"></div></div>' +
      '<div style="font-family:Share Tech Mono,monospace;font-size:10px;opacity:.3;margin-top:8px">CLICK TO CLOSE PREVIEW</div>' +
      '</div>';
    document.body.appendChild(ov);

    const cv = document.getElementById('bs-full-cv');
    cv.width = innerWidth; cv.height = innerHeight;
    const theme = this.THEMES.find(t => t.id === LS.get('tob_boot_style','neon_pulse')) || this.THEMES[0];
    const col = LS.get('tob_boot_color','#00b4ff');
    const logo = document.getElementById('bs-prev-logo');
    if (logo) logo.style.color = col;

    let t = 0, raf;
    const loop = () => { raf=requestAnimationFrame(loop); t+=0.04; theme.render(cv,t,col); };
    loop();
    ov.onclick = () => { cancelAnimationFrame(raf); ov.remove(); };
    setTimeout(() => { cancelAnimationFrame(raf); ov.remove(); }, 6000);
  },
};

/* ── WIDGET DESIGNER APP ── */
const WidgetLab = {
  WIDGET_TYPES: {
    clock:    { icon:'🕐', name:'Clock',        desc:'Digital or analog clock with live time' },
    weather:  { icon:'⛅', name:'Weather',      desc:'Simulated weather display card' },
    calendar: { icon:'📅', name:'Calendar',     desc:'Monthly calendar with today highlight' },
    music:    { icon:'🎵', name:'Music Player', desc:'Now playing + playback controls' },
    stats:    { icon:'📊', name:'System Stats', desc:'CPU, RAM, heap & open windows' },
    notes:    { icon:'📝', name:'Sticky Notes', desc:'Editable note with theme colors' },
    shortcuts:{ icon:'⚡', name:'Shortcuts',    desc:'Quick launch grid for 8 apps' },
    battery:  { icon:'🔋', name:'Battery',      desc:'System battery and charging status' },
    news:     { icon:'📰', name:'News Ticker',  desc:'Scrolling custom headline ticker' },
    countdown:{ icon:'⏳', name:'Countdown',    desc:'Countdown timer to a custom date' },
  },

  NOTE_THEMES: { default:'rgba(3,10,28,.9)', amber:'rgba(28,18,0,.9)', green:'rgba(0,18,6,.9)', pink:'rgba(28,0,14,.9)' },
  NOTE_COLORS: { default:'var(--neon)', amber:'#ffd700', green:'#39ff14', pink:'#ff2d9e' },

  open() {
    WM.create('widget-lab', 'WIDGET LAB', '🧩', 900, 580, body => this._build(body));
  },

  _build(body) {
    body.style.cssText = 'overflow:hidden;padding:0;';
    let selType = 'clock';
    let opts = this._defaultOpts('clock');

    body.innerHTML =
      '<div class="wd-root">' +
      '<div class="wd-toolbar"><span class="wd-toolbar-title">🧩 WIDGET LAB</span>' +
      '<span style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted)">Design, preview, and place widgets on the desktop</span>' +
      '</div>' +
      '<div class="wd-body">' +
      '<div class="wd-sidebar" id="wl-sidebar"></div>' +
      '<div class="wd-canvas" id="wl-canvas"><div class="wd-canvas-hint"><div class="wd-canvas-hint-icon">🧩</div><div class="wd-canvas-hint-text">SELECT A WIDGET TYPE</div></div></div>' +
      '<div class="wd-options" id="wl-options"></div>' +
      '</div></div>';

    // Build sidebar
    const sidebar = body.querySelector('#wl-sidebar');
    Object.entries(this.WIDGET_TYPES).forEach(([type, T]) => {
      const item = document.createElement('div');
      item.className = 'wd-type-item' + (type === selType ? ' active' : '');
      item.dataset.type = type;
      item.innerHTML = '<span class="wd-type-icon">' + T.icon + '</span>' + T.name;
      item.onclick = () => {
        selType = type;
        opts = this._defaultOpts(type);
        sidebar.querySelectorAll('.wd-type-item').forEach(el => el.classList.toggle('active', el.dataset.type === type));
        renderPreview();
        renderOptions();
      };
      sidebar.appendChild(item);
    });

    const renderPreview = () => {
      const canvas = body.querySelector('#wl-canvas');
      canvas.innerHTML = '';
      const prev = document.createElement('div');
      prev.className = 'wd-live-preview';
      prev.style.minWidth = '220px';
      this._buildPreview(prev, selType, opts);
      canvas.appendChild(prev);
    };

    const renderOptions = () => {
      const panel = body.querySelector('#wl-options');
      panel.innerHTML = '';
      const T = this.WIDGET_TYPES[selType];

      const sec = (title) => {
        const s = document.createElement('div'); s.className = 'wd-opt-section';
        s.innerHTML = '<div class="wd-opt-title">' + title + '</div>';
        panel.appendChild(s); return s;
      };
      const row = (label, control, section) => {
        const r = document.createElement('div'); r.className = 'wd-opt-row';
        r.innerHTML = '<span class="wd-opt-label">' + label + '</span>';
        r.appendChild(control);
        (section || panel.lastElementChild).appendChild(r);
      };
      const input = (val, ph, onChange) => {
        const el = document.createElement('input');
        el.className = 'wd-opt-input'; el.value = val; el.placeholder = ph || '';
        el.oninput = () => { onChange(el.value); renderPreview(); };
        return el;
      };
      const select = (options, val, onChange) => {
        const el = document.createElement('select'); el.className = 'wd-opt-select';
        options.forEach(([v,l]) => { const o=document.createElement('option');o.value=v;o.textContent=l;o.selected=v===val;el.appendChild(o); });
        el.onchange = () => { onChange(el.value); renderPreview(); };
        return el;
      };
      const colorGrid = (colors, current, onChange) => {
        const wrap = document.createElement('div'); wrap.className = 'wd-color-grid';
        colors.forEach(c => {
          const el = document.createElement('div'); el.className='wd-color-swatch'+(c===current?' sel':'');
          el.style.background=c; el.dataset.c=c;
          el.onclick=()=>{ wrap.querySelectorAll('.wd-color-swatch').forEach(s=>s.classList.toggle('sel',s.dataset.c===c)); opts[onChange]=c; renderPreview(); };
          wrap.appendChild(el);
        });
        return wrap;
      };
      const slider = (label, key, min, max, unit) => {
        const s = document.createElement('div'); s.className='wd-opt-section';
        s.innerHTML='<div class="wd-opt-title">'+label+'</div><div style="display:flex;align-items:center;gap:8px"><input type="range" min="'+min+'" max="'+max+'" value="'+(opts[key]||min)+'" style="flex:1;accent-color:var(--neon)" id="wls_'+key+'"><span id="wlsv_'+key+'" style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--neon);min-width:30px">'+(opts[key]||min)+(unit||'')+'</span></div>';
        s.querySelector('input').oninput = function(){opts[key]=+this.value;document.getElementById('wlsv_'+key).textContent=this.value+(unit||'');renderPreview();};
        panel.appendChild(s);
      };

      const gen = sec('GENERAL');
      row('Title', input(opts.title||T.name, T.name, v=>opts.title=v), gen);

      if (selType === 'clock') {
        sec('CLOCK OPTIONS');
        row('Mode', select([['digital','Digital'],['analog','Analog']],opts.mode||'digital',v=>opts.mode=v));
        row('Show Seconds', select([['yes','Yes'],['no','No']],opts.showSec||'yes',v=>opts.showSec=v));
        row('Font', select([['orbitron','Orbitron'],['mono','Monospace'],['rajdhani','Rajdhani']],opts.font||'orbitron',v=>opts.font=v));
      } else if (selType === 'weather') {
        sec('WEATHER OPTIONS');
        row('City Name', input(opts.city||'Neo City','City name',v=>opts.city=v));
        row('Condition', select([['sunny','Sunny ☀'],['cloudy','Cloudy ⛅'],['rain','Rainy 🌧'],['snow','Snowy ❄'],['storm','Storm ⛈'],['fog','Foggy 🌫']],opts.cond||'sunny',v=>{opts.cond=v;renderPreview();}));
        row('Units', select([['c','Celsius'],['f','Fahrenheit']],opts.units||'c',v=>opts.units=v));
      } else if (selType === 'notes') {
        sec('NOTE OPTIONS');
        row('Color Theme', select([['default','Default (Blue)'],['amber','Amber'],['green','Neon Green'],['pink','Pink']],opts.noteTheme||'default',v=>opts.noteTheme=v));
        row('Default Text', input(opts.text||'','My note...',v=>opts.text=v));
      } else if (selType === 'countdown') {
        sec('COUNTDOWN OPTIONS');
        row('Target Date', input(opts.date||'2025-12-31','YYYY-MM-DD',v=>opts.date=v));
        row('Label', input(opts.cdLabel||'Event','Label text',v=>opts.cdLabel=v));
      } else if (selType === 'news') {
        sec('TICKER OPTIONS');
        row('Headlines', input(opts.headlines||'Welcome to TOB OS · Latest update is v14','Headlines separated by ·',v=>opts.headlines=v));
        slider('Scroll Speed','tickerSpeed',1,10,'');
      }

      slider('Width','w',160,500,'px');
      slider('Height','h',80,400,'px');

      const placeSection = document.createElement('div'); placeSection.style.marginTop='12px';
      const placeBtn = document.createElement('button');
      placeBtn.className='wd-place-btn';
      placeBtn.innerHTML='&#9654; PLACE ON DESKTOP';
      placeBtn.onclick = () => {
        DesktopWidgets.addWidget(selType, { ...opts });
        toast(this.WIDGET_TYPES[selType].icon + ' ' + (opts.title||this.WIDGET_TYPES[selType].name) + ' placed!');
        WM.close('widget-lab');
      };
      placeSection.appendChild(placeBtn);
      panel.appendChild(placeSection);
    };

    renderPreview();
    renderOptions();
  },

  _defaultOpts(type) {
    const T = this.WIDGET_TYPES[type] || {};
    const base = { title: T.name||type, w: 220, h: 160 };
    if (type==='clock') return { ...base, mode:'digital', showSec:'yes', font:'orbitron', h:120 };
    if (type==='weather') return { ...base, city:'Neo City', cond:'sunny', units:'c', h:200 };
    if (type==='calendar') return { ...base, w:250, h:230 };
    if (type==='music') return { ...base, h:130 };
    if (type==='stats') return { ...base, h:200 };
    if (type==='notes') return { ...base, noteTheme:'default', text:'', h:180 };
    if (type==='shortcuts') return { ...base, h:150 };
    if (type==='battery') return { ...base, w:180, h:120 };
    if (type==='news') return { ...base, headlines:'Welcome to TOB OS · v14 now available', tickerSpeed:3, h:90 };
    if (type==='countdown') return { ...base, date:'2025-12-31', cdLabel:'New Year', h:140 };
    return base;
  },

  _buildPreview(el, type, opts) {
    const T = this.WIDGET_TYPES[type] || {};
    const title = opts.title || T.name || type;
    el.innerHTML =
      '<div style="font-family:Share Tech Mono,monospace;font-size:8px;font-weight:700;color:rgba(0,180,255,.55);letter-spacing:2px;margin-bottom:8px;text-transform:uppercase">' + T.icon + ' ' + title + '</div>' +
      this._previewBody(type, opts);
  },

  _previewBody(type, opts) {
    const n = new Date();
    if (type==='clock') {
      const t = String(n.getHours()).padStart(2,'0')+':'+String(n.getMinutes()).padStart(2,'0')+(opts.showSec!=='no'?':'+String(n.getSeconds()).padStart(2,'0'):'');
      const fontMap = {orbitron:'Orbitron,sans-serif',mono:'"Share Tech Mono",monospace',rajdhani:'Rajdhani,sans-serif'};
      const font = fontMap[opts.font||'orbitron'] || 'Orbitron,sans-serif';
      if (opts.mode==='analog') return '<canvas id="wl-analog-prev" width="90" height="90" style="display:block;margin:auto"></canvas><script>requestAnimationFrame(function an(){var cv=document.getElementById("wl-analog-prev");if(!cv)return;requestAnimationFrame(an);var ctx=cv.getContext("2d"),r=43,cx=45,cy=45,n=new Date(),h=n.getHours()%12,m=n.getMinutes(),s=n.getSeconds();ctx.clearRect(0,0,90,90);ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle="rgba(0,10,30,.9)";ctx.fill();ctx.strokeStyle="rgba(0,180,255,.3)";ctx.lineWidth=1.5;ctx.stroke();[[h/12*Math.PI*2-Math.PI/2,25,2.5],[m/60*Math.PI*2-Math.PI/2,34,1.8],[s/60*Math.PI*2-Math.PI/2,38,1]].forEach(function(a){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a[0])*a[1],cy+Math.sin(a[0])*a[1]);ctx.strokeStyle="#00b4ff";ctx.lineWidth=a[2];ctx.lineCap="round";ctx.stroke();});});<\/script>';
      return '<div style="font-family:' + font + ';font-size:28px;font-weight:900;color:var(--text);text-align:center;letter-spacing:2px">' + t + '</div>' +
        '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);text-align:center;margin-top:5px">'+['SUN','MON','TUE','WED','THU','FRI','SAT'][n.getDay()]+' · '+['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][n.getMonth()]+' '+n.getDate()+'</div>';
    }
    if (type==='weather') {
      const W = {sunny:{icon:'☀️',temp:24,desc:'SUNNY'},cloudy:{icon:'⛅',temp:18,desc:'PARTLY CLOUDY'},rain:{icon:'🌧️',temp:13,desc:'RAINY'},snow:{icon:'❄️',temp:-2,desc:'SNOWY'},storm:{icon:'⛈️',temp:11,desc:'THUNDERSTORM'},fog:{icon:'🌫️',temp:9,desc:'FOGGY'}};
      const w = W[opts.cond||'sunny']; const deg = opts.units==='f' ? Math.round(w.temp*9/5+32)+'°F' : w.temp+'°C';
      return '<div style="font-size:38px;text-align:center">' + w.icon + '</div>' +
        '<div style="font-family:Orbitron,sans-serif;font-size:24px;font-weight:900;color:var(--text);text-align:center">' + deg + '</div>' +
        '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);text-align:center;letter-spacing:2px">' + w.desc + '</div>' +
        '<div style="font-family:Share Tech Mono,monospace;font-size:8px;color:rgba(0,180,255,.4);text-align:center;margin-top:4px">&#128205; ' + (opts.city||'Neo City') + '</div>';
    }
    if (type==='calendar') {
      const y=n.getFullYear(),m=n.getMonth(),d=n.getDate();
      const fd=new Date(y,m,1).getDay(), dim=new Date(y,m+1,0).getDate();
      const months=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
      let cells=''; for(let i=0;i<fd;i++) cells+='<div></div>'; for(let i=1;i<=dim;i++) cells+='<div style="font-size:9px;text-align:center;padding:2px;border-radius:3px;'+(i===d?'background:rgba(0,180,255,.25);color:var(--neon);font-weight:700;':'')+'">'+ i +'</div>';
      return '<div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--neon);text-align:center;margin-bottom:6px">' + months[m] + ' ' + y + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:1px">'+['S','M','T','W','T','F','S'].map(h=>'<div style="font-size:7px;color:var(--text-muted);text-align:center">'+h+'</div>').join('')+cells+'</div>';
    }
    if (type==='music') {
      const s=MUSIC.songs[MUSIC.currentIdx];
      const title=s?s.name:(_ostPlaying?'OST: '+OS.track:'Nothing playing');
      return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#001840,#003399);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">&#127925;</div><div style="min-width:0"><div style="font-size:12px;font-weight:700;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+title+'</div></div></div><div style="display:flex;gap:8px;justify-content:center"><button style="padding:4px 10px;border-radius:7px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);color:var(--text-dim);cursor:pointer">&#9194;</button><button style="padding:4px 12px;border-radius:7px;background:rgba(0,180,255,.2);border:1px solid var(--neon);color:var(--neon);cursor:pointer">'+(MUSIC.playing||_ostPlaying?'&#9208;':'&#9654;')+'</button><button style="padding:4px 10px;border-radius:7px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);color:var(--text-dim);cursor:pointer">&#9193;</button></div>';
    }
    if (type==='stats') {
      const mem=Math.round(performance.memory&&performance.memory.usedJSHeapSize/1048576)||0;
      const cpu=5+WM.windows.size*8;
      return ['<div style="font-size:10px;font-family:Share Tech Mono,monospace">',
        '<div style="display:flex;justify-content:space-between;color:var(--text-dim);margin-bottom:2px"><span>CPU</span><span style="color:var(--neon)">'+cpu+'%</span></div>',
        '<div style="height:3px;background:rgba(0,180,255,.12);border-radius:2px;margin-bottom:6px"><div style="width:'+cpu+'%;height:100%;background:var(--neon);border-radius:2px"></div></div>',
        '<div style="display:flex;justify-content:space-between;color:var(--text-dim);margin-bottom:2px"><span>JS HEAP</span><span style="color:var(--neon3)">'+mem+'MB</span></div>',
        '<div style="display:flex;justify-content:space-between;color:var(--text-dim)"><span>WINDOWS</span><span style="color:var(--neon)">'+WM.windows.size+'</span></div>',
        '</div>'].join('');
    }
    if (type==='notes') {
      const bg = this.NOTE_THEMES[opts.noteTheme||'default'];
      const col = this.NOTE_COLORS[opts.noteTheme||'default'];
      return '<div style="background:'+bg+';border:1px solid '+col+'40;border-radius:8px;padding:8px;font-family:Rajdhani,sans-serif;font-size:12px;color:var(--text);min-height:60px">'+((opts.text||'').replace(/</g,'&lt;')||'<span style="opacity:.3">Type a note...</span>')+'</div>';
    }
    if (type==='shortcuts') {
      const apps=[{icon:'📁',lbl:'Finder'},{icon:'🎵',lbl:'Music'},{icon:'🧮',lbl:'Calc'},{icon:'🛍️',lbl:'Store'},{icon:'⚙️',lbl:'Settings'},{icon:'🔧',lbl:'Mods'},{icon:'📊',lbl:'Tasks'},{icon:'📋',lbl:'Updates'}];
      return '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">'+apps.map(a=>'<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px;border-radius:8px;cursor:pointer"><div style="font-size:18px">'+a.icon+'</div><div style="font-size:7px;color:var(--text-dim);font-family:Share Tech Mono,monospace">'+a.lbl+'</div></div>').join('')+'</div>';
    }
    if (type==='battery') {
      return '<div style="text-align:center"><div style="font-size:36px">🔋</div><div style="font-family:Orbitron,sans-serif;font-size:22px;font-weight:900;color:var(--neon3)">--<span style="font-size:14px">%</span></div><div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);margin-top:4px">CHECKING...</div></div>';
    }
    if (type==='news') {
      const hl = opts.headlines||'Welcome to TOB OS';
      return '<div style="overflow:hidden;font-family:Share Tech Mono,monospace;font-size:10px;color:var(--neon);white-space:nowrap;animation:ticker '+(20-(opts.tickerSpeed||3))+'s linear infinite" id="wl-ticker">'+hl+'</div>' +
        '<style>@keyframes ticker{0%{transform:translateX(100%)}100%{transform:translateX(-100%)}}</style>';
    }
    if (type==='countdown') {
      const target = new Date(opts.date||'2025-12-31');
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff/86400000), hrs=Math.floor((diff%86400000)/3600000), mins=Math.floor((diff%3600000)/60000);
      return '<div style="text-align:center"><div style="font-size:32px">⏳</div><div style="font-family:Orbitron,sans-serif;font-size:20px;font-weight:900;color:var(--text)">'+(days>0?days+'d ':'')+hrs+'h '+mins+'m</div><div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--neon);margin-top:4px;letter-spacing:2px">'+(opts.cdLabel||'Event').toUpperCase()+'</div></div>';
    }
    return '<div style="color:var(--text-muted);font-size:11px">Preview</div>';
  },
};

/* ── DESKTOP WIDGET SYSTEM ── */
const DesktopWidgets = {
  _widgets: [],
  _nextId: 1,

  init() {
    this._widgets = LS.get('tob_dw2_widgets', []);
    this._nextId = (this._widgets.reduce((m,w)=>Math.max(m,w.id||0),0)) + 1;
    const layer = document.getElementById('dw-layer');
    if (!layer) return;
    layer.innerHTML = '';
    this._widgets.forEach(cfg => this._spawn(layer, cfg));
  },

  addWidget(type, opts) {
    const T = WidgetLab.WIDGET_TYPES[type] || {};
    const id = this._nextId++;
    const cfg = { id, type, opts: opts || WidgetLab._defaultOpts(type), x: 80 + (id%4)*30, y: 80 + (id%3)*30, w: opts&&opts.w||220, h: opts&&opts.h||160 };
    this._widgets.push(cfg);
    this._save();
    const layer = document.getElementById('dw-layer');
    if (layer) this._spawn(layer, cfg);
  },

  _save() { LS.set('tob_dw2_widgets', this._widgets); },

  _remove(id) {
    this._widgets = this._widgets.filter(w => w.id !== id);
    this._save();
    const el = document.getElementById('dw2_' + id);
    if (el) { el.style.transition='opacity .2s,transform .2s'; el.style.opacity='0'; el.style.transform='scale(.85)'; setTimeout(()=>el.remove(),220); }
  },

  _spawn(layer, cfg) {
    const T = WidgetLab.WIDGET_TYPES[cfg.type] || {};
    const el = document.createElement('div');
    el.className = 'dw-widget';
    el.id = 'dw2_' + cfg.id;
    el.style.cssText = 'left:'+cfg.x+'px;top:'+cfg.y+'px;width:'+cfg.w+'px;height:'+cfg.h+'px;';
    el.innerHTML =
      '<div class="dw-widget-bar">' +
      '<span class="dw-widget-title">' + T.icon + ' ' + (cfg.opts&&cfg.opts.title||T.name||cfg.type) + '</span>' +
      '<button class="dw-widget-close" onclick="DesktopWidgets._remove(' + cfg.id + ')">&#10005;</button>' +
      '</div>' +
      '<div class="dw-widget-body" id="dwb2_' + cfg.id + '">' + WidgetLab._previewBody(cfg.type, cfg.opts||{}) + '</div>' +
      '<div class="dw-widget-resize" data-wid="' + cfg.id + '"></div>';
    layer.appendChild(el);
    // Fade in
    el.style.opacity='0'; el.style.transform='scale(.88)'; el.style.transition='opacity .22s,transform .22s cubic-bezier(.34,1.56,.64,1)';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{el.style.opacity='1';el.style.transform='scale(1)';}));
    // Start live updates for clock
    if (cfg.type==='clock') this._startClock(cfg.id, cfg.opts||{});
    if (cfg.type==='news') this._startTicker(cfg.id, cfg.opts||{});
    if (cfg.type==='battery') this._startBattery(cfg.id);
    // Drag
    this._makeDraggable(el, cfg);
    // Resize
    this._makeResizable(el.querySelector('.dw-widget-resize'), el, cfg);
  },

  _startClock(id, opts) {
    const tick = () => {
      const el = document.getElementById('dwb2_' + id); if (!el) return;
      el.innerHTML = WidgetLab._previewBody('clock', opts);
      setTimeout(tick, 1000);
    };
    setTimeout(tick, 1000);
  },

  _startTicker(id, opts) {
    const el = document.getElementById('dwb2_' + id); if (!el) return;
    el.innerHTML = WidgetLab._previewBody('news', opts);
  },

  _startBattery(id) {
    const update = () => {
      const el = document.getElementById('dwb2_' + id); if (!el) return;
      navigator.getBattery && navigator.getBattery().then(b => {
        const pct = Math.round(b.level*100);
        el.innerHTML = '<div style="text-align:center"><div style="font-size:36px">'+(pct<20?'🪫':'🔋')+'</div><div style="font-family:Orbitron,sans-serif;font-size:22px;font-weight:900;color:'+(pct<20?'var(--accent)':pct<50?'var(--gold)':'var(--neon3)')+'">'+pct+'<span style="font-size:14px">%</span></div><div style="font-family:Share Tech Mono,monospace;font-size:9px;color:var(--text-muted);margin-top:4px">'+(b.charging?'&#9889; CHARGING':'DISCHARGING')+'</div></div>';
        setTimeout(update, 30000);
      }).catch(()=>{ el.innerHTML='<div style="text-align:center;color:var(--text-muted);font-size:10px;font-family:Share Tech Mono,monospace">Battery API<br>unavailable</div>'; });
    };
    update();
  },

  _makeDraggable(el, cfg) {
    const bar = el.querySelector('.dw-widget-bar');
    if (!bar) return;
    let drag=false, ox, oy, sx, sy;
    const onStart = (x,y) => { drag=true; sx=x; sy=y; ox=cfg.x; oy=cfg.y; el.classList.add('dragging'); };
    const onMove = (x,y) => {
      if (!drag) return;
      const layer=document.getElementById('dw-layer');
      cfg.x=Math.max(0,Math.min((layer?layer.offsetWidth:innerWidth)-cfg.w,ox+(x-sx)));
      cfg.y=Math.max(0,Math.min((layer?layer.offsetHeight:innerHeight)-cfg.h,oy+(y-sy)));
      el.style.left=cfg.x+'px'; el.style.top=cfg.y+'px';
    };
    const onEnd = () => { drag=false; el.classList.remove('dragging'); this._save(); };
    bar.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;e.preventDefault();onStart(e.clientX,e.clientY);});
    document.addEventListener('mousemove',e=>{if(drag)onMove(e.clientX,e.clientY);});
    document.addEventListener('mouseup',onEnd);
    bar.addEventListener('touchstart',e=>{const t=e.touches[0];onStart(t.clientX,t.clientY);},{passive:true});
    document.addEventListener('touchmove',e=>{if(drag){e.preventDefault();const t=e.touches[0];onMove(t.clientX,t.clientY);}},{passive:false});
    document.addEventListener('touchend',onEnd);
  },

  _makeResizable(handle, el, cfg) {
    if (!handle) return;
    let r=false, sx, sy, sw, sh;
    handle.addEventListener('mousedown',e=>{e.stopPropagation();r=true;sx=e.clientX;sy=e.clientY;sw=cfg.w;sh=cfg.h;});
    document.addEventListener('mousemove',e=>{if(!r)return;cfg.w=Math.max(160,sw+(e.clientX-sx));cfg.h=Math.max(80,sh+(e.clientY-sy));el.style.width=cfg.w+'px';el.style.height=cfg.h+'px';});
    document.addEventListener('mouseup',()=>{if(r){r=false;this._save();}});
  },
};

/* Boot sequence */
function bootWithProfile() {
  const afterLogin = () => {
    liveWP.init();
    initV11Systems();
    setTimeout(() => notchSystem.init(), 500);
    UserProfile._updateStatusBar();
    WhatsNew.init();
    DesktopWidgets.init();
  };
  if (UserProfile.exists()) {
    setTimeout(() => UserProfile.showLogin(afterLogin), 2700);
  } else {
    setTimeout(() => UserProfile.showSetup(afterLogin), 2900);
  }
}



/* ══════════════════════════════════════════════════════════════
   TOB OS v15 — FOLDERS · BEN 10 · STRANGER THINGS · PROFILE PICS
══════════════════════════════════════════════════════════════ */

/* ── FOLDER SYSTEM ── */
const FolderSystem = {
  _folders: null,

  load() {
    if (!this._folders) this._folders = LS.get('tob_folders', []);
    return this._folders;
  },

  save() { LS.set('tob_folders', this._folders); },

  createFromDrop(app1, app2, col, row) {
    const folders = this.load();
    const fid = 'folder_' + Date.now();
    const folder = {
      id: fid, isFolder: true,
      label: 'Folder',
      icon: '📁',
      apps: [app1.id, app2.id],
      color: 'rgba(0,50,120,.7)',
    };
    folders.push(folder);
    this.save();
    // Remove app2 from grid, place folder there
    delete OS.gridSlots[app2.id];
    delete OS.gridSlots[app1.id];
    OS.gridSlots[fid] = { col, row };
    LS.set('tob_grid', OS.gridSlots);
    buildDesktopIcons();
    toast('📁 Folder created!');
  },

  addToFolder(folderId, app) {
    const folders = this.load();
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;
    if (!folder.apps.includes(app.id)) {
      folder.apps.push(app.id);
      this.save();
      // Remove app from grid
      delete OS.gridSlots[app.id];
      LS.set('tob_grid', OS.gridSlots);
      buildDesktopIcons();
      toast('📁 Added to folder');
    }
  },

  removeFromFolder(folderId, appId) {
    const folders = this.load();
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;
    folder.apps = folder.apps.filter(id => id !== appId);
    if (folder.apps.length === 0) {
      this.deleteFolder(folderId);
    } else {
      this.save();
      buildDesktopIcons();
    }
  },

  deleteFolder(folderId) {
    const folders = this.load();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      // Return apps to grid
      const allApps = getAllApps();
      folder.apps.forEach((appId, i) => {
        // Find a free slot
        const taken = new Set(Object.entries(OS.gridSlots).map(([,s])=>s.col+','+s.row));
        let placed = false;
        for (let row = 0; row < GRID.rows() && !placed; row++) {
          for (let col = 0; col < GRID.cols() && !placed; col++) {
            if (!taken.has(col+','+row)) {
              OS.gridSlots[appId] = { col, row };
              taken.add(col+','+row);
              placed = true;
            }
          }
        }
      });
      this._folders = folders.filter(f => f.id !== folderId);
      delete OS.gridSlots[folderId];
      this.save();
      LS.set('tob_grid', OS.gridSlots);
      buildDesktopIcons();
      toast('📁 Folder removed, apps restored');
    }
  },

  renameFolder(folderId, name) {
    const folders = this.load();
    const folder = folders.find(f => f.id === folderId);
    if (folder) { folder.label = name; this.save(); buildDesktopIcons(); }
  },

  getAll() { return this.load(); },

  getById(id) { return this.load().find(f => f.id === id); },

  openModal(folder) {
    const modal = document.getElementById('folder-modal');
    const box = document.getElementById('folder-modal-box');
    if (!modal || !box) return;

    const allApps = getAllApps();
    const folderApps = folder.apps.map(id => allApps.find(a => a.id === id)).filter(Boolean);

    const renderModal = (folder) => {
      box.innerHTML =
        '<div class="folder-modal-top">' +
        '<div class="folder-modal-icon">📁</div>' +
        '<input class="folder-modal-name" id="fm-name-input" value="' + (folder.label||'Folder').replace(/"/g,'&quot;') + '" style="font-family:Orbitron,sans-serif;font-size:14px;font-weight:900;color:var(--text);background:none;border:none;outline:none;flex:1;" onchange="FolderSystem.renameFolder(\''+folder.id+'\',this.value)">' +
        '<button class="folder-modal-rename" onclick="document.getElementById(\'fm-name-input\').focus()" title="Rename">✏️</button>' +
        '<button class="folder-modal-close" onclick="FolderSystem.closeModal()">✕</button>' +
        '</div>' +
        (folderApps.length ?
          '<div class="folder-modal-grid">' +
          folderApps.map(app =>
            '<div class="folder-app-item">' +
            '<div class="folder-app-img" style="background:' + (app.color||'var(--panel)') + '">' + (app.icon||'📱') + '</div>' +
            '<div class="folder-app-lbl">' + (app.label||app.id).replace('\n',' ') + '</div>' +
            '<div style="display:flex;gap:4px;margin-top:3px">' +
            '<button onclick="openApp(\''+app.id+'\');FolderSystem.closeModal()" style="padding:2px 8px;border-radius:5px;background:rgba(0,180,255,.12);border:1px solid rgba(0,180,255,.25);color:var(--neon);font-size:8px;cursor:pointer;font-family:Share Tech Mono,monospace">OPEN</button>' +
            '<button onclick="FolderSystem.removeFromFolder(\''+folder.id+'\',\''+app.id+'\');FolderSystem.closeModal()" style="padding:2px 6px;border-radius:5px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.25);color:var(--accent);font-size:8px;cursor:pointer;font-family:Share Tech Mono,monospace">✕</button>' +
            '</div>' +
            '</div>'
          ).join('') +
          '</div>'
          :
          '<div class="folder-empty-hint"><span>📂</span><p>FOLDER IS EMPTY</p></div>'
        ) +
        '<div style="padding:10px 16px;border-top:1px solid rgba(0,180,255,.1);display:flex;gap:8px">' +
        '<button onclick="FolderSystem.deleteFolder(\''+folder.id+'\');FolderSystem.closeModal()" style="padding:6px 14px;border-radius:8px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent);font-family:Orbitron,sans-serif;font-size:9px;font-weight:700;cursor:pointer;letter-spacing:1px">🗑 DELETE FOLDER</button>' +
        '</div>';
    };

    renderModal(folder);
    modal.classList.add('open');
    modal.onclick = (e) => { if (e.target === modal) this.closeModal(); };
    document.addEventListener('keydown', this._escHandler = (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  },

  closeModal() {
    const modal = document.getElementById('folder-modal');
    if (modal) modal.classList.remove('open');
    document.removeEventListener('keydown', this._escHandler);
  },
};

/* folder wrappers moved inline */

/* Build the folder desktop icon */
FolderSystem._makeFolderIcon = function(folder, slot) {
  const div = document.createElement('div');
  div.className = 'desk-folder';
  div.dataset.folderId = folder.id;

  const allApps = BUILTIN_APPS.concat(OS.customApps);
  const previewApps = folder.apps.slice(0, 4).map(id => allApps.find(a => a.id === id)).filter(Boolean);
  const minis = Array.from({ length: 4 }, (_, i) => {
    const a = previewApps[i];
    return '<div class="folder-mini-icon">' + (a ? (a.icon || '📱') : '') + '</div>';
  }).join('');

  positionIcon(div, slot.col, slot.row);

  div.innerHTML =
    '<div class="folder-img" style="background:' + (folder.color || 'rgba(0,50,120,.7)') + '">' + minis + '</div>' +
    '<div class="folder-lbl">' + (folder.label || 'Folder') + '</div>';

  div.addEventListener('click', () => {
    if (_deleteMode) return;
    FolderSystem.openModal(folder);
  });

  // Allow dragging folder itself
  div.addEventListener('mousedown', startIconDrag.bind(null, div, { ...folder, icon: '📁' }));
  div.addEventListener('touchstart', e => startIconDrag(div, { ...folder, icon: '📁' }, e.touches[0]), { passive: true });

  // Show folder-drop-target highlight when another icon is dragged over
  div.addEventListener('dragover', () => div.classList.add('folder-drop-target'));
  div.addEventListener('dragleave', () => div.classList.remove('folder-drop-target'));

  return div;
};

/* ── BACKTICK KEY LOCK ── */
document.addEventListener('keydown', (e) => {
  if (e.key === '`') {
    e.preventDefault();
    window.lockScreen();
    toast('🔒 Screen locked');
  }
});



/* ── RHYTHM FORGE APP ── */
function buildRhythmForgeApp(body){
  body.style.cssText='overflow:hidden;padding:0;';
  // Use the catalog entry's htmlApp which is already stored as a template literal
  const catalogApp=APP_STORE_CATALOG.find(a=>a.id==='as_rhythmforge');
  if(catalogApp&&catalogApp.htmlApp){
    const iframe=document.createElement('iframe');
    iframe.style.cssText='width:100%;height:100%;border:none;display:block;';
    iframe.srcdoc=catalogApp.htmlApp;
    body.appendChild(iframe);
  } else {
    // Fallback: open from store
    body.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;font-family:Orbitron,monospace;background:var(--bg)"><div style="font-size:48px">🎵</div><div style="font-size:12px;color:var(--neon);letter-spacing:3px">RHYTHMFORGE</div><div style="font-size:10px;color:var(--text-dim);font-family:Share Tech Mono,monospace">Available in App Store → Music</div><button onclick="openAppStore()" style="padding:8px 20px;border-radius:20px;background:linear-gradient(135deg,#3300aa,#6600ff);border:none;color:#fff;cursor:pointer;font-family:Orbitron,monospace;font-size:9px">OPEN APP STORE</button></div>';
  }
}

/* ── MIRACULOUS LADYBUG FX ── */
const MIRACULOUS_FORMS = [
  'LUCKY CHARM!','CAT NOIR!','CATACLYSM!','MIRACULOUS LADYBUG!',
  'TIKKI SPOTS ON!','PLAGG CLAWS OUT!','AKUMA DETECTED!','HEROES UNITE!'
];
const MiraculousFX = {
  _tickInt: null, _spotRaf: null, _formIdx: 0, _cooldown: false,

  init() {
    this._buildOverlay();
    this._startSpotAnimation();
    const hud = document.getElementById('kwami-hud');
    if (hud) hud.style.display = 'block';
    if (!this._tickInt) {
      this._tickInt = setInterval(() => {
        const ring = document.querySelector('.kwami-ring');
        if (ring) { ring.classList.add('active'); setTimeout(() => ring.classList.remove('active'), 300); }
      }, 5000);
    }
  },

  _buildOverlay() {
    const ov = document.getElementById('miraculous-overlay');
    if (!ov) return;
    ov.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;opacity:0.06;';
    canvas.id = 'mir-canvas';
    ov.appendChild(canvas);
    canvas.width = innerWidth; canvas.height = innerHeight;
    window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; });
  },

  _startSpotAnimation() {
    const loop = () => {
      const canvas = document.getElementById('mir-canvas');
      if (!canvas) return;
      this._spotRaf = requestAnimationFrame(loop);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw scattered black spots (ladybug pattern)
      const time = Date.now() * 0.0005;
      ctx.fillStyle = '#ff0055';
      for (let i = 0; i < 18; i++) {
        const x = (Math.sin(i * 137.5 + time * 0.3) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(i * 97.1 + time * 0.2) * 0.5 + 0.5) * canvas.height;
        const r = 20 + Math.sin(i + time) * 8;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    };
    loop();
  },

  trigger() {
    if (this._cooldown) return;
    this._cooldown = true;
    const flash = document.getElementById('miraculous-flash');
    if (flash) { flash.classList.add('flash'); setTimeout(() => flash.classList.remove('flash'), 700); }
    const badge = document.querySelector('.miraculous-badge');
    const text = MIRACULOUS_FORMS[this._formIdx % MIRACULOUS_FORMS.length];
    this._formIdx++;
    if (badge) { badge.textContent = text; badge.classList.add('show'); setTimeout(() => badge.classList.remove('show'), 2300); }
    // Sound
    try {
      const ac = new AudioContext();
      const o = ac.createOscillator(); const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(660, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(1320, ac.currentTime + 0.15);
      o.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.4);
      g.gain.setValueAtTime(0.07, ac.currentTime);
      g.gain.linearRampToValueAtTime(0, ac.currentTime + 0.5);
      o.start(); o.stop(ac.currentTime + 0.5);
    } catch(e) {}
    setTimeout(() => this._cooldown = false, 2600);
  },

  destroy() {
    clearInterval(this._tickInt); this._tickInt = null;
    cancelAnimationFrame(this._spotRaf);
    const ov = document.getElementById('miraculous-overlay');
    if (ov) ov.innerHTML = '';
    const hud = document.getElementById('kwami-hud');
    if (hud) hud.style.display = 'none';
  },
};

/* ── JUJUTSU KAISEN FX ── */
const JJK_DOMAINS = [
  { name: 'UNLIMITED VOID', sub: 'Satoru Gojo · Infinity Unfolds' },
  { name: 'MALEVOLENT SHRINE', sub: 'Ryomen Sukuna · Dismantle & Cleave' },
  { name: 'COFFIN OF THE IRON MOUNTAIN', sub: 'Choso · Blood Manipulation' },
  { name: 'CHIMERA SHADOW GARDEN', sub: 'Megumi Fushiguro · Ten Shadows' },
  { name: 'HORIZON OF THE CAPTIVATING SKANDHA', sub: 'Mahito · Idle Transfiguration' },
  { name: 'HORIZON OF THE PROMISED LAND', sub: 'Hiromi Higuruma · Deadly Sentencing' },
];
const JJK_CURSES = ['DIVERGENT FIST','BLACK FLASH','REVERSED CURSED TECHNIQUE','DOMAIN AMPLIFICATION','SIMPLE DOMAIN'];

const JJKFxSystem = {
  _curseRaf: null, _tickInt: null, _domainIdx: 0, _cooldown: false,

  init() {
    this._buildCurseOverlay();
    this._startCurseEnergy();
    const hud = document.getElementById('domain-hud');
    if (hud) hud.style.display = 'block';
    if (!this._tickInt) {
      this._tickInt = setInterval(() => {
        const ring = document.querySelector('.domain-ring');
        if (ring) ring.style.boxShadow = `0 0 ${18+Math.random()*12}px #6600ff,0 0 40px rgba(100,0,255,.4)`;
      }, 500);
    }
  },

  _buildCurseOverlay() {
    const ov = document.getElementById('jjk-overlay');
    if (!ov) return;
    ov.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'jjk-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    ov.appendChild(canvas);
    canvas.width = innerWidth; canvas.height = innerHeight;
    window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; });
  },

  _startCurseEnergy() {
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 3 + 1,
      a: Math.random() * 0.12 + 0.03,
      hue: 240 + Math.random() * 60,
    }));
    const loop = () => {
      const canvas = document.getElementById('jjk-canvas');
      if (!canvas) return;
      this._curseRaf = requestAnimationFrame(loop);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.a})`;
        ctx.shadowColor = `hsl(${p.hue},100%,60%)`;
        ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
        // Tendrils
        if (Math.random() < 0.01) {
          ctx.strokeStyle = `hsla(${p.hue},80%,50%,.06)`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (Math.random() - 0.5) * 80, p.y + (Math.random() - 0.5) * 80);
          ctx.stroke();
        }
      });
    };
    loop();
  },

  triggerDomain() {
    if (this._cooldown) return;
    this._cooldown = true;
    const domain = JJK_DOMAINS[this._domainIdx % JJK_DOMAINS.length];
    this._domainIdx++;
    // Show domain expansion screen
    const screen = document.querySelector('.domain-expansion-screen');
    if (!screen) {
      this._showDomainOverlay(domain);
    } else {
      screen.remove();
    }
    this._showDomainOverlay(domain);
    setTimeout(() => this._cooldown = false, 4000);
  },

  _showDomainOverlay(domain) {
    const ov = document.createElement('div');
    ov.className = 'domain-expansion-screen show';
    ov.innerHTML = `
      <div class="domain-circle" style="border-color:rgba(100,0,255,.3);"></div>
      <div class="domain-circle" style="width:300px;height:300px;animation-delay:.1s;border-color:rgba(100,0,255,.2);"></div>
      <div class="domain-circle" style="width:400px;height:400px;animation-delay:.2s;border-color:rgba(100,0,255,.1);"></div>
      <div style="position:relative;z-index:10;text-align:center">
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(150,80,255,.5);letter-spacing:4px;margin-bottom:10px">BARRIER TECHNIQUE</div>
        <div class="domain-name-text">DOMAIN EXPANSION:</div>
        <div style="font-family:Orbitron,sans-serif;font-size:clamp(14px,2.5vw,22px);font-weight:900;color:#fff;letter-spacing:3px;margin-top:6px;text-shadow:0 0 40px #6600ff">${domain.name}</div>
        <div class="domain-sub-text" style="margin-top:12px">${domain.sub}</div>
      </div>`;
    ov.onclick = () => ov.remove();
    document.body.appendChild(ov);
    // Auto-remove after 3.5 seconds
    setTimeout(() => ov && ov.remove(), 3500);
    // Sound
    try {
      const ac = new AudioContext();
      const o = ac.createOscillator(); const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'square';
      o.frequency.setValueAtTime(110, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(55, ac.currentTime + 0.8);
      g.gain.setValueAtTime(0.06, ac.currentTime);
      g.gain.linearRampToValueAtTime(0, ac.currentTime + 1.2);
      o.start(); o.stop(ac.currentTime + 1.2);
    } catch(e) {}
  },

  destroy() {
    clearInterval(this._tickInt); this._tickInt = null;
    cancelAnimationFrame(this._curseRaf);
    const ov = document.getElementById('jjk-overlay');
    if (ov) ov.innerHTML = '';
    const hud = document.getElementById('domain-hud');
    if (hud) hud.style.display = 'none';
    document.querySelectorAll('.domain-expansion-screen').forEach(el => el.remove());
  },
};

/* ── BEN 10 OMNITRIX FX ── */
const ALIENS = ['HEATBLAST','DIAMONDHEAD','UPGRADE','GHOSTFREAK','WILDMUTT','FOURARMS','STINKFLY','RIPJAWS','XLRG8','GREYMATTER'];
const OmnitrixFX = {
  _raf: null,
  _aliensIdx: 0,
  _cooldown: false,

  init() {
    const ring = document.getElementById('omnitrix-ring');
    if (ring) ring.style.display = '';
    // Pulse the omnitrix ring continuously
    if (!this._tickInt) {
      this._tickInt = setInterval(() => {
        const ring = document.getElementById('omnitrix-ring');
        if (!ring) return;
        ring.classList.toggle('active');
        setTimeout(() => ring.classList.remove('active'), 300);
      }, 4000);
    }
  },

  trigger() {
    if (this._cooldown) return;
    this._cooldown = true;
    // Green flash
    const flash = document.getElementById('omnitrix-flash');
    if (flash) { flash.classList.add('flash'); setTimeout(() => flash.classList.remove('flash'), 600); }
    // Show alien name
    const badge = document.getElementById('alien-badge');
    const alien = ALIENS[this._aliensIdx % ALIENS.length];
    this._aliensIdx++;
    if (badge) { badge.textContent = alien; badge.classList.add('show'); setTimeout(() => badge.classList.remove('show'), 2200); }
    // Activate ring
    const ring = document.getElementById('omnitrix-ring');
    if (ring) { ring.classList.add('active'); setTimeout(() => ring.classList.remove('active'), 1200); }
    // Sound
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      const o = ac.createOscillator(); const g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'square';
      o.frequency.setValueAtTime(880, ac.currentTime);
      o.frequency.exponentialRampToValueAtTime(220, ac.currentTime + 0.3);
      g.gain.setValueAtTime(0.08, ac.currentTime);
      g.gain.linearRampToValueAtTime(0, ac.currentTime + 0.5);
      o.start(); o.stop(ac.currentTime + 0.5);
    } catch (e) {}
    setTimeout(() => this._cooldown = false, 2500);
  },
};


/* ── PETS APP ── */
function buildPetsApp(body){
  body.style.cssText='overflow:hidden;padding:0;background:var(--bg);';
  body.innerHTML=`<div style="width:100%;height:100%;display:flex;flex-direction:column;">
    <div style="padding:10px 14px;border-bottom:1px solid var(--panel-border);font-family:'Orbitron',sans-serif;font-size:10px;color:var(--neon);letter-spacing:3px;flex-shrink:0">🐱 DESKTOP PETS</div>
    <div style="flex:1;padding:14px;overflow-y:auto;">
      <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim);margin-bottom:14px;line-height:2">Choose a pet to add to your desktop! Pets wander around and react to your cursor.</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">
        ${['🐱 Cat','🐶 Dog','🦊 Fox','🐸 Frog','🐧 Penguin','🦆 Duck','🐭 Mouse','🐰 Bunny','🦋 Butterfly'].map((p,i)=>{
          const [icon,name]=p.split(' ');
          return `<div onclick="spawnPet('${icon}','${name}')" style="background:var(--panel);border:1px solid var(--panel-border);border-radius:12px;padding:14px;text-align:center;cursor:pointer;transition:all .18s" onmouseover="this.style.borderColor='rgba(0,180,255,.5)'" onmouseout="this.style.borderColor='var(--panel-border)'">
            <div style="font-size:32px;margin-bottom:6px">${icon}</div>
            <div style="font-size:11px;font-weight:600;color:var(--text)">${name}</div>
            <div style="font-size:9px;color:var(--text-muted);font-family:Share Tech Mono,monospace;margin-top:4px">Click to add</div>
          </div>`;
        }).join('')}
      </div>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--panel-border)">
        <div style="font-family:'Orbitron',sans-serif;font-size:9px;color:var(--text-muted);letter-spacing:2px;margin-bottom:8px">ACTIVE PETS</div>
        <div id="active-pets-list" style="font-family:'Share Tech Mono',monospace;font-size:10px;color:var(--text-dim)">No pets active.</div>
        <button onclick="clearAllPets()" style="margin-top:8px;padding:6px 14px;border-radius:8px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent);font-family:'Orbitron',sans-serif;font-size:9px;cursor:pointer">🗑 REMOVE ALL PETS</button>
      </div>
    </div>
  </div>`;
  refreshPetList(body);
}
const _pets=[];
function spawnPet(icon,name){
  const div=document.createElement('div');
  div.style.cssText=`position:fixed;z-index:200;font-size:28px;pointer-events:none;user-select:none;cursor:default;transition:left .8s ease,top .8s ease;`;
  div.textContent=icon;
  div.dataset.petIcon=icon; div.dataset.petName=name;
  const startX=Math.random()*(innerWidth-80)+20;
  const startY=Math.random()*(innerHeight-200)+50;
  div.style.left=startX+'px'; div.style.top=startY+'px';
  document.body.appendChild(div);
  _pets.push(div);
  // Wander behavior
  const wander=()=>{
    if(!document.body.contains(div))return;
    const nx=Math.max(20,Math.min(innerWidth-60,parseFloat(div.style.left)+(Math.random()-0.5)*120));
    const ny=Math.max(50,Math.min(innerHeight-120,parseFloat(div.style.top)+(Math.random()-0.5)*80));
    div.style.left=nx+'px'; div.style.top=ny+'px';
    setTimeout(wander,900+Math.random()*1800);
  };
  setTimeout(wander,1000);
  toast(`${icon} ${name} added to desktop!`);
  // Refresh active pets list in the window if open
  const petBody=WM.windows.get('pets')&&WM.windows.get('pets').body;
  if(petBody) refreshPetList(petBody);
}
function clearAllPets(){
  _pets.forEach(p=>p.remove()); _pets.length=0;
  const petBody=WM.windows.get('pets')&&WM.windows.get('pets').body;
  if(petBody) refreshPetList(petBody);
  toast('🗑 All pets removed');
}
function refreshPetList(body){
  const el=body&&body.querySelector('#active-pets-list');
  if(!el)return;
  if(!_pets.length){el.textContent='No pets active.';return;}
  el.innerHTML=_pets.map((p,i)=>`<span style="margin-right:10px">${p.dataset.petIcon} ${p.dataset.petName} <span onclick="removePet(${i})" style="color:var(--accent);cursor:pointer;pointer-events:all">✕</span></span>`).join('');
}
function removePet(i){
  if(_pets[i]){_pets[i].remove();_pets.splice(i,1);}
  const petBody=WM.windows.get('pets')&&WM.windows.get('pets').body;
  if(petBody) refreshPetList(petBody);
}
/* ── STRANGER THINGS FX ── */
const StrangerFX = {
  _vines: [],
  _lights: [],
  _lightsInt: null,

  init() {
    this._buildVines();
    this._buildStringLights();
  },

  _buildVines() {
    const overlay = document.getElementById('stranger-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    const W = innerWidth, H = innerHeight;
    // Draw SVG vines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.style.cssText = 'position:absolute;inset:0;opacity:0.18;';
    // Generate organic vine paths
    for (let i = 0; i < 14; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const sx = Math.random() * W, sy = Math.random() * H;
      const ex = sx + (Math.random() - 0.5) * 400, ey = sy + (Math.random() - 0.5) * 300;
      const mx = (sx + ex) / 2 + (Math.random() - 0.5) * 200;
      const my = (sy + ey) / 2 + (Math.random() - 0.5) * 200;
      path.setAttribute('d', `M${sx},${sy} Q${mx},${my} ${ex},${ey}`);
      path.setAttribute('stroke', '#cc1010');
      path.setAttribute('stroke-width', 1 + Math.random() * 2.5);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
      // Tendrils
      for (let j = 0; j < 3; j++) {
        const t = 0.3 + Math.random() * 0.4;
        const bx = sx + (ex - sx) * t + (Math.random() - 0.5) * 80;
        const by = sy + (ey - sy) * t + (Math.random() - 0.5) * 80;
        const tendril = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tendril.setAttribute('x1', sx + (ex - sx) * t);
        tendril.setAttribute('y1', sy + (ey - sy) * t);
        tendril.setAttribute('x2', bx); tendril.setAttribute('y2', by);
        tendril.setAttribute('stroke', '#aa0808');
        tendril.setAttribute('stroke-width', 0.8);
        svg.appendChild(tendril);
      }
    }
    // Corner particles (spores)
    for (let i = 0; i < 30; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', Math.random() * W);
      circle.setAttribute('cy', Math.random() * H);
      circle.setAttribute('r', 1.5 + Math.random() * 3);
      circle.setAttribute('fill', 'rgba(200,10,10,' + (0.3 + Math.random() * 0.4) + ')');
      svg.appendChild(circle);
    }
    overlay.appendChild(svg);
  },

  _buildStringLights() {
    const container = document.getElementById('string-lights');
    if (!container) return;
    container.innerHTML = '';
    const COLORS = ['#ff2020','#ff8800','#ffff00','#00ff44','#4488ff','#cc44ff','#ff44aa','#00ffff'];
    const count = Math.floor(innerWidth / 28);
    for (let i = 0; i < count; i++) {
      const bulb = document.createElement('div');
      bulb.className = 'light-bulb';
      bulb.style.left = (i * (innerWidth / count)) + 'px';
      bulb.style.background = COLORS[i % COLORS.length];
      bulb.style.boxShadow = '0 0 6px ' + COLORS[i % COLORS.length];
      bulb.style.animationDelay = (Math.random() * 3) + 's';
      bulb.style.animationDuration = (1.5 + Math.random() * 3) + 's';
      container.appendChild(bulb);
    }
  },

  destroy() {
    const overlay = document.getElementById('stranger-overlay');
    const lights = document.getElementById('string-lights');
    if (overlay) overlay.innerHTML = '';
    if (lights) lights.innerHTML = '';
    clearInterval(this._lightsInt);
  },
};

/* ── PROFILE PICTURE SUPPORT ── */
UserProfile._handlePicUpload = function(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) { toast('\u26a0 Image too large (max 2MB)'); return; }
  const r = new FileReader();
  r.onload = ev => {
    const p = UserProfile.get() || { name: 'User', avatar: '\ud83e\uddd1', pinHash: null };
    p.profilePic = ev.target.result;
    UserProfile.save(p);
    UserProfile._updateStatusBar();
    // Update preview in setup/edit dialog if open
    const prev = document.getElementById('profile-pic-img');
    if (prev) prev.src = p.profilePic;
    const prevWrap = document.getElementById('profile-pic-preview-wrap');
    if (prevWrap) prevWrap.innerHTML = '<img id="profile-pic-img" src="' + p.profilePic + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover">';
    toast('\u2714 Profile picture updated!');
  };
  r.readAsDataURL(file);
  e.target.value = '';
};

/* Patch showSetup/showEdit to include pic upload UI */
const _origShowSetup = UserProfile.showSetup.bind(UserProfile);
UserProfile.showSetup = function(onDone) {
  _origShowSetup(onDone);
  // After the dialog renders, inject pic UI
  setTimeout(() => {
    const dialog = document.getElementById('psetup-dialog');
    if (!dialog) return;
    const avRow = dialog.querySelector('.psetup-avatar-row');
    if (!avRow) return;
    const p = UserProfile.get();
    const picSection = document.createElement('div');
    picSection.className = 'psetup-field';
    picSection.innerHTML =
      '<span class="psetup-label">PROFILE PICTURE (OPTIONAL)</span>' +
      '<div class="profile-pic-wrap">' +
      '<div class="profile-pic-preview" id="profile-pic-preview-wrap" onclick="document.getElementById(\'profile-pic-input\').click()">' +
      (p && p.profilePic
        ? '<img id="profile-pic-img" src="' + p.profilePic + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover">'
        : '<span style="font-size:38px">📷</span>') +
      '</div>' +
      '<div class="profile-pic-hint">Click to upload a photo</div>' +
      '<div class="profile-pic-btns">' +
      '<div class="profile-pic-btn" onclick="document.getElementById(\'profile-pic-input\').click()">📷 Upload Photo</div>' +
      '<div class="profile-pic-btn" onclick="UserProfile._removePic()">✕ Remove</div>' +
      '</div></div>';
    avRow.parentElement.insertBefore(picSection, avRow.parentElement.firstChild);
  }, 50);
};

UserProfile._removePic = function() {
  const p = UserProfile.get();
  if (p) { delete p.profilePic; UserProfile.save(p); UserProfile._updateStatusBar(); }
  const prevWrap = document.getElementById('profile-pic-preview-wrap');
  if (prevWrap) prevWrap.innerHTML = '<span style="font-size:38px">📷</span>';
  toast('🗑 Profile picture removed');
};

/* Update status bar to show profile pic if set */
const _origUpdateStatusBar = UserProfile._updateStatusBar.bind(UserProfile);
UserProfile._updateStatusBar = function() {
  _origUpdateStatusBar();
  const p = this.get();
  const btn = document.getElementById('sb-profile-btn');
  if (btn && p && p.profilePic) {
    const av = btn.querySelector('.sb-profile-avatar');
    if (av) av.innerHTML = '<img src="' + p.profilePic + '" style="width:16px;height:16px;border-radius:50%;object-fit:cover;vertical-align:middle">';
  }
};

/* Patch showLogin to show profile pic */
const _origShowLogin = UserProfile.showLogin.bind(UserProfile);
UserProfile.showLogin = function(onSuccess) {
  _origShowLogin(onSuccess);
  const p = this.get();
  if (p && p.profilePic) {
    setTimeout(() => {
      const av = document.querySelector('.ulogin-avatar');
      if (av) av.innerHTML = '<img src="' + p.profilePic + '" style="width:86px;height:86px;border-radius:50%;object-fit:cover"><div class="ulogin-avatar-badge">\uD83D\uDD12</div>';
    }, 50);
  }
};


/* ── INIT NEW SYSTEMS ── */
function initV11Systems(){
  BOOT_ANIM.init();
  TaskbarPro.init();
  setTimeout(()=>WidgetSystem.init(),300);
}


/* ═══════════════════════════════════════════════════════════════════════════
   TOBOS UPDATE 17 — FULL JS PATCH
   PASTE THIS ENTIRE BLOCK JUST BEFORE THE CLOSING <\/script> TAG
   OF THE MAIN SCRIPT (at the very end of the huge <script> block)
═══════════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────
   SECTION 1: CUSTOM CURSOR SYSTEM
───────────────────────────────────────────────────── */
const CursorSystem = {
  cv:null, ctx:null,
  x:innerWidth/2, y:innerHeight/2, px:0, py:0,
  state:'idle', frame:0,
  particles:[],
  idleTimer:null,
  enabled:LS.get('tob_cursor_enabled',true),
  theme:'default',

  THEMES:{
    default:{col:'#00b4ff',glow:'#00b4ff',acc:'#00ffcc',sz:16},
    jjk:    {col:'#6600ff',glow:'#aa44ff',acc:'#cc44ff',sz:17},
    blue_lock:{col:'#0055ff',glow:'#4488ff',acc:'#00ccff',sz:16},
    miraculous:{col:'#ff0055',glow:'#ff66aa',acc:'#cc0044',sz:17},
    ben10:  {col:'#00e050',glow:'#00ff88',acc:'#55ff88',sz:16},
    stranger:{col:'#cc1010',glow:'#ff4444',acc:'#ff6666',sz:15},
    gold:   {col:'#ffd700',glow:'#ffcc00',acc:'#ffaa00',sz:16},
    neon:   {col:'#ff2d9e',glow:'#ff80cc',acc:'#ff00cc',sz:16},
  },

  init(){
    if(!this.enabled) return;
    this._buildCanvas();
    this._bindEvents();
    this._syncTheme();
    this._loop();
  },

  _buildCanvas(){
    const cv=document.createElement('canvas');
    cv.id='tob-cursor-cv';
    cv.style.cssText='position:fixed;inset:0;z-index:99999;pointer-events:none;';
    document.body.appendChild(cv);
    this.cv=cv; this.ctx=cv.getContext('2d');
    const rz=()=>{cv.width=innerWidth;cv.height=innerHeight;};
    rz(); addEventListener('resize',rz,{passive:true});
    document.documentElement.classList.add('cursor-custom');
  },

  _bindEvents(){
    document.addEventListener('mousemove',e=>{
      this.px=this.x; this.py=this.y;
      this.x=e.clientX; this.y=e.clientY;
      const moved=Math.abs(this.x-this.px)+Math.abs(this.y-this.py);
      if(moved>1.5){
        this.setState('move');
        const t=this._t();
        if(Math.random()<.65) this.particles.push({
          x:this.x+(Math.random()-.5)*3, y:this.y+(Math.random()-.5)*3,
          vx:(Math.random()-.5)*.7, vy:(Math.random()-.5)*.7,
          life:1, r:Math.random()*2.2+.8, col:t.col, burst:false
        });
      }
    },{passive:true});

    document.addEventListener('mousedown',e=>{
      if(e.button===0){this.setState('lclick');this._burst(e.clientX,e.clientY,false);}
      if(e.button===2){this.setState('rclick');this._burst(e.clientX,e.clientY,true);}
    });
    document.addEventListener('mouseup',()=>{
      setTimeout(()=>{if(this.state!=='idle')this.setState('move');},150);
    });
  },

  _t(){return this.THEMES[this.theme]||this.THEMES.default;},

  _syncTheme(){
    setInterval(()=>{
      const tid=document.documentElement.getAttribute('data-theme-id');
      this.theme=tid&&this.THEMES[tid]?tid:'default';
    },1000);
  },

  setState(s){
    this.state=s;
    clearTimeout(this.idleTimer);
    if(s==='move') this.idleTimer=setTimeout(()=>this.setState('idle'),850);
  },

  _burst(x,y,right){
    const t=this._t(); const col=right?'#ff2d6e':t.col;
    const n=right?12:9;
    for(let i=0;i<n;i++){
      const a=(i/n)*Math.PI*2, sp=2.5+Math.random()*3.5;
      this.particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,r:1.8+Math.random()*3.5,col,burst:true});
    }
  },

  _loop(){
    requestAnimationFrame(()=>this._loop());
    if(!this.cv||!this.enabled)return;
    const cv=this.cv,ctx=this.ctx;
    ctx.clearRect(0,0,cv.width,cv.height);
    this.frame++;
    const t=this._t(),{x,y}=this;

    // Particles
    this.particles=this.particles.filter(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vx*=.93;p.vy*=.93;
      p.life-=p.burst?.055:.075;
      if(p.life<=0)return false;
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.3,p.r*p.life),0,Math.PI*2);
      const a=Math.floor(p.life*210).toString(16).padStart(2,'0');
      ctx.fillStyle=p.col+a;
      ctx.shadowColor=p.col;ctx.shadowBlur=5;ctx.fill();ctx.shadowBlur=0;
      return true;
    });

    ctx.save();
    const d={idle:()=>this._drawIdle(ctx,x,y,t),move:()=>this._drawMove(ctx,x,y,t),lclick:()=>this._drawLClick(ctx,x,y,t),rclick:()=>this._drawRClick(ctx,x,y,t)};
    (d[this.state]||d.idle)();
    ctx.restore();
  },

  _drawIdle(ctx,x,y,t){
    const f=this.frame,pulse=.72+Math.sin(f*.05)*.28,sz=t.sz;
    ctx.beginPath();ctx.arc(x,y,sz*pulse*.88,0,Math.PI*2);
    ctx.strokeStyle=t.col+'44';ctx.lineWidth=1.5;ctx.stroke();
    ctx.beginPath();ctx.arc(x,y,sz*.44*pulse,0,Math.PI*2);
    ctx.strokeStyle=t.col+'77';ctx.lineWidth=1;ctx.stroke();
    ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);
    ctx.fillStyle=t.col;ctx.shadowColor=t.glow;ctx.shadowBlur=14;ctx.fill();ctx.shadowBlur=0;
    const rot=f*.024,orb=sz*.62*pulse;
    for(let i=0;i<4;i++){
      const a=rot+(i/4)*Math.PI*2;
      ctx.beginPath();ctx.arc(x+Math.cos(a)*orb,y+Math.sin(a)*orb,1.5,0,Math.PI*2);
      ctx.fillStyle=t.acc+'aa';ctx.fill();
    }
  },

  _drawMove(ctx,x,y,t){
    const sz=t.sz;
    ctx.shadowColor=t.glow;ctx.shadowBlur=12;
    ctx.fillStyle=t.col;ctx.strokeStyle='rgba(255,255,255,.38)';ctx.lineWidth=.8;
    ctx.beginPath();
    ctx.moveTo(x,y);ctx.lineTo(x+sz*.28,y+sz*.82);
    ctx.lineTo(x+sz*.13,y+sz*.57);ctx.lineTo(x+sz*.44,y+sz*1.04);
    ctx.lineTo(x+sz*.32,y+sz*1.09);ctx.lineTo(x+sz*.04,y+sz*.61);
    ctx.lineTo(x-sz*.1,y+sz*.82);ctx.closePath();
    ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,.8)';ctx.fill();
  },

  _drawLClick(ctx,x,y,t){
    const p=(this.frame%18)/18;
    [0,.3,.6].forEach((off,i)=>{
      const pr=Math.min(1,(p+off)%1),r=t.sz*(.28+pr*.88);
      const a=Math.max(0,1-pr*1.4);
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
      ctx.strokeStyle=t.col+Math.floor(Math.max(0,a)*200).toString(16).padStart(2,'0');
      ctx.lineWidth=2.4-i*.45;ctx.shadowColor=t.glow;ctx.shadowBlur=7+a*8;
      ctx.stroke();ctx.shadowBlur=0;
    });
    ctx.beginPath();ctx.arc(x,y,4.5,0,Math.PI*2);
    ctx.fillStyle='#ffffff';ctx.shadowColor=t.glow;ctx.shadowBlur=20;ctx.fill();ctx.shadowBlur=0;
  },

  _drawRClick(ctx,x,y,t){
    const p=(this.frame%22)/22;
    ctx.save();ctx.translate(x,y);ctx.rotate(p*Math.PI*2);
    ctx.shadowColor='#ff2d6e';ctx.shadowBlur=16;
    const pts=8,outer=t.sz*.88,inner=t.sz*.36;
    ctx.beginPath();
    for(let i=0;i<pts*2;i++){
      const a=(i/pts)*Math.PI,r=i%2?inner:outer;
      i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
    }
    ctx.closePath();
    const g=ctx.createRadialGradient(0,0,0,0,0,outer);
    g.addColorStop(0,'rgba(255,80,80,.95)');g.addColorStop(1,'rgba(200,0,60,.7)');
    ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;ctx.restore();
    ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();
  },

  setEnabled(v){
    this.enabled=v;LS.set('tob_cursor_enabled',v);
    const cv=document.getElementById('tob-cursor-cv');
    if(v){document.documentElement.classList.add('cursor-custom');if(cv)cv.style.display='block';}
    else{document.documentElement.classList.remove('cursor-custom');if(cv)cv.style.display='none';}
    toast('🖱 Cursor: '+(v?'Custom ON':'System cursor'));
  },

  setTheme(t){
    this.theme=t;LS.set('tob_cursor_theme',t);
    toast('🖱 Cursor style: '+t);
  },
};

/* ─────────────────────────────────────────────────────
   SECTION 2: THEME VAULT APP
───────────────────────────────────────────────────── */
function buildThemeVaultApp(body){
  body.style.cssText='overflow:hidden;padding:0;';
  const applyMod_safe=(id,enabled)=>{
    const m=getActiveMods().find(x=>x.id===id);
    if(m){m.enabled=enabled;applyMod(m);LS.set('tob_mod_'+id,enabled);}
  };
  const clearTheme=()=>{
    ['ben10','stranger','miraculous','jjk','blue_lock'].forEach(id=>applyMod_safe(id,false));
    document.documentElement.removeAttribute('data-theme-id');
    ['--neon','--neon2','--neon3','--accent','--bg','--bg2'].forEach(v=>document.documentElement.style.removeProperty(v));
    const scanlines=document.getElementById('scanlines');if(scanlines)scanlines.style.opacity='';
    stopMatrixRain&&stopMatrixRain();
  };

  const CATALOG=[
    {id:'dark',   name:'Dark Nexus',     icon:'🌙', desc:'Default neon blue dark',       preview:'◈ DARK MODE',         textCol:'#00b4ff', bg:'linear-gradient(135deg,#010812,#001840)', cols:['#00b4ff','#00ffcc','#010812'], active:()=>document.documentElement.getAttribute('data-theme')==='dark'&&!document.documentElement.getAttribute('data-theme-id'), apply:()=>{clearTheme();applyTheme('dark');}},
    {id:'light',  name:'Light Mode',     icon:'☀️',  desc:'Clean blue-white',             preview:'◈ LIGHT',             textCol:'#0066cc', bg:'linear-gradient(135deg,#daeeff,#c4e4ff)', cols:['#0066cc','#007755','#daeeff'], active:()=>document.documentElement.getAttribute('data-theme')==='light', apply:()=>{clearTheme();applyTheme('light');}},
    {id:'ben10',  name:'Ben 10',          icon:'🟢', desc:'Omnitrix green + alien FX',    preview:'GOING HERO',          textCol:'#00e050', bg:'linear-gradient(135deg,#020d06,#003312)', cols:['#00e050','#55ff88','#020d06'], active:()=>document.documentElement.getAttribute('data-theme-id')==='ben10', apply:()=>{clearTheme();applyMod_safe('ben10',true);OmnitrixFX.init&&OmnitrixFX.init();}},
    {id:'stranger',name:'Stranger Things',icon:'🔴',  desc:'Upside Down red + vine overlay',preview:'UPSIDE DOWN',       textCol:'#cc1010', bg:'linear-gradient(135deg,#030002,#220000)', cols:['#cc1010','#ff4444','#030002'], active:()=>document.documentElement.getAttribute('data-theme-id')==='stranger', apply:()=>{clearTheme();applyMod_safe('stranger',true);StrangerFX&&StrangerFX.init();}},
    {id:'miraculous',name:'Miraculous',  icon:'🐞', desc:'Spotted pink/red Ladybug UI',  preview:'LUCKY CHARM!',        textCol:'#ff0055', bg:'linear-gradient(135deg,#0a000a,#2a0015)', cols:['#ff0055','#ff66aa','#0a000a'], active:()=>document.documentElement.getAttribute('data-theme-id')==='miraculous', apply:()=>{clearTheme();applyMod_safe('miraculous',true);MiraculousFX&&MiraculousFX.init();}},
    {id:'jjk',    name:'Jujutsu Kaisen',  icon:'💜', desc:'Cursed energy purple + Domain Expansion', preview:'DOMAIN EXPANSION', textCol:'#6600ff', bg:'linear-gradient(135deg,#050005,#1a0030)', cols:['#6600ff','#aa44ff','#050005'], active:()=>document.documentElement.getAttribute('data-theme-id')==='jjk', apply:()=>{clearTheme();applyMod_safe('jjk',true);JJKFxSystem&&JJKFxSystem.init();}},
    {id:'blue_lock',name:'Blue Lock',    icon:'⚽', desc:'Striker blue ego UI',          preview:'EGO AWAKENED',        textCol:'#0055ff', bg:'linear-gradient(135deg,#000510,#001040)', cols:['#0055ff','#4488ff','#000510'], active:()=>document.documentElement.getAttribute('data-theme-id')==='blue_lock', apply:()=>{clearTheme();document.documentElement.setAttribute('data-theme-id','blue_lock');document.documentElement.style.setProperty('--neon','#0055ff');document.documentElement.style.setProperty('--neon2','#0033cc');document.documentElement.style.setProperty('--neon3','#4488ff');document.documentElement.style.setProperty('--accent','#0055ff');applyWallpaper('wp-energy');}},
    {id:'matrix', name:'Matrix Rain',    icon:'💚', desc:'Green matrix rain overlay',    preview:'FOLLOW THE RABBIT',   textCol:'#00ff41', bg:'linear-gradient(135deg,#000500,#001800)', cols:['#00ff41','#00cc33','#000500'], active:()=>false, apply:()=>{clearTheme();document.documentElement.style.setProperty('--neon','#00ff41');document.documentElement.style.setProperty('--neon3','#55ff88');applyMod_safe('matrix_bg',true);const s=document.getElementById('scanlines');if(s)s.style.opacity='.55';}},
    {id:'gold',   name:'Gold Nexus',      icon:'🏆', desc:'Premium gold accent',          preview:'◈ GOLD TIER',        textCol:'#ffd700', bg:'linear-gradient(135deg,#0a0800,#201500)', cols:['#ffd700','#ffaa00','#0a0800'], active:()=>false, apply:()=>{clearTheme();document.documentElement.style.setProperty('--neon','#ffd700');document.documentElement.style.setProperty('--neon2','#cc9900');document.documentElement.style.setProperty('--neon3','#ffee44');document.documentElement.style.setProperty('--accent','#ff8800');}},
    {id:'crimson',name:'Crimson Blade',   icon:'⚔️', desc:'Deep red combat mode',         preview:'◈ BATTLE MODE',      textCol:'#cc1122', bg:'linear-gradient(135deg,#080004,#200008)', cols:['#cc1122','#ff3344','#080004'], active:()=>false, apply:()=>{clearTheme();document.documentElement.style.setProperty('--neon','#cc1122');document.documentElement.style.setProperty('--neon2','#880010');document.documentElement.style.setProperty('--neon3','#ff4455');document.documentElement.style.setProperty('--accent','#cc1122');applyWallpaper('wp-gradient');}},
    {id:'neon_pink',name:'Neon Pink',    icon:'🌸', desc:'Hot pink accent overlay',      preview:'◈ PINK NEON',        textCol:'#ff2d9e', bg:'linear-gradient(135deg,#0a0008,#1a0018)', cols:['#ff2d9e','#ff80cc','#0a0008'], active:()=>false, apply:()=>{clearTheme();applyMod_safe('neon_pink',true);}},
  ];

  const getCursorActive=()=>LS.get('tob_cursor_theme','default');

  const CURSORS=[
    {id:'default',  icon:'➤',  name:'DEFAULT'},
    {id:'jjk',      icon:'💜', name:'CURSED'},
    {id:'blue_lock',icon:'⚽', name:'STRIKER'},
    {id:'miraculous',icon:'🐞',name:'LUCKY'},
    {id:'ben10',    icon:'🟢', name:'OMNITRIX'},
    {id:'stranger', icon:'🔴', name:'UPSIDE DOWN'},
    {id:'gold',     icon:'🏆', name:'GOLD'},
    {id:'neon',     icon:'🌸', name:'NEON PINK'},
  ];

  const render=()=>{
    const curActive=getCursorActive();
    body.innerHTML=`<div class="tv-root">
      <div class="tv-topbar">
        <span class="tv-logo">🎨 THEME VAULT</span>
        <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted)">All themes • Cursor styles • Tamagotchis</span>
        <button class="tv-rand" onclick="__tvRandom()">🎲 RANDOM THEME</button>
      </div>
      <div class="tv-body">
        <div class="tv-sec">🎨 SYSTEM THEMES (${CATALOG.length} available)</div>
        <div class="tv-grid" id="tv-theme-grid"></div>

        <div class="tv-sec">🖱 CURSOR STYLE</div>
        <div class="tv-cursor-toggle-row">
          <span style="font-size:13px;font-weight:600;color:var(--text)">Custom Cursor</span>
          <div class="toggle-sw ${CursorSystem.enabled?'on':''}" id="tv-cur-toggle" onclick="CursorSystem.setEnabled(!CursorSystem.enabled);this.classList.toggle('on',CursorSystem.enabled)"></div>
          <span style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-muted)">Toggle custom cursor on/off</span>
        </div>
        <div class="tv-cursor-grid" id="tv-cursor-grid"></div>

        <div class="tv-sec">🐾 DESKTOP TAMAGOTCHIS</div>
        <div class="tv-tama-row" id="tv-tama-row"></div>

        <div class="tv-sec">⚙️ QUICK ACTIONS</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;padding-bottom:16px">
          <button onclick="applyTheme(OS.theme==='dark'?'light':'dark')" style="padding:7px 14px;border-radius:8px;background:rgba(0,180,255,.1);border:1px solid rgba(0,180,255,.2);color:var(--neon);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer">☀ Toggle Light/Dark</button>
          <button onclick="__tvRandom()" style="padding:7px 14px;border-radius:8px;background:rgba(150,0,255,.1);border:1px solid rgba(150,0,255,.2);color:#aa44ff;font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer">🎲 Random Theme</button>
          <button onclick="clearAllThemeMods&&clearAllThemeMods()" style="padding:7px 14px;border-radius:8px;background:rgba(255,45,110,.08);border:1px solid rgba(255,45,110,.2);color:var(--accent);font-family:'Share Tech Mono',monospace;font-size:9px;cursor:pointer">↺ Reset to Default</button>
        </div>
      </div>
    </div>`;

    // Theme cards
    const tg=body.querySelector('#tv-theme-grid');
    CATALOG.forEach(th=>{
      const on=th.active();
      const card=document.createElement('div');
      card.className='tv-card'+(on?' tv-on':'');
      card.innerHTML=`
        <div class="tv-prev" style="background:${th.bg}">
          <div style="text-align:center;z-index:1">
            <div style="font-size:28px">${th.icon}</div>
            <div class="tv-prev-label" style="color:${th.textCol}">${th.preview}</div>
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;height:3px;display:flex">
            ${th.cols.map(c=>`<div style="flex:1;background:${c}"></div>`).join('')}
          </div>
          ${on?'<div style="position:absolute;top:6px;right:8px;font-size:8px;font-family:Share Tech Mono,monospace;background:rgba(0,180,255,.3);color:var(--neon);padding:2px 6px;border-radius:8px;border:1px solid var(--neon)">ACTIVE</div>':''}
        </div>
        <div class="tv-card-body">
          <div class="tv-card-name">${th.name}</div>
          <div class="tv-card-sub">${th.desc}</div>
          <div class="tv-card-acts">
            <button class="tv-btn tv-btn-p" onclick="__tvApply('${th.id}')">▶ APPLY</button>
            ${on?'<button class="tv-btn tv-btn-g">✓ ACTIVE</button>':''}
          </div>
        </div>`;
      tg.appendChild(card);
    });

    // Cursor cards
    const cg=body.querySelector('#tv-cursor-grid');
    CURSORS.forEach(c=>{
      const card=document.createElement('div');
      card.className='tv-cur-card'+(curActive===c.id?' tv-cur-on':'');
      card.innerHTML=`<div class="tv-cur-icon">${c.icon}</div><div class="tv-cur-name">${c.name}</div>`;
      card.onclick=()=>{CursorSystem.setTheme(c.id);cg.querySelectorAll('.tv-cur-card').forEach(x=>x.classList.toggle('tv-cur-on',x.querySelector('.tv-cur-name').textContent===c.name));};
      cg.appendChild(card);
    });

    // Tama buttons
    const tr=body.querySelector('#tv-tama-row');
    [{pet:GojoPet,icon:'🟦',name:'Gojo Satoru'},{pet:IsagiPet,icon:'⚽',name:'Isagi Yoichi'},{pet:MarinetPet,icon:'🐞',name:'Marinette'}].forEach(({pet,icon,name})=>{
      const active=!!document.getElementById(pet.ID);
      const btn=document.createElement('button');
      btn.className='tv-tama-btn';
      btn.innerHTML=`${icon} ${name} <span style="color:${active?'#39ff14':'rgba(0,180,255,.4)'}">${active?'● ACTIVE':'○ OFFLINE'}</span>`;
      btn.onclick=()=>{
        if(document.getElementById(pet.ID)){document.getElementById(pet.ID).remove();}
        else{pet.spawn();}
        render();
      };
      tr.appendChild(btn);
    });

    // Wire globals
    window.__tvApply=(id)=>{const th=CATALOG.find(x=>x.id===id);if(th){th.apply();toast('🎨 '+th.name+' applied!');setTimeout(render,400);}};
    window.__tvRandom=()=>{const th=CATALOG[Math.floor(Math.random()*CATALOG.length)];th.apply();toast('🎲 Random: '+th.name);setTimeout(render,400);};
    window.clearAllThemeMods=()=>{['ben10','stranger','miraculous','jjk'].forEach(id=>{const m=getActiveMods().find(x=>x.id===id);if(m&&m.enabled){m.enabled=false;applyMod(m);}});document.documentElement.removeAttribute('data-theme-id');['--neon','--neon2','--neon3','--accent','--bg','--bg2'].forEach(v=>document.documentElement.style.removeProperty(v));applyTheme('dark');stopMatrixRain&&stopMatrixRain();setTimeout(render,400);toast('↺ Reset to default');};
  };

  render();
}

/* ─────────────────────────────────────────────────────
   SECTION 3: TAMAGOTCHI CORE UTILITIES
───────────────────────────────────────────────────── */
const TamaCore={
  makeDraggable(el,onDrop){
    const bar=el.querySelector('.tama-bar');if(!bar)return;
    let drag=false,ox,oy,sx,sy;
    const start=(x,y)=>{drag=true;sx=x;sy=y;ox=parseInt(el.style.left)||50;oy=parseInt(el.style.top)||150;};
    const move=(x,y)=>{if(!drag)return;el.style.left=Math.max(0,Math.min(innerWidth-195,ox+(x-sx)))+'px';el.style.top=Math.max(30,Math.min(innerHeight-350,oy+(y-sy)))+'px';};
    const end=()=>{if(drag&&onDrop)onDrop(parseInt(el.style.left),parseInt(el.style.top));drag=false;};
    bar.addEventListener('mousedown',e=>{if(e.target.tagName==='BUTTON')return;e.preventDefault();start(e.clientX,e.clientY);});
    document.addEventListener('mousemove',e=>{if(drag)move(e.clientX,e.clientY);});
    document.addEventListener('mouseup',end);
    bar.addEventListener('touchstart',e=>{const t=e.touches[0];start(t.clientX,t.clientY);},{passive:true});
    document.addEventListener('touchmove',e=>{if(drag){const t=e.touches[0];move(t.clientX,t.clientY);}},{passive:true});
    document.addEventListener('touchend',end);
  },
  statCol(v){return v>60?'#39ff14':v>30?'#ffd700':'#ff2d6e';},
  ageStr(a){return a<1?'Baby':a<3?'Child':a<7?'Teen':a<15?'Adult':a<30?'Senior':'Legend';},
};

/* ─────────────────────────────────────────────────────
   SECTION 4: GOJO SATORU TAMAGOTCHI (JJK)
───────────────────────────────────────────────────── */
const GojoPet={
  ID:'tama_gojo',
  QUOTES:["Throughout Heaven and Earth, I alone am the honored one.","Sorry, I'm the strongest.","Infinity.","I have no choice but to win every time.","Don't worry. I'm the strongest.","Six Eyes... activating.","You can't beat me. It's simple math.","You think Gojo Satoru can be stopped?"],
  FOODS:['🍡 Dango','🍜 Ramen','🍰 Cake','🍣 Sushi','🍡 Mochi'],
  _d(){return LS.get('tg_gojo',{hunger:80,happiness:75,health:100,cursed:88,infinity:0,age:0,wt:5,x:20,y:180,sleeping:false});},
  _s(d){LS.set('tg_gojo',d);},
  _gs(d){if(d.sleeping)return 's-sleep';if(d.health<20)return 's-sick';if(d.happiness>85)return 's-happy';if(d.eating)return 's-eat';if(d.power)return 's-power';return '';},
  _msg(id,m){const el=document.getElementById(id+'-msg');if(el)el.textContent=m;},

  spawn(){
    if(document.getElementById(this.ID))return;
    const d=this._d();
    const el=document.createElement('div');el.id=this.ID;el.className='tama-widget';
    el.style.cssText=`left:${d.x}px;top:${d.y}px;--tg:rgba(100,0,255,.5);`;
    document.body.appendChild(el);this._r(el);this._tick(el);
    TamaCore.makeDraggable(el,(x,y)=>{const dd=this._d();dd.x=x;dd.y=y;this._s(dd);});
    toast('💜 Gojo Satoru appeared!');
  },

  _r(el){
    if(!el)return;
    const d=this._d();const sc=this._gs(d);
    const q=d.sleeping?'Zzz... even the strongest needs rest.':d.health<20?'...Reverse Cursed Technique failing...':d.cursed<20?'Six Eyes... dimming...':this.QUOTES[Math.floor(Math.random()*this.QUOTES.length)];
    el.style.borderColor=d.health<20?'rgba(255,50,50,.6)':d.infinity>80?'rgba(150,0,255,.7)':'rgba(100,0,255,.35)';
    el.innerHTML=`
<div class="tama-bar" style="background:rgba(30,0,80,.85);border-color:rgba(100,0,255,.15);">
  <span class="tama-ttl" style="color:#aa44ff">💜 GOJO SATORU</span>
  <button class="tama-x" onclick="document.getElementById('${this.ID}').remove()">✕</button>
</div>
<div class="tama-screen" style="background:linear-gradient(135deg,#08001a,#160040);">
  <div class="tama-bg-layer" style="background:radial-gradient(circle,rgba(100,0,255,.18) 0%,transparent 70%)"></div>
  ${d.infinity>0?`<div style="position:absolute;inset:0;border:2px solid rgba(100,0,255,${(d.infinity/100).toFixed(2)});border-radius:11px;pointer-events:none"></div>`:''}
  <div class="tama-char ${sc}" onclick="GojoPet._pet('${this.ID}')" style="--tg:rgba(100,0,255,.5)">🟦</div>
  ${d.cursed>80?'<div style="position:absolute;top:6px;right:8px;font-size:11px;opacity:.7">👁</div>':''}
  <div class="tama-notif ${(d.hunger<20||d.health<20)?'show':''}" style="background:#6600ff">${d.hunger<20?'🍜':'💊'}</div>
</div>
<div class="tama-stats">
  <div class="tama-sr"><span class="tama-si">🍜</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.hunger}%;background:${TamaCore.statCol(d.hunger)}"></div></div><span class="tama-sv">${d.hunger}</span></div>
  <div class="tama-sr"><span class="tama-si">😊</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.happiness}%;background:${TamaCore.statCol(d.happiness)}"></div></div><span class="tama-sv">${d.happiness}</span></div>
  <div class="tama-sr"><span class="tama-si">⚡</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.cursed}%;background:#6600ff"></div></div><span class="tama-sv">${d.cursed}</span></div>
  <div class="tama-sr"><span class="tama-si">♾</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.infinity}%;background:#cc44ff"></div></div><span class="tama-sv">${d.infinity}</span></div>
</div>
<div class="tama-msg" id="${this.ID}-msg">${q}</div>
<div class="tama-acts">
  <button class="tama-abtn" onclick="GojoPet._feed('${this.ID}')" title="Feed">🍜</button>
  <button class="tama-abtn" onclick="GojoPet._train('${this.ID}')" title="Train">🥋</button>
  <button class="tama-abtn" onclick="GojoPet._heal('${this.ID}')" title="Heal">💊</button>
  <button class="tama-abtn" onclick="GojoPet._sleep('${this.ID}')" title="${d.sleeping?'Wake':'Sleep'}">${d.sleeping?'☀️':'💤'}</button>
</div>
<button class="tama-spec" onclick="GojoPet._infinity('${this.ID}')"
  style="background:linear-gradient(135deg,${d.infinity>=100?'#5500cc,#aa44ff':'rgba(40,0,90,.6),rgba(70,0,140,.5)'});color:${d.infinity>=100?'#fff':'rgba(160,80,255,.5)'};">
  ${d.infinity>=100?'♾ INFINITE VOID — ACTIVATE!':'♾ INFINITY: '+d.infinity+'%'}
</button>
<div class="tama-foot"><span>Age: ${TamaCore.ageStr(d.age)}</span><span>${d.wt}kg</span><span>${d.health}%HP</span></div>`;
  },

  _feed(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,'...Zzz...');return;}d.hunger=Math.min(100,d.hunger+22);d.happiness=Math.min(100,d.happiness+5);d.wt=Math.min(20,d.wt+.2);d.eating=true;this._s(d);this._r(el);const f=this.FOODS[Math.floor(Math.random()*this.FOODS.length)];this._msg(id,f+' — "Not bad. I\'ve had better."');setTimeout(()=>{const dd=this._d();dd.eating=false;this._s(dd);this._r(document.getElementById(id));},1200);},
  _train(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,'Let me sleep.');return;}d.happiness=Math.min(100,d.happiness+16);d.cursed=Math.min(100,d.cursed+14);d.infinity=Math.min(100,d.infinity+10);d.hunger=Math.max(0,d.hunger-9);this._s(d);this._r(el);const msgs=['"Six Eyes: calibrated."','"Domain Expansion: practiced."','"Cursed energy: optimal."','"I\'m already perfect, but I\'ll keep going."'];this._msg(id,msgs[Math.floor(Math.random()*msgs.length)]);},
  _heal(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.health=Math.min(100,d.health+28);d.cursed=Math.min(100,d.cursed+10);this._s(d);this._r(el);this._msg(id,'"Reverse Cursed Technique. Applied."');},
  _sleep(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.sleeping=!d.sleeping;this._s(d);this._r(el);this._msg(id,d.sleeping?'"Even the strongest rests... don\'t tell anyone."':'"...I\'m back. Miss me?"');},
  _pet(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.happiness=Math.min(100,d.happiness+8);d.infinity=Math.min(100,d.infinity+5);this._s(d);this._r(el);const msgs=['"...Heh."','"The Honored One is pleased."','"Six Eyes smile."','"...okay, that was nice."'];this._msg(id,msgs[Math.floor(Math.random()*msgs.length)]);toast('💜 Gojo smiles!');},

  _infinity(id){
    const el=document.getElementById(id);const d=this._d();
    if(!el||d.infinity<100)return;
    d.infinity=0;d.health=100;d.cursed=100;d.happiness=100;d.power=true;
    this._s(d);this._r(el);this._msg(id,'"Infinite Void — you are trapped. Forever."');
    const flash=document.createElement('div');flash.style.cssText='position:fixed;inset:0;z-index:9300;background:rgba(100,0,255,.35);pointer-events:none;transition:opacity .4s;';document.body.appendChild(flash);setTimeout(()=>{flash.style.opacity='0';setTimeout(()=>flash.remove(),400);},300);
    toast('♾ INFINITE VOID! Full stat restoration!');
    setTimeout(()=>{const dd=this._d();dd.power=false;this._s(dd);this._r(document.getElementById(id));},2200);
  },

  _tick(el){
    const go=()=>{
      if(!document.getElementById(this.ID))return;
      const d=this._d();
      if(d.sleeping){d.hunger=Math.max(0,d.hunger-.25);d.health=Math.min(100,d.health+.4);d.cursed=Math.min(100,d.cursed+.6);}
      else{d.hunger=Math.max(0,d.hunger-.55);d.happiness=Math.max(0,d.happiness-.3);d.cursed=Math.max(0,d.cursed-.4);if(d.hunger<5)d.health=Math.max(0,d.health-1);}
      d.age=(d.age||0)+.0008;
      this._s(d);this._r(document.getElementById(this.ID));
      setTimeout(go,8500);
    };
    setTimeout(go,8500);
  }
};

/* ─────────────────────────────────────────────────────
   SECTION 5: ISAGI YOICHI TAMAGOTCHI (BLUE LOCK)
───────────────────────────────────────────────────── */
const IsagiPet={
  ID:'tama_isagi',
  QUOTES:["I've never desired anything this much.","My ego... is awakening.","Meta Vision. I can see the perfect shot.","The only one who can stop me is me.","I'll devour everyone. I'll be the best striker.","Spatial awareness: maximum.","Flow state achieved.","Score. And survive."],
  _d(){return LS.get('tg_isagi',{hunger:80,happiness:72,health:100,ego:50,goals:0,metaVis:false,age:0,wt:65,x:225,y:180,sleeping:false});},
  _s(d){LS.set('tg_isagi',d);},
  _gs(d){if(d.sleeping)return 's-sleep';if(d.health<20)return 's-sick';if(d.metaVis||d.ego>85)return 's-power';if(d.happiness>80)return 's-happy';return '';},
  _msg(id,m){const el=document.getElementById(id+'-msg');if(el)el.textContent=m;},

  spawn(){
    if(document.getElementById(this.ID))return;
    const d=this._d();
    const el=document.createElement('div');el.id=this.ID;el.className='tama-widget';
    el.style.cssText=`left:${d.x}px;top:${d.y}px;--tg:rgba(0,80,255,.5);`;
    document.body.appendChild(el);this._r(el);this._tick();
    TamaCore.makeDraggable(el,(x,y)=>{const dd=this._d();dd.x=x;dd.y=y;this._s(dd);});
    toast('⚽ Isagi Yoichi entered the pitch!');
  },

  _r(el){
    if(!el)return;
    const d=this._d();const sc=this._gs(d);
    const q=d.sleeping?'Conserving energy...':d.health<20?'Injured... I won\'t give up.':d.ego>80?'"My ego is overwhelming. Meta Vision..."':this.QUOTES[Math.floor(Math.random()*this.QUOTES.length)];
    el.style.borderColor=d.metaVis?'rgba(0,180,255,.8)':d.ego>80?'rgba(0,100,255,.6)':'rgba(0,80,255,.3)';
    el.innerHTML=`
<div class="tama-bar" style="background:rgba(0,10,40,.9);border-color:rgba(0,80,255,.18);">
  <span class="tama-ttl" style="color:#4488ff">⚽ ISAGI YOICHI</span>
  <button class="tama-x" onclick="document.getElementById('${this.ID}').remove()">✕</button>
</div>
<div class="tama-screen" style="background:linear-gradient(135deg,#000510,#001040);">
  <div class="tama-bg-layer" style="background:radial-gradient(circle,rgba(0,80,255,.15) 0%,transparent 70%)"></div>
  ${d.metaVis?'<div style="position:absolute;inset:4px;border:1.5px solid rgba(0,180,255,.55);border-radius:9px;pointer-events:none;animation:taHappy .8s infinite"></div>':''}
  <div class="tama-char ${sc}" onclick="IsagiPet._pet('${this.ID}')" style="--tg:rgba(0,100,255,.5)">⚽</div>
  ${d.ego>=100?'<div style="position:absolute;top:6px;right:8px;font-size:10px;color:#0088ff;animation:taHappy .4s infinite">👁</div>':''}
  <div class="tama-notif ${d.hunger<20?'show':''}" style="background:#0055ff">🍱</div>
</div>
<div class="tama-stats">
  <div class="tama-sr"><span class="tama-si">🍱</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.hunger}%;background:${TamaCore.statCol(d.hunger)}"></div></div><span class="tama-sv">${d.hunger}</span></div>
  <div class="tama-sr"><span class="tama-si">😤</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.happiness}%;background:${TamaCore.statCol(d.happiness)}"></div></div><span class="tama-sv">${d.happiness}</span></div>
  <div class="tama-sr"><span class="tama-si">🔥</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.ego}%;background:${d.ego>80?'#0055ff':'#4488ff'}"></div></div><span class="tama-sv" style="color:${d.ego>80?'#00b4ff':'var(--text-muted)'}">${d.ego}</span></div>
  <div class="tama-sr"><span class="tama-si">⚽</span><div class="tama-sbar"><div class="tama-sfill" style="width:${Math.min(100,d.goals*5)}%;background:#00ccff"></div></div><span class="tama-sv">${d.goals}g</span></div>
</div>
<div class="tama-msg" id="${this.ID}-msg">${q}</div>
<div class="tama-acts">
  <button class="tama-abtn" onclick="IsagiPet._feed('${this.ID}')" title="Eat">🍱</button>
  <button class="tama-abtn" onclick="IsagiPet._train('${this.ID}')" title="Train">🏃</button>
  <button class="tama-abtn" onclick="IsagiPet._match('${this.ID}')" title="Match">🥅</button>
  <button class="tama-abtn" onclick="IsagiPet._sleep('${this.ID}')" title="${d.sleeping?'Wake':'Sleep'}">${d.sleeping?'☀️':'💤'}</button>
</div>
<button class="tama-spec" onclick="IsagiPet._metaVision('${this.ID}')"
  style="background:linear-gradient(135deg,${d.ego>=100?'#0033cc,#0099ff':'rgba(0,20,70,.6),rgba(0,40,110,.5)'});color:${d.ego>=100?'#fff':'rgba(0,150,255,.5)'};">
  ${d.ego>=100?'👁 META VISION — ACTIVATE!':'👁 META VISION (EGO: '+d.ego+'%)'}
</button>
<div class="tama-foot"><span>Age: ${TamaCore.ageStr(d.age)}</span><span>${d.goals} goals</span><span>${d.health}%HP</span></div>`;
  },

  _feed(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,'Resting...');return;}d.hunger=Math.min(100,d.hunger+20);d.health=Math.min(100,d.health+4);this._s(d);this._r(el);this._msg(id,'"Fueling up for the match."');},
  _train(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,'Let me rest.');return;}d.ego=Math.min(100,d.ego+14);d.happiness=Math.min(100,d.happiness+12);d.hunger=Math.max(0,d.hunger-10);d.health=Math.max(50,d.health-1);this._s(d);this._r(el);const t=['"Dribbling: perfect."','"Spatial awareness up."','"One more rep."','"Ego awakening."'];this._msg(id,t[Math.floor(Math.random()*t.length)]);},
  _match(id){
    const el=document.getElementById(id);const d=this._d();if(!el)return;
    if(d.sleeping||d.hunger<15){this._msg(id,d.hunger<15?'Not enough energy...':'Not while sleeping!');return;}
    const win=Math.random()<(.35+(d.ego/100)*.5);
    if(win){d.goals++;d.happiness=Math.min(100,d.happiness+22);d.ego=Math.min(100,d.ego+8);d.hunger=Math.max(0,d.hunger-12);this._msg(id,`GOAL! ${d.goals} total. "Is this... the direct shot?!"`);toast('⚽ GOAL! Isagi scored!');}
    else{d.happiness=Math.max(0,d.happiness-5);d.hunger=Math.max(0,d.hunger-8);this._msg(id,'"...I missed. Never again."');}
    this._s(d);this._r(el);
  },
  _sleep(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.sleeping=!d.sleeping;this._s(d);this._r(el);this._msg(id,d.sleeping?'"Rest is training."':'"Back to work."');},
  _pet(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.happiness=Math.min(100,d.happiness+7);d.ego=Math.min(100,d.ego+4);this._s(d);this._r(el);this._msg(id,'"...Don\'t get the wrong idea."');},
  _metaVision(id){
    const el=document.getElementById(id);const d=this._d();if(!el||d.ego<100)return;
    d.ego=0;d.metaVis=true;d.goals++;d.happiness=100;this._s(d);this._r(el);
    this._msg(id,'"META VISION — I can see the only route to victory!"');
    const flash=document.createElement('div');flash.style.cssText='position:fixed;inset:0;z-index:9300;background:rgba(0,80,255,.22);pointer-events:none;transition:opacity .4s;';document.body.appendChild(flash);setTimeout(()=>{flash.style.opacity='0';setTimeout(()=>flash.remove(),400);},400);
    toast('👁 META VISION! Goal scored!');
    setTimeout(()=>{const dd=this._d();dd.metaVis=false;this._s(dd);this._r(document.getElementById(id));},3000);
  },
  _tick(){
    const go=()=>{
      if(!document.getElementById(this.ID))return;
      const d=this._d();
      if(d.sleeping){d.hunger=Math.max(0,d.hunger-.2);d.health=Math.min(100,d.health+.4);d.ego=Math.max(0,d.ego-.2);}
      else{d.hunger=Math.max(0,d.hunger-.6);d.happiness=Math.max(0,d.happiness-.38);d.ego=Math.max(0,d.ego-.18);if(d.hunger<5)d.health=Math.max(0,d.health-1.2);}
      d.age=(d.age||0)+.0008;
      this._s(d);this._r(document.getElementById(this.ID));
      setTimeout(go,7500);
    };
    setTimeout(go,7500);
  }
};

/* ─────────────────────────────────────────────────────
   SECTION 6: MARINETTE TAMAGOTCHI (MIRACULOUS LADYBUG)
───────────────────────────────────────────────────── */
const MarinetPet={
  ID:'tama_marinette',
  QUOTES:["Lucky Charm!","Tikki, spots on!","Miraculous Ladybug!","I can do this.","As Ladybug, I protect everyone.","Cat Noir, let's go!","I'll never give up!","This is Ladybug!"],
  FOODS:['🍩 Macaron','🥐 Croissant','🍰 Cake','🫐 Berries'],
  AKUMAS:[{name:'Hawk Moth',e:'🦋'},{name:'Stoneheart',e:'🪨'},{name:'Horrificator',e:'👾'},{name:'Timebreaker',e:'⏳'},{name:'Evillustrator',e:'🖊️'}],
  _d(){return LS.get('tg_marinette',{hunger:80,happiness:75,health:100,tikki:70,transform:false,akuma:false,charms:0,age:0,wt:48,x:430,y:180,sleeping:false});},
  _s(d){LS.set('tg_marinette',d);},
  _gs(d){if(d.sleeping)return 's-sleep';if(d.akuma)return 's-sick';if(d.transform)return 's-power';if(d.health<20)return 's-sick';if(d.happiness>80)return 's-happy';return '';},
  _msg(id,m){const el=document.getElementById(id+'-msg');if(el)el.textContent=m;},

  spawn(){
    if(document.getElementById(this.ID))return;
    const d=this._d();
    const el=document.createElement('div');el.id=this.ID;el.className='tama-widget';
    el.style.cssText=`left:${d.x}px;top:${d.y}px;--tg:rgba(255,0,80,.5);`;
    document.body.appendChild(el);this._r(el);this._tick();this._scheduleAkuma();
    TamaCore.makeDraggable(el,(x,y)=>{const dd=this._d();dd.x=x;dd.y=y;this._s(dd);});
    toast('🐞 Marinette is ready to transform!');
  },

  _r(el){
    if(!el)return;
    const d=this._d();const sc=this._gs(d);
    const q=d.sleeping?'Zzz... even heroes dream.':d.akuma?'"AKUMA ALERT! Tap ⚔️ to fight!!"':d.transform?'"Miraculous Ladybug! Fully transformed!"':d.tikki<20?'"Tikki... I need more power..."':this.QUOTES[Math.floor(Math.random()*this.QUOTES.length)];
    el.style.borderColor=d.akuma?'rgba(255,0,80,.85)':d.transform?'rgba(255,120,0,.7)':'rgba(255,0,80,.28)';
    el.innerHTML=`
<div class="tama-bar" style="background:rgba(35,0,8,.9);border-color:rgba(255,0,80,.18);">
  <span class="tama-ttl" style="color:#ff66aa">🐞 MARINETTE</span>
  <button class="tama-x" onclick="document.getElementById('${this.ID}').remove()">✕</button>
</div>
<div class="tama-screen" style="background:linear-gradient(135deg,#0a0002,#1e0006);">
  <div class="tama-bg-layer" style="background:radial-gradient(circle,rgba(255,0,80,.12) 0%,transparent 70%)"></div>
  ${d.akuma?'<div style="position:absolute;inset:0;background:rgba(255,0,0,.07);border-radius:11px;animation:taSick .3s infinite;pointer-events:none"></div>':''}
  ${d.transform?'<div style="position:absolute;inset:3px;border:2px solid rgba(255,80,0,.55);border-radius:9px;pointer-events:none;animation:taHappy .4s infinite"></div>':''}
  <div class="tama-char ${sc}" onclick="MarinetPet._pet('${this.ID}')" style="--tg:rgba(255,0,80,.5)">🐞</div>
  <div class="tama-notif ${(d.akuma||d.hunger<20)?'show':''}" style="background:#ff0055">${d.akuma?'⚠️':'🍩'}</div>
</div>
<div class="tama-stats">
  <div class="tama-sr"><span class="tama-si">🍩</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.hunger}%;background:${TamaCore.statCol(d.hunger)}"></div></div><span class="tama-sv">${d.hunger}</span></div>
  <div class="tama-sr"><span class="tama-si">💕</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.happiness}%;background:${TamaCore.statCol(d.happiness)}"></div></div><span class="tama-sv">${d.happiness}</span></div>
  <div class="tama-sr"><span class="tama-si">🔴</span><div class="tama-sbar"><div class="tama-sfill" style="width:${d.tikki}%;background:#ff0055"></div></div><span class="tama-sv">${d.tikki}</span></div>
  <div class="tama-sr"><span class="tama-si">🍀</span><div class="tama-sbar"><div class="tama-sfill" style="width:${Math.min(100,d.charms*8)}%;background:#ff8800"></div></div><span class="tama-sv">${d.charms}</span></div>
</div>
<div class="tama-msg" id="${this.ID}-msg">${q}</div>
<div class="tama-acts">
  <button class="tama-abtn" onclick="MarinetPet._feed('${this.ID}')" title="Eat">🍩</button>
  <button class="tama-abtn" onclick="MarinetPet._design('${this.ID}')" title="Design">✏️</button>
  ${d.akuma?`<button class="tama-abtn" onclick="MarinetPet._fight('${this.ID}')" style="border-color:rgba(255,0,80,.6);background:rgba(80,0,20,.8)" title="Fight Akuma">⚔️</button>`:`<button class="tama-abtn" onclick="MarinetPet._charm('${this.ID}')" title="Lucky Charm">🍀</button>`}
  <button class="tama-abtn" onclick="MarinetPet._sleep('${this.ID}')" title="${d.sleeping?'Wake':'Sleep'}">${d.sleeping?'☀️':'💤'}</button>
</div>
<button class="tama-spec" onclick="MarinetPet._transform('${this.ID}')"
  style="background:linear-gradient(135deg,${d.tikki>=100||d.transform?'#bb0040,#ff0055':'rgba(70,0,25,.6),rgba(110,0,40,.5)'});color:${d.tikki>=100||d.transform?'#fff':'rgba(255,80,100,.45)'};">
  ${d.transform?'🐞 MIRACULOUS LADYBUG!':d.tikki>=100?'🐞 TIKKI SPOTS ON!':'🐞 TIKKI: '+d.tikki+'%'}
</button>
<div class="tama-foot"><span>Age: ${TamaCore.ageStr(d.age)}</span><span>${d.charms} charms</span><span>${d.health}%HP</span></div>`;
  },

  _feed(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,"Shh...");return;}const f=this.FOODS[Math.floor(Math.random()*this.FOODS.length)];d.hunger=Math.min(100,d.hunger+22);d.tikki=Math.min(100,d.tikki+10);d.happiness=Math.min(100,d.happiness+6);this._s(d);this._r(el);this._msg(id,f+(f.includes('Macaron')?' — "Tikki\'s favorite!"':' — "Yum!"'));},
  _design(id){const el=document.getElementById(id);const d=this._d();if(!el)return;if(d.sleeping){this._msg(id,'...');return;}d.happiness=Math.min(100,d.happiness+18);d.tikki=Math.min(100,d.tikki+8);d.hunger=Math.max(0,d.hunger-5);this._s(d);this._r(el);const m=['"New design — Adrien will love it!"','"Perfect colour scheme!"','"Fashion and heroism!"','"Tikki says this is great!"'];this._msg(id,m[Math.floor(Math.random()*m.length)]);},
  _charm(id){
    const el=document.getElementById(id);const d=this._d();if(!el)return;
    d.charms++;
    const fx=[()=>{d.health=Math.min(100,d.health+28);return 'Full heal!'},()=>{d.happiness=Math.min(100,d.happiness+22);d.hunger=Math.min(100,d.hunger+15);return 'Joy boost!'},()=>{d.tikki=Math.min(100,d.tikki+22);return 'Tikki powered up!'},()=>{d.hunger=Math.min(100,d.hunger+30);return 'Macaron shower!'}];
    const r=fx[Math.floor(Math.random()*fx.length)]();this._s(d);this._r(el);this._msg(id,'Lucky Charm: '+r+' "Miraculous Ladybug!"');toast('🍀 Lucky Charm: '+r);
  },
  _fight(id){
    const el=document.getElementById(id);const d=this._d();if(!el||!d.akuma)return;
    const win=Math.random()<(.45+(d.tikki/100)*.4+(d.transform?.2:0));
    if(win){d.akuma=false;d.happiness=Math.min(100,d.happiness+25);d.charms++;d.tikki=Math.max(0,d.tikki-18);this._msg(id,'"Miraculous Ladybug! No more evil-doing!"');toast('🐞 Akuma defeated! Paris is safe!');}
    else{d.health=Math.max(0,d.health-18);d.happiness=Math.max(0,d.happiness-14);this._msg(id,'"I need another Lucky Charm..."');toast('⚠️ Akuma escapes...');}
    this._s(d);this._r(el);
  },
  _sleep(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.sleeping=!d.sleeping;this._s(d);this._r(el);this._msg(id,d.sleeping?'"Tikki, sleep too..."':'"Let\'s transform!"');},
  _pet(id){const el=document.getElementById(id);const d=this._d();if(!el)return;d.happiness=Math.min(100,d.happiness+8);d.tikki=Math.min(100,d.tikki+5);this._s(d);this._r(el);this._msg(id,'"Pound it!"');},
  _transform(id){
    const el=document.getElementById(id);const d=this._d();if(!el)return;
    if(d.transform){
      d.transform=false;d.health=Math.min(100,d.health+35);d.happiness=100;d.tikki=0;
      this._s(d);this._r(el);this._msg(id,'"Miraculous Ladybug! Everything fixed!"');
      const flash=document.createElement('div');flash.style.cssText='position:fixed;inset:0;z-index:9300;background:rgba(255,0,80,.25);pointer-events:none;transition:opacity .4s;';document.body.appendChild(flash);setTimeout(()=>{flash.style.opacity='0';setTimeout(()=>flash.remove(),400);},300);
      toast('🐞 Miraculous Ladybug! Full heal! Paris saved!');
    } else if(d.tikki>=100){
      d.transform=true;d.tikki=75;d.akuma=false;
      this._s(d);this._r(el);this._msg(id,'"Tikki, spots on! TRANSFORMATION COMPLETE!"');
      toast('🐞 SPOTS ON!');
    } else {
      this._msg(id,'"Tikki needs more power: '+d.tikki+'%"');
    }
  },
  _scheduleAkuma(){
    const next=()=>{setTimeout(()=>{if(!document.getElementById(this.ID))return;const d=this._d();if(!d.sleeping&&!d.akuma&&!d.transform&&Math.random()<.38){d.akuma=true;this._s(d);this._r(document.getElementById(this.ID));toast('⚠️ AKUMA ALERT! Help Marinette!');}next();},45000+Math.random()*90000);};
    next();
  },
  _tick(){
    const go=()=>{
      if(!document.getElementById(this.ID))return;
      const d=this._d();
      if(d.sleeping){d.hunger=Math.max(0,d.hunger-.2);d.health=Math.min(100,d.health+.35);d.tikki=Math.min(100,d.tikki+.4);}
      else{d.hunger=Math.max(0,d.hunger-.55);d.happiness=Math.max(0,d.happiness-.32);d.tikki=Math.max(0,d.tikki-.22);if(d.hunger<5)d.health=Math.max(0,d.health-.9);}
      d.age=(d.age||0)+.0008;
      this._s(d);this._r(document.getElementById(this.ID));
      setTimeout(go,8000);
    };
    setTimeout(go,8000);
  }
};

/* ─────────────────────────────────────────────────────
   SECTION 7: TAMA SPAWN MENU + INTEGRATION
───────────────────────────────────────────────────── */
const TamaSpawnMenu={
  open(){
    WM.create('tama_spawn','TAMAGOTCHIS','🐾',520,360,body=>{
      body.style.cssText='padding:16px;overflow-y:auto;background:var(--bg);';
      body.innerHTML=`
<div style="font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;color:var(--neon);letter-spacing:3px;margin-bottom:8px">🐾 DESKTOP TAMAGOTCHIS</div>
<div style="font-family:'Share Tech Mono',monospace;font-size:9px;color:var(--text-dim);margin-bottom:14px;line-height:1.8">Your anime companions live on the desktop. They need food, care, and love! Stats save automatically.</div>
<div class="tama-menu-grid">
  ${[{p:GojoPet,n:'Gojo Satoru',s:'Jujutsu Kaisen',i:'🟦',c:'#6600ff'},{p:IsagiPet,n:'Isagi Yoichi',s:'Blue Lock',i:'⚽',c:'#0055ff'},{p:MarinetPet,n:'Marinette',s:'Miraculous',i:'🐞',c:'#ff0055'}].map(t=>`
  <div class="tama-menu-card">
    <div class="tama-menu-icon">${t.i}</div>
    <div class="tama-menu-name" style="color:${t.c}">${t.n}</div>
    <div class="tama-menu-sub">${t.s}</div>
    <button class="tama-menu-spawn" style="background:linear-gradient(135deg,${t.c}88,${t.c})" onclick="${t.p.ID.replace('tama_','')==='gojo'?'GojoPet':t.p.ID.replace('tama_','')==='isagi'?'IsagiPet':'MarinetPet'}.spawn();WM.close('tama_spawn')" >
      SPAWN ${t.n.split(' ')[0].toUpperCase()}
    </button>
  </div>`).join('')}
</div>
<div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--panel-border);display:flex;gap:8px;flex-wrap:wrap">
  <button onclick="GojoPet.spawn();IsagiPet.spawn();MarinetPet.spawn();WM.close('tama_spawn')" style="padding:9px 18px;border-radius:10px;background:linear-gradient(135deg,#003399,#00b4ff);border:none;color:#fff;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;cursor:pointer;letter-spacing:2px">🐾 SPAWN ALL THREE</button>
  <button onclick="['tama_gojo','tama_isagi','tama_marinette'].forEach(id=>{const el=document.getElementById(id);if(el)el.remove();});WM.close('tama_spawn')" style="padding:9px 18px;border-radius:10px;background:rgba(255,45,110,.1);border:1px solid rgba(255,45,110,.3);color:var(--accent);font-family:'Orbitron',sans-serif;font-size:9px;cursor:pointer;font-weight:700;letter-spacing:2px">✕ REMOVE ALL</button>
  <button onclick="openApp('themevault');WM.close('tama_spawn')" style="padding:9px 18px;border-radius:10px;background:rgba(255,215,0,.1);border:1px solid rgba(255,215,0,.2);color:#ffd700;font-family:'Orbitron',sans-serif;font-size:9px;cursor:pointer;font-weight:700;letter-spacing:2px">🎨 THEME VAULT</button>
</div>`;
    });
  }
};

/* ─────────────────────────────────────────────────────
   SECTION 8: ADDITIONAL APPS + OPENAPP ADDITIONS
   Add these to BUILTIN_APPS array and openApp() switch
───────────────────────────────────────────────────── */
// These two entries must be APPENDED to the BUILTIN_APPS array above:
// {id:'themevault', label:'Theme\nVault',   icon:'🎨', color:'#100010'},
// {id:'tama_spawn', label:'Tamagotchis',    icon:'🐾', color:'#001020'},
// They're added programmatically here in case you prefer that:
(()=>{
  if(!BUILTIN_APPS.find(a=>a.id==='themevault'))
    BUILTIN_APPS.push({id:'themevault',label:'Theme\nVault',icon:'🎨',color:'#100010'});
  if(!BUILTIN_APPS.find(a=>a.id==='tama_spawn'))
    BUILTIN_APPS.push({id:'tama_spawn',label:'Tamagotchis',icon:'🐾',color:'#001020'});
})();

// Patch openApp to handle new apps
const _origOpenApp_v17 = window.openApp;
window.openApp = function(id){
  if(id==='themevault'){ WM.create('themevault','THEME VAULT','🎨',900,640,buildThemeVaultApp); closeStartMenuIfOpen(); return; }
  if(id==='tama_spawn'){ TamaSpawnMenu.open(); closeStartMenuIfOpen(); return; }
  _origOpenApp_v17(id);
};

/* ─────────────────────────────────────────────────────
   SECTION 9: BOOT INIT ADDITIONS
   This auto-runs to initialize Update 17 systems.
───────────────────────────────────────────────────── */
(()=>{
  // Init cursor after a short delay to ensure DOM is ready
  const origBoot = window.bootWithProfile;
  window.bootWithProfile = function(){
    origBoot&&origBoot();
    // Cursor init happens after boot
    setTimeout(()=>{
      if(CursorSystem.enabled) CursorSystem.init();
      const ct=LS.get('tob_cursor_theme','default');if(ct)CursorSystem.theme=ct;
      // Restore active tamagotchis
      if(LS.get('tg_gojo_active'))GojoPet.spawn();
      if(LS.get('tg_isagi_active'))IsagiPet.spawn();
      if(LS.get('tg_marinette_active'))MarinetPet.spawn();
    },3200);
  };
})();

/* Taskbar floating tama button */
(()=>{
  const tryAdd=()=>{
    const tbRight=document.getElementById('tb-right');
    if(!tbRight||document.getElementById('tb-tama-btn'))return;
    const btn=document.createElement('button');
    btn.id='tb-tama-btn';
    btn.style.cssText='background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:16px;padding:2px 4px;transition:all .15s;';
    btn.textContent='🐾';btn.title='Tamagotchis';
    btn.onmouseover=()=>btn.style.transform='scale(1.2)';
    btn.onmouseout=()=>btn.style.transform='scale(1)';
    btn.onclick=(e)=>{e.stopPropagation();TamaSpawnMenu.open();};
    tbRight.insertBefore(btn,tbRight.firstChild);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(tryAdd,1500));
  else setTimeout(tryAdd,1500);
})();

/* ─────────────────────────────────────────────────────
   END OF UPDATE 17 PATCH
───────────────────────────────────────────────────── */

</script>

<!-- WHAT'S NEW POPUP v14 -->
<div id="whats-new-overlay">
  <div class="wn-dialog">
    <div class="wn-header">
      <div class="wn-badge">◈ VERSION 17.0.0</div>
      <div class="wn-title">WHAT'S NEW</div>
      <div class="wn-sub">TOB OS · DYNAMIC ISLAND &amp; STORY EDITION</div>
    </div>
    <div class="wn-divider"></div>
    <div class="wn-body" id="wn-body"></div>
    <div class="wn-footer">
      <button class="wn-btn-secondary" onclick="WhatsNew.dismiss()">SKIP</button>
      <button class="wn-btn-primary" onclick="WhatsNew.dismiss()">◈ LET'S GO!</button>
    </div>
  </div>
</div>

<!-- USER LOGIN SCREEN -->
<div id="user-login-screen">
  <div class="ulogin-wrap" id="ulogin-wrap"></div>
</div>

<!-- PROFILE SETUP OVERLAY -->
<div id="profile-setup-overlay">
  <div class="psetup-dialog" id="psetup-dialog"></div>
</div>

<!-- DESKTOP WIDGET LAYER -->
<div id="dw-layer"></div>


<!-- FOLDER MODAL -->
<div id="folder-modal">
  <div class="folder-modal-box" id="folder-modal-box"></div>
</div>

<!-- MIRACULOUS LADYBUG OVERLAY -->
<div id="miraculous-overlay"></div>
<div id="miraculous-flash"></div>
<div class="miraculous-badge" id="miraculous-badge"></div>
<!-- KWAMI HUD (Miraculous theme) -->
<div id="kwami-hud" onclick="MiraculousFX.trigger()" title="Transform!">
  <div class="kwami-ring" id="kwami-ring">🐞</div>
</div>

<!-- JJK OVERLAY -->
<div id="jjk-overlay"></div>
<!-- DOMAIN HUD (JJK theme) -->
<div id="domain-hud" onclick="JJKFxSystem.triggerDomain()" title="Domain Expansion">
  <div class="domain-ring" id="domain-ring">EXPAND</div>
</div>

<!-- OMNITRIX HUD (Ben 10 theme) -->
<div id="omnitrix-hud" onclick="OmnitrixFX.trigger()" title="Activate Omnitrix">
  <div class="omnitrix-ring" id="omnitrix-ring">
    <div class="omnitrix-core"></div>
  </div>
</div>
<div id="omnitrix-flash"></div>
<div class="alien-badge" id="alien-badge"></div>

<!-- STRANGER THINGS STRING LIGHTS -->
<div id="string-lights"></div>
<div id="stranger-overlay"></div>

<!-- PROFILE PIC UPLOAD (hidden input) -->
<input type="file" id="profile-pic-input" accept="image/*" style="display:none" onchange="UserProfile._handlePicUpload(event)">

</body>
</html>
