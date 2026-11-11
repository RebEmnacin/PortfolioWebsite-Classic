import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────────
   ARROW ANIMATION — looping fade + rightward glide
───────────────────────────────────────────────────────────────── */
export function ArrowAnimation() {
  const groupRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Set all arrows invisible at start
    gsap.set([ref1.current, ref2.current, ref3.current], { opacity: 0 });
    gsap.set(group, { x: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    // Move the whole group across the screen
    tl.to(group, { x: "100vw", duration: 2.8, ease: "power1.inOut" });
    tl.set(group, { x: 0 });
    tl.to(group, {}, "+=0.4"); // pause before next loop

    // Staggered fade-ins on each arrow — all tied to the same timeline start
    gsap.timeline({ repeat: -1 })
      .set(ref3.current, { opacity: 0 })
      .to(ref3.current, { opacity: 0.6, duration: 0.3, ease: "power2.out" }, 0)        // small fades in first
      .to(ref2.current, { opacity: 0.5, duration: 0.3, ease: "power2.out" }, 0.25)     // medium fades in
      .to(ref1.current, { opacity: 0.4, duration: 0.3, ease: "power2.out" }, 0.5)      // big fades in last
      .to([ref3.current, ref2.current, ref1.current], { opacity: 0, duration: 0.4, ease: "power2.in" }, 2.4) // all fade out together
      .to({}, {}, "+=0.4");                                                             // pause

    return () => gsap.killTweensOf([group, ref1.current, ref2.current, ref3.current]);
  }, []);

  return (
    <div ref={groupRef} 
      className="hero-arrow-wrap" 
      style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        gap: "0px", 
        lineHeight: 0 }}>
      {/* Arrow 1 — biggest */}
      <svg ref={ref1} 
        width="160" 
        height="420" 
        viewBox="0 0 150 376" 
        fill="#888884" 
        xmlns="http://www.w3.org/2000/svg" 
        style={{ display: "block", margin: 0, padding: 0, overflow: "visible" }}>
        <path 
          d="M1 1H70L149 188H79L1 1Z" 
          fill="#888884" 
          stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
        <path 
          d="M1 375H70L149 188H79L1 375Z" 
          fill="#888884" 
          stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
      </svg>

      {/* Arrow 2 — medium */}
      <svg ref={ref2} width="120" height="420" viewBox="0 0 150 376" fill="#888884" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: 0, padding: 0, overflow: "visible" }}>
        <path d="M1 1H70L149 188H79L1 1Z" fill="#888884" stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M1 375H70L149 188H79L1 375Z" fill="#888884" stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
      </svg>

      {/* Arrow 3 — smallest */}
      <svg ref={ref3} width="80" height="420" viewBox="0 0 150 376" fill="#888884" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: 0, padding: 0, overflow: "visible" }}>
        <path d="M1 1H70L149 188H79L1 1Z" fill="#888884" stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M1 375H70L149 188H79L1 375Z" fill="#888884" stroke="#888884" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}