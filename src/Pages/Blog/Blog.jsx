import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import RoktoLoading from "../Shared/RoktoLoading/RoktoLoading";

const Blog = () => {
  const axiosInstance = useAxios();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/published-blogs");
      return res.data;
    },
  });

  if (isLoading) return <RoktoLoading />;

  return (
    <section className="bg-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center text-red-700 mb-12 flex items-center justify-center gap-3">
          <MdBloodtype size={50} /> RoktoSheba Blog
        </h2>

        {/* Blog Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col"
            >
              {/* Thumbnail */}
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-2xl font-bold text-red-700 mb-3">
                  {blog.title}
                </h3>

                {/* Meta Info */}
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-red-500" />
                    <span>{blog.authorEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt className="text-red-500" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-BD", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Content Preview */}
                <div
                  className="prose max-w-full prose-red text-gray-700 line-clamp-4 mb-6"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Read More Button */}
                <div className="mt-auto">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-block bg-red-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-red-700 transition"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
