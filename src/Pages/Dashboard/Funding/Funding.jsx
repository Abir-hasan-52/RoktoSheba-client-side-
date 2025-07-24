import React, { useState } from "react";
import { FaDonate } from "react-icons/fa";
import Button from "../../Shared/Button/Button";
 // Optional: use your design system

const dummyFundings = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  amount: (Math.random() * 500 + 100).toFixed(2),
  date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
}));

const ITEMS_PER_PAGE = 5;

const Funding = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = dummyFundings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dummyFundings.length / ITEMS_PER_PAGE);

  const handleGiveFund = () => {
    // 🔧 TODO: Redirect to Stripe checkout or open a modal
    alert("Redirecting to fund payment (Stripe)");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">💸 Funding History</h2>
        <Button onClick={handleGiveFund} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          <FaDonate /> Give Fund
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Amount (৳)</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((fund, i) => (
              <tr key={fund.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{indexOfFirstItem + i + 1}</td>
                <td className="p-3">{fund.name}</td>
                <td className="p-3">৳ {fund.amount}</td>
                <td className="p-3">{fund.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded-md ${
              i + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Funding;
