import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    isLoadingWishlist: false,
    wishlist: [],
    limit: 4,
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.isLoadingWishlist = false;
    },
    loadingWishlist: (state, action) => {
      state.isLoadingWishlist = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    increaseLimit: (state) => {
      state.limit += 4;
    },
  },
});

export const { setWishlist, loadingWishlist, setLimit, increaseLimit } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
