import { useEffect, useRef, useState } from "react";
import { DATA } from "../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   CERT SLIDER — flat 2D carousel, rounded cards
───────────────────────────────────────────────────────────────── */
export function CertSlider() {
  const [active, setActive] = useState(0);
  const stageRef    = useRef(null);
  const outerRef    = useRef(null);
  const progressRef = useRef(0);
  const targetRef   = useRef(0);
  const wheelLock   = useRef(false);
  const rafRef      = useRef(null);
  const swipedRef   = useRef(false);   // true right after a swipe, so the tap that follows doesn't open a link
  const n = DATA.certs.length;

  // Move the carousel so card number `i` ends up in the middle (takes the shortest way around the loop)
  const goTo = (i) => {
    const cur = Math.round(targetRef.current);
    let d = (((i - cur) % n) + n) % n;
    if (d > n / 2) d -= n;
    targetRef.current = cur + d;
  };

  // `prog` is the carousel position and is allowed to keep growing (7, 8, 9...)
  // or going negative — the cards wrap around, so there is no first/last card.
  const applyTransforms = (prog) => {
    const stage = stageRef.current; if (!stage) return;
    const slides = stage.querySelectorAll(".cert-slide");
    slides.forEach((el, i) => {
      // Shortest way around the loop from this card to the center:
      // always between -n/2 and +n/2 (negative = left side, positive = right).
      // This is what makes the last card sit right next to the first one.
      let diff = (((i - prog) % n) + n) % n;
      if (diff > n / 2) diff -= n;
      const dist = Math.abs(diff);

      const tx = diff * 104;                               // % of card width -> small gap between cards
      const scale = 0.8 + 0.2 * Math.max(0, 1 - dist);     // 0.8 at the sides -> grows to 1 at the center
      const op = Math.max(0, 1 - dist * 0.45);             // fades out the farther from the center
      el.style.transform = `translate3d(${tx}%,0,0) scale(${scale})`;
      el.style.opacity = op;
      el.style.zIndex = Math.round(100 - dist * 10);
      el.style.pointerEvents = op < 0.05 ? "none" : "auto";
    });
    // which card is in the middle (wrapped back into 0..n-1) -> highlights the dot
    setActive((((Math.round(prog)) % n) + n) % n);
  };

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      progressRef.current += (targetRef.current - progressRef.current) * 0.1;
      applyTransforms(progressRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  // Only fires while the cursor is actually over the slider (hover-gated by
  // being attached directly to the outer div). Each "tick" of scroll moves
  // exactly one card, then locks briefly so a single scroll gesture doesn't
  // skip multiple cards at once.
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      // Define a center "hot zone" — only the middle band of the slider
      // (where the active card actually sits) captures the scroll.
      // Everywhere else (the red-line margins on the sides) lets the page
      // scroll normally.
      const rect = el.getBoundingClientRect();
      const cardHalfWidth = 260; // half of the cert card's actual pixel width (card is 520px wide)
      const centerX = rect.left + rect.width / 2;
      const inZone = Math.abs(e.clientX - centerX) <= cardHalfWidth;
      if (!inZone) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = Math.round(targetRef.current);

      // The carousel loops, so there is no "last card" to release the
      // scroll at — every tick over the center zone moves one card.
      e.preventDefault();
      e.stopPropagation();
      if (wheelLock.current) return;
      targetRef.current = current + dir;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 480);
    };
    // passive:false is required so preventDefault actually stops page scroll
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [n]);

  // TOUCH: swipe left/right = next/previous card (phones have no mouse wheel)
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let startX = 0, startY = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;   // too short, or it was a vertical scroll
      swipedRef.current = true;
      setTimeout(() => { swipedRef.current = false; }, 350);
      targetRef.current = Math.round(targetRef.current) + (dx < 0 ? 1 : -1);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, []);

  return (
    <>
      <div className="cert-slider-outer" ref={outerRef}>
        <div className="cert-slider-stage" ref={stageRef}>
          {DATA.certs.map((c, i) => (
            <div key={i} className={`cert-slide${i === active ? " cert-active" : ""}`}>
              <a className="cert-slide-inner" href={c.url} target="_blank" rel="noreferrer"
                 onClick={(e) => {
                   if (swipedRef.current) { e.preventDefault(); return; }   // it was a swipe, not a tap
                   if (i !== active) { e.preventDefault(); goTo(i); }       // tapping a side card brings it to the front
                 }}>
                <div className="cert-slide-img-wrap">
                  <img
                    className="cert-slide-img" src={c.img} alt={c.title}
                    onError={e => { e.target.style.display = "none"; }} />
                </div>
                <div className="cert-slide-body">
                  <div className="cert-slide-title">{c.title}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="cert-slider-controls">
          <div className="cert-ctrl-dots">
            {DATA.certs.map((_, i) => <div key={i} className={`cert-dot${i === active ? " active" : ""}`} />)}
          </div>
        </div>
      </div>
      <div className="cert-hint">
        <span className="only-mouse">click a card to view the credential</span>
        <span className="only-touch">swipe to browse, tap to open</span>
      </div>
    </>
  );
}