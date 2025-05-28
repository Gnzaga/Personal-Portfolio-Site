// src/components/Education.js

import React, { useContext } from 'react'; // Import React for component creation
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext for theme awareness

/**
 * Education Component
 * 
 * @description Displays the education information of the user, including university details,
 * degree, timeline, and relevant coursework.
 * Supports both dark and light themes.
 *
 * @returns {JSX.Element} The rendered Education component.
 */
const Education = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <section className="my-8 transition-colors duration-300"> {/* Section container with vertical margin */}
      <h2 className="text-2xl font-bold mb-4 dark:text-white text-gray-800">Education</h2> {/* Heading for the section */}
      <p className="text-lg font-semibold dark:text-gray-200 text-gray-900">Rutgers University, New Brunswick, NJ</p> {/* University name */}
      <p className="dark:text-gray-300 text-gray-800">Bachelor of Science in Computer Science (August 2020 – May 2024)</p> {/* Degree and timeline */}
      <p className="dark:text-gray-300 text-gray-800">
        Relevant Coursework: Data Structures, Discrete Structures, Computer Architecture, Software Engineering, 
        Design and Analysis of Computer Algorithms, Systems Programming, Data Science, Information and Database Management
      </p> {/* List of relevant courses */}
    </section>
  );
};

export default Education; // Export the component for use in other parts of the app
