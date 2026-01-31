import React from 'react';
import { motion } from 'framer-motion';
import ButtonLink from '../../components/ButtonLink';
import Section from '../../components/ProjectSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMusic, faCode, faPalette, faRobot, faCloud, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import GlassButton from '../../components/GlassButton';

/**
 * PlaylistGeneratorProject Component
 */
const PlaylistGeneratorProject = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Playlist Description & Art Generator
        </h1>
      </motion.div>

      {/* Section for the project overview */}
      <Section title="Project Overview" icon={faMusic}>
        <p className="mb-4">
          A sophisticated web application that enhances the Spotify experience by generating detailed descriptions and custom cover art for playlists. This project showcases the integration of multiple APIs, AI-powered content generation, and a seamless user interface to create a unique tool for music enthusiasts.
        </p>
      </Section>

      {/* Section detailing technologies used in the project */}
      <Section title="Technologies Used" icon={faCode}>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Spotify Integration: Seamlessly extracts playlist data using the Spotify API</li>
          <li>Custom Descriptions: Generates engaging and detailed playlist descriptions using AI</li>
          <li>AI-Generated Cover Art: Creates unique visual representations for each playlist</li>
          <li>User Input Integration: Combines AI-generated content with user preferences</li>
          <li>Responsive Design: Ensures a great user experience across devices</li>
        </ul>
      </Section>

      {/* Section explaining frontend implementation details */}
      <Section title="Frontend Implementation" icon={faPalette}>
        <p className="mb-4">
          The React-based frontend provides an intuitive and interactive user experience:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>User-friendly interface for inputting Spotify playlist links</li>
          <li>Real-time updates and loading indicators during content generation</li>
          <li>Interactive elements for customizing generated descriptions</li>
          <li>Preview and download options for generated cover art</li>
          <li>Responsive design ensuring compatibility across various devices</li>
        </ul>
      </Section>

      {/* Section explaining backend architecture */}
      <Section title="Backend Architecture" icon={faCloud}>
        <p className="mb-4">
          The Python-powered backend orchestrates the complex processes behind the scenes:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
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
        <p className="mb-4">
          The project leverages advanced AI capabilities:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Utilizes GPT models to generate contextually relevant playlist descriptions</li>
          <li>Employs DALL-E to create visually appealing and unique cover art</li>
          <li>Implements prompt engineering techniques for optimal AI-generated content</li>
          <li>Balances AI creativity with user input for personalized results</li>
        </ul>
      </Section>

      {/* Section describing challenges and solutions */}
      <Section title="Challenges and Solutions" icon={faLightbulb}>
        <p className="mb-4">
          Several challenges were overcome during development:
        </p>
        <ul className="list-disc list-inside space-y-2 marker:text-cyan-300">
          <li>Ensuring seamless integration between multiple APIs and services</li>
          <li>Optimizing API calls to manage rate limits and costs</li>
          <li>Balancing AI-generated content with user preferences and input</li>
          <li>Implementing robust error handling for various API responses</li>
          <li>Designing an intuitive UI/UX for a complex backend process</li>
        </ul>
      </Section>

      {/* Call-to-action buttons */}
      <div className="mt-16 flex justify-center gap-6">
        <a href="https://github.com/Gnzaga/spotify-gpt" target="_blank" rel="noopener noreferrer">
          <GlassButton variant="primary" className="gap-2">
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            See on GitHub
          </GlassButton>
        </a>
        <Link to="/projects">
          <GlassButton variant="secondary">
            Back to Projects
          </GlassButton>
        </Link>
      </div>
    </div>
  );
};

export default PlaylistGeneratorProject;