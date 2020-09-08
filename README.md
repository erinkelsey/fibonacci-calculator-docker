# Fibonacci Calculator

Fibonacci Calculator implemented as an over-the-top multi-container Docker application with React, NodeJS, Express, Redis, Postgres, AWS Elastic Beanstalk and Travis CI

## Development

### Build with Docker CLI

    $ docker build -f Dockerfile.dev .

### Run with Docker CLI

    $ docker run <container_id>

NOTE: Use the -it flag when running React apps

### Build with Docker Compose

    $ docker-compose up

### Rebuild with Docker Compose

    $ docker-compose down  && docker-compose up --build

### Access Client

http://localhost:3050

NOTE: you can change the port in the docker-compose.yml file under nginx -> ports

## CI/CD - Travis CI

### Setup

Replace the container tags in .travis.yml from erinkelsey/[name] to your Docker Hub username

## Production
