import React from "react";
import { Outlet } from "react-router-dom";
import Scrolltop from "../Scrolltop";

const DashboardLayout = () => {
  return (
    <section className="relative flex items-start">
      {/* <MultiLevelSidebar /> */}
      <main className="p-5 w-full">
        <Outlet />
      </main>
      <Scrolltop />
    </section>
  );
};

export default DashboardLayout;
