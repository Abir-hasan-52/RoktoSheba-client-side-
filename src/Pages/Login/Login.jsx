import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
    const {signInUser}=useAuth()
    const location = useLocation();
    const from=location.state?.from ||'/';
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // You can replace this with Firebase or JWT login call
    console.log("Login Data:", data);

    signInUser(data.email, data.password)
      .then(result => {
        console.log(result);
        // Example success feedback
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${data.email}`,
        });
        // Navigate to dashboard or home
        navigate(from);
      })
      .catch(error => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });

     
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="you@example.com"
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
            {...register("password", { required: "Password is required" })}
            placeholder="Your password"
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login
        </button>

        {/* Link to Register */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
