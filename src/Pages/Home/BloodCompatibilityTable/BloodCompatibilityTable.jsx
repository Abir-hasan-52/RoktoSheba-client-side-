import React from "react";
import { FaTint, FaHeartbeat } from "react-icons/fa";

const BloodCompatibilityTable = () => {
  const bloodData = [
    { type: "A+", donate: "A+, AB+", receive: "A+, A-, O+, O-" },
    { type: "A-", donate: "A+, A-, AB+, AB-", receive: "A-, O-" },
    { type: "B+", donate: "B+, AB+", receive: "B+, B-, O+, O-" },
    { type: "B-", donate: "B+, B-, AB+, AB-", receive: "B-, O-" },
    { type: "AB+", donate: "AB+", receive: "Everyone (Universal Receiver)" },
    { type: "AB-", donate: "AB+, AB-", receive: "A-, B-, AB-, O-" },
    { type: "O+", donate: "O+, A+, B+, AB+", receive: "O+, O-" },
    { type: "O-", donate: "Everyone (Universal Donor)", receive: "O-" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8 flex items-center justify-center gap-2">
        <FaHeartbeat className="text-red-500" />
        Blood Donation Compatibility Chart
      </h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-red-200">
        <table className="w-full text-sm md:text-base text-gray-700">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-3 text-left">Blood Type</th>
              <th className="p-3 text-left">Can Donate To</th>
              <th className="p-3 text-left">Can Receive From</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.map((item, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-red-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-red-50/40"
                }`}
              >
                <td className="p-3 font-bold text-red-600 flex items-center gap-2">
                  <FaTint className="text-red-500" />
                  {item.type}
                </td>
                <td className="p-3">{item.donate}</td>
                <td className="p-3">{item.receive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodCompatibilityTable;
