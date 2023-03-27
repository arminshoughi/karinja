## Installation Guide

To creating main database for project, do following steps:

```shell script
$ sudo su - postgres
$ psql

CREATE DATABASE karinja_db;
CREATE USER karinja_user WITH PASSWORD 'karinja_password@';
ALTER ROLE karinja_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE karinja_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE karinja_db TO karinja_user;
\q
exit;
```

and for run it with docker use following command:
```dockerfile
    docker-compose up -d
```