import React, { useEffect } from "react";
import TitleSection from "../components/TitleSection";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsApi } from "../api/productApi";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { loadingProducts, productList } from "../redux/slices/productSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  setLoadingWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";
import { getUserWishlistApi } from "../api/wishlistApi";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { products, isLoadingProducts } = useSelector((state) => state.product);
  const { userWishlist, isLoadingWishlist } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        dispatch(setLoadingWishlist(true));
        const res = await getUserWishlistApi({
          userId: currentUser?._id,
          token: currentUser?.token,
        });
        dispatch(setUserWishlist(res?.wishlist));
        dispatch(setLoadingWishlist(false));
      } catch (error) {
        console.log(error);
        setUserWishlist([]);
        dispatch(setLoadingWishlist(false));
      }
    };
    fetchWishlist();
  }, [currentUser?._id, currentUser?.token, dispatch]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(loadingProducts(true));
        const res = await getAllProductsApi();
        dispatch(productList(res?.docs));
        dispatch(loadingProducts(false));
      } catch (error) {
        dispatch(productList([]));
        dispatch(loadingProducts(false));
      }
    }
    fetchProducts();
  }, [dispatch]);

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
