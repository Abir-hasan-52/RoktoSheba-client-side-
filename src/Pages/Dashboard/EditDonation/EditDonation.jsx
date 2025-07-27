import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const EditDonationRequest = () => {
  const { id } = useParams();
//   const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [donationData, setDonationData] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const selectedDistrict = useWatch({
    control,
    name: "recipientDistrict",
  });

  // Load districts & upazilas
  useEffect(() => {
    Promise.all([
      fetch("/districts.json").then((res) => res.json()),
      fetch("/upazilas.json").then((res) => res.json()),
    ])
      .then(([districtData, upazilaData]) => {
        setDistricts(districtData);
        setUpazilas(upazilaData);
      })
      .catch(console.error);
  }, []);

  // Load donation request by ID
  useEffect(() => {
    if (id) {
      axiosSecure.get(`/myDonations/${id}`).then((res) => {
        setDonationData(res.data);
      });
    }
  }, [id, axiosSecure]);

  // Set form default values when data is loaded
  useEffect(() => {
    if (donationData && districts.length && upazilas.length) {
      reset(donationData);
    }
  }, [donationData, districts, upazilas, reset]);

  // Filter upazilas based on selected district name
  const filteredUpazilas = upazilas.filter(
    (u) =>
      u.district_id ===
      districts.find((d) => d.name === selectedDistrict)?.id
  );

  // Submit
  const onSubmit = async (data) => {
    try {
      const updated = await axiosSecure.patch(`/myDonations/${id}`, data);
      if (updated?.data?.modifiedCount > 0) {
        Swal.fire("Updated!", "Donation request updated successfully.", "success");
        navigate("/dashboard");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (!donationData) {
    return  <RoktoLoading/>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register("requesterName")} type="hidden" />
        <input {...register("requesterEmail")} type="hidden" />

        <div>
          <label className="block mb-1">Recipient Name</label>
          <input
            {...register("recipientName", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Recipient Name"
          />
          {errors.recipientName && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Hospital Name"
          />
          {errors.hospitalName && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Upazila</label>
          <select
            {...register("recipientUpazila", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Full Address</label>
          <input
            {...register("fullAddress", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="Full Address"
          />
          {errors.fullAddress && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {errors.bloodGroup && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.donationDate && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div>
          <label className="block mb-1">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="w-full p-2 border rounded"
          />
          {errors.donationTime && <span className="text-red-500 text-sm">Required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Message</label>
          <textarea
            {...register("requestMessage")}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Optional message..."
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Update Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDonationRequest;
