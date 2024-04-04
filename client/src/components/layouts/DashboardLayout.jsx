import React from "react";
import { Outlet } from "react-router-dom";
import Scrolltop from "../Scrolltop";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="relative flex items-start">
      <Sidebar />
      <main className="p-5 w-full">
        <Outlet />
      </main>
      <Scrolltop />
    </section>
  );
};

export default DashboardLayout;
