import React from "react";
import { Link } from "react-router";

const sampleRequests = [
  {
    id: "req1",
    recipientName: "Rahim Uddin",
    district: "Dhaka",
    upazila: "Dhanmondi",
    bloodGroup: "O+",
    date: "2025-08-01",
    status: "Pending",
  },
  {
    id: "req2",
    recipientName: "Farzana Akter",
    district: "Chittagong",
    upazila: "Pahartali",
    bloodGroup: "A-",
    date: "2025-07-29",
    status: "In Progress",
  },
  {
    id: "req3",
    recipientName: "Kamal Hossain",
    district: "Khulna",
    upazila: "Sonadanga",
    bloodGroup: "B+",
    date: "2025-07-30",
    status: "Pending",
  },
];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  "In Progress": "bg-blue-200 text-blue-800",
  Done: "bg-green-200 text-green-800",
  Canceled: "bg-red-200 text-red-800",
};

const DonationRequestsPreview = () => {
  return (
    <section className="max-w-7xl mx-auto px-6a  py-12">
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
        Recent Donation Requests
      </h2>

      {sampleRequests.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
      ) : (
          
        <div className="overflow-x-auto rounded-xl shadow-lg border border-red-200">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead className="bg-red-600 text-white ">
              <tr>
                <th className="py-3 px-4 text-left">Recipient</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Blood Group</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                {/* <th className="py-3 px-4 text-left">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {sampleRequests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b  hover:bg-red-50 transition cursor-pointer"
                >
                  <td className="py-3 px-4">{req.recipientName}</td>
                  <td className="py-3 px-4">
                    {req.district}, {req.upazila}
                  </td>
                  <td className="py-3 px-4 font-semibold">{req.bloodGroup}</td>
                  <td className="py-3 px-4">{req.date}</td>
                  <td>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[req.status] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  {/* <td className="py-3 px-4">
                    <Link
                      to={`/donation-requests/${req.id}`}
                      className="text-red-600 hover:underline font-semibold"
                    >
                      View
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/donation-requests"
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          View All Requests
        </Link>
      </div>
    </section>
  );
};

export default DonationRequestsPreview;
