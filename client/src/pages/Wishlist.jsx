import React from "react";
import TitleSection from "../components/TitleSection";
import { useSelector } from "react-redux";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Navigate } from "react-router-dom";
import useGetProduct from "../hooks/useGetProduct";
import useWishlist from "../hooks/useWishlist";

const Wishlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { products, isLoadingProducts } = useGetProduct();
  const { userWishlist, isLoadingWishlist } = useWishlist();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="my-10 space-y-20">
      <section>
        <TitleSection>Your wishlist</TitleSection>

        <ul className="grid grid-cols-4 gap-2 mt-5">
          {isLoadingWishlist &&
            Array(12)
              .fill(0)
              .map((item, index) => <ProductCardSkeleton key={index} />)}

          {!isLoadingWishlist && userWishlist.length === 0 && (
            <p className="text-xl font-semibold opacity-50 text-center my-10">
              Your wishlist is currently empty
            </p>
          )}

          {!isLoadingWishlist &&
            userWishlist.length > 0 &&
            userWishlist.map((item) => (
              <ProductCard key={item?._id} p={item} />
            ))}
        </ul>
      </section>

      <section>
        <TitleSection>Recommended for you</TitleSection>

        <div className="mt-5">
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
            {isLoadingProducts &&
              Array(12)
                .fill(0)
                .map((item, index) => <ProductCardSkeleton key={index} />)}

            {!isLoadingProducts &&
              products.length > 0 &&
              products.map((item) => <ProductCard key={item?._id} p={item} />)}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
