FROM node:12-alpine
WORKDIR /usr/src/crawler
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]
