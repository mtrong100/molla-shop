import { createSlice } from "@reduxjs/toolkit";

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    images: [],
    thumbnails: [],
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
    setThumbnails: (state, action) => {
      state.thumbnails = [...state.thumbnails, ...action.payload];
    },
    removeThumbnail: (state, action) => {
      state.thumbnails = state.thumbnails.filter(
        (item) => item !== action.payload
      );
    },
    resetAll: () => {
      return {
        images: [],
        thumbnials: [],
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
  setThumbnails,
  removeThumbnail,
} = createProductSlice.actions;

export default createProductSlice.reducer;
