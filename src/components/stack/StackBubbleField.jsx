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

/* Generates an irregular, fractured-stone silhouette as a CSS
   clip-path polygon (instead of a smooth rounded blob). Picks N
   points around a circle, each nudged in angle and pulled in/out
   in radius, so every bubble gets its own unique "flagstone" shape —
   like the cracked, angular edges of real cut stone. */
function randomStonePath(rand, points = 7) {
  const step = (Math.PI * 2) / points;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = i * step + (rand() - 0.5) * step * 0.5;
    const radius = 50 * (0.8 + rand() * 0.2); // 80–100% of half the box
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  }
  return `polygon(${pts.join(", ")})`;
}

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

    // WHY ROWS INSTEAD OF A FIXED GRID: a fixed cols × rows grid
    // (e.g. 5 × 3 = 15 slots) almost never divides evenly into our
    // icon count (13), so some slots are always left empty — that's
    // what caused the visible gaps. Instead, we decide how many ROWS
    // to use, then split the icons across those rows as evenly as
    // possible (some rows get one extra icon). Every row is sized to
    // exactly fit however many icons are in it, so there is never a
    // leftover empty slot anywhere.
    const rows = Math.max(
      1,
      Math.round(Math.sqrt(items.length * (dims.h / dims.w)))
    );
    const base = Math.floor(items.length / rows);
    let extra = items.length % rows; // how many rows get one extra icon

    // shuffle which rows get the "extra" icon, so it's not always the
    // last row that's longer
    const rowIndices = Array.from({ length: rows }, (_, i) => i);
    for (let i = rowIndices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [rowIndices[i], rowIndices[j]] = [rowIndices[j], rowIndices[i]];
    }
    const rowCounts = new Array(rows).fill(base);
    for (let i = 0; i < extra; i++) rowCounts[rowIndices[i]] += 1;

    // shuffle the icons themselves, then hand them out row by row —
    // this randomizes which icon ends up in which row/column
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const centerRow = (rows - 1) / 2;
    const maxRowDist = Math.max(centerRow, rows - 1 - centerRow) || 1;
    const cellH = dims.h / rows;

    const result = [];
    let cursor = 0;
    rowCounts.forEach((count, rowIndex) => {
      const cellW = dims.w / count; // this row's cells exactly fill the width
      const centerCol = (count - 1) / 2;
      const maxColDist = Math.max(centerCol, count - 1 - centerCol) || 1;

      for (let colIndex = 0; colIndex < count; colIndex++) {
        const it = shuffled[cursor++];

        // ring: 0 = dead center, 1 = far edge. Manhattan distance
        // (row-distance + col-distance) is what makes the falloff
        // shape a DIAMOND instead of a circle.
        const ring =
          (Math.abs(rowIndex - centerRow) / maxRowDist +
            Math.abs(colIndex - centerCol) / maxColDist) /
          2;

        // Packed close to the edges of their own cell — like fitted
        // paving stones — with only a small size dip toward the
        // outer edges of the field, plus a touch of randomness.
        let sizeFactor = 0.86 + 0.1 * (1 - ring) + (rand() - 0.5) * 0.04;

        // emphasis skills get an extra boost on top of wherever they land
        const isEmphasis = EMPHASIS.has(String(it.n).toLowerCase());
        if (isEmphasis) sizeFactor *= 1.08;

        sizeFactor = Math.min(0.99, Math.max(0.82, sizeFactor));
        const cellMin = Math.min(cellW, cellH);
        const size = cellMin * sizeFactor;

        // jitter is capped at exactly the leftover room in the cell, so
        // the bubble can NEVER cross into a neighboring cell — no overlap.
        const maxJitterX = Math.max(0, (cellW - size) / 2);
        const maxJitterY = Math.max(0, (cellH - size) / 2);
        const jitterX = (rand() - 0.5) * 2 * maxJitterX;
        const jitterY = (rand() - 0.5) * 2 * maxJitterY;

        const left = colIndex * cellW + (cellW - size) / 2 + jitterX;
        const top = rowIndex * cellH + (cellH - size) / 2 + jitterY;

        const shape = randomStonePath(rand);
        const duration = 4.5 + rand() * 3; // idle float speed: 4.5–7.5s
        const delay = rand() * -6; // negative delay = starts mid-animation, so bubbles don't sync up
        const drift = 4 + rand() * 5; // subtle idle drift: 4–9px (kept small since stones sit close together)

        result.push({
          ...it,
          size,
          top,
          left,
          shape,
          duration,
          delay,
          drift,
          isEmphasis,
          key: `${it.n}-${rowIndex}-${colIndex}`,
        });
      }
    });

    return result;
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
              clipPath: b.shape,
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
              style={{ width: "48%", height: "48%", objectFit: "contain" }}
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