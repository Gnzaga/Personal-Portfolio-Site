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
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

/**
 /**
 * ProjectCard component displays individual project details with enhanced styling.
 */
const ProjectCard = ({ title, description, githubLink, projectLink, technologies, agentTarget }) => (
  <motion.div
    className="card p-6 flex flex-col justify-between h-full group"
    data-agent-target={agentTarget}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.2 }}
  >
    <div>
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 pr-4">
          {title}
        </h2>
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-glow transition-shadow duration-300">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-dark-700/50">
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline flex items-center justify-center space-x-2 flex-1 py-2.5 text-sm"
        >
          <FontAwesomeIcon icon={faGithub} />
          <span>Code</span>
        </a>
      )}
      <Link
        to={projectLink}
        className="btn-primary flex items-center justify-center space-x-2 flex-1 py-2.5 text-sm"
        data-agent-target={agentTarget ? `${agentTarget}-detail` : undefined}
      >
        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
        <span>Details</span>
      </Link>
    </div>
  </motion.div>
);

/**
 * FilterButton component for filtering projects by technology.
 */
const FilterButton = ({ technology, activeFilter, setActiveFilter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setActiveFilter(technology);
    if (technology === 'All') {
      navigate('/projects');
    } else {
      navigate(`/projects?filter=${technology}`);
    }
  };

  return (
    <motion.button
      className={`px-4 py-2 rounded-lg text-sm font-medium mr-2 mb-2 transition-all duration-200 ${
        activeFilter === technology
          ? 'bg-primary-500 text-white shadow-md'
          : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400'
      }`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {technology}
    </motion.button>
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
      githubLink: "https://github.com/Gnzaga/Personal-Portfolio-Site",
      projectLink: "/projects/portfolio-project",
      technologies: ['React', 'Docker', 'Networking'],
      agentTarget: 'project-portfolio'
    },
    {
      title: "chat.gnzaga.com",
      description: "A self-hosted AI chatbot powered by Docker, with networking knowledge used for domain routing.",
      projectLink: "/projects/chat-gnzaga",
      technologies: ['AI', 'Docker', 'Networking'],
      agentTarget: 'project-chat-gnzaga'
    },
    {
      title: "Discord Bot",
      description: "A Python-based Discord bot with Dockerized deployment, featuring AI-based Wordle game logic.",
      githubLink: "https://github.com/Gnzaga/DiscordBot",
      projectLink: "/projects/discord-bot",
      technologies: ['Python', 'Docker', 'AI'],
      agentTarget: 'project-discord-bot'
    },
    {
      title: "Playlist Project",
      description: "A React + Python web app for generating Spotify playlist art and descriptions using AI prompts.",
      githubLink: "https://github.com/gnzaga/spotify-gpt",
      projectLink: "/projects/PlaylistProject",
      technologies: ['React', 'Python', 'AI'],
      agentTarget: 'project-playlist'
    },
    {
      title: "Task Management Website",
      description: "A task manager using React for the UI, Java for the backend logic, and containerized deployment with Docker.",
      githubLink: "https://github.com/gnzaga/RUTidy",
      projectLink: "/projects/task-management",
      technologies: ['React', 'Java', 'Docker'],
      agentTarget: 'project-task-management'
    },
    {
      title: "Homelab Project",
      description: "A distributed multi-node Proxmox cluster with GPU passthrough, centralized NFS storage, and Kubernetes-based service orchestration for GitHub, JupyterHub, Jellyfin, and LLM workloads. Features integrated Ollama for serving open-source LLMs via containerized GPU inference pipelines.",
      githubLink: "https://github.com/Gnzaga/homelab-code",
      projectLink: "/projects/homelab",
      technologies: ['Kubernetes', 'Docker', 'Networking', 'AI'],
      agentTarget: 'project-homelab'
    },
    {
      title: "Kubernetes Cluster",
      description: "A dedicated cluster for container orchestration, leveraging Docker containers and virtual networks.",
      projectLink: "/projects/kubernetes-cluster",
      technologies: ['Kubernetes', 'Docker', 'Networking'],
      agentTarget: 'project-kubernetes'
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
    <div className="min-h-screen py-24 custom-scrollbar bg-white dark:bg-dark-950 transition-colors duration-200">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            className="page-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My <span className="gradient-text">Projects</span>
          </motion.h1>
          <motion.p
            className="page-subheader mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical projects spanning network engineering, full-stack development,
            and infrastructure automation.
          </motion.p>
          <div className="section-divider"></div>
        </div>

        {/* Technology Filter Section */}
        <motion.div
          className="mb-10"
          data-agent-target="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center">
            {allTechnologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <FilterButton
                  technology={tech}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  githubLink={project.githubLink}
                  projectLink={project.projectLink}
                  technologies={project.technologies}
                  agentTarget={project.agentTarget}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-600 mb-2 transition-colors duration-300">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-700 transition-colors duration-300">Try selecting a different technology filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
