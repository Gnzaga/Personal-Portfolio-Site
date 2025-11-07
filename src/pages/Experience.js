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
 * @description Calculates the duration of time passed since a given hire date until today or until an end date.
 *
 * @param {string} startDate - The start date (e.g., '2024-06-01')
 * @param {string} endDate - Optional end date (e.g., '2025-08-01'). If not provided, uses today.
 * @returns {string} A formatted string representing the duration in years and months.
 */
const calculateDuration = (startDate, endDate = null) => {
  const today = endDate ? new Date(endDate) : new Date();
  const hireDate = new Date(startDate);
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
    return `${months}`;
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
    className="card card-hover p-8 mb-8 hover:shadow-xl transition-all duration-300 group"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -8 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{title}</h2>
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <FontAwesomeIcon icon={faBriefcase} className="w-6 h-6 text-white" />
      </div>
    </div>
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-3 space-y-2 md:space-y-0">
      <div className="flex items-center">
        <span className="text-primary-600 dark:text-primary-300 font-medium transition-colors duration-300">
          {company} · {type}
        </span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500 dark:text-green-400 mr-2 transition-colors duration-300" />
        <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{duration}</span>
      </div>
    </div>
    <div className="flex items-center mb-6 text-gray-700 dark:text-gray-300 transition-colors duration-300">
      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 dark:text-red-400 mr-2 transition-colors duration-300" />
      <span>{location}</span>
    </div>
    <ul className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed transition-colors duration-300">
      {details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block h-1.5 w-1.5 bg-primary-400 rounded-full mt-2 mr-2"></span>
          <span>{detail}</span>
        </li>
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
  const [currentDuration, setCurrentDuration] = useState('');
  const [networkEngineerDuration, setNetworkEngineerDuration] = useState('');

  useEffect(() => {
    setCurrentDuration(calculateDuration('2025-08-01')); // Calculate duration for Platform Engineer role
    setNetworkEngineerDuration(calculateDuration('2024-06-01', '2025-08-01')); // Calculate duration for Network Engineer role
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 py-24 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-heading font-bold text-primary-500 dark:gradient-text mb-6"
          >
            My Professional Journey
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        <div className="relative">
          <AnimatedLine delay={0.20} />
          <StaggeredList>
            {/* Platform Engineer, Anti-Spam Systems */}
            <ExperienceCard
              title="Platform Engineer, Anti-Spam Systems"
              company="Verizon"
              type="Full-time"
              duration={`Aug 2025 - Present · ${currentDuration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "Architecting Verizon's internal next-gen adaptive anti-spam platform integrating AI/ML, agentic automation, and vector search to secure 100M+ messaging endpoints across internal and inter-carrier networks.",
                "Delivered full system vision within 2 weeks: designed architecture, identified potential stack (Redis, Milvus, BigQuery, Apache Nifi), and presented a 2-hour technical briefing to AI, Data, and Platform orgs.",
                "Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing large-scale deployment time from 3–4 hours for 6 VMs to 5 minutes for 62 VMs - enabling scalable infrastructure rollout.",
                "Proposed AI/ML-driven techniques to enhance Verizon's Anti-Spam and Abuse posture — evolving detection from defense to an offensive, intelligence-generating system with adversarial simulation and honeypot engagement.",
                "Collaborating across AI/ML, Security, and Platform teams to unify orchestration, streaming data ingestion, and model evaluation pipelines - establishing shared frameworks for feature engineering, explainability, and continuous tuning, backed by senior executive sponsorship."
              ]}
            />

            {/* Network Engineer Experience */}
            <ExperienceCard
              title="Network Engineer, Edge & Core Implementation"
              company="Verizon"
              type="Full-time"
              duration={`Jun 2024 - Aug 2025 · ${networkEngineerDuration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "Led automation efforts across Verizon's Edge sites nationwide, spearheading the development of SOTA Agentic AI tools for assisting Engineers in managing projects and solving problems in edge engineering.",
                "Developed an automation pipeline for site audits from a data perspective, decreasing preparation time by over 90%, resulting in power savings of over $100,000 per year after piloting the audit program.",
                "Completely automated FOA network testing a new VZ service for a cloud service provider using terraform, Ansible, bash scripting and python, reducing test-suite deployment time from 3 hours to a few seconds per site.",
                "Collaborated with engineers nationwide to address power, space, and cooling needs, fostering more open and efficient communication across regional and national teams."
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
