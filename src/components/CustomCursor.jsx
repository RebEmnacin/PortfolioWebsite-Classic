import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────── */
export function CustomCursor({ white = false, dark = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return; // touch screen: no cursor needed
    // Move the arrow straight to the mouse position on every mouse event
    // (no easing/lerp, no requestAnimationFrame loop) so it never lags behind.
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      el.style.opacity = "1";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <svg ref={ref} className="cursor-arrow" width="27" height="30" viewBox="0 0 27 30" fill="none" strokeWidth="2">
      <path d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z" fill={white ? "#ffffff" : dark ? "#56b6c2" : "#ffcb05"} stroke={white ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)"}/>
    </svg>
  );
}