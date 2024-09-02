// TaskManagementProject.js
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {Link} from 'react-router-dom';

const TaskManagementProject = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Task Management Website
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A robust and scalable web application for task management, featuring a Spring Boot back-end API and a React front-end. The back-end API includes user authentication with JWT tokens, data persistence with a SQL database, and business logic for task management.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          One of the key features of this project is the implementation of asynchronous programming methods to automate sending emails to users each day for task reminders. This was achieved using Spring's scheduling and email sending capabilities, ensuring timely and reliable notifications.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          The front-end was built using React and communicated with the back-end server using Axios, providing a smooth and responsive user experience. The application includes features such as creating, updating, and deleting tasks, setting due dates, and assigning tasks to team members.
        </p>
     

      {/* Add screenshots or other content here */}
      <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://github.com/Gnzaga/TaskManagementProject">
          See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
        </ButtonLink>
        <Link to="/projects">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">
          Back to Projects
        </button>
        </Link>
      </div>
      </div>
     
    </div>
  );
};

export default TaskManagementProject;
