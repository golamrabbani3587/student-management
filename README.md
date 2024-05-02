## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# integration tests
$ yarn test

# test coverage
$ yarn run test:cov
```
##  Overview
I have built a college student management software. As only admin can make actions, and it's only for authentication I have to write the necessary code in the auth module. And I have created several files and folders as per the project requirements.

## CRUD Operations
I have made the CRUD operations in the students module.

## Redise Cache
 I have used the ioRedis library for caching in Redis, necessary configuration written in the redis.service file that is located in redis dir.

## Redis Queue for Random Hobby Assignment
In Hobby-assignment dir the functionalities is present.

## Real-Time Communication with Socket.IO:
In the studentsService file there is a function to update students. I have written the code to assign tasks and manage.

##  Security & Compliance
I have used JWT for all student routes. And added CORS and CSRF validation in the main.ts file.

## Dockerization
I have created the docker file.


## Testing and Documentation
For unit and integration tests I have used jest and supertest.
Both file for unit and integration test are available in student module.
