FROM node:20-alpine

WORKDIR /home/node/app

COPY . . 

RUN apk add --update bash python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache cairo-dev pango-dev libjpeg-turbo-dev libpng-dev giflib-dev pixman-dev build-base

RUN npm install -g @nestjs/cli@10.4.9

RUN chmod 777 ./.docker/entrypoint.sh

USER node


