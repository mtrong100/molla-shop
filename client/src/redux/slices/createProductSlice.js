import { createSlice } from "@reduxjs/toolkit";

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    images: [],
    size: "",
    color: "",
    brand: "",
    category: "",
    rating: "",
    info: "",
  },
  reducers: {
    selectedCategory: (state, action) => {
      state.category = action.payload;
    },
    selectedSize: (state, action) => {
      state.size = action.payload;
    },
    selectedColor: (state, action) => {
      state.color = action.payload;
    },
    selectedBrand: (state, action) => {
      state.brand = action.payload;
    },
    selectedRating: (state, action) => {
      state.rating = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setImages: (state, action) => {
      state.images = [...state.images, ...action.payload];
    },
    removeImage: (state, action) => {
      state.images = state.images.filter((item) => item !== action.payload);
    },
    resetAll: () => {
      return {
        images: [],
        size: "",
        color: "",
        brand: "",
        category: "",
        rating: "",
        info: "",
      };
    },
  },
});

export const {
  selectedCategory,
  selectedSize,
  selectedColor,
  selectedBrand,
  selectedRating,
  setInfo,
  setImages,
  removeImage,
  resetAll,
} = createProductSlice.actions;

export default createProductSlice.reducer;
