import React from 'react';

const Experience = () => (
  <section className="my-8">
    <h2 className="text-2xl font-bold mb-4">Experience</h2>
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Level 3 Supervisor, Office of Information Technology</h3>
      <p>Rutgers University, Piscataway, NJ (July 2023 – Present)</p>
      <ul className="list-disc list-inside">
        <li>Managed transition to a new organizational structure due to a merger with other Rutgers IT offices, helping reduce personnel costs by over 5%</li>
        <li>Supervised and mentored Level 1, Level 2 consultants and Level 2 Specialists, guiding technical and professional growth, providing training to over 200 consultants</li>
        <li>Collaborated closely with full-time staff members on the resolution of IT issues and the management of work and consultants</li>
      </ul>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Level 2 Specialist, Office of Information Technology</h3>
      <p>Rutgers University, Piscataway, NJ (May 2023 – July 2023)</p>
      <ul className="list-disc list-inside">
        <li>Coordinated second-level support, addressing more complex IT issues escalated from Level 1 consultants and provided application support for University data centers</li>
        <li>Achieved the highest ticket resolution rate as a Level 2 Consultant, handling over 15% of all assigned tickets; reduced personal average resolution time by 20% through troubleshooting and effective communication</li>
        <li>Served as a key liaison between lower-level consultants and supervisory staff, reducing resolution time for adjacent consultants by 10%</li>
        <li>Improved workplace efficiency by creating a simple website for consultants to use, with information and templates for issues, increasing productivity by 20%</li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Level 1 Consultant, Office of Information Technology</h3>
      <p>Rutgers University, Piscataway, NJ (May 2022 – May 2023)</p>
      <ul className="list-disc list-inside">
        <li>Acted as a primary point of contact for Rutgers technical support, handling over 50 tickets each week</li>
        <li>Collaborated with team members to quickly solve IT problems with over 90% of tickets resolved after one week</li>
      </ul>
    </div>
  </section>
);

export default Experience;
