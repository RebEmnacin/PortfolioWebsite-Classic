import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flushSync } from "react-dom";
gsap.registerPlugin(ScrollTrigger);

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
      { n: "React",      I: ReactIco, fg:"#61dafb" },
      { n: "JavaScript", I: JsIco,    fg:"#f7df1e" },
      { n: "TypeScript", I: TsIco,    fg:"#3178c6" },
      { n: "HTML",       I: HtmlIco,  fg:"#e34f26" },
      { n: "CSS",        I: CssIco,   fg:"#5577e0" },
    ],
    Backend: [
      { n: "Node.js",    I: NodeIco,  fg:"#6cc04a" },
      { n: "Python",     I: SnakeIco, fg:"#4b8bbe" },
      { n: "Java",       I: CoffeeIco,fg:"#ea4d2e" },
      { n: "FastAPI",    I: ApiIco,   fg:"#1fc7b8" },
    ],
    Database: [
      { n: "MySQL",      I: DbIco,    fg:"#3a92c0" },
      { n: "Oracle",     I: CloudIco, fg:"#f80000" },
    ],
    Tools: [
      { n: "Figma",      I: FigmaIco, fg:"#b07cff" },
      { n: "Claude",I: BotIco,   fg:"#d97757" },
    ],
  },

  certs: [
    { org: "IBM · Cognitive Class", c: "#ffcb05", I: DbIco,    title: "SQL and Relational Databases 101",          url: "https://courses.cognitiveclass.ai/certificates/248159af4c5846d4ab620d5e39948f5e",                                                 img: "https://images.credly.com/images/5c8fca38-b0d2-49e5-9ad2-f3f8e79b327f/twitter_thumb_201604_image.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: CloudIco, title: "OCI 2025 Certified Foundations Associate",   url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6941EF3CB5EB7C0833D64EF5BF8A257C21D53C11A362E7DD0DAB73518C59AF58", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-foundations.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: BarIco,   title: "Oracle Data Platform Foundations Associate",  url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC6BF38C8A976E45FFE6F233D652B85BF2EF4C7AEBBE068491AA129A001DBC33", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-foundations.png" },
    { org: "Oracle Cloud",          c: "#00719a", I: BotIco,   title: "OCI AI Foundations Associate (2025)",        url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=71CC11DCFE431802B2DE719C81F52F2AF2478ABAB7563607DBE6DB72E5B607C0", img: "https://brm-workforce.oracle.com/edu/images/oracle-certification-badge_OCI-AI-foundations.png" },
  ],

  projects: [
    { I: BreadIco, n: "breadcrumber",     d: "AI-powered roadmap builder for creatives. ADHD-friendly project manager that breaks goals into bite-sized, achievable steps.", tags: ["React","FastAPI","Gemini AI","Python"], url: "https://github.com/RebEmnacin/breadcrumber-app" },
    { I: GlobeIco, n: "Portfolio Website", d: "This very portfolio — built with pure HTML/CSS/JS then re-imagined in React.",                                               tags: ["HTML","CSS","JS","React"],              url: "https://github.com/RebEmnacin" },
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

/* custom cursor everywhere */
body { background:var(--bg); font-family:var(--sans); color:var(--tx); overflow-x:hidden; cursor:none; }
button { cursor:none !important; font-family:var(--sans); }
a { cursor:none !important; text-decoration:none; color:inherit; }
input, textarea { cursor:none !important; font-family:var(--sans); }
* { cursor:none !important; }

/* ── CUSTOM CURSOR ── */
.cursor-arrow {
  position:fixed; top:0; left:0; width:27px; height:30px;
  pointer-events:none; z-index:2147483647;
  transform:translate(0,0); transition:opacity .2s ease; opacity:0;
}
@media(max-width:960px){ .cursor-arrow{ display:none; } }

/* ── SPARKLE CANVAS ── */
#sparkle-canvas {
  position:fixed; inset:0; z-index:1; pointer-events:none;
  width:100%; height:100%;
}

/* ── GRAIN TEXTURE OVERLAY ── */
body::before {
  content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity:.035; background-repeat:repeat; background-size:180px;
}

/* ── MINI PROGRESS BAR ── */
.mini-progress { position:fixed; top:50%; right:20px; left:auto; transform:translateY(-50%); z-index:600; }
.mini-progress-track { width:6px; height:200px; background:rgba(0,0,0,.10); border-radius:999px; position:relative; overflow:hidden; }
.mini-progress-fill { position:absolute; top:0; left:0; right:0; background:var(--ac); border-radius:999px; transition:height .15s ease-out; min-height:6px; }

/* ══════════════════════════════════════════════════════════
   HORIZONTAL STAGE
══════════════════════════════════════════════════════════ */
.stage { position:fixed; inset:0; z-index:2; display:flex;
  transition:transform 1s cubic-bezier(.77,0,.175,1); will-change:transform; overflow:visible; }
.panel-home { flex:0 0 100vw; width:100vw; height:100vh; overflow:visible; position:relative; }
.panel-scroll { flex:0 0 100vw; width:100vw; height:100vh; overflow-y:auto; overflow-x:hidden; position:relative; scroll-behavior:smooth; }
.panel-scroll::-webkit-scrollbar { width:3px; }
.panel-scroll::-webkit-scrollbar-thumb { background:var(--border2); }
.panel-scroll::-webkit-scrollbar-thumb:hover { background:var(--ac); }

/* ══════════════════════════════════════════════════════════
   PANEL 1 — LANDING
══════════════════════════════════════════════════════════ */
.p1-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center;
  gap:100px; padding:0 64px; max-width:1360px; margin:0 auto; position:relative; }
.p1-left { flex:0 0 auto; max-width:560px; }
.p1-eyebrow { font-family:var(--mono); font-size:10px; color:var(--ac); letter-spacing:.3em;
  text-transform:uppercase; margin-bottom:24px; opacity:0; animation:fadeUp .5s var(--ease-out-expo) .1s both;
  display:flex; align-items:center; gap:12px; }
.p1-eyebrow::before { content:''; display:block; width:32px; height:1px; background:var(--ac); }
.p1-title { font-family:var(--display); font-size:clamp(52px,8vw,108px); line-height:.88;
  letter-spacing:2px; color:var(--txh); -webkit-text-stroke:2px #111110; paint-order:stroke fill;
  margin-bottom:36px; text-transform:uppercase; opacity:0; animation:fadeUp .6s var(--ease-out-expo) .2s both; }
