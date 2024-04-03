import React from "react";
import Header from "../shared/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Scrolltop from "../Scrolltop";

const MainLayout = () => {
  return (
    <>
      <Header />
      <section className="page-container">
        <Outlet />
      </section>
      <Scrolltop />
      <Footer />
    </>
  );
};

export default MainLayout;
