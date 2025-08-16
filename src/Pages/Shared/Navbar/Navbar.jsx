import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import RoktoShebaLogo from "../RoktoShebaLogo";
import Button from "../Button/Button";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

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
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          About Us
        </NavLink>
      </li>
      {user && (
        <>
          {/* <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-red-600 font-bold" : "text-gray-600"
              }
            >
              Dashboard
            </NavLink>
          </li> */}
          <li>
            <NavLink
              to="/dashboard/funding"
              className={({ isActive }) =>
                isActive ? "text-red-600 font-bold" : "text-gray-600"
              }
            >
              Funding
            </NavLink>
          </li>
        </>
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
      .then(() => {
        setOpenDropdown(false);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto  flex items-center w-full pr-2 ">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <RoktoShebaLogo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="cursor-pointer"
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-500 hover:ring-2 hover:ring-red-300 transition"
                />
              </div>

              {/* Dropdown menu */}
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-red-200 rounded-xl shadow-lg z-50">
                  <div className="px-4 py-3 bg-gradient-to-br from-red-100 to-red-50 rounded-t-xl">
                    <h4 className="font-semibold text-gray-800">
                      {user.displayName || "User"}
                    </h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-red-100 hover:text-red-700 transition"
                        onClick={() => setOpenDropdown(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-700 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
    </div>
  );
};

export default Navbar;
