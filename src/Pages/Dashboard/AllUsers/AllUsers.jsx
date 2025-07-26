import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["all-users", page, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allUsers?page=${page - 1}&limit=${limit}&status=${filter}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: async ({ id, update }) => {
      return axiosSecure.patch(`/allUsers/${id}`, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-users"]);
      Swal.fire("Success", "User updated successfully", "success");
    },
  });

  const handleAction = async (action, user) => {
    let update;
    if (action === "block") update = { status: "blocked" };
    if (action === "unblock") update = { status: "active" };
    if (action === "makeVolunteer") update = { role: "volunteer" };
    if (action === "makeAdmin") update = { role: "admin" };

    const confirm = await Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, proceed",
    });

    if (confirm.isConfirmed) {
      mutation.mutate({ id: user._id, update });
      setSelectedUser(null);
    }
  };

  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>

      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="table w-full bg-white">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="avatar">
                      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={user.avatar || "/avatar-default.jpg"}
                          alt="User avatar"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "blocked" ? "badge-error" : "badge-success"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-ghost"
                      onClick={() => setSelectedUser(user)}
                    >
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination below table */}
      <div className="mt-4 flex justify-center">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            « Prev
          </button>
          {pageNumbers.map((num) => (
            <button
              key={num}
              className={`join-item btn btn-sm ${num === page ? "btn-active" : ""}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next »
          </button>
        </div>
      </div>

      {/* Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h3 className="text-lg font-bold text-center mb-4">
              Manage {selectedUser.name}
            </h3>
            <p className="text-sm text-center mb-2">{selectedUser.email}</p>
            <div className="space-y-2">
              {selectedUser.status === "active" && (
                <button
                  className="btn btn-outline btn-error w-full"
                  onClick={() => handleAction("block", selectedUser)}
                >
                  Block
                </button>
              )}
              {selectedUser.status === "blocked" && (
                <button
                  className="btn btn-outline btn-success w-full"
                  onClick={() => handleAction("unblock", selectedUser)}
                >
                  Unblock
                </button>
              )}
              {selectedUser.role !== "volunteer" && (
                <button
                  className="btn btn-outline w-full"
                  onClick={() => handleAction("makeVolunteer", selectedUser)}
                >
                  Make Volunteer
                </button>
              )}
              {selectedUser.role !== "admin" && (
                <button
                  className="btn btn-outline btn-primary w-full"
                  onClick={() => handleAction("makeAdmin", selectedUser)}
                >
                  Make Admin
                </button>
              )}
              <button
                className="btn btn-sm btn-neutral w-full mt-3"
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
