import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   REVEAL
   Wraps a block and fades/slides it in once it enters the viewport
   (and fades it back out if it scrolls back above the fold).
───────────────────────────────────────────────────────────────── */
export function Reveal({ children, delay=0, className="" }) {
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
