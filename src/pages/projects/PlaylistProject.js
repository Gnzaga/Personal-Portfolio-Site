import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '../../components/ButtonLink';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMusic, faCode, faPalette, faRobot, faCloud, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/**
 * Main component for displaying the Playlist Generator Project page.
 * 
 * This component includes detailed sections explaining the project overview, technologies used,
 * key features, frontend and backend architecture, AI integration, and challenges faced.
 * 
 * @returns {JSX.Element} The rendered Playlist Generator Project component.
 */
const PlaylistGeneratorProject = () => {
  return (
    <div className="container mx-auto px-4 py-32 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Playlist Description & Art Generator
      </motion.h1>

      {/* Section for the project overview */}
      <Section title="Project Overview" icon={faMusic}>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          A sophisticated web application that enhances the Spotify experience by generating detailed descriptions and custom cover art for playlists. This project showcases the integration of multiple APIs, AI-powered content generation, and a seamless user interface to create a unique tool for music enthusiasts.
        </p>
      </Section>

      {/* Section detailing technologies used in the project */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>React for the frontend</li>
          <li>Python for backend APIs</li>
          <li>Spotify API for playlist data retrieval</li>
          <li>OpenAI's GPT for description generation</li>
          <li>OpenAI's DALL-E for image generation</li>
          <li>RESTful API architecture</li>
          <li>OAuth for Spotify authentication</li>
        </ul>
      </Section>

      {/* Section highlighting key features of the project */}
      <Section title="Key Features" icon={faLightbulb}>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>Spotify Integration: Seamlessly extracts playlist data using the Spotify API</li>
          <li>Custom Descriptions: Generates engaging and detailed playlist descriptions using AI</li>
          <li>AI-Generated Cover Art: Creates unique visual representations for each playlist</li>
          <li>User Input Integration: Combines AI-generated content with user preferences</li>
          <li>Responsive Design: Ensures a great user experience across devices</li>
        </ul>
      </Section>

      {/* Section explaining frontend implementation details */}
      <Section title="Frontend Implementation" icon={faPalette}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          The React-based frontend provides an intuitive and interactive user experience:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>User-friendly interface for inputting Spotify playlist links</li>
          <li>Real-time updates and loading indicators during content generation</li>
          <li>Interactive elements for customizing generated descriptions</li>
          <li>Preview and download options for generated cover art</li>
          <li>Responsive design ensuring compatibility across various devices</li>
        </ul>
      </Section>

      {/* Section explaining backend architecture */}
      <Section title="Backend Architecture" icon={faCloud}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          The Python-powered backend orchestrates the complex processes behind the scenes:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>RESTful API endpoints for handling frontend requests</li>
          <li>Integration with Spotify API for secure data retrieval</li>
          <li>Efficient data processing and formatting of playlist information</li>
          <li>Interaction with OpenAI's GPT for generating descriptive text</li>
          <li>Integration with DALL-E API for creating custom cover art</li>
          <li>Error handling and rate limiting to ensure reliable performance</li>
        </ul>
      </Section>

      {/* Section on AI integration used in the project */}
      <Section title="AI Integration" icon={faRobot}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          The project leverages advanced AI capabilities:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>Utilizes GPT models to generate contextually relevant playlist descriptions</li>
          <li>Employs DALL-E to create visually appealing and unique cover art</li>
          <li>Implements prompt engineering techniques for optimal AI-generated content</li>
          <li>Balances AI creativity with user input for personalized results</li>
        </ul>
      </Section>

      {/* Section describing challenges and solutions */}
      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
          Several challenges were overcome during development:
        </p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>Ensuring seamless integration between multiple APIs and services</li>
          <li>Optimizing API calls to manage rate limits and costs</li>
          <li>Balancing AI-generated content with user preferences and input</li>
          <li>Implementing robust error handling for various API responses</li>
          <li>Designing an intuitive UI/UX for a complex backend process</li>
        </ul>
      </Section>

      {/* Call-to-action buttons */}
      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/spotify-gpt">
          See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </ButtonLink>
        <Link to="/projects">
          <button className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300">
            Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistGeneratorProject;
