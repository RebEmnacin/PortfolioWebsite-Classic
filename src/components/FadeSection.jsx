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
        // Triangle curve: 0 at start, 1 at the exact midpoint (p=0.5), back to 0 at end
        const fade = Math.max(0, 1 - Math.abs(p - 0.5) * 2);
        gsap.set(el, { opacity: fade, y: (0.5 - p) * liftPx });
      },
    });

    return () => st.kill(); // cleanup when the component unmounts
  }, [liftPx]);

  return (
    <div ref={ref} className={className} style={{ willChange: "opacity, transform" }}>
      {children}
    </div>
  );
}
