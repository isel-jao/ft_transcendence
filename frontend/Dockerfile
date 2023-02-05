FROM node:latest

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

EXPOSE 8081


CMD ["yarn", "dev"]

