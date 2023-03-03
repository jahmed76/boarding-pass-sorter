# Setup instructions

You can use two methods to setup the API.

## Docker

1. Install Docker.
2. Clone repository
3. Run the following command to build the Docker image:
```docker compose up```
4. The API is now running on `http://localhost:8081`.

## PM2

1. Clone the repository.
2. ```npm install pm2 -g```
3. ```pm2-runtime config/pm2.json```
4. The API is now running on `http://localhost:8081`.


## Documentation:

Swagger documentation can be found at http://localhost:8081/api-docs.

## Assumptions:
1. A proper path is present in the boarding passes. If there is a pass without matching source/destination, API will throw error.
2. Required fields source, destination and mode are present in each boarding pass.

## Extension:
To add more transportation modes, the following changes are required:
1. Add a new transport class in `app/transports` folder. It should accept required params in `constructor` and implement `stringify` method.
2. In the `helpers/requestParser` function, add a new case to handle new transportation mode.
