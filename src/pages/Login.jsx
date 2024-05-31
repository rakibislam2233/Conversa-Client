import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoginMutation } from "../fetures/auth/authApi";
import LoginFrom from "../components/login/LoginFrom";

const Login = () => {
  const [login, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const userInfo = { username, password };
    login(userInfo);
  };

  useEffect(() => {
    if (error) {
      console.log(error)
      const errorResponse = error;
      toast.error(
        errorResponse?.data?.message || "An unexpected error occurred",
        {
          duration: 5000,
        }
      );
    } else if (data?.data?.token) {
      toast.success(data?.message, {
        duration: 5000,
      });
      navigate("/message");
    }
  }, [data, error, navigate]);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center p-5">
        <div className="w-full max-w-[500px] mx-auto">
          <div className="w-full border border-gray-700 p-5 rounded">
            <h1 className="text-3xl font-semibold text-center py-2">
              Login Your Account
            </h1>
            <LoginFrom handleSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Login;
