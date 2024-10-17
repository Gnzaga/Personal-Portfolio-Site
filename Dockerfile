# Use an official Node.js runtime as the base image
FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 8080 (or whichever port your server listens on)
EXPOSE 8080

# Start the server using CMD
CMD ["node", "server.js"]
