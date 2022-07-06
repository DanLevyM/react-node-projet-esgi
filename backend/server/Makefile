build:
	docker-compose up -d && docker exec express_server_1 npm run migrate

start:
	docker-compose up -d

stop:
	docker-compose down

restart:
	docker-compose down && docker-compose up -d

restartvol:
	docker-compose down --volumes && docker-compose up