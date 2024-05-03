import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientSendMessageApi, getMessagesApi } from "../api/chatApi";
import { setMessages } from "../redux/slices/chatSlice";

export default function useMessage() {
  const dispatch = useDispatch();

  const [loading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [val, setVal] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { messages } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true);

      try {
        const res = await getMessagesApi(currentUser?._id);
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
      const res = await clientSendMessageApi({ message: val });
      dispatch(setMessages([...messages, res]));
      setVal("");
    } catch (error) {
      console.log("Failed to send a message: ", error);
    } finally {
      setIsSending(false);
    }
  };

  return { handleSendMessage, messages, loading, isSending, val, setVal };
}
