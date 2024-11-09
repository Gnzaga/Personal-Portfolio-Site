#!/bin/bash

# This script builds a new Docker image, stops and removes the current container,
# and runs a new container with the updated image for a seamless deployment.

# Variables
IMAGE_NAME="react-portfolio"  # The name of the Docker image to be built.
CONTAINER_NAME="my-portfolio" # The name of the Docker container to be run.
PORT="8080"                   # The port number the container should use.

# Build the new Docker image using the Dockerfile in the current directory.
# The '-t' flag tags the image with the specified IMAGE_NAME.
docker build -t $IMAGE_NAME .

# Stop the current running container if it exists.
# This ensures there is no conflict when running the new container.
docker stop $CONTAINER_NAME

# Remove the old container to free up the container name and resources.
docker rm $CONTAINER_NAME

# Run a new container from the newly built image.
# The '-d' flag runs the container in detached mode (in the background).
# The '--name' flag assigns the specified name to the container.
# The '-p' flag maps port 8080 on the host to the PORT variable inside the container.
docker run -d --name $CONTAINER_NAME -p 8080:$PORT $IMAGE_NAME

# Print a message to indicate the update process is complete.
echo "Update deployed successfully."

# Note:
# - This script assumes Docker is already installed and running on your system.
# - To make this script executable, run the following command:
#   sudo chmod +x update.sh
