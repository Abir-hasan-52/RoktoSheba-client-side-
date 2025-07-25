import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Welcome from "../../Shared/Welcome/Welcome";
import { Link } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, refetch } = useQuery({
    queryKey: ["donor-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDonations?email=${user?.email}`);
      return res.data; // { totalCount: 6, donations: [...] }
    },
    enabled: !!user?.email,
  });

  const donationRequests = data?.donations || [];

  // সর্বোচ্চ ৩টা সর্বশেষ রিকোয়েস্ট দেখানোর জন্য
  const recentRequests = [...donationRequests]
    .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <Welcome
        user={{ displayName: user?.displayName, role: "donor" }}
        customMessage="Thank you for being a lifesaver! ❤️"
      />

      {donationRequests.length > 0 && (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold p-4 text-[#be123c]">
            Your Recent Donation Requests
          </h2>
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">Recipient</th>
                <th className="p-3">Location</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{req.recipientName}</td>
                  <td className="p-3">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="p-3">
                    {new Date(req.donationDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3">{req.donationTime}</td>
                  <td className="p-3">{req.bloodGroup}</td>
                  <td className="p-3 capitalize">{req.status}</td>
                  <td className="p-3 space-x-2 flex items-center flex-wrap gap-1">
                    {/* View */}
                    <Link
                      to={`/dashboard/donation-details/${req._id}`}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/dashboard/editDonation/${req._id}`}
                      className="text-yellow-500"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>

                    {/* Status Control */}

                    {req.status === "approved" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="text-green-600"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="text-gray-500"
                        >
                          <FaTimesCircle />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center">
            <Link
              to="/dashboard/myDonation"
              className="text-[#be123c] underline"
            >
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // Delete function
  function handleDelete(id) {
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
  }

  // Status Update
  function handleStatusUpdate(id, status) {
    axiosSecure.patch(`/myDonations/${id}`, { status }).then(() => {
      Swal.fire("Updated!", `Status changed to ${status}`, "success");
      refetch();
    });
  }
};

export default DonorDashboardHome;
