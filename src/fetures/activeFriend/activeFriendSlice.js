import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFriends: [],
};
export const activeFriendsSlice = createSlice({
  name: "activeFrnd",
  initialState,
  reducers: {
    addActiveFriends: (state, action) => {
      state.activeFriends = action.payload;
    },
  },
});

export const { addActiveFriends } = activeFriendsSlice.actions;
