const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    email,
    password,
    role: role || "USER",
  });

  res.status(201).json({
    id: user._id,
    email: user.email,
    role: user.role,
  });
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { email, role, password } = req.body;

  if (email) user.email = email;
  if (role) user.role = role;
  if (password) user.password = password;

  await user.save();

  res.json({
    id: user._id,
    email: user.email,
    role: user.role,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.remove();
  res.json({ message: "User removed" });
};

module.exports = { getUsers, createUser, updateUser, deleteUser };