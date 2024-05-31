import { useGetAllUserQuery } from "../fetures/user/userApi";
import FriendCard from "./FriendCard";
import useAuth from "../hook/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import FriendCardSkeleton from "../utils/FriendCardSkeleton";

const Friends = () => {
  const authUser = useAuth();
  const { data, isLoading, isError } = useGetAllUserQuery();
  const filterUser = data?.data?.filter(
    (user) => user?._id !== authUser?.userId
  );
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  let content = null;
  if (isLoading && !isError) {
    content = (
      <>
        <FriendCardSkeleton />
        <FriendCardSkeleton />
        <FriendCardSkeleton />
        <FriendCardSkeleton />
      </>
    );
  } else if (!isLoading && !isError && filterUser?.length === 0) {
    content = (
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center">No Data Available</h1>
      </div>
    );
  } else if (!isLoading && !isError && filterUser?.length > 0) {
    content = filterUser?.map((user, i) => <FriendCard key={i} user={user} />);
  }
  return (
    <div className="w-full h-full ">
      <div className="w-full h-[calc(100vh-64px)] p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-scroll">
        {content}
      </div>
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

export default Friends;
