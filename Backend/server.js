const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/db");
const { swaggerSpec, swaggerUi } = require("./config/swagger");

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const CLIENT_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const frontendBuildPath = path.join(__dirname, "../Frontend/Task-Management-App/dist");

connectDB();

// Middleware
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ status: "OK", message: "Server is healthy" }));

// Serve frontend build when available
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads") || req.path.startsWith("/api-docs")) {
      return res.status(404).end();
    }
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

const startServer = (port, retries = 2) => {
  const server = app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      if (retries > 0) {
        console.warn(`Port ${port} is in use. Trying port ${port + 1}...`);
        return startServer(port + 1, retries - 1);
      }
      console.error(`Server error: port ${port} is already in use. Please close the process using this port or set a different PORT in your environment.`);
      process.exit(1);
    }

    console.error("Server error:", err);
    process.exit(1);
  });
};

startServer(PORT);

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
