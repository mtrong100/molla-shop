import React from "react";
import { Input } from "@material-tailwind/react";
import { GoSearch } from "react-icons/go";

const ChatSidebar = () => {
  return (
    <aside className="sticky top-0 max-w-[350px] bg-white overflow-y-auto border-blue-gray-100 border h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="rounded-full py-3 px-5 flex items-center gap-3 border-2 border-gray-300">
        <GoSearch size={22} />
        <input
          type="text"
          className="outline-none border-none w-full bg-transparent "
          placeholder="Search users..."
        />
      </div>

      <ul className="mt-5 space-y-4">
        {Array(20)
          .fill(0)
          .map((item, index) => (
            <UserChat key={index} />
          ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;

function UserChat() {
  return (
    <li>
      <div className="flex items-center gap-3">
        <div className="w-[50px] h-[50px] relative">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="img-cover rounded-full"
          />
          <span className="absolute top-0 right-0 h-3 w-3 flex items-center justify-center bg-green-500  rounded-full"></span>
        </div>

        <div>
          <h4 className="font-semibold">Username</h4>
          <p className="opacity-60 font-sm">This is the lastest message...</p>
        </div>
      </div>
    </li>
  );
}
