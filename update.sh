#!/bin/bash

# Variables
IMAGE_NAME="react-portfolio"
CONTAINER_NAME="my-portfolio"
PORT="8080"

# Build the new Docker image
docker build -t $IMAGE_NAME .

# Stop the current container
docker stop $CONTAINER_NAME

# Remove the old container
docker rm $CONTAINER_NAME

# Run a new container with the updated image
docker run -d --name $CONTAINER_NAME -p 8080:$PORT $IMAGE_NAME

echo "Update deployed successfully."

#must run "sudo chmod +x update.sh" after making this file