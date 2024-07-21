// Home.js
import React from 'react';
//import ServerInfo from '../components/ServerInfo';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to my Portfolio
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          I'm a skilled developer with a passion for creating exceptional
          digital experiences.
        </p>
        <a
          href="/projects"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          View Projects
        </a>
        <div className="mt-8">
          <p className="text-gray-300 text-lg mb-4">
            Connect with me:
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://github.com/gnzaga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/agnzaga/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Email
            </a>
          </div>
        </div>
        {/*
        <div className="mt-8">
          <h2 className="text-lg text-white font-semibold mb-2">
            Check the status of chat.gnzaga.com!
          </h2>
          <ServerInfo />
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;
