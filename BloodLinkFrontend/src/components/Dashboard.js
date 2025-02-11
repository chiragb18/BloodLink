import React from "react";
import { useNavigate } from "react-router-dom";
import DonorDashboard from "./DonorDashboard";
import HospitalDashboard from "./HospitalDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    // Redirect to login page if no user found
    navigate("/login");
    return null;
  }

  return (
    <div>
      {user.role === "DONOR" && <DonorDashboard />}
      {user.role === "HOSPITAL" && <HospitalDashboard />}
      {user.role === "ADMIN" && <AdminDashboard />}
    </div>
  );
};

export default Dashboard;
