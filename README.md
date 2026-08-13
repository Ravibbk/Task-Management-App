# Task Management App

Task Management App — a simple task tracking backend (Express + MongoDB + JWT) with a separate frontend build. The backend provides authenticated CRUD for tasks, role-based user management (ADMIN/USER), file attachments for tasks (PDF only), and auto-serves a built frontend when present.

What I reviewed to create this README:
- Backend/server.js, Backend/config (db.js, swagger.js)
- Backend/routes (auth.routes.js, task.routes.js, user.routes.js)
- Backend/controllers (auth.controller.js, task.controller.js, user.controller.js)
- Backend/models (User.js, Task.js)
- Backend/package.json and Backend/README.md
- The repository contains a Frontend/ directory and the backend is configured to serve Frontend/Task-Management-App/dist if present.

---

## Stack
- Language: JavaScript (Node.js)
- Runtime / framework: Node.js + Express
- Database: MongoDB via Mongoose
- Auth: JSON Web Tokens (jsonwebtoken)
- File upload: multer (disk storage, PDFs only)
- API docs: swagger-jsdoc + swagger-ui-express
- Frontend: separate project in Frontend/Task-Management-App (build output: dist). Backend serves the build when available.

---

## Features
- Email + password authentication with JWT
- Role-based access: ADMIN and USER
- CRUD operations for tasks (title, description, status, priority, assignedTo, dueDate)
- File attachments for tasks (saved to Backend/uploads, only PDF allowed)
- Admin-only user creation, update, delete
- Swagger API documentation at `/api-docs`
- Health check endpoint at `/api/health`
- Frontend build serving from `Frontend/Task-Management-App/dist` when available

---

## Repository layout (top-level)
```
Backend/                         # Node/Express backend (API + docs + models)
  config/                        # DB and Swagger config
  controllers/                   # Request handlers
  middleware/                    # auth middleware (auth, admin)
  models/                        # Mongoose models (User, Task)
  routes/                        # Express route definitions
  uploads/                       # (ignored) runtime uploads directory
  server.js                      # app entrypoint
  package.json                   # backend scripts & deps
  README.md                      # backend README (this repo)
Frontend/                        # frontend project (separate) - built to dist
.vscode/                         # editor settings (non-essential)
```

How it fits together:
- On start, the backend connects to MongoDB (Backend/config/db.js), mounts API routes under `/api`, exposes Swagger at `/api-docs`, and serves frontend build files (if found) from `Frontend/Task-Management-App/dist`. Authentication middleware (`middleware/auth.js`) protects API endpoints and provides role-based checks for admin-only user endpoints.

---

## Requirements
- Node.js (14+ recommended; use an LTS version)
- npm
- MongoDB instance or Atlas cluster
- Environment variables (see below)

---

