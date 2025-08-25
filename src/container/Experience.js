import React from 'react';
import './project.css';

const Experience = () => {
  const experience = {

    "Florida Atlantic University": {
      role: "Student Project",
      duration: "Fall 2023",
      projects: [
        {
          title: "(TAONIX) TA Management System",
          technologies: ["React.js", "Node.js", "JavaScript", "MongoDB", "Redux"],
          responsibilities: [
            "Created a fully functional full-stack website using Node.js, React, Redux, and MongoDB.",
            "Managed weekly stand-up calls with the professor and updated design and logic changes as needed.",
            "Added logic to transfer data between admin, TA committee, TA applicants, and instructor.",
            "Implemented responsive design to ensure usability across different devices."
          ]
        }
      ]
    },
    "6D Technologies": {
      role: "Full Stack Developer",
      duration: "Dec 2021 - Aug 2023",
      projects: [
        {
          client: "VI (Vodafone Idea)",
          technologies: ["MERN Stack", "React.js", "Node.js", "SQL Server"],
          responsibilities: [
            "Handled IMEI and MSISDN parameters and performed API integrations.",
            "Developed responsive web pages according to design documents.",
            "Developed user interfaces using React.js/Redux, managing state with store, middleware, action creators, reducers, and container components."
          ]
        },
        {
          client: "Jio Tele Communications",
          technologies: ["Node.js", "Swagger UI", "Express.js", "JSON"],
          responsibilities: [
            "Read the design document from the Jio client.",
            "Refactored the complete API response received from the client according to the design and sent it back, acting as a mediator.",
            "Prepared API response documentation in Swagger UI."
          ]
        },
        {
          client: "MTNI Tele Communications",
          technologies: ["Apache Kafka", "Node-RED", "Kubernetes"],
          responsibilities: [
            "Implemented data streaming solutions with Apache Kafka for real-time applications.",
            "Used Node-RED for efficient data flow and automation.",
            "Leveraged Kubernetes for Kafka cluster orchestration, ensuring reliability and high availability.",
            "Employed containerization techniques for streamlined Kafka deployment."
          ]
        },
        {
          client: "Mobitel Tele Communications",
          technologies: ["Node.js", "Express.js", "SQL", "Keycloak", "Docker"],
          responsibilities: [
            "Wrote inbound API logic with respective error handlers and success response functions.",
            "Wrote controller functions for API endpoints with condition checks and database operations.",
            "Fetched data from the config file with correct port and MSISDN values with Keycloak authentication."
          ]
        }
      ]
    },
    "Cognizant Technology Solutions India Ltd": {
      role: "Programmer Analyst",
      duration: "Nov 2020 - Dec 2021",
      projects: [
        {
          client: "Voya Financial",
          technologies: ["React", "Node.js", "Keycloak", "Docker", "Kubernetes", "LoadRunner"],
          responsibilities: [
            "Conducted performance testing using LoadRunner and created LoadRunner scripts.",
            "Developed and maintained an insurance project with React and Node.js.",
            "Worked on the MyVoya portal with bug fixes and design changes."
          ]
        }
      ]
    }
  };

  return (
    <div className="experience-container">
      <header>
        <h1 style={{padding:'20px',display:'flex',justifyContent:'center'}}>Projects</h1>
      </header>
      <main className="main-content">
        {Object.entries(experience).map(([company, { role, duration, projects }]) => (
          <section key={company}>
            {/* <h2 className="company-title">{company}</h2>
            <p className="role-duration"><strong>Role:</strong> {role} ({duration})</p> */}
            {projects.map(({ client, title, technologies, responsibilities }) => (
              <div key={client || title} className="project">
                <h3 className="project-title gradient-text">{client || title} ||{role} ({duration}) || {company}</h3>
                <ul className="project-info">
                  {technologies.map((val)=>{
                    return <span className='skill-span'>{val}</span>
                  })}
                </ul>
                <ul>
                    {responsibilities.map((resp, index) => (
                      <li style={{color:'rgb(175 167 160)'}} key={index}>{resp}</li>
                    ))}
                  </ul>
              </div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default Experience;
