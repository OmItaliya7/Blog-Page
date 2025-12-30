const Blog = require("../models/Blog");

//  CREATE BLOG (ADMIN)
exports.createBlog = async (req, res) => {
  try {
    const { title, description, mediaUrl } = req.body;

    if (!title || !description || !mediaUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.create({
      title,
      description,
      mediaUrl,
      createdBy: req.user.id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE BLOG (ADMIN)
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, mediaUrl } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.mediaUrl = mediaUrl || blog.mediaUrl;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  DELETE BLOG (ADMIN)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET ALL BLOGS 
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy", "email")
      .populate("comments.user", "name");

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  LIKE / UNLIKE BLOG 
exports.likeBlog = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const userId = req.user.id;

    const alreadyLiked = blog.likes.some(
      (id) => id.toString() === userId
    );

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error("Like blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  ADD COMMENT 
exports.addComment = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({
      user: req.user.id,
      text,
    });

    await blog.save();
    res.status(201).json(blog.comments);
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
