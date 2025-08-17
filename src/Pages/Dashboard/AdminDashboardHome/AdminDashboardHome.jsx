import { useEffect, useState } from "react";
import { FaUsers, FaTint, FaMoneyCheckAlt } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Welcome from "../../Shared/Welcome/Welcome";
import useAxios from "../../../Hooks/useAxios";
import useUserRole from "../../../Hooks/useUserRole";
import RoktoLoading from "../../Shared/RoktoLoading/RoktoLoading";
import DashboardCharts from "./DashboardCharts";

const AdminDashboardHome = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [stats, setStats] = useState(null);
  const { role } = useUserRole();
  useEffect(() => {
    axiosInstance
      .get("/dashboard-stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard stats", err);
        // fallback dummy data if API fails
        setStats({
          totalDonors: 120,
          totalRequests: 350,
          totalFunding: 50000,
          previousMonthDonors: null,
          previousMonthRequests: null,
          previousMonthFunding: null,
        });
      });
  }, [axiosInstance]);

  const randomChange = () => {
    const value = (Math.random() * 30 - 15).toFixed(1);
    return Number(value);
  };

  const calculatePercentageChange = (current, previous) => {
    if (previous == null || previous === 0) {
      return randomChange();
    }
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  if (!stats)
    return <RoktoLoading/>;

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
    {
      title: "Total Funding (৳)",
      count: stats.totalFunding,
      change: calculatePercentageChange(
        stats.totalFunding,
        stats.previousMonthFunding
      ),
      icon: <FaMoneyCheckAlt className="text-4xl text-green-600" />,
      bg: "bg-green-50 border border-green-200",
    },
  ];

  const getRoleMessage = (role) => {
    switch (role) {
      case "admin":
        return "Welcome back, Lifeline Commander! You hold the power to organize hope, manage donors, and oversee every heartbeat of Rokto-Sheba.";
      case "donor":
        return "Thank you for being a true hero! Every drop you donate gives someone another chance at life. Let’s keep saving lives together.";
      case "volunteer":
        return "You are the bridge between life and hope. Your support keeps the blood flowing where it’s needed the most. Thank you for your selfless service.";
      default:
        return "Welcome to Rokto-Sheba – where every drop of blood writes a new story of life. Let’s make a difference together!";
    }
  };

  return (
    <div className="p-4 space-y-6">
    <Welcome
      users={{ displayName: user?.displayName, role: role }}
      customMessage={getRoleMessage(role)}
    />

    <h2 className="text-2xl font-bold text-gray-800">
      📊 Admin Dashboard Overview
    </h2>

    {/* Cards */}
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

    {/* Charts */}
    <DashboardCharts stats={stats} />
  </div>
  );
};

export default AdminDashboardHome;
