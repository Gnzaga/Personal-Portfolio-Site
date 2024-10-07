import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onAnimationComplete = () => {
      container.style.opacity = '1';
    };

    container.style.opacity = '0';
    container.addEventListener('animationend', onAnimationComplete, { once: true });

    return () => {
      container.removeEventListener('animationend', onAnimationComplete);
    };
  }, [location.pathname]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;