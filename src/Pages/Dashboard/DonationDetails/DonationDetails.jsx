import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: donation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myDonations/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="p-6 text-center animate-pulse text-[#be123c] font-medium">
        Loading...
      </div>
    );
  if (isError || !donation)
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Failed to load donation details.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 mt-10 bg-white rounded-2xl shadow-lg border border-red-100 animate-fadeIn">
      <Link
        to="/dashboard"
        className="text-[#be123c] hover:text-red-600 flex items-center gap-2 mb-6"
      >
        <FaArrowLeft /> <span>Back to Dashboard</span>
      </Link>

      <h2 className="text-3xl font-bold text-[#be123c] mb-8 text-center">
        Donation Request Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-[16px]">
        <div>
          <p>
            <span className="font-semibold">Recipient Name:</span>{" "}
            {donation.recipientName}
          </p>
          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {donation.bloodGroup}
          </p>
          <p>
            <span className="font-semibold">Hospital Name:</span>{" "}
            {donation.hospitalName}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(donation.donationDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <span className="font-semibold">Time:</span>{" "}
            {donation.donationTime}
          </p>
        </div>

        <div>
          <p>
            <span className="font-semibold">District:</span>{" "}
            {donation.recipientDistrict}
          </p>
          <p>
            <span className="font-semibold">Upazila:</span>{" "}
            {donation.recipientUpazila}
          </p>
          <p>
            <span className="font-semibold">Requester Phone:</span>{" "}
            {donation.requesterPhoneNumber}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                donation.status === "pending"
                  ? "bg-yellow-500"
                  : donation.status === "approved"
                  ? "bg-green-600"
                  : donation.status === "canceled"
                  ? "bg-gray-500"
                  : donation.status === "completed"
                  ? "bg-blue-600"
                  : "bg-red-500"
              }`}
            >
              {donation.status}
            </span>
          </p>
        </div>
      </div>

      {donation.additionalInfo && (
        <div className="mt-6">
          <p>
            <span className="font-semibold">Additional Info:</span>{" "}
            {donation.additionalInfo}
          </p>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
