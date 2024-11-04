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
    <div className="bg-dark-olive text-soft-green min-h-screen">
      {/* Hero Section */}
      <AnimatedHero />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-soft-green mb-4">
              Welcome to My Portfolio
            </h1>
            <p className="text-muted-green text-lg mb-8">
              I'm a multi-disciplined engineer with a passion for technology and problem-solving.
            </p>
          </div>

          {/* Staggered List Section */}
          <StaggeredList>
            {/* Resume Download Section */}
            <a
              href={Alessandro_Gonzaga_Resume}
              download="Alessandro_Gonzaga_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-12 bg-olive-green rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            >
              <p className="text-soft-green text-lg mb-4 text-center">
                Download my current resume:
              </p>
              <div className="flex justify-center">
                <button className="bg-forest-green text-soft-green font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300 hover:bg-dark-olive">
                  Download Resume
                </button>
              </div>
            </a>

            {/* Connect with Me Section */}
            <ConnectWithMe />

            {/* Chat Link Section */}
            <Link to="https://chat.gnzaga.com">
              <div className="mt-12 bg-olive-green rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
                <p className="text-soft-green text-lg font-bold text-center">
                  Visit <span className="text-forest-green">chat.gnzaga.com</span> to chat with me!
                </p>
              </div>
            </Link>
          </StaggeredList>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
