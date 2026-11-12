import { BreadIco, BarIco, UserIco } from "../components/icons/Icons";

/* ─────────────────────────────────────────────────────────────────
   DATA
   All the "content" of the site lives here. Edit this file to
   change text, links, stack icons, certs, or projects — no need
   to touch any component.
───────────────────────────────────────────────────────────────── */
export const DATA = {
  name: "Reb Emnacin", aka: "Jolts",
  bio: "CS student at New Era University. Builder of things that spark ideas — small tools, dashboards, and apps that don't exist yet but probably should.",
  github: "https://github.com/RebEmnacin",
  linkedin: "https://www.linkedin.com/in/reb-emnacin-a9752b404/",
  telegram: "https://t.me/Emunashin",
  email: "mailto:rebqemnacin@gmail.com",
  school: "New Era University", degree: "BS Computer Science", year: "2024–present",

  // Stack icons are now inline SVGs (see components/icons/StackIcons.jsx), matched
  // by the "n" name. The old PNG paths are kept below as comments.
  stack: {
    Frontend: [
      { n: "React",      /* img: "/assets/StackIcons/React.png" */ },
      { n: "JavaScript", /* img: "/assets/StackIcons/Javascript.png" */ },
      { n: "TypeScript", /* img: "/assets/StackIcons/Typescript.png" */ },
      { n: "HTML",       /* img: "/assets/StackIcons/HTML.png" */ },
      { n: "CSS",        /* img: "/assets/StackIcons/CSS.png" */ },
    ],
    Backend: [
      { n: "Node.js",    /* img: "/assets/StackIcons/NodeJS.png" */ },
      { n: "Python",     /* img: "/assets/StackIcons/Python.png" */ },
      { n: "Java",       /* img: "/assets/StackIcons/Java.png" */ },
    ],
    Database: [
      { n: "MySQL",      /* img: "/assets/StackIcons/MySQL.png" */ },
      { n: "PostgreSQL", },
      { n: "NeonDB",     },
      { n: "Supabase",   },
    ],
    Tools: [
      { n: "Git",        /* img: "/assets/StackIcons/Git.png" */ },
      { n: "Github",     /* img: "/assets/StackIcons/Github.png" */ },
    ],
  },

  certs: [
    { title: "Fullstack Development",                                            img: "/assets/certs/Fullstack Development.png",                                            url: "https://www.coursera.org/account/accomplishments/specialization/certificate/TL4N9OQR4BUN" },
    { title: "Crash Course on Python",                                            img: "/assets/certs/Crash Course on Python.png",                                            url: "https://coursera.org/share/c54dbdbd3ba28849595bef83be80e08a" },
    { title: "SQL and Relational Databases 101",                                   img: "/assets/certs/SQL and Relational Databases 101.png",                                   url: "https://courses.cognitiveclass.ai/certificates/248159af4c5846d4ab620d5e39948f5e" },
    { title: "Foundations of Cybersecurity",                                       img: "/assets/certs/Foundations of Cybersecurity.png",                                       url: "https://coursera.org/share/bf02a0d1151dce68219565387559a6ed" },
    { title: "AI Foundations Associate",                                           img: "/assets/certs/AI Foundations Associate.png",                                           url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=71CC11DCFE431802B2DE719C81F52F2AF2478ABAB7563607DBE6DB72E5B607C0", shape: "badge" },
    { title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",   img: "/assets/certs/Oracle Cloud Infrastructure 2025 Certified Foundations Associate.png", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6941EF3CB5EB7C0833D64EF5BF8A257C21D53C11A362E7DD0DAB73518C59AF58", shape: "badge" },
    { title: "Oracle Data Platform 2025 Certified Foundations Associate",          img: "/assets/certs/Oracle Data Platform 2025 Certified Foundations Associate.png",          url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FC6BF38C8A976E45FFE6F233D652B85BF2EF4C7AEBBE068491AA129A001DBC33", shape: "badge" },
  ],

  projects: [
    { I: BarIco,   n: "CashWell",         logo: "/assets/projects/cashwell.png", logoBg: "#1f2937", d: "Personal finance tracker that shows you where your money goes. Log income and expenses, set monthly budgets per category, and watch the dashboard update as you go.", tags: ["React","TypeScript","FastAPI","PostgreSQL"], url: "https://github.com/RebEmnacin/CashWell" },
    { I: UserIco,  n: "HireRise",         logo: "/assets/projects/hirerise.png", logoBg: "#ffffff", d: "HR management website built for a company’s HR team. Track employee status, workload, and attendance, and keep every record organized in one dashboard.",      tags: ["Vue 3","Vite","JavaScript","CSS"],           url: "https://github.com/RebEmnacin/HireRise" },
    { I: BreadIco, n: "breadcrumber",     logo: "/assets/projects/breadcrumber.png", logoBg: "#fff3d6", d: "AI-powered roadmap builder for creatives. ADHD-friendly project manager that breaks goals into bite-sized, achievable steps.",                                          tags: ["React","FastAPI","Gemini AI","Python"],      url: "https://github.com/RebEmnacin/breadcrumber-app" },
  ],
};