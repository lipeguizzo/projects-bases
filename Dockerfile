FROM node:20-alpine

COPY . .

RUN apk add --no-cache \
  cairo-dev \
  pango-dev \
  libjpeg-turbo-dev \
  libpng-dev \
  giflib-dev \
  pixman-dev \
  build-base \
  python3

RUN npm install next@15.2.3 react@19.0.0 react-dom@19.0.0

USER node

WORKDIR /home/node/app