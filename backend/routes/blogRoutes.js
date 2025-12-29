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
router.post("/:id/like", protect, likeBlog);
router.post("/:id/comment", protect, addComment);


// Admin routes
router.post("/", protect, adminOnly, createBlog);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

module.exports = router;
