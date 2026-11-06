import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   GSAP SCROLL FADE — wraps any block of content. As you scroll,
   it fades in approaching the center of the screen, then fades
   back out as it moves past — like cards being layered/replaced.
───────────────────────────────────────────────────────────────── */
export function FadeSection({ children, className = "", liftPx = 50 }) {
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
        // Stay FULLY visible while the section is on screen and only fade
        // during the last EDGE_PX of scroll as it enters from the bottom or
        // leaves through the top. (The old triangle curve only reached full
        // opacity at the exact midpoint, so sections looked washed out.)
        const EDGE_PX = 160;
        const total = self.end - self.start;
        const fromEdge = Math.min(p, 1 - p) * total;
        const fade = Math.min(1, Math.max(0, fromEdge / EDGE_PX));
        // gentle lift only while fading: slides up into place on the way in,
        // keeps drifting up on the way out. No offset while fully visible.
        const y = (p < 0.5 ? 1 : -1) * (1 - fade) * liftPx;
        gsap.set(el, { opacity: fade, y });
      },
    });

    // Heights change after first paint (images, fonts), which leaves the
    // start/end positions stale. Re-measure when this block resizes, when the
    // page finishes loading, and on rotate.
    const refresh = () => ScrollTrigger.refresh();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(refresh) : null;
    ro?.observe(el);
    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);

    return () => {
      st.kill(); // cleanup when the component unmounts
      ro?.disconnect();
      window.removeEventListener("load", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, [liftPx]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}