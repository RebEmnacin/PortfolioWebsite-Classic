import { useEffect, useRef, useState } from "react";
import { DATA } from "../data/portfolioData";

// A cluster of 3 blobs per card (not one) — each a different size and
// offset from center, so they overlap into an irregular cluster rather
// than reading as a single simple circle/rounded-rect.
const BLOB_LAYOUT = [
  { scale: 1.0,  dx: 0,   dy: 0,   duration: 8.5 },
  { scale: 0.68, dx: -22, dy: -16, duration: 10  },
  { scale: 0.56, dx: 24,  dy: 18,  duration: 7   },
];

/* ─────────────────────────────────────────────────────────────────
   CERT SLIDER — 3D drag, no black bg
───────────────────────────────────────────────────────────────── */
export function CertSlider() {
  const [active, setActive] = useState(0);
  const stageRef    = useRef(null);
  const outerRef    = useRef(null);
  const progressRef = useRef(0);
  const targetRef   = useRef(0);
  const wheelLock   = useRef(false);
  const rafRef      = useRef(null);
  const imgRefs     = useRef([]);
  const n = DATA.certs.length;

  // Measure each certification image's REAL rendered size, so the blob
  // behind it can be sized relative to the actual badge/document —
  // instead of a guessed fixed px value that might be way too small
  // (hiding the blob completely) or too big for a given image.
  const [imgSizes, setImgSizes] = useState({});
  useEffect(() => {
    const observers = imgRefs.current.map((img, i) => {
      if (!img) return null;
      const measure = () => {
        if (img.naturalWidth) {
          setImgSizes(prev => ({ ...prev, [i]: { w: img.clientWidth, h: img.clientHeight } }));
        }
      };
      if (img.complete) measure();
      img.addEventListener("load", measure);
      const obs = new ResizeObserver(measure);
      obs.observe(img);
      return { obs, img, measure };
    });
    return () => {
      observers.forEach(o => {
        if (!o) return;
        o.obs.disconnect();
        o.img.removeEventListener("load", o.measure);
      });
    };
  }, []);

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

  const applyTransforms = (prog) => {
    const stage = stageRef.current; if (!stage) return;
    const slides = stage.querySelectorAll(".cert-slide");
    slides.forEach((el, i) => {
      const diff = i - prog;
      const tx = diff * 52;
      const tz = -Math.abs(diff) * 160;
      const ry = diff * -20;
      const sc = 1 - Math.abs(diff) * 0.13;
      const op = Math.max(0, 1 - Math.abs(diff) * 0.38);
      const zi = Math.round(100 - Math.abs(diff) * 12);
      el.style.transform = `translate3d(${tx}%,0,${tz}px) rotateY(${ry}deg) scale(${sc})`;
      el.style.opacity = op;
      el.style.zIndex = zi;
    });
    const rounded = Math.round(Math.max(0, Math.min(n - 1, prog)));
    setActive(rounded);
  };

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

      // At the last card and still scrolling down → release control,
      // let the page scroll down normally instead of being stuck.
      if (dir === 1 && current >= n - 1) return;
      // At the first card and still scrolling up → release control,
      // let the page scroll up normally instead of being stuck.
      if (dir === -1 && current <= 0) return;

      e.preventDefault();
      e.stopPropagation();
      if (wheelLock.current) return;
      const next = Math.max(0, Math.min(n - 1, current + dir));
      if (next === current) return;
      targetRef.current = next;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 480);
    };
    // passive:false is required so preventDefault actually stops page scroll
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [n]);

  return (
    <>
      <div className="cert-slider-outer" ref={outerRef}>
        <div className="cert-slider-stage" ref={stageRef}>
          {DATA.certs.map((c, i) => (
            <div key={i} className={`cert-slide${i === active ? " cert-active" : ""}`}>
              <a className="cert-slide-inner" href={c.url} target="_blank" rel="noreferrer">
                <div className="cert-slide-img-wrap">
                  {BLOB_LAYOUT.map((b, j) => {
                    const sized = imgSizes[i];
                    const w = sized ? sized.w * 1.05 * b.scale : null;
                    const h = sized ? sized.h * 1.05 * b.scale : null;
                    return (
                      <div
                        key={j}
                        className={`cert-blob cert-blob-${c.shape === "badge" ? "badge" : "cert"}`}
                        style={
                          sized
                            ? {
                                width: w,
                                height: h,
                                left: `calc(50% + ${b.dx}px - ${w / 2}px)`,
                                top: `calc(50% + ${b.dy}px - ${h / 2}px)`,
                                animationDuration: `${b.duration}s`,
                              }
                            : undefined
                        }
                      />
                    );
                  })}
                  <img
                    ref={el => (imgRefs.current[i] = el)}
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
      <div className="cert-hint">click a card to view the credential</div>
    </>
  );
}
