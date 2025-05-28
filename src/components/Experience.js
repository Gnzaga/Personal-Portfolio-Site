// src/components/Experience.js

import React, { useState, useEffect } from 'react'; // Import React and hooks for component logic
import { motion } from 'framer-motion'; // Import motion for animations
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon for icon rendering
import { faBriefcase, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // Import specific icons
import StaggeredList from './StaggeredList'; // Import StaggeredList component
import AnimatedLine from './AnimatedLine'; // Import AnimatedLine component

/**
 * Function to calculate the duration since a given hire date.
 * 
 * @returns {string} The formatted duration string (e.g., "1 year, 2 months").
 */
const calculateDuration = () => {
  const today = new Date();
  const hireDate = new Date('2024-06-01');
  let years = today.getFullYear() - hireDate.getFullYear();
  let months = today.getMonth() - hireDate.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < hireDate.getDate())) {
    years--;
    months += 12;
  }

  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
  }
};

/**
 * ExperienceCard Component
 * 
 * @description A card component that displays detailed information about a job experience.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The job title.
 * @param {string} props.company - The company name.
 * @param {string} props.duration - The duration of the job.
 * @param {string} props.location - The job location.
 * @param {string} props.type - The job type (e.g., Full-time, Part-time).
 * @param {Array<string>} props.details - The list of job responsibilities or achievements.
 * 
 * @returns {JSX.Element} The rendered ExperienceCard component.
 */
const ExperienceCard = ({ title, company, duration, location, type, details }) => (
  <motion.div 
    className="mb-8 card p-8 hover:shadow-2xl transition-all duration-300 card-hover"
    whileHover={{ scale: 1.02 }} // Slight scaling effect on hover
  >
    <h2 className="text-2xl font-heading font-bold mb-4 text-dark-800 dark:text-white transition-colors duration-300">{title}</h2>
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-3 space-y-2 lg:space-y-0">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-primary-500 dark:text-primary-400 mr-2 transition-colors duration-300" />
        <p className="text-gray-800 dark:text-gray-300 font-medium transition-colors duration-300">{company} · {type}</p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500 dark:text-primary-400 mr-2 transition-colors duration-300" />
        <p className="text-gray-800 dark:text-gray-300 font-medium transition-colors duration-300">{duration}</p>
      </div>
    </div>
    <div className="flex items-center mb-6">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary-500 dark:text-primary-400 mr-2 transition-colors duration-300" />
      <p className="text-gray-800 dark:text-gray-300 font-medium transition-colors duration-300">{location}</p>
    </div>
    <ul className="text-gray-900 dark:text-gray-300 mt-4 list-disc pl-5 space-y-3 leading-relaxed transition-colors duration-300">
      {details.map((detail, index) => (
        <li key={index} className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">{detail}</li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Experience Component
 * 
 * @description The main container for displaying all job experiences. It uses the ExperienceCard component to render each job.
 *
 * @returns {JSX.Element} The rendered Experience component.
 */
const Experience = () => {
  const [duration, setDuration] = useState(''); // State to store calculated job duration

  // Calculate job duration on component mount
  useEffect(() => {
    setDuration(calculateDuration());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 from-gray-50 to-accent-100 py-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
            className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6"
          >
            My Professional Journey
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        <div className="relative">
          <AnimatedLine delay={0.20} />
          <StaggeredList>
            {/* ExperienceCard components for job positions */}
            <ExperienceCard
              title="Network Engineer, Edge & Core Implementation"
              company="Verizon"
              type="Full-time"
              duration={`Jun 2024 - Present · ${duration}`}
              location="Bedminster, New Jersey, United States · Hybrid"
              details={[
                "Leading automation efforts across Verizon's Edge sites nationwide, spearheading the successful migration of over 20,000 cabinets to a new database, representing over 10% of the national infrastructure.",
                "Led a team of contractors in manually building and configuring level 1 networking equipment across Edge sites nationwide, completing over 2,000 builds in August 2024 alone.",
                "Developed automation tools for generating host names and IDs from existing databases, reducing required time by over 50% and significantly lowering error rates compared to manual processes.",
                "Collaborated with engineers nationwide to address power, space, and cooling needs, fostering more open and efficient communication across regional and national teams.",
                "Worked with internal product owners, developers, and database engineers to address national points of need, including updating processes to reflect national standards."
              ]}
            />
            
            <ExperienceCard
              title="Office of Information Technology Level 3 Supervisor"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="Sep 2023 - Jun 2024 · 10 mos"
              location="Piscataway, NJ · On-site"
              details={[
                "Managed transition to a new organizational structure due to a merger with other Rutgers IT offices.",
                "Supervised and mentored Level 1, Level 2 consultants, Specialists, and Assistant Supervisors, providing training to over 200 employees.",
                "Collaborated closely with full-time staff members on the resolution of IT issues and the management of work and consultants."
              ]}
            />

            {/* Add more ExperienceCard components as needed */}
          </StaggeredList>
        </div>
      </div>
    </div>
  );
}

export default Experience; // Export the component for use in other parts of the app
