import { FaTint, FaHeartbeat } from "react-icons/fa";

const BloodLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-red-50 text-red-700 backdrop-blur-sm">
      {/* Spinner */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute w-full h-full border-4 border-dashed rounded-full animate-spin border-red-500"></div>
        <FaTint className="text-5xl text-red-600 animate-pulse" />
      </div>

      {/* Text + Heartbeat */}
      <div className="flex items-center gap-2 mt-6">
        <FaHeartbeat className="text-xl text-red-500 animate-ping" />
        <p className="text-xl font-semibold">Loading RoktoSheba...</p>
      </div>

      <p className="text-sm text-red-400 mt-2">
        Please wait, saving lives in progress
      </p>
    </div>
  );
};

export default BloodLoading;
