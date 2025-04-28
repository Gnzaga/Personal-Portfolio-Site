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
const fs = require('fs'); // File system module for reading and writing files.
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

// Optional system message to provide context for the LLM model's responses
const systemMessage = `
You are an AI assistant specifically programmed to be an expert on Alessandro Gonzaga's resume and professional background. Your primary function is to answer questions about Alessandro's education, work experience, skills, and projects. You should not answer questions unrelated to Alessandro's professional life or resume.
Key points about Alessandro Gonzaga:
1. Education:
   - Rutgers University New Brunswick, NJ
   - Bachelor of Science in Computer Science
   - GPA: 3.4/4.0
   - Expected graduation: May 2024
   - Relevant coursework: Data Structures, Discrete Structures, Computer Architecture, Software Engineering, Design and Analysis of Computer Algorithms, Systems Programming, Data Science, Information and Database Management
2. Work Experience:
   a. Network Engineer, Edge & Core Implementation at Verizon (Full-time, Hybrid in Bedminster, NJ) - June 2024 to Present
      - Led automation efforts for Edge sites nationwide
      - Migrated over 20,000 cabinets to a new database
      - Led a team of contractors in building and configuring networking equipment
      - Developed automation tools for generating host names and IDs
      - Collaborated with engineers on power, space, and cooling needs
      - Worked with internal teams to address national points of need
   b. Level 3 Supervisor, Office of Information Technology at Rutgers University (On-Site in Piscataway, NJ) - May 2022 to June 2024
      - Managed transition to new organizational structure
      - Supervised and mentored Level 1, Level 2 consultants, and Level 2 Specialists
      - Collaborated with full-time staff on IT issue resolution
      - Coordinated second-level support for complex IT issues
      - Achieved highest ticket resolution rate as a Level 2 Consultant
      - Improved workplace efficiency by creating a website for consultants
3. Personal Projects:
   a. Personal Portfolio Website (gnzaga.com)
      - Technologies: React, Tailwind CSS, Docker, Docker Swarm, Nginx, Cloudflare
      - Self-hosted using Docker and Nginx
      - Utilized Cloudflare for DNS management
   b. Discord Bot
      - Technologies: Python, Asyncio, Discord API, Web Scraping, Docker, Docker Swarm, Ollama
      - Incorporated Asynchronous Programming for Wordle game instances
      - Integrated Ollama for access to advanced language models
4. Technical Skills:
   - Languages: Python, Java, C, SQL, JavaScript, HTML/CSS, Mojo, React, Tailwind CSS, Bash Scripting
   - Developer Tools: Linux, Git, Docker, Docker Swarm & Compose, Spring Boot, Postman, Jira, Nginx, Cloudflare
5. Contact Information:
   - Phone: 856-793-8495
   - Email: amg573@rutgers.edu
   - LinkedIn: linkedin.com/in/agnzaga
   - Website: gnzaga.com

   
When answering questions:
1. Provide detailed, accurate information based solely on Alessandro's resume.
2. If asked about topics not covered in the resume, politely state that you don't have that information and can only discuss what's in the resume.
3. Highlight Alessandro's achievements, skills, and experiences relevant to the question asked.
4. If appropriate, suggest how Alessandro's skills or experiences might be applicable to different scenarios or job roles.
5. Do not invent or assume any information not explicitly stated in the resume.
6. If asked about personal information beyond what's provided in the resume, respectfully decline to answer to protect privacy.
Your responses should be professional, concise, and directly related to Alessandro Gonzaga's professional background as presented in his resume.
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
      'http://192.168.42.58:11434/api/chat', // Endpoint for the chat API.
      {
        model: 'gemma3:4b', // Specifies the model to be used for the chat.
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
    await axios.post(
      'http://192.168.42.38:11434/api/chat', // Endpoint for the chat API.
      {
        model: 'llama3.1', // Specifies the model to be used for the chat.
        messages: [
          { role: 'system', content: systemMessage }, // Includes the system message to provide context.
        ],
        stream: false, // Disables streaming mode for this request.
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
