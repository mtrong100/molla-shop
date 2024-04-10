import { createSlice } from "@reduxjs/toolkit";

export const sortSlice = createSlice({
  name: "sort",
  initialState: {
    category: "",
    color: "",
    size: "",
    brand: "",
    order: "desc",
    minPrice: 0,
    maxPrice: 1000,
    filterPrice: false,
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
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
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    startFilterPrice: (state, action) => {
      state.filterPrice = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetFilter: () => {
      return {
        category: "",
        color: "",
        size: "",
        brand: "",
        order: "desc",
        minPrice: 20,
        maxPrice: 1000,
        filterPrice: false,
      };
    },
  },
});

export const {
  checkedCategory,
  checkedColor,
  checkedSize,
  checkedBrand,
  selectedOrder,
  setMinPrice,
  setMaxPrice,
  startFilterPrice,
  setNextPage,
  setCurrentPage,
  setTotalPages,
  resetFilter,
} = sortSlice.actions;

export default sortSlice.reducer;
