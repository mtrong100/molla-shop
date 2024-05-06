import axios from "axios";

const PRODUCT_PARAMS = {
  PAGE: 1,
  LIMIT: 12,
  SORT: "name",
  ORDER: "desc",
  QUERY: "",
  CATEGORY: "",
  SIZE: "",
  COLOR: "",
  BRAND: "",
  MIN_PRICE: undefined,
  MAX_PRICE: undefined,
};

export const getAllProductsApi = async ({
  page = PRODUCT_PARAMS.PAGE,
  limit = PRODUCT_PARAMS.LIMIT,
  sort = PRODUCT_PARAMS.SORT,
  order = PRODUCT_PARAMS.ORDER,
  query,
  category,
  size,
  color,
  brand,
  minPrice,
  maxPrice,
} = {}) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/product/products`,
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
    `${import.meta.env.VITE_SERVER_URL}/api/product/${id}`
  );
  return res.data;
};

export const createProductApi = async (req) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/product/create`,
    req
  );
  return res.data;
};

export const updateProductApi = async (id, req) => {
  const res = await axios.put(
    `${import.meta.env.VITE_SERVER_URL}/api/product/update/${id}`,
    req
  );
  return res.data;
};

export const deleteProductApi = async (id) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/product/delete/${id}`
  );
  return res.data;
};

export const favoriteProductApi = async (id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/product/favorite/${id}`
  );
  return res.data;
};

export const viewProductApi = async (id) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/product/view/${id}`
  );
  return res.data;
};
