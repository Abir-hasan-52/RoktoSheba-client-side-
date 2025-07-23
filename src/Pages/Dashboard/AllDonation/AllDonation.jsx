import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaHourglassHalf } from "react-icons/fa";

const statusColors = {
  pending: "text-yellow-500",
  approved: "text-blue-600",
  completed: "text-green-600",
  cancelled: "text-red-500",
};

const AllDonation = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-donations", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allDonations?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  // ✅ FIXED HERE: changed totalCount → total
  const { total = 0, donations = [] } = data || {};
  const totalPages = Math.ceil(total / limit);

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/donations/${id}`, {
        status: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donations"]);
    },
  });

  const handleStatusUpdate = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to mark as ${newStatus}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (confirm.isConfirmed) {
      try {
        await updateStatus({ id, newStatus });
        Swal.fire("Success!", "Status updated successfully", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to update status", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-600">
        Failed to fetch donations.
      </p>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🩸 All Blood Donation Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Blood Group</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td>{page * limit + index + 1}</td>
                <td>
                  <div>
                    <p className="font-semibold">{donation.requesterName}</p>
                    <p className="text-xs text-gray-500">
                      {donation.requesterEmail}
                    </p>
                  </div>
                </td>
                <td>
                  <p>{donation.recipientName}</p>
                  <p className="text-xs text-gray-500">
                    {donation.recipientUpazila}, {donation.recipientDistrict}
                  </p>
                </td>
                <td className="font-medium">{donation.bloodGroup}</td>
                <td>
                  <p>{donation.donationDate}</p>
                  <p className="text-xs text-gray-500">
                    {donation.donationTime}
                  </p>
                </td>
                <td
                  className={`${
                    statusColors[donation.status]
                  } font-semibold capitalize`}
                >
                  {donation.status}
                </td>
                <td className="space-x-1">
                  {donation.status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(donation._id, "approved")
                      }
                      className="btn btn-xs btn-outline btn-info"
                    >
                      <FaHourglassHalf className="mr-1" /> Approve
                    </button>
                  )}
                  {donation.status === "approved" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(donation._id, "completed")
                      }
                      className="btn btn-xs btn-outline btn-success"
                    >
                      <FaCheck className="mr-1" /> Complete
                    </button>
                  )}
                  {donation.status !== "cancelled" &&
                    donation.status !== "completed" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(donation._id, "cancelled")
                        }
                        className="btn btn-xs btn-outline btn-error"
                      >
                        <FaTimes className="mr-1" /> Cancel
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {/* ✅ Pagination with Prev/Next */}
      <div className="flex justify-center mt-6 flex-wrap items-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="btn btn-sm btn-outline"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`btn btn-sm ${
              p === page ? "btn-active btn-info text-white" : "btn-outline"
            }`}
          >
            {p + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllDonation;
