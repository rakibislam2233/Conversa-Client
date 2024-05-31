import Chat from "../components/Chats/Chat";
import Conversation from "../components/Conversation/Conversation";
import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import { useDispatch } from "react-redux";
import { addActiveFriends } from "../fetures/activeFriend/activeFriendSlice";
import { Toaster } from "react-hot-toast";
import socket from "../socket/socket";
import { userApi } from "../fetures/user/userApi";
import { messageApi } from "../fetures/message/messageApi";
const Message = () => {
  const [socketMessage, setSocketMessage] = useState(null);
  const [typingMessage, setTypingMessage] = useState(null);
  const user = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user?.userId, user);
      socket.on("onlineUser", (activeUsers) => {
        dispatch(addActiveFriends(activeUsers));
      });
      socket.on("reciveMessage", (message) => {
        dispatch(userApi.util.invalidateTags(["Participants"]));
        dispatch(messageApi.util.invalidateTags(["Messages"]));
        setSocketMessage(message);
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      socket.on("reciveUnsentMessage", (message) => {
        dispatch(userApi.util.invalidateTags(["Participants"]));
        dispatch(messageApi.util.invalidateTags(["Messages"]));
      });
      socket.on("getTypingMessage", (message) => {
        setTypingMessage(message);
      });
    }
  }, [dispatch, user]);
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-12">
      <Conversation />
      <Chat
        socket={socket}
        socketMessage={socketMessage}
        typingMessage={typingMessage}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Message;
