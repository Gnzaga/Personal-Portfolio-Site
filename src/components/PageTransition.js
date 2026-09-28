// src/components/PageTransition.js

import React from 'react';
import { motion } from 'framer-motion';

/**
 * A short opacity fade on mount — the only page-level motion in the
 * editorial design. MotionConfig in App.js disables it for reduced motion.
 */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="w-full"
  >
    {children}
  </motion.div>
);

export default PageTransition;
