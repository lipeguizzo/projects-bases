#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

./mvnw spring-boot:run