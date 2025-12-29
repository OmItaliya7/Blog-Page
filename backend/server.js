const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "https://blog-space-snowy-gamma.vercel.app/api", // frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));

app.get("/", (req, res) => {
  res.send("API running successfully 🚀");
});

module.exports = app;
