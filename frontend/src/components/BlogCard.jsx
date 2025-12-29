import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md"
    >
      <img
        src={blog.mediaUrl}
        alt=""
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>

      <p className="text-gray-600 line-clamp-2">
        {blog.description}
      </p>

      <div
        className="flex gap-3 mt-3"
        onClick={(e) => e.stopPropagation()} // prevent card click
      >
        <button
          onClick={() => onEdit(blog)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(blog._id)}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
