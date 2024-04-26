import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser?.role !== "admin") return null;

  return <div>Dashboard</div>;
};

export default Dashboard;
