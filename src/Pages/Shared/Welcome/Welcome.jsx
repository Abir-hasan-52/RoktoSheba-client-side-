// src/components/Shared/Welcome.jsx

import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
 
const Welcome = ({ users = {}, customMessage }) => {
  const {user}= useAuth();
  const photoURL=user.photoURL
  const { displayName, role = "User",  } = users;
  // const {user}=useAuth();

  return (
    <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-xl shadow-md mb-6 px-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src={photoURL}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
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
