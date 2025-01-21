#!/bin/bash

# Variables
IMAGE_NAME="agonzaga/portfolio-website"
TAG="latest"

# Build the Docker image
docker build -t $IMAGE_NAME:$TAG .

# Push the Docker image to Docker Hub
docker push $IMAGE_NAME:$TAG

echo "Docker image $IMAGE_NAME:$TAG has been pushed to Docker Hub."