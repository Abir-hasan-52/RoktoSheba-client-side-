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
        users={{ displayName: user?.displayName, role: "donor" }}
        customMessage="Thank you for being a lifesaver! ❤️"
      />

      {donationRequests.length > 0 && (
        <div className="overflow-x-auto px-4 rounded-2xl shadow-lg border border-red-100">
          <h2 className="text-xl font-semibold p-4 text-[#be123c]">
            Your Recent Donation Requests
          </h2>

          <table className="min-w-full text-sm rounded-md border-x border-red-200 ">
            <thead className="bg-gradient-to-r from-red-600 to-red-500 text-white">
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
              {recentRequests.map((req, index) => (
                <tr
                  key={req._id}
                  className={`border-b transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-red-50/50"
                  } hover:bg-red-100/30`}
                >
                  <td className="p-3 font-medium">{req.recipientName}</td>
                  <td className="p-3 text-gray-700">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="p-3">
                    {new Date(req.donationDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-3">{req.donationTime}</td>
                  <td className="p-3 font-semibold text-red-700">
                    {req.bloodGroup}
                  </td>

                  {/* Status Badge */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === "done"
                          ? "bg-green-100 text-green-700"
                          : req.status === "canceled"
                          ? "bg-gray-200 text-gray-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex items-center gap-3 text-lg">
                    {/* View */}
                    <Link
                      to={`/dashboard/donation-details/${req._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye />
                    </Link>

                    {/* Edit */}
                    <Link
                      to={`/dashboard/editDonation/${req._id}`}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>

                    {/* Status Control */}
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="text-gray-500 hover:text-gray-700"
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

          <div className="p-4 text-center ">
            <Link to="/dashboard/myDonation">
              <button className="btn  bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-xl">
                View My All Requests
              </button>
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
