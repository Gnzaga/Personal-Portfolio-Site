import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const GlassButton = ({ children, onClick, className, variant = 'primary', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all backdrop-blur-md flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-green-800/40 hover:bg-green-700/50 border border-green-700/50 text-white shadow-lg shadow-green-950/30",
    secondary: "bg-green-950/40 hover:bg-green-900/50 border border-green-800/20 text-white shadow-md",
    outline: "border-2 border-white/30 text-white hover:bg-white/10",
    ghost: "hover:bg-white/10 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={twMerge(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default GlassButton;
