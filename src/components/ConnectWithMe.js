import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ConnectWithMe = () => {
  return (
    <div className="mt-12 bg-olive-green rounded-lg shadow-lg p-6 hover:scale-105 duration-300">
      <h2 className="text-3xl font-bold text-soft-green mb-6 text-center">Connect with Me</h2>
      <p className="text-muted-green text-lg mb-8 text-center">
        I'm always excited to collaborate on new projects, share ideas, or just have a chat about technology. Feel free to reach out through any of the platforms below!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <a
          href="https://github.com/gnzaga"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-dark-olive rounded-lg hover:bg-forest-green transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faGithub} className="text-3xl text-soft-green mb-2" />
          <h3 className="text-xl font-semibold text-soft-green">GitHub</h3>
          <p className="text-muted-green text-center">Check out my code</p>
        </a>
        <a
          href="https://www.linkedin.com/in/agnzaga/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-4 bg-dark-olive rounded-lg hover:bg-forest-green transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-3xl text-soft-green mb-2" />
          <h3 className="text-xl font-semibold text-soft-green">LinkedIn</h3>
          <p className="text-muted-green text-center">Let's connect professionally</p>
        </a>
        <a
          href="mailto:alessandromg02@gmail.com"
          className="flex flex-col items-center justify-center p-4 bg-dark-olive rounded-lg hover:bg-forest-green transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-soft-green mb-2" />
          <h3 className="text-xl font-semibold text-soft-green">Email</h3>
          <p className="text-muted-green text-center">Send me a message</p>
        </a>
      </div>
    </div>
  );
};

export default ConnectWithMe;
