import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaUser
} from "react-icons/fa";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [request, setRequest] = useState(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch donation request data
  useEffect(() => {
    axiosSecure
      .get(`/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch(console.error);
  }, [axiosSecure, id]);

  if (!request) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        ⏳ Loading request details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10 border border-red-100">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        🩸 Donation Request Details
      </h2>

      <div className="space-y-4 text-gray-800">
        <p className="flex items-center gap-2">
          <FaUser className="text-red-500" />
          <span><strong>Recipient:</strong> {request.recipientName}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaTint className="text-red-500" />
          <span><strong>Blood Group:</strong> {request.bloodGroup}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaHospital className="text-red-500" />
          <span><strong>Hospital:</strong> {request.hospitalName}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" />
          <span><strong>Date:</strong> {request.donationDate}</span>
        </p>

        <p className="flex items-center gap-2">
          <FaClock className="text-red-500" />
          <span><strong>Time:</strong> {request.donationTime}</span>
        </p>

        <p className="flex items-start gap-2">
          <FaInfoCircle className="text-red-500 mt-1" />
          <span>
            <strong>Additional Info:</strong> {request.requestMessage || "N/A"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
