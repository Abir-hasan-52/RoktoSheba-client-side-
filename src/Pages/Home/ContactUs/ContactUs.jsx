import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    // Simulate API call with a small delay
    console.log(data)
    return new Promise((resolve) => {
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Thank you!",
          text: "Your message has been sent successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        resolve();
      }, 1000);
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-red-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Contact Us
      </h2>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 bg-white p-8 rounded-lg shadow-sm"
          noValidate
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-red-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              placeholder="Your full name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-red-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              placeholder="you@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-red-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              {...register("message", { required: "Message is required" })}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
              placeholder="Write your message here"
              disabled={isSubmitting}
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-red-700 mb-6">
            Need Help?
          </h3>
          <p className="text-gray-700 mb-4">
            Call our helpline for urgent assistance:
          </p>
          <p className="text-red-600 font-bold text-xl mb-4">
            +880 1234 567 890
          </p>
          <p className="text-gray-700">
            Or email us at{" "}
            <a
              href="mailto:info@roktosheba.com"
              className="text-red-600 hover:underline"
            >
              info@roktosheba.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
