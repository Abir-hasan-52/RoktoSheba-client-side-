import React from "react";
// import aboutImg from "../../../assets/about-blood-donation.jpg"; // replace with your image path
import { FaHeartbeat } from "react-icons/fa";

const About = () => {
  const aboutImg =
    "https://i.ibb.co.com/0jZXgkPH/Black-and-White-Red-Gradient-Syria-and-Turkey-Earthquake-Donation-Instagram-Post-1.png";
  return (
    <section className="bg-red-50 py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left - Image */}
        <div className="flex-1">
          <img
            src={aboutImg}
            alt="Blood donation"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
          />
        </div>

        {/* Right - Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <FaHeartbeat className="text-red-500" />
            About Roktosheba
          </h2>
          <p className="text-gray-700 mb-4">
            Roktosheba is a voluntary blood donation platform dedicated to
            saving lives by connecting donors with patients in need. Our mission
            is to build a bridge between humanity and hope — ensuring that no
            life is lost due to unavailability of blood.
          </p>
          <p className="text-gray-700 mb-4">
            Through Roktosheba, anyone can register as a donor, request blood in
            emergencies, and find matching donors quickly and securely. We
            believe that a single drop of blood can give someone a new chance at
            life.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Promote safe and voluntary blood donation</li>
            <li>Make blood available anytime, anywhere across Bangladesh</li>
            <li>Build a strong network of donors and volunteers</li>
            <li>
              Spread awareness about the importance of donating blood regularly
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            Join us in our mission to save lives. Every drop counts, and your
            contribution can make a difference. Together, we can create a
            healthier, stronger community.
          </p>
          <div className="mt-6">
            <a
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
            >
              Become a Donor
            </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
