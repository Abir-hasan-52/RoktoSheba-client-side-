import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const ITEMS_PER_PAGE = 5;

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");

  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myDonations", user?.email, currentPage, filterStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myDonations?email=${user?.email}&page=${currentPage}&limit=${ITEMS_PER_PAGE}&status=${filterStatus}`
      );
      return res.data; // { totalCount, donations }
    },
    enabled: !!user?.email,
  });

  const { donations = [], totalCount = 0 } = data;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(0); // Reset to first page on filter change
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#be123c",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myDonations/${id}`).then(() => {
          Swal.fire("Deleted!", "The request has been deleted.", "success");
          refetch();
        });
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    axiosSecure.patch(`/myDonations/${id}`, { status }).then(() => {
      Swal.fire("Updated!", `Status changed to ${status}`, "success");
      refetch();
    });
  };

  if (isLoading)
    return (
       <RoktoLoading/>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Error: {error.message}
      </p>
    );

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#be123c]">
        My Donation Requests
      </h2>

      {/* Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <p className="text-center text-sm text-gray-500 mb-8">
        Page {currentPage + 1} of {pageCount}
      </p>

      {donations.length === 0 ? (
        <p className="text-center text-red-500">No donation requests found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className=" rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#be123c]">
                  Recipient: {donation.recipientName}
                </h3>
                <p>
                  <span className="font-medium">Blood Group:</span>{" "}
                  {donation.bloodGroup}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(donation.donationDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{" "}
                  {donation.donationTime}
                </p>
                <p>
                  <span className="font-medium">Hospital:</span>{" "}
                  {donation.hospitalName}
                </p>
                <p>
                  <span className="font-medium">District:</span>{" "}
                  {donation.recipientDistrict}
                </p>
                <p>
                  <span className="font-medium">Upazila:</span>{" "}
                  {donation.recipientUpazila}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Requested by: {donation.requesterName} (
                  {donation.requesterEmail})
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs capitalize ${
                    donation.status === "pending"
                      ? "bg-yellow-500"
                      : donation.status === "inprogress"
                      ? "bg-purple-500"
                      : donation.status === "done"
                      ? "bg-blue-600"
                      : donation.status === "canceled"
                      ? "bg-gray-500"
                      : "bg-red-500"
                  }`}
                >
                  {donation.status}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {/* View */}
                  <Link
                    to={`/dashboard/donation-details/${donation._id}`}
                    className="text-blue-500 hover:text-blue-700"
                    title="View Details"
                  >
                    <FaEye size={18} />
                  </Link>

                  {/* Edit */}
                  <Link
                    to={`/dashboard/editDonation/${donation._id}`}
                    className="text-yellow-500 hover:text-yellow-700"
                    title="Edit Donation"
                  >
                    <FaEdit size={18} />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Donation"
                  >
                    <FaTrash size={18} />
                  </button>

                  {/* Status Controls */}
                  {donation.status === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(donation._id, "done")
                        }
                        className="text-green-600 hover:text-green-800"
                        title="Mark as Done"
                      >
                        <FaCheckCircle size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(donation._id, "canceled")
                        }
                        className="text-gray-500 hover:text-gray-700"
                        title="Cancel Request"
                      >
                        <FaTimesCircle size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-10 flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next →"
            previousLabel="← Prev"
            onPageChange={handlePageClick}
            forcePage={currentPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            containerClassName="flex items-center gap-2 text-sm"
            pageClassName="px-3 py-1 border rounded-md cursor-pointer hover:bg-blue-100"
            activeClassName="bg-blue-600 text-white"
            previousClassName="px-3 py-1 border rounded-md cursor-pointer"
            nextClassName="px-3 py-1 border rounded-md cursor-pointer"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default MyDonations;
