import React from "react";
import { Link } from "react-router";
import { FaTint } from "react-icons/fa";
// import heroBg from "../../assets/hero-bg.jpg"; // apnar bg image path

const Banner = () => {
  return (
    <section
      className="relative bg-red-900 bg-cover bg-center bg-no-repeat text-white py-20"
      style={{
        backgroundImage: `url('https://i.ibb.co/nNt2YCRW/Red-and-White-Modern-3-D-Blood-World-Blood-Donor-Day-Banner.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-red-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center md:justify-start gap-2">
            <FaTint className="text-red-400 animate-pulse" size={40} />
            Donate Blood, Save Lives
          </h1>
          <p className="text-lg max-w-lg mx-auto md:mx-0 text-red-200">
            Join RoktoSheba to help patients in need. Your donation can be
            someone's lifeline. Become a hero today!
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <Link to="/register">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-lg transition">
                Join as a Donor
              </button>
            </Link>
            <Link to="/search">
              <button className="border border-red-400 text-red-400 hover:bg-red-700 hover:text-white px-6 py-2 rounded-xl text-lg transition">
                Search Donors
              </button>
            </Link>
          </div>
        </div>

        {/* Optional Right Content or Empty */}
        <div className="md:w-1/2 hidden md:block">
          {/* Optional image or blank */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
