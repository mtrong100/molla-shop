import axios from "axios";

export const createProductApi = async (token, req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/product/create`,
    req,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
