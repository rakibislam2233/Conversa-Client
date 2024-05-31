import { useChatPartner } from "../../hook/useChatPartner";

const ParticipentProfile = () => {
  const [partner, isActive] = useChatPartner();
  const { fullName, profileImage } = partner || {};
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="text-center space-y-2">
        <div className="w-20 h-20 mx-auto relative">
          <img
            className="w-20 h-20 mx-auto rounded-full"
            src={profileImage}
            alt=""
          />
          {isActive && (
            <div className="absolute w-3 h-3 rounded-full right-2 bottom-1 bg-green-500"></div>
          )}
        </div>
        <h1 className="font-semibold text-xl">{fullName}</h1>
        <button className="px-8 py-2 bg-[#262626] rounded font-semibold">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ParticipentProfile;
