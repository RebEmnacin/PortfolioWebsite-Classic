import { STACK_ICON_PATHS } from "./stackIconPaths";

/* ─────────────────────────────────────────────────────────────────
   STACK ICON — renders one inline SVG from ./stackIconPaths.js.
   fill="currentColor", so the colour comes from CSS (.stack-icon).
───────────────────────────────────────────────────────────────── */
export function StackIcon({ name, className = "stack-icon", style }) {
  const d = STACK_ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor"
      role="img" aria-label={name} xmlns="http://www.w3.org/2000/svg">
      <path d={d} />
    </svg>
  );
}