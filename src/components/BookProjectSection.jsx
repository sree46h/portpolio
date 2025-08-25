import React, { useEffect, useMemo, useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import projectsData from "../data/projects.json";
import "./BookProjectSection.css";

// Hook: true on >=1024px, false otherwise
function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth >= breakpoint
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener?.("change", update);
    // Fallback for older browsers
    mql.addListener?.(update);
    return () => {
      mql.removeEventListener?.("change", update);
      mql.removeListener?.(update);
    };
  }, [breakpoint]);

  return isDesktop;
}

export default function BookProjectSection({ projects = projectsData }) {
  // Mobile-only index (book style)
  const [index, setIndex] = useState(0);
  const count = projects?.length ?? 0;
  const isDesktop = useIsDesktop(1024);

  const handleNext = () => count && setIndex((i) => (i + 1) % count);
  const handlePrev = () => count && setIndex((i) => (i - 1 + count) % count);

  const keyed = useMemo(
    () => (projects || []).map((p, i) => ({ ...p, _k: `${p.title}-${i}` })),
    [projects]
  );

  return (
    <section className="proj-section" aria-label="Projects">
      <div className="proj-header">
        <h2 className="proj-title">
           Projects
        </h2>
      </div>

      {/* Render all cards.
          CSS:
            - Mobile: only .active shows (book style).
            - Desktop: 2-column grid shows all. */}
      <div className="proj-grid">
        {keyed.map((p, i) => (
          <ProjectCard
            key={p._k}
            data={p}
            active={i === index}
            isDesktop={isDesktop}
          />
        ))}
      </div>

      {/* Mobile-only arrows below the single visible card */}
      {!isDesktop && (
        <div
          className="proj-controls-mobile"
          role="group"
          aria-label="Project navigation"
        >
          <button className="icon-btn" onClick={handlePrev} aria-label="Previous project">
            <Icon name="chevron left" />
          </button>
          <div className="proj-index" aria-live="polite">
            {count ? `${index + 1} / ${count}` : "0 / 0"}
          </div>
          <button className="icon-btn" onClick={handleNext} aria-label="Next project">
            <Icon name="chevron right" />
          </button>
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

  const body = (
    <article
      className={`proj-card ${active ? "active" : ""}`}
      aria-current={active ? "true" : undefined}
    >
      <header className="proj-card-head">
        <h3 className="proj-card-title">{title}</h3>
        <div className="proj-links">
          {live_url && (
            <a className="proj-link" href={live_url} target="_blank" rel="noreferrer">
              <Icon name="external" /> Live
            </a>
          )}
          {github_url && (
            <a className="proj-link" href={github_url} target="_blank" rel="noreferrer">
              <Icon name="github" /> GitHub
            </a>
          )}
        </div>
      </header>

      <div className="proj-tech">
        {technologies.map((t) => (
          <span className="proj-tag" key={t}>
            {t}
          </span>
        ))}
      </div>

      <div className="proj-info">
        <h4>Project Information</h4>
        <p>{description}</p>
      </div>
    </article>
  );

  // Important change: only render the Popup on desktop.
  if (isDesktop && roles_and_achievements.length) {
    return (
      <Popup
        hoverable
        position="right center"
        className="roles-popup"
        trigger={body}
        content={
          <div className="roles-popup-content">
            <div className="roles-popup-title">
              <Icon name="trophy" /> Roles & Achievements
            </div>
            <ul>
              {roles_and_achievements.map((r) => (
                <li key={r} className="truncate">
                  {r}
                </li>
              ))}
            </ul>
            <div className="roles-hint">Hover to hold • Click outside to close</div>
          </div>
        }
      />
    );
  }

  // Mobile or no roles: just the card (no popup to ever appear).
  return body;
}
