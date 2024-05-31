import { IoHomeOutline } from "react-icons/io5";
import ConversationHead from "./ConversationHead";
import ConversationList from "./ConversationList";
import { Link, useNavigate } from "react-router-dom";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { AiOutlineMessage } from "react-icons/ai";
import useAuth from "../../hook/useAuth";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Conversation = () => {
  const isOpen = useSelector((state) => state?.users.isOpen);
  const authUser = useAuth();
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate('/login')
  };
  return (
    <div
      className={`w-full ${
        isOpen ? "hidden" : "block"
      } col-span-full md:col-span-4 md:block bg-[#1e1f22]`}
    >
      <ConversationHead />
      <ConversationList />
      <div className="w-full block md:hidden">
        <ul className="w-full h-16 flex  gap-12 justify-center items-center text-center px-3 py-2">
          <li>
            <IoHomeOutline className="w-6 h-6 mx-auto text-[#7D7F86]" />
          </li>
          <li>
            <Link to={"/friends"}>
              <LiaUserFriendsSolid className="w-7 h-7 mx-auto text-[#7D7F86]" />
            </Link>
          </li>
          <li>
            <Link to={"/message"}>
              <AiOutlineMessage className="w-7 h-7 mx-auto text-[#7D7F86]" />
            </Link>
          </li>
          {authUser ? (
            <>
              <li>
                <img
                  className="w-10 h-10 rounded-full"
                  src={authUser?.profileImage}
                  alt=""
                />
              </li>
              <li>
                <button onClick={handleLogout}>
                  <RiLogoutCircleLine className="w-7 h-7 mx-auto text-[#7D7F86]" />
                </button>
              </li>
            </>
          ) : (
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Conversation;
