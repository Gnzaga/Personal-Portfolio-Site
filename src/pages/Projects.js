import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ title, description, githubLink, projectLink, technologies }) => (
  <motion.div
    layout
    className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
    <div className="flex justify-between mt-4">
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-2" />
          GitHub
        </a>
      )}
      <Link
        to={projectLink}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
        View Project
      </Link>
    </div>
  </motion.div>
);

const FilterButton = ({ technology, activeFilter, setActiveFilter }) => (
  <button
    className={`px-4 py-2 rounded-full text-sm font-semibold mr-2 mb-2 transition-colors duration-300 ${
      activeFilter === technology
        ? 'bg-blue-500 text-white'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
    onClick={() => setActiveFilter(technology)}
  >
    {technology}
  </button>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: "Portfolio Website",
      description: "A portfolio website showcasing my projects, self-hosted on a local Nginx server within my home network.",
      githubLink: "https://github.com/Gnzaga/portfolio-website",
      projectLink: "/projects/portfolio-project",
      technologies: ['React', 'Tailwind CSS', 'Nginx', 'Docker', 'Networking']
    },
    {
      title: "chat.gnzaga.com",
      description: "A self-hosted Ollama web interface powered by Docker, Nginx, and networking knowledge.",
      projectLink: "/projects/chat-gnzaga",
      technologies: ['Docker', 'Nginx', 'AI', 'Networking']
    },
    {
      title: "Discord Bot",
      description: "A Discord bot with various features like Wordle game, stock data, and web scraping.",
      githubLink: "https://github.com/Gnzaga/DiscordBot",
      projectLink: "/projects/discord-bot",
      technologies: ['Python', 'Docker', 'AI', 'API Integration']
    },
    {
      title: "Playlist Project",
      description: "A web application that generates a description and cover art for a Spotify playlist based on user input.",
      githubLink: "https://github.com/Gnzaga/spotify-gpt",
      projectLink: "/projects/PlaylistProject",
      technologies: ['React', 'Python', 'AI', 'API Integration']
    },
    {
      title: "Task Management Website",
      description: "A web application for task management with a Spring Boot back-end API and a React front-end.",
      githubLink: "https://github.com/Gnzaga/TaskManagement",
      projectLink: "/projects/task-management",
      technologies: ['React', 'Spring Boot', 'Java', 'SQL']
    }
    
  ];

  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.technologies.includes(activeFilter));

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      <div className="mb-8 text-center">
        {allTechnologies.map((tech) => (
          <FilterButton
            key={tech}
            technology={tech}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        ))}
      </div>

      <AnimatePresence>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              githubLink={project.githubLink}
              projectLink={project.projectLink}
              technologies={project.technologies}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Projects;