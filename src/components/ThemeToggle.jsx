import { useId } from "react";
import { useSpring, animated } from "@react-spring/web";

/* ─────────────────────────────────────────────────────────────────
   THEME TOGGLE
   Round button fixed to the top-right. Light mode shows a moon (go
   dark), dark mode shows a sun (go light). The actual theme state
   lives in App.jsx so the particles, cursor and overlay can react.

   The icon itself morphs between sun and moon with react-spring
   (idea + values from jfelix.info "react-toggle-dark-mode", MIT).
   The circular screen reveal is NOT here — that's toggleTheme() in App.jsx.
───────────────────────────────────────────────────────────────── */

// The two states of the icon. Every value here is what react-spring animates TO.
const MOON = {
  circle: { r: 9 },                          // big center circle...
  mask:   { cx: "50%", cy: "23%" },          // ...with a second circle cut out of it = crescent
  svg:    { transform: "rotate(40deg)" },
  lines:  { opacity: 0 },                    // sun rays hidden
};
const SUN = {
  circle: { r: 5 },                          // small center circle
  mask:   { cx: "100%", cy: "0%" },          // cut-out circle slides away (out of view)
  svg:    { transform: "rotate(90deg)" },
  lines:  { opacity: 1 },                    // sun rays visible
};
// Bigger mass = heavier/slower, tension = pull strength, friction = how fast it settles.
const SPRING = { mass: 4, tension: 250, friction: 35 };

function ThemeIcon({ showMoon, size = 20 }) {
  const maskId = "theme-mask-" + useId().replace(/:/g, "");
  const t = showMoon ? MOON : SUN;

  const svgProps    = useSpring({ ...t.svg,    config: SPRING });
  const circleProps = useSpring({ ...t.circle, config: SPRING });
  const maskProps   = useSpring({ ...t.mask,   config: SPRING });
  const linesProps  = useSpring({ ...t.lines,  config: SPRING });

  return (
    <animated.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={svgProps}
      aria-hidden="true"
    >
      <mask id={maskId}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <animated.circle r="9" fill="black" {...maskProps} />
      </mask>
      <animated.circle cx="12" cy="12" fill="currentColor" mask={`url(#${maskId})`} {...circleProps} />
      <animated.g stroke="currentColor" style={linesProps}>
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </animated.g>
    </animated.svg>
  );
}

export function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {/* light mode shows the moon (click to go dark), dark mode shows the sun */}
      <ThemeIcon showMoon={!dark} size={20} />
    </button>
  );
}