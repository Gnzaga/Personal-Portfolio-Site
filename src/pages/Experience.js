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
    if (
      today.getMonth() + 1 === hireDate.getMonth() + 1 &&
      today.getDate() >= hireDate.getDate()
    ) {
      const days = today.getDate() - hireDate.getDate();

      if (days < 0) {
        months -= 1;
        // Adjust days if needed, though it's unlikely we'd handle day-based calculations here
      }

      years = 0;
      months = `${Math.floor(days / 30)} month${
        Math.floor(days / 30) === 1 ? '' : 's'
      }`;
    } else {
      return 'less than a year';
    }
  }

  if (years > 0) {
    return `${years} year${years === 1 ? '' : 's'}, ${months} month${
      months === 1 ? '' : 's'
    }`;
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
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-2 space-y-2 md:space-y-0">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-blue-400 mr-2" />
        <p className="text-gray-300">
          {company} · {type}
        </p>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400 mr-2" />
        <p className="text-gray-300">{duration}</p>
      </div>
    </div>
    <div className="flex items-center mb-4">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-400 mr-2" />
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          My Professional Journey
        </motion.h1>
        <div className="relative">
          <AnimatedLine delay={0.20} />
          <StaggeredList>
            {/* Verizon Experience */}
            <ExperienceCard
              title="Network Engineer | Multi-Access Edge Compute & Edge Core Implementation"
              company="Verizon"
              type="Full-time"
              duration={`Jun 2024 - Present · ${duration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "As a member of Verizon's MECI team, contributing to nationwide projects deploying hardware at scale to support Verizon's industry-leading network and MEC clients.",
                "Leading automation efforts across Verizon's Edge sites nationwide, including the successful migration of over 10% of our national infrastructure to a new database.",
                "Working in a leadership capacity with a team of contractors to manually build and configure level 1 networking equipment across Edge sites, with over 2,000 builds completed in August 2024 alone.",
                "Developed automation tools for generating hostnames and IDs from existing databases, reducing required time by over 50% while significantly lowering error rates compared to manual processes.",
                "Designed and implemented custom data processing tools using SQL and Python, enabling national data center inventory audits to reduce data preparation timelines by over 95%.",
                "Collaborated with internal product owners, developers, and database engineers to address national points of need, including adding missing fields to internal tools, updating processes to reflect national standards, and obtaining tools for automation, validation, and analysis tasks.",
                "Supported nationwide Multi-access Edge Compute (MEC) deployments by coordinating planning efforts, ensuring cross-team collaboration, overseeing L1 equipment installation, and aligning with organizational standards."
              ]}
            />

            {/* Rutgers University - Office of Information Technology Level 3 Supervisor */}
            <ExperienceCard
              title="Office of Information Technology Level 3 Supervisor"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="Sep 2023 - Jun 2024"
              location="Piscataway, NJ"
              details={[
                "Managed transition to a new organizational structure due to a merger with other Rutgers IT offices, becoming a key resource for specialized issues.",
                "Supervised and mentored Level 1, Level 2 consultants, Specialists, and Assistant Supervisors, providing training and guidance for over 200 employees.",
                "Collaborated closely with full-time staff members on complex IT issue resolution, workflow management, and consultant oversight."
              ]}
            />

            {/* Rutgers University - Office of Information Technology Level 3 Assistant Supervisor */}
            <ExperienceCard
              title="Office of Information Technology Level 3 Assistant Supervisor"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="Jul 2023 - Sep 2023"
              location="Piscataway, NJ"
              details={[
                "Acted as an additional level of support, resolving specialized and complex IT issues requiring a comprehensive understanding of Rutgers University's IT systems.",
                "Oversaw day-to-day operations of the Help Desk to ensure high-quality service delivery and team efficiency.",
                "Supervised and mentored Level 1 and Level 2 consultants, offering technical assistance and performance feedback.",
                "Served as a crucial point of contact between consultants and Level 3 Supervisors & Full-Time Staff, streamlining issue escalation processes.",
                "Conducted advanced tech-related workshops and training sessions for consultants and end-users."
              ]}
            />

            {/* Rutgers University - Office of Information Technology Level 2 Specialist */}
            <ExperienceCard
              title="Office of Information Technology Level 2 Specialist"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="May 2023 - Jul 2023"
              location="Piscataway, NJ"
              details={[
                "Acted as second-level support, handling more complex technical issues escalated from Level 1 consultants.",
                "Provided guidance and problem resolution assistance for Level 1 consultants, improving efficiency and knowledge transfer.",
                "Served as a key point of contact between consultants and supervisory staff, ensuring effective communication.",
                "Contributed to continuous improvement of support procedures by reviewing resolved cases, identifying patterns, and recommending system enhancements.",
                "Collaborated with other IT teams across Rutgers University on complex, cross-functional issues.",
                "Created a simple website to provide consultants with information, templates, and resources to streamline support."
              ]}
            />

            {/* Rutgers University - Office of Information Technology Level 1 Consultant */}
            <ExperienceCard
              title="Office of Information Technology Level 1 Consultant"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="May 2022 - May 2023"
              location="Piscataway, New Jersey, United States"
              details={[
                "Responded to and resolved tech-related queries through multiple channels (email, phone, and in-person), ensuring a high level of customer satisfaction.",
                "Provided first-level troubleshooting for hardware, software, and network issues, including printers and other peripherals.",
                "Assisted faculty, staff, and students with setting up accounts, resetting passwords, installing software, and configuring devices for the university network.",
                "Documented and tracked support cases in the IT service management system, escalating more complex cases as needed.",
                "Stayed updated on the latest developments in technology relevant to the role, enhancing the quality of IT support provided."
              ]}
            />
          </StaggeredList>
        </div>
      </div>
    </div>
  );
};

export default Experience;
