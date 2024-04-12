import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoadingCmt: false,
    commentVal: "",
    rating: 1,
    limit: 5,
  },
  reducers: {
    listComments: (state, action) => {
      state.comments = action.payload;
      state.isLoadingCmt = false;
    },
    loadingCmt: (state, action) => {
      state.isLoadingCmt = action.payload;
    },
    setCommentVal: (state, action) => {
      state.commentVal = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    increaseLimit: (state) => {
      state.limit += 5;
    },
  },
});

export const {
  listComments,
  setCommentVal,
  setRating,
  loadingCmt,
  setLimit,
  increaseLimit,
} = commentSlice.actions;

export default commentSlice.reducer;
