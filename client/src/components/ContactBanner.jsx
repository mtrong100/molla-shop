import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";

const ICONS = [
  {
    icon: <FaFacebookF size={20} />,
    color: "bg-[#3b5998]",
  },
  {
    icon: <FaInstagram size={20} />,
    color: "bg-[#bc2a8d]",
  },
  {
    icon: <FaYoutube size={20} />,
    color: "bg-[#ff0000]",
  },
  {
    icon: <RiTwitterXLine size={20} />,
    color: "bg-black",
  },
];

const ContactBanner = () => {
  return (
    <div className="mt-20">
      <div className="bg-cover bg-center bg-no-repeat bg-banner-4 p-3 ">
        <div className="bg-white px-10 py-20 grid grid-cols-2 items-center place-items-center">
          <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="font-medium text-3xl">Shop Social</h1>
            <p className="opacity-50 text-lg text-center w-full max-w-sm">
              Donec nec justo eget felis facilisis fermentum. Aliquam porttitor
              mauris sit amet orci.
            </p>

            <ul className="flex items-center justify-center gap-4">
              {ICONS.map((item, index) => (
                <span
                  className={`${item.color} text-white w-[40px] h-[40px] flex items-center justify-center rounded-full`}
                  key={index}
                >
                  {item.icon}
                </span>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center gap-5 items-center">
            <h1 className="text-3xl font-medium">Get the Latest Deals</h1>
            <p>
              receive <span className="text-amber-600 text-lg">$20 coupon</span>{" "}
              for first shopping
            </p>

            <div className="border border-amber-600 overflow-hidden rounded-full flex items-center w-[400px] ">
              <input
                type="text"
                placeholder="Enter your email address..."
                className="outline-none bg-transparent border-none w-full h-[46px] pl-5 "
              />
              <div className="h-[46px] w-[70px] bg-amber-600 flex items-center justify-center text-white">
                <IoIosArrowRoundForward size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
