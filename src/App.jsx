import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flushSync } from "react-dom";

import "./styles/index.css";

import { SparkleBackground } from "./components/SparkleBackground";
import { CustomCursor } from "./components/CustomCursor";
import { ProfileImage } from "./components/ProfileImage";
import { FloatingNav } from "./components/FloatingNav";
import { IntroPanel } from "./components/panels/IntroPanel";
import { ScrollPanel } from "./components/panels/ScrollPanel";
import { ArrowIco, BackIco, PlusIco } from "./components/icons/Icons";
import { DATA } from "./data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   ROOT APP
   This file only holds: page state (home vs scroll panel), the
   "rolling profile photo" transition, the projects full-screen
   overlay open/close, and scroll tracking. All visual sections
   live in their own component files (see ./components).
───────────────────────────────────────────────────────────────── */
export default function App() {
  const [panel, setPanel] = useState("home");
  const [rollingDir, setRollingDir] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [p1Visible,  setP1Visible]  = useState(true);
  const [p2Visible,  setP2Visible]  = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const folderBtnRef = useRef(null);
  const p1ImgRef = useRef(null);
  const p2ImgRef = useRef(null);

  useEffect(() => 
  {
    const t = setTimeout(() => ScrollTrigger.refresh(), 800);
    return () => clearTimeout(t);
  }, []);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef(null);
  const lockRef   = useRef(false);

  const handleLanded = useCallback((landedDir) => {
    setRollingDir(null);
    if (landedDir === "forward") 
    {
      setP2Visible(true);
      setP1Visible(false);
    } 
    else 
    {
      setP2Visible(false);
      setP1Visible(true);
    }
  }, []);

  const folderOrigin = useRef({ x: 0, y: 0, r: 0 });

  const handleOpenProjects = useCallback(() => {
    if (!folderBtnRef.current) { 
      setProjectsOpen(true); 
      return; 
    }
    const rect = folderBtnRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top  + rect.height / 2;
    const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    folderOrigin.current = { x, y, r: maxRadius };
    if (!document.startViewTransition) { 
      setProjectsOpen(true); 
      return; 
    }
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
    if (!overlay) { 
      setProjectsOpen(false); 
      return; 
    }

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

  const goScroll = useCallback((sectionId = "hero") => {
if (sectionId === "home") {
  setRollingDir("reverse");
  setP2Visible(false);
  setP1Visible(false);
  setPanel("home");
  setZoomed(true);
  setTimeout(() => setZoomed(false), 850);
  setTimeout(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, 900);
  return;
}

    setRollingDir("forward");
    setP1Visible(false);
    setPanel("scroll");
    setZoomed(true);
    setTimeout(() => setZoomed(false), 850);
    setTimeout(() => {
      const el = document.getElementById(`sec-${sectionId}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
      <ProfileImage
        p1Ref={p1ImgRef}
        p2Ref={p2ImgRef}
        direction={rollingDir}
        onLanded={handleLanded}
      />

      <div className="mini-progress">
        <div className="mini-progress-track">
          <div className="mini-progress-fill" style={{ height:`${scrollPct}%` }}/>
        </div>
      </div>
      <FloatingNav onNav={handleNav} onOpenChange={() => {}} activeSection={activeSection}/>
      <div className="zoom-wrap" style={{ transform: zoomed ? "scale(2.5)" : "scale(1)" }}>
        <div className="stage" style={{ transform: panel==="scroll" ? "translateX(-100vw)" : "translateX(0)" }}>
          <div className="panel-home"><IntroPanel goScroll={goScroll} p1ImgRef={p1ImgRef} p1Visible={p1Visible}/></div>
          <div className="panel-scroll" ref={scrollRef}><ScrollPanel goScroll={goScroll} onOpenProjects={handleOpenProjects} folderBtnRef={folderBtnRef} p2ImgRef={p2ImgRef} p2Visible={p2Visible}/></div>
        </div>
      </div>
    </>
  );
}