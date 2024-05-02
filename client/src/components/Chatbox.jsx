import React, { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Message from "./Message";
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div className="fixed z-50 right-10 bottom-24">
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center hover:bg-amber-400 cursor-pointer rounded-full w-[50px] h-[50px] bg-amber-300"
        >
          <IoChatbubbleEllipsesOutline size={25} />
        </div>
        {isOpen && (
          <div
            className="absolute right-16 -bottom-20"
            style={{ zIndex: "99999" }}
          >
            <div className="w-[360px]  bg-white rounded-lg shadow-lg border-blue-gray-300 overflow-hidden ">
              <header className="bg-gray-100 shadow-sm border py-3 px-5 w-full rounded-sm">
                <div className="flex items-center gap-2 justify-between">
                  <h3 className="font-semibold">Admin</h3>
                  <span className="text-green-500 font-medium text-sm">
                    Online
                  </span>
                </div>
              </header>

              <main className="p-4 space-y-4 overflow-y-auto h-[350px]">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
