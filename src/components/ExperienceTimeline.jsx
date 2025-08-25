import React, { useState, useEffect } from "react";
import "./ExperienceTimeline.css";

/**
 * Flip-card timeline
 * - Desktop: hover/focus flips. Click toggles on mobile-sized UIs.
 * - Mobile: cards are always-open (CSS `.always-open`), with a larger layout,
 *           and the back face shows logo + title + period at the top.
 */

export default function ExperienceTimeline({ items = demoItems }) {
  const isMobile = useIsMobile(900);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    if (isMobile) setOpenId(null); // tapping not needed on mobile (always-open)
  }, [isMobile]);

  return (
    <section id="timeline" className="sec">
    <p style={{display:'flex',justifyContent:'center',fontStyle:'italic',fontSize:'1rem'}}>Driven by curiosity, guided by purpose</p>

      <div className="tl">
        <div className="tl__rail" aria-hidden />
        
        {items.map((item, i) => {
          const side = i % 2 ? "right" : "left";
          const isOpen = openId === item.id;
          const flipClasses = [
            "flip",
            isOpen ? "open" : "",
            isMobile ? "always-open" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={item.id} className={`tl__row tl__row--${side}`}>
                
              <div className="tl__spacer" aria-hidden />
              <div className="tl__dot" aria-hidden />

              {/* Flip Card */}
              <article
                className={flipClasses}
                onClick={() => {
                  if (isMobile) return; // no toggle needed on mobile
                  setOpenId(isOpen ? null : item.id);
                }}
                tabIndex={0}
                aria-label={`${item.title} ${item.subtitle} (${item.period})`}
              >
                <div className="flip__inner">
                  {/* Front (desktop default view) */}
                  <div className="flip__face flip__front">
                    <div className="tl__card-head">
                      <div className="tl__logo-wrap">
                        {item.logo ? (
                          <img className="tl__logo" src={item.logo} alt="" />
                        ) : (
                          <div className="tl__logo tl__logo--fallback">
                            {abbr(item.title)}
                          </div>
                        )}
                      </div>
                      <div className="tl__text">
                        <div className="tl__title">{item.title}</div>
                        <div className="tl__subtitle">{item.subtitle}</div>
                        <div className="tl__period">{item.period}</div>
                      </div>
                    </div>
                  </div>

                  {/* Back (details) */}
                  <div className="flip__face flip__back">
                    {/* Mobile-only: show logo + title + period on the back too */}
                    <div className="tl__card-head mobile-only">
                      <div className="tl__logo-wrap">
                        {item.logo ? (
                          <img className="tl__logo" src={item.logo} alt="" />
                        ) : (
                          <div className="tl__logo tl__logo--fallback">
                            {abbr(item.title)}
                          </div>
                        )}
                      </div>
                      <div className="tl__text">
                        <div className="tl__title">{item.title}</div>
                        <div className="tl__period">{item.period}</div>
                      </div>
                    </div>

                    {item.type === "work" ? (
                      <div className="back__wrap">
                        <div className="back__head">Role</div>
                        <div className="back__body">{item.subtitle}</div>

                        {item.tech?.length ? (
                          <>
                            <div className="back__head">Technologies</div>
                            <div className="tl__tags">
                              {item.tech.map((t) => (
                                <span key={t} className="tl__tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ) : (
                      <div className="back__wrap">
                        <div className="back__head">College</div>
                        <div className="back__body">{item.title}</div>
                        <div className="back__head">Coursework</div>
                        <p className="back__body">{item.coursework}</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>

              <div className="tl__spacer" aria-hidden />
            </div>
          );
        })}
      </div>
      <p style={{display:'flex',justifyContent:'center',fontStyle:'italic',fontSize:'1rem'}}>Fuelled by purpose, shaped by the climb.</p>
    </section>
  );
}

/* helpers */
function abbr(name = "") {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function useIsMobile(bp = 900) {
  const [mobile, setMobile] = useState(
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width:${bp}px)`).matches
      : false
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

/* ➜ Your data (images in /public). Use leading slashes). */
const demoItems = [
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
    id: "cts",
    type: "work",
    title: "Cognizant Technology Solutions India Ltd.",
    subtitle: "Full Stack Developer",
    period: "Apr 2020 – Nov 2021",
    logo: "/cognizant.svg",
    tech: ["React", "Redux", "Node", "Express", "REST", "Docker", "Kubernetes", "AWS"],
  },
  {
    id: "6d",
    type: "work",
    title: "6D Technologies",
    subtitle: "Full Stack Developer",
    period: "Nov 2021 – Aug 2023",
    logo: "/6d_tech.png",
    tech: ["React", "TypeScript", "Node", "Express", "SQL", "Keycloak", "AWS", "D3/Charts"],
  },
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
