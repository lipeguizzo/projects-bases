#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

python manage.py makemigrations

python manage.py migrate

python manage.py seed

python manage.py runserver 0.0.0.0:8000
