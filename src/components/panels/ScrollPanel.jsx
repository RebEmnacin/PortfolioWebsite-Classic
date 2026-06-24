import { FadeSection } from "../FadeSection";
import { Reveal } from "../Reveal";
import { HeroIntro } from "./HeroIntro";
import { ProjectsSection } from "../ProjectsSection";
import { CertSlider } from "../CertSlider";
import { StackSection } from "../stack/StackSection";
import { GhIco, LiIco, TgIco } from "../icons/Icons";
import { DATA } from "../../data/portfolioData";

/* ─────────────────────────────────────────────────────────────────
   SCROLL PANEL
   This is the second "page" — the long scrollable one with all the
   sections (hero, projects, certs, stack, contact).
───────────────────────────────────────────────────────────────── */
export function ScrollPanel({ goScroll, onOpenProjects, folderBtnRef, p2ImgRef, p2Visible }) {
  return (
    <div className="sp-inner">
      <FadeSection className="section-gap">
        <HeroIntro goScroll={goScroll} p2ImgRef={p2ImgRef} p2Visible={p2Visible}/>
      </FadeSection>

      <FadeSection className="section-gap">
        <div id="sec-projects"/>
        <Reveal><div className="eyebrow">Portfolio</div></Reveal>
        <Reveal delay={90}><h2 className="pg-title">Selected <em>Work</em></h2></Reveal>
        <Reveal delay={180}>
          <ProjectsSection onOpen={onOpenProjects} folderBtnRef={folderBtnRef}/>
        </Reveal>
      </FadeSection>

      <FadeSection className="section-gap">
        <div id="sec-certs"/>
        <Reveal><div className="eyebrow">Credentials</div></Reveal>
        <Reveal delay={90}><h2 className="pg-title">My <em>Certifications</em></h2></Reveal>
        <Reveal delay={180}>
          <CertSlider/>
        </Reveal>
      </FadeSection>

      <div className="section-gap">
        <div id="sec-stack"/>
        <StackSection/>
      </div>

      <FadeSection>
        <div id="sec-contact"/>
        <div className="contact-heading-wrap">
          <Reveal><div className="eyebrow">Chat me!</div></Reveal>
          <Reveal delay={90}><h2 className="pg-title">My<em> Contacts</em></h2></Reveal>
        </div>

        <div className="contact-cta">
          <Reveal delay={180}><p className="cta-label">nice working with you :D</p></Reveal>
          <Reveal delay={240}><a href={DATA.email} className="cta-email">{DATA.email.replace("mailto:","")}</a></Reveal>
          <Reveal delay={300}><p className="cta-credit">Portfolio by Reb Emnacin</p></Reveal>
          <Reveal delay={360}>
            <div className="cta-social">
              <a href={DATA.github} target="_blank" rel="noreferrer" className="soc-link"><GhIco s={13}/> GitHub</a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className="soc-link"><LiIco s={13}/> LinkedIn</a>
              <a href={DATA.telegram} target="_blank" rel="noreferrer" className="soc-link"><TgIco s={13}/> Telegram</a>
            </div>
          </Reveal>
        </div>
      </FadeSection>

      <Reveal>
        <div style={{textAlign:"center",marginTop:"80px",paddingTop:"40px"}}>
          <button className="footer-back" onClick={() => goScroll("home")}>↑ Back to Top</button>
          <div style={{fontFamily:"var(--mono)",fontSize:"8px",color:"var(--tx)",marginTop:"20px",letterSpacing:".12em",textTransform:"uppercase"}}>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
