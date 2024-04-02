import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import SpecialCollection from "../components/SpecialCollection";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("🚀 ~ Home ~ currentUser:", currentUser);

  return (
    <div className="h-[100vh]">
      <Banner />
      <SpecialCollection />
    </div>
  );
};

export default Home;
