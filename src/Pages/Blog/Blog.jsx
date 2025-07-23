import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Blog = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/published-blogs");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden border hover:shadow-xl transition"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {blog.content.replace(/<[^>]+>/g, "")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
