import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BannerDeal = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20">
      <div className="bg-cover bg-center bg-no-repeat bg-banner-4 p-3 ">
        <div className=" bg-white px-5 py-12 grid grid-cols-3 items-center w-full">
          <div className="text-2xl font-bold text-right pr-5">
            <span className="text-amber-600">New Deals</span>
            <h2>Start Daily at 12pm e.t.</h2>
          </div>

          <div className="opacity-50 pl-5">
            <p>GetFREE SHIPPING* & 5% rewards on</p>
            <p>every order with Molla Theme rewards program</p>
          </div>

          <Button
            onClick={() => navigate("/shop")}
            variant="text"
            color="amber"
            size="sm"
            className="flex items-center w-[265px] justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full h-[45px]"
          >
            Check it out now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerDeal;
