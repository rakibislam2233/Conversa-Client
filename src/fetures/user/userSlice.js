import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addGetUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUserLastMessage: (state, action) => {
      const index = state.users.findIndex(
        (f) =>
          f?.user?._id === action.payload?.receiverId ||
          f?.user?._id === action.payload?.senderId
      );
      if (index !== -1) {
        state.users[index].lastMessage = action.payload;
      }
    },
    setIsOpne: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { addGetUsers, updateUserLastMessage, setIsOpne } =
  userSlice.actions;
export default userSlice.reducer;
