import axios from "axios";

export const getUserWishlistApi = async (id) => {
  const res = await axios.get(`/api/wishlist/${id}`);
  return res.data;
};

export const toggleWishlistApi = async (userId, productId) => {
  const res = await axios.post(`/api/wishlist/toggle/${userId}/${productId}`);
  return res.data;
};
