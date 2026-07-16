import { BreadIco, GlobeIco } from "../components/icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   DATA
   All the "content" of the site lives here. Edit this file to
   change text, links, stack icons, certs, or projects — no need
   to touch any component.
───────────────────────────────────────────────────────────────── */
export const DATA = {
  name: "Reb Emnacin", aka: "Jolts",
  bio: "CS student at New Era University. Builder of things that spark ideas — small tools, dashboards, and apps that don't exist yet but probably should.",
  status: "Open to Opportunities",
  github: "https://github.com/RebEmnacin",
  linkedin: "https://www.linkedin.com/in/reb-emnacin-a9752b404/",
  telegram: "https://t.me/Emunashin",
  email: "mailto:rebqemnacin@gmail.com",
  school: "New Era University", degree: "BS Computer Science", year: "2024–present",

  stack: {
    Frontend: [
      { n: "React",      img: "/src/assets/StackIcons/React.png" },
      { n: "JavaScript", img: "/src/assets/StackIcons/Javascript.png" },
      { n: "TypeScript", img: "/src/assets/StackIcons/Typescript.png" },
      { n: "HTML",       img: "/src/assets/StackIcons/HTML.png" },
      { n: "CSS",        img: "/src/assets/StackIcons/CSS.png" },
    ],
    Backend: [
      { n: "Node.js",    img: "/src/assets/StackIcons/NodeJS.png" },
      { n: "Python",     img: "/src/assets/StackIcons/Python.png" },
      { n: "Java",       img: "/src/assets/StackIcons/Java.png" },
    ],
    Database: [
      { n: "MySQL",      img: "/src/assets/StackIcons/MySQL.png" },
    ],
    Tools: [
      { n: "Figma",      img: "/src/assets/StackIcons/Figma.png" },
      { n: "Canva",      img: "/src/assets/StackIcons/Canva.png" },
      { n: "Git",        img: "/src/assets/StackIcons/Git.png" },
      { n: "Github",     img: "/src/assets/StackIcons/Github.png" },
    ],
  },

  certs: [
    { title: "Fullstack Development",                                            img: "/src/assets/certs/Fullstack Development.png",                                            url: "https://www.coursera.org/account/accomplishments/specialization/certificate/TL4N9OQR4BUN" },
    { title: "Crash Course on Python",                                            img: "/src/assets/certs/Crash Course on Python.png",                                            url: "https://coursera.org/share/c54dbdbd3ba28849595bef83be80e08a" },
    { title: "SQL and Relational Databases 101",                                   img: "/src/assets/certs/SQL and Relational Databases 101.png",                                   url: "https://courses.cognitiveclass.ai/certificates/248159af4c5846d4ab620d5e39948f5e" },
    { title: "Foundations of Cybersecurity",                                       img: "/src/assets/certs/Foundations of Cybersecurity.png",                                       url: "https://coursera.org/share/bf02a0d1151dce68219565387559a6ed" },
    { title: "AI Foundations Associate",                                           img: "/src/assets/certs/AI Foundations Associate.png",                                           url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=71CC11DCFE431802B2DE719C81F52F2AF2478ABAB7563607DBE6DB72E5B607C0", shape: "badge" },
    { title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",   img: "/src/assets/certs/Oracle Cloud Infrastructure 2025 Certified Foundations Associate.png", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6941EF3CB5EB7C0833D64EF5BF8A257C21D53C11A362E7DD0DAB73518C59AF58", shape: "badge" },
    { title: "Oracle Data Platform 2025 Certified Foundations Associate",          img: "/src/assets/certs/Oracle Data Platform 2025 Certified Foundations Associate.png",          url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC6BF38C8A976E45FFE6F233D652B85BF2EF4C7AEBBE068491AA129A001DBC33", shape: "badge" },
  ],

  projects: [
    { I: BreadIco, n: "breadcrumber",     d: "AI-powered roadmap builder for creatives. ADHD-friendly project manager that breaks goals into bite-sized, achievable steps.", tags: ["React","FastAPI","Gemini AI","Python"], url: "https://github.com/RebEmnacin/breadcrumber-app" },
    { I: GlobeIco, n: "Portfolio Website", d: "This very portfolio — built with pure HTML/CSS/JS then re-imagined in React.",                                               tags: ["HTML","CSS","JS","React"],              url: "https://github.com/RebEmnacin" },
  ],
};
