import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "../Reveal";
import { StackIcon } from "../icons/StackIcons";
import { hasStackIcon } from "../icons/stackIconPaths";

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

/* Generates an irregular, organic "river stone" silhouette as a CSS
   clip-path path(). Same idea as before — N points around a circle, each
   nudged in angle and pulled in/out in radius — but instead of joining the
   points with straight lines (sharp corners), a smooth curve is drawn
   THROUGH them. Points pulled outward become round bulges, points pulled
   inward become soft dents, and there are no sharp corners anywhere.

   path() needs real pixel coordinates (not %), so we pass in the bubble's
   size. The curve is built with the Catmull-Rom -> cubic Bezier trick:
   for each pair of neighbouring points, the two "C" control points are
   placed using the points on either side, which keeps the join smooth. */
function randomBlobPath(rand, size, points = 7) {
  const half = size / 2;
  const step = (Math.PI * 2) / points;
  const pts = [];
  for (let i = 0; i < points; i++) {
    const angle = i * step + (rand() - 0.5) * step * 0.3; // small nudge keeps the points evenly spread = rounder curves
    // 74–96% of half the box: kept under 100% so the smooth curve never
    // pokes past the box edge (which would flatten it)
    const radius = half * (0.74 + rand() * 0.22);
    pts.push([half + radius * Math.cos(angle), half + radius * Math.sin(angle)]);
  }
  const f = (n) => n.toFixed(1);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(p2[0])} ${f(p2[1])}`;
  }
  return `path("${d} Z")`;
}

// The core skills that should always read as "bigger than most",
// no matter where they land in the layout.
const EMPHASIS = new Set(["react", "html", "css", "javascript", "typescript"]);

export function StackBubbleField({ items, cellSize = 140 }) {
  const fieldRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [pressed, setPressed] = useState(null);   // touch screens: which bubble is "popped up" right now

  // ── "hover for 1 second" name tag that follows the cursor ──
  // tip.name = which stack item it's for, tip.show = visible or fading out.
  // The cursor position lives in a ref and is written straight to the DOM,
  // so following the mouse never triggers a React re-render.
  const HOVER_MS = 1000;               // how long to hover before the tag appears
  const [tip, setTip] = useState({ name: "", show: false });
  const tipRef = useRef(null);
  const timerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const placeTip = useCallback(() => {
    const el = tipRef.current;
    if (!el) return;
    // a little to the right of and below the arrow
    el.style.transform = `translate3d(${mouseRef.current.x + 20}px, ${mouseRef.current.y + 22}px, 0)`;
  }, []);

  const startHover = (key, name, e) => {
    setHovered(key);
    mouseRef.current = { x: e.clientX, y: e.clientY };
    clearTimeout(timerRef.current);
    if (window.matchMedia("(hover: none)").matches) return; // touch screens: no hover tag
    timerRef.current = setTimeout(() => {
      setTip({ name, show: true });
      requestAnimationFrame(placeTip);
    }, HOVER_MS);
  };
  const moveHover = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    placeTip();
  };
  // ── TOUCH SCREENS (phones/tablets) ──
  // press an icon  -> it pops up straight away (.is-active class)
  // 1 second later -> its name tag appears, centred just above the icon
  // tag stays a few seconds, or until you tap somewhere else
  const touchTimerRef = useRef(null);
  const touchHideRef = useRef(null);
  const endTouch = useCallback(() => {
    clearTimeout(touchTimerRef.current);
    clearTimeout(touchHideRef.current);
    setPressed(null);
    setTip((t) => (t.show ? { ...t, show: false } : t));
  }, []);
  const startTouch = (key, name, e) => {
    clearTimeout(touchTimerRef.current);
    clearTimeout(touchHideRef.current);
    setTip((t) => (t.show ? { ...t, show: false } : t));   // hide the previous icon's tag
    setPressed(key);
    const bubble = e.currentTarget;
    touchTimerRef.current = setTimeout(() => {
      setTip({ name, show: true });
      requestAnimationFrame(() => {
        const tipEl = tipRef.current;
        if (!tipEl || !bubble.isConnected) return;
        const r = bubble.getBoundingClientRect();
        const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
        const x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), window.innerWidth - w - 8);
        const y = r.top - h - 10 < 8 ? r.bottom + 10 : r.top - h - 10;   // above the icon (below it if there's no room)
        tipEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      touchHideRef.current = setTimeout(endTouch, 3000);   // auto-hide after 3s
    }, HOVER_MS);
  };
  // tapping anywhere that is NOT an icon closes it
  useEffect(() => {
    const onDown = (e) => { if (!e.target.closest?.(".stack-bubble")) endTouch(); };
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onDown);
      clearTimeout(touchTimerRef.current);
      clearTimeout(touchHideRef.current);
    };
  }, [endTouch]);

  const endHover = () => {
    if (window.matchMedia("(hover: none)").matches) return;   // touch screens are handled by the touch code above
    setHovered(null);
    clearTimeout(timerRef.current);
    setTip(t => (t.show ? { ...t, show: false } : t));
  };
  useEffect(() => () => clearTimeout(timerRef.current), []);

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

  // LAYOUT: bubbles sit in neat rows (left-aligned), each bubble in its own square "cell".
  //   cellSize = the biggest a cell may get (px); on narrow screens it shrinks to ~72%.
  //   perRow   = how many cells fit across the field; the field's height = rows × cell.
  // A little seeded randomness (size + jitter) keeps the "river stone" look, but the jitter is
  // capped to the leftover room in the cell, so bubbles can never overlap.
  // useMemo = only recalculate when the inputs change, not on every re-render (e.g. hover).
  const layout = useMemo(() => {
    if (!dims.w || !items.length) return { list: [], height: 0 };
    const rand = mulberry32(items.length * 97 + 13 + String(items[0].n).length * 31);
    const cellMax = dims.w < 520 ? Math.round(cellSize * 0.72) : cellSize;
    // if the whole group fits in ONE row with cells of at least 104px, use one row (fills the wide desktop space)
    const fitsOneRow = dims.w >= 520 && items.length * 104 <= dims.w;
    const perMax = fitsOneRow ? items.length : Math.max(1, Math.min(items.length, Math.floor(dims.w / cellMax)));   // most that fit across
    const rows = Math.ceil(items.length / perMax);
    const perRow = Math.ceil(items.length / rows);        // spread evenly, so no lonely icon on the last row (4 -> 2+2, not 3+1)
    const cell = Math.min(cellMax, dims.w / perMax);

    const list = items.map((it, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const isEmphasis = EMPHASIS.has(String(it.n).toLowerCase());   // core skills get a bit bigger
      let sizeFactor = 0.84 + rand() * 0.08;
      if (isEmphasis) sizeFactor *= 1.08;
      sizeFactor = Math.min(0.99, Math.max(0.8, sizeFactor));
      const size = cell * sizeFactor;
      const room = (cell - size) / 2;                                // leftover space = max jitter
      const left = col * cell + room + (rand() - 0.5) * 2 * room;
      const top = row * cell + room + (rand() - 0.5) * 2 * room;
      return {
        ...it, size, top, left, isEmphasis,
        shape: randomBlobPath(rand, size),
        duration: 4.5 + rand() * 3,          // idle float speed: 4.5–7.5s
        delay: rand() * -6,                  // negative delay = starts mid-animation, so bubbles don't sync up
        drift: 4 + rand() * 5,               // subtle idle drift: 4–9px
        key: `${it.n}-${row}-${col}`,
      };
    });
    return { list, height: rows * cell };
  }, [items, dims.w, cellSize]);

  return (
    <div className="stack-bubble-field" ref={fieldRef} style={layout.height ? { height: layout.height } : undefined}>
      {layout.list.map((b, i) => (
        <Reveal
          key={b.key}
          delay={(i + 1) * 120} /* ms between each bubble popping in */
          className="stack-bubble-reveal"
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
            zIndex: hovered === b.key || pressed === b.key ? 50 : 1,
          }}
        >
          <div
            className={`stack-bubble${pressed === b.key ? " is-active" : ""}`}
            style={{
              clipPath: b.shape,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              "--drift": `${b.drift}px`,
            }}
            onTouchStart={(e) => startTouch(b.key, b.n, e)}
            onMouseEnter={(e) => startHover(b.key, b.n, e)}
            onMouseMove={moveHover}
            onMouseLeave={endHover}
          >
            {hasStackIcon(b.n) ? (
              <StackIcon name={b.n} style={{ width: "48%", height: "48%" }} />
            ) : (
              // fallback: items without an SVG (e.g. Canva) still use their image
              <img
                src={b.img}
                alt={b.n}
                style={{ width: "48%", height: "48%", objectFit: "contain" }}
              />
            )}
          </div>
        </Reveal>
      ))}
      {/* Rendered into <body> so it lines up with the real mouse position
          (the page sits inside a scaled/transformed wrapper, which would
          otherwise offset a fixed-position element). */}
      {createPortal(
        <div className="stack-tip" ref={tipRef} aria-hidden="true">
          <span className={`stack-tip-inner${tip.show ? " show" : ""}`}>{tip.name}</span>
        </div>,
        document.body
      )}
    </div>
  );
}