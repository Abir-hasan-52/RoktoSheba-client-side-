import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import useAxios from "../../Hooks/useAxios";
import { FaTint, FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";

const DonationRequests = () => {
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/donation-requests?status=pending")
      .then((res) => setRequests(res.data))
      .catch(console.error);
  }, [axiosInstance]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-red-700 drop-shadow-sm">
        🩸 Pending Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          🚫 No pending requests found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow-lg transition hover:shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-red-600 mb-2">
                {req.recipientName}
              </h3>

              <p className="flex items-center gap-2 text-gray-700 mb-1">
                <FaMapMarkerAlt className="text-red-500" />
                {req.recipientDistrict}, {req.recipientUpazila}
              </p>

              <p className="flex items-center gap-2 text-gray-700 mb-1">
                <FaTint className="text-red-500" />
                <span className="font-semibold">{req.bloodGroup}</span>
              </p>

              <p className="flex items-center gap-2 text-gray-700 mb-1">
                <FaCalendarAlt className="text-red-500" />
                {req.donationDate}
              </p>

              <p className="flex items-center gap-2 text-gray-700 mb-3">
                <FaClock className="text-red-500" />
                {req.donationTime}
              </p>

              <div className="mt-4 text-right">
                <Link to={`/donation-requests/${req._id}`}>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-md text-sm transition font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
