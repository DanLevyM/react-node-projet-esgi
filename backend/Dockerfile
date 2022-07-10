# syntax=docker/dockerfile:1
## NOT USED 

FROM node:16.16.0-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --development

COPY . .

CMD [ "node", "index.js" ]