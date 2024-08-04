import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  auth: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.id = action.payload.id;
      state.auth = true;
    },
    logOut: (state, action) => {
      state.id = initialState.id;
      state.auth = initialState.auth;
    },
  },
});

export const { logIn, logOut} = slice.actions;
export default slice.reducer;

export const selectAuth = (state) => state.auth;
