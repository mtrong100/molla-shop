import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { displayRating } from "./displayRating";

const ProductCard = ({ p }) => {
  const [hovered, setHovered] = useState(false);
  const [thumbnailHover, setThumbnailHover] = useState(null);

  useEffect(() => {
    if (p?.thumbnails[1]) {
      const image = new Image();
      image.src = p.thumbnails[1];
      image.onload = () => {
        setThumbnailHover(image.src);
      };
    }
  }, [p?.thumbnails[1]]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative h-[500px] border-2"
    >
      <div className="relative -z-20 overflow-hidden">
        <img
          className="w-full h-[276px] object-contain image "
          src={hovered ? thumbnailHover || p?.thumbnails[1] : p?.thumbnails[0]}
          alt={p?.name}
        />

        <div className="absolute flex justify-center items-center w-[40px] h-[40px] rounded-full right-3 top-3 bg-amber-600 transition-all opacity-0 group-hover:opacity-90 -translate-x-[50%] group-hover:translate-x-[5%] ">
          <FaRegHeart />
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white text-xl flex items-center justify-evenly h-[50px] bg-black translate-y-[100%] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all">
          <div>
            <FaCartPlus className="hover:text-yellow" />
          </div>
          <hr className="h-[60%] w-[1px] bg-white" />
          <div>
            <BiSolidBinoculars className="hover:text-yellow" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 bg-gray-50">
        <span className="opacity-50 text-sm hover:text-amber-600 transition-all cursor-pointer">
          {p?.category}
        </span>
        <h1 className="text-lg hover:text-amber-600 transition-all cursor-pointer line-clamp-2">
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
