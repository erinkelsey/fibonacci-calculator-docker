# Fibonacci Calculator

[![Build Status](https://travis-ci.com/erinkelsey/fibonacci-calculator-docker.svg?branch=master)](https://travis-ci.com/erinkelsey/fibonacci-calculator-docker)

Fibonacci Calculator implemented as an over-the-top multi-container Docker application with React, NodeJS, Express, Redis (AWS ElasticCache), Postgres (AWS RDS), AWS Elastic Beanstalk and Travis CI

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

## Production

### Dockerrun.aws.json file

Replace the container tags in Dockerrun.aws.json from erinkelsey/[image_name] to your Docker Hub username

### AWS Security Group for Services

### AWS RDS Postgres Instance

### AWS Elastic Cache Redis Instance

### AWS Elastic Beanstalk

### Travis CI

Make sure that your GitHub repository is public, and that Travis CI is configured to access it.

Create the following environment variables:

- AWS_ACCESS_KEY -> Your AWS IAM Access Key with permissions for Elastic Beanstalk
- AWS_SECRET_KEY -> Your AWS IAM Secret Key with permissions for Elastic Beanstalk
- AWS_REGION -> Region of your AWS Elastic Beanstalk application
- AWS_APP_NAME -> AWS Elastic Beanstalk application name
- AWS_ENV_NAME -> AWS Elastic Beanstalk environment name
- AWS_BUCKET_NAME -> AWS S3 bucket name where application is stored (check logs when environment is created for name)
- AWS_BUCKET_PATH -> The folder in the AWS S3 holder your application (usually the same as AWS_APP_NAME)

NOTE: Deployment to AWS is only triggered when a pull request or commit is made to master branch on GitHub
