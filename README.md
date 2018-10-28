# Exam PG6300

## Running it
`$ docker-compose up`

*Note: the `--build` option can be appended to specify that docker should rebuild images for the services depending on a locally built Dockerfile.*

## Stopping the service
To stop the services run

`$ docker-compose down`

To stop and remove the created containers, images and volumes run

`$ docker-compose down -v --rmi all --remove-orphans`
