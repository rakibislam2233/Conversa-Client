import { IoCallOutline, IoVideocamOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { useChatPartner } from "../../hook/useChatPartner";
import { useDispatch } from "react-redux";
import { setIsOpne } from "../../fetures/user/userSlice";
const ChatHead = () => {
  const [partner, isActive] = useChatPartner();
  const { profileImage, fullName } = partner || {};
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-between items-center border-b border-[#262626]  px-3  h-[80px] ">
      <div className="flex items-center gap-2 ">
        <button
          className="block md:hidden"
          onClick={() => dispatch(setIsOpne())}
        >
          <IoIosArrowBack className="size-6" />
        </button>
        <div className="relative">
          <img className="w-12 h-12 rounded-full" src={profileImage} alt="" />
          {isActive && (
            <div className=" absolute w-3 h-3 rounded-full right-1 bottom-0 bg-green-500"></div>
          )}
        </div>
        <div>
          <h1 className="font-semibold">{fullName}</h1>
          {isActive ? (
            <h1 className="text-xs font-semibold">Active Now</h1>
          ) : (
            <h1 className="text-xs font-semibold">Offline</h1>
          )}
        </div>
      </div>
      <div className="flex gap-5">
        <button className="w-10 h-10 rounded-full hover:bg-[#262626] transition-all duration-300">
          <IoCallOutline className="w-6 h-6 mx-auto" />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-[#262626] transition-all duration-300 hidden md:block">
          <IoVideocamOutline className="w-6 h-6 mx-auto" />
        </button>
        <button className="w-10 h-10 rounded-full hover:bg-[#262626] transition-all duration-300 hidden md:block">
          <TbListDetails className="w-6 h-6 mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default ChatHead;
