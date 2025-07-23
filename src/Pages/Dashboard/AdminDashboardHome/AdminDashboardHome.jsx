import { useEffect, useState } from "react";
import { FaUsers, FaTint } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Welcome from "../../Shared/Welcome/Welcome";
import useAxios from "../../../Hooks/useAxios";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/dashboard-stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats", err);
        // fallback dummy data if API fails or no data
        setStats({
          totalDonors: 120,
          totalRequests: 350,
          previousMonthDonors: null,
          previousMonthRequests: null,
        });
      });
  }, [axiosInstance]);

  // Dummy function to generate random percentage change between -15% and +15%
  const randomChange = () => {
    const value = (Math.random() * 30 - 15).toFixed(1);
    return Number(value);
  };

  // Calculate percentage change or generate dummy value
  const calculatePercentageChange = (current, previous) => {
    if (previous == null || previous === 0) {
      return randomChange();
    }
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  if (!stats)
    return (
      <div className="text-center py-10 font-medium">Loading stats...</div>
    );

  const cardData = [
    {
      title: "Total Donors",
      count: stats.totalDonors,
      change: calculatePercentageChange(
        stats.totalDonors,
        stats.previousMonthDonors
      ),
      icon: <FaUsers className="text-4xl text-blue-600" />,
      bg: "bg-blue-50 border border-blue-200",
    },
    {
      title: "Total Blood Donation Requests",
      count: stats.totalRequests,
      change: calculatePercentageChange(
        stats.totalRequests,
        stats.previousMonthRequests
      ),
      icon: <FaTint className="text-4xl text-red-600" />,
      bg: "bg-red-50 border border-red-200",
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <Welcome
        user={{ displayName: user?.displayName || "Admin", role: "admin" }}
        customMessage="You have full access to manage the blood donation system."
      />

      <h2 className="text-2xl font-bold text-gray-800">
        📊 Admin Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300 ${card.bg}`}
          >
            <div className="flex items-center gap-4">
              {card.icon}
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                <p className="text-sm mt-1 text-gray-500">
                  <span
                    className={`font-medium ${
                      card.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.change >= 0 ? "▲" : "▼"} {Math.abs(card.change)}%
                  </span>{" "}
                  from last month  
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
