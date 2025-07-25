import { useEffect, useState } from "react";
import { Link } from "react-router";
 
import useAxios from "../../Hooks/useAxios";

const DonationRequests = () => {
  
  const axiosInstance= useAxios();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/donation-requests?status=pending")
      .then((res) => setRequests(res.data))
      .catch(console.error);
  }, [axiosInstance]);
  console.log(requests);
   

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Pending Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="border p-5 rounded-xl bg-white shadow"
            >
              <h3 className="text-xl font-semibold text-red-600">
                {req.recipient_name}
              </h3>
              <p>
                <strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}
              </p>
              <p>
                <strong>Blood Group:</strong> {req.bloodGroup}
              </p>
              <p>
                <strong>Date:</strong> {req.donationDate}
              </p>
              <p>
                <strong>Time:</strong> {req.donationTime}
              </p>
              <div className="mt-4">
                <Link to={`/donation-requests/${req._id}`}>
                  <button className="btn btn-error btn-sm">View</button>
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
