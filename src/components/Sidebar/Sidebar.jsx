import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import { IoBookmarksOutline, IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import useAuth from "../../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
const Sidebar = () => {
  const authUser = useAuth();
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate('/login')
  };
  return (
    <div className="w-full h-full max-w-[70px] hidden md:block">
      <ul className="flex flex-col gap-10 my-10 items-center text-center">
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
        <li>
          <button>
            <CgProfile className="w-7 h-7 mx-auto text-[#7D7F86]" />
          </button>
        </li>
        <li>
          <button>
            <IoBookmarksOutline className="w-7 h-7 mx-auto text-[#7D7F86]" />
          </button>
        </li>
        <li>
          <button>
            <AiOutlineSetting className="w-7 h-7 mx-auto text-[#7D7F86]" />
          </button>
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
  );
};

export default Sidebar;
