import { useState, useEffect, useRef, useCallback } from "react";

/* ── RESUME DATA ─────────────────────────────────────────────────────────── */
const DATA = {
  name: "Reb Emnacin",
  aka: "Jolts",
  tagline: "CS Student · Creator · AI Enthusiast",
  bio: `CS student at New Era University building things that spark ideas. I'm a builder and occasional chaos-driven creative who turns half-finished ideas into actual working projects. I like making things that solve my own problems first — usually small tools, dashboards, and apps that don't exist yet but probably should.`,
  status: "Open to Opportunities",
  github: "https://github.com/RebEmnacin",
  linkedin: "https://www.linkedin.com/in/reb-emnacin-a9752b404/",
  school: "New Era University",
  degree: "BS in Computer Science",
  schoolYear: "2024 – present",

  skills: {
    mastered: [
      { name: "Java",       icon: CoffeeIcon },
      { name: "Python",     icon: SnakeIcon },
      { name: "JavaScript", icon: JsIcon },
      { name: "HTML",       icon: HtmlIcon },
      { name: "CSS",        icon: CssIcon },
      { name: "MySQL",      icon: DbIcon },
      { name: "React",      icon: ReactIcon },
      { name: "FastAPI",    icon: ApiIcon },
      { name: "Figma",      icon: FigmaIcon },
      { name: "Node.js",    icon: NodeIcon },
    ],
    exploring: [
      { name: "FastAPI",      color: "#009688" },
      { name: "Express.js",   color: "#ffffff" },
      { name: "PostgreSQL",   color: "#4169E1" },
      { name: "NeonDB",       color: "#00E599" },
      { name: "MongoDB",      color: "#47A248" },
      { name: "Supabase",     color: "#3FCF8E" },
      { name: "Axios",        color: "#5A29E4" },
      { name: "Zustand",      color: "#e8a045" },
      { name: "Vite",         color: "#646CFF" },
      { name: "React Router", color: "#CA4245" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "Bootstrap",    color: "#7952B3" },
      { name: "Netlify",      color: "#00C7B7" },
      { name: "Vercel",       color: "#ffffff" },
      { name: "Next.js",      color: "#ffffff" },
      { name: "PHP",          color: "#777BB4" },
    ],
    graphics: ["CapCut", "Canva", "Figma", "Coolors", "Lucidchart", "Unsplash"],
    ai: ["Claude", "Gemini"],
    ides: ["VS Code", "IntelliJ", "Eclipse"],
  },

  stack: [
    { name: "Java",       icon: CoffeeIcon },
    { name: "Python",     icon: SnakeIcon },
    { name: "JavaScript", icon: JsIcon },
    { name: "HTML",       icon: HtmlIcon },
    { name: "CSS",        icon: CssIcon },
    { name: "MySQL",      icon: DbIcon },
    { name: "React",      icon: ReactIcon },
    { name: "FastAPI",    icon: ApiIcon },
    { name: "Figma",      icon: FigmaIcon },
    { name: "Oracle",     icon: CloudIcon },
    { name: "AI",         icon: BotIcon },
    { name: "Node.js",    icon: NodeIcon },
  ],

  certs: [
    {
      org: "IBM · Cognitive Class",
      color: "#052FAD",
      icon: DbIcon,
      title: "SQL and Relational Databases 101",
      url: "https://courses.cognitiveclass.ai/certificates/248159af4c5846d4ab620d5e39948f5e",
    },
    {
      org: "Oracle Cloud",
      color: "#F80000",
      icon: CloudIcon,
      title: "OCI 2025 Certified Foundations Associate",
      url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6941EF3CB5EB7C0833D64EF5BF8A257C21D53C11A362E7DD0DAB73518C59AF58",
    },
    {
      org: "Oracle Cloud",
      color: "#F80000",
      icon: BarChartIcon,
      title: "Oracle Data Platform Foundations Associate",
      url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC6BF38C8A976E45FFE6F233D652B85BF2EF4C7AEBBE068491AA129A001DBC33",
    },
    {
      org: "Oracle Cloud",
      color: "#F80000",
      icon: BotIcon,
      title: "OCI AI Foundations Associate (2025)",
      url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=71CC11DCFE431802B2DE719C81F52F2AF2478ABAB7563607DBE6DB72E5B607C0",
    },
  ],

  projects: [
    {
      featured: true,
      icon: BreadIcon,
      name: "breadcrumber",
      desc: "An AI-powered roadmap builder for creatives who struggle to start. ADHD-friendly project manager that breaks goals into bite-sized, achievable steps.",
      tags: ["React", "FastAPI", "Gemini AI", "Python"],
      url: "https://github.com/RebEmnacin/breadcrumber-app",
    },
    {
      featured: false,
      icon: GlobeIcon,
      name: "Portfolio Website",
      desc: "This very portfolio! Built with pure HTML, CSS and JS — then re-imagined in React. Deployed on GitHub Pages.",
      tags: ["HTML", "CSS", "JS", "React"],
      url: "https://github.com/RebEmnacin",
    },
    {
      featured: false,
      icon: WrenchIcon,
      name: "More Coming Soon",
      desc: "Currently cooking up new projects. Follow my GitHub for updates!",
      tags: ["In Progress"],
      url: null,
      placeholder: true,
    },
  ],
};

