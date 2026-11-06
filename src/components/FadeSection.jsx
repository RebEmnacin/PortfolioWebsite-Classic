import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────────
   SCROLL FADE — wraps any block of content. It is fully visible while
   it is on screen and only fades (with a small slide) during the last
   EDGE_PX of scroll as it enters from the bottom or leaves through
   the top.

   WHY it reads live positions instead of using ScrollTrigger:
   the panels live inside a wrapper that zooms (scale 2.5) and slides
   sideways. ScrollTrigger measures start/end ONCE, so anything measured
   during those transforms (or before images/fonts load) was wrong, and
   sections stayed faded after load. Here every update measures the
   section against the scroller's own box right now, and divides out the
   zoom scale, so the result is always correct.
───────────────────────────────────────────────────────────────── */
const EDGE_PX = 160;

export function FadeSection({ children, className = "", liftPx = 50 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // .panel-scroll is OUR custom scrollable div (not the window)
    const scroller = el.closest(".panel-scroll");
    const target = scroller || window;
    let raf = 0;

    const update = () => {
      raf = 0;
      const sr = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, bottom: window.innerHeight, height: window.innerHeight };
      const viewH = scroller ? scroller.clientHeight : window.innerHeight;
      const scale = viewH ? sr.height / viewH || 1 : 1; // zoom-wrap scale

      // our own slide offset is part of getBoundingClientRect — take it
      // back out so the section's real layout position is measured
      const curY = Number(gsap.getProperty(el, "y")) || 0;
      const r = el.getBoundingClientRect();
      const top = r.top - curY * scale;
      const bottom = r.bottom - curY * scale;

      const entered = (sr.bottom - top) / scale; // px the top edge has come up from the bottom
      const remaining = (bottom - sr.top) / scale; // px left before the bottom edge leaves the top
      const fade = Math.min(1, Math.max(0, Math.min(entered, remaining) / EDGE_PX));
      // slide up into place on the way in, keep drifting up on the way out
      const y = (entered < remaining ? 1 : -1) * (1 - fade) * liftPx;
      gsap.set(el, { opacity: fade, y });
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };

    update();
    target.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    window.addEventListener("orientationchange", schedule);
    // panel slide / zoom finishing, and images or fonts changing heights
    document.addEventListener("transitionend", schedule, true);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    ro?.observe(el);
    if (scroller) ro?.observe(scroller);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      target.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      window.removeEventListener("orientationchange", schedule);
      document.removeEventListener("transitionend", schedule, true);
      ro?.disconnect();
    };
  }, [liftPx]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}