import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get("/blogs").then((res) => setBlogs(res.data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
     
      <section className="max-w-7xl mx-auto px-5 pt-10 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          All Blogs
        </h1>
     
      </section>

      
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {blogs.length === 0 ? (
          <p className="text-gray-500 mt-10">No blogs available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >
               
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={blog.mediaUrl}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

               
                <div className="p-5">
                  <h2 className="text-xl font-semibold leading-snug line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {blog.description}
                  </p>

                  
                  <div className="mt-5 text-sm text-gray-500 text-right">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
