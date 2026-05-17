const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("MongoDB connection error: MONGO_URI is not defined in the environment.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error(error);
    console.error("Please verify the MONGO_URI, Atlas network access, and database credentials.");
    process.exit(1);
  }
};

module.exports = connectDB;
