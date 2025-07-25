import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const limit = 5;

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blogs?status=${statusFilter}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const blogs = data.blogs || [];
  const totalCount = data.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  // Mutation to update blog status
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: ({ id, newStatus }) =>
      axiosSecure.patch(`/blogs/${id}`, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Success!", "Blog status updated", "success");
    },
  });

  // Mutation to delete blog
  const { mutateAsync: deleteBlog } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Deleted!", "Blog has been deleted", "success");
    },
  });

  // Confirm status update
  const handleStatusChange = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this blog as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      updateStatus({ id, newStatus: status });
    }
  };

  // Confirm delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (result.isConfirmed) {
      deleteBlog(id);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <button
          onClick={() => navigate("/dashboard/add-blog")}
          className="btn btn-primary"
        >
          Add Blog
        </button>
      </div>

      <div className="mb-4">
        <select
          className="select select-bordered w-40"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(0);
          }}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {isLoading && <p>Loading blogs...</p>}
      {isError && <p className="text-red-600">Error: {error.message}</p>}

      {!isLoading && blogs.length === 0 && (
        <p className="text-gray-600">No blogs found.</p>
      )}

      {!isLoading && blogs.length > 0 && (
        <div className="overflow-x-auto rounded shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className="font-semibold">{blog.title}</td>
                  <td
                    className={`capitalize font-semibold ${
                      blog.status === "published"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {blog.status}
                  </td>
                  <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="text-center space-x-2">
                    {blog.status === "draft" && (
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() =>
                          handleStatusChange(blog._id, "published")
                        }
                      >
                        Publish
                      </button>
                    )}
                    {blog.status === "published" && (
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() => handleStatusChange(blog._id, "draft")}
                      >
                        Unpublish
                      </button>
                    )}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center space-x-2 flex-wrap">
            <button
              className="btn btn-sm btn-outline"
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((pageIndex) => (
              <button
                key={pageIndex}
                className={`btn btn-sm ${
                  pageIndex === page ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setPage(pageIndex)}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline"
              disabled={page === totalPages - 1}
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
