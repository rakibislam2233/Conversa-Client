import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: []
};
export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addGetMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      if (state.messages === undefined) {
        state.messages = [];
      } else if (state.messages) {
        state.messages.push(action.payload);
      }
    },
  },
});
export const { addGetMessages, addMessage } = messagesSlice.actions;
