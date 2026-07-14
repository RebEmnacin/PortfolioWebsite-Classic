import { useMemo, useState } from "react";
import { Reveal } from "../Reveal";

/* ─────────────────────────────────────────────────────────────────
   Tiny seeded random number generator.
   WHY: Math.random() gives a new random layout every time React
   re-renders, so bubbles would jump around. A "seeded" random
   generator always produces the SAME sequence for the same seed,
   so the randomized layout is picked once and stays put.
───────────────────────────────────────────────────────────────── */
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Different border-radius values = different bubble silhouettes:
   perfect circle, squircle, and two "blob" shapes. */
const SHAPES = [
  "50%",                                             // circle
  "38% 62% 63% 37% / 41% 44% 56% 59%",               // blob 1
  "63% 37% 54% 46% / 46% 40% 60% 54%",               // blob 2
  "34%",                                             // squircle
  "58% 42% 35% 65% / 55% 45% 55% 45%",               // blob 3
];

export function StackBubbleField({ items }) {
  const [hovered, setHovered] = useState(null);

  // useMemo = only recalculate the random layout when `items` changes,
  // not on every re-render (e.g. when `hovered` state changes).
  const bubbles = useMemo(() => {
    const rand = mulberry32(items.length * 97 + 13);
    return items.map((it, i) => {
      const size = 60 + rand() * 60; // random size: 60–120px
      const top = rand() * 76; // random vertical position: 0–76%
      const left = rand() * 78; // random horizontal position: 0–78%
      const shape = SHAPES[Math.floor(rand() * SHAPES.length)];
      const duration = 5 + rand() * 4; // float animation speed: 5–9s
      const delay = rand() * -6; // negative delay = starts mid-animation, so bubbles don't sync up
      const drift = 10 + rand() * 16; // how far it drifts up/down in px
      return {
        ...it,
        size,
        top,
        left,
        shape,
        duration,
        delay,
        drift,
        key: `${it.n}-${i}`,
      };
    });
  }, [items]);

  return (
    <div className="stack-bubble-field">
      {bubbles.map((b, i) => (
        <Reveal key={b.key} delay={(i + 1) * 55}>
          <div
            className="stack-bubble"
            style={{
              width: b.size,
              height: b.size,
              top: `${b.top}%`,
              left: `${b.left}%`,
              borderRadius: b.shape,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
            }}
            onMouseEnter={() => setHovered(b.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <img
              src={b.img}
              alt={b.n}
              style={{ width: "50%", height: "50%", objectFit: "contain" }}
            />
            <span
              className={`stack-bubble-label${hovered === b.key ? " show" : ""}`}
            >
              {b.n}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}