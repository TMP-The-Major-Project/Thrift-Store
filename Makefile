down:
	sudo docker-compose down

up:
	sudo docker-compose up --build --pull --force-recreate -d

start: down up
