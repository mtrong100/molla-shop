import axios from "axios";

export const registerApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/auth/register`,
    req
  );
  return res.data;
};
