import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLine = ({ delay = 0.5 }) => (
  <motion.div
    className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-500"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: delay }}
    style={{ top: 0, bottom: 0 }}
  />
);

export default AnimatedLine;