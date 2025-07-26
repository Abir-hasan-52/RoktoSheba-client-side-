import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// Adjust the path as needed
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const ContactUs = () => {
  const axiosInstance = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send POST request with axiosSecure
      await axiosInstance.post("/contact-us", data);

      // Show success alert
      await Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. We will contact you soon.",
      });

      reset(); // reset form fields
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <section
      className="bg-red-50 py-16 px-4 md:px-6 lg:px-8"
      id="contact"
      aria-label="Contact us section"
    >
      <h2 className="text-3xl font-bold text-red-700 mb-8 pb-5 text-center">
        Contact Us
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side - Info */}
        <aside
          className="text-center md:text-left"
          aria-label="Contact information"
        >
          <h3 className="text-red-600 font-semibold">Get in Touch</h3>
          <h1 className="text-4xl md:text-5xl font-bold my-4 leading-tight">
            Have Questions About Blood Donation? Let's Chat!
          </h1>
          <p className="text-gray-600 mb-6">
            We’re always here to help and answer any questions you might have
            about blood donation. Reach out to us anytime!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div
              className="flex items-center gap-4 p-4 rounded-md shadow-md w-full sm:w-1/2 bg-white"
              role="region"
              aria-label="Phone contact"
            >
              <div className="bg-red-600 p-3 rounded">
                <FaPhoneAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-700">+880 1639 448 792</p>
              </div>
            </div>

            <div
              className="flex items-center gap-4 p-4 rounded-md shadow-md w-full sm:w-1/2 bg-white"
              role="region"
              aria-label="Email contact"
            >
              <div className="bg-red-600 p-3 rounded">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-700">support@bloodhelp.com</p>
              </div>
            </div>
          </div>

          <p className="font-semibold mb-2">Find Us On:</p>
          <nav
            className="flex gap-4 justify-center md:justify-start"
            aria-label="Social media links"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-red-600 text-2xl hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-red-600 text-2xl hover:scale-110 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-red-600 text-2xl hover:scale-110 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-red-600 text-2xl hover:scale-110 transition"
            >
              <FaYoutube />
            </a>
          </nav>
        </aside>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-md shadow-md"
          noValidate
          aria-label="Contact form"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="label font-medium text-red-700 mb-1 block"
            >
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              {...register("name", { required: "Name is required" })}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby="name-error"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="label font-medium text-red-700 mb-1 block"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="telephone"
              className="label font-medium text-red-700 mb-1 block"
            >
              Phone
            </label>
            <input
              id="telephone"
              type="tel"
              placeholder="Phone number"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              {...register("telephone")}
              aria-describedby="phone-help"
              disabled={isSubmitting}
            />
            
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="label font-medium text-red-700 mb-1 block"
            >
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              placeholder="Ask your question here"
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              rows={5}
              {...register("message", { required: "Message is required" })}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby="message-error"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p
                id="message-error"
                className="text-red-600 text-sm mt-1"
                role="alert"
              >
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full transition duration-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
