import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../fetures/api/apiSlice";
import { chatPartnerSlice } from "../fetures/chatPartner/chatPartnerSlice";
import { messagesSlice } from "../fetures/message/messageSlice";
import { userSlice } from "../fetures/user/userSlice";
import { authSlice } from "../fetures/auth/authSlice";
import { activeFriendsSlice } from "../fetures/activeFriend/activeFriendSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
    chatPartner: chatPartnerSlice.reducer,
    activeFriends: activeFriendsSlice.reducer,
    messages: messagesSlice.reducer,
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
