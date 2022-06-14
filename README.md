# Yelpcamp
An ejs & Node.js Web Application

## Features

- Responsive web design (RWD)
- User authentication (Login/Register/Logout) and authorization (Post/Like/Edit)
- Flash messages responding to users' interaction
- Refactored with ES6 and ES7 syntax
- RESTful API

```
-------------------------------------------------------------------------
Normal Routes
-------------------------------------------------------------------------
[Method]  [Route]
GET       /                       Landing page
GET       /login                  Request the user login page
GET       /register               Request the user edit page

-------------------------------------------------------------------------
Users Route
-------------------------------------------------------------------------
[Method]  [Route]
GET       /users                  Fetch all users
POST      /users                  Create new user in database
GET       /users/new              Request the user register page
GET       /users/:id              Show the user information
PATCH     /users/:id              Update user information
DELETE    /users/:id              Delete user information
GET       /users/:id/edit         Request the user edit page

-------------------------------------------------------------------------
Sessions Route
-------------------------------------------------------------------------
[Method]  [Route]
POST      /sessions               Create a session (user login)
GET       /sessions/login         Request the user login page
DELETE    /sessions               Delete a session (user logout)

-------------------------------------------------------------------------
Campgrounds Route
-------------------------------------------------------------------------
[Method]  [Route]
GET       /campgrounds            Fetch all campgrounds
POST      /campgrounds            Create a new campground to database
GET       /campgrounds/new        Request the campground adding page
GET       /campgrounds/:id        Show the campground information
PUT       /campgrounds/:id        Update campground information (all)
PATCH     /campgrounds/:id        Update campground information (part)
DELETE    /campgrounds/:id        Delete a campground
GET       /campgrounds/:id/edit   Request the campground editing page
POST      /campgrounds/:id/likes  Like the campground

-------------------------------------------------------------------------
Comments Route
-------------------------------------------------------------------------
[Method]  [Route]
POST      /campgrounds/:id/comments       Create a new comment
PATCH     /campgrounds/:id/comments/:cid  Update comment
DELETE    /campgrounds/:id/comments/:cid  Delete comment
```

## Technologies

### Frontend

- [Bootstrap](https://getbootstrap.com/)
- [ejs](https://ejs.co/)

### Backend

- [express](https://expressjs.com/)
- [mongodb](https://www.mongodb.com/)
