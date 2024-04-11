import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetBlogDetail from "../hooks/useGetProductDetail";
import { Typography, Button, Rating } from "@material-tailwind/react";
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

      <div className="mt-5 space-y-10">
        <div className="space-y-5">
          <Typography variant="h5">Additional Information</Typography>
          <div>{parse(p?.info || "")}</div>
        </div>

        <div className="space-y-3">
          <Typography variant="h5">Write your reviews</Typography>
          <div className="flex items-center gap-2">
            <p className="text-lg">Your rating: </p>
            <Rating value={4} />
          </div>

          <textarea
            className="min-h-[200px] focus:border-amber-600 border-gray-300 resize-none outline-none w-full border-2 p-4 rounded-lg text-lg"
            placeholder="Write your comments"
          ></textarea>

          <Button
            color="amber"
            className="ml-auto flex px-14"
            size="lg"
            type="submit"
          >
            {"Submit"}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-7">
        <Typography variant="lead">Total Reviews (5)</Typography>

        <ul className="space-y-5">
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-[50px] h-[50px]">
                  <img
                    src="https://source.unsplash.com/random"
                    alt=""
                    className="img-cover rounded-full"
                  />
                </div>

                <div className="space-y-1">
                  <div className="space-y-1">
                    <Typography variant="h6">username</Typography>
                    <Rating value={4} />
                    <Typography variant="small">Posted: 12/4/2023</Typography>
                  </div>

                  <Typography variant="paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                    omnis sequi enim id, quasi vero quis laborum? Aliquid qui
                    quaerat pariatur. Voluptate dolorem animi accusantium
                    maiores quia tempora temporibus ex. Minima libero
                    recusandae, dolor consequuntur veniam, odit laudantium, qui
                    similique repellendus earum at consequatur. Error, sunt
                    sequi quis iste excepturi quia nesciunt neque libero
                    aspernatur voluptates illo, voluptas labore id.
                  </Typography>
                </div>
              </li>
            ))}
        </ul>

        <Button
          color="amber"
          className="mx-auto flex justify-center items-center"
          size="lg"
          type="submit"
        >
          {"Load more comments"}
        </Button>
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
