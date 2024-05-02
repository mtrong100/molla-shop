import React from "react";
import ChatSidebar from "../components/ChatSidebar";
import Conversation from "../components/Conversation";

const Chat = () => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_350px] gap-2 items-start">
      <Conversation />
      <ChatSidebar />
    </div>
  );
};

export default Chat;
