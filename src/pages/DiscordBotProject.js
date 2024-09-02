// DiscordBotProject.js
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const DiscordBotProject = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-8">
      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-4xl font-bold text-white mb-4">
          Discord Bot 
        </h1>
      
        <p className="text-gray-300 text-lg mb-8">
          A versatile Discord bot built with Python, featuring various engaging features. One of the standout features is the implementation of asynchronous programming to host multiple instances of the Wordle game simultaneously, allowing for a 10x increase in the number of games played concurrently.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          The bot also interfaces with the Alpha Vantage API to provide real-time stock, foreign exchange, and cryptocurrency data upon request. This feature is particularly useful for users interested in staying up-to-date with market trends and making informed investment decisions.
        </p>
      </div>

      <div className="bg-gray-800 shadow-md rounded-lg p-6">
        <p className="text-gray-300 text-lg mb-8">
          To manage asynchronous programming within the Python environment, the project employed the Asyncio library, ensuring efficient handling of concurrent tasks and optimal performance.
        </p>

        <div className="mt-12 text-center space-x-4">
          <ButtonLink to="https://github.com/Gnzaga/DiscordBot">
            See on GitHub <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
          </ButtonLink>
          <Link to="/projects">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
      {/*add space before button which is centered*/}
    
        
      
    </div>
  );
};

export default DiscordBotProject;
