import axios from "axios";

export const getCommentsFromProductApi = async (
  productId,
  { page = 1, limit = 5, order = "desc" } = {}
) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/comment/${productId}`,
    {
      params: {
        page,
        limit,
        order,
      },
    }
  );

  return res.data;
};

/* CRUD API */
export const createCommentApi = async (token, data) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/comment/create`,
    data,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateCommentApi = async (accessToken, id, request) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/comment/update/${id}`,
    request,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};

export const deleteCommentApi = async (id, accessToken) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/comment/delete/${id}`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );
  return res.data;
};
