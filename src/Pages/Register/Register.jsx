import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `Welcome, ${data.name}!`,
    });

    reset();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Your full name"
            className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="your@email.com"
            className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Password"
            className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-medium mb-1">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Select your blood group" })}
            className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.bloodGroup
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          >
            <option value="">Select...</option>
            <option value="A+">A+</option>
            <option value="A−">A−</option>
            <option value="B+">B+</option>
            <option value="B−">B−</option>
            <option value="O+">O+</option>
            <option value="O−">O−</option>
            <option value="AB+">AB+</option>
            <option value="AB−">AB−</option>
          </select>
          {errors.bloodGroup && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block font-medium mb-1">District</label>
          <input
            type="text"
            {...register("district", { required: "District is required" })}
            placeholder="Your district"
            className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
              errors.district
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-500"
            }`}
          />
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="text"
            {...register("photoURL")}
            placeholder="https://example.com/avatar.jpg"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Register
        </button>

        {/* Link to Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
