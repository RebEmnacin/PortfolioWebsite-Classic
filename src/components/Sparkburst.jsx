import { forwardRef, useImperativeHandle, useCallback, useRef, useState } from "react";

function SparkParticle({ cx, cy, angle, radius, size, color, duration, zIndex }) {
  const x = cx + Math.cos(angle) * radius;
  const y = cy + Math.sin(angle) * radius;

  return (
    <div
      style={{
        position: "fixed",
        left: cx,
        top: cy,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        pointerEvents: "none",
        zIndex: zIndex,
        transform: `translate(-50%, -50%)`,
        animation: `sparkburst-out ${duration}ms cubic-bezier(0.2, 0, 0.8, 1) forwards`,
        "--tx": `${x - cx}px`,
        "--ty": `${y - cy}px`,
      }}
    />
  );
}

export const SparkBurst = forwardRef(function SparkBurst(
  {
    sparkColor = "#ffcb05",
    sparkCount = 14,
    sparkSize = 18,
    duration = 900,
    zIndex = 9999,
  },
  ref
) {
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);

  const trigger = useCallback(
    (cx, cy, imageRadius = 110) => {
      const id = ++idRef.current;
      const burstRadius = imageRadius + 10; // spawn just outside the border ring

      const particles = Array.from({ length: sparkCount }, (_, i) => {
        const angle = (i / sparkCount) * Math.PI * 2;
        const sizeVariance = sparkSize * (0.8 + Math.random() * 0.4);
        return { angle, size: sizeVariance };
      });

      setBursts((prev) => [...prev, { id, cx, cy, particles, burstRadius }]);

      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, duration + 100);
    },
    [sparkCount, sparkSize, duration]
  );

  useImperativeHandle(ref, () => ({ trigger }), [trigger]);

  return (
    <>
      <style>{`
        @keyframes sparkburst-out {
          0%   { transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(1);   opacity: 1; }
          50%  { opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(calc(var(--tx) * 3), calc(var(--ty) * 3)) scale(0); opacity: 0; }
        }
      `}</style>

      {bursts.map((burst) =>
        burst.particles.map((p, i) => (
          <SparkParticle
            key={`${burst.id}-${i}`}
            cx={burst.cx}
            cy={burst.cy}
            angle={p.angle}
            radius={burst.burstRadius}
            size={p.size}
            color={sparkColor}
            duration={duration}
            zIndex={zIndex}
          />
        ))
      )}
    </>
  );
});