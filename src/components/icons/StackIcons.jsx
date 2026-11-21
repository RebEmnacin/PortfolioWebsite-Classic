import { useId } from "react";
import { STACK_ICON_PATHS } from "./stackIconPaths";

/* ─────────────────────────────────────────────────────────────────
   STACK ICON — renders one inline SVG from ./stackIconPaths.js.
   fill="currentColor", so the colour comes from CSS (.stack-icon).

   Two icons are special so they look like the real logos:
   - Vercel : dark circle with a white triangle inside
   - Gemini : the sparkle filled with a yellow -> white gradient
   (the outline still comes from the .stack-icon CSS stroke)
───────────────────────────────────────────────────────────────── */
export function StackIcon({ name, className = "stack-icon", style }) {
  const gradId = useId();           // unique id, so several gradients on one page never clash
  const d = STACK_ICON_PATHS[name];
  if (!d) return null;
  const common = { className, style, viewBox: "0 0 24 24", role: "img", "aria-label": name, xmlns: "http://www.w3.org/2000/svg" };

  if (name === "Vercel") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="11" fill="currentColor" vectorEffect="non-scaling-stroke" />
        {/* the triangle, shrunk (scale .5) and nudged so it sits in the middle of the circle */}
        <path d={d} fill="#fff" stroke="none" transform="translate(6 6.4) scale(.5)" />
      </svg>
    );
  }

  if (name === "Gemini") {
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={gradId} x1="0.15" y1="0" x2="0.85" y2="1">
            <stop offset="0" stopColor="currentColor" />   {/* currentColor = the theme yellow */}
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path d={d} fill={`url(#${gradId})`} />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d={d} />
    </svg>
  );
}