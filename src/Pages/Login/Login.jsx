import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
 
// import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//   const { signInUser } = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const from = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log(data);
    // signInUser(data.email, data.password)
    //   .then((result) => {
    //     console.log(result.user);
    //     navigate(from);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-4xl font-extrabold">Welcome Back</h1>
        <p className="text-md font-semibold">Login with RoktoSheba</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters
              </p>
            )}

            {/* Forgot password link */}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn  bg-[#CAEB66] mt-4">
              Login
            </button>
          </fieldset>
          <div>
            <p className="link link-hover text-md">
              <strong>
                Don’t have any account?
                <Link className="text-yellow-500 underline" to="/register">
                  Register
                </Link>
              </strong>
            </p>
          </div>
        </form>
 
      </div>
    </div>
  );
};

export default Login;
