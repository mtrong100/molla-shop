import React from "react";

const Message = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <img
          src="https://source.unsplash.com/random"
          className="w-[45px] h-[45px] object-cover rounded-full"
          alt=""
        />

        <div className="bg-gray-300 rounded-lg p-3 text-black max-w-xs">
          <p className="text-sm">This is a sample message.</p>
        </div>

        <span className="ml-1 text-gray-500 text-xs">12:30 PM</span>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="mr-1 text-gray-500 text-xs">1:05 PM</span>
        <div className="bg-amber-300 rounded-lg p-3 max-w-xs">
          <p className="text-sm">This is a reply message.</p>
        </div>
        <img
          src="https://source.unsplash.com/random"
          className="w-[45px] h-[45px] object-cover rounded-full"
          alt=""
        />
      </div>
    </>
  );
};

export default Message;
