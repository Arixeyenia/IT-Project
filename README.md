# Quaranteam

IT Project

## Setup for Backend

1. Download Node.js
2. Download Postman (to make requests to backend for testing)
3. npm i express express-validator config jsonwebtoken mongoose
4. npm i -D nodemon concurrently

## Setup for Frontend

1.cd client
2.npm install

## How to Run both Server and client

npm run dev
(then you don't need to type npm run server again)

while server is running:

## Login

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

## Blog

#### Create a portfolio

POST localhost:5000/api/portfolio
header: key = x-auth-token, value = "TOKEN" (from login)

#### Get specific portfolio by id

GET localhost:5000/api/portfolio/:id

here :id refers to portfolio id

#### Create blog post

POST localhost:5000/api/portfolio/blog/:id
header: key = x-auth-token, value = "TOKEN" (from login)
header: key = Content-Type, value = application/json

body: {"title": "title of blog post", "text": "body of blog post"}

description: gives error if title and text are not provided

#### Delete blog post

DELETE localhost:5000/api/portfolio/blog/:id/:blog_id

:id = portfolio id
:blog_id = blog id

header: key = x-auth-token, value = "TOKEN" (from login)

#### Get blog posts in a given portfolio

GET localhost:5000/api/portfolio/blog/:id/:sort/:page

:id = portfolio id
:blog_id = blog id
:sort = (1 = old to new, anything else = new to old)
:page = (page of blog posts)

description: in default values blog posts per page is defines as 10. if page is provided as anything <= 0 you get the first 10 posts, after that you get later pages. Anything >= max page returns the last page.

#### Edit blog post

POST localhost:5000/api/portfolio/blog/:id/:blog_id

:id = portfolio id
:blog_id = blog id

header: key = x-auth-token, value = "TOKEN" (from login)
header: key = Content-Type, value = application/json

body: {"title": "new title", "text": "new text"}

description: if you only send title, only updates title, copies text from original post. If you only put text, updates text and copies title from original post. You can update both. Date is copied from old post.
