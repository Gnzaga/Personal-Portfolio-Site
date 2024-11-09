// src/pages/DiscordBotProject.js

import React from 'react'; // Import React for component functionality
import { motion } from 'framer-motion'; // Import motion for animation support
import ButtonLink from '../components/ButtonLink'; // Import reusable ButtonLink component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // Import GitHub icon
import { faRobot, faCode, faGamepad, faChartLine, faBolt, faLightbulb } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import { Link } from 'react-router-dom'; // Import Link for navigation

/**
 * Section Component
 * 
 * @description A reusable component to display a section with a title, icon, and content.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title of the section.
 * @param {Object} props.icon - The FontAwesome icon to display next to the title.
 * @param {React.ReactNode} props.children - The content inside the section.
 * 
 * @returns {JSX.Element} The rendered Section component.
 */
const Section = ({ title, icon, children }) => (
  <motion.div
    className="bg-gray-800 shadow-md rounded-lg p-6" // Styled container
    initial={{ opacity: 0, y: 20 }} // Initial animation state
    animate={{ opacity: 1, y: 0 }} // Target animation state
    transition={{ duration: 0.5 }} // Animation duration
  >
    <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
      <FontAwesomeIcon icon={icon} className="mr-2" /> {/* Icon next to the title */}
      {title}
    </h2>
    {children} {/* Content of the section */}
  </motion.div>
);

/**
 * DiscordBotProject Component
 * 
 * @description Displays detailed information about the Discord Bot project, including an overview, technologies used, key features, and challenges faced.
 * 
 * @returns {JSX.Element} The rendered DiscordBotProject component.
 */
const DiscordBotProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8"> {/* Main container with spacing */}
      {/* Project Title */}
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Target animation state
        transition={{ duration: 0.5 }} // Animation duration
      >
        Discord Bot Project
      </motion.h1>

      {/* Sections for project details */}
      <Section title="Project Overview" icon={faRobot}>
        <p className="text-gray-300 text-lg">
          A versatile Discord bot built with Python, showcasing advanced programming techniques and integration with external APIs. This project demonstrates proficiency in asynchronous programming, API interactions, and creating engaging user experiences within a chat platform.
        </p>
      </Section>

      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Python</li>
          <li>Discord.py library</li>
          <li>Asyncio for asynchronous programming</li>
          <li>Alpha Vantage API for financial data</li>
          <li>Web scraping techniques</li>
          <li>Docker for containerization</li>
          <li>Docker Swarm for orchestration</li>
          <li>Ollama for LLM integration</li>
        </ul>
      </Section>

      <Section title="Key Features" icon={faGamepad}>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Multiplayer Wordle game with asynchronous hosting</li>
          <li>Real-time financial data retrieval (stocks, forex, crypto)</li>
          <li>Integration with open-source language models via Ollama</li>
          <li>Web scraping capabilities for dynamic information retrieval</li>
          <li>Scalable architecture using Docker and Docker Swarm</li>
          <li>Custom command system for easy interaction</li>
        </ul>
      </Section>

      <Section title="Asynchronous Wordle Implementation" icon={faBolt}>
        <p className="text-gray-300 text-lg mb-4">
          One of the standout features is the implementation of asynchronous programming to host multiple instances of the Wordle game simultaneously:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Utilizes Python's asyncio library for efficient concurrency</li>
          <li>Allows for a 10x increase in the number of games played concurrently</li>
          <li>Implements game state management for multiple ongoing games</li>
          <li>Ensures responsive user interactions despite high concurrent usage</li>
        </ul>
      </Section>

      <Section title="Financial Data Integration" icon={faChartLine}>
        <p className="text-gray-300 text-lg mb-4">
          The bot interfaces with the Alpha Vantage API to provide real-time financial data:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Retrieves up-to-date stock market information</li>
          <li>Provides foreign exchange rate data</li>
          <li>Offers cryptocurrency market data</li>
          <li>Implements caching mechanisms to optimize API usage</li>
          <li>Presents data in an easy-to-read format within Discord</li>
        </ul>
      </Section>

      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="text-gray-300 text-lg mb-4">
          During the development of this project, several challenges were overcome:
        </p>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Managing concurrent game states without conflicts</li>
          <li>Optimizing API calls to stay within rate limits</li>
          <li>Implementing error handling for network issues and API downtime</li>
          <li>Designing a user-friendly interface within the constraints of Discord's chat format</li>
          <li>Ensuring scalability and performance with increasing user base</li>
        </ul>
      </Section>

      {/* Navigation Buttons */}
      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/DiscordBot">
          See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </ButtonLink>
        <Link to="/projects">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiscordBotProject; // Export the component for use in other parts of the app
