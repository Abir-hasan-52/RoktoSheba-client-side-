import React from "react";
import { Link, NavLink, Outlet } from "react-router";

import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaUserCheck,
  FaUserClock,
  FaHandsHelping,
  FaDonate,
} from "react-icons/fa";
import { MdLocalShipping, MdOutlineManageAccounts } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import RoktoShebaLogo from "../Pages/Shared/RoktoShebaLogo";
import { FaHandHoldingMedical, FaNotesMedical, FaUsers } from "react-icons/fa6";
import useUserRole from "../Hooks/useUserRole";
import { CgProfile } from "react-icons/cg";

const DashboardLayOut = () => {
  const { role, roleLoading } = useUserRole();
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden sticky top-0 z-50">
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
          <div className="mx-2 lg:hidden flex-1 px-2">
            {" "}
            <RoktoShebaLogo />
          </div>
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
        <ul className="menu bg-red-50 text-red-900 min-h-full w-80 p-4 font-medium">
          {/* Logo */}
          <div className="mb-6">
            <RoktoShebaLogo />
          </div>

          {/* Nav Items */}
          {!roleLoading && role === "donor" && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <AiFillHome className="inline-block mr-2 text-lg" />
                  Donor Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/myDonation"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <FaHandHoldingMedical className="inline-block mr-2 text-lg" />
                  My Donation
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/createDonation"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <FaNotesMedical className="inline-block mr-2 text-lg" />
                  Create Donation
                </NavLink>
              </li>
            </>
          )}
          {/* admin */}
          {!roleLoading && (role === "admin" || role === "volunteer") && (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <AiFillHome className="inline-block mr-2 text-lg" />
                  Dashboard Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/allDonation"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <FaHandsHelping className="inline-block mr-2 text-lg" />
                  All Donations
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <MdOutlineManageAccounts className="inline-block mr-2 text-lg" />
                  Content Management
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-red-200 text-red-700 font-semibold rounded"
                      : "hover:bg-red-100 rounded"
                  }
                >
                  <FaUsers className="inline-block mr-2 text-lg" />
                  All Users
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to="/dashboard/Funding"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-200 text-red-700 font-semibold rounded"
                  : "hover:bg-red-100 rounded"
              }
            >
              <FaDonate className="inline-block mr-2 text-lg" />
              Funding
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-red-200 text-red-700 font-semibold rounded"
                  : "hover:bg-red-100 rounded"
              }
            >
              <CgProfile  className="inline-block mr-2 text-lg" />
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayOut;
