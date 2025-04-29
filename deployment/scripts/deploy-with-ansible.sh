#!/bin/bash

# Change to the project's ansible directory
cd deployment/ansible

ansible-playbook -v deploy-playbook.yml

echo "Ansible deployment process complete!"