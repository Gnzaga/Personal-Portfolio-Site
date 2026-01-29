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
    className="card p-6 mb-6 group"
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <h2 className="text-xl font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 mb-1">{title}</h2>
        <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm">
          <span>{company}</span>
          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
          <span className="text-gray-500 dark:text-gray-400">{type}</span>
        </div>
      </div>
      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 ml-4 shadow-sm">
        <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-white" />
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500 mr-2 text-xs" />
        <span>{duration}</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 dark:text-gray-500 mr-2 text-xs" />
        <span>{location}</span>
      </div>
    </div>
    <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm leading-relaxed">
      {details.map((detail, index) => (
        <li key={index} className="flex items-start">
          <span className="inline-block h-1.5 w-1.5 bg-primary-500 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
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
    setCurrentDuration(calculateDuration('2025-09-01')); // Calculate duration for Platform Engineer role
    setNetworkEngineerDuration(calculateDuration('2024-06-01', '2025-09-01')); // Calculate duration for Network Engineer role
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 py-24 transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="page-header"
          >
            Professional <span className="gradient-text">Journey</span>
          </motion.h1>
          <motion.p
            className="page-subheader mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Building scalable infrastructure and leading technical teams
          </motion.p>
          <div className="section-divider"></div>
        </div>
        <div className="relative">
          <AnimatedLine delay={0.20} />
          <StaggeredList>
            {/* Platform Engineer, Anti-Spam Systems */}
            <div data-agent-target="experience-1">
            <ExperienceCard
              title="Platform Engineer, Anti-Spam Systems"
              company="Verizon"
              type="Full-time"
              duration={`Sep 2025 - Present · ${currentDuration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "Operate and extend platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks.",
                "Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states).",
                "Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains.",
                "Developed agentic workflow that navigates our environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time.",
                "Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation."
              ]}
            />
            </div>

            {/* Network Engineer Experience */}
            <div data-agent-target="experience-2">
            <ExperienceCard
              title="Network Engineer, Edge & Core Implementation"
              company="Verizon"
              type="Full-time"
              duration={`Jun 2024 - Sep 2025 · ${networkEngineerDuration}`}
              location="Bedminster, NJ · Hybrid"
              details={[
                "Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure.",
                "Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program.",
                "Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site."
              ]}
            />
            </div>

            {/* Rutgers University - Office of Information Technology */}
            <div data-agent-target="experience-3">
            <ExperienceCard
              title="Level 3 Supervisor, Office of Information Technology"
              company="Rutgers University"
              type="Part-time"
              duration="May 2022 - Jun 2024"
              location="Piscataway, NJ"
              details={[
                "Supervised and trained 200+ consultants while managing high-priority technical escalations; achieved top ticket resolution rate with 20% reduction in average response time."
              ]}
            />
            </div>
          </StaggeredList>
        </div>
      </div>
    </div>
  );
};

export default Experience;
