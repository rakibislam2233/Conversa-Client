import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetParticipantsQuery } from "../../fetures/user/userApi";
import { addGetUsers } from "../../fetures/user/userSlice";
import ConversationSkeleton from "../../utils/ConversationSkeleton";
import ConversationItem from "./ConversationItem";
import useAuth from "../../hook/useAuth";

const ConversationList = () => {
  const authUser = useAuth();
  const { data, isLoading, isError, isSuccess } = useGetParticipantsQuery();
  const { users } = useSelector((state) => state?.users);
  const filterUser = users?.filter(
    (user) => user?.user?._id !== authUser?.userId
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(addGetUsers(data?.data));
    }
  }, [dispatch, isSuccess, data]);

  let content = null;

  if (isLoading && !isError) {
    content = (
      <div className="space-y-3 px-3 py-2">
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
        <ConversationSkeleton />
      </div>
    );
  } else if (!isLoading && !isError && filterUser?.length === 0) {
    content = (
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-center">No Conversation Available</h1>
      </div>
    );
  } else if (!isLoading && !isError && filterUser?.length > 0) {
    content = filterUser?.map((user, i) => (
      <ConversationItem key={i} user={user} />
    ));
  }

  return (
    <div className="w-full h-[calc(100vh-194px)] md:h-[calc(100vh-130px)] overflow-y-scroll space-y-2 p-2">
      {content}
    </div>
  );
};

export default ConversationList;
