import React from "react";
import { Button, Carousel, IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        {/* Slides */}
        <Carousel
          className="rounded-xl"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4 bg-gray-400/40 hover:bg-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-gray-400/40 hover:bg-amber-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
        >
          <SlideCard
            caption="Daily Deals"
            title="Airpods Earphones"
            price="247.99"
          />
          <SlideCard
            caption="Deals and Promotions"
            title="Echo Dot 3rd Gen"
            price="29.99"
          />
        </Carousel>

        {/* Small banners */}
        <div className="grid grid-cols-1 gap-2">
          <BannerCard
            className="bg-banner-1"
            smallText="Top product"
            title="Edifier Stereo Bluetooth"
          />
          <BannerCard
            className="bg-banner-2"
            smallText="Clearance"
            title="GoPro - Fusion 360, DarkCoal"
          />
          <BannerCard
            className="bg-banner-3"
            smallText="Featured"
            title="Apple Watch 4, Pink Lotus"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

function BannerCard({ smallText, title, className }) {
  const navigate = useNavigate();

  return (
    <div
      className={`${className} bg-cover bg-center bg-no-repeat py-5 px-7  rounded-lg`}
    >
      <span className="text-sm opacity-70">{smallText}</span>
      <h1 className="mt-1 font-bold text-lg w-full max-w-[150px]">{title}</h1>

      <Button
        onClick={() => navigate("/shop")}
        variant="text"
        color="amber"
        size="sm"
        className="mt-1 flex items-center gap-2 hover:rounded-full hover:text-white hover:bg-amber-600"
      >
        Shop now{" "}
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
  );
}

function SlideCard({ caption, title, price }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center h-full items-start bg-slide-1 bg-cover bg-center bg-no-repeat px-24 rounded-lg">
      <span className="text-amber-600 text-xl font-medium">{caption}</span>
      <h1 className="text-5xl font-extrabold mt-1 w-full max-w-[250px] leading-tight">
        {title}
      </h1>

      <div className="text-lg my-4">
        Today:{" "}
        <span className="text-amber-600 text-5xl font-bold">${price}</span>
      </div>

      <Button
        onClick={() => navigate("/shop")}
        variant="filled"
        color="amber"
        size="lg"
        className="rounded-full flex items-center gap-2 mt-4"
      >
        Click here
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
  );
}
