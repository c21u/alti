DC_DEV := docker-compose.yml
DC_HELPER := docker-compose.helper.yml

.PHONY: dev down init

dev: down init
	docker-compose -f $(DC_HELPER) run --rm install
	docker-compose -f $(DC_DEV) up -d;
	docker-compose -f $(DC_DEV) logs -f app;

down:
	docker-compose -f $(DC_HELPER) stop;
	docker-compose -f $(DC_HELPER) down --remove-orphans;
	docker-compose -f $(DC_DEV) stop;
	docker-compose -f $(DC_DEV) down --remove-orphans;

init:
	docker volume create nm