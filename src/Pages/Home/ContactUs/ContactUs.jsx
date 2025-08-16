import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // send mail with EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // Template ID
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY    // Public Key
      );

      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. We'll get back to you soon.",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send message. Please try again later.",
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
        {/* Left Side Info (unchanged) */}
        <aside className="text-center md:text-left">
          <h3 className="text-red-600 font-semibold">Get in Touch</h3>
          <h1 className="text-4xl md:text-5xl font-bold my-4 leading-tight">
            Have Questions About Blood Donation? Let's Chat!
          </h1>
          <p className="text-gray-600 mb-6">
            We’re always here to help and answer any questions you might have
            about blood donation. Reach out to us anytime!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            <div className="flex items-center gap-4 p-4 rounded-md shadow-md w-full sm:w-1/2 bg-white">
              <div className="bg-red-600 p-3 rounded">
                <FaPhoneAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-700">+880 1639 448 792</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-md shadow-md w-full sm:w-1/2 bg-white">
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
          <nav className="flex gap-4 justify-center md:justify-start">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl hover:scale-110 transition">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl hover:scale-110 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl hover:scale-110 transition">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-2xl hover:scale-110 transition">
              <FaYoutube />
            </a>
          </nav>
        </aside>

        {/* Right Side Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white p-6 rounded-md shadow-md"
          noValidate
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="label font-medium text-red-700 mb-1 block">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              {...register("name", { required: "Name is required" })}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label font-medium text-red-700 mb-1 block">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              {...register("email", { required: "Email is required" })}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="telephone" className="label font-medium text-red-700 mb-1 block">
              Phone
            </label>
            <input
              id="telephone"
              type="tel"
              placeholder="Phone number"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              {...register("telephone")}
              disabled={isSubmitting}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="label font-medium text-red-700 mb-1 block">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Ask your question here"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500 resize-none"
              {...register("message", { required: "Message is required" })}
              disabled={isSubmitting}
            />
            {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
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
