// src/PortfolioV2.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AboutWithPhoto from "./components/AboutWithPhoto";
import SkillsBook from "./components/SkillsBook";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";

export default function PortfolioV2({ projects = [] }) {
  const initialTheme =
    typeof window !== "undefined" && localStorage.getItem("auroraTheme") === "on"
      ? "aurora"
      : "indigo";
  const [theme, setTheme] = useState(initialTheme);

  const handleAuroraChange = (isOn) => setTheme(isOn ? "aurora" : "indigo");

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const OFFSET = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
    setTimeout(() => window.scrollTo({ top, behavior: "smooth" }), 0);
  }, []);

  return (
    <div className="site" data-theme={theme}>
      <Navbar onAuroraToggle={handleAuroraChange} name="Sreeharinaidu Rangani" />

      <main id="top" className="container">
        <Hero />

        <section id="about" className="sec">
          <AboutWithPhoto />
        </section>

        <section id="skills" className="sec">
          <SkillsBook />
        </section>

        {/* ===== Experience & Education (single source of truth) ===== */}
        {/* Anchors so both navbar links (#experience and #education) land here */}
        <div id="experience" style={{ position: "relative", top: "-80px" }} />
        <div id="education" style={{ position: "relative", top: "-80px" }} />
        <section className="sec">
          <h2 className="sec__title">My Journey</h2>
          <ExperienceTimeline items={experienceItems} />
        </section>

        <Certifications />

        <Projects projects={projects} />

        <Footer />
      </main>

      <a href="#top" className="backToTop" aria-label="Back to top">↑</a>
      <ThemeStyles />
    </div>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="sec hero" aria-label="Hero">
      <div className="hero__inner">
        <div className="hero__badge">👋 Hello</div>
        <h1 className="hero__title">
          I’m <span className="accent">Sreeharinaidu Rangani</span>
          <br /> Full-Stack Developer
        </h1>
        <p className="hero__subtitle">
          I build clean, fast web apps with React, Node, and a pinch of animation.
        </p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary">View Projects</a>
          <a
            href="https://www.linkedin.com/in/sreehari-naidu/"
            className="btn btn--ghost"
            target="_blank"
            rel="noreferrer"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Certifications ---------------- */
function Certifications() {
  const certs = [
    { name: "JavaScript Foundations Professional Certificate", org: "Mozilla", year: "2024", link: "https://www.linkedin.com/learning/certificates/fc4fb7cf366760ca56d5a2cbd212dabc5577965fad4b6dfac3076423f6869469" },
    { name: "Frontend Developer (React)", org: "HackerRank", year: "2023", link: "https://www.hackerrank.com/certificates/cb949fa522ef" },
    { name: "Micro-frontends with ReactJS", org: "Udemy", year: "2022", link: "#" },
  ];
  return (
    <section id="certs" className="sec">
      <h2 className="sec__title">Certifications</h2>
      <div className="grid grid--3">
        {certs.map((c, i) => (
          <a key={i} className="card cert" href={c.link || "#"} target="_blank" rel="noreferrer">
            <div className="cert-name">{c.name}</div>
            <div className="cert-meta">{c.org} • {c.year}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer id="contact" className="sec footer">
      <div className="grid grid--3">
        <a href="mailto:sreeharinaidu27031999@gmail.com" className="btn btn--ghost">Email</a>
        <a href="https://github.com/sreeharinaidu46" target="_blank" rel="noreferrer" className="btn btn--ghost">GitHub</a>
        <a href="https://www.linkedin.com/in/sreehari-naidu/" target="_blank" rel="noreferrer" className="btn btn--ghost">LinkedIn</a>
      </div>
      <div className="muted small" style={{ textAlign: "center", marginTop: 12 }}>
        © {new Date().getFullYear()} Sreeharinaidu Rangani
      </div>
    </footer>
  );
}

/* ---------------- Experience items (logos in /public) ---------------- */
const experienceItems = [
  {
    id: "fau",
    type: "edu",
    title: "Florida Atlantic University",
    subtitle: "M.S. in Computer Science",
    period: "Aug 2023 – Apr 2025",
    logo: "/fau_logo.png",
    coursework:
      "Software Engineering, Deep Learning, Data Science, Algorithms, Security, RL, Cloud, IR, Web Analytics, IoT",
  },
  {
    id: "6d",
    type: "work",
    title: "6D Technologies",
    subtitle: "Full Stack Developer",
    period: "Nov 2021 – Aug 2023",
    logo: "/6d_tech.jpg",
    tech: ["React", "TypeScript", "Node", "Express", "SQL", "Keycloak", "AWS", "D3/Charts"],
  },
  {
    id: "cts",
    type: "work",
    title: "Cognizant Technology Solutions India Ltd.",
    subtitle: "Full Stack Developer",
    period: "Apr 2020 – Nov 2021",
    logo: "/cognizant.jpeg",
    tech: ["React", "Redux", "Node", "Express", "REST", "Docker", "Kubernetes", "AWS"],
  },
  {
    id: "groundhog",
    type: "work",
    title: "Rapidbiz Apps",
    subtitle: "MTS Intern",
    period: "Apr 2019 – Oct 2019",
    logo: "/groundhogapps_logo.jpeg",
    tech: ["React", "TypeScript", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "jntu",
    type: "edu",
    title: "Jawaharlal Nehru Technological University",
    subtitle: "B.Tech in Computer Science",
    period: "May 2016 – Apr 2020",
    logo: "/jntu.png",
    coursework:
      "C, Java, Python, DSA, Signals & Systems, Big Data, MATLAB, Embedded C, DBMS",
  },
];

/* ---------------- Styles (global shell) ---------------- */
function ThemeStyles() {
  return (
    <style>{`
* { box-sizing: border-box; }
html, body, #root, .site { height: 100%; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; }
[data-theme="indigo"]{
  --bg:#000; --card:#0a0b12; --text:#f6f7fb; --muted:#b9c1d6;
  --accent:#3730a3; --accent-2:#c4b5fd; --border:rgba(55,48,163,.38); --ring:rgba(55,48,163,.55);
}
[data-theme="aurora"]{
  --bg:#000; --card:#0b0b10; --text:#f6f7fb; --muted:#b9c1d6;
  --accent:#55ffe2; --accent-2:#7c99ff; --border:rgba(124,153,255,.35); --ring:rgba(124,153,255,.55);
}
.site { background: var(--bg); color: var(--text); }
.container { width: min(1100px, 92%); margin: 0 auto; padding: 84px 0 64px; }
.sec { margin: 36px 0; }
.sec__title { margin: 0 0 14px; font-size: 1.6rem; font-weight: 900; letter-spacing: .2px; }
.card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 16px; }
.hero { padding-top: 30px; }
.hero__inner { text-align: center; padding: 26px 0 8px; }
.hero__badge { display: inline-block; border: 1px solid var(--border); border-radius: 999px; padding: 6px 10px; color: var(--muted); }
.hero__title { margin: 14px 0 8px; font-weight: 900; line-height: 1.15; }
.accent { color: var(--accent-2); }
.hero__subtitle { color: var(--muted); margin: 0; }
.hero__cta { margin-top: 16px; display: flex; gap: 10px; justify-content: center; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 14px; border-radius: 12px; text-decoration: none; cursor: pointer; }
.btn--primary { background: var(--accent); color: black; border: 1px solid var(--accent); }
.btn--primary:hover { filter: brightness(1.1); }
.btn--ghost { border: 1px solid var(--border); color: var(--text); background: transparent; }
.btn--ghost:hover { border-color: var(--ring); }
.grid { display: grid; gap: 14px; }
.grid--2 { grid-template-columns: 1fr; }
.grid--3 { grid-template-columns: 1fr; }
@media (min-width: 900px){ .grid--2 { grid-template-columns: 1fr 1fr; } .grid--3 { grid-template-columns: repeat(3, 1fr); } }
.footer .btn { width: 100%; }
.backToTop { position: fixed; right: 16px; bottom: 16px; width: 42px; height: 42px; display:flex; align-items:center; justify-content:center; border-radius: 999px; text-decoration: none; color: black; background: var(--accent-2); border: 1px solid var(--border); }
`}</style>
  );
}
