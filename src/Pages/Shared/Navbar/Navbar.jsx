import React from "react";
import { Link, NavLink } from "react-router";
import RoktoShebaLogo from "../RoktoShebaLogo";
import Button from "../Button/Button";

const Navbar = () => {
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
          to="/donationRequests"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Donation Requests 
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "text-red-600 font-bold" : "text-gray-600"
          }
        >
          Blog 
        </NavLink>
      </li>
    </>
  );

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
        <Button  variant="outline"> login</Button>
      </div>
    </div>
  );
};

export default Navbar;
