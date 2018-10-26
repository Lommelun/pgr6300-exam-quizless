FROM node:10-alpine

RUN mkdir -p /var/node-app
COPY ./package.json /var/node-app

WORKDIR /var/node-app

RUN npm i

CMD node src/server/app.js