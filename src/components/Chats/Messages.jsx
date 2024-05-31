import { useEffect, useRef } from "react";
import MessageSkeleton from "../../utils/MessageSkeleton";
import Message from "./Message";
import { useChatPartner } from "../../hook/useChatPartner";
import { useGetMessageQuery } from "../../fetures/message/messageApi";
import { addGetMessages } from "../../fetures/message/messageSlice";
import ParticipentProfile from "./ParticipentProfile";
import { useDispatch, useSelector } from "react-redux";

const Messages = ({ typingMessage }) => {
  const [partner] = useChatPartner();
  const lastMessageRef = useRef();
  const { messages } = useSelector((state) => state.messages);
  const { data, isLoading, isError } = useGetMessageQuery(partner?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(addGetMessages(data?.data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  let content = null;
  if (isLoading && !isError) {
    content = (
      <div className="space-y-3 px-3 py-2">
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );
  } else if (!isLoading && !isError && messages.length === 0) {
    content = (
      <div>
        <h1 className="text-center">You are now connected on Messenger</h1>
      </div>
    );
  } else if (!isLoading && !isError && messages.length > 0) {
    content = messages?.map((message, i) => (
      <div key={i} ref={lastMessageRef}>
        <Message message={message} typingMessage={typingMessage} />
      </div>
    ));
  }
  return (
    <div className="w-full h-[calc(100vh-144px)] overflow-hidden overflow-y-scroll p-2 py-5">
      <ParticipentProfile />
      {content}
      <div className="px-3" ref={lastMessageRef}>
        {typingMessage?.message?.text?.length > 1 &&
        typingMessage?.senderId === partner._id ? (
          <div
            className="flex mb-4 items-center justify-start gap-x-2  text-[#383838] group"
          >
            <img
              className="size-10 rounded-full"
              alt=""
              src={partner?.profileImage}
            />

            <h1 className="w-fit max-w-[60%] h-full px-3 py-2 rounded-2xl bg-[#383838] ">
              <div className="w-10 h-6 flex gap-1 items-center justify-center">
                <div className="w-2 h-2 animate-[bounce_.6s_linear_.2s_infinite] bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 animate-[bounce_.6s_linear_.3s_infinite] bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 animate-[bounce_.6s_linear_.4s_infinite] bg-gray-300 rounded-full"></div>
              </div>
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Messages;
