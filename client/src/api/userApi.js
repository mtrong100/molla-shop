import axios from "axios";

export const getUserDetailApi = async (id, token) => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${id}`, {
    headers: { token: `Bearer ${token}` },
  });

  return res.data;
};
