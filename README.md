# ília - Code Challenge NodeJS
I developed it using linux and had problems when I tried to run it on windows due to the differences that exist in the execution of shell scripts.
Due to the short time I had to develop, I couldn't solve this, so I ask you to test it on linux machines.

## This repository is a microservice monorepo that consists of two services:
- Users Service: Responsible for storing user information;
- Wallet Service: Responsible for storing transaction data;

## How to run the project
- Clone the repository;
- Create a .env file based on .env.example (it will works if you just copy the file);
- Run `docker compose up` in the root folder;
- The services will be available at `http://localhost:3001` and `http://localhost:3002`;
- The swagger documentation will be available at `http://localhost:8081/` and `http://localhost:8082`;
- That's it! :D;

## about the test
- The wallet service only accepts the creation of transactions for existing users, so you will need to create a user in the users service first;
- The wallet service will log a json webtoken to the console when it starts. This token is used as administrator access to the application (for testing purposes only);
- Once you have a user, you can use the authentication route and use the user token to make requests;
