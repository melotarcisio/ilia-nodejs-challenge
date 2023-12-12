FROM node:16

WORKDIR /app

RUN chown -R 1000:1000 "/root/.npm"