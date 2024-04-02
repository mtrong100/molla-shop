import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
  },
  reducers: {
    storeCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    storeUsers: (state, action) => {
      return {
        ...state,
        users: action.payload,
      };
    },
  },
});

export const { storeCurrentUser, storeUsers } = userSlice.actions;

export default userSlice.reducer;
