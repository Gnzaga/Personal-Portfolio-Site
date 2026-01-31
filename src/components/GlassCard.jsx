import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const GlassCard = ({ children, className, hoverEffect = true, ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.15)' } : {}}
      className={twMerge(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-lg p-6",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;