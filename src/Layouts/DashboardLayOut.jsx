import React from "react";
import { Link, NavLink, Outlet } from "react-router";

import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import RoktoShebaLogo from "../Pages/Shared/RoktoShebaLogo";

const DashboardLayOut = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none  ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 lg:hidden flex-1 px-2">DashBoard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <RoktoShebaLogo />

          <li>
            <Link to="/">
              <AiFillHome className="inline-block mr-1" /> Home
            </Link>
          </li>

          <li>
            <NavLink to="/dashboard/myDonation">
              <FaBoxOpen className="inline-block mr-1" /> My Donation
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/createDonation">
              <FaMoneyCheckAlt className="inline-block mr-1" /> Create Donation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allUsers">
              <FaMoneyCheckAlt className="inline-block mr-1" />  All User
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allDonation">
              <FaMoneyCheckAlt className="inline-block mr-1" />  All Donation
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayOut;
