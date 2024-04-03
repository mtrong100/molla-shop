import React from "react";
import { SORT_CATEGORIES } from "../utils/constants";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import { SAMPLE_IMAGES } from "../utils/project-images";

const TrendingProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Trending Products</h1>

        <ul className="flex items-center gap-5">
          {SORT_CATEGORIES.map((item) => (
            <li
              className="opacity-50 text-sm uppercase hover:text-amber-600 cursor-pointer transition-all"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-[300px_minmax(0,_1fr)] gap-10 mt-5">
        <div className="h-[500px]">
          <img src={SAMPLE_IMAGES.cardImage} alt="card-image" />

          <Button
            onClick={() => navigate("/shop")}
            variant="text"
            color="amber"
            size="sm"
            className="flex rounded-none text-lg h-[48px] hover:bg-amber-700 items-center gap-2 bg-amber-600 text-white w-full justify-center"
          >
            Shop now
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

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass="carousel-item"
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Carousel>
      </div>
    </div>
  );
};

export default TrendingProduct;
