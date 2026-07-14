import { useEffect, useMemo, useRef, useState } from "react";
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

// The core skills that should always read as "bigger than most",
// no matter where they land in the layout.
const EMPHASIS = new Set(["react", "html", "css", "javascript", "typescript"]);

export function StackBubbleField({ items }) {
  const fieldRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  // Measure the field's REAL pixel size (not a guess). We need actual
  // px to guarantee bubbles never cross into a neighbor's space —
  // percentages alone can't promise that.
  const [dims, setDims] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = fieldRef.current;
    if (!el) return;
    const measure = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // useMemo = only recalculate the random layout when the inputs change,
  // not on every re-render (e.g. when `hovered` state changes).
  const bubbles = useMemo(() => {
    if (!dims.w || !dims.h) return [];
    const rand = mulberry32(items.length * 97 + 13);

    // Grid of cells, one per icon, sized in REAL pixels using the
    // field's measured width/height and its aspect ratio.
    const cols = Math.max(
      1,
      Math.round(Math.sqrt(items.length * (dims.w / dims.h)))
    );
    const rows = Math.ceil(items.length / cols);
    const cellW = dims.w / cols;
    const cellH = dims.h / rows;
    const cellMin = Math.min(cellW, cellH);

    // Center of the grid — used to measure "how far from the middle"
    // each cell is, so we can shrink bubbles the further out they go.
    const centerCol = (cols - 1) / 2;
    const centerRow = (rows - 1) / 2;
    const maxColDist = Math.max(centerCol, cols - 1 - centerCol) || 1;
    const maxRowDist = Math.max(centerRow, rows - 1 - centerRow) || 1;

    // Pick which grid cells actually get used. IMPORTANT: the grid
    // (cols × rows) almost always has a couple more cells than we have
    // icons for. The old bug: it only ever filled cells 0..items.length-1,
    // so the last 1-2 cells in the grid were ALWAYS empty, in the same
    // spot every time — that's what made one bubble (GitHub) look
    // stranded next to a permanent dead patch. Fix: shuffle the FULL
    // grid, then take just enough cells for our icons — so any leftover
    // empty cells land in a random spot instead of always the same one.
    const totalCells = cols * rows;
    const allCells = Array.from({ length: totalCells }, (_, i) => i);
    for (let i = allCells.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [allCells[i], allCells[j]] = [allCells[j], allCells[i]];
    }
    const cellOrder = allCells.slice(0, items.length);

    return items.map((it, i) => {
      const cell = cellOrder[i];
      const cellRow = Math.floor(cell / cols);
      const cellCol = cell % cols;

      // ring: 0 = dead center, 1 = far corner/edge. Using Manhattan
      // distance (row-distance + col-distance) instead of straight-line
      // distance is what makes the falloff shape a DIAMOND instead of
      // a circle.
      const ring =
        (Math.abs(cellRow - centerRow) / maxRowDist +
          Math.abs(cellCol - centerCol) / maxColDist) /
        2;

      // bigger near the center, smaller toward the edges, plus a touch
      // of randomness — kept in a tighter range than before so bubbles
      // stay close in size, like stones on a path, instead of some
      // shrinking down to isolated-looking pebbles
      let sizeFactor = 0.66 + 0.3 * (1 - ring) + (rand() - 0.5) * 0.06;

      // emphasis skills get an extra boost on top of wherever they land
      const isEmphasis = EMPHASIS.has(String(it.n).toLowerCase());
      if (isEmphasis) sizeFactor *= 1.2;

      sizeFactor = Math.min(0.98, Math.max(0.6, sizeFactor));
      const size = cellMin * sizeFactor;

      // jitter is capped at exactly the leftover room in the cell, so
      // the bubble can NEVER cross into a neighboring cell — no overlap.
      const maxJitterX = Math.max(0, (cellW - size) / 2);
      const maxJitterY = Math.max(0, (cellH - size) / 2);
      const jitterX = (rand() - 0.5) * 2 * maxJitterX;
      const jitterY = (rand() - 0.5) * 2 * maxJitterY;

      const left = cellCol * cellW + (cellW - size) / 2 + jitterX;
      const top = cellRow * cellH + (cellH - size) / 2 + jitterY;

      const shape = SHAPES[Math.floor(rand() * SHAPES.length)];
      const duration = 5 + rand() * 4; // float animation speed: 5–9s
      const delay = rand() * -6; // negative delay = starts mid-animation, so bubbles don't sync up
      const drift = 8 + rand() * 8; // how far it drifts up/down in px
      return {
        ...it,
        size,
        top,
        left,
        shape,
        duration,
        delay,
        drift,
        isEmphasis,
        key: `${it.n}-${i}`,
      };
    });
  }, [items, dims.w, dims.h]);

  return (
    <div className="stack-bubble-field" ref={fieldRef}>
      {bubbles.map((b, i) => (
        <Reveal
          key={b.key}
          delay={(i + 1) * 55}
          style={{
            position: "absolute",
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            // WHY: this z-index lives on the OUTER wrapper (not the inner
            // bubble). Each bubble sits in its own stacking context, so
            // bumping z-index on something *inside* it can't lift it above
            // a neighboring bubble — only raising the wrapper itself can.
            zIndex: hovered === b.key ? 50 : 1,
          }}
        >
          <div
            className="stack-bubble"
            style={{
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