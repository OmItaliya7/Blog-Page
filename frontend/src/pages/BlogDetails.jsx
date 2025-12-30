import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const likeBlog = async () => {
    await API.post(`/blogs/${id}/like`);
    fetchBlog();
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    await API.post(`/blogs/${id}/comment`, { text: comment });
    setComment("");
    fetchBlog();
  };

  const shareBlog = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.title,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* IMAGE */}
      <img
        src={blog.mediaUrl}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-semibold mt-6">{blog.title}</h1>

      {/* DATE */}
      <p className="text-sm text-gray-500 mt-1">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {/* ACTIONS */}
      <div className="flex items-center gap-4 mt-4">
        {user && (
          <button
            onClick={likeBlog}
            className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
          >
            ❤️ {blog.likes.length}
          </button>
        )}
        <button
          onClick={shareBlog}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          Share
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-6 text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.description}
      </div>

      {/* COMMENTS */}
      <div className="mt-12 pt-6 border-t">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({blog.comments.length})
        </h3>

        {/* ADD COMMENT */}
        {user ? (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={addComment}
                disabled={!comment.trim()}
                className="px-4 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-900 disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Login to comment.
          </p>
        )}

        {/* COMMENT LIST */}
        <div className="space-y-4">
          {blog.comments.length === 0 && (
            <p className="text-sm text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          )}

          {blog.comments.map((c, i) => (
            <div
              key={i}
              className="flex gap-3 border rounded-lg p-3 bg-white"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                {c.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* Comment content */}
              <div>
                <p className="text-sm font-medium">
                  {c.user?.name || "User"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  {c.text}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
