import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggingUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.accessToken = null;
    },
  },
});

export const { loggingUser, logoutUser } = authSlice.actions;
