// PortfolioProject.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ButtonLink from '../components/ButtonLink'; // Assuming ButtonLink is a reusable component

const PortfolioProject = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      {/* Project Overview Card */}
      <div className="bg-slate-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-white mb-4">Portfolio Website</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Project Overview</h2>
        <p className="text-gray-300 mb-4">
          This portfolio website showcases my projects and achievements, featuring a modern and responsive design built with React and Tailwind CSS. The site provides detailed descriptions of each project, links to their respective GitHub repositories, and highlights the technologies used.
        </p>
      </div>

      {/* Technical Details Card */}
      <div className="bg-slate-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Technical Details</h2>
        <p className="text-gray-300 mb-4">
          The portfolio website is fully self-hosted on my personal equipment using a local Nginx server. Here’s a breakdown of the technologies and setup involved:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li><strong>Frontend:</strong> Developed with React.js for dynamic UI components and Tailwind CSS for a clean and responsive design.</li>
          <li><strong>Backend:</strong> Utilizes Node.js for serving the React application and handling backend logic.</li>
          <li><strong>Hosting:</strong> Deployed on a local Nginx server within my home network, providing full control over the hosting environment.</li>
          <li><strong>Domain:</strong> Hosted under the custom domain <a href="http://gnzaga.com" className="text-blue-400 hover:underline">gnzaga.com</a>.</li>
        </ul>
      </div>

      {/* Self-Hosting Details Card */}
      <div className="bg-slate-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Self-Hosting Details</h2>
        <p className="text-gray-300 mb-4">
          The website is hosted on a local server, giving me complete control over its configuration and deployment:
        </p>
        <ul className="list-disc list-inside text-gray-300 mb-4">
          <li><strong>Server:</strong> A local Nginx server is set up on my personal equipment, handling all incoming requests and serving the website efficiently.</li>
          <li><strong>Network:</strong> Deployed on my home network, leveraging my own hardware and network infrastructure for hosting.</li>
          <li><strong>Maintenance:</strong> Regularly updated and maintained to ensure optimal performance and security.</li>
        </ul>
 

      {/* GitHub Repository Card */}
      
        <h2 className="text-2xl font-bold text-white mb-2">GitHub Repository</h2>
        <p className="text-gray-300 mb-4">
          The source code for this portfolio website is available on GitHub. You can explore the codebase, contribute, or use it as a reference:
        </p>
        <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/TaskManagementProject">
          See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </ButtonLink>
        <Link to="/projects">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">
          Back to Projects
        </button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default PortfolioProject;
