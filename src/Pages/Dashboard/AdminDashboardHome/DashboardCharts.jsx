import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardCharts = () => {
  // Dummy monthly data (replace with backend data later)
  const monthlyData = [
    { month: "Jan", donors: 80, requests: 200, funding: 15000 },
    { month: "Feb", donors: 100, requests: 250, funding: 20000 },
    { month: "Mar", donors: 120, requests: 300, funding: 25000 },
    { month: "Apr", donors: 140, requests: 350, funding: 30000 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Donors Line Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Donor Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="donors" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Requests Bar Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-700 mb-2">
          Donation Requests
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Funding Area Chart */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Funding Trend (Stripe)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="funding" stroke="#22c55e" fill="#bbf7d0" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
