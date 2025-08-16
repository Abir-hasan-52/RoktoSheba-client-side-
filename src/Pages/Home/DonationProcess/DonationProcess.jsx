import React from "react";
import { FaUserPlus, FaPhoneAlt, FaTint, FaHeartbeat } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-red-500 text-3xl" />,
    title: "Register as Donor",
    description:
      "Sign up and create your donor profile with basic information, blood group, and contact details.",
  },
  {
    icon: <FaPhoneAlt className="text-red-500 text-3xl" />,
    title: "Get Contacted",
    description:
      "Our team will reach out to confirm your availability and schedule a donation session.",
  },
  {
    icon: <FaTint className="text-red-500 text-3xl" />,
    title: "Donate Blood",
    description:
      "Visit the nearest blood donation center or participate in our mobile camps to donate blood safely.",
  },
  {
    icon: <FaHeartbeat className="text-red-500 text-3xl" />,
    title: "Save Lives",
    description:
      "Your donation will help patients in need and bring hope to countless lives.",
  },
];

const DonationProcess = () => {
  return (
    <section className="bg-red-50 py-16 px-4  md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12">
          Donation Process
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg   flex flex-col items-center text-center hover:scale-105 transition duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
