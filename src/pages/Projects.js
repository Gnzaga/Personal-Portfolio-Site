/**
 * Projects.js
 *
 * This component renders a showcase of all projects with filtering capabilities. Each project is displayed
 * as a card, allowing users to view details, visit the project, or check its GitHub repository. The file
 * also includes a technology filter for dynamic project exploration. This documentation is designed for
 * a Retrieval-Augmented Generation (RAG) system to aid in understanding and answering questions related
 * to the codebase.
 *
 * @component
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitlab } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * ProjectCard component displays individual project details.
 */
const ProjectCard = ({ title, description, githubLink, projectLink, technologies }) => (
  <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
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
          <FontAwesomeIcon icon={faGitlab} className="mr-2" />
          GitLab
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
  </div>
);

/**
 * FilterButton component for filtering projects by technology.
 */
const FilterButton = ({ technology, activeFilter, setActiveFilter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Immediately set the filter so UI updates
    setActiveFilter(technology);

    // Also update the URL so the query param is in sync
    if (technology === 'All') {
      navigate('/projects'); 
    } else {
      navigate(`/projects?filter=${technology}`);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-semibold mr-2 mb-2 transition-colors duration-300 ${
        activeFilter === technology
          ? 'bg-blue-500 text-white'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
      onClick={handleClick}
    >
      {technology}
    </button>
  );
};

/**
 * Main Projects component to display all projects with filtering functionality.
 */
const Projects = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  // We reduced the total categories to 7, but each project has more of them.
  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio, self-hosted on a home network using Docker containers, featuring React for the frontend.",
      githubLink: "https://gitlab.gnzaga.com/gnzaga/Personal-Portfolio-Site",
      projectLink: "/projects/portfolio-project",
      technologies: ['React', 'Docker', 'Networking']
    },
    {
      title: "chat.gnzaga.com",
      description: "A self-hosted AI chatbot powered by Docker, with networking knowledge used for domain routing.",
      projectLink: "/projects/chat-gnzaga",
      technologies: ['AI', 'Docker', 'Networking']
    },
    {
      title: "Discord Bot",
      description: "A Python-based Discord bot with Dockerized deployment, featuring AI-based Wordle game logic.",
      githubLink: "https://gitlab.gnzaga.com/Gnzaga/DiscordBot",
      projectLink: "/projects/discord-bot",
      technologies: ['Python', 'Docker', 'AI']
    },
    {
      title: "Playlist Project",
      description: "A React + Python web app for generating Spotify playlist art and descriptions using AI prompts.",
      githubLink: "https://gitlab.gnzaga.com/Gnzaga/spotify-gpt",
      projectLink: "/projects/PlaylistProject",
      technologies: ['React', 'Python', 'AI']
    },
    {
      title: "Task Management Website",
      description: "A task manager using React for the UI, Java for the backend logic, and containerized deployment with Docker.",
      githubLink: "https://gitlab.gnzaga.com/Gnzaga/RUTidy",
      projectLink: "/projects/task-management",
      technologies: ['React', 'Java', 'Docker']
    },
    {
      title: "Homelab Project",
      description: "A complete homelab environment with Kubernetes cluster setups, Docker containers, and advanced networking.",
      projectLink: "/projects/homelab",
      technologies: ['Kubernetes', 'Docker', 'Networking']
    },
    {
      title: "Kubernetes Cluster",
      description: "A dedicated cluster for container orchestration, leveraging Docker containers and virtual networks.",
      projectLink: "/projects/kubernetes-cluster",
      technologies: ['Kubernetes', 'Docker', 'Networking']
    }
  ];

  // Extract all unique technologies from the projects to create filter buttons
  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];

  // On mount or when URL changes, parse ?filter= from the query, case-insensitive
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilter = searchParams.get('filter');

    if (urlFilter) {
      const allTechLowercase = allTechnologies.map((t) => t.toLowerCase());
      if (allTechLowercase.includes(urlFilter.toLowerCase())) {
        const correctCase = allTechnologies.find(
          (t) => t.toLowerCase() === urlFilter.toLowerCase()
        );
        setActiveFilter(correctCase);
        return;
      }
    }
    // If we get here, no valid filter param => default to 'All'
    setActiveFilter('All');
  }, [location.search, allTechnologies]);

  // Filter the projects based on the active technology filter
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.technologies.includes(activeFilter));

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h1
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h1>

      {/* Technology Filter Buttons */}
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

      {/* Display filtered projects */}
      <AnimatePresence>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                githubLink={project.githubLink}
                projectLink={project.projectLink}
                technologies={project.technologies}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Projects;
