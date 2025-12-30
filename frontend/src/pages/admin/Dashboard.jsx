import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    mediaUrl: "",
  });
  const [editingId, setEditingId] = useState(null);

  
  if (!user || user.role !== "admin") {
    return (
      <p className="text-center mt-20 text-red-500">
        Access denied
      </p>
    );
  }

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingId) {
        await API.put(`/blogs/${editingId}`, form);
        toast.success("Blog updated successfully");
      } else {
        await API.post("/blogs", form);
        toast.success("Blog added successfully");
      }

      setForm({ title: "", description: "", mediaUrl: "" });
      setEditingId(null);
      fetchBlogs();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      mediaUrl: blog.mediaUrl,
    });
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Admin Dashboard
      </h1>

      
      <form
        onSubmit={handleSubmit}
        className="border rounded-md p-4 mb-8 bg-gray-50"
      >
        <h2 className="text-lg font-medium mb-4">
          {editingId ? "Edit Blog" : "Add New Blog"}
        </h2>

        <input
          placeholder="Blog title"
          className="w-full border rounded p-2 mb-3 text-sm"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Blog description"
          className="w-full border rounded p-2 mb-3 text-sm"
          rows={4}
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          placeholder="Image / GIF / Video URL"
          className="w-full border rounded p-2 mb-3 text-sm"
          value={form.mediaUrl}
          onChange={(e) =>
            setForm({ ...form, mediaUrl: e.target.value })
          }
          required
        />

        {form.mediaUrl && (
          <img
            src={form.mediaUrl}
            alt="Preview"
            onError={(e) =>
              (e.target.src =
                "https://via.placeholder.com/600x300?text=Invalid+Image")
            }
            className="h-40 w-full object-cover rounded mb-3 border"
          />
        )}

        <button
          disabled={submitting}
          className="px-4 py-1.5 bg-black text-white text-sm rounded disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : editingId
            ? "Update Blog"
            : "Add Blog"}
        </button>
      </form>

      
      <div>
        <h2 className="text-lg font-medium mb-4">
          All Blogs
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No blogs found.
          </p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded-md p-3 flex gap-4 items-start"
              >
                <img
                  src={blog.mediaUrl}
                  alt={blog.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/150")
                  }
                  className="h-20 w-32 object-cover rounded border"
                />

                <div className="flex-1">
                  <p className="font-medium">
                    {blog.title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {blog.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="px-3 py-1 text-sm border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1 text-sm border rounded text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
