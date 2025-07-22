import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 5;

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myDonations", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myDonations?email=${user?.email}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data; // should return { totalCount, donations }
    },
    enabled: !!user?.email,
  });

  const { donations = [], totalCount = 0 } = data;
  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Error: {error.message}</p>
    );

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        My Donation Requests
      </h2>

      <p className="text-center text-sm text-gray-500 mb-8">
        Page {currentPage + 1} of {pageCount}
      </p>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold mb-2">
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

              <div className="mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs ${
                    donation.status === "pending"
                      ? "bg-yellow-500"
                      : donation.status === "approved"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {donation.status}
                </span>
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
