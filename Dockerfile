FROM openjdk:17-jdk

WORKDIR /app

COPY . .

RUN chmod 777 ./.docker/entrypoint.sh

