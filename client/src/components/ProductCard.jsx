import React, { useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { displayRating } from "./displayRating";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { viewProductApi } from "../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlistApi, toggleWishlistApi } from "../api/wishlistApi";
import {
  setIsInWishlist,
  setUserWishlist,
} from "../redux/slices/wishlistSlice";
import { toast } from "sonner";
import { addProductToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { userWishlist } = useSelector((state) => state.wishlist);

  const handleAddProductToCart = () => {
    const productData = {
      id: p?._id,
      name: p?.name,
      image: p?.thumbnails[0],
      price: p?.price,
      quantity: 1,
    };

    dispatch(addProductToCart(productData));

    toast.info("Product added to cart", {
      position: "top-right",
      duration: 1000,
    });
  };

  const handleViewProduct = async () => {
    try {
      await viewProductApi(p?._id);
      navigate(`/product/${p?._id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Failed to update view count ->", error);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await toggleWishlistApi({
        userId: currentUser?._id,
        productId: p?._id,
        token: currentUser?.token,
      });
      const data = await getUserWishlistApi({
        userId: currentUser?._id,
        token: currentUser?.token,
      });
      dispatch(setUserWishlist(data?.wishlist));
      dispatch(setIsInWishlist((prevState) => !prevState));
      toast.info(res?.message, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  const isInWishlist = userWishlist.find((item) => item?._id === p?._id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative  border-2"
    >
      <div className="relative overflow-hidden">
        <div onClick={handleViewProduct}>
          <img
            className="w-full h-[276px] object-contain image select-none"
            src={hovered ? p?.thumbnails[1] : p?.thumbnails[0]}
            alt={p?.name}
          />
        </div>

        {isInWishlist ? (
          <div
            onClick={handleWishlist}
            className="cursor-pointer absolute flex justify-center items-center w-[40px] h-[40px] rounded-full right-3 top-3 bg-amber-600 transition-all text-white opacity-0 group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%] "
          >
            <FaHeart size={20} />
          </div>
        ) : (
          <div
            onClick={handleWishlist}
            className="cursor-pointer absolute flex justify-center items-center w-[40px] h-[40px] rounded-full right-3 top-3 bg-amber-600 transition-all opacity-0 group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%] "
          >
            <FaRegHeart size={20} />
          </div>
        )}

      <div className="absolute bottom-0 left-0 right-0 text-white text-xl flex items-center justify-evenly h-[45px] bg-black translate-y-[100%] group-hover:opacity-100 group-hover:translate-y-0 transition-all z-20">
          <FaCartPlus
            onClick={handleAddProductToCart}
            className=" cursor-pointer hover:text-amber-600"
          />
          <hr className="h-[60%] w-[1px] bg-white" />
          <BiSolidBinoculars
            onClick={handleViewProduct}
            className=" cursor-pointer hover:text-amber-600"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 bg-gray-50">
        <span className="opacity-50 text-sm hover:text-amber-600 transition-all cursor-pointer capitalize">
          {p?.category}
        </span>
        <h1
          onClick={handleViewProduct}
          className="text-lg hover:text-amber-600 transition-all cursor-pointer line-clamp-2 capitalize"
        >
          {p?.name}
        </h1>
        <h2 className="text-2xl text-amber-600 font-bold">${p?.price}</h2>
        <div className="flex items-center gap-5 opacity-50">
          <div className="flex items-center gap-1 text-lg text-amber-600">
            {displayRating(p?.rating)}
          </div>
          <span className="capitalize text-gray text-opacity-60">
            {`${p?.reviews?.length || 0} Reviews`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className=" border-2 animate-pulse">
      <div className="w-full h-[276px] flex items-center justify-center bg-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-20 w-20 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 bg-gray-50">
        <Typography
          as="div"
          variant="paragraph"
          className=" h-5 w-32 rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>
        <div className="space-y-2">
          <Typography
            as="div"
            variant="h1"
            className="h-6 w-full rounded-sm bg-gray-300"
          >
            &nbsp;
          </Typography>
          <Typography
            as="div"
            variant="h1"
            className="h-6 w-full rounded-sm bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
        <Typography
          as="div"
          variant="paragraph"
          className="h-6  w-40 rounded-sm bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
};
