import axios from "axios";

export const getUserWishlistApi = async ({ userId, token }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/wishlist/get/${userId}`,
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const toggleWishlistApi = async ({ userId, productId, token }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/wishlist/toggle/${userId}/${productId}`,
    {},
    {
      headers: { token: `Bearer ${token}` },
    }
  );

  return res.data;
};
