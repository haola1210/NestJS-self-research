# This is just a small project to learn NestJS


- docker compose file for running `psql` and `pgadmin` (access at *localhost:80*)
- create new connection in `pgadmin`, the `host`: name of container name of `psql` (check docker compose file)

if using to connect to psql (using `prisma`) <a href='https://docs.nestjs.com/recipes/prisma'>docs here</a>
check params for `database_url` in docker compose file.


after adding new schema, must run migration !!!

## what i learned?
- Concept: Module, Controller, Service, Pipe, Guard
- Circular dependency (great docs <a href="https://docs.nestjs.com/fundamentals/circular-dependency">here</a>):  `AuthModule <-> UserModule`
- JWT
- Authorization without Passport
- Relation (database)
- SetMetadata (cool!!!)
- Seperate the logics to the related modules



