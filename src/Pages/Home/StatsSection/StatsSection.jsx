import React from "react";
import CountUp from "react-countup";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaHeartbeat,
  FaTrophy,
} from "react-icons/fa";

const statsData = [
  {
    id: 1,
    title: "Total Donors",
    count: 1200,
    icon: <FaUsers className="text-4xl text-red-700" />,
    bgColor: "bg-red-100",
  },
  {
    id: 2,
    title: "Volunteers",
    count: 350,
    icon: <FaHandHoldingHeart className="text-4xl text-rose-600" />,
    bgColor: "bg-rose-100",
  },
  {
    id: 3,
    title: "Donations Made",
    count: 5600,
    icon: <FaHeartbeat className="text-4xl text-pink-600" />,
    bgColor: "bg-pink-100",
  },
  {
    id: 4,
    title: "Life-Saving Projects",
    count: 8,
    icon: <FaTrophy className="text-4xl text-amber-600" />,
    bgColor: "bg-amber-100",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-10 text-red-700 uppercase">
          Our Life-Saving Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className={`rounded-2xl shadow-lg p-6 ${stat.bgColor} flex flex-col items-center justify-center hover:scale-105 transition duration-300`}
            >
              <div className="mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">
                <CountUp end={stat.count} duration={8} />
              </h3>
              <p className="mt-1 text-gray-700 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
