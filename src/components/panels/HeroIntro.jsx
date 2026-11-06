import { Reveal } from "../Reveal";
import { ZapIco } from "../icons/Icons";
import { DATA } from "../../data/portfolioData";

export function HeroIntro({ goScroll, p2ImgRef, p2Visible }) {
  return (
    <div className="hero2-wrap" id="sec-hero">
      <div className="hero2-photo">
        <img
          src="/assets/Reb.jpg"
          alt="Reb Emnacin"
          ref={p2ImgRef}
          style={{
            opacity: p2Visible ? 1 : 0,
transform: p2Visible ? "scale(1)" : "scale(0)",
transition: p2Visible ? "opacity 0.08s ease, transform 0.18s cubic-bezier(0.34, 2.0, 0.64, 1)" : "none",
            transformOrigin: "center center",
          }}
        />
      </div>
      <div className="hero2-text">
        <Reveal><div className="fsd-badge"><ZapIco s={11}/> Full Stack Developer</div></Reveal>
        <Reveal delay={120}><h1 className="hero2-name">Hi, I'm <em>Reb</em></h1></Reveal>
        <Reveal delay={180}><p className="hero-bio">{DATA.bio}</p></Reveal>
      </div>
    </div>
  );
}