.p1-title .p1-line1 { display:block; color:var(--txh); }
.p1-title .p1-line2 { display:block; color:var(--ac); margin-top:-4px; }
.p1-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px; opacity:0; animation:fadeUp .5s var(--ease-out-expo) .35s both; }
.p1-pill { display:inline-flex; align-items:center; gap:7px; background:transparent;
  border:1px solid var(--border2); color:var(--txm); padding:8px 14px; border-radius:0;
  font-family:var(--mono); font-size:10px; font-weight:600; letter-spacing:.05em; transition:all .2s ease; }
.p1-pill:hover { border-color:var(--ac); color:var(--ac); box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }
.enter-btn-wrap { opacity:0; animation:fadeUp .5s var(--ease-out-expo) .48s both; }

/* profile photo */
.profile-seam { flex:0 0 auto; width:min(420px,34vw); height:min(420px,34vw); z-index:10; pointer-events:none; }
.profile-seam img { width:100%; height:100%; object-fit:cover; border-radius:50%; border:3px solid var(--ac);
  box-shadow:6px 6px 0 #111110; display:block; animation:blurPopFloat 1s cubic-bezier(.16,1,.3,1) both, floatY 6s ease-in-out 1s infinite; }
@keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
@keyframes blurPopFloat { 0%{opacity:0;filter:blur(20px)} 60%{filter:blur(0)} 100%{opacity:1;filter:blur(0)} }

/* scroll cue */
.scroll-cue { display:flex; flex-direction:column; align-items:center; gap:8px;
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  font-family:var(--mono); font-size:8px; letter-spacing:.3em; text-transform:uppercase; color:var(--tx); pointer-events:none; }
.scroll-cue-line { width:1px; height:32px; background:linear-gradient(var(--ac),transparent); animation:scrollCue 1.8s ease-in-out infinite; }
@keyframes scrollCue { 0%,100%{opacity:.2;transform:scaleY(.4)} 50%{opacity:1;transform:scaleY(1)} }

/* ── BUTTONS ── */
.mag-btn { position:relative; display:inline-flex; align-items:center; gap:10px;
  background:var(--ac); color:#000; font-family:var(--display); font-size:15px;
  letter-spacing:.08em; text-transform:uppercase; padding:14px 32px; border-radius:0; border:none;
  overflow:hidden; box-shadow:4px 4px 0 #000; transition:box-shadow .15s ease, transform .15s ease; }
.mag-btn::before { content:''; position:absolute; inset:0; background:#000; transform:translateX(-101%); transition:transform .35s cubic-bezier(.83,0,.17,1); }
.mag-btn:hover::before { transform:translateX(0); }
.mag-btn:hover { box-shadow:2px 2px 0 var(--ac); transform:translate(2px,2px); color:var(--ac); }
.mag-btn span,.mag-btn svg { position:relative; z-index:1; }
.mag-btn svg { transition:transform .3s var(--ease-bounce); }
.mag-btn:hover svg { transform:translateX(5px); }
.mag-btn-ghost { position:relative; display:inline-flex; align-items:center; gap:10px;
  background:transparent; color:var(--txm); font-family:var(--display); font-size:15px;
  letter-spacing:.08em; text-transform:uppercase; padding:14px 32px; border-radius:0;
  border:1px solid var(--border2); overflow:hidden; box-shadow:3px 3px 0 var(--border2); transition:all .15s ease; }
.mag-btn-ghost::before { content:''; position:absolute; inset:0; background:var(--acbg); transform:translateX(-101%); transition:transform .35s cubic-bezier(.83,0,.17,1); }
.mag-btn-ghost:hover::before { transform:translateX(0); }
.mag-btn-ghost:hover { border-color:var(--ac); color:var(--ac); box-shadow:3px 3px 0 var(--ac); transform:translate(-1px,-1px); }
.mag-btn-ghost span,.mag-btn-ghost svg { position:relative; z-index:1; }
.mag-btn-ghost svg { transition:transform .3s var(--ease-bounce); }
.mag-btn-ghost:hover svg { transform:translateX(5px); }
.ripple-circle { position:absolute; border-radius:50%; transform:translate(-50%,-50%) scale(0);
  animation:rippleAnim .6s linear; pointer-events:none; width:30px; height:30px; }
.mag-btn .ripple-circle { background:rgba(255,255,255,.3); }
.mag-btn-ghost .ripple-circle { background:rgba(255,203,5,.3); }
@keyframes rippleAnim { to{transform:translate(-50%,-50%) scale(12);opacity:0} }

/* ══════════════════════════════════════════════════════════
   SCROLL PANEL
══════════════════════════════════════════════════════════ */
.sp-inner { width:100%; padding:0 80px 120px 120px; }
.section-gap { padding-bottom: 110px; }
@keyframes fadeUp   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
.reveal { opacity:0; transform:translateY(40px); transition:opacity .3s var(--ease-out-expo), transform .3s var(--ease-out-expo); }
.reveal.out { opacity:0; transform:translateY(-24px); transition:opacity .5s ease, transform .5s ease; }
.reveal.vis { opacity:1; transform:translateY(0); }

/* ══════════════════════════════════════════════════════════
   HERO #2
══════════════════════════════════════════════════════════ */
.hero2-wrap { display:flex; align-items:center; justify-content:center;
  gap:100px; height:100vh; max-width:1360px; margin:0 auto; padding:0 64px; }
.hero2-photo { flex:0 0 auto; display:flex; align-items:center; justify-content:center; }
.hero2-photo img { width:min(400px,36vw); height:min(400px,36vw); object-fit:cover; border-radius:50%;
  border:3px solid var(--ac); box-shadow:6px 6px 0 #111110;
  animation:blurPop .8s cubic-bezier(.16,1,.3,1) both, floatY2 6s ease-in-out .8s infinite; }
@keyframes floatY2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
@keyframes blurPop { 0%{opacity:0;filter:blur(24px)} 60%{filter:blur(0)} 100%{opacity:1;filter:blur(0)} }
.hero2-text { flex:1; max-width:620px; }
.fsd-badge { display:inline-flex; align-items:center; gap:8px; background:var(--ac); color:#000;
  font-family:var(--mono); font-size:10px; font-weight:700; padding:7px 16px; border-radius:0;
  letter-spacing:.1em; margin-bottom:20px; width:fit-content; }
.status-pill { display:inline-flex; align-items:center; gap:7px; border:1px solid var(--border2);
  background:transparent; padding:5px 13px; border-radius:0; font-size:10px; font-weight:700;
  letter-spacing:.12em; text-transform:uppercase; color:var(--txm); width:fit-content; margin-bottom:24px; }
.sdot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 0 3px rgba(34,197,94,.2); animation:blink 2.2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
.hero2-name { font-family:var(--display); font-size:clamp(52px,7vw,96px); color:var(--txh);
  line-height:.92; letter-spacing:2px; -webkit-text-stroke:1.5px #111110; paint-order:stroke fill;
  margin-bottom:28px; text-transform:uppercase; }
.hero2-name em { font-style:normal; color:var(--ac); }
.hero-bio { font-size:15px; color:var(--txm); line-height:1.85; margin-bottom:36px;
  max-width:520px; border-left:2px solid var(--ac); padding-left:20px; }
.cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-bottom:28px; }
.social-row { display:flex; gap:8px; flex-wrap:wrap; }
.soc-link { display:inline-flex; align-items:center; gap:7px; border:1px solid var(--border2);
  color:var(--tx); padding:7px 13px; border-radius:0; font-family:var(--mono); font-size:9px;
  letter-spacing:.06em; transition:all .2s ease; }
.soc-link:hover { border-color:var(--ac); color:var(--ac); box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }

/* ══════════════════════════════════════════════════════════
   EYEBROW / SECTION TITLES
══════════════════════════════════════════════════════════ */
.eyebrow { font-family:var(--mono); font-size:9px; color:var(--ac); letter-spacing:.28em;
  text-transform:uppercase; margin-bottom:12px; display:flex; align-items:center; gap:10px; }
.eyebrow::before { content:''; display:block; width:20px; height:1px; background:var(--ac); }
.pg-title { font-family:var(--display); font-size:clamp(44px,6.5vw,86px); color:var(--txh);
  line-height:.92; letter-spacing:2px; -webkit-text-stroke:1.5px #111110; paint-order:stroke fill;
  margin-bottom:48px; text-transform:uppercase; }
.pg-title em { font-style:normal; color:var(--ac); }

/* centered contact heading */
.contact-heading-wrap { text-align:center; display:flex; flex-direction:column; align-items:center; margin-bottom:0; }
.contact-heading-wrap .eyebrow { justify-content:center; }
.contact-heading-wrap .eyebrow::before { display:none; }
.contact-heading-wrap .pg-title { margin-bottom:0; }

/* ══════════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════════ */
.folder-stage { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:280px; gap:16px; }
.folder-btn { width:130px; height:110px; border:none; background:transparent; display:flex;
  flex-direction:column; align-items:center; gap:12px; color:var(--ac); transition:opacity .3s, transform .3s; }
.folder-btn:hover { transform:translateY(-6px) scale(1.05); }
.folder-btn.pop-out { opacity:0; transform:scale(.4) rotate(12deg); }
.folder-ico-wrap { width:100px; height:84px; border:2px solid var(--ac); background:var(--acbg);
  display:flex; align-items:center; justify-content:center; box-shadow:4px 4px 0 var(--ac); animation:folderPulse 2.8s ease-in-out infinite; }
@keyframes folderPulse { 0%,100%{box-shadow:4px 4px 0 var(--ac)} 50%{box-shadow:6px 6px 0 var(--ac);transform:translate(-1px,-1px)} }
.folder-label { font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--txh); }
.folder-hint  { font-family:var(--mono); font-size:9px; color:var(--tx); }
.proj-pop { animation:popIn .45s var(--ease-out-expo) both; }
@keyframes popIn { from{opacity:0;transform:scale(.92) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
.back-row { display:flex; align-items:center; gap:10px; margin-bottom:32px; }
.back-btn { display:inline-flex; align-items:center; gap:7px; border:1px solid var(--border2); color:var(--txm);
  font-family:var(--mono); font-size:10px; font-weight:700; letter-spacing:.06em;
  padding:7px 14px; border-radius:0; background:transparent; transition:all .2s ease; }
.back-btn:hover { border-color:var(--ac); color:var(--ac); box-shadow:2px 2px 0 var(--ac); transform:translate(-1px,-1px); }
.proj-grid { display:flex; flex-direction:column; }
.pcard { display:flex; align-items:center; justify-content:space-between; gap:24px; padding:28px 0;
  border-bottom:1px solid var(--border); color:var(--txh); text-decoration:none; position:relative;
  overflow:hidden; transition:padding-left .3s var(--ease-out-expo); }
.pcard::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0;
  background:var(--acbg); transition:width .35s var(--ease-out-expo); z-index:0; }
.pcard:hover::before { width:100%; }
.pcard:hover { padding-left:16px; }
.pcard-left { display:flex; align-items:center; gap:20px; z-index:1; flex:1; }
.pcard-num { font-family:var(--mono); font-size:11px; color:var(--ac); letter-spacing:.1em; min-width:32px; }
.pcard-icon { color:var(--ac); opacity:.7; transition:opacity .2s; }
.pcard:hover .pcard-icon { opacity:1; }
.pcard-info h3 { font-family:var(--display); font-size:20px; color:var(--txh); text-transform:uppercase;
  letter-spacing:.5px; margin-bottom:4px; transition:color .2s; }
.pcard:hover .pcard-info h3 { color:var(--ac); }
.pcard-info p { font-size:12px; color:var(--tx); line-height:1.6; max-width:480px; }
.ptags { display:flex; flex-wrap:wrap; gap:5px; z-index:1; }
.ptag { border:1px solid var(--border2); color:var(--tx); font-family:var(--mono); font-size:8px;
  font-weight:700; letter-spacing:.08em; padding:3px 8px; border-radius:0; transition:all .2s; }
.pcard:hover .ptag { border-color:var(--acborder); color:var(--ac); }
.pcard-arr { color:var(--tx); z-index:1; transition:all .3s var(--ease-bounce); flex-shrink:0; }
.pcard:hover .pcard-arr { color:var(--ac); transform:translateX(6px); }
.proj-footer { display:flex; align-items:center; gap:18px; margin-top:28px; padding-top:20px; }
.more-circle { display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:5px; width:86px; height:86px; border:2px solid var(--ac); background:transparent; color:var(--ac);
  font-family:var(--mono); font-size:9px; font-weight:700; box-shadow:4px 4px 0 var(--ac);
  transition:all .2s ease; text-align:center; line-height:1.3; }
.more-circle:hover { background:var(--ac); color:#000; box-shadow:2px 2px 0 #000; transform:translate(2px,2px); }

/* ══════════════════════════════════════════════════════════
   CERT SLIDER — no black bg, large draggable 3D
══════════════════════════════════════════════════════════ */
.cert-slider-outer {
  position:relative; width:100%; height:640px;
  overflow:hidden;
  perspective:1800px; perspective-origin:50% 48%;
}
.cert-slider-stage {
  position:relative; width:100%; height:100%; transform-style:preserve-3d;
}
.cert-slide {
  position:absolute; top:50%; left:50%;
  width:440px; height:560px;
  margin-top:-280px; margin-left:-220px;
  border-radius:0; overflow:hidden;
  will-change:transform; transition:none;
  box-shadow:none;
  border:1px solid var(--border);
}
.cert-slide-inner { width:100%; height:100%; display:flex; flex-direction:column; background:var(--bg2); }
.cert-slide-img-wrap { height:55%; background:var(--bg); display:flex; align-items:center;
  justify-content:center; padding:28px; border-bottom:1px solid var(--border); }
.cert-slide-img { max-width:100%; max-height:100%; object-fit:contain; }
.cert-slide-body { flex:1; padding:18px 20px; display:flex; flex-direction:column; justify-content:space-between; }
.cert-slide-org { font-family:var(--mono); font-size:8px; font-weight:700; letter-spacing:.2em;
  text-transform:uppercase; color:var(--ac); margin-bottom:8px; }
.cert-slide-title { font-family:var(--display); font-size:15px; text-transform:uppercase;
  letter-spacing:.04em; color:var(--txh); line-height:1.35; flex:1; }
.cert-slide-num { font-family:var(--display); font-size:56px; line-height:1; color:rgba(0,0,0,.06);
  position:absolute; top:8px; right:12px; pointer-events:none; }
.cert-slide-verify { display:inline-flex; align-items:center; gap:5px; font-family:var(--mono);
  font-size:8px; font-weight:700; letter-spacing:.1em; color:var(--txm);
  margin-top:10px; padding-top:10px; border-top:1px solid var(--border);
  transition:color .2s ease; }
.cert-slide-verify:hover { color:var(--ac); }
.cert-slider-controls {
  position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
  display:flex; align-items:center; gap:12px; z-index:10;
}

.cert-ctrl-dots { display:flex; gap:6px; }
.cert-dot { width:6px; height:6px; border-radius:50%; background:var(--border2); transition:all .3s ease; }
.cert-dot.active { background:var(--ac); width:18px; border-radius:3px; }
.cert-hint { text-align:center; font-family:var(--mono); font-size:8px; color:var(--tx);
  margin-top:14px; letter-spacing:.12em; text-transform:uppercase; }

/* ══════════════════════════════════════════════════════════
   STACK — big title left, chips right, NO lines/borders/boxes
══════════════════════════════════════════════════════════ */
.stack-section-wrap {
  display:flex; flex-direction:row; align-items:center; justify-content:center; gap:48px;
  max-width:1100px; margin:0 auto;
}
.stack-title-col {
  flex:0 0 300px; position:static; align-self:center; padding:40px 0; text-align:left;
}
.stack-big-title {
  font-family:var(--display); font-size:clamp(72px,8vw,120px);
  color:var(--txh); line-height:.88; letter-spacing:2px; text-transform:uppercase;
  -webkit-text-stroke:2px #111110; paint-order:stroke fill;
}
.stack-big-title em { font-style:normal; color:var(--ac); }
.stack-rows-col { flex:1 1 auto; max-width:600px; display:flex; flex-direction:column; align-items:flex-start; padding-left:0; padding-top:40px; }
.stack-row { display:flex; flex-direction:column; gap:14px; padding:22px 0; transition:opacity .12s linear, transform .12s linear; will-change:opacity, transform; }
.stack-cat { font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.22em;
  text-transform:uppercase; color:var(--ac); }
.stack-items { display:flex; flex-wrap:wrap; gap:6px 18px; justify-content:flex-start; }
/* chips: icon + name only, no border/box */
.stack-chip {
  display:flex; align-items:center; gap:7px;
  background:transparent; border:none; padding:2px 0;
}
.stack-sq { width:28px; height:28px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.stack-name { font-family:var(--display); font-size:22px; color:var(--txm);
  white-space:nowrap; letter-spacing:.03em; transition:color .2s ease; }
.stack-chip:hover .stack-name { color:var(--txh); }

/* ══════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════ */
.contact-cta { display:flex; flex-direction:column; align-items:center; text-align:center;
  padding:24px 20px 20px; gap:6px; }
.cta-label { font-family:var(--mono); font-size:13px; color:var(--txm); letter-spacing:.06em; }
.cta-email { font-family:var(--display); font-size:clamp(28px,5.2vw,56px); color:var(--txh);
  letter-spacing:1px; text-transform:lowercase; padding:6px 4px;
  border-bottom:2px solid transparent; transition:color .25s ease, border-color .25s ease; }
.cta-email:hover { color:var(--ac); border-color:var(--ac); }
.cta-credit { font-family:var(--mono); font-size:11px; color:var(--tx); letter-spacing:.08em; margin-top:6px; }
.cta-social { display:flex; gap:10px; margin-top:4px; }
.footer-back { display:inline-flex; align-items:center; gap:8px; border:1px solid var(--border2);
  color:var(--txm); font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.12em;
  text-transform:uppercase; padding:10px 22px; background:transparent; transition:all .2s ease; }
.footer-back:hover { border-color:var(--ac); color:var(--ac); box-shadow:3px 3px 0 var(--ac); transform:translate(-2px,-2px); }

/* ── FLOATING NAV ── */
.fnav { position:fixed; left:16px; top:50%; transform:translateY(-50%); z-index:600;
  display:flex; flex-direction:column; align-items:center; gap:8px; padding:10px 8px;
  overflow:visible; }
.fnav:has(.fnav-items.open) { background:rgba(255,255,255,.9); border:1px solid var(--border); border-radius:999px; box-shadow:3px 3px 0 #111110; overflow:visible; }
.fnav-trigger { width:36px; height:36px; border-radius:50%; border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm); transition:all .2s ease; }
.fnav-trigger:hover { border-color:var(--ac); color:#000; background:var(--ac); box-shadow:2px 2px 0 #111110; }
.fnav-items { display:flex; flex-direction:column; align-items:center; gap:8px; overflow:visible;
  max-height:0; opacity:0; transition:max-height .45s cubic-bezier(.16,1,.3,1), opacity .25s ease; pointer-events:none; }
.fnav-items.open { max-height:400px; opacity:1; pointer-events:auto; overflow:visible; }
.fnav-item { display:flex; align-items:center; position:relative; opacity:0; transform:translateX(-8px);
  transition:opacity .25s ease, transform .3s cubic-bezier(.34,1.56,.64,1); }
.fnav-items.open .fnav-item { opacity:1; transform:translateX(0); }
.fnav-items.open .fnav-item:nth-child(1){transition-delay:.04s}
.fnav-items.open .fnav-item:nth-child(2){transition-delay:.08s}
.fnav-items.open .fnav-item:nth-child(3){transition-delay:.12s}
.fnav-items.open .fnav-item:nth-child(4){transition-delay:.16s}
.fnav-items.open .fnav-item:nth-child(5){transition-delay:.20s}
.fnav-lbl { position:absolute; left:calc(100% + 10px); top:50%; transform:translateY(-50%) translateX(-4px);
  font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  color:var(--txh); background:#fff; border:1px solid var(--border2); padding:5px 10px; height:28px;
  display:flex; align-items:center; white-space:nowrap; border-radius:4px; box-shadow:2px 2px 0 #111110;
  opacity:0; pointer-events:none; transition:opacity .15s ease, transform .15s ease; }
.fnav-btn { width:36px; height:36px; border-radius:50%; border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm); transition:all .2s ease; }
.fnav-btn:hover,.fnav-btn.active { border-color:var(--ac); color:#000; background:var(--ac); box-shadow:2px 2px 0 #111110; }
.fnav-item:hover .fnav-lbl { opacity:1; transform:translateY(-50%) translateX(0); }
.fnav-close { width:36px; height:36px; border-radius:50%; border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm); transition:all .2s ease; }
.fnav-close:hover { border-color:#ef4444; color:#ef4444; box-shadow:2px 2px 0 #ef4444; }
/* Layer 1 — pill box background (sits behind everything) */
.fnav-pill-bg {
  position:absolute; left:0; top:50%; transform:translateY(-50%);
  height:36px; width:36px;
  background:#fff; border:1px solid var(--border2);
  border-radius:999px;
  box-shadow:2px 2px 0 #111110;
  pointer-events:none; z-index:0;
  transition:width .35s cubic-bezier(.16,1,.3,1);
}
.fnav-item:hover .fnav-pill-bg { width:140px; }

/* Layer 2 — label text (sits between pill bg and icon) */
.fnav-pill-label {
  position:absolute; left:44px; top:50%; transform:translateY(-50%);
  font-family:var(--mono); font-size:9px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
  color:var(--txh); white-space:nowrap;
  pointer-events:none; z-index:1;
  opacity:0;
  transition:opacity .2s ease .1s;
}
.fnav-item:hover .fnav-pill-label { opacity:1; }

/* Layer 3 — icon button (sits on top, always visible) */
.fnav-btn { width:36px; height:36px; border-radius:50%; border:1px solid var(--border2); background:transparent;
  display:flex; align-items:center; justify-content:center; color:var(--txm); transition:all .2s ease;
  position:relative; z-index:2; }
.fnav-btn:hover,.fnav-btn.active { border-color:var(--ac); color:#000; background:var(--ac); box-shadow:2px 2px 0 #111110; }

/* ── RESPONSIVE ── */
@media(max-width:1200px){ .sp-inner{padding:0 60px 100px 100px} .p1-wrap,.hero2-wrap{padding:0 48px;gap:60px} .stack-title-col{flex:0 0 220px} }
@media(max-width:960px){
  .p1-wrap{padding:0 32px;flex-direction:column;justify-content:center;gap:40px}
  .profile-seam{width:min(280px,60vw);height:min(280px,60vw)}
  .sp-inner{padding:0 40px 80px 72px}
  .hero2-wrap{flex-direction:column;justify-content:center;gap:36px;height:auto;min-height:100vh;padding:80px 32px 60px}
  .hero2-photo img{width:240px;height:240px}
  .pcard{flex-direction:column;align-items:flex-start;gap:12px}
  .stack-section-wrap{flex-direction:column}
  .stack-title-col{position:static;padding:32px 0 16px;flex:none}
  .stack-rows-col{padding-left:0;padding-top:0}
  .stack-big-title{font-size:clamp(60px,16vw,96px)}
}
@media(max-width:600px){ .sp-inner{padding:0 20px 60px 20px} .p1-wrap{padding:0 20px} .cert-slide{width:280px;height:380px;margin-top:-190px;margin-left:-140px} }
`;

/* ─────────────────────────────────────────────────────────────────
   SPARKLE PARTICLE BACKGROUND (canvas, no deps)
   Mimics @tsparticles sparkle: small dots that twinkle opacity,
   move slowly, straight lines, high density
───────────────────────────────────────────────────────────────── */
function SparkleBackground({ hide = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, running = true;
    let w = 0, h = 0, dpr = 1;

    const COUNT = 320;
    // Each particle: x, y, vx, vy, size, opacity, opacityDir, opacitySpeed
    const ps = [];

    const rand = (a, b) => a + Math.random() * (b - a);

    const mkParticle = (forceX, forceY) => ({
      x: forceX ?? rand(0, w),
      y: forceY ?? rand(0, h),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      size: rand(0.6, 1.6),
      op: rand(0.1, 1),
      opDir: Math.random() > 0.5 ? 1 : -1,
      opSpeed: rand(0.003, 0.012),
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      ps.length = 0;
      for (let i = 0; i < COUNT; i++) ps.push(mkParticle());
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of ps) {
        // move straight
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // twinkle opacity
        p.op += p.opDir * p.opSpeed;
        if (p.op >= 1)   { p.op = 1;   p.opDir = -1; }
        if (p.op <= 0.05) { p.op = 0.05; p.opDir = 1; }

        // draw crisp dot
        ctx.globalAlpha = p.op;
        ctx.fillStyle = "#111110";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sparkle-canvas"
      style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", opacity: hide ? 0 : 1, transition:"opacity 0.3s ease" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────── */
function CustomCursor({ white = false }) {
  const ref = useRef(null);
  const pos = useRef({ x:-100, y:-100 });
  const target = useRef({ x:-100, y:-100 });
  const raf = useRef(null);
  useEffect(() => {
    const onMove = (e) => { target.current = { x:e.clientX, y:e.clientY }; if (ref.current) ref.current.style.opacity = "1"; };
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf.current); };
  }, []);
  return (
    <svg ref={ref} className="cursor-arrow" width="27" height="30" viewBox="0 0 27 30" fill="none" strokeWidth="2">
      <path d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z" fill={white ? "#ffffff" : "#ffcb05"} stroke={white ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)"}/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   REVEAL
───────────────────────────────────────────────────────────────── */
function Reveal({ children, delay=0, className="" }) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setState("vis");
      else setState(s => s === "vis" ? "out" : s);
    }, { threshold:0.1, rootMargin:"0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`reveal${state==="vis"?" vis":state==="out"?" out":""} ${className}`}
      style={{ transitionDelay: state==="vis" ? `${delay}ms` : "0ms" }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAG BUTTON
───────────────────────────────────────────────────────────────── */
function MagBtn({ children, onClick, href, ghost=false, className="" }) {
  const btnRef = useRef(null);
  const addRipple = (e) => {
    const btn = btnRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple-circle";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top  = `${e.clientY - rect.top}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };
  const cls = `${ghost ? "mag-btn-ghost" : "mag-btn"} ${className}`;
  const inner = <><span>{children}</span><ArrowIco s={13} /></>;
  if (href) return <a ref={btnRef} href={href} target="_blank" rel="noreferrer" className={cls} onClick={addRipple}>{inner}</a>;
  return <button ref={btnRef} className={cls} onClick={(e) => { addRipple(e); onClick?.(); }}>{inner}</button>;
}

/* ─────────────────────────────────────────────────────────────────
   CERT SLIDER — 3D drag, no black bg
───────────────────────────────────────────────────────────────── */
function CertSlider() {
  const [active, setActive] = useState(0);
  const stageRef    = useRef(null);
  const outerRef    = useRef(null);
  const progressRef = useRef(0);
  const targetRef   = useRef(0);
  const wheelLock   = useRef(false);
  const rafRef      = useRef(null);
  const n = DATA.certs.length;

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      progressRef.current += (targetRef.current - progressRef.current) * 0.1;
      applyTransforms(progressRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  const applyTransforms = (prog) => {
    const stage = stageRef.current; if (!stage) return;
    const slides = stage.querySelectorAll(".cert-slide");
    slides.forEach((el, i) => {
      const diff = i - prog;
      const tx = diff * 52;
      const tz = -Math.abs(diff) * 160;
      const ry = diff * -20;
      const sc = 1 - Math.abs(diff) * 0.13;
      const op = Math.max(0, 1 - Math.abs(diff) * 0.38);
      const zi = Math.round(100 - Math.abs(diff) * 12);
      el.style.transform = `translate3d(${tx}%,0,${tz}px) rotateY(${ry}deg) scale(${sc})`;
      el.style.opacity = op;
      el.style.zIndex = zi;
    });
    const rounded = Math.round(Math.max(0, Math.min(n - 1, prog)));
    setActive(rounded);
  };

  // Only fires while the cursor is actually over the slider (hover-gated by
  // being attached directly to the outer div). Each "tick" of scroll moves
  // exactly one card, then locks briefly so a single scroll gesture doesn't
  // skip multiple cards at once.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      // Define a center "hot zone" — only the middle band of the slider
      // (where the active card actually sits) captures the scroll.
      // Everywhere else (the red-line margins on the sides) lets the page
      // scroll normally.
      const rect = el.getBoundingClientRect();
      const cardHalfWidth = 220; // half of the cert card's actual pixel width (card is 440px wide)
      const centerX = rect.left + rect.width / 2;
      const inZone = Math.abs(e.clientX - centerX) <= cardHalfWidth;
      if (!inZone) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = Math.round(targetRef.current);

      // At the last card and still scrolling down → release control,
      // let the page scroll down normally instead of being stuck.
      if (dir === 1 && current >= n - 1) return;
      // At the first card and still scrolling up → release control,
      // let the page scroll up normally instead of being stuck.
      if (dir === -1 && current <= 0) return;

      e.preventDefault();
      e.stopPropagation();
      if (wheelLock.current) return;
      const next = Math.max(0, Math.min(n - 1, current + dir));
      if (next === current) return;
      targetRef.current = next;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 480);
    };
    // passive:false is required so preventDefault actually stops page scroll
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [n]);

  return (
    <>
      <div className="cert-slider-outer" ref={outerRef}>
        <div className="cert-slider-stage" ref={stageRef}>
          {DATA.certs.map((c, i) => (
            <div key={i} className="cert-slide">
              <div className="cert-slide-inner">
                <span className="cert-slide-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="cert-slide-img-wrap">
                  <img className="cert-slide-img" src={c.img} alt={c.title}
                    onError={e => { e.target.style.display = "none"; }} />
                </div>
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
          <div className="cert-ctrl-dots">
            {DATA.certs.map((_, i) => <div key={i} className={`cert-dot${i === active ? " active" : ""}`} />)}
          </div>
        </div>
      </div>
      <div className="cert-hint">hover the cards and scroll to browse</div>
    </>
  );
}
/* ─────────────────────────────────────────────────────────────────
   GSAP SCROLL FADE — wraps any block of content. As you scroll,
   it fades in approaching the center of the screen, then fades
   back out as it moves past — like cards being layered/replaced.
───────────────────────────────────────────────────────────────── */
function FadeSection({ children, className = "", liftPx = 50 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // .panel-scroll is OUR custom scrollable div (not the window) —
    // ScrollTrigger needs to be told that explicitly via `scroller`.
    const scroller = el.closest(".panel-scroll") || window;

    const st = ScrollTrigger.create({
      trigger: el,
      scroller,
      start: "top bottom",   // begin tracking once el enters from the bottom
      end: "bottom top",     // stop tracking once el fully exits the top
      scrub: true,           // tie progress directly to scroll position (no easing lag)
      onUpdate: (self) => {
        const p = self.progress; // 0 → 1 across the whole scroll range above
        // Triangle curve: 0 at start, 1 at the exact midpoint (p=0.5), back to 0 at end
        const fade = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
        gsap.set(el, { opacity: fade, y: (0.5 - p) * liftPx });
      },
    });

    return () => st.kill(); // cleanup when the component unmounts
  }, [liftPx]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
function StackRow({ cat, skills }) {
  return (
    <FadeSection className="stack-row">
      <div className="stack-cat">{cat}</div>
      <div className="stack-items">
        {skills.map((s) => {
          const I = s.I;
          return (
            <div className="stack-chip" key={s.n}>
              <span className="stack-sq" style={{ color: s.fg }}><I s={26} /></span>
              <span className="stack-name">{s.n}</span>
            </div>
          );
        })}
      </div>
    </FadeSection>
  );
}
/* ─────────────────────────────────────────────────────────────────
   STACK SECTION — big title left, plain chips right, NO boxes/lines
───────────────────────────────────────────────────────────────── */
function StackSection() {
  return (
    <div className="stack-section-wrap">
      <div className="stack-title-col">
        <Reveal>
          <div className="stack-big-title">My<br /><em>Stack</em></div>
        </Reveal>
      </div>
      <div className="stack-rows-col">
        {Object.entries(DATA.stack).map(([cat, skills]) => (
          <StackRow key={cat} cat={cat} skills={skills} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   PROJECTS
───────────────────────────────────────────────────────────────── */
function ProjectsSection({ onOpen, folderBtnRef }) {
  return (
    <div className="folder-stage">
      <button ref={folderBtnRef} className="folder-btn" onClick={onOpen}>
        <span className="folder-ico-wrap"><FolderIco s={40}/></span>
        <span className="folder-label">Open Projects</span>
      </button>
      <span className="folder-hint">// click to view my work</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {id:"home",     I:HomeIco,    lbl:"Home"},
  {id:"projects", I:MonitorIco, lbl:"Projects"},
  {id:"certs",    I:StarIco,    lbl:"Certs"},
  {id:"stack",    I:UserIco,    lbl:"Stack"},
  {id:"contact",  I:MailIco,    lbl:"Contact"},
];
function FloatingNav({ onNav, onOpenChange, activeSection }) {
  const [open, setOpen] = useState(false);
  const toggle = (v) => { setOpen(v); onOpenChange?.(v); };
  return (
    <div className="fnav">
      {!open && (
        <button className="fnav-trigger" onClick={() => toggle(true)}>
          <MenuIco s={16}/>
        </button>
      )}
      <div className={`fnav-items${open?" open":""}`}>
        <button className="fnav-close" onClick={() => toggle(false)}><XIco s={16}/></button>
        {NAV_ITEMS.map(item => (
          <div key={item.id} className="fnav-item">
            <div className="fnav-pill-bg" />
            <div className="fnav-pill-label">{item.lbl}</div>
            <button
              className={`fnav-btn${activeSection===item.id?" active":""}`}
              onClick={() => { onNav(item.id); }}>
              <item.I s={16}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   INTRO PANEL (landing)
───────────────────────────────────────────────────────────────── */
function IntroPanel({ goScroll }) {
  return (
    <div className="p1-wrap">
      <div className="p1-left">
        <div className="p1-eyebrow">Jolts · Reb Emnacin</div>
        <h1 className="p1-title">
          <span className="p1-line1">Full Stack</span>
          <span className="p1-line2">Developer</span>
        </h1>
        <div className="p1-pills">
          <a href={DATA.email} className="p1-pill"><MailIco s={12}/> Gmail</a>
          <a href={DATA.github} target="_blank" rel="noreferrer" className="p1-pill"><GhIco s={12}/> GitHub</a>
          <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="p1-pill"><LiIco s={12}/> LinkedIn</a>
          <a href={DATA.telegram} target="_blank" rel="noreferrer" className="p1-pill"><TgIco s={12}/> Telegram</a>
        </div>
        <div className="enter-btn-wrap">
          <MagBtn onClick={() => goScroll("hero")}>Enter Portfolio</MagBtn>
        </div>
      </div>
      <div className="profile-seam">
        <img src="/src/assets/RebProfile.jpg" alt="Reb Emnacin"/>
      </div>
      <div className="scroll-cue"><span className="scroll-cue-line"/>Scroll</div>
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
        <img src="/src/assets/Reb.jpg" alt="Reb Emnacin"/>
      </div>
      <div className="hero2-text">
        <Reveal><div className="fsd-badge"><ZapIco s={11}/> Full Stack Developer</div></Reveal>
        <Reveal delay={60}><div className="status-pill"><span className="sdot"/> {DATA.status}</div></Reveal>
        <Reveal delay={120}><h1 className="hero2-name">Hi, I'm <em>Reb</em></h1></Reveal>
        <Reveal delay={180}><p className="hero-bio">{DATA.bio}</p></Reveal>
        <Reveal delay={240}>
          <div className="cta-row">
            <MagBtn onClick={() => goScroll("projects")}>My Projects</MagBtn>
            <MagBtn ghost onClick={() => goScroll("contact")}>Contact</MagBtn>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="social-row">
            <a href={DATA.github} target="_blank" rel="noreferrer" className="soc-link"><GhIco s={13}/> github.com/RebEmnacin <ExtIco s={9}/></a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="soc-link"><LiIco s={13}/> LinkedIn <ExtIco s={9}/></a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SCROLL PANEL
───────────────────────────────────────────────────────────────── */
function ScrollPanel({ goScroll, onOpenProjects, folderBtnRef }) {
  return (
    <div className="sp-inner">
      <FadeSection className="section-gap">
        <HeroIntro goScroll={goScroll}/>
      </FadeSection>

      <FadeSection className="section-gap">
        <div id="sec-projects"/><div className="eyebrow">Portfolio</div><h2 className="pg-title">Selected <em>Work</em></h2>
        <ProjectsSection onOpen={onOpenProjects} folderBtnRef={folderBtnRef}/>
      </FadeSection>

      <FadeSection className="section-gap">
        <div id="sec-certs"/><div className="eyebrow">Credentials</div><h2 className="pg-title">My <em>Certifications</em></h2>
        <CertSlider/>
      </FadeSection>

      <div className="section-gap">
        <div id="sec-stack"/>
        <StackSection/>
      </div>

      <FadeSection>
        <div id="sec-contact"/>
        <div className="contact-heading-wrap">
          <div className="eyebrow">Chat me!</div>
          <h2 className="pg-title">My<em> Contacts</em></h2>
        </div>

        <div className="contact-cta">
          <p className="cta-label">nice working with you :D</p>
          <a href={DATA.email} className="cta-email">{DATA.email.replace("mailto:","")}</a>
          <p className="cta-credit">Portfolio by Reb Emnacin</p>
          <div className="cta-social">
            <a href={DATA.github} target="_blank" rel="noreferrer" className="soc-link"><GhIco s={13}/> GitHub</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="soc-link"><LiIco s={13}/> LinkedIn</a>
            <a href={DATA.telegram} target="_blank" rel="noreferrer" className="soc-link"><TgIco s={13}/> Telegram</a>
          </div>
        </div>
      </FadeSection>

      <div style={{textAlign:"center",marginTop:"80px",paddingTop:"40px"}}>
        <button className="footer-back" onClick={() => goScroll("home")}>↑ Back to Top</button>
        <div style={{fontFamily:"var(--mono)",fontSize:"8px",color:"var(--tx)",marginTop:"20px",letterSpacing:".12em",textTransform:"uppercase"}}>
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
  const [projectsOpen, setProjectsOpen] = useState(false);
  const folderBtnRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => clearTimeout(t);
  }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef(null);
  const lockRef   = useRef(false);

  const folderOrigin = useRef({ x: 0, y: 0, r: 0 });

  const handleOpenProjects = useCallback(() => {
    if (!folderBtnRef.current) { setProjectsOpen(true); return; }
    const rect = folderBtnRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top  + rect.height / 2;
    const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    folderOrigin.current = { x, y, r: maxRadius };
    if (!document.startViewTransition) { setProjectsOpen(true); return; }
    const t = document.startViewTransition(() => { flushSync(() => setProjectsOpen(true)); });
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, []);

const handleCloseProjects = useCallback(() => {
  const { x, y, r } = folderOrigin.current;
  const overlay = document.getElementById("projects-overlay");
  if (!overlay) { setProjectsOpen(false); return; }

  overlay.animate(
    { clipPath: [`circle(${r}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`] },
    { duration: 600, easing: "cubic-bezier(.77,0,.175,1)", fill: "forwards" }
  ).onfinish = () => setProjectsOpen(false);
}, []);

  useEffect(() => {
    if (projectsOpen) {
      document.body.style.overflow = "hidden";
      if (scrollRef.current) scrollRef.current.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (scrollRef.current) scrollRef.current.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      if (scrollRef.current) scrollRef.current.style.overflow = "";
    };
  }, [projectsOpen]);

  const goScroll = useCallback((sectionId="hero") => {
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

  const handleNav = useCallback((id) => goScroll(id === "home" ? "home" : id), [goScroll]);

  useEffect(() => {
    const onWheel = (e) => {
      if (projectsOpen) return;
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
    window.addEventListener("wheel", onWheel, { passive:true });
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
    sp?.addEventListener("scroll", update, { passive:true });
    return () => sp?.removeEventListener("scroll", update);
  }, [panel]);

  return (
    <>
      <style>{`::view-transition-old(root){animation:none;mix-blend-mode:normal;}::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
      <style>{CSS}</style>
      <SparkleBackground hide={projectsOpen}/>

      {projectsOpen && (
        <div id="projects-overlay" style={{
          position:"fixed", top:0, left:0,
          width:"100vw", height:"100vh",
          zIndex:2147483646,
          background:"#ffcb05",
          overflowY:"auto",
          padding:"0",
          boxSizing:"border-box",
          color:"#111110",
          "--ac":"#ffffff",
          "--txh":"#111110",
          "--txm":"#111110",
          "--tx":"#333330",
          "--border":"rgba(0,0,0,0.2)",
          "--border2":"rgba(0,0,0,0.35)",
          "--acbg":"rgba(255,255,255,0.2)",
          "--acborder":"rgba(0,0,0,0.4)",
        }}>
          <div style={{ padding:"60px 80px 120px 120px", boxSizing:"border-box" }}>
            <div className="back-row" style={{ marginBottom:"40px" }}>
              <button className="back-btn" onClick={handleCloseProjects} style={{borderColor:"rgba(255,255,255,0.6)",color:"#ffffff"}}><BackIco s={12}/> Back</button>
            </div>
            <div className="eyebrow">Portfolio</div>
            <h2 className="pg-title">Selected <em>Work</em></h2>
            <div className="proj-grid">
              {DATA.projects.map((p, i) => {
                const PI = p.I;
                return (
                  <a key={i} href={p.url} target="_blank" rel="noreferrer" className="pcard">
                    <div className="pcard-left">
                      <span className="pcard-num">_{String(i+1).padStart(2,"0")}.</span>
                      <span className="pcard-icon"><PI s={20}/></span>
                      <div className="pcard-info"><h3>{p.n}</h3><p>{p.d}</p></div>
                    </div>
                    <div className="ptags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                    <span className="pcard-arr"><ArrowIco s={16}/></span>
                  </a>
                );
              })}
            </div>
            <div className="proj-footer">
              <a href={DATA.github} target="_blank" rel="noreferrer" className="more-circle">
                <PlusIco s={18}/><span>More on<br/>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <CustomCursor white={projectsOpen}/>

      <div className="mini-progress">
        <div className="mini-progress-track">
          <div className="mini-progress-fill" style={{ height:`${scrollPct}%` }}/>
        </div>
      </div>
      <FloatingNav onNav={handleNav} onOpenChange={() => {}} activeSection={activeSection}/>
      <div className="stage" style={{ transform: panel==="scroll" ? "translateX(-100vw)" : "translateX(0)" }}>
        <div className="panel-home"><IntroPanel goScroll={goScroll}/></div>
        <div className="panel-scroll" ref={scrollRef}><ScrollPanel goScroll={goScroll} onOpenProjects={handleOpenProjects} folderBtnRef={folderBtnRef}/></div>
      </div>
    </>
  );
}