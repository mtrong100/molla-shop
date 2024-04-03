import React from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SpecialCollection = () => {
  const [activeTab, setActiveTab] = React.useState("Featured");
  const tabTitles = ["Featured", "On Sale", "Top Rated"];

  return (
    <div className="mt-20">
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b w-full max-w-xl mx-auto border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {tabTitles.map((item) => (
            <Tab
              key={item}
              value={item}
              onClick={() => setActiveTab(item)}
              className={`${
                activeTab === item
                  ? "text-gray-900 opacity-100 "
                  : "opacity-50 hover:opacity-100"
              } text-3xl font-bold `}
            >
              {item}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="mt-8">
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
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default SpecialCollection;
