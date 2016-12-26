FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY package.json /usr/src/app/
COPY index.js /usr/src/app/
RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
