import axios from "axios";

const REVIEW_QUERY = {
  PAGE: 1,
  LIMIT: 10,
  ORDER: "desc",
};

export const getReviewsFromProductApi = async ({
  productId,
  page = REVIEW_QUERY.PAGE,
  limit = REVIEW_QUERY.LIMIT,
  order = REVIEW_QUERY.ORDER,
} = {}) => {
  const res = await axios.get(`/api/review/${productId}`, {
    params: {
      page,
      limit,
      order,
    },
  });

  return res.data;
};

export const createReviewApi = async (req) => {
  const res = await axios.post(`/api/review/create`, req);
  return res.data;
};

export const updateReviewApi = async (id, req) => {
  const res = await axios.put(`/api/review/update/${id}`, req);
  return res.data;
};

export const deleteReviewApi = async (id) => {
  const res = await axios.delete(`/api/review/delete/${id}`);
  return res.data;
};
