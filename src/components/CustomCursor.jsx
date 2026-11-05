import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────────── */
export function CustomCursor({ white = false, dark = false }) {
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
      <path d="M20.0995 11.0797L3.72518 1.13204C2.28687 0.258253 0.478228 1.44326 0.704999 3.11083L3.28667 22.0953C3.58333 24.2768 7.33319 24.6415 8.3792 22.7043C9.5038 20.6215 10.8639 18.7382 12.43 17.7122C13.996 16.6861 16.2658 16.1911 18.6244 15.9918C20.8181 15.8063 21.9811 12.2227 20.0995 11.0797Z" fill={white ? "#ffffff" : dark ? "#56b6c2" : "#ffcb05"} stroke={white ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)"}/>
    </svg>
  );
}