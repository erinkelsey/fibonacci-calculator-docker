# Fibonacci Calculator

[![Build Status](https://travis-ci.com/erinkelsey/fibonacci-calculator-docker.svg?branch=master)](https://travis-ci.com/erinkelsey/fibonacci-calculator-docker)

Fibonacci Calculator implemented as an over-the-top multi-container Docker application with React, NodeJS, Express, Redis (AWS ElastiCache), Postgres (AWS RDS), AWS Elastic Beanstalk and Travis CI

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

### Custom AWS Security Group for Services

- Go to AWS Management Console and use Find Services to search for VPC
- Find the Security section in the left sidebar and click Security Groups
- Click Create Security Group button
- Set Security group name to multi-docker
- Set Description to multi-docker
- Make sure VPC is set to default VPC
- Click Create Button
- Scroll down and click Inbound Rules
- Click Edit Rules button
- Click Add Rule
- Set Port Range to 5432-6379
- Click in the box next to Source and start typing 'sg' into the box. Select the Security Group you just created.
- Click Create Security Group

### AWS RDS Postgres Instance

- Go to AWS Management Console and use Find Services to search for RDS
- Click Create database button
- Select PostgreSQL
- In Templates, check the Free tier box.
- Scroll down to Settings.
- Set DB Instance identifier to multi-docker-postgres
- Set Master Username to postgres
- Set Master Password to postgrespassword and confirm.
- Scroll down to Connectivity. Make sure VPC is set to Default VPC
- Scroll down to Additional Configuration and click to unhide.
- Set Initial database name to fibvalues
- Scroll down and click Create Database button

Applying Security Group:

- Go to AWS Management Console and use Find Services to search for RDS
- Click Databases in Sidebar and check the box next to your instance
- Click Modify button
- Scroll down to Network and Security and add the new multi-docker security group
- Scroll down and click Continue button
- Click Modify DB instance button

### AWS Elastic Cache Redis Instance

- Go to AWS Management Console and use Find Services to search for ElastiCache
- Click Redis in sidebar
- Click the Create button
- Make sure Cluster Mode Enabled is NOT ticked
- In Redis Settings form, set Name to multi-docker-redis
- Change Node type to 'cache.t2.micro'
- Change Replicas per Shard to 0
- Scroll down and click Create button

Applying Security Group:

- Go to AWS Management Console and use Find Services to search for ElastiCache
- Click Redis in Sidebar
- Check the box next to Redis cluster
- Click Actions and click Modify
- Click the pencil icon to edit the VPC Security group. Tick the box next to the new multi-docker group and click Save
- Click Modify

### AWS Elastic Beanstalk

- Go to AWS Management Console and use Find Services to search for Elastic Beanstalk
- Click “Create Application”
- Set Application Name to 'multi-docker'
- Scroll down to Platform and select Docker
- In Platform Branch, select Multi-Container Docker running on 64bit Amazon Linux
- Click Create Application
- You may need to refresh, but eventually, you should see a green checkmark underneath Health.

Applying Security Group:

- Go to AWS Management Console and use Find Services to search for Elastic Beanstalk
- Click Environments in the left sidebar.
- Click MultiDocker-env
- Click Configuration
- In the Instances row, click the Edit button.
- Scroll down to EC2 Security Groups and tick box next to multi-docker
- Click Apply and Click Confirm
- After all the instances restart and go from No Data to Severe, you should see a green checkmark under Health.

Environment Variables:

- Go to AWS Management Console and use Find Services to search for Elastic Beanstalk
- Click Environments in the left sidebar.
- Click MultiDocker-env
- Click Configuration
- In the Software row, click the Edit button
- Scroll down to Environment properties
- In another tab Open up ElastiCache, click Redis and check the box next to your cluster. Find the Primary Endpoint and copy that value but omit the :6379
- Set REDIS_HOST key to the primary endpoint listed above, remember to omit :6379
- Set REDIS_PORT to 6379
- Set PGUSER to postgres
- Set PGPASSWORD to postgrespassword
- In another tab, open up the RDS dashboard, click databases in the sidebar, click your instance and scroll to Connectivity and Security. Copy the endpoint.
- Set the PGHOST key to the endpoint value listed above.
- Set PGDATABASE to fibvalues
- Set PGPORT to 5432
- Click Apply button
- After all instances restart and go from No Data, to Severe, you should see a green checkmark under Health.

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
