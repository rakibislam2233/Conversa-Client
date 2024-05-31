import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startChat } from "../fetures/chatPartner/chatPartnerSlice";
import { setIsOpne } from "../fetures/user/userSlice";

const FriendCard = ({ user }) => {
  const { _id, fullName, profileImage, email } = user || {};
  const { activeFriends } = useSelector((state) => state.activeFriends);
  const onlineUser = activeFriends?.find((u) => u?.userId === _id);
  const isActive = onlineUser ? true : false;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIsOpne());
    dispatch(
      startChat({
        participants: { _id, fullName, profileImage },
        isActive,
      })
    );
  };
  return (
    <div className="w-full h-60 border border-gray-500 rounded-xl p-5 text-center space-y-3">
      <img
        className="w-20 h-20 rounded-full mx-auto"
        src={profileImage}
        alt=""
      />
      <div>
        <h1 className="text-xl font-semibold">{fullName}</h1>
        <h1>{email}</h1>
        <div className="mt-4">
          <Link onClick={handleClick} to={"/message"}>
            <button className="px-8 py-1.5  bg-[#262626] rounded-full">
              Message
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
