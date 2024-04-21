import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    shippingPrice: 10,
  },
  reducers: {
    selectShippingPrice: (state, action) => {
      state.shippingPrice = action.payload;
    },
  },
});

export const { selectShippingPrice } = cartSlice.actions;

export default cartSlice.reducer;
