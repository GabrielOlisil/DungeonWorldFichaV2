BACKEND=dungeonworldfichav2-backend-1


shell:
	docker compose up -d
	docker exec -it $(BACKEND) bash

static:
	docker compose up -d
	docker exec $(BACKEND) bash -c "dotnet run"
