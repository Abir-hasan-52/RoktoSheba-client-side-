import React from "react";
 
 
import BloodLoading from "../../Shared/BloodLoading/BloodLoading";
import AdminDashboardHome from "../AdminDashboardHome/AdminDashboardHome";
import DonorDashboardHome from "../DonorDashboardHome/DonorDashboardHome";
import useUserRole from "../../../Hooks/useUserRole";
 

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return  <BloodLoading></BloodLoading>;  
  }

  if (role === "admin" || role === "volunteer") {
    return <AdminDashboardHome />;
  }

  return <DonorDashboardHome />;
};

export default DashboardHome;
