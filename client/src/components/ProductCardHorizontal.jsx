import { Button } from "@material-tailwind/react";
import React from "react";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { BiSolidBinoculars } from "react-icons/bi";

const ProductCardHorizontal = () => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_220px] gap-5 items-center">
      <div className="flex items-center gap-5">
        <div className="w-[200px] h-[200px] flex-shrink-0 group overflow-hidden">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="img-cover rounded-sm group-hover:scale-110 transition-all duration-300"
          />
        </div>

        <div>
          <span className="opacity-50 text-sm hover:text-amber-600 transition-all cursor-pointer">
            Smartphones and Tablets
          </span>
          <h1 className="text-xl hover:text-amber-600 transition-all cursor-pointer">
            Apple – Watch Series 3 with White Sport Band
          </h1>
          <p className="mt-3 opacity-60 font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            ex perferendis fugit ratione nemo, odio aliquam quas nam labore,
            pariatur id, quibusdam delectus necessitatibus. Voluptatibus numquam
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl text-amber-600 font-bold">$22.4</h2>

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

        <div className="grid grid-cols-2 gap-5 text-xs opacity-60 items-center">
          <div className="flex items-center gap-2 hover:text-amber-600 cursor-pointer">
            <BiSolidBinoculars size={18} className="hover:text-yellow" />
            Quick View
          </div>
          <div className="flex items-center gap-2 hover:text-amber-600 cursor-pointer">
            <FaRegHeart size={18} />
            Wishlist
          </div>
        </div>

        <Button
          variant="outlined"
          color="amber"
          className="flex rounded-none items-center gap-3 hover:bg-amber-600 hover:text-white w-full justify-center"
        >
          <BsCart3 size={20} />
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
