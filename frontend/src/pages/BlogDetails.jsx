import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [liking, setLiking] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");

  const fetchBlog = async () => {
    const res = await API.get(`/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  // const likeBlog = async () => {
  //   await API.post(`/blogs/${id}/like`);
  //   fetchBlog();
  // };

  const likeBlog = async () => {
  if (liking) return;

  try {
    setLiking(true);
    await API.post(`/blogs/${id}/like`);
    fetchBlog();
  } catch (error) {
    alert("Failed to like blog");
  } finally {
    setLiking(false);
  }
};


  // const addComment = async () => {
  //   if (!comment.trim()) return;
  //   await API.post(`/blogs/${id}/comment`, { text: comment });
  //   setComment("");
  //   fetchBlog();
  // };

  const addComment = async () => {
  if (!comment.trim()) return;

  try {
    setCommentLoading(true);
    await API.post(`/blogs/${id}/comment`, { text: comment });
    setComment("");
    fetchBlog();
  } catch (error) {
    alert("Failed to add comment");
  } finally {
    setCommentLoading(false);
  }
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
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Unable to copy link");
      }
    }
  };

  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      
      <img
        src={blog.mediaUrl}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-md"
      />

   
      <h1 className="text-3xl font-semibold mt-6">
        {blog.title}
      </h1>

    
      <p className="text-sm text-gray-500 mt-1">
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

     
      <div className="flex items-center gap-4 mt-4">
        {user && (
          <button
            onClick={likeBlog}
            disabled={liking}
            className={`text-sm px-3 py-1 border rounded transition $ {liking ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100"`}
          >
             {liking ? "Liking..." : `❤️ ${blog.likes.length}`}
          </button>
        )}
        <button
          onClick={shareBlog}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          Share
        </button>
      </div>

      
      <div className="mt-6 text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.description}
      </div>

      
      <div className="mt-12 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-4">
          Comments ({blog.comments.length})
        </h3>

        
        {user ? (
          <div className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <div className="flex justify-end">
              <button
                onClick={addComment}
                disabled={commentLoading}
                className={`mt-2 px-4 py-1.5 text-sm rounded transition ${commentLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-900"}`}
              >
                 {commentLoading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            Login to comment.
          </p>
        )}

        
        <div className="space-y-4">
          {blog.comments.length === 0 && (
            <p className="text-sm text-gray-400">
              No comments yet.
            </p>
          )}

          {blog.comments.map((c, i) => (
            <div key={i} className="pb-3 border-b last:border-b-0">
              <p className="text-sm text-gray-800">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
