# Nails-spa

Skeleton project - monorepo multipackage

## Run project

### Run server

First, you need to run the MySQL service. This project includes a `docker-compose.yml` file, which you can use to run de service. In your terminal run this command:
```
  docker compose up -d
```

> **Note:** you can use a tool such XAMPP, just remember to update the .env file with the credential to allow the database connection

Then run next commands to up the server

``` cmd
  pnpm install
  pnpm run gen:tables
  pnpm run dev
```

### Seed demo data

If you need to add some demo data to development environment you must run the next command before `pnpm run dev`:

```
  pnpm run seed:demo
```