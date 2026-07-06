// server.js

/**
 * @file server.js
 * @description This file sets up an Express server with a chat API endpoint that uses an LLM model for generating responses. 
 * It includes middleware for CORS, body parsing, request logging, and serves static files.
 * The server is designed to stream responses in real-time.
 * 
 * @author Alessandro Gonzaga
 * @version 1.0.0
 */

// Import the required modules
require('dotenv').config(); // Loads environment variables from a .env file into process.env
const express = require('express'); // Web framework for building web applications and APIs.
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies.
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing.
const axios = require('axios'); // HTTP client for making HTTP requests.
const path = require('path'); // Utility module for handling and transforming file paths.
const fs = require('fs'); // File system module for reading and writing files.
const { createChatMiddleware } = require('@shippilot/core/server');
const siteGraph = require('./src/shippilot/site-graph.json');
// Initialize the Express application
const app = express(); // Creates an Express application instance.
const PORT = process.env.PORT || 8080; // Sets the server port from an environment variable or defaults to 8080.
const LLM_API_URL = process.env.LLM_API_URL || 'http://10.100.0.215/api/chat/completions'; // LLM API endpoint

/**
 * @function useCors
 * @description Configures the CORS middleware to restrict access to a specific domain.
 */
app.use(
  cors({
    origin: 'https://gnzaga.com', // Only allow requests from this domain.
    methods: ['POST', 'GET', 'OPTIONS'], // Allowed HTTP methods.
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitted in the request.
  })
);

/**
 * @function useBodyParser
 * @description Enables body-parser middleware for parsing JSON-formatted request bodies.
 */
app.use(bodyParser.json()); // Enables parsing of JSON-formatted request bodies.

app.use(express.json());
/**
 * @middleware logRequests
 * @description Middleware to log all incoming HTTP requests for monitoring and debugging purposes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - Callback to proceed to the next middleware or route handler.
 */
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`); // Logs the HTTP method and URL of the incoming request.
  next(); // Proceeds to the next middleware or route handler.
});

const { systemMessage, buildSystemPrompt } = require('./src/utils/promptBuilder');

// ShipPilot chat endpoint — replaces hand-rolled LLM proxy
app.post('/chat', createChatMiddleware({
  model: {
    endpoint: LLM_API_URL,
    apiKey: process.env.BEARER_TOKEN || '',
    modelName: process.env.LLM_MODEL || 'gnzaga',
  },
  siteGraph,
  siteContext: "Alessandro Gonzaga's personal portfolio site. Full-stack engineer with a focus on TypeScript, React, Kubernetes, and homelab infrastructure. Shows projects, blog posts, and professional experience.",
  maxHistoryMessages: 10,
}));

/**
 * @function loadModelEndpoint
 * @description Endpoint to handle POST requests to the '/load-model' route. It sends an empty request to the chat API
 * to pre-load the model for faster response times when the user sends a message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/load-model', async (req, res) => {
    console.log('Received POST request to /load-model'); // Log indicating that a POST request to /load-model was received.

    try {
        // Sends a POST request to the chat API with the system message to pre-load the model
        const response = await axios.post(
            LLM_API_URL,
            {
                model: 'Gnzaga', // Specifies the model to be used for the chat.
                messages: [
                    { role: 'system', content: systemMessage }, // Includes the system message to provide context.
                ],
                stream: false, // Disables streaming mode for this request.
            },
            {
                headers: {
                    'Authorization': process.env.BEARER_TOKEN, // <-- already includes "Bearer " prefix
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ message: 'Model pre-loaded successfully' }); // Return a 200 status if the model is pre-loaded successfully.
    } catch (error) {
        console.error('Error while pre-loading model:', error); // Log any errors during the model pre-loading.
        res.status(500).json({ error: 'Internal Server Error' }); // Return a 500 status code for server errors.
    }
});



/**
 * @function serveStaticFiles
 * @description Middleware to serve static files if a React frontend is used.
 */
app.use(express.static(path.join(__dirname, 'build'))); // Serves files from the 'build' directory.

/**
 * @function catchAllRoute
 * @description A catch-all route to handle unmatched routes and return a 404 error.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  } else {
    res.status(404).send({ error: 'API route not found' });
  }
});


/**
 * @function startServer
 * @description Starts the Express server and listens on the specified port.
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`); // Logs that the server is running and the port it's using.
});
