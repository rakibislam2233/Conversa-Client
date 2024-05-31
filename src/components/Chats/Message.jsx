import { useState, useEffect, useRef } from "react";
import { BsEmojiSmileFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  IoArrowUndoSharp,
  IoCheckmarkDone,
  // IoCheckmarkOutline,
} from "react-icons/io5";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import useAuth from "../../hook/useAuth";
import { useChatPartner } from "../../hook/useChatPartner";
import { useDeleteMessageMutation } from "../../fetures/message/messageApi";
import socket from "../../socket/socket";
import toast from "react-hot-toast";
import moment from "moment";

const Message = ({ message }) => {
  const [partner] = useChatPartner();
  const authUser = useAuth();
  const [more, setMore] = useState(false);
  const moreRef = useRef();
  const me = message?.senderId === authUser?.userId;
  const [deleteMessage, { data, isError, error }] = useDeleteMessageMutation();
  const formattedTime = moment(message?.createdAt).format("h:mma");
  const handleClickOutside = (event) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setMore(false);
    }
  };

  const handleDeletedMessage = (messageId) => {
    socket.emit("messageUnsent", message);
    deleteMessage(messageId);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Message copied to clipboard!");
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err) => {
        toast.error("Failed to copy the message!");
      }
    );
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isError && error) {
      console.log(error);
    }
  }, [data, isError, error]);
  return (
    <PhotoProvider>
      <div className="px-3">
        {me ? (
          <div className="flex items-center justify-end gap-x-2 group">
            {!message?.isDeleted && (
              <div
                className="relative text-left flex gap-1.5 opacity-0 group-hover:opacity-100"
                ref={moreRef}
              >
                <div className="relative">
                  <button
                    onClick={() => setMore(!more)}
                    data-tip="More"
                    className="p-1 hover:bg-[#242427] rounded-full tooltip"
                  >
                    <BsThreeDotsVertical className="size-3.5 text-[#7D7F86]" />
                  </button>
                  {more && (
                    <div className="absolute -top-20 right-1 z-20 bg-[#242427] p-2 rounded-lg flex flex-col gap-2">
                      <button
                        className="px-3 py-0.5 rounded-md hover:bg-[#464545]"
                        onClick={() => handleDeletedMessage(message?._id)}
                      >
                        Unsend
                      </button>
                      <button className="px-3 py-0.5 rounded-md hover:bg-[#464545]">
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <button
                  data-tip="Reply"
                  className="p-1 hover:bg-[#242427] rounded-full tooltip"
                >
                  <IoArrowUndoSharp className="size-3.5 text-[#7D7F86]" />
                </button>
                <button
                  data-tip="React"
                  className="p-1 hover:bg-[#242427] rounded-full tooltip"
                >
                  <BsEmojiSmileFill className="size-3.5 text-[#7D7F86]" />
                </button>
              </div>
            )}
            {message?.message?.text === "" && message?.isDeleted ? (
              <h1 className="w-fit max-w-[60%] h-full my-2 rounded-es-[2rem] rounded-se-[2rem] rounded-ss-[2rem] bg-transparent border border-gray-600 px-4 py-2  text-gray-500">
                You unsent a photo
              </h1>
            ) : message?.message?.text === "" ? (
              <div className="max-w-[60%] my-2 flex flex-col justify-center gap-0.5 h-full">
                <PhotoView src={message?.message?.image}>
                  <img
                    src={message?.message?.image}
                    className="w-56 h-full rounded-es-[2rem] rounded-se-[2rem] rounded-ss-[2rem] cursor-pointer"
                    alt=""
                  />
                </PhotoView>
                <span className="text-xs text-end text-gray-500 flex gap-0.5 justify-end items-center">
                  <IoCheckmarkDone className="size-3.5 text-emerald-500" />
                  {formattedTime}
                </span>
              </div>
            ) : message?.message?.text && message?.isDeleted === true ? (
              <h1 className="w-fit max-w-[60%] h-full my-2 rounded-es-[2rem] rounded-se-[2rem] rounded-ss-[2rem] bg-transparent border border-gray-600 text-gray-500 px-4 py-2 ">
                You unsent a message
              </h1>
            ) : (
              <div className="w-fit max-w-[60%] flex flex-col gap-0.5 h-full my-2">
                <h1 className=" rounded-es-[2rem] rounded-se-[2rem] rounded-ss-[2rem] bg-emerald-500 px-4 py-2 text-white">
                  {message?.message?.text}
                </h1>
                <span className="text-xs text-end text-gray-500 flex gap-0.5 justify-end items-center">
                  <IoCheckmarkDone className="size-3.5 text-emerald-500" />
                  {formattedTime}
                </span>
              </div>
            )}
            {/* <IoCheckmarkOutline className="size-3.5 text-emerald-500" /> */}
          </div>
        ) : (
          <div className="flex  items-center justify-start gap-x-2 text-[#242427] group">
            <img
              className="size-10 rounded-full"
              alt="Tailwind CSS chat bubble component"
              src={partner?.profileImage}
            />
            {message?.message?.text === "" && message?.isDeleted ? (
              <h1 className="w-fit max-w-[60%] h-full my-2 px-4 py-2 rounded-2xl bg-transparent border border-gray-600 text-gray-500">
                {partner?.fullName.slice(0, 2)} unsent a photo
              </h1>
            ) : message?.message?.text === "" ? (
              <div className="max-w-[60%] my-2 flex flex-col justify-center gap-0.5 h-full">
                <PhotoView src={message?.message?.image}>
                  <img
                    src={message?.message?.image}
                    className="w-56 h-full rounded-2xl cursor-pointer"
                    alt=""
                  />
                </PhotoView>
                <span className="text-xs text-end text-gray-500">
                  {formattedTime}
                </span>
              </div>
            ) : message?.message?.text && message?.isDeleted === true ? (
              <h1 className="w-fit max-w-[60%] h-full my-2 px-4 py-2 rounded-2xl bg-transparent border text-gray-500 border-gray-600 ">
                {partner?.fullName.slice(0, 2)} unsent a message
              </h1>
            ) : (
              <div className="w-fit max-w-[60%] flex flex-col gap-1 h-full my-3.5 relative">
                <h1 className=" rounded-2xl  px-4 py-2 bg-[#242427] text-white">
                  {message?.message?.text}
                </h1>
                <span className="text-xs  text-gray-500 text-end">
                  {formattedTime}
                </span>
              </div>
            )}
            {!message?.isDeleted && (
              <div
                className="relative text-left flex flex-row-reverse gap-1.5 opacity-0 group-hover:opacity-100 text-white"
                ref={moreRef}
              >
                <div className="relative">
                  <button
                    onClick={() => setMore(!more)}
                    data-tip="More"
                    className="p-1 hover:bg-[#242427] rounded-full tooltip"
                  >
                    <BsThreeDotsVertical className="size-3.5 text-[#7D7F86]" />
                  </button>
                  {more && (
                    <div className="absolute -top-20 -right-20 z-20 bg-[#242427] p-2 rounded-lg flex flex-col gap-2">
                      <button className="px-3 py-0.5 rounded-md hover:bg-[#464545]">
                        Forward
                      </button>
                      <button
                        onClick={() =>
                          handleCopyMessage(message?.message?.text)
                        }
                        className="px-3 py-0.5 rounded-md hover:bg-[#464545]"
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>
                <button
                  data-tip="Reply"
                  className="p-1 hover:bg-[#242427] rounded-full tooltip"
                >
                  <IoArrowUndoSharp className="size-3.5 text-[#7D7F86]" />
                </button>
                <button
                  data-tip="React"
                  className="p-1 hover:bg-[#242427] rounded-full tooltip"
                >
                  <BsEmojiSmileFill className="size-3.5 text-[#7D7F86]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </PhotoProvider>
  );
};

export default Message;
