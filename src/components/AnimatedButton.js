import React from 'react';

const AnimatedButton = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`
        transform transition duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;