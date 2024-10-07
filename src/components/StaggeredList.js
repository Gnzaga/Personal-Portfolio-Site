import React from 'react';
import { motion } from 'framer-motion';

const StaggeredList = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          className={index > 0 ? 'mt-8' : ''}  // Add top margin to all but the first child
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredList;