import React from "react";
import { Link } from "react-router";

const Button = ({
  children,
  to, // if `to` is passed, render <Link>
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  onClick,
  icon: Icon,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300";

  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    outline: "border border-red-600 text-red-600 hover:bg-red-50",
    danger: "bg-red-700 hover:bg-red-800 text-white",
  };

  const content = (
    <>
      {loading && <span className="loading loading-spinner loading-xs" />}
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;
