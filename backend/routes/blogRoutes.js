const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  addComment,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);

// User actions
router.post("/:id/like", protect, (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only users can like blogs" });
  }
  next();
}, likeBlog);

router.post("/:id/comment", protect, (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only users can comment" });
  }
  next();
}, addComment);

// Admin routes
router.post("/", protect, adminOnly, createBlog);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);



module.exports = router;
