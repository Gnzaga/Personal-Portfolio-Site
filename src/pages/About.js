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
            I'm a passionate developer with a strong background in web development, mobile app development, and software engineering. I thrive on solving complex problems and creating innovative solutions.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            With experience in various programming languages and technologies, I strive to deliver high-quality and efficient code. I'm constantly learning and exploring new technologies to stay ahead of the curve.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Technical Skills</h2>
          <SkillsComponent />
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            In addition to my technical skills, I have hands-on experience in containerization, networking, and infrastructure management. I've successfully deployed and managed a self-hosted Ollama web interface powered by Docker, Nginx, and port forwarding configurations.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <p className="text-gray-300 text-lg mb-8">
            As an admin, I perform ongoing maintenance and user management tasks, ensuring a smooth and reliable experience for all users. I'm also well-versed in asynchronous programming techniques, which I've applied in projects like a Discord bot and a task management website.
          </p>
        </div>

        <div className="bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Additional Skills</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg">
            <li>Languages: Python, Java, C, SQL, JavaScript, HTML/CSS, Mojo, React</li>
            <li>Developer Tools: Linux, Windows, Git, Android SDK, Docker, Spring Boot, Postman, JUnit, Jira</li>
            <li>Web Technologies: React, Spring Boot, Axios, JWT, SQL databases</li>
            <li>Asynchronous Programming: Asyncio (Python), Spring Scheduling (Java)</li>
            <li>Containerization: Docker</li>
            <li>Networking: Nginx, Port Forwarding, Reverse Proxies</li>
            <li>Infrastructure Management: Deployment, Maintenance, User Management</li>
          </ul>
        </div>
      </StaggeredList>
    </div>
  );
};

export default About;