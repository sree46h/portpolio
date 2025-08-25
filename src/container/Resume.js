import React,{useRef} from 'react';
import { Container, Header, List, Segment, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Experience from './Experience';
import Introduction from './Introduction';
import ContactForm from './Form';
import BookProjectSection from "../components/BookProjectSection";

function Resume() {
  let skills = ['React JS', 'Node JS', 'Kubernates', 'Docker', 'Kafka', 'Postman', 'NODE-RED', 'Java Script', 'Java', 'Python', 'R', 'Tensorflow','Mongo DB','SQL','Redux/Redux Toolkit','Responsive Design','Algorithms/Data Structres','AWS','Social Media/Web Analytics','Load Runner','Jira']
  let degree={"Masters Degreee":{university:"Florida Atlantic University",duration:'Aug 2023 - May 2025',about:'I joined Florida Atlantic University (FAU) as a computer science graduate student. It’s a wonderful college located in South Florida, known for its great weather and diverse community. The professors are friendly, and I gained valuable knowledge and experience from them. Additionally, I love watching football; we have a great stadium and an excellent library for studying.'},"Bachelors Degree":{university:'JNTU University',duration:'Apr 2016-2020',about:'I joined JNTU University for my bachelors degree, where I was first introduced to a world of opportunities and the various aspects of technology'}}
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  return (
    <Container className='main-container' id="main-container" style={{ padding: 30, paddingTop: 130, width: "100%" }}>
      <p className='main-paragraph' style={{ fontStyle: 'italic' }}>"Everyday life is like programming, I guess. If you love something, you can put beauty into it."</p>
      <Introduction />
      <Header as='h2' textAlign='center' className='main-header-name'>I'M SREEHARI NAIDU RANGANI.hgsajdhgadvagjh</Header>

      <Header as='h1' textAlign='center'  style={{ paddingTop: '30px',color:'rgb(175 167 160)' }}>A Bit About Me....</Header>
      <div className='about-container'>
        <div className='left-above'>
          <p className='main-paragraph' style={{ textAlign:'justify',padding:0,paddingBottom:'10px' }}>I am a <b style={{fontSize:'1.3rem'}}>Experienced Fullstack Web Developer and Computer Science Graduate</b> with extensive experience in developing front-end and back-end projects for various clients and organizations. In addition to my professional work, I actively contribute to public repositories supporting web development and regularly share insights on LinkedIn, feel free to connect with me on <a style={{display:'inline'}} href='https://www.linkedin.com/in/sreehari-naidu-r-636863167/'>Linkedin</a>!</p>
          <p className='main-paragraph' style={{ textAlign:'justify',padding:0 }}>I am currently pursuing my <b style={{fontSize:'1.2rem'}}>Master's degree and am actively seeking internship or full-time opportunities</b> that align with my expertise and skills. If you have an opportunity that matches, I would be glad to discuss how I can contribute to your team</p>
        </div>
        <div className='right-above'>
          <h1>Skills</h1>
          <div className='skill_styles'>
            {skills.map((val, i) => {
              return <span className='skill-span'>{val}</span>
            })}
          </div>
        </div>
      </div>
      <Experience/>

      <BookProjectSection
  projects={[
    {
      title: "Your Project 1",
      subtitle: "Short one-liner",
      tags: ["React", "Node", "MongoDB"],
      description:
        "What it does, your impact, performance, deployment, etc.",
    },
    {
      title: "Your Project 2",
      subtitle: "Short one-liner",
      tags: ["TypeScript", "Redux"],
      description:
        "Highlights and measurable outcomes.",
    },
    {
      title: "Your Project 3",
      subtitle: "Short one-liner",
      tags: ["AWS", "Docker", "Kubernetes"],
      description:
        "What you solved and how.",
    },
  ]}
/>
      <h1 className="form-title" style={{ textAlign: 'center' }}>contact</h1>
        <div className="contact-container">
        <ContactForm/>
        </div>
   
        <h1 style={{padding:'20px',display:'flex',justifyContent:'center'}}>Education</h1>
        <div>

        </div>

     

      <Segment inverted vertical className='footer'>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column textAlign='center'>
              <Header as='h4' inverted>Footer</Header>
              <p>&copy; Sreehari 2024</p>
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    </Container>
  );
}

export default Resume;
