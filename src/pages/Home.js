import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Alessandro_Gonzaga_Resume from '../res/Alessandro_Gonzaga_Resume.pdf';
import { Link } from 'react-router-dom';
import AnimatedHero from '../components/AnimatedHero';
import ConnectWithMe from '../components/ConnectWithMe';
import FadeInSection from '../components/FadeInSection';
import StaggeredList from '../components/StaggeredList';
import AnimatedButton from '../components/AnimatedButton';
import PageTransition from '../components/PageTransition';
import Chatbot from '../components/ChatBot';

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
    <div>
      <AnimatedHero />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to my Portfolio
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              I'm a multi-disciplined engineer with a passion for technology and problem solving.
            </p>
            <StaggeredList>
            {/* Resume Download Section */}
            <a
              href={Alessandro_Gonzaga_Resume}
              download="Alessandro_Gonzaga_Resume.pdf"
              target='_blank'
              rel="noopener noreferrer"
            >
              <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300">
                <p className="text-gray-300 text-lg mb-4 text-center">
                  Download my current resume:
                </p>
                <div className="flex justify-center">
                  <button className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 font-semibold py-2 px-4 rounded-md shadow-md">
                    Download Resume
                  </button>
                </div>
              </div>
            </a>

            {/* Enhanced Connect with Me Section */}
            
            <ConnectWithMe />


            <Link to="https://chat.gnzaga.com">
              <div className="mt-12 bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 duration-300">
                <p className="text-gray-300 text-lg font-bold text-center">
                  Click for <a href="https://chat.gnzaga.com"> chat.gnzaga.com </a>
                </p>
              </div>
            </Link>
            </StaggeredList>
          </div>
        </div>
      </motion.div>
      
    </div>
  );
};

export default Home;