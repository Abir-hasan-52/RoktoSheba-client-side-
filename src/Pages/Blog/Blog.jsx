import React from "react";
import { useQuery } from "@tanstack/react-query";
 
import { FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
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

  if (isLoading) return  <RoktoLoading/>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-red-700 mb-10 flex items-center justify-center gap-3">
        <MdBloodtype size={50} /> RoktoSheba Blog
      </h2>

      <div className="space-y-10">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-red-200 shadow-md rounded-2xl overflow-hidden"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                {blog.title}
              </h3>

              <div className="flex justify-between text-sm text-gray-600 mb-6">
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

              <div
                className="prose max-w-none prose-red prose-sm sm:prose-base"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
