import React from 'react';
import StaggeredList from '../components/StaggeredList';
import SkillsComponent from '../components/SkillsComponent';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-24 space-y-8">
      <StaggeredList>
        <h1 className="text-4xl font-bold text-white mb-4 text-center">About Me</h1>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            I am Alessandro Gonzaga, a dedicated and skilled IT professional with a strong foundation in computer science. My experience ranges from leadership roles at Rutgers University's Office of Information Technology to my current position as a Network Engineer at Verizon. I thrive on leveraging my technical expertise and leadership skills to drive innovation in network engineering.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            At Verizon, I lead automation efforts for nationwide projects, successfully deploying hardware at scale to support industry-leading infrastructure. My work includes designing tools with Python and SQL to streamline processes, reduce errors, and accelerate timelines. I also collaborate with cross-functional teams to address points of need and standardize processes.
          </p>
        </div>

      
          <SkillsComponent />
   

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            My career journey includes managing large teams, mentoring, and conducting advanced technical workshops. During my time at Rutgers, I supervised over 200 consultants, resolved complex IT issues, and led transitions to new organizational structures. These experiences have refined my communication, leadership, and technical problem-solving abilities.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            I specialize in automation, containerization, and infrastructure management. My projects include building tools for network deployments, managing self-hosted services, and implementing efficient workflows to enhance team productivity.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Additional Skills</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg">
            <li>Programming: Python, Java, SQL, JavaScript, HTML/CSS, React, Tailwind CSS</li>
            <li>Developer Tools: Docker, Nginx, Git, Postman, JUnit</li>
            <li>Infrastructure: Networking, Reverse Proxies, Multi-access Edge Compute</li>
            <li>Automation: Database migration, Hostname generation, Data validation</li>
            <li>Leadership: Team supervision, Mentorship, Advanced technical workshops</li>
          </ul>
        </div>
      </StaggeredList>
    </div>
  );
};

export default About;
