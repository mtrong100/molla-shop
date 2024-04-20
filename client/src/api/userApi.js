import axios from "axios";

export const getUserDetailApi = async (id, token) => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${id}`, {
    headers: { token: `Bearer ${token}` },
  });

  return res.data;
};

export const updateUserApi = async ({ userId, userToken, req }) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/user/update/${userId}`,
    req,
    {
      headers: { token: `Bearer ${userToken}` },
    }
  );

  return res.data;
};
