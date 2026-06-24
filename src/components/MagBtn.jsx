import { useRef } from "react";
import { ArrowIco } from "./icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   MAG BUTTON
───────────────────────────────────────────────────────────────── */
export function MagBtn({ children, onClick, href, ghost=false, className="" }) {
  const btnRef = useRef(null);
  const addRipple = (e) => {
    const btn = btnRef.current; if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple-circle";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top  = `${e.clientY - rect.top}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 700);
  };
  const cls = `${ghost ? "mag-btn-ghost" : "mag-btn"} ${className}`;
  const inner = <><span>{children}</span><ArrowIco s={13} /></>;
  if (href) return <a ref={btnRef} href={href} target="_blank" rel="noreferrer" className={cls} onClick={addRipple}>{inner}</a>;
  return <button ref={btnRef} className={cls} onClick={(e) => { addRipple(e); onClick?.(); }}>{inner}</button>;
}
