.PHONY: start stop restart restartvol migrate

start:
	docker-compose up

stop:
	docker-compose down

restart: stop start

restartvol:
	docker-compose down --remove-orphans --volumes --timeout 0

# SERVER
migrate:
	docker exec server_c npm run migrate