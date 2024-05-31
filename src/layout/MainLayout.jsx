import Sidebar from "../components/Sidebar/Sidebar";
import Chat from "../components/Chats/Chat";
import Conversation from "../components/Conversation/Conversation";
import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import { useDispatch } from "react-redux";
import { addActiveFriends } from "../fetures/activeFriend/activeFriendSlice";
import { Toaster } from "react-hot-toast";
import socket from "../socket/socket";
const MainLayout = () => {
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
        setSocketMessage(message);
      });
      socket.on("getTypingMessage", (message) => {
        setTypingMessage(message);
      });
    }
  }, [dispatch, user]);
  return (
    <div className="w-full h-[100vh] flex">
      <Sidebar />
      <div className="w-full  grid grid-cols-1 md:grid-cols-12 ">
        <Conversation />
        <Chat
          socket={socket}
          socketMessage={socketMessage}
          typingMessage={typingMessage}
        />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MainLayout;
