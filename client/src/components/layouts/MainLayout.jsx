import React from "react";
import Header from "../shared/Header";
import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Scrolltop from "../Scrolltop";
import Chatbox from "../Chatbox";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <section className="page-container">
        <Outlet />
      </section>
      {currentUser?.role === "user" && <Chatbox />}
      <Scrolltop />
      <Footer />
    </>
  );
};

export default MainLayout;
