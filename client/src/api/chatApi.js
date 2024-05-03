import axios from "axios";

export const clientSendMessageApi = async (req) => {
  const res = await axios.post(
    `/api/message/send/66111c2378e7d7db7d0e243b`,
    req
  );
  return res.data;
};

export const clientGetMessagesApi = async () => {
  const res = await axios.get(`/api/message/66111c2378e7d7db7d0e243b`);
  return res.data;
};
