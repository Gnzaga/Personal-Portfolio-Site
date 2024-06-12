import React from 'react';

const Projects = () => (
  <section className="my-8">
    <h2 className="text-2xl font-bold mb-4">Projects</h2>
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Task Management Website</h3>
      <p>Java, JavaScript, SQL, React, Spring Boot, HTML, CSS</p>
      <ul className="list-disc list-inside">
        <li>Created a Spring Boot back end API for communication with SQL database, including user authentication, data persistence, and business logic</li>
        <li>Employed asynchronous programming methods to automate sending emails to users each day for task reminders</li>
        <li>Created a Front End JavaScript API using Axios to communicate with our backend server</li>
      </ul>
    </div>
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Discord Bot</h3>
      <p>Python, Asyncio, Discord API, Alpha Vantage API, Web Scraping</p>
      <ul className="list-disc list-inside">
        <li>Incorporated Asynchronous Programming to host adjacent instances of the Wordle game simultaneously, allowing for a 10x increase in the amount of games played</li>
        <li>Interfaced with the Alpha Vantage API to present real-time stock, foreign exchange, and crypto data upon request</li>
        <li>Employed the Asyncio library to manage asynchronous programming within the Python environment</li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Image Library Android App</h3>
      <p>Java, JavaFX, Android SDK, Data Persistence</p>
      <ul className="list-disc list-inside">
        <li>Designed and developed an Android application using Android SDK, Java, and JavaFX, providing a simple and intuitive interface for image library management</li>
        <li>Integrated features for image categorization, tagging, searching, and previewing to enhance user experience</li>
      </ul>
    </div>
  </section>
);

export default Projects;
