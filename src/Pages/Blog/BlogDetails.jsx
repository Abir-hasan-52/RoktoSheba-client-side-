import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import RoktoLoading from "../Shared/RoktoLoading/RoktoLoading";
// adjust path

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/blogs/${id}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // optional: 5 minutes caching
    retry: 1, // optional: retry once if failed
  });

  if (isLoading) return <RoktoLoading />;

  if (isError)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-600 text-lg">
          {error.response?.data?.message || "Failed to fetch blog."}
        </p>
      </div>
    );

  if (!blog) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Thumbnail */}
      <div className="mb-6">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full max-w-3xl mx-auto h-auto rounded-2xl shadow-lg object-cover mb-8"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
        {blog.title}
      </h1>

      {/* Meta info */}
      <div className="flex flex-col md:flex-row gap-4 text-gray-500 mb-8">
        <p>
          <strong>Author:</strong> {blog.authorEmail}
        </p>
        <p>
          <strong>Published:</strong>{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              blog.status === "published" ? "text-green-600" : "text-gray-600"
            }
          >
            {blog.status}
          </span>
        </p>
      </div>

      {/* Content */}
      <div
        className="prose max-w-full text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
