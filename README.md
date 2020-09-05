# Quaranteam

IT Project

### Setup for Backend

1. Download Node.js
2. Download Postman (to make requests to backend for testing)
3. npm i express express-validator config jsonwebtoken mongoose
4. npm i -D nodemon concurrently

### How to Run Server and Test

npm run server

while server is running:

#### To Register user, on Postman:

POST localhost:5000/api/users
header: key = Content-Type, value = application/json
body: {"name": "name", "email": "email", "password": "password"}
