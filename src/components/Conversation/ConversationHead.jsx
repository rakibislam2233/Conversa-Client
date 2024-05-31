import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ConversationHead = () => {
  return (
    <div className="w-full h-[130px] space-y-3.5 px-5 py-8">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Chat</h1>
        <Link to={'/friends'}><IoPersonAddOutline className="size-5" /></Link>
      </div>
      <form action="">
        <input
          type="text"
          name="search"
          id="search"
          className="w-full px-3 py-2  bg-[#1C1D1F]  rounded outline-none"
          placeholder="Search here..."
        />
      </form>
    </div>
  );
};

export default ConversationHead;
