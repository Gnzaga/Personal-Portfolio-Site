// PlaylistGeneratorProject.js
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const PlaylistGeneratorProject = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Playlist Description & Art Generator
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A sophisticated web application that enhances your Spotify experience by generating detailed descriptions and custom cover art for your playlists. Built with React for a seamless and interactive user experience, this application allows users to input a Spotify playlist link.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          The backend, powered by Python APIs, fetches detailed information about the playlist and its tracks. Once the data is retrieved, the app combines the playlist's details with user-provided input to craft a comprehensive and engaging description of the playlist.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          Additionally, it leverages OpenAI's image generation capabilities to create unique and visually appealing cover art, adding a personalized touch to each playlist.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          <strong>Key Features:</strong>
          <ul className="list-disc list-inside mt-4">
            <li>Spotify Integration: Accepts Spotify playlist links and extracts relevant data.</li>
            <li>Custom Descriptions: Generates detailed and engaging descriptions based on playlist information and user input.</li>
            <li>AI-Generated Art: Utilizes OpenAI's image generation software to create custom playlist cover art.</li>
          </ul>
        </p>
        <div className="mt-12 text-center space-x-4">
          <ButtonLink to="https://github.com/Gnzaga/spotify-gpt">
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

export default PlaylistGeneratorProject;
