import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for reaching out. We will contact you soon.",
    });
    reset();
  };

  return (
    <section className="bg-red-50 py-16 px-4 md:px-6 lg:px-8" id="contact">
        <h2 className="text-3xl font-bold text-red-700 mb-8 pb-5 text-center">
        Contact Us
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side - Info */}
        <div className="text-center md:text-left">
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
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-red-600 text-2xl hover:scale-110 transition" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-red-600 text-2xl hover:scale-110 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-red-600 text-2xl hover:scale-110 transition" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-red-600 text-2xl hover:scale-110 transition" />
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 rounded-md shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="label font-medium text-red-700">
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label font-medium text-red-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="you@example.com"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-red-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="label font-medium text-red-700">
                Phone
              </label>
              <input
                id="phone"
                {...register("telephone")}
                placeholder="Phone number"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="label font-medium text-red-700">
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                placeholder="Subject"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="label font-medium text-red-700">
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              placeholder="Ask your question here"
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              }`}
            />
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white w-full transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
