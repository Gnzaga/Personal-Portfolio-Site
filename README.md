# [Gnzaga.com](https://gnzaga.com)
================

A modern web experience built with Create React App and Tailwind CSS.

## Table of Contents
-----------------

* [Getting Started](#getting-started)
* [About This Setup](#about-this-setup)
* [How It Works](#how-it-works)
* [Deployment](#deployment)
* [Learn More](#learn-more)

## Getting Started
----------------

This project was bootstrapped with Create React App, and customized to meet our specific needs.

## About This Setup
-------------------

We chose to use the following technologies for this project:

* **Create React App**: A popular tool for setting up new React projects with ease.
* **Tailwind CSS**: A utility-first CSS framework that simplifies the process of writing clean, efficient, and maintainable CSS code.

## How It Works
----------------

Here's an overview of how this setup works:

1. The [`Dockerfile`](https://github.com/Gnzaga/Personal-Portfolio-Site/blob/master/Dockerfile) builds a Docker image using Node.js and Nginx.
2. The [`update.sh`](https://github.com/Gnzaga/Personal-Portfolio-Site/blob/master/update.sh) script is used to push updates to the code, which rebuilds the Docker image with the updated code.

## Deployment
-------------

To deploy the project, follow these steps:

1. Run the `./update.sh` command to build a new Docker image with the updated code.
2. The Docker image will be rebuilt and deployed on the server.

## Learn More
--------------

If you're interested in learning more about these technologies, here are some resources to get you started:

* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [Tailwind CSS documentation](https://tailwindcss.com/docs/installation)

