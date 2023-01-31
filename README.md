```
BACKEND_PORT=8000

DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres

JWT_SECRET=secretPassword
JWT_EXPIRATION_TIME=24h

BCRYPT_ROUNDS=10
```

## Local development:

``docker-compose up dev``

## Production development:

``docker-compose up prod``