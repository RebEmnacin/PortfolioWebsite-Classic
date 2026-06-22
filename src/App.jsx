import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────────── */
const Icon = ({ d, size = 20, fill = "none", sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const HomeIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />;
const UserIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const MonitorIco = ({ s=20 }) => <Icon size={s} d={<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>} />;
const StarIco    = ({ s=20 }) => <Icon size={s} d={<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>} />;
const MailIco    = ({ s=20 }) => <Icon size={s} d={<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>} />;
const GhIco      = ({ s=18 }) => <Icon size={s} d={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>} />;
const LiIco      = ({ s=18 }) => <Icon size={s} d={<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>} />;
const TgIco      = ({ s=18 }) => <Icon size={s} d={<path d="M22 2L2 9.5l7 2.5m13-10L15.5 19l-4.5-7.5m11-9.5l-13 9.5"/>} />;
const ArrowIco   = ({ s=14 }) => <Icon size={s} d={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />;
const ExtIco     = ({ s=12 }) => <Icon size={s} d={<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>} />;
const BackIco    = ({ s=16 }) => <Icon size={s} d={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />;
const CheckIco   = ({ s=14 }) => <Icon size={s} d={<polyline points="20 6 9 17 4 12"/>} />;
const ZapIco     = ({ s=16 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const XIco       = ({ s=20 }) => <Icon size={s} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />;
const MenuIco    = ({ s=20 }) => <Icon size={s} d={<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>} />;
const FolderIco  = ({ s=48 }) => <Icon size={s} sw={1.5} d={<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>} />;
const CoffeeIco  = ({ s=22 }) => <Icon size={s} d={<><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>} />;
const SnakeIco   = ({ s=22 }) => <Icon size={s} d={<><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M8 12s.5-4 4-4 4 4 4 4-1 4-4 4"/><circle cx="15" cy="9" r="1" fill="currentColor"/></>} />;
const JsIco      = ({ s=22 }) => <Icon size={s} d={<><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M14 7v6a3 3 0 0 1-6 0"/><path d="M10 7v9"/></>} />;
const TsIco      = ({ s=22 }) => <Icon size={s} d={<><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M9 9h6M12 9v9"/><path d="M15 13a2 2 0 0 1 2 2c0 2-3 1.5-3 1.5"/></>} />;
const HtmlIco    = ({ s=22 }) => <Icon size={s} d={<><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>} />;
const CssIco     = ({ s=22 }) => <Icon size={s} d={<><path d="M4 2l1.5 16 6.5 2 6.5-2L20 2H4z"/><path d="M8 9h8M8.5 13h5l-.5 4-3 1-3-1-.2-2"/></>} />;
const DbIco      = ({ s=22 }) => <Icon size={s} d={<><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>} />;
const ReactIco   = ({ s=22 }) => <Icon size={s} d={<><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></>} />;
const ApiIco     = ({ s=22 }) => <Icon size={s} d={<><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="12" x2="12" y2="21"/></>} />;
const FigmaIco   = ({ s=22 }) => <Icon size={s} d={<><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></>} />;
const CloudIco   = ({ s=22 }) => <Icon size={s} d={<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>} />;
const BotIco     = ({ s=22 }) => <Icon size={s} d={<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 11V3"/><circle cx="12" cy="3" r="1"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></>} />;
const NodeIco    = ({ s=22 }) => <Icon size={s} d={<><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></>} />;
const BreadIco   = ({ s=24 }) => <Icon size={s} d={<path d="M3 11c0-3.87 4.03-7 9-7s9 3.13 9 7c0 2.21-1.3 4.19-3.36 5.54L17 21H7l-.64-4.46C4.3 15.19 3 13.21 3 11z"/>} />;
const GlobeIco   = ({ s=24 }) => <Icon size={s} d={<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>} />;
const BarIco     = ({ s=22 }) => <Icon size={s} d={<><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></>} />;
const PlusIco    = ({ s=20 }) => <Icon size={s} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>} />;
const ChevLIco   = ({ s=20 }) => <Icon size={s} d={<polyline points="15 18 9 12 15 6"/>} />;
const ChevRIco   = ({ s=20 }) => <Icon size={s} d={<polyline points="9 18 15 12 9 6"/>} />;

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const DATA = {
  name: "Reb Emnacin", aka: "Jolts",
  bio: "CS student at New Era University. Builder of things that spark ideas — small tools, dashboards, and apps that don't exist yet but probably should.",
  status: "Open to Opportunities",
  github: "https://github.com/RebEmnacin",
  linkedin: "https://www.linkedin.com/in/reb-emnacin-a9752b404/",
  telegram: "https://t.me/RebEmnacin",
  email: "mailto:rebqemnacin@gmail.com",
  school: "New Era University", degree: "BS Computer Science", year: "2024–present",

  stack: {
    Frontend: [
      { n: "React",      I: ReactIco, bg:"#0b2733", fg:"#61dafb" },
      { n: "JavaScript", I: JsIco,    bg:"#2b2200", fg:"#f7df1e" },
      { n: "TypeScript", I: TsIco,    bg:"#0d2745", fg:"#3178c6" },
      { n: "HTML",       I: HtmlIco,  bg:"#3a1505", fg:"#e34f26" },
      { n: "CSS",        I: CssIco,   bg:"#0d1b45", fg:"#5577e0" },
    ],
    Backend: [
      { n: "Node.js",    I: NodeIco,  bg:"#0d2412", fg:"#6cc04a" },
      { n: "Python",     I: SnakeIco, bg:"#0d2433", fg:"#4b8bbe" },
      { n: "Java",       I: CoffeeIco,bg:"#3a1004", fg:"#ea4d2e" },
      { n: "FastAPI",    I: ApiIco,   bg:"#04302c", fg:"#1fc7b8" },
    ],
    Database: [
      { n: "MySQL",      I: DbIco,    bg:"#06222c", fg:"#3a92c0" },
      { n: "Oracle",     I: CloudIco, bg:"#330303", fg:"#f80000" },
    ],
    Tools: [
      { n: "Figma",      I: FigmaIco, bg:"#1c0e2e", fg:"#b07cff" },
      { n: "AI / Claude",I: BotIco,   bg:"#321d10", fg:"#d97757" },
    ],
  },

  certs: [
    { org: "IBM · Cognitive Class", c: "#ffcb05", I: DbIco,    title: "SQL and Relational Databases 101",         url: "https://courses.cognitiveclass.ai/certificates/248159af4c5846d4ab620d5e39948f5e",                                                                                             img: "https://images.credly.com/images/5c8fca38-b0d2-49e5-9ad2-f3f8e79b327f/twitter_thumb_201604_image.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: CloudIco, title: "OCI 2025 Certified Foundations Associate",  url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6941EF3CB5EB7C0833D64EF5BF8A257C21D53C11A362E7DD0DAB73518C59AF58", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-foundations.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: BarIco,   title: "Oracle Data Platform Foundations Associate", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC6BF38C8A976E45FFE6F233D652B85BF2EF4C7AEBBE068491AA129A001DBC33", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-foundations.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: BotIco,   title: "OCI AI Foundations Associate (2025)",       url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=71CC11DCFE431802B2DE719C81F52F2AF2478ABAB7563607DBE6DB72E5B607C0", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-AI-foundations.png" },
  ],

  projects: [
    { I: BreadIco, n: "breadcrumber",     d: "AI-powered roadmap builder for creatives. ADHD-friendly project manager that breaks goals into bite-sized, achievable steps.", tags: ["React","FastAPI","Gemini AI","Python"], url: "https://github.com/RebEmnacin/breadcrumber-app" },
    { I: GlobeIco, n: "Portfolio Website", d: "This very portfolio — built with pure HTML/CSS/JS then re-imagined in React.",                                              tags: ["HTML","CSS","JS","React"],              url: "https://github.com/RebEmnacin" },
  ],
};

/* ─────────────────────────────────────────────────────────────────
   CSS
───────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
html, body { height:100%; -webkit-font-smoothing:antialiased; }

:root {
  --bg:#ffffff;
  --bg2:#f5f5f0;
  --bg3:#ebebе3;
  --border:#d4d0c8;
  --border2:#b8b4aa;
  --tx:#555550;
  --txh:#111110;
  --txm:#444440;
  --ac:#ffcb05;
  --acd:#f0be00;
  --sea:#222220;
  --sea2:#333330;
  --acbg:rgba(255,203,5,.12);
  --acborder:rgba(0,0,0,.25);
  --sh:0 4px 24px rgba(0,0,0,.12);
  --shl:0 12px 40px rgba(0,0,0,.16);
  --sans:'Syne',sans-serif;
  --display:'Bebas Neue',sans-serif;
  --mono:'DM Mono',monospace;
  --ease-out-expo:cubic-bezier(.16,1,.3,1);
  --ease-bounce:cubic-bezier(.34,1.56,.64,1);
  --ink:none;
}

/* FIX 4: custom cursor everywhere — no pointer fallbacks */
body { background:var(--bg); font-family:var(--sans); color:var(--tx); overflow-x:hidden; cursor:none; }
button { cursor:none !important; font-family:var(--sans); }
a { cursor:none !important; text-decoration:none; color:inherit; }
input, textarea { cursor:none !important; font-family:var(--sans); }
* { cursor:none !important; }

/* ── CUSTOM CURSOR (arrow/pointer style) ── */
.cursor-arrow {
  position:fixed;
  top:0; left:0;
  width:27px; height:30px;
  pointer-events:none;
  z-index:9999;
  transform:translate(0,0);
  transition:opacity .2s ease;
  opacity:0;
}
/* Keep custom cursor on mobile too, just hide the SVG since touch has no cursor */
@media(max-width:960px){ .cursor-arrow{ display:none; } }

/* ── GRAIN TEXTURE OVERLAY ── */
body::before {
  content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:.035; background-repeat:repeat; background-size:180px;
}

/* ── MINI PROGRESS BAR ── */
.mini-progress {
  position:fixed;
  top:20px; left:20px;
  z-index:600;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:5px;
}
.mini-progress-track {
  width:120px; height:10px;
  background:rgba(0,0,0,.10);
  border-radius:999px;
  position:relative; overflow:hidden;
}
.mini-progress-fill {
  position:absolute; top:0; left:0; bottom:0;
  background:var(--ac); border-radius:999px;
  transition:width .15s ease-out; min-width:10px;
}

/* ── LOGO ── */
.logo { position:fixed; top:20px; left:20px; z-index:600;
  display:flex; align-items:center; gap:10px;
  background:var(--bg); border:var(--ink);
  border-radius:0; padding:8px 16px;
  box-shadow:3px 3px 0 var(--ac);
  transition:left .3s, box-shadow .2s; }
.logo:hover { box-shadow:5px 5px 0 var(--ac); }
.logo.shift { left:80px; }
.logo-mark { width:26px; height:26px; background:var(--ac); display:flex;
  align-items:center; justify-content:center; color:#000; font-size:14px; }
.logo-text { font-family:var(--mono); font-size:11px; font-weight:600; color:var(--txh);
  letter-spacing:.08em; text-transform:uppercase; }

/* ══════════════════════════════════════════════════════════
   HORIZONTAL STAGE
══════════════════════════════════════════════════════════ */
.stage { position:fixed; inset:0; z-index:2; display:flex;
  transition:transform 1s cubic-bezier(.77,0,.175,1);
  will-change:transform; overflow:visible; }
.panel-home { flex:0 0 100vw; width:100vw; height:100vh; overflow:visible; position:relative; }
.panel-scroll { flex:0 0 100vw; width:100vw; height:100vh;
  overflow-y:auto; overflow-x:hidden; position:relative; scroll-behavior:smooth; }
.panel-scroll::-webkit-scrollbar { width:3px; }
.panel-scroll::-webkit-scrollbar-track { background:transparent; }
.panel-scroll::-webkit-scrollbar-thumb { background:var(--border2); }
.panel-scroll::-webkit-scrollbar-thumb:hover { background:var(--ac); }

/* ══════════════════════════════════════════════════════════
   PANEL 1 — LANDING
══════════════════════════════════════════════════════════ */
.p1-wrap { min-height:100vh; display:flex; align-items:center;
  justify-content:center; gap:100px; padding:0 64px; max-width:1360px;
  margin:0 auto; position:relative; }
.p1-left { flex:0 0 auto; max-width:560px; }
.p1-eyebrow { font-family:var(--mono); font-size:10px; color:var(--ac);
  letter-spacing:.3em; text-transform:uppercase; margin-bottom:24px;
  opacity:0; animation:fadeUp .5s var(--ease-out-expo) .1s both;
  display:flex; align-items:center; gap:12px; }
.p1-eyebrow::before { content:''; display:block; width:32px; height:1px; background:var(--ac); }
.p1-title { font-family:var(--display); font-size:clamp(52px,8vw,108px);
  line-height:.88; letter-spacing:2px; color:var(--txh);
  -webkit-text-stroke:2px #111110; paint-order:stroke fill;
  margin-bottom:36px; text-transform:uppercase;
  opacity:0; animation:fadeUp .6s var(--ease-out-expo) .2s both; }
.p1-title .p1-line1 { display:block; color:var(--txh); }
.p1-title .p1-line2 { display:block; color:var(--ac); }
.p1-title span { display:block; }
.p1-title span.solid { color:var(--ac); }
.p1-line2 { margin-top:-4px; }
.p1-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px;
  opacity:0; animation:fadeUp .5s var(--ease-out-expo) .35s both; }
.p1-pill { display:inline-flex; align-items:center; gap:7px;
  background:transparent; border:1px solid var(--border2); color:var(--txm);
  padding:8px 14px; border-radius:0;
  font-family:var(--mono); font-size:10px; font-weight:600; letter-spacing:.05em;
  transition:all .2s ease; }
.p1-pill:hover { border-color:var(--ac); color:var(--ac);
  box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }
.enter-btn-wrap { opacity:0; animation:fadeUp .5s var(--ease-out-expo) .48s both; }

/* ── PROFILE PHOTO ── */
.profile-seam { flex:0 0 auto;
  width:min(420px,34vw); height:min(420px,34vw);
  z-index:10; pointer-events:none;
  animation:floatY 6s ease-in-out infinite; }
.profile-seam img { width:100%; height:100%; object-fit:cover; border-radius:50%;
  border:3px solid var(--ac); box-shadow:6px 6px 0 #111110; display:block; }
@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }

/* ── SCROLL CUE ── */
.scroll-cue { display:flex; flex-direction:column; align-items:center; gap:8px;
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  font-family:var(--mono); font-size:8px; letter-spacing:.3em;
  text-transform:uppercase; color:var(--tx); pointer-events:none; }
.scroll-cue-line { width:1px; height:32px;
  background:linear-gradient(var(--ac),transparent);
  animation:scrollCue 1.8s ease-in-out infinite; }
@keyframes scrollCue { 0%,100%{opacity:.2;transform:scaleY(.4)} 50%{opacity:1;transform:scaleY(1)} }

/* ── BUTTON STYLES ── */
.mag-btn { position:relative; display:inline-flex; align-items:center; gap:10px;
  background:var(--ac); color:#000;
  font-family:var(--display); font-size:15px;
  letter-spacing:.08em; text-transform:uppercase;
  padding:14px 32px; border-radius:0; border:none;
  overflow:hidden;
  box-shadow:4px 4px 0 #000;
  transition:box-shadow .15s ease, transform .15s ease; }
.mag-btn::before { content:''; position:absolute; inset:0;
  background:#000; transform:translateX(-101%);
  transition:transform .35s cubic-bezier(.83,0,.17,1); }
.mag-btn:hover::before { transform:translateX(0); }
.mag-btn:hover { box-shadow:2px 2px 0 var(--ac); transform:translate(2px,2px); color:var(--ac); }
.mag-btn span,.mag-btn svg { position:relative; z-index:1; }
.mag-btn svg { transition:transform .3s var(--ease-bounce); }
.mag-btn:hover svg { transform:translateX(5px); }
.mag-btn-ghost { position:relative; display:inline-flex; align-items:center; gap:10px;
  background:transparent; color:var(--txm);
  font-family:var(--display); font-size:15px; letter-spacing:.08em; text-transform:uppercase;
  padding:14px 32px; border-radius:0; border:1px solid var(--border2); overflow:hidden;
  box-shadow:3px 3px 0 var(--border2);
  transition:all .15s ease; }
.mag-btn-ghost::before { content:''; position:absolute; inset:0;
  background:var(--acbg); transform:translateX(-101%);
  transition:transform .35s cubic-bezier(.83,0,.17,1); }
.mag-btn-ghost:hover::before { transform:translateX(0); }
.mag-btn-ghost:hover { border-color:var(--ac); color:var(--ac);
  box-shadow:3px 3px 0 var(--ac); transform:translate(-1px,-1px); }
.mag-btn-ghost span,.mag-btn-ghost svg { position:relative; z-index:1; }
.mag-btn-ghost svg { transition:transform .3s var(--ease-bounce); }
.mag-btn-ghost:hover svg { transform:translateX(5px); }
.ripple-circle {
  position:absolute; border-radius:50%;
  transform:translate(-50%,-50%) scale(0);
  animation:rippleAnim .6s linear; pointer-events:none;
  width:30px; height:30px; background:rgba(255,255,255,.35);
}
.mag-btn .ripple-circle { background:rgba(255,255,255,.3); }
.mag-btn-ghost .ripple-circle { background:rgba(255,203,5,.3); }
@keyframes rippleAnim { to{transform:translate(-50%,-50%) scale(12);opacity:0} }

/* ══════════════════════════════════════════════════════════
   SCROLL PANEL INNER
══════════════════════════════════════════════════════════ */
.sp-inner { width:100%; padding:0 80px 120px 120px; }
@keyframes fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeLeft { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
.reveal { opacity:0; transform:translateY(40px);
  transition:opacity .3s var(--ease-out-expo), transform .3s var(--ease-out-expo); }
.reveal.out { opacity:0; transform:translateY(-24px);
  transition:opacity .5s ease, transform .5s ease; }
.reveal.vis { opacity:1; transform:translateY(0); }

/* ══════════════════════════════════════════════════════════
   HERO #2
══════════════════════════════════════════════════════════ */
.hero2-wrap { display:flex; align-items:center; justify-content:center;
  gap:100px; height:100vh; max-width:1360px; margin:0 auto; padding:0 64px; }
.hero2-photo { flex:0 0 auto; display:flex; align-items:center; justify-content:center; }
.hero2-photo img { width:min(400px,36vw); height:min(400px,36vw);
  object-fit:cover; border-radius:50%; border:3px solid var(--ac);
  box-shadow:6px 6px 0 #111110;
  animation:floatY2 6s ease-in-out infinite; }
@keyframes floatY2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
.hero2-text { flex:1; max-width:620px; }
.fsd-badge { display:inline-flex; align-items:center; gap:8px;
  background:var(--ac); color:#000;
  font-family:var(--mono); font-size:10px; font-weight:700;
  padding:7px 16px; border-radius:0; letter-spacing:.1em;
  margin-bottom:20px; width:fit-content; }
.status-pill { display:inline-flex; align-items:center; gap:7px;
  border:1px solid var(--border2); background:transparent;
  padding:5px 13px; border-radius:0;
  font-size:10px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; color:var(--txm);
  width:fit-content; margin-bottom:24px; }
.sdot { width:6px; height:6px; border-radius:50%; background:#22c55e;
  box-shadow:0 0 0 3px rgba(34,197,94,.2);
  animation:blink 2.2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
.hero2-name { font-family:var(--display); font-size:clamp(52px,7vw,96px);
  color:var(--txh); line-height:.92; letter-spacing:2px;
  -webkit-text-stroke:1.5px #111110; paint-order:stroke fill;
  margin-bottom:28px; text-transform:uppercase; }
.hero2-name em { font-style:normal; color:var(--ac); }
.hero-bio { font-size:15px; color:var(--txm); line-height:1.85;
  margin-bottom:36px; max-width:520px; border-left:2px solid var(--ac);
  padding-left:20px; }
.cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px; }
.social-row { display:flex; gap:8px; flex-wrap:wrap; }
.soc-link { display:inline-flex; align-items:center; gap:7px;
  border:1px solid var(--border2); color:var(--tx);
  padding:7px 13px; border-radius:0;
  font-family:var(--mono); font-size:9px; letter-spacing:.06em;
  transition:all .2s ease; }
.soc-link:hover { border-color:var(--ac); color:var(--ac);
  box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }

/* ══════════════════════════════════════════════════════════
   SECTION DIVIDERS
══════════════════════════════════════════════════════════ */
.sec-divider { display:flex; align-items:center; gap:0;
  margin:100px 0 56px; border-top:var(--ink); padding-top:20px; }
.sec-num { font-family:var(--mono); font-size:10px; color:var(--ac);
  letter-spacing:.2em; margin-right:16px; }
.sec-divider-lbl { font-family:var(--mono); font-size:9px; font-weight:700;
  letter-spacing:.28em; text-transform:uppercase; color:var(--txm); }
.sec-divider-line { flex:1; height:1px; background:var(--border); margin-left:20px; }
.eyebrow { font-family:var(--mono); font-size:9px; color:var(--ac);
  letter-spacing:.28em; text-transform:uppercase; margin-bottom:12px;
  display:flex; align-items:center; gap:10px; }
.eyebrow::before { content:''; display:block; width:20px; height:1px; background:var(--ac); }
.pg-title { font-family:var(--display); font-size:clamp(44px,6.5vw,86px);
  color:var(--txh); line-height:.92; letter-spacing:2px;
  -webkit-text-stroke:1.5px #111110; paint-order:stroke fill;
  margin-bottom:48px; text-transform:uppercase; }
.pg-title em { font-style:normal; color:var(--ac); }

/* ── FIX 3: Get in Touch centered ── */
.contact-heading-wrap {
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.contact-heading-wrap .eyebrow {
  justify-content:center;
}
.contact-heading-wrap .eyebrow::before { display:none; }

/* ══════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════ */
.folder-stage { display:flex; flex-direction:column; align-items:center;
  justify-content:center; min-height:280px; gap:16px; }
.folder-btn { width:130px; height:110px; border:none; background:transparent;
  display:flex; flex-direction:column; align-items:center; gap:12px;
  color:var(--ac); transition:opacity .3s, transform .3s; }
.folder-btn:hover { transform:translateY(-6px) scale(1.05); }
.folder-btn.pop-out { opacity:0; transform:scale(.4) rotate(12deg); }
.folder-ico-wrap { width:100px; height:84px; border:2px solid var(--ac);
  background:var(--acbg); display:flex; align-items:center; justify-content:center;
  box-shadow:4px 4px 0 var(--ac); animation:folderPulse 2.8s ease-in-out infinite; }
@keyframes folderPulse {
  0%,100%{ box-shadow:4px 4px 0 var(--ac); }
  50%    { box-shadow:6px 6px 0 var(--ac); transform:translate(-1px,-1px); }
}
.folder-label { font-family:var(--mono); font-size:10px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--txh); }
.folder-hint { font-family:var(--mono); font-size:9px; color:var(--tx); }
.proj-pop { animation:popIn .45s var(--ease-out-expo) both; }
@keyframes popIn { from{opacity:0;transform:scale(.92) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
.back-row { display:flex; align-items:center; gap:10px; margin-bottom:32px; }
.back-btn { display:inline-flex; align-items:center; gap:7px;
  border:1px solid var(--border2); color:var(--txm);
  font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.06em;
  padding:7px 14px; border-radius:0; background:transparent;
  transition:all .2s ease; }
.back-btn:hover { border-color:var(--ac); color:var(--ac);
  box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }
.proj-grid { display:flex; flex-direction:column; border-top:var(--ink); }
.pcard { display:flex; align-items:center; justify-content:space-between;
  gap:24px; padding:28px 0; border-bottom:var(--ink);
  color:var(--txh); text-decoration:none;
  position:relative; overflow:hidden;
  transition:padding-left .3s var(--ease-out-expo); }
.pcard::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0;
  background:var(--acbg); transition:width .35s var(--ease-out-expo); z-index:0; }
.pcard:hover::before { width:100%; }
.pcard:hover { padding-left:16px; }
.pcard-left { display:flex; align-items:center; gap:20px; z-index:1; flex:1; }
.pcard-num { font-family:var(--mono); font-size:11px; color:var(--ac);
  letter-spacing:.1em; min-width:32px; }
.pcard-icon { color:var(--ac); opacity:.7; transition:opacity .2s; }
.pcard:hover .pcard-icon { opacity:1; }
.pcard-info { flex:1; }
.pcard-info h3 { font-family:var(--display); font-size:20px; color:var(--txh);
  text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px;
  transition:color .2s; }
.pcard:hover .pcard-info h3 { color:var(--ac); }
.pcard-info p { font-size:12px; color:var(--tx); line-height:1.6; max-width:480px; }
.ptags { display:flex; flex-wrap:wrap; gap:5px; z-index:1; }
.ptag { border:1px solid var(--border2); color:var(--tx);
  font-family:var(--mono); font-size:8px; font-weight:700; letter-spacing:.08em;
  padding:3px 8px; border-radius:0; transition:all .2s; }
.pcard:hover .ptag { border-color:var(--acborder); color:var(--ac); }
.pcard-arr { color:var(--tx); z-index:1; transition:all .3s var(--ease-bounce); flex-shrink:0; }
.pcard:hover .pcard-arr { color:var(--ac); transform:translateX(6px); }
.proj-footer { display:flex; align-items:center; gap:18px; margin-top:28px; padding-top:20px; }
.more-circle { display:flex; flex-direction:column; align-items:center;
  justify-content:center; gap:5px; width:86px; height:86px;
  border:2px solid var(--ac); background:transparent; color:var(--ac);
  font-family:var(--mono); font-size:9px; font-weight:700;
  box-shadow:4px 4px 0 var(--ac);
  transition:all .2s ease; text-align:center; line-height:1.3; }
.more-circle:hover { background:var(--ac); color:#000;
  box-shadow:2px 2px 0 #000; transform:translate(2px,2px); }

/* ══════════════════════════════════════════════════════════
   FIX 5: 3D CERT SLIDER
══════════════════════════════════════════════════════════ */
.cert-slider-outer {
  position:relative;
  width:100%;
  height:420px;
  overflow:hidden;
  background:linear-gradient(135deg, #0a0a0a 0%, #111110 100%);
  border:1px solid var(--border);
}
.cert-slider-stage {
  position:relative;
  width:100%;
  height:100%;
}
.cert-slide {
  position:absolute;
  top:50%; left:50%;
  width:260px; height:340px;
  margin-top:-170px; margin-left:-130px;
  border-radius:0;
  overflow:hidden;
  will-change:transform;
  box-shadow:0 20px 60px rgba(0,0,0,.6);
  border:1px solid rgba(255,255,255,.08);
}
.cert-slide-inner {
  width:100%; height:100%;
  position:relative;
  transition:opacity .3s ease;
}
.cert-slide-inner::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to bottom,rgba(0,0,0,.2) 0%,transparent 40%,rgba(0,0,0,.65) 100%);
  z-index:1;
}
.cert-slide-img {
  width:100%; height:55%;
  object-fit:contain;
  padding:24px;
  background:linear-gradient(135deg,#1a1a1a,#0d0d0d);
}
.cert-slide-body {
  padding:16px 18px;
  background:#111;
  height:45%;
  display:flex; flex-direction:column; justify-content:space-between;
}
.cert-slide-org {
  font-family:var(--mono); font-size:8px; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase;
  color:var(--ac); margin-bottom:6px;
}
.cert-slide-title {
  font-family:var(--display); font-size:14px;
  text-transform:uppercase; letter-spacing:.04em;
  color:#fff; line-height:1.4; flex:1;
}
.cert-slide-verify {
  display:inline-flex; align-items:center; gap:5px;
  font-family:var(--mono); font-size:8px; font-weight:700;
  letter-spacing:.1em; color:rgba(255,255,255,.5);
  margin-top:8px; padding-top:8px;
  border-top:1px solid rgba(255,255,255,.1);
}
.cert-slide-num {
  position:absolute; top:12px; left:14px; z-index:5;
  font-family:var(--display); font-size:48px; line-height:1;
  color:rgba(255,255,255,.12); pointer-events:none;
}
.cert-slider-controls {
  position:absolute; bottom:16px; left:50%; transform:translateX(-50%);
  display:flex; align-items:center; gap:12px; z-index:10;
}
.cert-ctrl-btn {
  width:36px; height:36px; border-radius:50%;
  border:1px solid rgba(255,255,255,.2); background:rgba(0,0,0,.4);
  display:flex; align-items:center; justify-content:center;
  color:rgba(255,255,255,.7);
  transition:all .2s ease;
}
.cert-ctrl-btn:hover { border-color:var(--ac); color:var(--ac);
  background:rgba(255,203,5,.1); box-shadow:0 0 0 2px rgba(255,203,5,.2); }
.cert-ctrl-dots { display:flex; gap:6px; }
.cert-dot { width:6px; height:6px; border-radius:50%;
  background:rgba(255,255,255,.2); transition:all .3s ease; }
.cert-dot.active { background:var(--ac); width:18px; border-radius:3px; }
.cert-hint { text-align:center; font-family:var(--mono); font-size:8px;
  color:var(--tx); margin-top:12px; letter-spacing:.12em; text-transform:uppercase; }

/* ══════════════════════════════════════════════════════════
   FIX 2: TECH STACK — side by side, title left / chips right
══════════════════════════════════════════════════════════ */
.stack-section-wrap {
  display:flex;
  gap:0;
  align-items:flex-start;
  border-top:1px solid var(--border);
  padding-top:0;
}

/* Left column: sticky "MY STACK" title */
.stack-title-col {
  flex:0 0 260px;
  position:sticky;
  top:60px;
  align-self:flex-start;
  padding:40px 0 40px 0;
}
.stack-big-title {
  font-family:var(--display);
  font-size:clamp(52px,5.5vw,80px);
  color:var(--txh);
  line-height:.9;
  letter-spacing:2px;
  text-transform:uppercase;
  -webkit-text-stroke:1.5px #111110;
  paint-order:stroke fill;
}
.stack-big-title em { font-style:normal; color:var(--ac); }

/* Right column: rows of chips */
.stack-rows-col {
  flex:1;
  display:flex;
  flex-direction:column;
  border-left:1px solid var(--border);
  padding-left:48px;
}
.stack-row {
  display:flex;
  flex-direction:column;
  gap:12px;
  padding:28px 0;
  border-bottom:1px solid var(--border);
}
.stack-row:last-child { border-bottom:none; }
.stack-cat-wrap { overflow:hidden; }
.stack-cat {
  font-family:var(--mono); font-size:9px; font-weight:700;
  letter-spacing:.2em; text-transform:uppercase; color:var(--ac);
  transform:translateY(100%); opacity:0;
  transition:transform .5s cubic-bezier(.16,1,.3,1), opacity .4s ease;
  display:block;
}
.stack-cat.sliced { transform:translateY(0); opacity:1; }
.stack-items { display:flex; flex-wrap:wrap; gap:10px; }
.stack-chip {
  display:flex; align-items:center; gap:10px;
  background:transparent; border:1px solid var(--border2);
  padding:10px 16px; border-radius:0;
  transition:all .2s ease;
}
.stack-chip:hover { transform:translateY(-2px); border-color:var(--ac); box-shadow:2px 2px 0 #111110; }
.stack-sq { width:28px; height:28px; display:flex; align-items:center;
  justify-content:center; flex-shrink:0; }
.stack-name { font-size:13px; font-weight:700; color:var(--txm);
  white-space:nowrap; letter-spacing:.02em; transition:color .2s ease; }
.stack-chip:hover .stack-name { color:var(--txh); }

/* Blur-pop for profile images — FIX 1: removed scale() so no enlarge */
.profile-seam img,
.hero2-photo img {
  animation:blurPopFloat 1s cubic-bezier(.16,1,.3,1) both, floatY 6s ease-in-out 1s infinite;
}
.hero2-photo img {
  animation:blurPop .8s cubic-bezier(.16,1,.3,1) both, floatY2 6s ease-in-out .8s infinite;
}
@keyframes blurPopFloat {
  0%   { opacity:0; filter:blur(20px); }
  60%  { filter:blur(0px); }
  100% { opacity:1; filter:blur(0px); }
}
@keyframes blurPop {
  0%   { opacity:0; filter:blur(24px); }
  60%  { filter:blur(0px); }
  100% { opacity:1; filter:blur(0px); }
}

/* ══════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════ */
.contact-cta { display:flex; flex-direction:column; align-items:center;
  text-align:center; padding:60px 20px 40px; gap:18px; }
.cta-label { font-family:var(--mono); font-size:13px; color:var(--txm);
  letter-spacing:.06em; }
.cta-email { font-family:var(--display); font-size:clamp(28px,5.2vw,56px);
  color:var(--txh); letter-spacing:1px; text-transform:lowercase;
  padding:6px 4px; border-bottom:2px solid transparent;
  transition:color .25s ease, border-color .25s ease; }
.cta-email:hover { color:var(--ac); border-color:var(--ac); }
.cta-credit { font-family:var(--mono); font-size:11px; color:var(--tx);
  letter-spacing:.08em; margin-top:6px; }
.cta-social { display:flex; gap:10px; margin-top:8px; }

/* ── FOOTER ── */
.footer-back { display:inline-flex; align-items:center; gap:8px;
  border:1px solid var(--border2); color:var(--txm);
  font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; padding:10px 22px; background:transparent;
  transition:all .2s ease; }
.footer-back:hover { border-color:var(--ac); color:var(--ac);
  box-shadow:3px 3px 0 var(--ac); transform:translate(-2px,-2px); }

/* ── FLOATING NAV ── */
.fnav {
  position:fixed; left:16px; top:50%; transform:translateY(-50%);
  z-index:600; display:flex; flex-direction:column; align-items:center;
  gap:8px; background:transparent; border:none; border-radius:999px;
  padding:10px 8px; box-shadow:none;
}
.fnav:has(.fnav-items.open) {
  background:rgba(255,255,255,.9); border:1px solid var(--border);
  box-shadow:3px 3px 0 #111110;
}
.fnav-trigger {
  width:36px; height:36px; border-radius:50%;
  border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm);
  transition:all .2s ease;
}
.fnav-trigger:hover { border-color:var(--ac); color:#000; background:var(--ac); box-shadow:2px 2px 0 #111110; }
.fnav-items {
  display:flex; flex-direction:column; align-items:center; gap:8px;
  overflow:hidden; max-height:0; opacity:0;
  transition:max-height .45s cubic-bezier(.16,1,.3,1), opacity .25s ease;
  pointer-events:none;
}
.fnav-items.open { max-height:400px; opacity:1; pointer-events:auto; }
.fnav-item {
  display:flex; align-items:center; position:relative;
  opacity:0; transform:translateX(-8px);
  transition:opacity .25s ease, transform .3s cubic-bezier(.34,1.56,.64,1);
}
.fnav-items.open .fnav-item { opacity:1; transform:translateX(0); }
.fnav-items.open .fnav-item:nth-child(1){transition-delay:.04s}
.fnav-items.open .fnav-item:nth-child(2){transition-delay:.08s}
.fnav-items.open .fnav-item:nth-child(3){transition-delay:.12s}
.fnav-items.open .fnav-item:nth-child(4){transition-delay:.16s}
.fnav-items.open .fnav-item:nth-child(5){transition-delay:.20s}
.fnav-lbl {
  position:absolute; left:calc(100% + 10px); top:50%; transform:translateY(-50%);
  font-family:var(--mono); font-size:9px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--txh);
  background:#ffffff; border:1px solid var(--border2);
  padding:5px 10px; height:28px;
  display:flex; align-items:center; white-space:nowrap; border-radius:4px;
  box-shadow:2px 2px 0 #111110; opacity:0; pointer-events:none;
  transition:opacity .15s ease, transform .15s ease;
  transform:translateY(-50%) translateX(-4px);
}
.fnav-btn {
  width:36px; height:36px; border-radius:50%;
  border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm);
  transition:all .2s ease;
}
.fnav-btn:hover, .fnav-btn.active {
  border-color:var(--ac); color:#000; background:var(--ac); box-shadow:2px 2px 0 #111110;
}
.fnav-item:hover .fnav-lbl { opacity:1; transform:translateY(-50%) translateX(0); }
.fnav-close {
  width:36px; height:36px; border-radius:50%;
  border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm);
  transition:all .2s ease;
}
.fnav-close:hover { border-color:#ef4444; color:#ef4444; box-shadow:2px 2px 0 #ef4444; }

/* ── RESPONSIVE ── */
@media(max-width:1200px){
  .sp-inner{padding:0 60px 100px 100px}
  .p1-wrap{padding:0 48px;gap:60px}
  .hero2-wrap{padding:0 48px;gap:60px}
  .stack-title-col{flex:0 0 200px}
}
@media(max-width:960px){
  .p1-wrap{padding:0 32px;flex-direction:column;justify-content:center;gap:40px}
  .profile-seam{width:min(280px,60vw);height:min(280px,60vw)}
  .sp-inner{padding:0 40px 80px 72px}
  .hero2-wrap{flex-direction:column;justify-content:center;gap:36px;height:auto;min-height:100vh;padding:80px 32px 60px}
  .hero2-photo img{width:240px;height:240px}
  .pcard{flex-direction:column;align-items:flex-start;gap:12px}
  .stack-section-wrap{flex-direction:column}
  .stack-title-col{position:static;padding:32px 0 16px;flex:none}
  .stack-rows-col{border-left:none;padding-left:0;border-top:1px solid var(--border)}
}
@media(max-width:600px){
  .sp-inner{padding:0 20px 60px 20px}
  .p1-wrap{padding:0 20px}
  .p1-title{font-size:clamp(44px,14vw,72px)}
  .cert-slide{width:220px;height:290px;margin-top:-145px;margin-left:-110px}
  .stack-row{grid-template-columns:1fr}
}
`;

/* ─────────────────────────────────────────────────────────────────
   FIX 1: PARTICLE BACKGROUND — no scale, just blur fade
───────────────────────────────────────────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = ["#000000"];
    const COUNT = 60;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true;

    const px = new Float32Array(COUNT);
    const py = new Float32Array(COUNT);
    const pvx = new Float32Array(COUNT);
    const pvy = new Float32Array(COUNT);
    const pr = new Float32Array(COUNT);
    const pa = new Float32Array(COUNT);
    const pc = new Uint8Array(COUNT);

    /* FIX 1: sprites drawn without scale transform — plain radial gradient only */
    const sprites = COLORS.map(color => {
      const sz = 120;
      const c = document.createElement("canvas");
      c.width = sz; c.height = sz;
      const cx2 = sz / 2;
      const g = c.getContext("2d");
      const grad = g.createRadialGradient(cx2, cx2, 0, cx2, cx2, cx2);
      grad.addColorStop(0, color + "cc");
      grad.addColorStop(0.4, color + "44");
      grad.addColorStop(1, color + "00");
      g.beginPath();
      g.arc(cx2, cx2, cx2, 0, Math.PI * 2);
      g.fillStyle = grad;
      g.fill();
      return c;
    });

    const init = () => {
      for (let i = 0; i < COUNT; i++) {
        px[i] = Math.random() * w;
        py[i] = Math.random() * h;
        pvx[i] = (Math.random() - 0.5) * 0.6;
        pvy[i] = (Math.random() - 0.5) * 0.6;
        pr[i] = 6 + Math.random() * 18;
        pa[i] = 0.15 + Math.random() * 0.25;
        pc[i] = Math.floor(Math.random() * COLORS.length);
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = container.clientWidth;
      h = container.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.scale(dpr, dpr);
      init();
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < COUNT; i++) {
        px[i] += pvx[i]; py[i] += pvy[i];
        const r = pr[i];
        if (px[i] < r) { px[i] = r; pvx[i] *= -1; }
        else if (px[i] > w - r) { px[i] = w - r; pvx[i] *= -1; }
        if (py[i] < r) { py[i] = r; pvy[i] *= -1; }
        else if (py[i] > h - r) { py[i] = h - r; pvy[i] *= -1; }
        /* FIX 1: drawSize is fixed — no scale/enlarge, just constant size */
        const drawSize = r * 8;
        ctx.globalAlpha = pa[i];
        ctx.drawImage(sprites[pc[i]], px[i] - drawSize / 2, py[i] - drawSize / 2, drawSize, drawSize);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div ref={containerRef} style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none" }}>
      <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FIX 4: CUSTOM CURSOR — always active, no pointer fallback
───────────────────────────────────────────────────────────────── */
function CustomCursor() {
  const ref = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (ref.current) ref.current.style.opacity = "1";
    };
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="cursor-arrow"
      width="27" height="30"
      viewBox="0 0 27 30"
      fill="none"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z"
        fill="#ffcb05"
        stroke="rgba(0,0,0,0.4)"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   REVEAL
───────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setState("vis");
        else setState(s => s === "vis" ? "out" : s);
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`reveal${state === "vis" ? " vis" : state === "out" ? " out" : ""} ${className}`}
      style={{ transitionDelay: state === "vis" ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
───────────────────────────────────────────────────────────────── */
function MagBtn({ children, onClick, href, ghost = false, className = "" }) {
  const btnRef = useRef(null);
  const addRipple = (e) => {
    const btn = btnRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple-circle";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };
  const cls = `${ghost ? "mag-btn-ghost" : "mag-btn"} ${className}`;
  const inner = <><span>{children}</span><ArrowIco s={13} /></>;
  if (href) return <a ref={btnRef} href={href} target="_blank" rel="noreferrer" className={cls} onClick={addRipple}>{inner}</a>;
  return <button ref={btnRef} className={cls} onClick={(e) => { addRipple(e); onClick?.(); }}>{inner}</button>;
}

/* ─────────────────────────────────────────────────────────────────
   FIX 5: 3D CERT SLIDER
───────────────────────────────────────────────────────────────── */
function CertSlider() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startActive = useRef(0);
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0); // 0 to (n-1)
  const targetRef = useRef(0);
  const n = DATA.certs.length;

  // smooth lerp loop
  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      progressRef.current += (targetRef.current - progressRef.current) * 0.1;
      updateSlides(progressRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  const updateSlides = (prog) => {
    const stage = stageRef.current;
    if (!stage) return;
    const slides = stage.querySelectorAll(".cert-slide");
    slides.forEach((el, i) => {
      const diff = i - prog;
      const tx = diff * 55;
      const tz = -Math.abs(diff) * 120;
      const ry = diff * -18;
      const scale = 1 - Math.abs(diff) * 0.12;
      const opacity = Math.max(0, 1 - Math.abs(diff) * 0.35);
      const zIndex = Math.round(100 - Math.abs(diff) * 10);
      el.style.transform = `translate3d(${tx}%, 0, ${tz}px) rotateY(${ry}deg) scale(${scale})`;
      el.style.opacity = opacity;
      el.style.zIndex = zIndex;
    });
    // update active dot
    const rounded = Math.round(prog);
    setActive(Math.max(0, Math.min(n - 1, rounded)));
  };

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(n - 1, idx));
    targetRef.current = clamped;
  };

  const onMouseDown = (e) => {
    setDragging(true);
    startX.current = e.clientX;
    startActive.current = targetRef.current;
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const diff = (startX.current - e.clientX) / 180;
    targetRef.current = Math.max(0, Math.min(n - 1, startActive.current + diff));
  };
  const onMouseUp = () => {
    setDragging(false);
    targetRef.current = Math.round(targetRef.current);
  };

  return (
    <>
      <div className="cert-slider-outer"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ perspective:"1200px", perspectiveOrigin:"50% 50%" }}
      >
        <div className="cert-slider-stage" ref={stageRef} style={{ transformStyle:"preserve-3d" }}>
          {DATA.certs.map((c, i) => (
            <div key={i} className="cert-slide" onClick={() => goTo(i)}>
              <div className="cert-slide-inner">
                <span className="cert-slide-num">{String(i + 1).padStart(2, "0")}</span>
                <img className="cert-slide-img" src={c.img} alt={c.title}
                  onError={e => { e.target.style.display = "none"; }} />
                <div className="cert-slide-body">
                  <div>
                    <div className="cert-slide-org">{c.org}</div>
                    <div className="cert-slide-title">{c.title}</div>
                  </div>
                  <a href={c.url} target="_blank" rel="noreferrer" className="cert-slide-verify"
                    onClick={e => e.stopPropagation()}>
                    <CheckIco s={10} /> Verify <ExtIco s={9} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cert-slider-controls">
          <button className="cert-ctrl-btn" onClick={() => goTo(active - 1)}><ChevLIco s={16} /></button>
          <div className="cert-ctrl-dots">
            {DATA.certs.map((_, i) => (
              <div key={i} className={`cert-dot${i === active ? " active" : ""}`}
                onClick={() => goTo(i)} />
            ))}
          </div>
          <button className="cert-ctrl-btn" onClick={() => goTo(active + 1)}><ChevRIco s={16} /></button>
        </div>
      </div>
      <div className="cert-hint">← drag or click to navigate →</div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FIX 2: STACK SECTION — side by side
───────────────────────────────────────────────────────────────── */
function StackSection() {
  return (
    <div className="stack-section-wrap">
      {/* Left: big sticky title */}
      <div className="stack-title-col">
        <Reveal>
          <div className="stack-big-title">My<br /><em>Stack</em></div>
        </Reveal>
      </div>

      {/* Right: category rows */}
      <div className="stack-rows-col">
        {Object.entries(DATA.stack).map(([cat, skills]) => (
          <div className="stack-row" key={cat}>
            <div className="stack-cat-wrap">
              <span className="stack-cat sliced">{cat}</span>
            </div>
            <div className="stack-items">
              {skills.map((s, i) => {
                const I = s.I;
                return (
                  <Reveal key={s.n} delay={i * 50} className="stack-chip-reveal">
                    <div className="stack-chip">
                      <span className="stack-sq" style={{ color: s.fg }}><I s={22} /></span>
                      <span className="stack-name">{s.n}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────────── */
function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const handleOpen = () => {
    setClosing(true);
    setTimeout(() => { setOpen(true); setClosing(false); }, 340);
  };
  if (!open) return (
    <div className="folder-stage">
      <button className={`folder-btn${closing ? " pop-out" : ""}`} onClick={handleOpen}>
        <span className="folder-ico-wrap"><FolderIco s={40} /></span>
        <span className="folder-label">Open Projects</span>
      </button>
      <span className="folder-hint">// click to view my work</span>
    </div>
  );
  return (
    <div className="proj-pop">
      <div className="back-row">
        <button className="back-btn" onClick={() => setOpen(false)}><BackIco s={12} /> Back</button>
      </div>
      <div className="proj-grid">
        {DATA.projects.map((p, i) => {
          const PI = p.I;
          return (
            <Reveal key={i} delay={i * 60}>
              <a href={p.url} target="_blank" rel="noreferrer" className="pcard">
                <div className="pcard-left">
                  <span className="pcard-num">_{String(i + 1).padStart(2, "0")}.</span>
                  <span className="pcard-icon"><PI s={20} /></span>
                  <div className="pcard-info">
                    <h3>{p.n}</h3>
                    <p>{p.d}</p>
                  </div>
                </div>
                <div className="ptags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                <span className="pcard-arr"><ArrowIco s={16} /></span>
              </a>
            </Reveal>
          );
        })}
      </div>
      <div className="proj-footer">
        <a href={DATA.github} target="_blank" rel="noreferrer" className="more-circle">
          <PlusIco s={18} /><span>More on<br />GitHub</span>
        </a>
        <div style={{ fontFamily:"var(--mono)", fontSize:"9px", color:"var(--tx)", letterSpacing:".08em" }}>
          // github.com/RebEmnacin
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:"home",     I:HomeIco,    lbl:"Home"    },
  { id:"projects", I:MonitorIco, lbl:"Projects" },
  { id:"certs",    I:StarIco,    lbl:"Certs"   },
  { id:"stack",    I:UserIco,    lbl:"Stack"   },
  { id:"contact",  I:MailIco,    lbl:"Contact" },
];
function FloatingNav({ onNav, onOpenChange, activeSection }) {
  const [open, setOpen] = useState(false);
  const toggle = (v) => { setOpen(v); onOpenChange?.(v); };
  return (
    <div className="fnav">
      {open && <button className="fnav-close" onClick={() => toggle(false)}><XIco s={16} /></button>}
      <div className={`fnav-items${open ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <div key={item.id} className="fnav-item">
            <button className={`fnav-btn${activeSection === item.id ? " active" : ""}`} onClick={() => { onNav(item.id); toggle(false); }}>
              <item.I s={16} />
            </button>
            <span className="fnav-lbl">{item.lbl}</span>
          </div>
        ))}
      </div>
      {!open && <button className="fnav-trigger" onClick={() => toggle(true)}><MenuIco s={16} /></button>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   INTRO PANEL
───────────────────────────────────────────────────────────────── */
function IntroPanel({ goScroll }) {
  return (
    <div className="p1-wrap">
      <div className="p1-left">
        <div className="p1-eyebrow">Jolts · Reb Emnacin</div>
        <h1 className="p1-title">
          <span className="p1-line1">Full Stack</span>
          <span className="p1-line2 solid">Developer</span>
        </h1>
        <div className="p1-pills">
          <a href={DATA.email}    className="p1-pill"><MailIco s={12} /> Gmail</a>
          <a href={DATA.github}   target="_blank" rel="noreferrer" className="p1-pill"><GhIco s={12} /> GitHub</a>
          <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="p1-pill"><LiIco s={12} /> LinkedIn</a>
          <a href={DATA.telegram} target="_blank" rel="noreferrer" className="p1-pill"><TgIco s={12} /> Telegram</a>
        </div>
        <div className="enter-btn-wrap">
          <MagBtn onClick={() => goScroll("hero")}>Enter Portfolio</MagBtn>
        </div>
      </div>
      <div className="profile-seam">
        <img src="/src/assets/RebProfile.jpg" alt="Reb Emnacin" />
      </div>
      <div className="scroll-cue">
        <span className="scroll-cue-line" />
        Scroll
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   HERO INTRO
───────────────────────────────────────────────────────────────── */
function HeroIntro({ goScroll }) {
  return (
    <div className="hero2-wrap" id="sec-hero">
      <div className="hero2-photo">
        <img src="/src/assets/RebProfile.jpg" alt="Reb Emnacin" />
      </div>
      <div className="hero2-text">
        <Reveal delay={0}><div className="fsd-badge"><ZapIco s={11} /> Full Stack Developer</div></Reveal>
        <Reveal delay={60}><div className="status-pill"><span className="sdot" /> {DATA.status}</div></Reveal>
        <Reveal delay={120}><h1 className="hero2-name">Hi, I'm <em>Reb</em></h1></Reveal>
        <Reveal delay={180}><p className="hero-bio">{DATA.bio}</p></Reveal>
        <Reveal delay={240}>
          <div className="cta-row">
            <MagBtn onClick={() => goScroll("projects")}>My Projects</MagBtn>
            <MagBtn ghost onClick={() => goScroll("contact")}>Get In Touch</MagBtn>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="social-row">
            <a href={DATA.github}   target="_blank" rel="noreferrer" className="soc-link"><GhIco s={13} /> github.com/RebEmnacin <ExtIco s={9} /></a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="soc-link"><LiIco s={13} /> LinkedIn <ExtIco s={9} /></a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL PANEL
───────────────────────────────────────────────────────────────── */
function ScrollPanel({ goScroll }) {
  return (
    <div className="sp-inner">
      <HeroIntro goScroll={goScroll} />

      <Reveal><div id="sec-projects" /><div className="eyebrow">Portfolio</div><h2 className="pg-title">Selected <em>Work</em></h2></Reveal>
      <ProjectsSection />

      {/* FIX 5: 3D cert slider */}
      <Reveal><div id="sec-certs" /><div className="eyebrow">Credentials</div><h2 className="pg-title">My <em>Certifications</em></h2></Reveal>
      <CertSlider />

      {/* FIX 2: Stack side-by-side — no extra heading needed, it's inside StackSection */}
      <div id="sec-stack" style={{ marginTop:"100px" }} />
      <StackSection />

      {/* FIX 3: Get in Touch centered */}
      <div id="sec-contact" style={{ marginTop:"100px" }} />
      <Reveal>
        <div className="contact-heading-wrap">
          <div className="eyebrow">Let's Talk</div>
          <h2 className="pg-title">Get in <em>Touch</em></h2>
        </div>
      </Reveal>

      <div className="contact-cta">
        <Reveal><p className="cta-label">Have a project in mind?</p></Reveal>
        <Reveal delay={60}>
          <a href={DATA.email} className="cta-email">{DATA.email.replace("mailto:", "")}</a>
        </Reveal>
        <Reveal delay={120}><p className="cta-credit">Designed &amp; built by {DATA.name}</p></Reveal>
        <div className="cta-social">
          <Reveal delay={160}><a href={DATA.github} target="_blank" rel="noreferrer" className="soc-link"><GhIco s={13} /> GitHub</a></Reveal>
          <Reveal delay={200}><a href={DATA.linkedin} target="_blank" rel="noreferrer" className="soc-link"><LiIco s={13} /> LinkedIn</a></Reveal>
          <Reveal delay={240}><a href={DATA.telegram} target="_blank" rel="noreferrer" className="soc-link"><TgIco s={13} /> Telegram</a></Reveal>
        </div>
      </div>

      <div style={{ textAlign:"center", marginTop:"80px", paddingTop:"40px", borderTop:"var(--ink)" }}>
        <button className="footer-back" onClick={() => goScroll("home")}>↑ Back to Top</button>
        <div style={{ fontFamily:"var(--mono)", fontSize:"8px", color:"var(--tx)", marginTop:"20px", letterSpacing:".12em", textTransform:"uppercase" }}>
          jolts.dev · {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [panel, setPanel] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef(null);
  const lockRef = useRef(false);

  const goScroll = useCallback((sectionId = "hero") => {
    if (sectionId === "home") {
      setPanel("home"); setActiveSection("home");
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, 900);
      return;
    }
    setPanel("scroll");
    setTimeout(() => {
      const el = document.getElementById(`sec-${sectionId}`);
      if (el) el.scrollIntoView({ behavior:"smooth" });
      else if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 900);
  }, []);

  const handleNav = useCallback((id) => { goScroll(id === "home" ? "home" : id); }, [goScroll]);

  useEffect(() => {
    const onWheel = (e) => {
      if (panel === "home" && e.deltaY > 0) {
        if (lockRef.current) return;
        lockRef.current = true; setTimeout(() => { lockRef.current = false; }, 1100);
        goScroll("hero");
      } else if (panel === "scroll") {
        const sp = scrollRef.current;
        if (e.deltaY < 0 && sp && sp.scrollTop === 0) {
          if (lockRef.current) return;
          lockRef.current = true; setTimeout(() => { lockRef.current = false; }, 1100);
          goScroll("home");
        }
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [panel, goScroll]);

  useEffect(() => {
    const sp = scrollRef.current;
    const update = () => {
      if (panel === "home") { setScrollPct(0); setActiveSection("home"); return; }
      if (!sp) return;
      const max = sp.scrollHeight - sp.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (sp.scrollTop / max) * 100) : 0);
      const secs = ["hero","projects","certs","stack","contact"];
      const idMap = { hero:"home", projects:"projects", certs:"certs", stack:"stack", contact:"contact" };
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(`sec-${secs[i]}`);
        if (el && el.getBoundingClientRect().top <= 160) { setActiveSection(idMap[secs[i]]); break; }
      }
    };
    update();
    sp?.addEventListener("scroll", update, { passive: true });
    return () => sp?.removeEventListener("scroll", update);
  }, [panel]);

  return (
    <>
      <style>{CSS}</style>
      <ParticleBackground />
      <CustomCursor />

      <div className="mini-progress">
        <div className="mini-progress-track">
          <div className="mini-progress-fill" style={{ width:`${scrollPct}%` }} />
        </div>
      </div>

      <FloatingNav onNav={handleNav} onOpenChange={setNavOpen} activeSection={activeSection} />
      <div
        className="stage"
        style={{ transform: panel === "scroll" ? "translateX(-100vw)" : "translateX(0)" }}
      >
        <div className="panel-home"><IntroPanel goScroll={goScroll} /></div>
        <div className="panel-scroll" ref={scrollRef}><ScrollPanel goScroll={goScroll} /></div>
      </div>
    </>
  );
}
