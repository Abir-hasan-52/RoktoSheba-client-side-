// src/Pages/Shared/RoktoLoading/RoktoLoading.jsx
import React from "react";
import { FaTint } from "react-icons/fa";

const RoktoLoading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center text-red-600">
      <div className="animate-bounce mb-4 text-5xl">
        <FaTint className="drop-shadow" />
      </div>
      <p className="text-lg font-semibold animate-pulse">
        Loading RoktoSheba...
      </p>
    </div>
  );
};

export default RoktoLoading;