## Environment variables
Create a `.env` file in `Backend/` (copy `.env.example` if present). At minimum set:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your_jwt_secret_here
PORT=5000               # optional, default 5000
CORS_ORIGIN=http://localhost:5173  # optional, default used by server.js
```

Notes:
- Keep `JWT_SECRET` secure. Rotate if compromised.
- The backend `.gitignore` already ignores `.env` and `uploads/`.

---

## Install & run (backend)
From repository root:

1. Backend (development)
```
cd Backend
npm install
# start dev server with nodemon
npm run dev
```

2. Backend (production)
```
cd Backend
npm install --production
# optionally ensure Frontend/Task-Management-App/dist exists (see frontend build below)
npm start
```

The backend `postinstall` script attempts to build the frontend automatically:
```
npm run build:frontend
# which runs: cd ../Frontend/Task-Management-App && npm install && npm run build
```
This means on `npm install` the backend will try to build the frontend if the frontend folder exists. You can skip or modify this behavior if you want separate deployment.

---

## Frontend (brief)
The frontend lives in `Frontend/Task-Management-App`. The backend expects the production build to be at:
```
Frontend/Task-Management-App/dist
```
To run or build the frontend (from repo root):
```
cd Frontend/Task-Management-App
npm install
npm run dev     # run dev server (usually on port 5173)
npm run build   # create production build -> dist
```
After building, the backend will serve the static files automatically.

---

## API endpoints (summary)
Base path: `/api`

Auth
- POST `/api/auth/register` — register new user
  - body: { email, password, role? }
- POST `/api/auth/login` — login
  - body: { email, password }
- GET `/api/auth/me` — get current user (requires Authorization header)

Tasks (all require auth)
- GET `/api/tasks` — list tasks created by current user
- GET `/api/tasks/:id` — get a single task (must be created by user)
- POST `/api/tasks` — create task
  - example body:
    {
      "title": "Finish report",
      "description": "Write summary for Q3",
      "status": "Pending",            // optional: "Pending"|"In Progress"|"Completed"
      "priority": "Medium",          // optional: "High"|"Medium"|"Low"
      "dueDate": "2026-09-01T00:00:00.000Z",
      "assignedTo": "user@example.com" // optional
    }
- PUT `/api/tasks/:id` — update task (must be created by user)
- DELETE `/api/tasks/:id` — delete task (must be created by user)
- POST `/api/tasks/:id/attachments` — upload up to 3 PDFs (multipart/form-data, field name `files`) (must be created by user)

Users
- GET `/api/users` — list users (auth required)
- POST `/api/users` — create user (admin only)
- PUT `/api/users/:id` — update user (admin only)
- DELETE `/api/users/:id` — delete user (admin only)

Other
- GET `/api/health` — health check
- Swagger UI at `/api-docs` — API reference generated from JSDoc

---

## Authentication usage (examples)

Register:
```
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

Login:
```
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```

Using JWT for requests (replace TOKEN with the returned token):
```
curl -H "Authorization: Bearer TOKEN" http://localhost:5000/api/tasks
```

Upload PDF attachment (up to 3 files, field name `files`):
```
curl -X POST http://localhost:5000/api/tasks/<TASK_ID>/attachments \
  -H "Authorization: Bearer TOKEN" \
  -F "files=@/path/to/file1.pdf" \
  -F "files=@/path/to/file2.pdf"
```
The server stores attachments on disk (`Backend/uploads`) and records original filename and stored path in the task document.

---

## Validation & constraints
- Task `dueDate` is required by the Task model.
- Attachments are restricted to content-type `application/pdf` (multer fileFilter).
- Passwords are hashed with bcrypt on save.
- Roles: `ADMIN` and `USER`. Admin-only endpoints are enforced by middleware.

---

## Testing
Backend includes Jest and Supertest in devDependencies. Run tests:
```
cd Backend
npm test
```
(There are test stubs or tests if present in the repo; adjust as needed.)

---

## Deployment notes
- Ensure `MONGO_URI` and `JWT_SECRET` are set in environment.
- Persist `uploads/` (or use object storage and change multer storage).
- For production, consider serving the frontend separately (CDN) and set CORS_ORIGIN appropriately.
- Consider adding rate limiting, request validation, and stricter file-size limits.

---

## Common troubleshooting
- MongoDB connection error: verify `MONGO_URI` and network access (Atlas IP whitelist).
- Invalid token: check `JWT_SECRET` matches the one used to sign tokens.
- Port in use: server attempts to retry up to 2 times on successive ports; set PORT env var to use a specific port.

---

## Contributing
- Fork the repo, create a branch per feature/fix, add tests where appropriate, and open a PR.
- Update README and API docs when changing routes or request/response shapes.

---

## License
Add a LICENSE file at the project root (e.g., MIT) — no license is currently included in this repository snapshot.

---

If you'd like, I can:
- Add this README.md to the repository (create a commit) — tell me where to add it (root), and I will create the file.
- Generate example `.env.example`.
- Create a small Dockerfile and docker-compose to run Mongo + backend + optional frontend.
