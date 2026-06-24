import { Reveal } from "../Reveal";
import { StackRow } from "./StackRow";
import { DATA } from "../../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   STACK SECTION — big title left, plain chips right, NO boxes/lines
───────────────────────────────────────────────────────────────── */
export function StackSection() {
  return (
    <div className="stack-section-wrap">
      <div className="stack-title-col">
        <Reveal>
          <div className="stack-big-title">My<br /><em>Stack</em></div>
        </Reveal>
      </div>
      <div className="stack-rows-col">
        {Object.entries(DATA.stack).map(([cat, skills]) => (
          <StackRow key={cat} cat={cat} skills={skills} />
        ))}
      </div>
    </div>
  );
}
