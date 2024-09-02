// ChatGnzagaProject.js
import React from 'react';
import ButtonLink from '../components/ButtonLink';
import { Link } from 'react-router-dom';

const ChatGnzagaProject = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          <a href="chat.gnzga.com" > chat.gnzaga.com </a>
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A self-hosted Ollama web interface powered by Docker, providing a seamless and efficient way to interact with OpenAI's language models. This project showcases expertise in containerization, networking, and infrastructure management.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          The Ollama interface was deployed using Docker, ensuring consistent and reproducible deployments across different environments. The project also involved configuring Nginx as a reverse proxy to handle incoming requests and route them to the appropriate containers.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          To ensure accessibility from the internet, the necessary networking knowledge was applied to configure port forwarding and secure the communication channels. As an admin, ongoing maintenance and user management tasks are performed to ensure a smooth and reliable experience for all users.
        </p>
        {/* Add screenshots or other content here */}
        <div className="mt-12 text-center space-x-4">
        <ButtonLink to="https://chat.gnzaga.com"> Go to chat.gnzaga.com! </ButtonLink>
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

export default ChatGnzagaProject;