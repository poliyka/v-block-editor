DOCKER_COMPOSE=docker-compose -f docker-compose.yml

# docker
build:
	$(DOCKER_COMPOSE) build

cleanbuild:
	$(DOCKER_COMPOSE) build --no-cache

up:
	$(DOCKER_COMPOSE) up --build

down:
	$(DOCKER_COMPOSE) down -v
