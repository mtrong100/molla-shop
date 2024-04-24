import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoadingProducts: false,
    products: [],
    limit: 4,
  },
  reducers: {
    productList: (state, action) => {
      state.products = action.payload;
      state.isLoadingProducts = false;
    },
    loadingProducts: (state, action) => {
      state.isLoadingProducts = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    increaseLimit: (state) => {
      state.limit += 4;
    },
  },
});

export const { productList, loadingProducts, setLimit, increaseLimit } =
  productSlice.actions;

export default productSlice.reducer;
