import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTint, FaMapMarkerAlt, FaMedal } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const TopDonors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donors = [], isLoading, isError, error } = useQuery({
    queryKey: ["randomDonors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/random-donors");
      return res.data;
    },
  });
console.log(donors);
  if (isLoading) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Loading top donors...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Error loading top donors: {error.message || "Unknown error"}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-red-100 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-10">
          🏆 Top Donors of the Month
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {donors.map((donor, idx) => (
            <motion.div
              key={donor._id}
              className="relative bg-white rounded-2xl shadow-lg p-6 text-center border-t-[6px] border-red-500 hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="absolute top-[-18px] left-1/2 -translate-x-1/2">
                <FaMedal className="text-yellow-400 text-3xl drop-shadow" />
              </div>

              <img
                src={donor.avatar}
                alt={donor.donorName}
                className="w-24 h-24 mx-auto rounded-full border-4 border-red-200 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {donor.donorName}
              </h3>

              <p className="text-sm text-gray-600 flex justify-center items-center gap-1">
                <FaTint className="text-red-500" /> {donor.bloodGroup}
              </p>

              <p className="text-sm text-gray-500 flex justify-center items-center gap-1">
                <FaMapMarkerAlt /> {donor.upazila}, {donor.district}
              </p>

              <p className="text-xs text-gray-400 mt-1">Email: {donor.donorEmail}</p>

              <p className="text-xs text-gray-500 mt-1">
                Assigned: {new Date(donor.assignedAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDonors;
