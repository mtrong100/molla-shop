import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useGetBlogDetail from "../hooks/useGetProductDetail";
import { Typography, Button, Rating } from "@material-tailwind/react";
import { displayRating } from "../components/displayRating";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import parse from "html-react-parser";
import useGetRelatedProducts from "../hooks/useGetRelatedProducts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { displayTextColor, formatDate } from "../utils/helper";
import { addProductToCart } from "../redux/slices/cartSlice";
import useReview from "../hooks/useReview";
import useFavorite from "../hooks/useFavorite";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { product: p } = useGetBlogDetail(id);
  const { relatedProducts, isLoading } = useGetRelatedProducts(p?.category);
  const { handleToggleFavorite, userWishlist } = useFavorite();

  console.log(p);

  const {
    handleDeleteReview,
    handleWriteReview,
    handleLoadMoreReview,
    setVal,
    val,
    setRating,
    rating,
    reviews,
    isLoading: isLoadingReviews,
    isAdding,
  } = useReview();

  const handleAddProductToCart = () => {
    const productData = {
      id: p?._id,
      name: p?.name,
      image: selectedImage || p?.thumbnails[0],
      price: p?.price,
      quantity,
    };
    dispatch(addProductToCart(productData));
    toast.success("Product added to your cart");
  };

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const isInWishlist = userWishlist.find((item) => item?._id === p?._id);

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
            {p?.name || ""}
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

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-5">
              <h1>Quanity: </h1>
              <div className="border border-gray-500 w-fit rounded-md h-[50px] flex items-center ">
                <button
                  className="text-2xl font-medium w-[50px] h-[50px]"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="mx-4">{quantity}</span>
                <button
                  className="text-2xl font-medium w-[50px] h-[50px]"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <h1>Color: </h1>
              <p
                className={`${displayTextColor(
                  p?.color
                )} capitalize font-semibold text-lg`}
              >
                {p?.color}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {p?.stock === 0 ? (
              <Button
                disabled
                variant="outlined"
                color="red"
                className="w-full opacity-50 cursor-not-allowed"
              >
                Out of stock
              </Button>
            ) : (
              <Button
                onClick={handleAddProductToCart}
                variant="outlined"
                color="amber"
                className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
              >
                <BsCart3 size={20} />
                Add to cart
              </Button>
            )}

            {isInWishlist ? (
              <Button
                onClick={() => handleToggleFavorite(id)}
                variant="text"
                color="amber"
                className="flex rounded-none items-center gap-3  w-full justify-center"
              >
                <FaHeart size={20} />
                Added to wishlist
              </Button>
            ) : (
              <Button
                onClick={() => handleToggleFavorite(id)}
                variant="text"
                color="amber"
                className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
              >
                <FaRegHeart size={20} />
                Add to wishlist
              </Button>
            )}
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
            <Rating onChange={(val) => setRating(val)} value={rating} />
          </div>

          <textarea
            value={val}
            required
            onChange={(e) => setVal(e.target.value)}
            className="min-h-[200px] focus:border-amber-600 border-gray-300 resize-none outline-none w-full border-2 p-4 rounded-lg text-lg"
            placeholder="Write your comments"
          ></textarea>

          <Button
            disabled={isAdding}
            onClick={() => handleWriteReview(id)}
            color="amber"
            className="ml-auto flex px-14"
            size="lg"
            type="submit"
          >
            {isAdding ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-7">
        <Typography variant="lead">
          Total Reviews ({reviews?.totalDocs || 0})
        </Typography>

        <ul className="space-y-5">
          {isLoadingReviews && (
            <p className="text-lg font-medium opacity-60 text-center">
              Loading reviews...
            </p>
          )}

          {!isLoadingReviews && reviews?.docs?.length === 0 && (
            <p className="text-lg font-medium opacity-60 text-center">
              There is no reviews yet
            </p>
          )}

          {!isLoadingReviews &&
            reviews?.docs?.length > 0 &&
            reviews?.docs?.map((item) => (
              <UserComment
                key={item?._id}
                item={item}
                onDelete={handleDeleteReview}
              />
            ))}
        </ul>

        {reviews?.totalDocs > 5 && (
          <Button
            disabled={isLoadingReviews}
            onClick={handleLoadMoreReview}
            color="amber"
            className="mx-auto flex justify-center items-center"
            size="lg"
            type="submit"
          >
            {isLoadingReviews ? "Loading..." : "Load more reviews"}
          </Button>
        )}
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

function UserComment({ item, onDelete }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 w-[50px] h-[50px]">
        <img
          src={item?.user?.avatar}
          alt={item?.user?.name}
          className="img-cover rounded-full"
        />
      </div>

      <div className="space-y-1">
        <div className="space-y-1">
          <Typography variant="h6">{item?.user?.name}</Typography>
          <Rating value={Number(item?.rate)} />
          <Typography variant="small">
            Posted: {formatDate(item?.createdAt)}
          </Typography>
        </div>

        <Typography variant="paragraph">{item?.comment}</Typography>

        {item?.user?._id === currentUser?._id && (
          <button
            onClick={() => onDelete(item?._id)}
            className=" cursor-pointer text-red-600 hover:underline font-medium"
          >
            {"Delete"}
          </button>
        )}
      </div>
    </li>
  );
}
