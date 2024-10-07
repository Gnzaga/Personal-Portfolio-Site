import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AnimatedHero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-4 text-center"
      >
        Alessandro Gonzaga
      </motion.h1>
<motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-xl text-gray-300 mb-8 text-center"
  >
    <span className="md:inline block">Network Engineer | Full Stack Developer</span>
    <span className="md:inline md:before:content-['\a0|\a0'] block">Problem Solver</span>
  </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8"
      >
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className="text-2xl animate-bounce" 
        />
      </motion.div>
    </div>
  );
};

export default AnimatedHero;