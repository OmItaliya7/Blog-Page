import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white">
      {/* IMAGE */}
      <div
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="cursor-pointer"
      >
        <img
          src={blog.mediaUrl}
          alt={blog.title}
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/600x300?text=No+Image")
          }
          className="h-40 w-full object-cover rounded-lg"
        />

        <h3 className="text-lg font-semibold mt-3 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {blog.description}
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(blog)}
          className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(blog._id)}
          className="px-3 py-1.5 text-sm border rounded text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
