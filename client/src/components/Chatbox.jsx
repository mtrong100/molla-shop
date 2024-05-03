import React, { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Message from "./Message";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { clientGetMessagesApi, clientSendMessageApi } from "../api/chatApi";
import { setMessages } from "../redux/slices/chatSlice";

const Chatbox = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [val, setVal] = useState("");
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);

      try {
        const res = await clientGetMessagesApi();
        dispatch(setMessages(res));
      } catch (error) {
        console.log("Failed to fetch messages: ", error);
        dispatch(setMessages([]));
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, [currentUser?._id, dispatch]);

  const handleSendMessage = async () => {
    if (!val.trim()) return;

    setIsSending(true);

    try {
      await clientSendMessageApi({ message: val });
      const res = await clientGetMessagesApi();
      dispatch(setMessages(res));
      setVal("");
    } catch (error) {
      console.log("Failed to send a message: ", error);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
                {loading && <Spinner className="h-6 w-6" />}

                {!loading &&
                  messages.length > 0 &&
                  messages.map((item) => (
                    <div ref={scrollRef} key={item?._id}>
                      <Message item={item} />
                    </div>
                  ))}
              </main>

              <div className="rounded-sm py-3 px-5 flex items-center gap-3 border-2 border-gray-300">
                <input
                  type="text"
                  className="outline-none border-none w-full bg-transparent"
                  placeholder="Send message..."
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                />
                <button disabled={isSending} onClick={handleSendMessage}>
                  <IoMdSend
                    className="cursor-pointer hover:text-amber-500 opacity-50 hover:opacity-100"
                    size={25}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;
