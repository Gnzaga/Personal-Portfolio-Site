import React from 'react';
import StaggeredList from '../components/StaggeredList';
import SkillsComponent from '../components/SkillsComponent';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <div className="container mx-auto px-6 py-24 space-y-12 custom-scrollbar">
      <StaggeredList>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-heading font-bold gradient-text mb-6 text-primary-500">About Me</h1>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Introduction Section */}
        <div className="card p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-heading font-semibold text-dark-800 dark:text-white mb-4 transition-colors duration-300">
                Passionate Technology Professional
              </h2>
              <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                I am Alessandro Gonzaga, a dedicated and skilled IT professional with a strong foundation in computer science. 
                My experience ranges from leadership roles at Rutgers University's Office of Information Technology to my current 
                position as a Network Engineer at Verizon. I thrive on leveraging my technical expertise and leadership skills 
                to drive innovation in network engineering.
              </p>
            </div>
            <div className="md:w-1/3">
              <div className="w-48 h-48 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Current Role Section */}
        <div className="card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-heading font-semibold text-primary-400 mb-4">
                Current Role at Verizon
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                At Verizon, I lead automation efforts for nationwide projects, successfully deploying hardware at scale 
                to support industry-leading infrastructure. My work includes designing tools with Python and SQL to 
                streamline processes, reduce errors, and accelerate timelines.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Nationwide Project Leadership</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Infrastructure Automation</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Cross-functional Collaboration</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Process Standardization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Component */}
        <SkillsComponent />

        {/* Leadership Experience */}
        <div className="card p-8 md:p-12">
          <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6 text-center transition-colors duration-300">
            Leadership & Mentorship
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Team Management</h4>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Supervised over 200+ consultants at Rutgers University</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Technical Training</h4>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Conducted advanced technical workshops and mentoring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">Problem Solving</h4>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">Resolved complex IT issues and organizational transitions</p>
            </div>
          </div>
        </div>

        {/* Technical Expertise */}
        <div className="card p-8 md:p-12">
          <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Technical Expertise</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-primary-400 mb-4">Core Specializations</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                  <span>Automation & Containerization</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                  <span>Infrastructure Management</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                  <span>Network Engineering</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-accent-400 rounded-full"></span>
                  <span>Multi-access Edge Compute</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-400 mb-4">Development Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'JavaScript', 'React', 'SQL', 'Docker', 'Git', 'Nginx'].map((skill) => (
                  <span key={skill} className="bg-gray-300 dark:bg-dark-700 text-gray-800 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </StaggeredList>
    </div>
    </div>
  );
};

export default About;
