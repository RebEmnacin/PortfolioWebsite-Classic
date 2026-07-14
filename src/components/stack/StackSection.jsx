import { Reveal } from "../Reveal";
import { StackBubbleField } from "./StackBubbleField";
import { DATA } from "../../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   STACK SECTION — big title left, icons floating inside randomized
   bubbles on the right (no more plain chip list)
───────────────────────────────────────────────────────────────── */
export function StackSection() {
  // flatMap = takes every category's skill list and merges them into
  // ONE single flat array, so all icons can float freely together
  // instead of being grouped by category row.
  const items = Object.entries(DATA.stack).flatMap(([cat, skills]) =>
    skills.map((s) => ({ ...s, cat }))
  );

  return (
    <div className="stack-section-wrap">
      <div className="stack-title-col">
        <Reveal>
          <div className="stack-big-title">
            My
            <br />
            <em>Stack</em>
          </div>
        </Reveal>
      </div>
      <div className="stack-rows-col">
        <StackBubbleField items={items} />
      </div>
    </div>
  );
}