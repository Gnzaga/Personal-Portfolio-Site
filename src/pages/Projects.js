// Projects.js
import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
              Task Management Website
            </h2>
            <p className="text-gray-300 mb-4">
              A web application for task management with a Spring Boot back-end API and a React front-end.
            </p>
            <div className="flex justify-end">
              <Link
                to="/projects/task-management"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Project 2 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
              Discord Bot
            </h2>
            <p className="text-gray-300 mb-4">
              A Discord bot with various features like Wordle game, stock data, and web scraping.
            </p>
            <div className="flex justify-end">
              <Link
                to="/projects/discord-bot"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Project 3 */}
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
              chat.gnzaga.com
            </h2>
            <p className="text-gray-300 mb-4">
              A self-hosted Ollama web interface powered by Docker, Nginx, and networking knowledge.
            </p>
            <div className="flex justify-end">
              <Link
                to="/projects/chat-gnzaga"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;