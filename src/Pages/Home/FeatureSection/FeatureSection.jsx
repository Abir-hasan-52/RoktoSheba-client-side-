import React from "react";
import { FaUserPlus, FaHeartbeat, FaHandsHelping } from "react-icons/fa";

const features = [
  {
    icon: <FaUserPlus size={40} className="text-red-600" />,
    title: "Easy Registration",
    description: "Sign up quickly to become a donor and start saving lives.",
  },
  {
    icon: <FaHeartbeat size={40} className="text-red-600" />,
    title: "Find Donors Fast",
    description: "Search donors by blood group and location for urgent needs.",
  },
  {
    icon: <FaHandsHelping size={40} className="text-red-600" />,
    title: "Trusted Community",
    description: "Connect with verified donors and volunteers nationwide.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-red-700 mb-12">
          Why Choose RoktoSheba?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg  cursor-default text-center hover:scale-105 transition duration-300"
            >
              <div className="mb-6">{icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-red-800">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
