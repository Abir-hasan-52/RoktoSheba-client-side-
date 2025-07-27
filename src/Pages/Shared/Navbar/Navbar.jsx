import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import RoktoShebaLogo from "../RoktoShebaLogo";
import Button from "../Button/Button";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-requests"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Search Donor
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-red-600 font-bold" : "text-gray-600"
            }
          >
            DashBoard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <div>
          <RoktoShebaLogo></RoktoShebaLogo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="relative group inline-block text-left">
            {/* Avatar + Tooltip */}
            <div className="flex items-center cursor-pointer space-x-2 group">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-red-500 hover:ring-2 hover:ring-red-300 transition"
              />
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-3 w-64 bg-white border border-red-200 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50">
              {/* User Info */}
              <div className="px-4 py-3 bg-gradient-to-br from-red-100 to-red-50 rounded-t-xl">
                <h4 className="font-semibold text-gray-800">
                  {user.displayName}
                </h4>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Links */}
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-red-100 hover:text-red-700 transition"
                  >
                    🧭 Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-red-100 hover:text-red-700 transition"
                  >
                    🚪 Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="hover:bg-red-100 transition"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
