# Legendary Umbrella - ApiApp

## General
This applications runs in the port 3000

## .env file
An .env file must be created in this folder prior to deploy or test the api. The .env file should have the following:
- DB_HOST. Database host (string)
- DB_PORT. Database port (number)
- DB_USER. Database user (string)
- DB_PASS. Password for the given database user (string)
- DB_NAME. Database name (string)
- JWT_SECRET. The jsonwebtoken secret (string)
- JWT_EXPIRES. The duration of the jwt i.e.: 30d, 456464, etc.

## Entities behaviour
On the first run, the ORM will load de entities, creating the tables in the database and it will create an user. The credentials for that user are: 
- username: admin
- password: Admin-12345

## Documentation
- [Yaml file](api-specification.yaml)
- [Swagger link](https://app.swaggerhub.com/apis/SOTZOY97/legendary-umbrella/1.0.0)
