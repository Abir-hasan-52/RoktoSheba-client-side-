import React from "react";

import logo from "../../assets/Rokto Sheba logo.png";
import { Link } from "react-router";
const RoktoShebaLogo = () => {
  return (
    <Link to="/">
      <div className="flex justify-center items-center  ">
        <img className="w-[60px] rounded-full" src={logo} alt="" />
        <h1 className="text-3xl font-bold text-red-600 tracking-wide drop-shadow-md">
          Rokto<span className="text-gray-900">Sheba</span>
        </h1>
      </div>
    </Link>
  );
};

export default RoktoShebaLogo;
