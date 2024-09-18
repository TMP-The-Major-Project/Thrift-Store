down:
	sudo docker-compose down

up:
	sudo docker-compose up --build --force-recreate -d

start: down up

build:
	sudo docker-compose build
