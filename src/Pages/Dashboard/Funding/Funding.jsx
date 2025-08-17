import React, { useState } from "react";
import {
  FaDonate,
  FaDollarSign,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Button from "../../Shared/Button/Button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";

const ITEMS_PER_PAGE = 5;

const Funding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fundings", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/fundings?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { fundings = [], total = 0 } = data || {};
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handleGiveFund = () => {
    navigate("/dashboard/mainFunding");
  };

  if (isLoading) {
    return <RoktoLoading />;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        ❌ Error: {error.message || "Failed to fetch data"}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
          💸 Funding History
        </h2>
        <Button
          onClick={handleGiveFund}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <FaDonate /> Give Fund
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border-x border-red-200  rounded-lg shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-rose-600 text-white uppercase tracking-wide text-xs">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Avatar</th>
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {fundings.map((fund, i) => (
              <tr
                key={fund._id || i}
                className="border-b hover:bg-rose-50 transition"
              >
                {/* Serial */}
                <td className="p-3 font-medium text-gray-700">
                  {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                </td>

                {/* Avatar */}
                <td className="p-3">
                  <img
                    src={
                      fund.userPhoto ||
                      fund.photoURL ||
                      "https://i.ibb.co/2N2FScx/default-user.png"
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>

                {/* Name */}
                <td className="p-3 text-gray-800">
                  {fund.userName || "Unknown"}
                </td>

                {/* Amount */}
                <td className="p-3 flex items-center gap-1 text-green-600 font-semibold">
                  <FaDollarSign className="text-sm" />
                  {parseFloat(fund.amount).toFixed(2)}
                </td>

                {/* Date */}
                <td className="p-3 text-gray-600">
                  {new Date(fund.date).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        <button
          className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md transition ${
              i + 1 === currentPage
                ? "bg-red-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Funding;
