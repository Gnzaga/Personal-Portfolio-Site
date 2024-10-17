// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Use CORS to allow requests from your domain
app.use(
  cors({
    origin: 'https://gnzaga.com',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(bodyParser.json());

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Optional: Define a system message if needed
// const systemMessage = 'You are a helpful assistant.';
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
`;


app.post('/chat', async (req, res) => {
  console.log('Received POST request to /chat');
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message format' });
  }

  try {
    const response = await axios.post(
      'http://192.168.42.38:11434/api/chat',
      {
        model: 'llama3.1',
        messages: [
          // Include the system message if defined
          { role: 'system', content: systemMessage },
          { role: 'user', content: message },
        ],
        stream: true,
      },
      { responseType: 'stream' }
    );

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.trim() !== '') {
          try {
            const parsedLine = JSON.parse(line);
            if (parsedLine.message && parsedLine.message.content) {
              res.write(
                `data: ${JSON.stringify({
                  message: { content: parsedLine.message.content },
                })}\n\n`
              );
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      }
    });

    response.data.on('end', () => {
      res.write(`data: [DONE]\n\n`);
      res.end();
    });
  } catch (error) {
    console.error('Error while generating response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files from the React app (if applicable)
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all route for unmatched routes
app.use((req, res) => {
  console.log(`No route matched for ${req.method} ${req.url}`);
  res.status(404).send('Not Found');
});

// Start HTTP server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
