import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBlogDetail from "../hooks/useGetProductDetail";
import { Typography, Button } from "@material-tailwind/react";
import { displayRating } from "../components/displayRating";
import BoxQuantityProduct from "../components/BoxQuantityProduct";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import parse from "html-react-parser";
import useGeRealtedProducts from "../hooks/useGeRealtedProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { product: p } = useGetBlogDetail(id);
  const { relatedProducts, isLoading } = useGeRealtedProducts(p?.category);
  const [selectedImage, setSelectedImage] = useState("");

  const addProductToCart = () => {
    toast.info("Product added to cart", { position: "top-right" });
  };

  const addProductToWishlist = () => {
    toast.info("Product added to wishlist", { position: "top-right" });
  };

  return (
    <div className="my-10">
      <section className="grid grid-cols-2 gap-5">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-2">
            {p?.images?.map((item, index) => (
              <div
                onClick={() => setSelectedImage(item)}
                key={index}
                className={`${
                  selectedImage === item
                    ? "border-amber-600"
                    : "border-transparent "
                } aspect-square border-2 w-[100px] h-[100px]`}
              >
                <img
                  src={item}
                  alt=""
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>

          <div className="group overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage || p?.thumbnails[0]}
              alt=""
              className="object-contain group-hover:scale-110 transition-all"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          <span className="hover:underline hover:text-amber-600 capitalize transition-all cursor-pointer">
            {p?.category}
          </span>

          <Typography className="font-medium text-2xl hover:text-amber-600 transition-all">
            {p?.name}
          </Typography>

          <div className="flex items-center gap-5 opacity-50">
            <div className="flex items-center gap-1 text-lg text-amber-600">
              {displayRating(p?.rating)}
            </div>
            <span className="capitalize text-gray text-opacity-60">
              {`${p?.reviews?.length || 0} Reviews`}
            </span>
          </div>

          <h2 className="text-4xl text-amber-600 font-bold">${p?.price}</h2>

          <p className="mt-2 opacity-60 font-normal line-clamp-5 text-justify">
            {p?.desc}
          </p>

          <BoxQuantityProduct />

          <div className="flex items-center gap-2">
            <Button
              onClick={addProductToCart}
              variant="outlined"
              color="amber"
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              <BsCart3 size={20} />
              Add to cart
            </Button>
            <Button
              onClick={addProductToWishlist}
              variant="text"
              color="amber"
              className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
            >
              <FaRegHeart size={20} />
              Add to wishlist
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-5">
        <Typography variant="lead">Additional Information</Typography>

        <div className="mt-5">{parse(p?.info || "")}</div>
      </div>

      <div className="mt-16">
        <Typography variant="lead" className="text-center font-medium text-2xl">
          You May Also Like
        </Typography>

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
            {isLoading &&
              Array(12)
                .fill(0)
                .map((item, index) => <ProductCardSkeleton key={index} />)}

            {!isLoading &&
              relatedProducts?.docs?.length > 0 &&
              relatedProducts?.docs?.map((item) => (
                <ProductCard key={item?._id} p={item} />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
