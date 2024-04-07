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

export const getAllProductsApi = async ({
  page = 1,
  limit = 20,
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
