// DiscordBotProject.js
import React from 'react';

const DiscordBotProject = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Discord Bot
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          A versatile Discord bot built with Python, featuring various engaging features. One of the standout features is the implementation of asynchronous programming to host multiple instances of the Wordle game simultaneously, allowing for a 10x increase in the number of games played concurrently.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          The bot also interfaces with the Alpha Vantage API to provide real-time stock, foreign exchange, and cryptocurrency data upon request. This feature is particularly useful for users interested in staying up-to-date with market trends and making informed investment decisions.
        </p>
        <p className="text-gray-300 text-lg mb-8">
          To manage asynchronous programming within the Python environment, the project employed the Asyncio library, ensuring efficient handling of concurrent tasks and optimal performance.
        </p>
        {/* Add screenshots or other content here */}
      </div>
    </div>
  );
};

export default DiscordBotProject;