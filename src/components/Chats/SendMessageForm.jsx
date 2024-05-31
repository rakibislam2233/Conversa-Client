import React from "react";
import { FaXmark } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { IoImagesOutline } from "react-icons/io5";
import { LuImagePlus } from "react-icons/lu";
import { PiMicrophoneThin } from "react-icons/pi";
import InputEmoji from "react-input-emoji";
const SendMessageForm = ({
  handleSubmit,
  handleImage,
  showImages,
  handleDeleteImage,
  message,
  handleMessage,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-16 flex items-center gap-4 px-5 bg-[#2E2E2E]bg-opacity-90 border-t border-[#262626] "
    >
      <div>
        <label htmlFor="file" className="custom-file-upload">
          <IoImagesOutline className="w-6 h-6 cursor-pointer" />
        </label>
        <input
          onChange={handleImage}
          type="file"
          className="hidden"
          name="file"
          id="file"
          multiple
        />
      </div>
      <div>
        <PiMicrophoneThin className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="w-full relative">
        {showImages.length > 0 && (
          <div className=" absolute -top-20 left-0 bottom-0 right-0 flex  flex-wrap gap-2 bg-[#232425] rounded p-3">
            {showImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Selected ${index}`}
                  className="w-16 h-16 rounded object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="absolute -top-3 -right-2 p-1 bg-red-600 rounded-full"
                >
                  <FaXmark className="size-3 text-white" />
                </button>
              </div>
            ))}
            <div className="size-16 flex justify-center items-center bg-[#1C1D1F] rounded">
              <label htmlFor="file" className="custom-file-upload">
                <LuImagePlus className="w-6 h-6 cursor-pointer" />
              </label>
              <input
                onChange={handleImage}
                type="file"
                className="hidden"
                name="file"
                id="file"
                multiple
              />
            </div>
          </div>
        )}

        <InputEmoji
          background="#1C1D1F"
          color="white"
          value={message}
          borderColor={"#364050"}
          onChange={handleMessage}
          fontFamily="Titillium Web"
          cleanOnEnter
          keepOpened={true}
          placeholder="Enter your message"
          shouldReturn={false}
          shouldConvertEmojiToImage={false}
        />
      </div>
      <button type="submit">
        <FiSend className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SendMessageForm;
