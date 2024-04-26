import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    isLoadingUser: false,
    sortOption: "desc",
    query: "",
    nextPage: 1,
    totalPages: 1,
    currentPage: 0,
  },
  reducers: {
    storeCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    userList: (state, action) => {
      state.users = action.payload;
      state.isLoadingUser = false;
    },
    setQueryUser: (state, action) => {
      state.query = action.payload;
    },
    setSortOptionVal: (state, action) => {
      state.sortOption = action.payload;
    },
    loadingUsers: (state, action) => {
      state.isLoadingUser = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
  },
});

export const {
  storeCurrentUser,
  userList,
  setQueryUser,
  loadingUsers,
  setTotalPages,
  setNextPage,
  setCurrentPage,
  setSortOptionVal,
} = userSlice.actions;

export default userSlice.reducer;
