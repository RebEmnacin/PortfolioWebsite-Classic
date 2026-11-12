import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flushSync } from "react-dom";

import "./styles/index.css";

import { SparkleBackground } from "./components/SparkleBackground";
import { CustomCursor } from "./components/CustomCursor";
import { ProfileImage } from "./components/ProfileImage";
import { SparkBurst } from "./components/Sparkburst";
import { FloatingNav } from "./components/FloatingNav";
import { ThemeToggle } from "./components/ThemeToggle";
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
    if (panel !== "scroll") return;
    // must finish BEFORE the 900ms scrollIntoView in goScroll(), or the refresh cancels that smooth scroll halfway
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(t);
  }, [panel]);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const scrollRef = useRef(null);
  const lockRef   = useRef(false);

  const sparkRef = useRef(null);

  // Light / dark theme. Saved so it survives a refresh; the attribute on
  // <html> is what the CSS reads (see the DARK MODE block in index.css).
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("theme") === "dark"; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { /* ignore */ }
  }, [dark]);
  const toggleTheme = useCallback((e) => {
    const next = !dark;
    const btn = e && e.currentTarget;


    // browser has no View Transitions: just switch, no animation
    if (!document.startViewTransition || !btn) { setDark(next); return; }

    // center of the button = where the circle grows from
    const r = btn.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    // radius big enough to reach the farthest screen corner
    const maxR = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const t = document.startViewTransition(() => {
      document.documentElement.dataset.theme = next ? "dark" : "light";
      flushSync(() => setDark(next));
    });
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxR}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }, [dark]);

  const handleLanded = useCallback((landedDir) => {
    setRollingDir(null);
    if (landedDir === "forward") 
    {
      setP2Visible(true);
      setP1Visible(false);
      const r = p2ImgRef.current?.getBoundingClientRect();
      if (r && sparkRef.current) {
        sparkRef.current.trigger(r.left + r.width / 2, r.top + r.height / 2);
      }
    } 
    else 
    {
      setP2Visible(false);
      setP1Visible(true);
      const r = p1ImgRef.current?.getBoundingClientRect();
      if (r && sparkRef.current) {
        sparkRef.current.trigger(r.left + r.width / 2, r.top + r.height / 2);
      }
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

  // Which panel we're on right now (a ref, so goScroll can check it without re-creating itself).
  const panelRef = useRef("home");
  useEffect(() => { panelRef.current = panel; }, [panel]);

  const goScroll = useCallback((sectionId = "hero", { zoom = true } = {}) => {
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

    // The zoom + rolling profile photo only belong to the move from the intro (home) panel
    // into the long page. If we're ALREADY on the long page (sidebar jumping between
    // sections), skip them and just scroll straight away.
    const alreadyThere = panelRef.current === "scroll";
    if (!alreadyThere) {
      setRollingDir("forward");
      setP1Visible(false);
      setPanel("scroll");
      // The zoom is only for the "enter the portfolio" gesture (button / scroll / swipe).
      // Sidebar buttons pass { zoom:false }: the panel just slides over.
      if (zoom) {
        setZoomed(true);
        setTimeout(() => setZoomed(false), 300);
      }
    }
    setTimeout(() => {
      const el = document.getElementById(`sec-${sectionId}`);
      const sc = scrollRef.current;
      if (el && sc) {
        // WHY not el.scrollIntoView(): each FadeSection slides ~50px down while it fades in, and
        // scrollIntoView lined up that SHIFTED spot, so the title ended up 50px too high once the
        // section settled. Here we measure the section's real layout position instead.
        const sr = sc.getBoundingClientRect();
        const scale = sc.clientHeight ? sr.height / sc.clientHeight : 1;     // zoom-wrap scale
        const tf = getComputedStyle(el.parentElement).transform;
        const lift = tf && tf !== "none" ? new DOMMatrixReadOnly(tf).m42 : 0; // the 50px slide
        const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 48;  // gap above the title (phones use 72 from the CSS)
        const top = (el.getBoundingClientRect().top - sr.top) / scale - lift + sc.scrollTop - margin;
        // "center" for the stack, "start" (top of screen) for everything else
        const offset = sectionId === "stack" ? (sc.clientHeight - el.offsetHeight) / 2 : 0;
        sc.scrollTo({ top: top - offset, behavior: "smooth" });
      } else if (sc) sc.scrollTop = 0;
    }, alreadyThere ? 0 : 900);
  }, []);

  // Sidebar buttons: while we jump to a section, switch OFF the "pop in" animations
  // inside it (see "html.nav-jumping" in index.css). The class is removed after the scroll ends.
  const navJumpTimer = useRef(null);
  const handleNav = useCallback((id) => {
    document.documentElement.classList.add("nav-jumping");
    clearTimeout(navJumpTimer.current);
    navJumpTimer.current = setTimeout(() => document.documentElement.classList.remove("nav-jumping"), 3000);
    goScroll(id === "home" ? "home" : id, { zoom: false });
  }, [goScroll]);

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

  // PHONE VERSION of the mouse-wheel logic above:
  // swipe UP on the landing page = enter the portfolio,
  // swipe DOWN while already at the very top of the long page = back to landing.
  useEffect(() => {
    let startX = 0, startY = 0, startedAtTop = false;
    const onStart = (e) => {
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY;
      startedAtTop = (scrollRef.current?.scrollTop ?? 0) <= 0;
    };
    const onEnd = (e) => {
      if (projectsOpen || lockRef.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX, dy = t.clientY - startY;
      if (Math.abs(dy) < 80 || Math.abs(dy) < Math.abs(dx) * 1.5) return; // too short, or mostly sideways
      if (panel === "home" && dy < 0) {
        lockRef.current = true; setTimeout(() => { lockRef.current = false; }, 1100);
        goScroll("hero");
      } else if (panel === "scroll" && dy > 100 && startedAtTop) {
        lockRef.current = true; setTimeout(() => { lockRef.current = false; }, 1100);
        goScroll("home");
      }
    };
    window.addEventListener("touchstart", onStart, { passive:true });
    window.addEventListener("touchend", onEnd, { passive:true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [panel, projectsOpen, goScroll]);

  useEffect(() => {
    const sp = scrollRef.current;
    const update = () => {
      if (panel === "home") { setScrollPct(0); setActiveSection("home"); return; }
      if (!sp) return;
      const max = sp.scrollHeight - sp.clientHeight;
      setScrollPct(max > 0 ? Math.min(100, (sp.scrollTop / max) * 100) : 0);
      const secs = ["hero","projects","certs","stack","contact"];
      const idMap = { hero:"home", projects:"projects", certs:"certs", stack:"stack", contact:"contact" };
      // A section counts as "active" once its top passes this line. It's
      // taller than 160px now because the Stack sits centered on screen
      // (its top ends up ~1/5 of the way down), not at the very top.
      const line = Math.max(160, window.innerHeight * 0.4);
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(`sec-${secs[i]}`);
        if (el && el.getBoundingClientRect().top <= line) { setActiveSection(idMap[secs[i]]); break; }
      }
    };
    update();
    sp?.addEventListener("scroll", update, { passive:true });
    return () => sp?.removeEventListener("scroll", update);
  }, [panel]);

  return (
    <>
      <style>{`::view-transition-old(root){animation:none;mix-blend-mode:normal;}::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
      <SparkleBackground hide={projectsOpen} dark={dark}/>

      {projectsOpen && (
        <div id="projects-overlay" className="projects-overlay" style={{
          position:"fixed", top:0, left:0,
          zIndex:2147483646,
          background: dark ? "#0d1117" : "#ffcb05",
          overflowY:"auto",
          padding:"0",
          boxSizing:"border-box",
          color: dark ? "#e6edf3" : "#111110",
          "--ac": dark ? "#56b6c2" : "#ffffff",
          "--txh": dark ? "#e6edf3" : "#111110",
          "--txm": dark ? "#adbac7" : "#111110",
          "--tx": dark ? "#8b949e" : "#333330",
          "--border": dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)",
          "--border2": dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
          "--acbg": dark ? "rgba(86,182,194,0.15)" : "rgba(255,255,255,0.2)",
          "--acborder": dark ? "rgba(86,182,194,0.5)" : "rgba(0,0,0,0.4)",
        }}>
          <div className="projects-overlay-inner">
            <div className="back-row" style={{ marginBottom:"40px" }}>
              <button className="back-btn" onClick={handleCloseProjects}><BackIco s={12}/> Back</button>
            </div>
            
            <h2 className="pg-title">Selected <em>Work</em></h2>
            <div className="proj-grid">
              {DATA.projects.map((p, i) => {
                const PI = p.I;
                return (
                  <a key={i} href={p.url} target="_blank" rel="noreferrer" className="pcard">
                    <div className="pcard-top">
                      <span className={`pcard-icon${p.logo ? " has-logo" : ""}`} style={p.logoBg ? { background: p.logoBg } : undefined}>
                        {p.logo ? <img src={p.logo} alt={`${p.n} logo`} /> : <PI s={22}/>}
                      </span>
                      <span className="pcard-arr"><ArrowIco s={18}/></span>
                    </div>
                    <div className="pcard-info"><h3>{p.n}</h3><p>{p.d}</p></div>
                    <div className="ptags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
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

      <ThemeToggle dark={dark} onToggle={toggleTheme}/>
      <CustomCursor white={projectsOpen && !dark} dark={dark}/>
      <ProfileImage
        p1Ref={p1ImgRef}
        p2Ref={p2ImgRef}
        direction={rollingDir}
        onLanded={handleLanded}
      />
      <SparkBurst
        ref={sparkRef}
        sparkColor={dark ? "#56b6c2" : "#ffcb05"}
        sparkSize={50}
        sparkRadius={200}
        sparkCount={12}
        duration={800}
        zIndex={5}
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