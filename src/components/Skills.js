// src/components/Skills.js

import React from 'react'; // Import React for component creation

/**
 * Skills Component
 * 
 * @description A component that displays a list of technical skills including programming languages and developer tools.
 *
 * @returns {JSX.Element} The rendered Skills component.
 */
const Skills = () => (
  <section className="my-8"> {/* Container with vertical margin */}
    <h2 className="text-2xl font-bold mb-4">Technical Skills</h2> {/* Main heading for the skills section */}
    <ul className="list-disc list-inside"> {/* Unordered list with disc markers inside */}
      <li>Languages: Python, Java, C, SQL, JavaScript, HTML/CSS, Mojo, React</li> {/* List item for programming languages */}
      <li>Developer Tools: Linux, Windows, Git, Android SDK, Docker, Spring Boot, Postman, JUnit, Jira</li> {/* List item for developer tools */}
    </ul>
  </section>
);

export default Skills; // Export the component for use in other parts of the app
