import { Reveal } from "../Reveal";
import { SpinStar } from "../SpinStar";
import { StackBubbleField } from "./StackBubbleField";
import { DATA } from "../../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   STACK SECTION — big "MY STACK" title on the left; on the right the skills
   are split into 4 labelled groups (Frontend / Backend / Database / Tools),
   each with its own pill header and its own set of floating bubbles.
───────────────────────────────────────────────────────────────── */

// small line icons for the group headers (24x24, stroke = currentColor).
// To add a group, add its name here too — unknown names just show no icon.
const CAT_ICONS = {
  Frontend: (<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>),
  Backend:  (<><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01" /></>),
  Database: (<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>),
  Tools:    (<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />),
};

function CatIcon({ name }) {
  const shape = CAT_ICONS[name];
  if (!shape) return null;
  return (
    <svg className="stack-cat-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shape}</svg>
  );
}

export function StackSection() {
  return (
    <div className="stack-section-wrap">
      <div className="stack-title-col">
        <Reveal>
          <div className="stack-big-title">
            <SpinStar />My
            <br />
            <em>Stack</em>
          </div>
        </Reveal>
      </div>
      <div className="stack-rows-col">
        {Object.entries(DATA.stack).map(([cat, skills]) => (
          <section className="stack-cat" key={cat}>
            <Reveal>
              <div className="stack-cat-head">
                <span className="stack-cat-tag"><CatIcon name={cat} />{cat}</span>

              </div>
            </Reveal>
            <StackBubbleField items={skills.map((s) => ({ ...s, cat }))} />
          </section>
        ))}
      </div>
    </div>
  );
}