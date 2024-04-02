import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { BiSolidBinoculars } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { SAMPLE_IMAGES } from "../utils/project-images";

const ProductCard = () => {
  return (
    <div className="group relative max-w-[400px] w-full h-[500px] border border-gray border-opacity-15 bg-light">
      <div className="relative -z-20 bg-blue-gray-100 overflow-hidden">
        <img
          className="w-full h-[276px] object-cover"
          src={SAMPLE_IMAGES.sampleProduct}
          alt=""
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
          Smartphones and Tablets
        </span>
        <h1 className="text-xl hover:text-amber-600 transition-all cursor-pointer">
          Apple – Watch Series 3 with White Sport Band
        </h1>
        <h2 className="text-2xl text-amber-600 font-bold">$22.4</h2>
        <div className="flex items-center gap-5 opacity-50">
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <FaStar key={index} />
              ))}
          </div>
          <span className="capitalize text-gray text-opacity-60">
            (2 reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
