import React from 'react';
import { Link } from 'react-router-dom'

//Base button example:\
const ButtonLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      {children}
    </Link>
  );
};

export default ButtonLink;

//explanation on how to use in one line:
// // Import the ButtonLink component
// import ButtonLink from '../components/ButtonLink';
//
// // Use the ButtonLink component
// <ButtonLink to="/about">Learn More</ButtonLink>
// This will render a button that links to the About page with the text "Learn More".
//