import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    category: "",
    color: "",
    size: "",
    brand: "",
    order: "desc",
  },
  reducers: {
    checkedCategory: (state, action) => {
      state.category = action.payload;
    },
    checkedColor: (state, action) => {
      state.color = action.payload;
    },
    checkedSize: (state, action) => {
      state.size = action.payload;
    },
    checkedBrand: (state, action) => {
      state.brand = action.payload;
    },
    selectedOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const {
  checkedCategory,
  checkedColor,
  checkedSize,
  checkedBrand,
  selectedOrder,
} = sortSlice.actions;

export default sortSlice.reducer;
