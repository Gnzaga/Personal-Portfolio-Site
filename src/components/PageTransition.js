// src/components/PageTransition.js

import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition
 *
 * @description Console-style route change: a 120ms opacity fade, no slide.
 * MotionConfig in App.js drops it entirely under prefers-reduced-motion.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Routed page content.
 * @returns {JSX.Element}
 */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.12, ease: 'linear' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

export default PageTransition;
