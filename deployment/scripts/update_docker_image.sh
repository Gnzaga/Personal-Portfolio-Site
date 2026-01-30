#!/bin/bash

# Variables
IMAGE_NAME="harbor.gnzaga.com/apps/portfolio-website"
TAG="latest"

# Change to the root project directory
cd ../../

# Build the Docker image using the Dockerfile in the deployment/docker directory
docker build -t $IMAGE_NAME:$TAG -f deployment/docker/Dockerfile .

# Push the Docker image to Harbor
docker push $IMAGE_NAME:$TAG

echo "Docker image $IMAGE_NAME:$TAG has been pushed to Harbor."