FROM node:latest

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

EXPOSE 3001


CMD ["bash", "init.sh"]

