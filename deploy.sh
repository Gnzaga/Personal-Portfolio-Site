#!/bin/bash

# Define variables
IMAGE_NAME="agonzaga/portfolio-website:latest"
SSH_HOST="BL-MP1"
DEPLOYMENT_NAME="portfolio-website"

# Step 1: Build Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Step 2: Tag Docker image
echo "Tagging Docker image..."
docker tag $IMAGE_NAME $IMAGE_NAME

# Step 3: Push Docker image to registry
echo "Pushing Docker image to registry..."
docker push $IMAGE_NAME

# Step 4: Restart Kubernetes deployment
echo "Restarting Kubernetes deployment on $SSH_HOST..."
ssh $SSH_HOST "kubectl rollout restart deployment $DEPLOYMENT_NAME"

# Step 5: Watch deployment rollout status
echo "Watching deployment rollout status..."
ssh $SSH_HOST "kubectl rollout status deployment $DEPLOYMENT_NAME"

echo "Deployment process complete!"