import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import StaggeredList from '../components/StaggeredList';
import AnimatedLine from '../components/AnimatedLine';

// Keep the calculateDuration and ExperienceCard components as they were...
const calculateDuration = () => {
  const today = new Date();
  const hireDate = new Date('2024-06-01'); // Replace with your start date
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


const ExperienceCard = ({ title, company, duration, location, type, details }) => (
  <motion.div 
    className="mb-8 bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-700"
    whileHover={{ scale: 1.02 }}
  >
    <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-blue-400 mr-2" />
        <p className="text-gray-300">{company} · {type}</p>
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

const Experience = () => {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setDuration(calculateDuration());
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
            
            <ExperienceCard
              title="Office of Information Technology Level 3 Supervisor"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="Sep 2023 - Jun 2024 · 10 mos"
              location="Piscataway, NJ · On-site"
              details={[
                "Managed transition to a new organizational structure due to a merger with other Rutgers IT offices, helping reduce personnel costs by over 5%.",
                "Supervised and mentored Level 1, Level 2 consultants, and Level 2 Specialists, guiding their technical and professional growth, and providing training to over 200 consultants.",
                "Collaborated closely with full-time staff members on the resolution of IT issues and the management of work and consultants.",
                "Coordinated second-level support, addressing more complex IT issues escalated from Level 1 consultants, and provided application support for University data centers.",
                "Achieved the highest ticket resolution rate as a Level 2 Consultant, handling over 15% of all assigned tickets; reduced personal average resolution time by 20%.",
                "Improved workplace efficiency by creating a simple website for consultants, increasing productivity by 20%."
              ]}
            />

            <ExperienceCard
              title="Office of Information Technology Level 3 Assistant Supervisor"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="Jul 2023 - Sep 2023 · 3 mos"
              location="Piscataway, NJ · On-site"
              details={[
                "Acting as an additional level of support, resolving specialized and complex IT issues that require a comprehensive understanding of Rutgers University's advanced IT systems and infrastructure.",
                "Overseeing the day-to-day operations of the Help Desk, ensuring the team delivers consistent and high-quality service to the Rutgers community.",
                "Supervising and mentoring Level 1 and Level 2 consultants, providing them with direction, technical assistance, and performance feedback.",
                "Serving as a crucial point of contact between Level 1 & Level 2 consultants and Level 3 Supervisors & Full Time Staff, managing effective communication, and streamlining issue escalation processes.",
                "Conducting advanced tech-related workshops and training sessions for consultants and end-users, bolstering their proficiency with sophisticated university IT systems.",
                "Collaborating closely with Level 3 Supervisors and full-time staff members on the resolution of IT issues."
              ]}
            />

            <ExperienceCard
              title="Office of Information Technology Level 2 Specialist"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="May 2023 - Jul 2023 · 3 mos"
              location="Piscataway, NJ · On-site"
              details={[
                "Acting as a second-level support, handling more complex technical issues escalated from Level 1 consultants, requiring a deeper understanding of Rutgers University's IT systems and infrastructure.",
                "Supporting Level 1 consultants by providing information, assistance with problem resolution, and guidance for complex support cases.",
                "Serving as a key point of contact between consultants and supervisory staff, coordinating effective communication and issue escalation.",
                "Contributing to the continuous improvement of support procedures by reviewing resolved cases, identifying patterns, and making suggestions for preventive measures or system enhancements.",
                "Collaborating with other IT teams within Rutgers University on complex, cross-functional issues.",
                "Created a simple website for consultants to use information, templates, and other materials to streamline support and improve efficiency."
              ]}
            />

            <ExperienceCard
              title="Office of Information Technology Level 1 Consultant"
              company="Rutgers University–New Brunswick"
              type="Part-time"
              duration="May 2022 - May 2023 · 1 yr 1 mo"
              location="Piscataway, NJ · On-site"
              details={[
                "Responding to and resolving tech-related queries through multiple channels (email, phone, and in-person), ensuring a high level of customer satisfaction by providing timely and accurate assistance.",
                "Providing first-level troubleshooting for technology issues including but not limited to computer hardware/software, printers, network connectivity, telephone, and other peripheral devices.",
                "Assisting faculty, staff, and students with technology needs such as setting up accounts, resetting passwords, installing software, and configuring devices for university network use.",
                "Documenting, prioritizing, and tracking support cases in the IT service management system, escalating more complex cases to relevant IT specialists when necessary.",
                "Staying updated on the latest advancements in technology relevant to my role and implementing these developments to enhance the quality of the IT support provided."
              ]}
            />
          </StaggeredList>
        </div>
      </div>
    </div>
  );
}

export default Experience;