# Fibonacci Calculator

Fibonacci Calculator implemented as an over-the-top multi-container Docker application with React, NodeJS, Express, AWS RDS (Postgres), Redis and Travis CI

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

## Production
