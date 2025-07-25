import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
 
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    axiosSecure.get(`/donation-requests/${id}`)
      .then(res => setRequest(res.data))
      .catch(console.error);
  }, [axiosSecure, id]);

  if (!request) {
    return <div className="text-center mt-10">Loading request details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Donation Request Details</h2>
      <p><strong>Recipient Name:</strong> {request.recipientName}</p>
      <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
      <p><strong>District:</strong> {request.recipientDistrict}</p>
      <p><strong>Upazila:</strong> {request.recipientUpazila}</p>
      <p><strong>Hospital:</strong> {request.hospital}</p>
      <p><strong>Date:</strong> {request.donationDate}</p>
      <p><strong>Time:</strong> {request.donationTime}</p>
      <p><strong>Additional Info:</strong> {request.description || "N/A"}</p>
    </div>
  );
};

export default DonationRequestDetails;
