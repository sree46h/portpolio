// src/components/SkillsBook.jsx
import React, { useCallback, useEffect, useState } from "react";

/** ---------------- PAGES ---------------- */
const PAGES = [
  {
    title: "Programming Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "C", "C++", "R", "SQL"],
  },
  {
    title: "Web & Frameworks",
    items: [
      "React.js",
      "Redux",
      "React Router v6",
      "Next.js",
      "Node.js",
      "Express.js",
      "React Hooks",
      "Material UI",
      "jQuery",
      "JSON",
      "Kafka",
      "React Native",
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      "Docker",
      "Kubernetes",
      "Azure",
      "AWS",
      "Git",
      "GitLab CI/CD",
      "Postman",
      "Swagger",
      "Keycloak",
      "Linux CLI",
      "Babel",
      "Webpack",
      "Vite.js",
      "VS Code",
      "Jira",
    ],
  },
  {
    title: "Databases & QA",
    items: ["SQL", "MongoDB", "MySQL", "Dynatrace", "Cypress", "Jest", "LoadRunner", "Agile", "Scrum"],
  },
];

export default function SkillsBook() {
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState(false);   // animation lock
  const [dir, setDir] = useState("next");          // 'next' | 'prev'
  const isMobile = useIsMobile(820);

  // Intro cover (desktop only)
  const [showCover, setShowCover] = useState(() => !isMobile);
  const [coverTurning, setCoverTurning] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowCover(false);
      setCoverTurning(false);
    }
  }, [isMobile]);

  const total = PAGES.length;
  const current = PAGES[page];
  const nextIndex = (page + 1) % total;
  const prevIndex = (page - 1 + total) % total;
  const nextPage = PAGES[nextIndex];
  const prevPage = PAGES[prevIndex];

  /** ---------- Navigation ---------- */
  const next = useCallback(() => {
    if (turning) return;
    setDir("next");
    setTurning(true);
    setTimeout(() => {
      setPage((p) => (p + 1) % total);
      setTurning(false);
    }, 620); // ~600ms + cushion; keep in sync with CSS --turn-duration
  }, [turning, total]);

  const prev = useCallback(() => {
    if (turning) return;
    setDir("prev");
    setTurning(true);
    setTimeout(() => {
      setPage((p) => (p - 1 + total) % total);
      setTurning(false);
    }, 620);
  }, [turning, total]);

  // Desktop keyboard (when not on cover)
  useEffect(() => {
    if (isMobile || showCover) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile, showCover, next, prev]);

  /** ---------- Cover (desktop) ---------- */
  if (!isMobile && showCover) {
    return (
      <section aria-label="Skills">
        <h2 className="sec__title">Skills</h2>

        <div className={`start-wrap ${coverTurning ? "turn" : ""}`}>
          <button
            type="button"
            className="start-cover"
            onClick={() => {
              setCoverTurning(true);
              setTimeout(() => {
                setShowCover(false);
                setCoverTurning(false);
              }, 620);
            }}
            aria-label="Open skills book"
            title="Click to open"
          >
            <div className="start-cover-page">
              <div className="start-title">MY SKILLS</div>
              <div className="hand-hint" aria-hidden>
                👆 Click to open
              </div>
            </div>
          </button>
        </div>

        <Styles />
      </section>
    );
  }

  /** ---------- Mobile (simple list + arrows) ---------- */
  if (isMobile) {
    return (
      <section aria-label="Skills">
        <h2 className="sec__title">Skills</h2>
        <div className="sb-mobile card">
          <div className="sb-m-title">{current.title}</div>
          <div className="sb-pills">
            {current.items.map((t) => (
              <span key={t} className="sb-pill">
                {t}
              </span>
            ))}
          </div>
          <div className="sb-pager">
            <button type="button" className="sb-nav" onClick={prev} aria-label="Previous">
              ‹
            </button>
            <div className="sb-page">
              {page + 1} / {total}
            </div>
            <button type="button" className="sb-nav" onClick={next} aria-label="Next">
              ›
            </button>
          </div>
        </div>
        <Styles />
      </section>
    );
  }

  /** ---------- Desktop (book with full-sheet turn) ---------- */

  // Build the faces (no hooks used; just pure variables)
  // For LEFT→RIGHT 'next' turn:
  //   - FRONT = current LEFT page (mini)
  //   - BACK  = next RIGHT page (full)
  // For RIGHT→LEFT 'prev' turn:
  //   - FRONT = current RIGHT page (full)
  //   - BACK  = prev LEFT page (mini)
  const sheetFront =
    dir === "next" ? (
      <div className="page page--left">
        <div className="mini-title">{current.title}</div>
        <div className="mini-grid">
          {current.items.slice(0, 8).map((t) => (
            <span key={t} className="mini-chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <div className="page page--right">
        <h3 className="page-title">{current.title}</h3>
        <div className="chip-grid">
          {current.items.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    );

  const sheetBack =
    dir === "next" ? (
      <div className="page page--right">
        <h3 className="page-title">{nextPage.title}</h3>
        <div className="chip-grid">
          {nextPage.items.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <div className="page page--left">
        <div className="mini-title">{prevPage.title}</div>
        <div className="mini-grid">
          {prevPage.items.slice(0, 8).map((t) => (
            <span key={t} className="mini-chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    );

  // Left base panel (cover on page 0; else previous mini page)
  const leftBase =
    page === 0 ? (
      <div className="cover">
        <div className="cover-glow" />
        <div className="cover-title cover-small">MY SKILLS</div>
        <div className="cover-hint">Click page to flip</div>
      </div>
    ) : (
      <div className="inner-left">
        <div className="inner-seam" aria-hidden />
        <div className="mini-page">
          <div className="mini-title">{prevPage.title}</div>
          <div className="mini-grid">
            {prevPage.items.slice(0, 8).map((t) => (
              <span key={t} className="mini-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <section aria-label="Skills">
      <h2 className="sec__title">Skills</h2>

      <div className={`book ${turning ? "is-turning" : ""}`}>
        {/* LEFT (previous or cover) */}
        <div className={`pane left ${page === 0 ? "is-cover" : "is-inner"}`}>{leftBase}</div>

        {/* RIGHT (current, clickable surface) */}
        <button
          type="button"
          className="pane right"
          onClick={next}
          aria-label="Next skills page"
          title="Click page to flip"
        >
          <div className="active-page">
            <h3 className="page-title">{current.title}</h3>
            <div className="chip-grid">
              {current.items.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button
              type="button"
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              title="Previous"
            >
              ‹
            </button>
            <div className="page-count">
              {page + 1} / {total}
            </div>
            <button
              type="button"
              className="nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              title="Next"
            >
              ›
            </button>
          </div>

          {/* FULL-SHEET OVERLAY */}
          {turning && (
            <div className={`sheet ${dir === "next" ? "to-right" : "to-left"}`}>
              <div className="face front">{sheetFront}</div>
              <div className="face back">{sheetBack}</div>
            </div>
          )}
        </button>
      </div>

      <Styles />
    </section>
  );
}

/* ---------------- hooks ---------------- */
function useIsMobile(bp = 820) {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(`(max-width:${bp}px)`).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const handler = () => setMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [bp]);
  return mobile;
}

/* ---------------- styles ---------------- */
function Styles() {
  return (
    <style>{`
:root{
  --panel:#0f1320;
  --panel-2:#0c101a;
  --card:var(--panel);
  --border: rgba(124,153,255,.25);
  --chip-br: rgba(124,153,255,.28);
  --chip-bg: rgba(124,153,255,.10);
  --text:#e9eefc;
  --muted:#a9b1c7;

  --turn-duration: .60s; /* animation time (keep in sync with JS timeouts) */
}

/* Section title spacing */
.sec__title{ margin-bottom: 12px; }

/* ---------- INTRO COVER (desktop) ---------- */
.start-wrap{
  position: relative;
  display: grid;
  place-items: center;
  height: 460px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--panel), var(--panel-2));
  box-shadow: 0 10px 40px rgba(2,6,23,.6) inset, 0 40px 80px rgba(0,0,0,.25);
  overflow: hidden;
}
.start-cover{
  position: relative;
  width: min(560px, 92vw);
  height: 420px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: #226fa1;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  cursor: pointer;
  transform-style: preserve-3d;
}
.start-cover-page{
  width:100%; height:100%;
  display:grid; place-items:center; position:relative;
}
.start-title{
  font-size: clamp(28px, 6vw, 56px);
  font-weight: 900; color: #ffb256; letter-spacing: 2px;
  text-shadow: 0 4px 12px rgba(0,0,0,.35);
}
.hand-hint{
  position: absolute; bottom: 18px; right: 18px;
  color: #e7f3ff; font-weight: 700; font-size: 14px;
  animation: handPulse 1.6s ease-in-out infinite;
}
@keyframes handPulse {
  0%,100% { transform: translateY(0); opacity: .9; }
  50%     { transform: translateY(-4px); opacity: 1; }
}
.start-wrap.turn .start-cover{
  animation: startFlip var(--turn-duration) ease forwards;
  transform-origin: right center;
}
@keyframes startFlip{
  from{ transform: rotateY(0); }
  to  { transform: rotateY(-180deg); }
}

/* ---------- BOOK LAYOUT (desktop) ---------- */
.book{
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 18px;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: linear-gradient(180deg, var(--panel), var(--panel-2));
  box-shadow: 0 10px 40px rgba(2,6,23,.6) inset, 0 40px 80px rgba(0,0,0,.25);
  overflow: hidden;
}

/* Panels */
.pane{
  border:1px solid var(--border);
  border-radius:16px;
  background:#0c111c;
  min-height: 420px;
  position: relative;
  overflow: hidden;
}
.pane.right{
  background:#0d1220;
  text-align:left;
  cursor:pointer;
}
.active-page{ padding: clamp(16px, 2.5vw, 26px); min-height: 420px; }

/* Cover (left, page 0) */
.is-cover{
  display:grid; place-items:center;
  background:
    radial-gradient(120% 130% at 0% 100%, rgba(27,96,152,.25), transparent 60%),
    radial-gradient(80% 120% at 100% 0%, rgba(14,78,121,.18), transparent 55%),
    #226fa1;
}
.cover{ position:relative; width:100%; height:100%; display:grid; place-items:center; }
.cover-glow{ position:absolute; inset:-10%; background: radial-gradient(50% 50% at 50% 60%, rgba(255,255,255,.16), transparent 60%); filter: blur(40px); }
.cover-title{ font-weight: 900; letter-spacing: 6px; color: #ffb256; text-shadow: 0 6px 18px rgba(0,0,0,.35); }
.cover-small{ font-size: clamp(28px, 5.4vw, 64px); }
.cover-hint{ position:absolute; left:18px; top:16px; color:#e7f3ff; opacity:.9; font-weight:600; }

/* Inner left page (mini preview of previous) */
.is-inner{ background: #0b0f1a; }
.inner-left{ width:100%; height:100%; position:relative; }
.inner-seam{ position:absolute; left:50%; top:0; bottom:0; width:1px; background: rgba(255,255,255,.12); }
.mini-page{ padding: 18px; height:100%; display:grid; grid-template-rows: auto 1fr; gap: 12px; }
.mini-title{ color: var(--text); font-size: 18px; font-weight: 800; }
.mini-grid{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; align-content:start; }
.mini-chip{
  font-size: 12px; color: var(--text); padding: 8px 10px;
  border: 1px solid var(--chip-br); border-radius: 999px; background: var(--chip-bg);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Right page content */
.page-title{ margin: 0 0 18px; color: var(--text); font-weight: 900; letter-spacing: .3px; font-size: clamp(20px, 2.6vw, 36px); }
.chip-grid{ display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; }
@media (min-width: 1200px){ .chip-grid{ grid-template-columns: repeat(4, minmax(0,1fr)); } }
.chip{
  color: var(--text); font-weight: 600; padding: 12px 14px; border-radius: 999px;
  border: 1px solid var(--chip-br);
  background: linear-gradient(180deg, rgba(123,131,255,.08), rgba(123,131,255,.03));
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Controls */
.controls{
  position:absolute; right:14px; bottom:14px; display:flex; align-items:center; gap:10px;
  background: rgba(10,10,14,.45); border:1px solid var(--border); padding:8px 10px; border-radius:14px;
}
.nav-btn{
  width:44px; height:44px; border-radius:12px; border:1px solid var(--chip-br);
  background: var(--chip-bg); color:var(--text); font-size:24px; line-height:1; display:grid; place-items:center;
}
.page-count{ color:var(--muted); font-weight:600; min-width:70px; text-align:center; }

/* ---------- FULL SHEET OVERLAY ---------- */
.sheet{
  position: absolute;
  inset: 16px;                  /* match book padding to sit inside borders */
  border-radius: 14px;
  pointer-events: none;
  transform-style: preserve-3d;
  will-change: transform;
}
.face{
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: #0d1220;
  border: 1px solid var(--border);
  backface-visibility: hidden;
  overflow: hidden;
}
.face.back{ transform: rotateY(180deg); }

/* page inner layouts reused on faces */
.page{ width:100%; height:100%; }
.page--right{ padding: clamp(16px, 2.5vw, 26px); }
.page--left{ padding: 18px; display:grid; grid-template-rows: auto 1fr; gap: 12px; }
.page--left .mini-title{ font-size: 18px; font-weight: 800; }
.page--left .mini-grid{ display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
.page--left .mini-chip{
  font-size: 12px; color: var(--text); padding: 8px 10px; border: 1px solid var(--chip-br);
  border-radius: 999px; background: var(--chip-bg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* LEFT→RIGHT (next) */
.sheet.to-right{
  transform-origin: left center;
  animation: turnToRight var(--turn-duration) ease forwards;
}
@keyframes turnToRight{
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(180deg); }
}

/* RIGHT→LEFT (prev) */
.sheet.to-left{
  transform-origin: right center;
  animation: turnToLeft var(--turn-duration) ease forwards;
}
@keyframes turnToLeft{
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(-180deg); }
}

/* ---------- MOBILE ---------- */
.card{
  background: var(--panel);
  border:1px solid var(--border);
  border-radius:18px;
  padding:18px;
  position:relative;
  box-shadow: 0 14px 40px rgba(0,0,0,.35);
}
.sb-mobile{ padding-bottom:58px; }
.sb-m-title{ font-size:1.35rem; font-weight:900; margin-bottom:12px; }
.sb-pills{ display:flex; flex-wrap:wrap; gap:12px; }
.sb-pill{
  border:1px solid var(--chip-br); background: var(--chip-bg); color:var(--text);
  padding:10px 14px; border-radius:999px; font-size:.95rem; line-height:1; max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.sb-pager{
  position: static; margin-top:14px; display:flex; gap:10px; align-items:center; justify-content:center;
  background: transparent; border: 1px solid var(--border); padding: 8px 10px; border-radius: 14px;
}
.sb-nav{ width:38px; height:38px; border-radius:12px; display:grid; place-items:center; background: var(--chip-bg); color:var(--text); border:1px solid var(--border); }
.sb-page{ color: var(--muted); min-width: 64px; text-align:center; }

/* Accessibility focus rings */
.pane.right:focus-visible, .nav-btn:focus-visible, .start-cover:focus-visible{
  outline: 2px solid rgba(124,153,255,.55);
  outline-offset: 2px;
}
`}</style>
  );
}
