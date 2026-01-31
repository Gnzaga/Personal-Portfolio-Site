// src/pages/Projects.js

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Terminal, Server, Globe, Cpu, Database, Music, MessageSquare } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';

/**
 * ProjectCard component displays individual project details with glass styling.
 */
const ProjectCard = ({ title, description, githubLink, projectLink, technologies, agentTarget }) => {
  // Select an icon based on title/tech
  const getIcon = () => {
    const t = title.toLowerCase();
    if (t.includes('chat')) return <MessageSquare className="w-6 h-6 text-green-400" />;
    if (t.includes('playlist') || t.includes('spotify')) return <Music className="w-6 h-6 text-emerald-400" />;
    if (t.includes('kubernetes') || t.includes('cluster')) return <Server className="w-6 h-6 text-green-500" />;
    if (t.includes('bot')) return <Terminal className="w-6 h-6 text-green-400" />;
    if (t.includes('homelab')) return <Cpu className="w-6 h-6 text-emerald-500" />;
    if (t.includes('data') || t.includes('task')) return <Database className="w-6 h-6 text-green-400" />;
    return <Globe className="w-6 h-6 text-white" />;
  };

  return (
    <GlassCard 
      className="flex flex-col h-full mb-6 break-inside-avoid" 
      hoverEffect={true}
      data-agent-target={agentTarget}
    >
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-xl font-bold text-white pr-4 leading-tight">
          {title}
        </h2>
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md border border-white/10 shadow-inner">
          {getIcon()}
        </div>
      </div>

      <p className="text-white/70 text-sm mb-6 leading-relaxed flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <span key={index} className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-medium text-white/60 border border-white/5">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <GlassButton variant="secondary" className="w-full text-xs py-2 px-3 gap-2">
              <Github className="w-4 h-4" />
              <span>Code</span>
            </GlassButton>
          </a>
        )}
        <Link
          to={projectLink}
          className="flex-1"
          data-agent-target={agentTarget ? `${agentTarget}-detail` : undefined}
        >
          <GlassButton variant="primary" className="w-full text-xs py-2 px-3 gap-2 bg-white/20 hover:bg-white/30">
            <ExternalLink className="w-4 h-4" />
            <span>Details</span>
          </GlassButton>
        </Link>
      </div>
    </GlassCard>
  );
};

/**
 * FilterButton component for filtering projects.
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
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-full text-sm font-medium mr-2 mb-2 transition-all duration-300 backdrop-blur-md border ${
        activeFilter === technology
          ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] transform scale-105'
          : 'bg-black/30 text-white/60 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
      }`}
    >
      {technology}
    </button>
  );
};

/**
 * Main Projects component
 */
const Projects = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');

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
    },
    {
      title: "K8s Automation Pipeline",
      description: "Automated CI/CD infrastructure using Tekton, Harbor, and ArgoCD for GitOps-driven Kubernetes deployments.",
      githubLink: "https://github.com/Gnzaga/homelab-tekton-pipelines",
      projectLink: "/projects/k8s-automation",
      technologies: ['Kubernetes', 'Tekton', 'GitOps', 'ArgoCD'],
      agentTarget: 'project-k8s-automation'
    },
    {
      title: "Unified IAM System",
      description: "Centralized Identity & Access Management using Authentik and OIDC to secure Kubernetes infrastructure and apps.",
      projectLink: "/projects/unified-iam",
      technologies: ['Authentik', 'IAM', 'OIDC', 'Kubernetes', 'Vault'],
      agentTarget: 'project-unified-iam'
    }
  ];

  const allTechnologies = ['All', ...new Set(projects.flatMap(project => project.technologies))];

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
    setActiveFilter('All');
  }, [location.search]);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.technologies.includes(activeFilter));

  return (
    <div className="w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-800">Projects</span>
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Technical projects spanning network engineering, full-stack development,
            and infrastructure automation.
          </motion.p>
        </div>

        {/* Technology Filter Section */}
        <motion.div
          className="mb-12"
          data-agent-target="project-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center p-2 rounded-2xl">
            {allTechnologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
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

        {/* Projects Grid (Masonry using CSS Columns) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
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
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.05,
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
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
              <Database className="w-10 h-10 text-white/20" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-white/50">Try selecting a different technology filter.</p>
          </motion.div>
        )}
    </div>
  );
};

export default Projects;