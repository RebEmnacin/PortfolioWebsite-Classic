import { FadeSection } from "../FadeSection";
import { Reveal } from "../Reveal";
import { StackIcon } from "../icons/StackIcons";
import { hasStackIcon } from "../icons/stackIconPaths";

/* ─────────────────────────────────────────────────────────────────
   STACK ROW — one category (e.g. "Frontend") + its skill chips
───────────────────────────────────────────────────────────────── */
export function StackRow({ cat, skills }) {
  return (
    <FadeSection className="stack-row">
      <Reveal>
        <div className="stack-cat">{cat}</div>
      </Reveal>
      <div className="stack-items">
        {skills.map((s, i) => (
          <Reveal key={s.n} delay={(i + 1) * 90}>
            <div className="stack-chip">
              <span className="stack-sq">
                {hasStackIcon(s.n) ? (
                  <StackIcon name={s.n} style={{ width: 60, height: 60 }} />
                ) : (
                  // fallback: items without an SVG (e.g. Canva) still use their image
                  <img
                    src={s.img}
                    alt={s.n}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                )}
              </span>
              <span className="stack-name">{s.n}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </FadeSection>
  );
}