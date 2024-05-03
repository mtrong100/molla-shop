import axios from "axios";

export const sendMessageApi = async (id, req) => {
  const res = await axios.post(`/api/message/send/${id}`, req);
  return res.data;
};

export const getMessagesApi = async (id) => {
  const res = await axios.get(`/api/message/${id}`);
  return res.data;
};

export const getConversationApi = async () => {
  const res = await axios.get(`/api/conversation`);
  return res.data;
};
