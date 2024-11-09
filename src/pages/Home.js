// src/pages/Experience.js

import React, { useState, useEffect } from 'react'; // Import React, useState, useEffect for state and lifecycle management
import { motion } from 'framer-motion'; // Import motion for animations
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icons
import { faBriefcase, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import relevant icons
import StaggeredList from '../components/StaggeredList'; // Import custom StaggeredList component
import AnimatedLine from '../components/AnimatedLine'; // Import custom AnimatedLine component

/**
 * calculateDuration
 * 
 * @description Calculates the duration of time passed since a given hire date until today.
 * 
 * @returns {string} A formatted string representing the duration in years and months.
 */
const calculateDuration = () => {
  const today = new Date();
  const hireDate = new Date('2024-06-01'); // Replace with the start date
  let years;
  let months;

  if (today.getFullYear() - hireDate.getFullYear() > 0) {
    years = today.getFullYear() - hireDate.getFullYear();
    months = (today.getMonth() + 1) - (hireDate.getMonth() + 1);

    if (months < 0) {
      years -= 1;
      months += 12;
    }
  } else {
    if (today.getMonth() + 1 === hireDate.getMonth() + 1 && today.getDate() >= hireDate.getDate()) {
      const days = today.getDate() - hireDate.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      years = 0;
      months = `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'}`;
    } else {
      return 'less than a year';
    }
  }

  if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'}, ${months} month${months === 1 ? '' : 's'}`;
  } else {
    return `${months} month${months === 1 ? '' : 's'}`;
  }
};

/**
 * ExperienceCard Component
 * 
 * @description Displays details about a specific job role.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The job title.
 * @param {string} props.company - The company name.
 * @param {string} props.duration - The duration of the role.
 * @param {string} props.location - The location of the role.
 * @param {string} props.type - The type of employment (e.g., Full-time).
 * @param {Array<string>} props.details - A list of details about the role.
 * 
 * @returns {JSX.Element} The rendered ExperienceCard component.
 */
const ExperienceCard = ({ title, company, duration, location, type, details }) => (
  <motion.div 
    className="mb-8 bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700"
    whileHover={{ scale: 1.02 }} // Hover animation
  >
    <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-blue-400 mr-2" /> {/* Job icon */}
        <p className="text-gray-300">{company} · {type}</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400 mr-2" /> {/* Calendar icon */}
        <p className="text-gray-300">{duration}</p>
      </div>
    </div>
    <div className="flex items-center mb-4">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-400 mr-2" /> {/* Location icon */}
      <p className="text-gray-300">{location}</p>
    </div>
    <ul className="text-gray-300 mt-4 list-disc pl-5 space-y-2">
      {details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Experience Component
 * 
 * @description The main component displaying the user's work experience with a list of ExperienceCard components.
 * 
 * @returns {JSX.Element} The rendered Experience component.
 */
const Experience = () => {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setDuration(calculateDuration()); // Calculate and set the duration once component mounts
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-24">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Target animation state
          transition={{ duration: 0.5 }} // Animation duration
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          My Professional Journey
        </motion.h1>
        <div className="relative">
          <AnimatedLine delay={0.20} /> {/* Render the animated line */}
          <StaggeredList> {/* StaggeredList for animation */}
            {/* Example of ExperienceCard components */}
            <ExperienceCard
              title="Network Engineer, Edge & Core Implementation"
              company="Verizon"
              type="Full-time"
              duration={`Jun 2024 - Present · ${duration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "Leading automation efforts across Verizon's Edge sites nationwide, spearheading the successful migration of over 20,000 cabinets to a new database, representing over 10% of the national infrastructure.",
                "Led a team of contractors in manually building and configuring level 1 networking equipment across Edge sites nationwide, completing over 2,000 builds in August 2024 alone. Leadership responsibilities include task assignment, training, process development, process automation and issue resolution.",
                "Developed automation tools for generating host names and IDs from existing databases, reducing required time by over 50% and significantly lowering error rates compared to manual processes.",
                "Collaborated with engineers nationwide to address power, space, and cooling needs, fostering more open and efficient communication across regional and national teams.",
                "Worked with internal product owners, developers, and database engineers to address national points of need, including updating processes to reflect national standards, adding missing fields to internal tools, and obtaining tools for automation, validation, and analysis tasks."
              ]}
            />
            {/* Add more ExperienceCard components as needed */}
          </StaggeredList>
        </div>
      </div>
    </div>
  );
};

export default Experience; // Export the component for use in other parts of the app
