down:
	sudo docker-compose down

up:
	sudo docker-compose up --build --abort-on-container-exit --force-recreate -d

start: down up
