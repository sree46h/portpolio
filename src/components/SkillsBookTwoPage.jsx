import React, { useState } from "react";
import "./SkillsBookTwoPage.css";

/** Two-page Skills book: left cover + right flipping page */
export default function SkillsBookTwoPage() {
  const pages = [
    {
      title: "Programming Languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C", "C++", "R", "SQL"],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        "React.js · Hooks", "Redux", "React Router v6", "Next.js",
        "Node.js", "Express.js", "Kafka", "React Native",
        "Material UI", "jQuery", "JSON", "Data Structures"
      ],
    },
    {
      title: "Cloud & Databases",
      items: ["Azure", "Docker", "Kubernetes", "MongoDB", "MySQL", "SQL"],
    },
    {
      title: "Tools & Platforms",
      items: [
        "Git · GitLab CI/CD", "Postman · Swagger", "Keycloak · Linux CLI",
        "Babel · Webpack · Vite.js", "MySQL Workbench · VS Code · Jira",
        "Cypress · Jest · Dynatrace · LoadRunner", "Agile · Scrum"
      ],
    },
  ];

  const [i, setI] = useState(0);
  const next = () => setI(v => (v + 1) % pages.length);
  const prev = () => setI(v => (v - 1 + pages.length) % pages.length);

  return (
    <section id="skills" className="sec">
      <h2 className="sec__title">Skills</h2>
      <div className="book">
        {/* Left cover */}
        <div className="book__left" aria-hidden="true">
          <div className="cover">
            <div className="cover__label">SKILLS</div>
          </div>
        </div>

        {/* Right page (click to flip) */}
        <div className="book__right">
          <article
            className="page flip-once"
            onClick={next}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && next()}
            aria-label="Next page"
          >
            <header className="page__head">
              <div className="page__title">{pages[i].title}</div>
              <div className="page__count">{i + 1} / {pages.length}</div>
            </header>

            <ul className="page__grid">
              {pages[i].items.map((t) => (
                <li className="pill" key={t} title={t}>
                  <span className="truncate">{t}</span>
                </li>
              ))}
            </ul>

            <div className="page__nav">
              <button className="icon-btn" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">〈</button>
              <span className="hint">Click page to flip</span>
              <button className="icon-btn" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">〉</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
