import React from "react";
import "./AboutWithPhoto.css";

export default function AboutWithPhoto() {
  return (
    <section id="about" className="sec">
      <h2 className="sec__title">About</h2>

      <div className="about-band">
        {/* Photo */}
        <div className="about-photo">
          {/* put /public/profile.jpg or change src as needed */}
          <img src="/sreehari_img.jpg" alt="Sreeharinaidu Ranganu" className="about-img" />
        </div>

        {/* Text */}
        <article className="about-copy card">
          <p>
            I’m a full-stack web developer who’s happiest when a tough idea turns into something
            people can actually use. In telecom, I shipped data-heavy dashboards and fault-triage
            views used by carriers like Jio/VI/Mobitel/MTNI—building KPI cards, map/geo monitors,
            and trend visualizations in <b>React + TypeScript</b>, backed by <b>Node/Express</b> APIs
            with robust validation, server-side pagination and indexing to keep queries snappy.
            For insurance and banking programs, I delivered compliant UI flows, integrated
            <b> Keycloak</b> for authN/authZ, and hardened sessions and inputs—because performance
            doesn’t matter if it isn’t secure.
          </p>

          <p>
            I enjoy glue-work: stitching products together with third-party APIs and services.
            I’ve wired analytics, notifications, and file pipelines; designed REST contracts,
            and made frontend and backend meet cleanly. I’ve also been exploring AI in real apps:
            using Whisper for voice → text, serving <b>TensorFlow/Keras</b> models from <b>Flask</b> or
            Node, and surfacing the results in animated, accessible UIs. I’m currently open to roles
            as a <b>Full-Stack</b> / <b>Front-End</b> / <b>Back-End</b> Engineer (React.js, Node.js, Express.js,
            AWS, SQL) and I’m increasingly interested in <b>Data Engineering</b> work where pipelines meet
            product. If any of that resonates,{" "}
            <a
              className="about-link"
              href="https://www.linkedin.com/in/sreehari-naidu/"
              target="_blank"
              rel="noreferrer"
            >
              let’s connect on LinkedIn
            </a>
            .
          </p>
        </article>
      </div>
    </section>
  );
}
