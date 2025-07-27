import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(null); // user ID for open dropdown

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
    onError: () => {
      Swal.fire("Error", "Failed to update user", "error");
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
      setDropdownOpen(null);
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
        <RoktoLoading></RoktoLoading>
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
                        user.status === "blocked"
                          ? "badge-error"
                          : "badge-success"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="relative text-center">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === user._id ? null : user._id
                        )
                      }
                    >
                      <FaEllipsisV />
                    </button>

                    {dropdownOpen === user._id && (
                      <div className="absolute z-20 right-0 mt-2 w-40 bg-white border rounded shadow-lg space-y-1 text-sm p-2">
                        {user.status === "active" && (
                          <button
                            onClick={() => handleAction("block", user)}
                            className="w-full text-left hover:bg-red-100 px-2 py-1 rounded"
                          >
                            Block
                          </button>
                        )}
                        {user.status === "blocked" && (
                          <button
                            onClick={() => handleAction("unblock", user)}
                            className="w-full text-left hover:bg-green-100 px-2 py-1 rounded"
                          >
                            Unblock
                          </button>
                        )}
                        {user.role !== "volunteer" && (
                          <button
                            onClick={() => handleAction("makeVolunteer", user)}
                            className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                          >
                            Make Volunteer
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleAction("makeAdmin", user)}
                            className="w-full text-left hover:bg-blue-100 px-2 py-1 rounded"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              className={`join-item btn btn-sm ${
                num === page ? "btn-active" : ""
              }`}
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
    </div>
  );
};

export default AllUsers;
