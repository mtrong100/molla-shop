import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import Message from "./Message";

const Conversation = () => {
  const [val, setVal] = useState("");

  return (
    <div className="w-full bg-white border ">
      <header className="bg-gray-100 shadow-sm border p-4 w-full rounded-sm">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-semibold">Username</h3>
          <span className="text-green-500 font-medium text-sm">Online</span>
        </div>
      </header>

      <main className="p-4 space-y-4 overflow-y-auto h-[640px]">
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <Message key={index} />
          ))}
      </main>

      <form>
        <div className="rounded-sm py-3 px-5 flex items-center gap-3 border-2 border-gray-300">
          <input
            type="text"
            className="outline-none border-none w-full bg-transparent"
            placeholder="Send message..."
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <FaImage
              className="cursor-pointer hover:text-amber-500 opacity-50 hover:opacity-100"
              size={22}
            />
            <IoMdSend
              className="cursor-pointer hover:text-amber-500 opacity-50 hover:opacity-100"
              size={25}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Conversation;
