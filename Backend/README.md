# Task Management Backend

Express + MongoDB + JWT API for the Task Management App.

## Available scripts

- `npm install` - install dependencies
- `npm run dev` - run server with nodemon
- `npm start` - run server with node

## Environment

Copy `.env.example` to `.env` and set:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - secret for JWT signing
- `PORT` - backend port, default is `5000`

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `POST /api/tasks/:id/attachments`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Swagger docs

Visit `/api-docs` after starting the server.
