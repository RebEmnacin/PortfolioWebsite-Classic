import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   SPARKLE PARTICLE BACKGROUND (canvas, no deps)
   Mimics @tsparticles sparkle: small dots that twinkle opacity,
   move slowly, straight lines, high density
───────────────────────────────────────────────────────────────── */
export function SparkleBackground({ hide = false, dark = false }) {
  const canvasRef = useRef(null);
  // Dot colour: dark ink on the light theme, white on the dark theme.
  // Kept in a ref so switching theme doesn't restart the particles.
  const colorRef = useRef(dark ? "#ffffff" : "#111110");
  useEffect(() => { colorRef.current = dark ? "#ffffff" : "#111110"; }, [dark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, running = true;
    let w = 0, h = 0, dpr = 1;

    const COUNT = 320;
    // Each particle: x, y, vx, vy, size, opacity, opacityDir, opacitySpeed
    const ps = [];

    const rand = (a, b) => a + Math.random() * (b - a);

    const mkParticle = (forceX, forceY) => ({
      x: forceX ?? rand(0, w),
      y: forceY ?? rand(0, h),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      size: rand(0.6, 1.6),
      op: rand(0.1, 1),
      opDir: Math.random() > 0.5 ? 1 : -1,
      opSpeed: rand(0.003, 0.012),
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      ps.length = 0;
      for (let i = 0; i < COUNT; i++) ps.push(mkParticle());
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of ps) {
        // move straight
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // twinkle opacity
        p.op += p.opDir * p.opSpeed;
        if (p.op >= 1)   { p.op = 1;   p.opDir = -1; }
        if (p.op <= 0.05) { p.op = 0.05; p.opDir = 1; }

        // draw crisp dot
        ctx.globalAlpha = p.op;
        ctx.fillStyle = colorRef.current;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="sparkle-canvas"
      style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", opacity: hide ? 0 : 1, transition:"opacity 0.3s ease" }}
    />
  );
}