import React from "react";
import useAuth from "../Hooks/useAuth";
import BloodLoading from "../Pages/Shared/BloodLoading/BloodLoading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();
  if (loading) {
    return <BloodLoading />;
  }

  if (!user) {
    return (
      <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
