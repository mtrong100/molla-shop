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

export const getAllUserApi = async ({
  userToken,
  page = 1,
  limit = 12,
  order = "desc",
  query,
}) => {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/all`, {
    params: {
      page,
      limit,
      order,
      query,
    },
    headers: { token: `Bearer ${userToken}` },
  });

  return res.data;
};
