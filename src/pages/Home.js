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
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gray-100/80 dark:bg-dark-800/50 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5+", label: "Years Experience" },
              { number: "15+", label: "Projects Completed" },
              { number: "200+", label: "Team Members Led" },
              { number: "24/7", label: "Infrastructure Managed" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="glass-dark p-6 rounded-xl"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300">{stat.label}</div>
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
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Welcome to my Portfolio
            </motion.h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 text-lg md:text-xl mb-12 leading-relaxed transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              I'm a Platform Engineer at Verizon specializing in Anti-Spam Systems, architecting next-gen
              adaptive platforms with AI/ML, agentic automation, and vector search to secure 100M+ messaging endpoints.
              I'm passionate about building scalable infrastructure, automation, and leveraging cutting-edge technology
              to solve complex security challenges.
            </motion.p>

            <StaggeredList>
              {/* Enhanced Resume Download Section */}
              <motion.div
                className="card card-hover p-8 mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Download My Resume</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
                  Get a comprehensive overview of my experience, skills, and achievements
                </p>
                <a
                  href={Alessandro_Gonzaga_Resume}
                  download="Alessandro_Gonzaga_Resume.pdf"
                  target='_blank'
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <span>Download Resume</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>

              {/* Enhanced Connect Section */}
              <ConnectWithMe />

              {/* Chat Platform Highlight */}
              <motion.div
                className="card card-hover p-8"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Try My Chat Platform</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 transition-colors duration-300">
                  Experience my self hosted chat powered by Ollama and OpenWebUI
                </p>
                <a
                  href="https://chat.gnzaga.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <span>Visit chat.gnzaga.com</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </motion.div>
            </StaggeredList>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;