import React from "react";
import { useSelector } from "react-redux";
import Banner from "../components/Banner";
import SpecialCollection from "../components/SpecialCollection";
import BannerDeal from "../components/BannerDeal";
import TrendingProduct from "../components/TrendingProduct";
import TopSellingProduct from "../components/TopSellingProduct";
import Service from "../components/Service";
import ContactBanner from "../components/ContactBanner";

const Home = () => {
  // const { currentUser } = useSelector((state) => state.user);
  // console.log("🚀 ~ Home ~ currentUser:", currentUser);

  return (
    <div>
      <Banner />
      <SpecialCollection />
      <BannerDeal />
      <TrendingProduct />
      <TopSellingProduct />
      <Service />
      <ContactBanner />
    </div>
  );
};

export default Home;
