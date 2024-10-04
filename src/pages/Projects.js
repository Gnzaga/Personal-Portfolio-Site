// Projects.js
import React from 'react';
import { Link } from 'react-router-dom';
import StaggeredList from '../components/StaggeredList';
const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      
      
      <StaggeredList>

        <h1 className="text-4xl font-bold text-white mb-4 text-center ">My Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {/* Project 1 */}
          <div className="bg-slate-800 p-6 rounded-lg hover:scale-105 transition-transform relative min-h-[250px] flex flex-col">
            <Link to="/projects/task-management" className="flex-1">
              <div className="h-full">
                <h2 className="text-2xl font-bold text-white mb-2">Task Management Website</h2>
                <p className="text-gray-300 mb-4">
                  A web application for task management with a Spring Boot back-end API and a React front-end.
                </p>
              </div>
            </Link>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between">
              <a
                href="https://github.com/Gnzaga/TaskManagement"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                GitHub
              </a>
              <Link
                to="/projects/task-management"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Project 2 */}
          <div className="bg-slate-800 p-6 rounded-lg hover:scale-105 transition-transform relative min-h-[250px] flex flex-col">
            <Link to="/projects/discord-bot" className="flex-1">
              <div className="h-full">
                <h2 className="text-2xl font-bold text-white mb-2">Discord Bot</h2>
                <p className="text-gray-300 mb-4">
                  A Discord bot with various features like Wordle game, stock data, and web scraping.
                </p>
              </div>
            </Link>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between">
              <a
                href="https://github.com/Gnzaga/DiscordBot"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                GitHub
              </a>
              <Link
                to="/projects/discord-bot"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Project 3 */}
          <div className="bg-slate-800 p-6 rounded-lg hover:scale-105 transition-transform relative min-h-[250px] flex flex-col">
            <Link to="/projects/chat-gnzaga" className="flex-1">
              <div className="h-full">
                <h2 className="text-2xl font-bold text-white mb-2">chat.gnzaga.com</h2>
                <p className="text-gray-300 mb-4">
                  A self-hosted Ollama web interface powered by Docker, Nginx, and networking knowledge.
                </p>
              </div>
            </Link>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between">
              <Link
                to="/projects/chat-gnzaga"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Playlist Project */}
          <div className="bg-slate-800 p-6 rounded-lg hover:scale-105 transition-transform relative min-h-[250px] flex flex-col">
            <Link to="/projects/PlaylistProject" className="flex-1">
              <div className="h-full">
                <h2 className="text-2xl font-bold text-white mb-2">Playlist Project</h2>
                <p className="text-gray-300 mb-4">
                  A web application that generates a description and cover art for a Spotify playlist based on user input.
                </p>
              </div>
            </Link>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between">
              <a
                href="https://github.com/Gnzaga/spotify-gpt"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                GitHub
              </a>
              <Link
                to="/projects/PlaylistProject"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
          {/* Portfolio Project */}
          <div className="bg-slate-800 p-6 rounded-lg hover:scale-105 transition-transform relative min-h-[250px] flex flex-col">
            <Link to="/projects/portfolio-project" className="flex-1">
              <div className="h-full">
                <h2 className="text-2xl font-bold text-white mb-2">Portfolio Website</h2>
                <p className="text-gray-300 mb-4">
                  A portfolio website showcasing my projects, self-hosted on a local Nginx server within my home network.
                </p>
              </div>
            </Link>
            <div className="absolute bottom-4 left-6 right-6 flex justify-between">
              <a
                href="https://github.com/Gnzaga/portfolio-website"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                GitHub
              </a>
              <Link
                to="/projects/portfolio-project"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
            
          </div>
        </div>
        </StaggeredList>

      
      
    </div>
  );
};

export default Projects;
