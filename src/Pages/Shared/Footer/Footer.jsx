import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import RoktoShebaLogo from "../RoktoShebaLogo";
  

const Footer = () => {
  return (
    <footer className="bg-red-900 text-red-100 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Logo & Description */}
        <div className="md:w-1/3 space-y-4">
          <RoktoShebaLogo />
          <p className="text-red-300">
            RoktoSheba connects donors and recipients for life-saving blood
            donations across Bangladesh.
          </p>
          <div className="flex space-x-4 text-red-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/donation-requests"
                className="hover:text-white transition"
              >
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/dashboard/funding" className="hover:text-white transition">
                Funding
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition">
                Search Donor
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <p>
            Phone:{" "}
            <a href="tel:+880123456789" className="hover:text-white transition">
              +880 1639 448 792
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@roktosheba.com"
              className="hover:text-white transition"
            >
              info@roktosheba.com
            </a>
          </p>
          <p className="mt-4 text-sm text-red-400">
            &copy; {new Date().getFullYear()} RoktoSheba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
