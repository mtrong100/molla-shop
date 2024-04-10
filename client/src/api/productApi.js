import axios from "axios";

export const getAllProductsApi = async ({
  page = 1,
  limit = 12,
  sort = "name",
  order = "desc",
  query,
  category,
  size,
  color,
  brand,
  minPrice,
  maxPrice,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/product/all`,
    {
      params: {
        page,
        limit,
        sort,
        order,
        query,
        category,
        size,
        color,
        brand,
        minPrice,
        maxPrice,
      },
    }
  );

  return res.data;
};

export const getProductDetailApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/product/${id}`
  );

  return res.data;
};

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

export const updateProductApi = async (id, req, token) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/product/update/${id}`,
    req,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const deleteProductApi = async (id, token) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/product/delete/${id}`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
