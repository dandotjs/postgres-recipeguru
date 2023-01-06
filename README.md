# Getting Started

run `npm i`

# Local Development

## Docker Setup

run `docker pull postgres:14`  
run `docker run -e POSTGRES_PASSWORD=<password> --name=pg --rm -d -p 5432:5432 postgres:14`. This uses the default port for postgres but can be changed if needed.  
run `docker exec -u postgres -it pg psql`

## DB Setup

Once connected to the psql client, ensure you are in the root directory and run the following commands:
`CREATE DATABASE recipeguru;`  
`-U postgres -p 5432 -d recipeguru -f ./queries/create-ingredients-table.txt`  
`-U postgres -p 5432 -d recipeguru -f ./queries/populate-ingredients-table.txt`

## Env Setup

Create a .env in the root directory with the following `DB_USER="postgres" DB_PASSWORD=<password> DB_PORT=<port> DB_NAME="recipeguru" DB_HOST="localhost"`

## Running the Server

run `npm run dev`

## License

All code is licensed Apache 2.0.

forked from [repo]: https://github.com/btholt/complete-intro-to-sql
