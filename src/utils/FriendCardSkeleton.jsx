import React from "react";

const FriendCardSkeleton = () => {
  return (
    <div className="w-full h-60 rounded-xl p-5 text-center space-y-3 animate-pulse border border-gray-800">
      <div className="w-20 h-20 rounded-full mx-auto bg-[#15191E] skeleton"></div>
      <div className="space-y-2">
        <div className="w-24 h-6 bg-[#15191E] mx-auto rounded-md skeleton"></div>
        <div className="w-32 h-6 bg-[#15191E] mx-auto rounded-md skeleton"></div>
        <div className="mt-4">
          <div className="px-8 py-1.5 bg-[#15191E] rounded-full mx-auto w-24 skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default FriendCardSkeleton;
