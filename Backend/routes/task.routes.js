const express = require("express");
const multer = require("multer");
const path = require("path");
const { auth } = require("../middleware/auth");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  uploadAttachments,
} = require("../controllers/task.controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDFs are allowed"));
    } else {
      cb(null, true);
    }
  },
});

router.use(auth);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/attachments", upload.array("files", 3), uploadAttachments);

module.exports = router;
