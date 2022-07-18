This is just a small project to learn NestJS


docker compose file for running psql and pgadmin (access localhost:80)
create new connection in pgadmin, `host`: name of container name of psql (check docker compose file)

if using to connect to psql (using prisma) <a href='https://docs.nestjs.com/recipes/prisma'>docs here</a>
check params for database_url in docker compose file.


after adding new schema, must run migration !!!

