.PHONY: start stop restart restartvol migrate seeders seedersundo

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


# SEEDERS
seeders:
	docker exec server_c npx sequelize-cli db:seed:all

seedersundo:
	docker exec server_c npx sequelize-cli db:seed:undo
