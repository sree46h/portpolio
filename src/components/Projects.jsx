// src/components/Projects.jsx
import React, { useState, useEffect } from "react";
import "./Projects.css";

// 👉 Import your JSON data (adjust the path if you place it elsewhere)
import projectsData from "../data/projects.json";

function useIsDesktop(min = 1024) {
  const [match, setMatch] = useState(() => window.matchMedia(`(min-width:${min}px)`).matches);
  useEffect(() => {
    const m = window.matchMedia(`(min-width:${min}px)`);
    const onChange = () => setMatch(m.matches);
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, [min]);
  return match;
}

export default function Projects() {
  const projects = projectsData || [];
  const isDesktop = useIsDesktop(1024);
  const [index, setIndex] = useState(0);
  const count = projects.length;

  const keyed = projects.map((p, i) => ({ ...p, _k: `${p.title}-${i}` }));
  const next = () => count && setIndex((i) => (i + 1) % count);
  const prev = () => count && setIndex((i) => (i - 1 + count) % count);

  return (
    <section id="projects" className="sec">
      <h2 className="sec__title">Projects</h2>

      <div className={`proj-grid ${isDesktop ? "" : "proj-grid--mobile"}`}>
        {keyed.map((p, i) => (
          <ProjectCard
            key={p._k}
            data={p}
            active={!isDesktop && i === index}
            isDesktop={isDesktop}
          />
        ))}
      </div>

      {!isDesktop && (
        <div className="proj-controls-mobile" role="group" aria-label="Project navigation">
          <button className="icon-btn" onClick={prev} aria-label="Previous">〈</button>
          <div className="proj-index">{count ? `${index + 1} / ${count}` : "0 / 0"}</div>
          <button className="icon-btn" onClick={next} aria-label="Next">〉</button>
        </div>
      )}
    </section>
  );
}

function ProjectCard({ data, active, isDesktop }) {
  const {
    title,
    description,
    github_url,
    live_url,
    technologies = [],
    roles_and_achievements = [],
  } = data || {};

  const hasRoles = isDesktop && roles_and_achievements.length > 0;

  return (
    <article
      className={`proj-card ${active ? "active" : ""}`}
      aria-current={active ? "true" : undefined}
    >
      <header className="proj-card-head">
        <h3 className="proj-card-title">{title}</h3>
        <div className="proj-links">
          {live_url && (
            <a className="proj-link" href={live_url} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {github_url && (
            <a className="proj-link" href={github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
        </div>
      </header>

      <div className="proj-tech">
        {technologies.map((t) => (
          <span className="proj-tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="proj-info">
        <h4>Project Information</h4>
        <p>{description}</p>
      </div>

      {/* Desktop-only hover card (bottom-left) for responsibilities */}
      {hasRoles && (
        <div className="roles-pop" role="tooltip" aria-label="Roles and achievements">
          <div className="roles-pop-title">Roles & Achievements</div>
          <ul className="roles-pop-list">
            {roles_and_achievements.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
