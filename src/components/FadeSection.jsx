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
        if (window.matchMedia("(max-width: 960px)").matches) {
          // PHONE / TABLET: sections are tall, so the triangle curve left most
          // of the screen half-faded. Stay fully visible and only fade during
          // the last EDGE_PX of scroll as the section enters from the bottom
          // or leaves through the top.
          const EDGE_PX = 140;
          const total = self.end - self.start;
          const fromEdge = Math.min(p, 1 - p) * total;
          gsap.set(el, { opacity: Math.min(1, Math.max(0, fromEdge / EDGE_PX)), y: 0 });
        } else {
          // DESKTOP (unchanged): triangle curve — 0 at start, 1 at the exact
          // midpoint (p=0.5), back to 0 at end
          const fade = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
          gsap.set(el, { opacity: fade, y: (0.5 - p) * liftPx });
        }
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