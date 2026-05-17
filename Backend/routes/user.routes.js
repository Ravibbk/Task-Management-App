const express = require("express");
const { auth, admin } = require("../middleware/auth");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.use(auth);
router.get("/", getUsers);
router.post("/", admin, createUser);
router.put("/:id", admin, updateUser);
router.delete("/:id", admin, deleteUser);

module.exports = router;
