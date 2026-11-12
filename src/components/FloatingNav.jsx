import { useState } from "react";
import { HomeIco, HammerIco, RibbonIco, ToolsIco, PlaneIco, MenuIco } from "./icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {id:"home",     I:HomeIco,    lbl:"Home"},
  {id:"projects", I:HammerIco,  lbl:"Projects"},
  {id:"certs",    I:RibbonIco,  lbl:"Certs"},
  {id:"stack",    I:ToolsIco,   lbl:"Stack"},
  {id:"contact",  I:PlaneIco,   lbl:"Contact"},
];

export function FloatingNav({ onNav, onOpenChange, activeSection }) {
  // Starts OPEN, so the nav bar is visible on every load / refresh.
  // The hamburger button hides it, and the hamburger shows it again.
  const [open, setOpen] = useState(true);
  const toggle = (v) => { setOpen(v); onOpenChange?.(v); };
  return (
    <div className="fnav">
      {/* Always rendered (never unmounted) so on phones the pill can collapse INTO this
          same button. On desktop the CSS hides it while the nav is open, as before. */}
      <button className="fnav-trigger" onClick={() => toggle(!open)}
        aria-label={open ? "Hide navigation" : "Show navigation"} aria-expanded={open}>
        <MenuIco s={22}/>
      </button>
      <div className={`fnav-items${open?" open":""}`}>
        <button className="fnav-close" onClick={() => toggle(false)} aria-label="Hide navigation"><MenuIco s={22}/></button>
        {NAV_ITEMS.map(item => (
          <div key={item.id} className="fnav-item">
            <div className="fnav-pill-bg" />
            <div className="fnav-pill-label">{item.lbl}</div>
            <button
              className={`fnav-btn${activeSection===item.id?" active":""}`}
              onClick={(e) => {
                // the button is where the circle grows from. The menu stays open until the
                // hamburger is pressed (it no longer auto-closes on phones).
                onNav(item.id, e.currentTarget);
              }}>
              <item.I s={22}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}