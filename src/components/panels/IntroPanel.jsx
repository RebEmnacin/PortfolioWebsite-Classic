import { ArrowAnimation } from "../ArrowAnimation";
import { MagBtn } from "../MagBtn";
import { MailIco, GhIco, LiIco, TgIco } from "../icons/Icons";
import { DATA } from "../../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   INTRO PANEL (landing)
───────────────────────────────────────────────────────────────── */
export function IntroPanel({ goScroll, p1ImgRef, p1Visible }) {
  return (
    <div className="p1-wrap">
      <ArrowAnimation />
      <div className="p1-left">
        <div className="p1-eyebrow">Jolts · Reb Emnacin</div>
        <h1 className="p1-title">
          <span className="p1-line1">Full Stack</span>
          <span className="p1-line2">Developer</span>
        </h1>
        <div className="p1-pills">
          <a href={DATA.email} className="p1-pill"><MailIco s={12}/> Gmail</a>
          <a href={DATA.github} target="_blank" rel="noreferrer" className="p1-pill"><GhIco s={12}/> GitHub</a>
          <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="p1-pill"><LiIco s={12}/> LinkedIn</a>
          <a href={DATA.telegram} target="_blank" rel="noreferrer" className="p1-pill"><TgIco s={12}/> Telegram</a>
        </div>
        <div className="enter-btn-wrap">
          <MagBtn onClick={() => goScroll("hero")}>Enter Portfolio</MagBtn>
        </div>
      </div>
      <div className="profile-seam" ref={p1ImgRef} />
      <div className="scroll-cue"><span className="scroll-cue-line"/>Scroll</div>
    </div>
  );
}
