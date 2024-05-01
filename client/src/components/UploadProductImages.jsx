import { Carousel, IconButton } from "@material-tailwind/react";
import React from "react";
import { IoMdClose } from "react-icons/io";

const UploadProductImages = ({
  onChange,
  images = [],
  setImages,
  uploading,
}) => {
  const handleDeleteImage = (url) => {
    const newImages = images.filter((item) => item !== url);
    setImages(newImages);
  };

  return (
    <div>
      <h1 className="font-semibold">Product images (max 5 images)</h1>
      {uploading ? (
        <p className="text-center animate-pulse">Uploading...</p>
      ) : (
        <input
          type="file"
          id="image-upload"
          className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          multiple
          accept="image/*"
          onChange={onChange}
        />
      )}
      <Carousel
        className="rounded-xl mt-5 border bg-gray-100"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
        prevArrow={({ handlePrev }) => (
          <IconButton
            type="button"
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            type="button"
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-amber-50 hover:bg-amber-100 text-amber-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        {!uploading &&
          images?.map((item, index) => (
            <div key={index} className="w-full h-[500px]">
              <img
                src={item}
                alt={index}
                className="w-full h-full object-contain"
              />

              <span
                onClick={() => handleDeleteImage(item)}
                className="flex absolute top-3 right-3 items-center justify-center w-[40px] h-[40px] bg-red-500 text-white rounded-full cursor-pointer"
              >
                <IoMdClose size={22} />
              </span>
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default UploadProductImages;
