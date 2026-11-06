import { useEffect } from "react";
import { useAnimate } from "motion/react";

function safeRect(el) {
  if (!el) return null;
  let rect = el.getBoundingClientRect();
  if (rect.width < 1 && rect.height < 1 && el.parentElement) {
    rect = el.parentElement.getBoundingClientRect();
  }
  return rect;
}

export function ProfileImage({ p1Ref, p2Ref, direction, onLanded }) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!direction) return;
    const overlay = scope.current;
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    if (!overlay || !p1 || !p2) return;

    let cancelled = false;

    const run = async () => {
      if (direction === "forward") {
        if (p1) p1.style.opacity = "0";
      }

      const rawR1 = safeRect(p1);
      const r1 = {
        left: direction === "reverse" ? rawR1.left + window.innerWidth : rawR1.left,
        top: rawR1.top,
        width: rawR1.width,
        height: rawR1.height,
      };

      const rawR2 = safeRect(p2);
      const r2 = {
        left: direction === "forward" ? rawR2.left - window.innerWidth : rawR2.left,
        top: rawR2.top,
        width: rawR2.width,
        height: rawR2.height,
      };

      const fromX = direction === "forward" ? r1.left : r2.left;
      const fromY = direction === "forward" ? r1.top  : r2.top;
      const size  = direction === "forward" ? r1.width : r2.width;
      const src   = direction === "forward"
        ? "/assets/RebProfile.jpg"
        : "/assets/Reb.jpg";

      const toX = direction === "forward" ? r2.left : r1.left;
      const toY = direction === "forward" ? r2.top  : r1.top;

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
        border: 3px solid var(--ac);
        box-shadow: 6px 6px 0 var(--photo-sh, var(--outline));
        object-fit: cover;
        pointer-events: none;
        z-index: 99999;
        display: block;
        transform: translate(0px, 0px) rotate(0deg);
      `;

      if (cancelled) return;

      const rollControls = animate(
        overlay,
        { x: [0, dx], y: [0, dy] },
        { duration: direction === "forward" ? 1.0 : 1.3, ease: [0.4, 0, 0.2, 1] }
      );

      rollControls.then(() => {
        if (cancelled) return;
        overlay.style.display = "none";
        if (direction === "reverse") {
          if (p1) p1.style.opacity = "1";
        }
        onLanded?.(direction);
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [direction]);

  return (
    <img
      ref={scope}
      alt=""
      aria-hidden="true"
      style={{ display: "none" }}
    />
  );
}