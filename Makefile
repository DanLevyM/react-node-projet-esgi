.PHONY: start stop restart restartvol migrate

start:
	docker-compose up

stop:
	docker-compose down

restart:
	docker-compose down && docker-compose up

restartvol:
	docker-compose down --volumes

# SERVER
migrate:
	docker exec server_c npm run migrate