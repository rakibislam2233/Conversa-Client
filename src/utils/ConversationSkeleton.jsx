const ConversationSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="flex gap-4 items-center">
        <div className="skeleton w-12 h-12 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversationSkeleton;
