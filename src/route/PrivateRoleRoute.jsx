import React from "react";
import useAuth from "../Hooks/useAuth";
import BloodLoading from "../Pages/Shared/BloodLoading/BloodLoading";
import useUserRole from "../Hooks/useUserRole";
import { Navigate } from "react-router";

const PrivateRoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <BloodLoading />;
  }

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default PrivateRoleRoute;
