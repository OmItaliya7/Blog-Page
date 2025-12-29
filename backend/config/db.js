const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  try {
    if (isConnected) {
      return;
    }

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL not defined");
    }

    const db = await mongoose.connect(process.env.MONGO_URL);

    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;
