import { useState } from "react";
import { HomeIco, MonitorIco, StarIco, UserIco, MailIco, MenuIco } from "./icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   FLOATING NAV
───────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  {id:"home",     I:HomeIco,    lbl:"Home"},
  {id:"projects", I:MonitorIco, lbl:"Projects"},
  {id:"certs",    I:StarIco,    lbl:"Certs"},
  {id:"stack",    I:UserIco,    lbl:"Stack"},
  {id:"contact",  I:MailIco,    lbl:"Contact"},
];

export function FloatingNav({ onNav, onOpenChange, activeSection }) {
  // Starts OPEN, so the nav bar is visible on every load / refresh.
  // The hamburger button hides it, and the hamburger shows it again.
  const [open, setOpen] = useState(true);
  const toggle = (v) => { setOpen(v); onOpenChange?.(v); };
  return (
    <div className="fnav">
      {!open && (
        <button className="fnav-trigger" onClick={() => toggle(true)}>
          <MenuIco s={22}/>
        </button>
      )}
      <div className={`fnav-items${open?" open":""}`}>
        <button className="fnav-close" onClick={() => toggle(false)} aria-label="Hide navigation"><MenuIco s={22}/></button>
        {NAV_ITEMS.map(item => (
          <div key={item.id} className="fnav-item">
            <div className="fnav-pill-bg" />
            <div className="fnav-pill-label">{item.lbl}</div>
            <button
              className={`fnav-btn${activeSection===item.id?" active":""}`}
              onClick={() => {
                onNav(item.id);
                // on phones the menu would stay open over the page, so close it
                if (window.matchMedia("(max-width: 960px)").matches) toggle(false);
              }}>
              <item.I s={22}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}