# Dixit Backend Task

This project is a backend application built using Node.js, Express, and MongoDB.
It provides user authentication using JWT and basic post management APIs with pagination and like functionality.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt
- dotenv
- express-validator

---

## Project Setup

1. Clone the repository

```bash
git clone <your-github-repo-url>
cd Dixit-Backend-Task
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables file

Create a `.env` file in the root directory using the following structure:

```env
PORT=5000
MONGO_URI=MONGO_URI
JWT_SECRET=JWT_SECRET
```

4. Start the server

```bash
npm run dev
```

The server will run on:
```
http://localhost:5000
```

---

## API Endpoints (Curl Examples)

### Register User

```bash
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d '{"name":"test","email":"test@example.com","password":"password123"}'
```

---

### Login User

```bash
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{"email":"dixit@example.com","password":"password123"}'
```

---

### Get User Profile (Protected)

```bash
curl -X GET http://localhost:5000/auth/profile -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Create Post (Protected)

```bash
curl -X POST http://localhost:5000/posts -H "Authorization: Bearer YOUR_JWT_TOKEN" -H "Content-Type: application/json" -d '{"caption":"My first post"}'
```

---

### Get All Posts (Pagination)

```bash
curl -X GET "http://localhost:5000/posts?limit=10&skip=0"
```

---

### Like a Post (Protected)

```bash
curl -X POST http://localhost:5000/posts/POST_ID/like -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### Get Posts by User

```bash
curl -X GET http://localhost:5000/posts/user/USER_ID
```

---

## Folder Structure

```
Dixit-Backend-Task
│── server.js
│── package.json
│── .env.example
│── README.md
│
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   └── post.controller.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   └── post.routes.js
│   ├── models
│   │   ├── User.js
│   │   └── Post.js
│   └── middlewares
│       └── auth.middleware.js
│
└── postman
```

---

## Notes

- JWT is required for all protected routes
- Passwords are hashed using bcrypt
- Pagination is implemented using limit and skip query parameters
- MongoDB is connected using Mongoose
