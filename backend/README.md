# Backend

Routes:

- /user/signup
- /user/login
- /admin/addproduct
- /user/viewproduct

# GO run commands:

- 1)go mod tidy
- 2)go run .

# psql run commands:

- psql -h localhost -U username(postgres) -d database-name -a -f sample.sql

# .env file template:

- POSTGRES_URL="postgres://username:password@localhost:5432/database"
- SecretKey="Secret"
