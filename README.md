## Motion

### Description: Server application built with Typescript, NodeJS and ExpressJS. Motion is blog app that allows readers to read blog posts and add blog post, allows author to add, update and delete their blog(s), It is authenticated using cookies.

### Tech Used:
1. NodeJS
2. Typescript
3. ExpressJS
4. Git
5. Github
6. MongoDB
7. JWT
8. Bcrypt
9. Express Rate limiter

#### NB:
1. "*" -- compulsory field
2. "?" -- optional field
3. Authorization roles - Reader, Author, Admin
   
#### Authentication
Authentication is enabled in this app using JWT and cookies.
Access Token and Refresh Token is sent with each request and is verified on the server.

1. Endpoint to register a user
#### Sample Request:
```JSON
POST: {{DOMAIN}}/register
{
    "name" *: "your name",
    "email" *: "youremail",
    "password" *: "yourpassword"
}
```
#### Sample Response:
```JSON
{
    "msg" : "Account created"
}
```
2. Endpoint to login user
#### Sample Request:
```JSON
POST: {{DOMAIN}}/login
{
   "email" *: "your email",
   "password" *: "your password"
}
```
#### Sample Response:
```JSON
{
    "msg": "Login sucessfully" 
}
```

3. Endpoint to logout user
#### Sample Request:
```JSON
DELETE: {{DOMAIN}}/logout
{}
```
#### Sample Response:
```JSON
{ 
    "msg": "User has been logged out" 
}

```

#### User
1. Endpoint to show the current user
#### Sample Request:
```JSON
GET: {{DOMAIN}}/showMe
{}
```
#### Sample Response:
```JSON
{
   "user": {
     "_id": "user id",
    "name" : "user's name",
    "email" : "user's email",
    "role": "reader || author || admin",
    "isSubscribed": "<Boolean>"
   }
}
```
#### Post
1. Endpoint to get all post
#### Sample Request:
```JSON
GET: {{DOMAIN}}/post
{}
```
#### Sample Response:
```JSON
{ 
    "nbPosts": "Number of post", 
    "posts" : [...{
        "_id": "post id",
        "title" : "post title", 
        "body": "post content", 
        "author": "author reference id"
    }] 
}
```
2. Endpoint to get a single post
> NB: this route as a rate limiter, admins and subscribed user gets 50 requests per hour, unsubscribed user gets 5 requests per hour and visitors gets 3 requests per hour
#### Sample Request:
```JSON
GET: {{DOMAIN}}/post/:post-id
{}
```
#### Sample Response:
```JSON
{
    {
        "_id": "post id",
        "title" : "post title", 
        "body": "post content", 
        "author": "author reference id"
    }
}
```

3. Endpoint to add post
> NB: Role reader will turn to author
#### Sample Request:
```JSON
POST: {{DOMAIN}}/post
{
    "title" *: "post title", 
    "body" *: "post content", 
}
```
#### Sample Response:
```JSON
{ 
    "msg": "Created new post"
}

```
4. Endpoint to edit a post
#### Sample Request:
```JSON
PATCH: {{DOMAIN}}/post/:post-id
{
    "title" ?: "post title", 
    "body" ?: "post content", 
}
```
#### Sample Response:
```JSON
{ 
    "msg": "Post has been editted"
}

```
5. Endpoint to delete a post
#### Sample Request:
```JSON
DELETE: {{DOMAIN}}/post/:post-id
{}
```
#### Sample Response:
```JSON
{ 
    "msg": "Post has been deleted"
}

```