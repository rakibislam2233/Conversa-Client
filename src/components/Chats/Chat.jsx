import { useEffect } from "react";
import { useChatPartner } from "../../hook/useChatPartner";
import Blank from "./Blank";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { addMessage } from "../../fetures/message/messageSlice";
import { updateUserLastMessage } from "../../fetures/user/userSlice";
import useSound from "use-sound";
import notification from "../../assets/audio/facebook_notification.mp3";
import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";
import { useDispatch, useSelector } from "react-redux";
const Chat = ({ socketMessage, typingMessage, socket }) => {
  const [messageNotification] = useSound(notification);
  const [partner] = useChatPartner();
  const auth = useAuth();
  const isOpen = useSelector((state) => state?.users?.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage?.senderId === partner._id &&
      socketMessage?.receiverId === auth?.userId
    ) {
      messageNotification();
      dispatch(addMessage(socketMessage));
      dispatch(updateUserLastMessage(socketMessage));
    }
  }, [socketMessage, dispatch, messageNotification]);

  useEffect(() => {
    if (
      socketMessage &&
      socketMessage?.senderId !== partner._id &&
      socketMessage?.receiverId === auth?.userId
    ) {
      messageNotification();
      dispatch(updateUserLastMessage(socketMessage));
      toast.success(`${socketMessage?.senderName} send a new message`, {
        duration: 5000,
      });
    }
  }, [socketMessage, dispatch, messageNotification]);

  return (
    <div
      className={`w-full ${
        isOpen ? "block" : "hidden"
      } col-span-full md:block md:col-span-8`}
    >
      {Object.keys(partner)?.length === 0 ? (
        <Blank />
      ) : (
        <div>
          <ChatHead />
          <Messages typingMessage={typingMessage} />
          <SendMessage socket={socket} />
        </div>
      )}
    </div>
  );
};

export default Chat;
