// About.js
import React from 'react';
import { useState, useEffect } from 'react';

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



const Experience = () => {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setDuration(calculateDuration());
  }, []);
  return (
    <div className="container mx-auto px-4 py-16">
     <div>
        <h1 className="text-4xl font-bold text-white mb-4 text-center ">My Experience</h1>
     </div>
      <div className="relative space-y-8 ">
        {/* Line connecting the sections */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-500"></div>

        <div className="relative bg-gray-800 shadow-md rounded-lg p-6 hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Network Engineer</h2>
          <p className="text-gray-300">Verizon · Full-time</p>
          <p className="text-gray-300">{`Jun 2024 - Present · ${duration}`}</p>
          <p className="text-gray-300">Bedminster, New Jersey, United States · Hybrid</p>
          <p className="text-gray-300 mt-4">Skills: Network Architecture · Collaborative Problem Solving · Networking · Strategic Communications · Strategic Planning</p>
        </div>

        <div className="relative bg-gray-800 shadow-md rounded-lg p-6 hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Office of Information Technology Level 3 Supervisor</h2>
          <p className="text-gray-300">Rutgers University–New Brunswick · Part-time</p>
          <p className="text-gray-300">Sep 2023 - Jun 2024 · 10 mos</p>
          <p className="text-gray-300">Piscataway, NJ · On-site</p>
          <ul className="text-gray-300 mt-4 list-disc pl-5">
            <li>Managed transition to a new organizational structure due to a merger with other Rutgers IT offices, becoming a resource for fellow employees to draw from for direction on specialized issues</li>
            <li>Supervised and mentored Level 1, Level 2 consultants, Specialists, and Assistant Supervisors guiding technical and professional growth, providing training to over 200 employees</li>
            <li>Collaborated closely with full-time staff members on the resolution of IT issues and the management of work and consultants</li>
          </ul>
        </div>

        <div className="relative bg-gray-800 shadow-md rounded-lg p-6 hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Office of Information Technology Level 3 Assistant Supervisor</h2>
          <p className="text-gray-300">Rutgers University–New Brunswick · Part-time</p>
          <p className="text-gray-300">Jul 2023 - Sep 2023 · 3 mos</p>
          <p className="text-gray-300">Piscataway, NJ · On-site</p>
          <ul className="text-gray-300 mt-4 list-disc pl-5">
            <li>Acting as an additional level of support, resolving specialized and complex IT issues that require a comprehensive understanding of Rutgers University's advanced IT systems and infrastructure.</li>
            <li>Overseeing the day-to-day operations of the Help Desk, ensuring the team delivers consistent and high-quality service to the Rutgers community.</li>
            <li>Supervising and mentoring Level 1 and Level 2 consultants, providing them with direction, technical assistance, and performance feedback.</li>
            <li>Serving as a crucial point of contact between Level 1 & Level 2 consultants and Level 3 Supervisors & Full Time Staff, managing effective communication, and streamlining issue escalation processes.</li>
            <li>Conducting advanced tech-related workshops and training sessions for consultants and end-users, bolstering their proficiency with sophisticated university IT systems.</li>
            <li>Collaborating closely with Level 3 Supervisors and full-time staff members on the resolution of IT issues.</li>
          </ul>
        </div>

        <div className="relative bg-gray-800 shadow-md rounded-lg p-6 hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2">Office of Information Technology Level 2 Specialist</h2>
          <p className="text-gray-300">Rutgers University–New Brunswick · Part-time</p>
          <p className="text-gray-300">May 2023 - Jul 2023 · 3 mos</p>
          <p className="text-gray-300">Piscataway, NJ · On-site</p>
          <ul className="text-gray-300 mt-4 list-disc pl-5">
            <li>Acting as a second-level support, handling more complex technical issues escalated from Level 1 consultants, requiring a deeper understanding of Rutgers University's IT systems and infrastructure.</li>
            <li>Supporting Level 1 consultants by providing information, assistance with problem resolution, and guidance for complex support cases.</li>
            <li>Serving as a key point of contact between consultants and supervisory staff, coordinating effective communication and issue escalation.</li>
            <li>Contributing to the continuous improvement of support procedures by reviewing resolved cases, identifying patterns, and making suggestions for preventive measures or system enhancements.</li>
            <li>Collaborating with other IT teams within Rutgers University on complex, cross-functional issues.</li>
            <li>Created a simple website for consultants to use information, templates, and other materials to streamline support and improve efficiency.</li>
          </ul>
        </div>

        <div className="relative bg-gray-800 shadow-md rounded-lg p-6 hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold mb-2 ">Office of Information Technology Level 1 Consultant</h2>
          <p className="text-gray-300">Rutgers University–New Brunswick · Part-time</p>
          <p className="text-gray-300">May 2022 - May 2023 · 1 yr 1 mo</p>
          <p className="text-gray-300">Piscataway, NJ · On-site</p>
          <ul className="text-gray-300 mt-4 list-disc pl-5">
            <li>Responding to and resolving tech-related queries through multiple channels (email, phone, and in-person), ensuring a high level of customer satisfaction by providing timely and accurate assistance.</li>
            <li>Providing first-level troubleshooting for technology issues including but not limited to computer hardware/software, printers, network connectivity, telephone, and other peripheral devices.</li>
            <li>Assisting faculty, staff, and students with technology needs such as setting up accounts, resetting passwords, installing software, and configuring devices for university network use.</li>
            <li>Documenting, prioritizing, and tracking support cases in the IT service management system, escalating more complex cases to relevant IT specialists when necessary.</li>
            <li>Staying updated on the latest advancements in technology relevant to my role and implementing these developments to enhance the quality of the IT support provided.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Experience;
