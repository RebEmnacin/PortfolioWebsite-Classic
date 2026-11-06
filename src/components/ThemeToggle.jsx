import { SunIco, MoonIco } from "./icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   THEME TOGGLE
   Round button fixed to the top-right. Light mode shows a moon (go
   dark), dark mode shows a sun (go light). The actual theme state
   lives in App.jsx so the particles, cursor and overlay can react.
───────────────────────────────────────────────────────────────── */
export function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <SunIco s={20}/> : <MoonIco s={20}/>}
    </button>
  );
}
