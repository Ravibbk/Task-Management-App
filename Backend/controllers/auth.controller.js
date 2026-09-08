const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: "Password is required and must be at least 6 characters" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    const user = await User.create({
      email: email.toLowerCase().trim(),
      password,
      role: role || "USER",
    });

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Failed to register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (!password || password.length === 0) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

const getMe = async (req, res) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
};

module.exports = { register, login, getMe };
