import React from "react";
import { SORT_CATEGORIES } from "../utils/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const TopSellingProduct = () => {
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Top Selling Products</h1>

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

      <div className=" mt-5">
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
              items: 4,
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

export default TopSellingProduct;
