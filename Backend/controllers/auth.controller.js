const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
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
    token: generateToken(user._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  }

  res.status(401).json({ message: "Invalid email or password" });
};

const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = { register, login, getMe };