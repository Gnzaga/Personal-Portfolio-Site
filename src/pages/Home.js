import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';
import { Link } from 'react-router-dom';
import AnimatedHero from '../components/AnimatedHero';
import ConnectWithMe from '../components/ConnectWithMe';
import StaggeredList from '../components/StaggeredList';

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollPosition > windowHeight * 0.2) {
        setShowContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="custom-scrollbar">
      <AnimatedHero />
      
      {/* Quick Stats Section */}
      <motion.section
        id="stats"
        data-agent-target="quick-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "5+", label: "Years Experience", icon: "📊" },
              { number: "15+", label: "Projects Completed", icon: "🚀" },
              { number: "200+", label: "Team Members Led", icon: "👥" },
              { number: "24/7", label: "Infrastructure Managed", icon: "🔧" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="stat-card group hover:shadow-glow"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stat.number}</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="py-20 bg-white dark:bg-dark-950"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Building the Future of
              <span className="gradient-text"> Secure Infrastructure</span>
            </motion.h2>
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Platform Engineer at Verizon specializing in Anti-Spam Systems.
            </motion.p>
            <motion.p
              className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Architecting next-gen adaptive platforms with AI/ML, agentic automation, and vector search
              to secure 100M+ messaging endpoints.
            </motion.p>
            <div className="section-divider mb-12"></div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto" data-agent-target="action-cards">
              {/* Resume Download Card */}
              <motion.div
                className="card card-hover p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Resume</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  View my experience and skills
                </p>
                <a
                  href={Alessandro_Gonzaga_Resume}
                  download="Alessandro_Gonzaga_Resume.pdf"
                  target='_blank'
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2 text-sm"
                >
                  <span>Download PDF</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>

              {/* Chat Platform Card */}
              <motion.div
                className="card card-hover p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Chat</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Self-hosted with Ollama & OpenWebUI
                </p>
                <a
                  href="https://chat.gnzaga.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center space-x-2 text-sm"
                >
                  <span>Try It Out</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* Connect Section */}
            <div className="mt-12">
              <ConnectWithMe />
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;