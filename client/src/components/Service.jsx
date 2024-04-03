import React from "react";
import { GoRocket } from "react-icons/go";
import { IoReload, IoAlertCircleOutline } from "react-icons/io5";
import { GrSupport } from "react-icons/gr";

const Service = () => {
  return (
    <div className="mt-20 space-y-5">
      <h1 className="font-bold text-3xl text-center">Our Services</h1>
      <div className=" grid grid-cols-4 gap-5">
        <ServiceCard
          icon={<GoRocket size={40} />}
          title="Free Shipping"
          caption="orders $50 or more"
        />
        <ServiceCard
          icon={<IoReload size={40} />}
          title="Free Returns"
          caption="within 30 days"
        />
        <ServiceCard
          icon={<IoAlertCircleOutline size={40} />}
          title="Get 20% Off 1 Item"
          caption="When you sign up"
        />
        <ServiceCard
          icon={<GrSupport size={40} />}
          title="We Support"
          caption="24/7 amazing services"
        />
      </div>
    </div>
  );
};

export default Service;

function ServiceCard({ icon, title, caption }) {
  return (
    <div className="flex items-center border justify-center hover:-translate-y-3 transition-all duration-200 gap-5 bg-gray-100 px-5 py-10 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 ">
        <h1 className="font-bold">{title}</h1>
        <p className="opacity-50">{caption}</p>
      </div>
    </div>
  );
}
