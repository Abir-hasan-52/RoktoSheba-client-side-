import React from "react";
import AuthImg from "../assets/AuthLogo.png";
import { Outlet } from "react-router";
import RoktoShebaLogo from "../Pages/Shared/RoktoShebaLogo";

const AuthLayOut = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Logo at top-left */}
      <div className="p-4 flex items-center justify-start">
        <RoktoShebaLogo />
      </div>

      {/* Centered auth section */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Form & Heading */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center lg:text-left">
              Join RoktoSheba. <br /> Donate Blood. Save Lives.
            </h2>
            <Outlet />
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={AuthImg}
              alt="Blood Donation"
              className="max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayOut;
