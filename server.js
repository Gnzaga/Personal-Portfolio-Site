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
const express = require('express'); // Web framework for building web applications and APIs.
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies.
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing.
const axios = require('axios'); // HTTP client for making HTTP requests.
const path = require('path'); // Utility module for handling and transforming file paths.

// Initialize the Express application
const app = express(); // Creates an Express application instance.
const PORT = process.env.PORT || 8080; // Sets the server port from an environment variable or defaults to 8080.

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

// Optional system message to provide context for the LLM model's responses
const systemMessage = `
You are an AI assistant specifically programmed to be an expert on Alessandro Gonzaga's resume and professional background. Your primary function is to answer questions about Alessandro's education, work experience, skills, and projects. You should not answer questions unrelated to Alessandro's professional life or resume.
...
`;

/**
 * @function chatEndpoint
 * @description Endpoint to handle POST requests to the '/chat' route. It sends the user's message to an external LLM model
 * and streams the response back to the client in real-time.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post('/chat', async (req, res) => {
  console.log('Received POST request to /chat'); // Log indicating that a POST request to /chat was received.
  const { message } = req.body; // Extract the 'message' property from the request body.

  // Validate the input to ensure it is a non-empty string
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' }); // Return a 400 status if validation fails.
  }

  try {
    /**
     * Sends a POST request to the chat API with the specified model and messages.
     * Streams the response data back to the client.
     * 
     * @async
     * @function sendToChatAPI
     * @param {string} systemMessage - The initial system message to guide the model's responses.
     * @param {string} message - The user-provided message to be sent to the LLM model.
     */
    const response = await axios.post(
      'http://192.168.42.38:11434/api/chat', // Endpoint for the chat API.
      {
        model: 'llama3.1', // Specifies the model to be used for the chat.
        messages: [
          { role: 'system', content: systemMessage }, // Includes the system message to provide context.
          { role: 'user', content: message }, // User's input message.
        ],
        stream: true, // Enables streaming mode for real-time response.
      },
      { responseType: 'stream' } // Sets the response type to 'stream' to handle real-time data.
    );

    // Set headers to keep the connection open for streaming data
    res.writeHead(200, {
      'Content-Type': 'text/event-stream', // Sets the content type for server-sent events.
      'Cache-Control': 'no-cache', // Disables caching of the response.
      Connection: 'keep-alive', // Keeps the connection open.
    });

    // Process data chunks from the response
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n'); // Split the data into individual lines.
      for (const line of lines) {
        if (line.trim() !== '') {
          try {
            const parsedLine = JSON.parse(line); // Parse each line as JSON.
            if (parsedLine.message && parsedLine.message.content) {
              // Stream the parsed content to the client
              res.write(
                `data: ${JSON.stringify({
                  message: { content: parsedLine.message.content },
                })}\n\n`
              );
            }
          } catch (error) {
            console.error('Error parsing JSON:', error); // Log any JSON parsing errors.
          }
        }
      }
    });

    // Handle the end of the response stream
    response.data.on('end', () => {
      res.write(`data: [DONE]\n\n`); // Indicates the end of the streaming.
      res.end(); // Ends the HTTP response.
    });
  } catch (error) {
    console.error('Error while generating response:', error); // Log any errors during the response generation.
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
app.use((req, res) => {
  console.log(`No route matched for ${req.method} ${req.url}`); // Logs unmatched routes.
  res.status(404).send('Not Found'); // Returns a 404 status code and message.
});

/**
 * @function startServer
 * @description Starts the Express server and listens on the specified port.
 */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`); // Logs that the server is running and the port it's using.
});
