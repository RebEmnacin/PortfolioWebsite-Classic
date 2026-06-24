import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   Profile Images of each panels
   This renders a single <img> overlay that visually "rolls" from
   the landing-panel photo position to the hero-panel photo position
   (or back), then fades out and hands off to onLanded.
───────────────────────────────────────────────────────────────── */
export function ProfileImage({ p1Ref, p2Ref, direction, onLanded }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const p1 = p1Ref.current;
    if (!overlay || !p1) return;
    const r1 = p1.getBoundingClientRect();
    overlay.src = "/src/assets/RebProfile.jpg";
    overlay.style.cssText = `
      position: fixed;
      left: ${r1.left}px;
      top: ${r1.top}px;
      width: ${r1.width}px;
      height: ${r1.height}px;
      border-radius: 50%;
      border: 3px solid #ffcb05;
      box-shadow: 6px 6px 0 #111110;
      object-fit: cover;
      pointer-events: none;
      z-index: 99999;
      display: block;
    `;
  }, []);

  useEffect(() => {
    if (!direction) return;
    const overlay = overlayRef.current;
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    if (!overlay || !p1 || !p2) return;

    const r1 = p1.getBoundingClientRect();
    const r2 = p2.getBoundingClientRect();

    const fromX = direction === "forward" ? r1.left  : r2.left;
    const fromY = direction === "forward" ? r1.top   : r2.top;
    const size  = direction === "forward" ? r1.width : r2.width;
    const rot   = direction === "forward" ? "720deg" : "-720deg";
    const src   = direction === "forward"
      ? "/src/assets/RebProfile.jpg"
      : "/src/assets/Reb.jpg";

    // destination is known at call time because we offset by vw manually
    const vw = window.innerWidth;
    const toX = direction === "forward" ? r2.left - vw : r1.left + vw;
    const toY = direction === "forward" ? r2.top       : r1.top;

    const dx = toX - fromX;
    const dy = toY - fromY;

    overlay.src = src;
    overlay.style.cssText = `
      position: fixed;
      left: ${fromX}px;
      top: ${fromY}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid #ffcb05;
      box-shadow: 6px 6px 0 #111110;
      object-fit: cover;
      pointer-events: none;
      z-index: 99999;
      display: block;
    `;

    // starts rolling immediately — no pause
    // duration matches the panel slide (1000ms) + a bit more so it lands naturally
    const anim = overlay.animate(
      [
        { transform: `translate(0px, 0px) rotate(0deg)` },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot})` },
      ],
      {
        duration: 4200,
        easing: "cubic-bezier(.4, 0, .2, 1)",
        fill: "forwards",
      }
    );

    anim.onfinish = () => {
      // fade out the overlay
      overlay.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 350, easing: "ease-out", fill: "forwards" }
      ).onfinish = () => {
        overlay.style.display = "none";
        onLanded?.(direction);
      };
    };

    return () => anim.cancel();
  }, [direction]);

  return (
    <img
      ref={overlayRef}
      alt=""
      aria-hidden="true"
      style={{ display: "none" }}
    />
  );
}
