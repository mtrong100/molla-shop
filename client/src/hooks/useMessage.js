import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesApi, sendMessageApi } from "../api/chatApi";
import { ADMIN_ID } from "../utils/constants";

export default function useMessage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { selectedConversation: selectedUser } = useSelector(
    (state) => state.chat
  );

  const [loading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [val, setVal] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);

      try {
        let res;

        if (currentUser?.role === "user") {
          res = await getMessagesApi(ADMIN_ID);
        } else {
          res = await getMessagesApi(selectedUser?._id);
        }

        setMessages(res);
      } catch (error) {
        console.log("Failed to fetch messages: ", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMessages();
  }, [currentUser._id, currentUser?.role, dispatch, selectedUser?._id]);

  const handleSendMessage = async () => {
    if (!val.trim()) return;

    setIsSending(true);

    try {
      let res;

      if (currentUser?.role === "user") {
        await sendMessageApi({ message: val });
      } else {
        await sendMessageApi(selectedUser?._id, { message: val });
      }

      if (currentUser?.role === "user") {
        res = await getMessagesApi(ADMIN_ID);
      } else {
        res = await getMessagesApi(selectedUser?._id);
      }

      setMessages(res);
      setVal("");
    } catch (error) {
      console.log("Failed to send a message: ", error);
    } finally {
      setIsSending(false);
    }
  };

  return { handleSendMessage, messages, loading, isSending, val, setVal };
}