/* ── SVG ICON COMPONENTS ─────────────────────────────────────────────────── */
function HomeIcon({ size = 20 })    { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function PersonIcon({ size = 20 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function StarIcon({ size = 20 })    { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function MonitorIcon({ size = 20 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>; }
function MailIcon({ size = 20 })    { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function GithubIcon({ size = 18 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>; }
function LinkedInIcon({ size = 18 }){ return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>; }
function ArrowIcon({ size = 14 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function ExtLinkIcon({ size = 12 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>; }
function ChevronIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>; }

/* Tech/skill specific icons */
function CoffeeIcon({ size = 22 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>; }
function SnakeIcon({ size = 22 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><path d="M8 12s.5-4 4-4 4 4 4 4-1 4-4 4"/><circle cx="15" cy="9" r="1" fill="currentColor"/></svg>; }
function JsIcon({ size = 22 })      { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M14 7v6a3 3 0 0 1-6 0"/><path d="M10 7v9"/></svg>; }
function HtmlIcon({ size = 22 })    { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>; }
function CssIcon({ size = 22 })     { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2l1.5 16 6.5 2 6.5-2L20 2H4z"/><path d="M8 9h8M8.5 13h5l-.5 4-3 1-3-1-.2-2"/></svg>; }
function DbIcon({ size = 22 })      { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>; }
function ReactIcon({ size = 22 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/></svg>; }
function ApiIcon({ size = 22 })     { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="12" x2="12" y2="21"/></svg>; }
function FigmaIcon({ size = 22 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/></svg>; }
function CloudIcon({ size = 22 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>; }
function BotIcon({ size = 22 })     { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M12 11V3"/><circle cx="12" cy="3" r="1"/><line x1="8" y1="15" x2="8" y2="17"/><line x1="16" y1="15" x2="16" y2="17"/><path d="M7 11V8a5 5 0 0 1 10 0v3"/></svg>; }
function NodeIcon({ size = 22 })    { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><polyline points="22 8.5 12 15.5 2 8.5"/></svg>; }
function BreadIcon({ size = 24 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11c0-3.87 4.03-7 9-7s9 3.13 9 7c0 2.21-1.3 4.19-3.36 5.54L17 21H7l-.64-4.46C4.3 15.19 3 13.21 3 11z"/></svg>; }
function GlobeIcon({ size = 24 })   { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function WrenchIcon({ size = 24 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>; }
function BarChartIcon({ size = 22 }){ return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>; }
function VerifyIcon({ size = 14 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }

/* ── NAV CONFIG ──────────────────────────────────────────────────────────── */
const PAGES = [
  { id: "home",     label: "Home",         icon: HomeIcon },
  { id: "profile",  label: "Profile",      icon: PersonIcon },
  { id: "certs",    label: "Certifications", icon: StarIcon },
  { id: "projects", label: "Projects",     icon: MonitorIcon },
  { id: "contact",  label: "Contact",      icon: MailIcon },
];

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  :root{
    --bg:#060608;--bg2:#0d0d12;--bg3:#141420;
    --border:#1e1e2e;--border2:#2a2a3f;
    --text:#8b8baa;--text-h:#f0efff;--text-m:#c4c3e0;
    --accent:#FDDA0D;
    --sans:'Syne',sans-serif;
    --serif:'Instrument Serif',Georgia,serif;
    --mono:'DM Mono',monospace;
  }
  body{background:var(--bg);font-family:var(--sans);color:var(--text);overflow-x:hidden;-webkit-font-smoothing:antialiased}
  button{cursor:pointer;font-family:var(--sans)}
  a{text-decoration:none}
  input,textarea{font-family:var(--sans)}

  /* ── grid + noise bg ── */
  .grid-bg{
    position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(var(--border) 1px,transparent 1px),
                     linear-gradient(90deg,var(--border) 1px,transparent 1px);
    background-size:48px 48px;opacity:.35;
  }
  .noise{
    position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.03;mix-blend-mode:overlay;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* ── cursor spotlight ── */
  .cursor-spotlight{
    position:fixed;inset:0;pointer-events:none;z-index:1;
    background:radial-gradient(600px circle at var(--mx,50%) var(--my,50%),rgba(253,218,13,.06),transparent 60%);
  }

  /* ── top progress bar ── */
  .top-progress{
    position:fixed;top:0;left:0;height:3px;background:var(--accent);
    z-index:201;width:0%;transition:width .1s linear;
    box-shadow:0 0 8px rgba(253,218,13,.6);
  }

  /* ── CIRCULAR NAV ── */
  .navbar{
    position:fixed;top:24px;left:24px;z-index:200;
    display:flex;flex-direction:column;gap:8px;
  }
  .nav-logo-wrap{
    width:44px;height:44px;border-radius:50%;
    background:rgba(6,6,8,.92);border:1px solid var(--border2);
    display:flex;align-items:center;justify-content:center;
    backdrop-filter:blur(12px);overflow:hidden;
    box-shadow:0 4px 16px rgba(0,0,0,.5);
    margin-bottom:4px;
  }
  .nav-logo-wrap img{width:32px;height:32px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(253,218,13,.7));}
  .nav-logo-fallback{font-size:20px;display:flex;align-items:center;justify-content:center;width:100%;height:100%;}

  .nav-icon-btn{
    position:relative;width:44px;height:44px;border-radius:50%;border:1px solid var(--border2);
    background:rgba(6,6,8,.88);backdrop-filter:blur(12px);
    display:flex;align-items:center;justify-content:center;
    color:var(--text);transition:color .2s,border-color .2s,background .2s,transform .2s;
    box-shadow:0 2px 12px rgba(0,0,0,.4);cursor:pointer;
  }
  .nav-icon-btn:hover,.nav-icon-btn.active{
    color:var(--accent);border-color:rgba(253,218,13,.5);
    background:rgba(253,218,13,.08);transform:scale(1.08);
  }
  .nav-icon-btn.active{border-color:rgba(253,218,13,.8);}

  /* ── animated label (slides out to the right on hover) ── */
  .nav-icon-btn .nav-label{
    position:absolute;left:calc(100% + 10px);top:50%;transform:translateY(-50%);
    white-space:nowrap;pointer-events:none;
    background:rgba(6,6,8,.92);border:1px solid var(--border2);
    border-radius:10px;padding:5px 14px;
    font-family:var(--mono);font-size:11px;font-weight:600;letter-spacing:.08em;
    color:var(--text-h);
    opacity:0;transform:translateY(-50%) translateX(-6px);
    transition:opacity .18s ease,transform .18s ease;
  }
  .nav-icon-btn:hover .nav-label{
    opacity:1;transform:translateY(-50%) translateX(0);
  }

  /* ── sections ── */
  .section{min-height:100vh;position:relative}
  .section+.section{border-top:1px solid var(--border)}
  .section-label{
    position:absolute;top:24px;right:40px;
    font-family:var(--mono);font-size:10px;color:var(--text);
    letter-spacing:.14em;text-transform:uppercase;opacity:.4;z-index:3;
    pointer-events:none;
  }
  .app{min-height:100vh;position:relative;z-index:2}

  /* ── full-width home grid ── */
  .home-grid{
    min-height:100vh;display:grid;
    grid-template-columns:1fr 1fr;
  }
  .home-left{
    display:flex;flex-direction:column;justify-content:center;
    padding:80px 64px;border-right:1px solid var(--border);position:relative;
  }
  .home-right{
    display:flex;flex-direction:column;justify-content:center;
    padding:80px 64px;gap:32px;
  }

  /* ── status pill ── */
  .status-pill{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(253,218,13,.07);border:1px solid rgba(253,218,13,.25);
    padding:6px 16px;border-radius:100px;
    font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
    color:var(--accent);width:fit-content;margin-bottom:32px;
  }
  .status-dot{
    width:7px;height:7px;border-radius:50%;background:#22c55e;
    box-shadow:0 0 0 3px rgba(34,197,94,.2);
    animation:blink 2s ease-in-out infinite;
  }
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

  /* ── hero text ── */
  .hero-name{
    font-family:var(--serif);
    font-size:clamp(56px,7vw,112px);
    font-weight:400;line-height:.9;color:var(--text-h);
    letter-spacing:-2px;margin-bottom:12px;
  }
  .hero-name em{font-style:italic;color:var(--accent);}
  .shimmer-text{
    background:linear-gradient(100deg,var(--accent) 20%,#fff7c2 50%,var(--accent) 80%);
    background-size:240% 100%;-webkit-background-clip:text;background-clip:text;
    color:transparent;animation:shimmer 6s ease-in-out infinite;
  }
  @keyframes shimmer{0%{background-position:0% 50%}100%{background-position:-240% 50%}}
  .hero-aka{font-family:var(--mono);font-size:12px;color:var(--text);margin-bottom:24px;letter-spacing:.06em}
  .hero-sub{font-size:15px;color:var(--text-m);line-height:1.78;margin-bottom:40px;max-width:400px}

  /* ── buttons ── */
  .btn-main{
    display:inline-flex;align-items:center;gap:8px;
    background:var(--accent);color:#0a0800;
    font-family:var(--sans);font-weight:700;font-size:13px;
    padding:12px 26px;border-radius:9px;border:none;
    transition:all .22s;letter-spacing:.03em;
  }
  .btn-main:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(253,218,13,.35);background:#ffe033}
  .btn-ghost{
    display:inline-flex;align-items:center;gap:8px;
    background:transparent;color:var(--text-m);
    font-family:var(--sans);font-weight:600;font-size:13px;
    padding:12px 26px;border-radius:9px;border:1px solid var(--border2);
    transition:all .22s;
  }
  .btn-ghost:hover{border-color:rgba(253,218,13,.4);color:var(--accent)}
  .hero-btns{display:flex;gap:10px;flex-wrap:wrap}

  /* ── stat cards ── */
  .stat-card{
    background:var(--bg2);border:1px solid var(--border);
    border-radius:16px;padding:22px 24px;position:relative;overflow:hidden;
  }
  .stat-card::before{
    content:'';position:absolute;top:0;right:0;width:120px;height:120px;
    background:radial-gradient(circle at 100% 0%,rgba(253,218,13,.07) 0%,transparent 65%);
  }
  .stat-num{font-family:var(--serif);font-size:48px;color:var(--accent);line-height:1;margin-bottom:4px}
  .stat-label{font-family:var(--mono);font-size:11px;color:var(--text);letter-spacing:.08em}
  .stat-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}

  /* ── quick links ── */
  .quick-link{
    display:flex;align-items:center;gap:14px;
    background:var(--bg2);border:1px solid var(--border);
    border-radius:12px;padding:14px 18px;color:var(--text-h);
    transition:all .2s;font-size:13px;font-weight:600;width:100%;text-align:left;
  }
  .quick-link:hover{border-color:rgba(253,218,13,.4);transform:translateX(4px);color:var(--accent)}
  .ql-icon{color:var(--text);transition:color .2s;flex-shrink:0;}
  .quick-link:hover .ql-icon{color:var(--accent)}
  .ql-arrow{margin-left:auto;opacity:.3;transition:all .2s}
  .quick-link:hover .ql-arrow{opacity:1;transform:translateX(3px)}

  /* ── ticker ── */
  .ticker-wrap{border-top:1px solid var(--border);overflow:hidden;position:relative;padding:16px 0}
  .ticker-wrap::before,.ticker-wrap::after{
    content:'';position:absolute;top:0;bottom:0;width:100px;z-index:2;
  }
  .ticker-wrap::before{left:0;background:linear-gradient(90deg,var(--bg),transparent)}
  .ticker-wrap::after{right:0;background:linear-gradient(-90deg,var(--bg),transparent)}
  .ticker-track{display:flex;gap:28px;width:max-content;animation:ticker 24s linear infinite}
  @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .ticker-item{
    display:flex;align-items:center;gap:7px;
    font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;letter-spacing:.04em;
  }
  .ticker-sep{color:var(--border2);font-size:18px}

  /* ── page wrapper ── */
  .page-wrap{width:100%;padding:72px 80px 100px;max-width:1400px;margin:0 auto;}
  .page-eyebrow{
    font-family:var(--mono);font-size:10px;color:var(--accent);
    letter-spacing:.14em;text-transform:uppercase;margin-bottom:10px;
    display:flex;align-items:center;gap:10px;
  }
  .page-eyebrow::after{content:'';flex:1;height:1px;background:var(--border)}
  .page-title{
    font-family:var(--serif);font-size:clamp(40px,5vw,72px);
    font-weight:400;color:var(--text-h);line-height:1.02;letter-spacing:-1.5px;margin-bottom:48px;
  }
  .page-title em{font-style:italic;color:var(--accent)}

  /* ── section heads ── */
  .sec-head{
    font-family:var(--mono);font-size:10px;color:var(--text);
    letter-spacing:.14em;text-transform:uppercase;
    margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid var(--border);
    display:flex;align-items:center;gap:6px;
  }
  .sec-head::before{content:'//';color:var(--accent)}
  .info-section{margin-bottom:40px}

  /* ── profile ── */
  .profile-card{
    background:var(--bg2);border:1px solid var(--border);
    border-radius:20px;padding:36px;margin-bottom:32px;
    display:flex;gap:28px;align-items:flex-start;position:relative;overflow:hidden;
  }
  .profile-card::before{
    content:'';position:absolute;top:0;right:0;width:220px;height:220px;
    background:radial-gradient(circle at 100% 0%,rgba(253,218,13,.07) 0%,transparent 60%);
  }
  .avatar{
    width:80px;height:80px;border-radius:18px;flex-shrink:0;
    background:linear-gradient(135deg,rgba(253,218,13,.18),rgba(253,218,13,.05));
    border:1px solid rgba(253,218,13,.3);
    display:flex;align-items:center;justify-content:center;color:var(--accent);
  }
  .profile-info h2{font-family:var(--serif);font-size:28px;color:var(--text-h);letter-spacing:-.5px;margin-bottom:3px}
  .profile-handle{font-family:var(--mono);font-size:11px;color:var(--text);margin-bottom:12px}
  .profile-bio{font-size:14px;color:var(--text-m);line-height:1.8;margin-bottom:16px;max-width:560px}
  .tags{display:flex;flex-wrap:wrap;gap:8px}
  .tag{
    background:rgba(253,218,13,.08);border:1px solid rgba(253,218,13,.2);
    color:#c4a800;font-size:10px;font-weight:700;
    padding:4px 12px;border-radius:100px;letter-spacing:.04em;
  }

  /* ── education ── */
  .edu-card{
    background:var(--bg2);border:1px solid var(--border);
    border-radius:14px;padding:22px 26px;
    display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;
  }
  .edu-name{font-weight:700;color:var(--text-h);font-size:14px;margin-bottom:4px}
  .edu-deg{font-size:12px;color:var(--text)}
  .badge{
    background:var(--accent);color:#0a0800;
    font-family:var(--mono);font-size:11px;font-weight:700;
    padding:5px 16px;border-radius:100px;
  }

  /* ── SKILL CARDS (tech stack) ── */
  .skill-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
    gap:10px;
  }
  .skill-card{
    background:var(--bg2);border:1px solid var(--border);
    border-radius:14px;padding:18px 16px;
    display:flex;flex-direction:column;align-items:center;gap:10px;
    transition:all .22s;cursor:default;position:relative;overflow:hidden;
  }
  .skill-card::before{
    content:'';position:absolute;inset:0;opacity:0;
    background:radial-gradient(160px circle at var(--cx,50%) var(--cy,50%),rgba(253,218,13,.12),transparent 70%);
    transition:opacity .25s;pointer-events:none;
  }
  .skill-card:hover{border-color:rgba(253,218,13,.4);transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.4)}
  .skill-card:hover::before{opacity:1}
  .skill-card-icon{
    width:44px;height:44px;border-radius:12px;
    background:rgba(253,218,13,.07);border:1px solid rgba(253,218,13,.15);
    display:flex;align-items:center;justify-content:center;color:var(--accent);
    transition:all .22s;
  }
  .skill-card:hover .skill-card-icon{background:rgba(253,218,13,.14);border-color:rgba(253,218,13,.4);}
  .skill-card-name{font-family:var(--mono);font-size:10px;font-weight:600;color:var(--text-m);letter-spacing:.06em;text-align:center;}
  .skill-card:hover .skill-card-name{color:var(--text-h)}

  /* ── exploring pills ── */
  .explore-grid{display:flex;flex-wrap:wrap;gap:8px}
  .explore-pill{
    display:flex;align-items:center;gap:7px;
    background:var(--bg3);border:1px solid var(--border2);
    border-radius:100px;padding:5px 14px;
    font-family:var(--mono);font-size:10px;font-weight:600;color:var(--text-m);
    transition:all .2s;
  }
  .explore-pill:hover{border-color:rgba(253,218,13,.35);color:var(--text-h);background:rgba(253,218,13,.05)}
  .explore-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;}

  /* ── CERT CAROUSEL ── */
  .cert-carousel-wrap{position:relative}
  .cert-carousel{
    overflow:hidden;width:100%;
  }
  .cert-track{
    display:flex;gap:16px;
    transition:transform .42s cubic-bezier(.16,1,.3,1);
  }
  .cert-card{
    background:var(--bg2);border:1px solid var(--border);border-radius:20px;
    overflow:hidden;flex:0 0 calc(33.333% - 11px);
    display:flex;flex-direction:column;
    transition:border-color .22s,box-shadow .22s;
    position:relative;
  }
  .cert-card:hover{border-color:rgba(253,218,13,.4);box-shadow:0 20px 40px rgba(0,0,0,.4)}
  .cert-banner{
    height:120px;display:flex;align-items:center;justify-content:center;
    position:relative;border-bottom:1px solid var(--border);
    color:var(--accent);
  }
  .issuer-chip{
    position:absolute;top:11px;left:11px;
    font-family:var(--mono);font-size:9px;font-weight:700;
    padding:3px 10px;border-radius:100px;letter-spacing:.06em;
  }
  .cert-body{padding:20px 22px 24px;flex:1;display:flex;flex-direction:column;gap:8px}
  .cert-body h3{font-family:var(--serif);font-size:16px;font-weight:400;color:var(--text-h);line-height:1.4}
  .cert-issuer{font-family:var(--mono);font-size:10px;color:var(--text)}
  .verify-link{
    display:inline-flex;align-items:center;gap:6px;width:fit-content;
    background:rgba(253,218,13,.1);border:1px solid rgba(253,218,13,.25);
    color:var(--accent);font-size:10px;font-weight:700;
    padding:6px 14px;border-radius:9px;margin-top:auto;transition:all .2s;
    font-family:var(--mono);
  }
  .cert-card:hover .verify-link{background:var(--accent);color:#0a0800}

  /* carousel controls */
  .carousel-controls{
    display:flex;align-items:center;justify-content:center;gap:12px;margin-top:24px;
  }
  .carousel-btn{
    width:38px;height:38px;border-radius:50%;border:1px solid var(--border2);
    background:var(--bg2);color:var(--text-m);
    display:flex;align-items:center;justify-content:center;
    transition:all .2s;
  }
  .carousel-btn:hover{border-color:rgba(253,218,13,.5);color:var(--accent);background:rgba(253,218,13,.07)}
  .carousel-btn:disabled{opacity:.3;pointer-events:none}
  .carousel-dots{display:flex;gap:7px;align-items:center}
  .carousel-dot{
    width:6px;height:6px;border-radius:50%;background:var(--border2);
    transition:all .25s;border:none;cursor:pointer;padding:0;
  }
  .carousel-dot.active{background:var(--accent);width:18px;border-radius:4px}

  /* ── projects ── */
  .feat-card{
    background:var(--bg2);border:1px solid var(--border);border-radius:22px;
    padding:40px 44px;margin-bottom:24px;display:block;
    color:var(--text-h);transition:all .22s;position:relative;overflow:hidden;
  }
  .feat-card::before{
    content:'';position:absolute;inset:0;
    background:linear-gradient(135deg,rgba(253,218,13,.05) 0%,transparent 55%);
    transition:opacity .3s;
  }
  .feat-card:hover{border-color:rgba(253,218,13,.4);transform:translateY(-3px);box-shadow:0 28px 64px rgba(0,0,0,.5)}
  .feat-deco{position:absolute;right:-16px;bottom:-16px;opacity:.06;pointer-events:none;color:var(--accent);}
  .feat-label{
    display:inline-flex;align-items:center;gap:6px;
    background:var(--accent);color:#0a0800;
    font-family:var(--mono);font-size:10px;font-weight:700;
    padding:4px 12px;border-radius:100px;letter-spacing:.08em;margin-bottom:18px;
  }
  .feat-card h2{
    font-family:var(--serif);font-size:clamp(28px,4vw,48px);
    font-weight:400;color:var(--text-h);letter-spacing:-1.5px;margin-bottom:10px;line-height:1.05;
  }
  .feat-hl{color:var(--accent)}
  .feat-card p{color:var(--text-m);font-size:14px;line-height:1.75;max-width:500px;margin-bottom:24px}
  .feat-cta{
    display:inline-flex;align-items:center;gap:8px;
    background:var(--accent);color:#0a0800;
    font-family:var(--sans);font-weight:700;font-size:12px;
    padding:10px 22px;border-radius:9px;transition:all .2s;
  }
  .feat-cta:hover{background:#ffe033;transform:translateX(3px)}

  .proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
  .proj-card{
    background:var(--bg2);border:1px solid var(--border);border-radius:18px;
    padding:24px 22px;color:var(--text-h);display:flex;flex-direction:column;gap:10px;
    transition:all .22s;
  }
  .proj-card:hover{border-color:rgba(253,218,13,.35);transform:translateY(-3px);box-shadow:0 16px 32px rgba(0,0,0,.4)}
  .proj-card.placeholder{opacity:.5}
  .proj-card.placeholder:hover{transform:none;box-shadow:none;border-color:var(--border)}
  .proj-icon{color:var(--accent)}
  .proj-card h3{font-family:var(--serif);font-size:17px;font-weight:400;line-height:1.3}
  .proj-card p{font-size:12px;color:var(--text);line-height:1.65;flex:1}
  .proj-tags{display:flex;flex-wrap:wrap;gap:6px}
  .proj-tag{
    background:rgba(253,218,13,.08);border:1px solid rgba(253,218,13,.2);
    color:#c4a800;font-family:var(--mono);font-size:9px;font-weight:700;
    padding:3px 9px;border-radius:100px;letter-spacing:.04em;
  }
  .proj-link{font-family:var(--mono);font-size:11px;color:var(--accent);margin-top:auto}

  /* ── contact ── */
  .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:36px}
  .contact-link{
    display:flex;align-items:center;gap:16px;
    background:var(--bg2);border:1px solid var(--border);
    border-radius:16px;padding:20px 22px;color:var(--text-h);transition:all .22s;
  }
  .contact-link:hover{border-color:rgba(253,218,13,.4);transform:translateX(4px);box-shadow:-4px 0 0 var(--accent),0 8px 28px rgba(0,0,0,.3)}
  .contact-icon{
    width:46px;height:46px;border-radius:12px;flex-shrink:0;
    background:rgba(253,218,13,.08);border:1px solid rgba(253,218,13,.2);
    display:flex;align-items:center;justify-content:center;color:var(--accent);
  }
  .contact-info h3{font-size:13px;font-weight:700;color:var(--text-h);margin-bottom:2px}
  .contact-info p{font-family:var(--mono);font-size:10px;color:var(--text)}
  .contact-arrow{margin-left:auto;color:var(--text);transition:all .2s;opacity:.5}
  .contact-link:hover .contact-arrow{transform:translateX(4px);color:var(--accent);opacity:1}

  /* ── form ── */
  .form-card{background:var(--bg2);border:1px solid var(--border);border-radius:22px;padding:40px}
  .form-card h2{font-family:var(--serif);font-size:30px;color:var(--text-h);margin-bottom:4px;letter-spacing:-.6px}
  .form-card>p{font-size:13px;color:var(--text);margin-bottom:28px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
  .form-group{margin-bottom:14px}
  .form-label{display:block;font-family:var(--mono);font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text);margin-bottom:6px}
  .form-input{
    width:100%;padding:11px 16px;
    background:var(--bg3);border:1px solid var(--border2);
    border-radius:11px;font-size:13px;color:var(--text-h);outline:none;
    transition:border-color .2s,box-shadow .2s;
  }
  .form-input:focus{border-color:rgba(253,218,13,.5);box-shadow:0 0 0 3px rgba(253,218,13,.07)}
  textarea.form-input{resize:vertical;min-height:120px}
  .form-submit{
    width:100%;background:var(--accent);color:#0a0800;
    font-family:var(--sans);font-weight:700;font-size:13px;
    padding:13px;border:none;border-radius:11px;
    transition:all .22s;letter-spacing:.03em;margin-top:4px;
  }
  .form-submit:hover{background:#ffe033;transform:translateY(-2px);box-shadow:0 10px 28px rgba(253,218,13,.3)}
  .form-success{background:#052912;border:1px solid #22c55e;color:#22c55e}

  /* ── sec divider ── */
  .sec-div{display:flex;align-items:center;gap:14px;margin:8px 0 18px}
  .sec-div-label{font-family:var(--mono);font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--text);white-space:nowrap}
  .sec-div-line{flex:1;height:1px;background:var(--border)}

  /* ── spot card glow ── */
  .spot-card{position:relative;overflow:hidden}
  .spot-card::after{
    content:'';position:absolute;inset:0;pointer-events:none;opacity:0;
    background:radial-gradient(280px circle at var(--cx,50%) var(--cy,50%),rgba(253,218,13,.13),transparent 70%);
    transition:opacity .3s;
  }
  .spot-card:hover::after{opacity:1}

  /* ── reveal animations ── */
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .fade-up  {animation:fadeUp .45s ease both}
  .fade-up-1{animation:fadeUp .45s ease .06s both}
  .fade-up-2{animation:fadeUp .45s ease .12s both}
  .fade-up-3{animation:fadeUp .45s ease .18s both}
  .fade-up-4{animation:fadeUp .45s ease .24s both}
  .fade-up-5{animation:fadeUp .45s ease .30s both}

  .reveal{
    opacity:0;transform:translateY(28px);
    transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);
  }
  .reveal.reveal-visible{opacity:1;transform:translateY(0)}

  /* ── magnetic ── */
  .magnetic{transition:transform .28s cubic-bezier(.16,1,.3,1)}

  /* ── responsive ── */
  @media(max-width:1100px){
    .home-grid{grid-template-columns:1fr}
    .home-left{border-right:none;border-bottom:1px solid var(--border);padding:80px 48px 48px}
    .home-right{padding:48px 48px 80px}
    .cert-card{flex:0 0 calc(50% - 8px)}
    .page-wrap{padding:60px 48px 80px}
  }
  @media(max-width:700px){
    .cert-card{flex:0 0 100%}
    .contact-grid{grid-template-columns:1fr}
    .form-row{grid-template-columns:1fr}
    .page-wrap{padding:48px 24px 64px}
    .home-left,.home-right{padding:48px 24px}
  }
`;

/* ── SCROLL REVEAL ───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal${visible ? " reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* ── MAGNETIC HOOK ───────────────────────────────────────────────────────── */
function useMagnetic(strength = 0.25) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return { ref, onMove, onLeave };
}

/* ── SPOTLIGHT HANDLER ───────────────────────────────────────────────────── */
function spotMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--cx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--cy", `${e.clientY - r.top}px`);
}

/* ── TICKER ──────────────────────────────────────────────────────────────── */
function Ticker({ stack }) {
  const doubled = [...stack, ...stack, ...stack, ...stack];
  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {doubled.map((s, i) => {
          const Icon = s.icon;
          return (
            <span key={i} className="ticker-item">
              <Icon size={14} />
              {s.name}
              {i < doubled.length - 1 && <span className="ticker-sep">·</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── CERT CAROUSEL ───────────────────────────────────────────────────────── */
function CertCarousel({ certs }) {
  const [idx, setIdx] = useState(0);
  const perPage = () => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3;
  };
  const [pp, setPp] = useState(perPage());
  const maxIdx = Math.max(0, certs.length - pp);

  useEffect(() => {
    const upd = () => { const n = perPage(); setPp(n); setIdx(i => Math.min(i, Math.max(0, certs.length - n))); };
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(maxIdx, i + 1));

  return (
    <div className="cert-carousel-wrap">
      <div className="cert-carousel">
        <div className="cert-track" style={{ transform: `translateX(calc(-${idx * (100 / pp)}% - ${idx * 16}px))` }}>
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <a key={i} href={c.url} target="_blank" rel="noreferrer"
                className="cert-card spot-card" onMouseMove={spotMove}>
                <div className="cert-banner"
                  style={{ background: `linear-gradient(135deg,#0a0a14,${c.color}1a)` }}>
                  <Icon size={44} />
                  <span className="issuer-chip"
                    style={{ background: c.color, color: "#fff" }}>{c.org}</span>
                </div>
                <div className="cert-body">
                  <h3>{c.title}</h3>
                  <div className="cert-issuer">{c.org}</div>
                  <span className="verify-link">
                    <VerifyIcon /> Verify Certificate <ExtLinkIcon />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev} disabled={idx === 0} aria-label="Previous">
          <ChevronIcon />
        </button>
        <div className="carousel-dots">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button key={i} className={`carousel-dot${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <button className="carousel-btn" onClick={next} disabled={idx >= maxIdx} aria-label="Next"
          style={{ transform: "rotate(180deg)" }}>
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}

/* ── HOME PAGE ───────────────────────────────────────────────────────────── */
function HomePage({ goTo }) {
  const totalCerts    = DATA.certs.length;
  const totalProjects = DATA.projects.filter(p => !p.placeholder).length;
  const totalSkills   = DATA.skills.mastered.length;

  const magMain  = useMagnetic(0.3);
  const magGhost = useMagnetic(0.3);

  return (
    <>
      <div className="home-grid">
        {/* LEFT — hero copy */}
        <div className="home-left">
          <div className="status-pill fade-up">
            <span className="status-dot" />
            {DATA.status}
          </div>
          <h1 className="hero-name fade-up-1">Hi, I'm<br /><em className="shimmer-text">Reb</em></h1>
          <div className="hero-aka fade-up-2">// a.k.a {DATA.aka} · CS Student · Creator</div>
          <p className="hero-sub fade-up-3">{DATA.bio}</p>
          <div className="hero-btns fade-up-4">
            <button ref={magMain.ref} className="btn-main magnetic"
              onMouseMove={magMain.onMove} onMouseLeave={magMain.onLeave}
              onClick={() => goTo("projects")}>
              <MonitorIcon size={16} /> View My Work
            </button>
            <button ref={magGhost.ref} className="btn-ghost magnetic"
              onMouseMove={magGhost.onMove} onMouseLeave={magGhost.onLeave}
              onClick={() => goTo("contact")}>
              Get in Touch <ArrowIcon />
            </button>
          </div>
        </div>

        {/* RIGHT — stats + quick links */}
        <div className="home-right fade-up-1">
          <div className="stat-row">
            <div className="stat-card spot-card" onMouseMove={spotMove}>
              <div className="stat-num">{totalCerts}</div>
              <div className="stat-label">certifications</div>
            </div>
            <div className="stat-card spot-card" onMouseMove={spotMove}>
              <div className="stat-num">{totalProjects}</div>
              <div className="stat-label">projects</div>
            </div>
            <div className="stat-card spot-card" onMouseMove={spotMove}>
              <div className="stat-num">{totalSkills}+</div>
              <div className="stat-label">skills</div>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            <div style={{ fontFamily:"var(--mono)", fontSize:"10px", color:"var(--text)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:"6px" }}>// explore</div>
            {[
              { Icon: PersonIcon,  label: "Profile & Education",          page: "profile"  },
              { Icon: StarIcon,    label: "Certifications (IBM, Oracle)", page: "certs"    },
              { Icon: MonitorIcon, label: "Projects & Work",              page: "projects" },
              { Icon: MailIcon,    label: "Get In Touch",                 page: "contact"  },
            ].map(item => (
              <button key={item.page} className="quick-link" onClick={() => goTo(item.page)}>
                <span className="ql-icon"><item.Icon size={18} /></span>
                <span style={{ fontSize:"13px", fontWeight:"600", color:"var(--text-h)" }}>{item.label}</span>
                <span className="ql-arrow"><ArrowIcon /></span>
              </button>
            ))}
          </div>

          {/* github + linkedin */}
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            {[
              { href: DATA.github,   Icon: GithubIcon,   label: "github.com/RebEmnacin" },
              { href: DATA.linkedin, Icon: LinkedInIcon,  label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:"8px", fontFamily:"var(--mono)", fontSize:"11px", color:"var(--text)", padding:"10px 16px", borderRadius:"10px", border:"1px solid var(--border)", transition:"all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(253,218,13,.4)"; e.currentTarget.style.color="var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text)"; }}>
                <Icon /> {label} <ExtLinkIcon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <Ticker stack={DATA.stack} />
    </>
  );
}

/* ── PROFILE PAGE ────────────────────────────────────────────────────────── */
function ProfilePage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">About Me</div>
      <h1 className="page-title">Who is<br /><em>Jolts?</em></h1>

      <Reveal className="profile-card spot-card" onMouseMove={spotMove}>
        <div className="avatar"><BotIcon size={36} /></div>
        <div className="profile-info">
          <h2>{DATA.name}</h2>
          <div className="profile-handle">@RebEmnacin · a.k.a {DATA.aka}</div>
          <p className="profile-bio">{DATA.bio}</p>
          <div className="tags">
            <span className="tag">⚡ Open to Opportunities</span>
            <span className="tag">🎓 CS Student</span>
            <span className="tag">🛠️ Builder</span>
            <span className="tag">🤖 AI Enthusiast</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={60} className="info-section">
        <div className="sec-head">Education</div>
        <div className="edu-card">
          <div>
            <div className="edu-name">{DATA.school}</div>
            <div className="edu-deg">{DATA.degree}</div>
          </div>
          <span className="badge">{DATA.schoolYear}</span>
        </div>
      </Reveal>

      {/* mastered stack as cards */}
      <Reveal delay={120} className="info-section">
        <div className="sec-head">Core Stack</div>
        <div className="skill-grid">
          {DATA.skills.mastered.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="skill-card" onMouseMove={spotMove}>
                <div className="skill-card-icon"><Icon size={22} /></div>
                <div className="skill-card-name">{s.name}</div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* exploring pills */}
      <Reveal delay={180} className="info-section">
        <div className="sec-head">Currently Exploring</div>
        <p style={{ fontSize:"13px", color:"var(--text)", marginBottom:"16px", fontFamily:"var(--mono)" }}>
          // Familiar with the concepts, leveling up project by project
        </p>
        <div className="explore-grid">
          {DATA.skills.exploring.map(s => (
            <div key={s.name} className="explore-pill">
              <span className="explore-dot" style={{ background: s.color }} />
              {s.name}
            </div>
          ))}
        </div>
      </Reveal>

      {/* graphics / ai / ides */}
      {[
        { label: "Graphics & Creative", items: DATA.skills.graphics },
        { label: "AI Tools",            items: DATA.skills.ai },
        { label: "IDEs",                items: DATA.skills.ides },
      ].map(({ label, items }, idx) => (
        <Reveal key={label} delay={240 + idx * 60} className="info-section">
          <div className="sec-head">{label}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {items.map(s => (
              <span key={s} style={{
                background:"var(--bg3)", border:"1px solid var(--border2)", borderRadius:"100px",
                padding:"5px 14px", fontFamily:"var(--mono)", fontSize:"11px", fontWeight:"600", color:"var(--text-m)"
              }}>{s}</span>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── CERTS PAGE ──────────────────────────────────────────────────────────── */
function CertsPage() {
  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Credentials</div>
      <h1 className="page-title">My <em>Certifications</em></h1>
      <Reveal>
        <CertCarousel certs={DATA.certs} />
      </Reveal>
    </div>
  );
}

/* ── PROJECTS PAGE ───────────────────────────────────────────────────────── */
function ProjectsPage() {
  const featured = DATA.projects.find(p => p.featured);
  const others   = DATA.projects.filter(p => !p.featured);
  const FeatIcon = featured.icon;

  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Portfolio</div>
      <h1 className="page-title">Things I've <em>Built</em></h1>

      <div className="sec-div"><span className="sec-div-label">Featured</span><span className="sec-div-line" /></div>

      <Reveal as="a" href={featured.url} target="_blank" rel="noreferrer"
        className="feat-card spot-card" onMouseMove={spotMove}>
        <div className="feat-deco"><FeatIcon size={120} /></div>
        <span className="feat-label">⭐ Featured Project</span>
        <h2><span className="feat-hl">{featured.name}</span></h2>
        <p>{featured.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"22px" }}>
          {featured.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>
        <span className="feat-cta">View on GitHub <ArrowIcon /></span>
      </Reveal>

      <div className="sec-div"><span className="sec-div-label">All Projects</span><span className="sec-div-line" /></div>

      <div className="proj-grid">
        {others.map((p, i) => {
          const PIcon = p.icon;
          return p.url ? (
            <Reveal as="a" key={i} href={p.url} target="_blank" rel="noreferrer"
              className={`proj-card spot-card${p.placeholder ? " placeholder" : ""}`}
              delay={i * 80} onMouseMove={spotMove}>
              <div className="proj-icon"><PIcon size={26} /></div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
              <div className="proj-link">View on GitHub →</div>
            </Reveal>
          ) : (
            <Reveal key={i} className="proj-card placeholder spot-card" delay={i * 80} onMouseMove={spotMove}>
              <div className="proj-icon"><PIcon size={26} /></div>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="proj-tags">{p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}</div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

/* ── CONTACT PAGE ────────────────────────────────────────────────────────── */
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const magSubmit = useMagnetic(0.15);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name:"", email:"", message:"" });
  };

  return (
    <div className="page-wrap">
      <div className="page-eyebrow">Let's Talk</div>
      <h1 className="page-title">Get in <em>Touch</em></h1>

      <div className="contact-grid">
        <Reveal as="a" href={DATA.github} target="_blank" rel="noreferrer" className="contact-link">
          <div className="contact-icon"><GithubIcon size={22} /></div>
          <div className="contact-info">
            <h3>GitHub</h3>
            <p>github.com/RebEmnacin</p>
          </div>
          <span className="contact-arrow"><ArrowIcon /></span>
        </Reveal>
        <Reveal as="a" href={DATA.linkedin} target="_blank" rel="noreferrer" delay={60} className="contact-link">
          <div className="contact-icon"><LinkedInIcon size={22} /></div>
          <div className="contact-info">
            <h3>LinkedIn</h3>
            <p>linkedin.com/in/reb-emnacin</p>
          </div>
          <span className="contact-arrow"><ArrowIcon /></span>
        </Reveal>
        <Reveal as="a" href="mailto:reb@email.com" delay={120} className="contact-link">
          <div className="contact-icon"><MailIcon size={22} /></div>
          <div className="contact-info">
            <h3>Email</h3>
            <p>Drop me a message anytime</p>
          </div>
          <span className="contact-arrow"><ArrowIcon /></span>
        </Reveal>
      </div>

      <Reveal delay={180} as="form" onSubmit={handleSubmit} className="form-card">
        <h2>Say Hello 👋</h2>
        <p>Fill out the form and I'll get back to you as soon as possible.</p>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" type="text" placeholder="Juan dela Cruz"
              value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input className="form-input" type="email" placeholder="juan@email.com"
              value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea className="form-input" placeholder="What's on your mind?"
            value={form.message} onChange={e => setForm({...form, message:e.target.value})} required />
        </div>
        <button ref={magSubmit.ref} type="submit"
          className={`form-submit magnetic${sent ? " form-success" : ""}`}
          onMouseMove={magSubmit.onMove} onMouseLeave={magSubmit.onLeave}>
          {sent ? "✓ Sent! I'll get back to you soon." : "Send Message ⚡"}
        </button>
      </Reveal>
    </div>
  );
}

/* ── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeId, setActiveId]   = useState("home");
  const sectionRefs   = useRef({});
  const navRef        = useRef(null);
  const progressRef   = useRef(null);

  const goTo = useCallback((id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // scroll-spy
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    PAGES.forEach(p => { const el = sectionRefs.current[p.id]; if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // cursor spotlight
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // top progress bar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="grid-bg" />
      <div className="noise" />
      <div className="cursor-spotlight" />
      <div ref={progressRef} className="top-progress" />

      {/* CIRCULAR ICON NAV */}
      <nav className="navbar" ref={navRef} aria-label="Site navigation">
        {/* Logo */}
        <div className="nav-logo-wrap">
          <img
            src="/Reb_logo.png"
            alt="Jolts logo"
            onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
          />
          <span className="nav-logo-fallback" style={{ display:"none" }}>⚡</span>
        </div>

        {/* Icon buttons */}
        {PAGES.map(p => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              className={`nav-icon-btn${activeId === p.id ? " active" : ""}`}
              aria-label={p.label}
              aria-current={activeId === p.id ? "page" : undefined}
              onClick={() => goTo(p.id)}
            >
              <Icon size={18} />
              <span className="nav-label">{p.label}</span>
            </button>
          );
        })}
      </nav>

      {/* MAIN — vertical scroll sections */}
      <main className="app">
        {PAGES.map(p => (
          <section key={p.id} id={p.id}
            ref={el => (sectionRefs.current[p.id] = el)}
            className="section">
            <span className="section-label">// {p.id}.jsx</span>
            {p.id === "home"     && <HomePage goTo={goTo} />}
            {p.id === "profile"  && <ProfilePage />}
            {p.id === "certs"    && <CertsPage />}
            {p.id === "projects" && <ProjectsPage />}
            {p.id === "contact"  && <ContactPage />}
          </section>
        ))}
      </main>
    </>
  );
}
