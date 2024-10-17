#!/bin/bash

# Variables
IMAGE_NAME="node-server"
CONTAINER_NAME="my-node-server"
PORT=3004

echo "Building the new Docker image..."
# Build the Docker image (no cache to ensure new code is used)
docker build --no-cache -t $IMAGE_NAME -f Dockerfile-server .

if [ $? -eq 0 ]; then
    echo "Docker image built successfully."
else
    echo "Docker image build failed."
    exit 1
fi

echo "Stopping the current running container (if exists)..."
# Stop the existing container if running
docker stop $CONTAINER_NAME 2>/dev/null || true

echo "Removing the old container (if exists)..."
# Remove the existing container if exists
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "Running the new container..."
# Run the new container with the updated image
docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $IMAGE_NAME

if [ $? -eq 0 ]; then
    echo "New container is up and running on port $PORT."
else
    echo "Failed to start the new container."
    exit 1
fi

echo "Node.js server updated and running successfully."
