# Social Media App

Social Media App is a social media app, where user can register, login, send friend requests to friends, accept, reject request, create post, update, delete, get all posts, like and comment on posts.


## Features

- Login / Signup
- Get all Users
- Get all User Friends
- Creating a Post
- Get all Posts
- Get a Post by id
- Update a Post
- Delete a Post
- Add like to a Post
- Add comment to a Post

## Tech Stack

**Server:** Node.js, Express.js, Mongoose

**Database:** MongoDB

## Run Locally

Clone the project

```bash
  git clone https://github.com/sarveshgupta1997/Social_Media_App.git
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node index.js
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongoURL`

`PORT`

`salt`

`seceretKey`


## API Reference

#### Welcome

```http
  GET /
```
`Response - {msg:"Social Media App - Base API Endpoint"} `

#### User Register

```http
  POST /api/register
```
`body{
  _id: ObjectId,
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}`
`Response - {msg:"User Added",user} `

#### User Login

```http
  POST /api/users/login
```
`body{
    email: String,
    password: String
}`
`Response - {msg:"User Logged in",token:token} `

#### All Users

```http
  GET /api/users
```
`Response - {msg:"All Users",users} `

#### All User Friends

```http
  GET /api/users/:id/friends
```
`Response - {msg:"User Frriends List",friends:user.friends} `

#### All Posts

```http
  GET /api/posts
```
`Response - {"All Posts":posts} `

#### Get posts By ID

```http
  GET /api/posts/:id
```
`Response - {post} `

#### Create posts

```http
  POST /api/posts
```
`body{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}`
`Response - {msg:"Post Added",post} `

#### Update posts By ID

```http
  UPDATE /api/posts/:id
```
`body{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}`
`Response - {msg:"Post Updated"} `

#### Delete posts By ID

```http
  DELETE /api/posts/:id
```
`Response - {msg:"Post Deleted"} `

#### Add like to post

```http
  POST /api/posts/:id/comment
```
`Response - {msg:"Like Added"} `

#### Add comment to post

```http
  POST /api/posts/:id/comment
```
`body{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
}`
`Response - {msg:"Comment Added"} `



## Demo

[https://strange-plum-swallow.cyclic.app/](https://strange-plum-swallow.cyclic.app/)


## Authors

- [@sarveshgupta1997](https://github.com/sarveshgupta1997)
