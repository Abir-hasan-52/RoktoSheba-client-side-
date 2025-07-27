import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const CreateDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // Load districts & upazilas from public folder
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then(setDistricts);
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then(setUpazilas);
  }, []);

  useEffect(() => {
    if (selectedDistrict && upazilas.length) {
      const filtered = upazilas.filter(
        (upz) => upz.district_id === selectedDistrict
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrict, upazilas]);

  // Get user info
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (dbUser?.status === "blocked") {
      return Swal.fire("Access Denied", "You are blocked.", "error");
    }
    // 🔍 Find the selected district name
    const districtObj = districts.find((d) => d.id === data.recipientDistrict);
    const districtName = districtObj?.name || "";

    const donationData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/createDonation", donationData);
      if (res.data?.insertedId) {
        Swal.fire("Success!", "Donation request created.", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  if (isLoading) return <RoktoLoading/>;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Requester Info (Read-only) */}
        <div>
          <label className="block mb-1 font-semibold">Requester Name</label>
          <input
            type="text"
            value={user?.displayName}
            disabled
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        {/* Recipient Info */}
        <div>
          <label className="block mb-1 font-semibold">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", {
              required: "Recipient name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && (
            <p className="text-red-500 text-sm">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">District</label>
          <select
            {...register("recipientDistrict", {
              required: "Select a district",
            })}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">-- Select District --</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && (
            <p className="text-red-500 text-sm">
              {errors.recipientDistrict.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Upazila</label>
          <select
            {...register("recipientUpazila", { required: "Select an upazila" })}
            className="select select-bordered w-full"
          >
            <option value="">-- Select Upazila --</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.recipientUpazila && (
            <p className="text-red-500 text-sm">
              {errors.recipientUpazila.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", {
              required: "Hospital name is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.hospitalName && (
            <p className="text-red-500 text-sm">
              {errors.hospitalName.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", {
              required: "Full address is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.fullAddress && (
            <p className="text-red-500 text-sm">{errors.fullAddress.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Select blood group" })}
            className="select select-bordered w-full"
          >
            <option value="">-- Select --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm">{errors.bloodGroup.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: "Date is required" })}
            className="input input-bordered w-full"
          />
          {errors.donationDate && (
            <p className="text-red-500 text-sm">
              {errors.donationDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: "Time is required" })}
            className="input input-bordered w-full"
          />
          {errors.donationTime && (
            <p className="text-red-500 text-sm">
              {errors.donationTime.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Request Message</label>
          <textarea
            {...register("requestMessage", {
              required: "Request message is required",
            })}
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          {errors.requestMessage && (
            <p className="text-red-500 text-sm">
              {errors.requestMessage.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2 text-right">
          <button type="submit" className="btn btn-primary w-full">
            Submit Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonation;
