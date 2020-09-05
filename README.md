# Quaranteam

IT Project

### Setup for Backend

1. Download Node.js
2. Download Postman (to make requests to backend for testing)
3. npm i express express-validator config jsonwebtoken mongoose
4. npm i -D nodemon concurrently

### How to Run both Server and client

npm run dev
(then you don't need to type npm run server again)

while server is running:

#### To Register user, on Postman:

POST localhost:5000/api/users
header: key = Content-Type, value = application/json
body: {"name": "name", "email": "email", "password": "password"}

returns a TOKEN

#### To Authenticate user, on Postman:

GET localhost:5000/api/auth
header: key = x-auth-token, value = "TOKEN" (from register step)

returns user info without password

#### To Login user, on Postman

POST localhost:5000/api/auth
header: key = Content-Type, value = application/json
body: {"email": "email", "password": "password"}

returns TOKEN if email & password is correct
