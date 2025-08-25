import React, { useEffect, useState } from "react";
import "./Navbar.css";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certs", label: "Certifications" },
  { id: "projects", label: "Projects" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const OFFSET = 80;
  const top = el.getBoundingClientRect().top + window.pageYOffset - OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function NavBar({
  name = "Sreeharinaidu Ranganu",
  onAuroraToggle, // expects (isOn:boolean) => void
}) {
  const [open, setOpen] = useState(false);

  const initials = name
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .slice(0, 2)
    .join("");

  // Persisted switch state (no direct DOM class changes here)
  const [aurora, setAurora] = useState(() => localStorage.getItem("auroraTheme") === "on");

  // Sync to storage and inform parent
  useEffect(() => {
    localStorage.setItem("auroraTheme", aurora ? "on" : "off");
    onAuroraToggle?.(aurora);
  }, [aurora, onAuroraToggle]);

  // Handle deep link on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => scrollToId(id), 0);
    }
  }, []);

  const handleLinkClick = (id) => {
    setOpen(false);
    scrollToId(id);
    if (window?.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  // Keep resume file in /public
  const resumeHref = `${process.env.PUBLIC_URL}/sreehari_resume.pdf`;

  return (
    <header className="nav-wrap">
      <div className="nav-inner">
        {/* Left: logo + name */}
        <button
          type="button"
          className="brand"
          onClick={() => handleLinkClick("about")}
          aria-label="Go to top"
        >
          <span className="brand-logo">{initials}</span>
          <span className="brand-name">{name}</span>
        </button>

        {/* Desktop links */}
        <nav className="links">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              className="link"
              onClick={() => handleLinkClick(l.id)}
            >
              {l.label}
            </button>
          ))}

          {/* Resume styled like the other links */}
          <a className="link" href={resumeHref} download>
            Resume
          </a>

          {/* Aurora switch */}
          <button
            type="button"
            className={`link toggle ${aurora ? "on" : ""}`}
            onClick={() => setAurora((v) => !v)}
            aria-pressed={aurora}
            title="Toggle Aurora theme"
          >
            Aurora
          </button>
        </nav>

        {/* Burger (mobile) */}
        <button
          type="button"
          className={`burger ${open ? "open" : ""}`}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div id="mobile-menu" className={`dropdown ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <button
            key={l.id}
            type="button"
            className="dd-link"
            onClick={() => handleLinkClick(l.id)}
          >
            {l.label}
          </button>
        ))}

        <a className="dd-link" href={resumeHref} download onClick={() => setOpen(false)}>
          Resume
        </a>

        <button
          type="button"
          className="dd-link"
          onClick={() => {
            setAurora((v) => !v);
            setOpen(false);
          }}
        >
          {aurora ? "Aurora: On" : "Aurora: Off"}
        </button>
      </div>
    </header>
  );
}
