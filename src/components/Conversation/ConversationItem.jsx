import { startChat } from "../../fetures/chatPartner/chatPartnerSlice";
import useAuth from "../../hook/useAuth";
import { useChatPartner } from "../../hook/useChatPartner";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setIsOpne } from "../../fetures/user/userSlice";

const ConversationItem = ({ user }) => {
  const { _id, fullName, profileImage } = user.user || {};
  const { message, senderId, createdAt, isDeleted } = user.lastMessage || "";
  const authUser = useAuth();
  const { activeFriends } = useSelector((state) => state.activeFriends);
  const onlineUser = activeFriends?.find((u) => u?.userId === _id);
  const myLastMessage = senderId === authUser?.userId;
  const isActive = onlineUser ? true : false;
  const [partner] = useChatPartner();
  const dispatch = useDispatch();

  const formatTime = (time) => {
    const now = moment();
    const duration = moment.duration(now.diff(time));
    const hours = duration.asHours();
    const days = duration.asDays();

    if (duration.asMinutes() < 1) {
      return "Just now";
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m`;
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`;
    } else if (days < 2) {
      return "Yesterday";
    } else if (days < 7) {
      return `${Math.floor(days)}d`;
    } else {
      return moment(time).format("MMM D");
    }
  };

  const handleClick = () => {
    dispatch(
      startChat({
        participants: { _id, fullName, profileImage },
        isActive,
      })
    );
    dispatch(setIsOpne());
  };
  return (
    <div
      onClick={handleClick}
      className={`flex justify-between items-center gap-4 hover:bg-[#1C1D1F] px-3 my-1.5 py-2 cursor-pointer text-left  rounded-lg ${
        _id === partner?._id && "bg-[#1C1D1F]"
      }`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2 ">
          <div className="relative">
            <img className="w-12 h-12 rounded-full" src={profileImage} alt="" />
            {onlineUser && (
              <div className=" absolute w-3 h-3 rounded-full right-1 bottom-0 bg-green-500"></div>
            )}
          </div>
          <div>
            <div>
              <h1 className="font-semibold">{fullName}</h1>
              <p className="text-xs py-0.5">
                {message && message?.text && isDeleted ? (
                  <h1>
                    {myLastMessage
                      ? "You unsent a message"
                      : `unsent a message`}
                  </h1>
                ) : message && message?.text ? (
                  <div className="flex gap-2">
                    <div>
                      {myLastMessage && "You:"}{" "}
                      {message?.text?.length > 20
                        ? `${message?.text?.slice(0, 20)}...`
                        : message?.text}
                    </div>
                  </div>
                ) : message && message?.image && isDeleted ? (
                  <h1>
                    {myLastMessage ? "You unsent a photo" : `unsent a photo`}
                  </h1>
                ) : (
                  <div className="flex gap-2">
                    <div>
                      {myLastMessage ? "You sent a photo" : `sent a photo`}
                    </div>
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
        <span className="text-xs">{formatTime(createdAt)}</span>
      </div>
    </div>
  );
};

export default ConversationItem;
