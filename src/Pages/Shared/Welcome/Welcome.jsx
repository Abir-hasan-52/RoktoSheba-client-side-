// src/components/Shared/Welcome.jsx

import { FaUserCircle } from "react-icons/fa";

const Welcome = ({ user = {}, customMessage }) => {
  const { displayName, role = "User" } = user;

  return (
    <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-xl shadow-md mb-6">
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-5xl text-red-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {displayName || "User"}!
          </h2>
          <p className="text-gray-600 capitalize">Role: {role}</p>
          {customMessage && (
            <p className="text-sm mt-1 text-gray-700">{customMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
