#!/bin/bash

# Define variables (can be overridden via environment variables)
IMAGE_NAME="${DOCKER_IMAGE:-harbor.gnzaga.com/library/portfolio-website:latest}"
SSH_HOST="${K8S_SSH_HOST:-root@192.168.42.16}"
DEPLOYMENT_NAME="${K8S_DEPLOYMENT:-portfolio-website}"
DEPLOYMENT_NAMES_SPACE="${K8S_NAMESPACE:-portfolio}"

# Change to the root project directory
cd ../../

# Step 1: Build Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME -f deployment/docker/Dockerfile .

# Step 2: Tag Docker image
echo "Tagging Docker image..."
docker tag $IMAGE_NAME $IMAGE_NAME

# Step 3: Push Docker image to registry
echo "Pushing Docker image to registry..."
docker push $IMAGE_NAME

# Step 4: Restart Kubernetes deployment
echo "Restarting Kubernetes deployment on $SSH_HOST..."
ssh $SSH_HOST "kubectl rollout restart deployment $DEPLOYMENT_NAME -n $DEPLOYMENT_NAMES_SPACE"

# Step 5: Watch deployment rollout status
echo "Watching deployment rollout status..."
ssh $SSH_HOST "kubectl rollout status deployment $DEPLOYMENT_NAME -n $DEPLOYMENT_NAMES_SPACE"

echo "Deployment process complete!"