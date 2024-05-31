import SendMessageForm from "./SendMessageForm";
import useAuth from "../../hook/useAuth";
import { useChatPartner } from "../../hook/useChatPartner";
import { useEffect, useState } from "react";
import sending from "../../assets/audio/facebook_messenger.mp3";
import useSound from "use-sound";
import toast from "react-hot-toast";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import { useSendMessageMutation } from "../../fetures/message/messageApi";
import { useDispatch } from "react-redux";
import { addMessage } from "../../fetures/message/messageSlice";
const SendMessage = ({ socket }) => {
  const [sendingSound] = useSound(sending);
  const authUser = useAuth();
  const [partner] = useChatPartner();
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [errors, setError] = useState("");
  const dispatch = useDispatch();
  const [sendMessage, { data, isError, error }] = useSendMessageMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    if (images.length > 0) {
      sendingSound();
      const Url = await uploadToCloudinary(images);
      Url.forEach((url, index) => {
        const newImageMessage = {
          message: {
            text: "",
            image: showImages[index],
          },
          senderId: authUser?.userId,
          receiverId: partner?._id,
          senderName: authUser?.username,
          status: "unseen",
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        dispatch(addMessage(newImageMessage));
        socket.emit("sendMessage", newImageMessage);
        sendMessage({
          receiverId: partner?._id,
          data: {
            message: { text: "", image: url },
          },
        });
        setShowImages([]);
        setImages([]);
      });
    }
    if (message) {
      sendingSound();
      const newTextMessage = {
        message: {
          text: message,
          image: "",
        },
        senderId: authUser?.userId,
        receiverId: partner?._id,
        senderName: authUser?.username,
        status: "unseen",
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      dispatch(addMessage(newTextMessage));
      socket.emit("sendMessage", newTextMessage);
      sendMessage({
        receiverId: partner?._id,
        data: {
          message: { text: message, image: "" },
        },
      });
      const newTypingMessage = {
        message: {
          text: "",
          image: "",
        },
        senderId: authUser?.userId,
        receiverId: partner?._id,
        senderName: authUser?.username,
      };
      socket.emit("typingMessage", newTypingMessage);
      setMessage("");
    }
  };

  const handleMessage = (message) => {
    if (message.length > 0) {
      const newTypingMessage = {
        message: {
          text: message,
          image: "",
        },
        senderId: authUser?.userId,
        receiverId: partner?._id,
        senderName: authUser?.username,
      };
      socket.emit("typingMessage", newTypingMessage);
    }
    setMessage(message);
  };

  const handleImage = (e) => {
    const files = e.target.files;
    if (files) {
      if (images.length + files.length > 4) {
        setError("You can only select up to 4 images.");
      } else {
        setError("");
        const fileArray = Array.from(files);
        setImages((prevImages) => [...prevImages, ...fileArray]);
        fileArray.forEach((file) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            setShowImages((prevUrlImages) => [
              ...prevUrlImages,
              event.target.result,
            ]);
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleDeleteImage = (index) => {
    setShowImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (errors) {
      toast.error(errors, {
        duration: 3000,
      });
    }
    if (isError && error) {
      console.log(error);
    }
  }, [data, isError, error, errors]);
  return (
    <SendMessageForm
      handleSubmit={handleSubmit}
      handleImage={handleImage}
      handleDeleteImage={handleDeleteImage}
      handleMessage={handleMessage}
      showImages={showImages}
      message={message}
    />
  );
};

export default SendMessage;
