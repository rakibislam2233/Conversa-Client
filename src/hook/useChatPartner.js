import { useSelector } from "react-redux";

export const useChatPartner = () => {
  const { partner, isActive } = useSelector((state) => state.chatPartner);
  return [partner, isActive];
};
