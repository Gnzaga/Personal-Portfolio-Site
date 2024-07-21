// TaskManagementProject.js
import React from 'react';

const TaskManagementProject = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Task Management Website
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A robust and scalable web application for task management, featuring a Spring Boot back-end API and a React front-end. The back-end API includes user authentication with JWT tokens, data persistence with a SQL database, and business logic for task management.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          One of the key features of this project is the implementation of asynchronous programming methods to automate sending emails to users each day for task reminders. This was achieved using Spring's scheduling and email sending capabilities, ensuring timely and reliable notifications.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          The front-end was built using React and communicated with the back-end server using Axios, providing a smooth and responsive user experience. The application includes features such as creating, updating, and deleting tasks, setting due dates, and assigning tasks to team members.
        </p>
        {/* Add screenshots or other content here */}
      </div>
    </div>
  );
};

export default TaskManagementProject;