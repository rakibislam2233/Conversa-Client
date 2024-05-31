import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = localStorage?.getItem("accessToken");
  if (token) {
    return jwtDecode(token);
  }
};
export default useAuth;
