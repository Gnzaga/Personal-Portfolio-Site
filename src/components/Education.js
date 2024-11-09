// src/components/Education.js

import React from 'react'; // Import React for component creation

/**
 * Education Component
 * 
 * @description Displays the education information of the user, including university details,
 * degree, timeline, and relevant coursework.
 *
 * @returns {JSX.Element} The rendered Education component.
 */
const Education = () => (
  <section className="my-8"> {/* Section container with vertical margin */}
    <h2 className="text-2xl font-bold mb-4">Education</h2> {/* Heading for the section */}
    <p className="text-lg font-semibold">Rutgers University, New Brunswick, NJ</p> {/* University name */}
    <p>Bachelor of Science in Computer Science (August 2020 – May 2024)</p> {/* Degree and timeline */}
    <p>
      Relevant Coursework: Data Structures, Discrete Structures, Computer Architecture, Software Engineering, 
      Design and Analysis of Computer Algorithms, Systems Programming, Data Science, Information and Database Management
    </p> {/* List of relevant courses */}
  </section>
);

export default Education; // Export the component for use in other parts of the app
