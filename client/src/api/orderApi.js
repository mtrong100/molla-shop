import axios from "axios";

export const createOrderApi = async ({ userToken, req }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/order/create`,
    req,
    {
      headers: { token: `Bearer ${userToken}` },
    }
  );

  return res.data;
};

export const getOrderDetailApi = async ({ userToken, orderId }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/order/${orderId}`,
    {
      headers: { token: `Bearer ${userToken}` },
    }
  );

  return res.data;
};

export const getUserOrdersApi = async ({
  userToken,
  userId,
  page = 1,
  limit = 12,
  order = "desc",
  query,
}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/order/my-orders/${userId}`,
    {
      params: {
        page,
        limit,
        order,
        query,
      },
      headers: { token: `Bearer ${userToken}` },
    }
  );

  return res.data;
};

export const getAllOrdersApi = async (
  userToken,
  page = 1,
  limit = 12,
  order = "desc"
) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_SERVER_URL
    }/order/all?page=${page}&limit=${limit}&order=${order}`,
    {
      headers: { token: `Bearer ${userToken}` },
    }
  );

  return res.data;
};
