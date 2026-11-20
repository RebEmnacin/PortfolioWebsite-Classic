import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   REVEAL
   Wraps a block and fades/slides it in once it enters the viewport
   (and fades it back out if it scrolls back above the fold).
───────────────────────────────────────────────────────────────── */
export function Reveal({ children, delay=0, className="", style={} }) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden");
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setState("vis");
      else {
        // left through the TOP -> "out" (slides further up). left through the BOTTOM -> "hidden" (slides further down).
        // Both move AWAY from the edge, so a block peeking in at the bottom can't flicker back and forth.
        const above = e.boundingClientRect.top < (e.rootBounds ? e.rootBounds.top : 0);
        setState(s => (s === "vis" ? (above ? "out" : "hidden") : s));
      }
    }, { threshold:0.1, rootMargin:"0px 0px -40px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className={`reveal${state==="vis"?" vis":state==="out"?" out":""} ${className}`}
      style={{ transitionDelay: state==="vis" ? `${delay}ms` : "0ms", ...style }}>
      {children}
    </div>
  );
}
