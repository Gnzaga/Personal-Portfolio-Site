# Use an official Node.js runtime as the base image
# The 'alpine' version is used for a smaller image footprint.
FROM node:16-alpine AS build

# Set the working directory inside the container
# This is where all subsequent commands will be executed.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
# This ensures npm install is run only when dependencies change, optimizing build caching.
COPY package*.json ./

# Install dependencies using npm
# Installs the necessary packages specified in package.json.
RUN npm install

# Copy the rest of your application code to the container
# This includes all the source files needed for the build.
COPY . .

# Build the React app
# The 'npm run build' command compiles the React application for production.
RUN npm run build

# Expose port 8080 (or the port your server is configured to listen on)
# This informs Docker and other tools that the container will use this port.
EXPOSE 8080

# Start the server using the node command
# This command runs the server script, starting the Node.js server.
CMD ["node", "server.js"]
