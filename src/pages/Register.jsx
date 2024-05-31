import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import RegisterFrom from "../components/Register/RegisterFrom";
import { useRegisterMutation } from "../fetures/auth/authApi";
import { useNavigate } from "react-router-dom";
import uploadToCloudinary from "../utils/uploadToCloudinary";

const Register = () => {
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [register, { data, isError, error, isSuccess }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const username = form.username.value;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const images = imageFile;
    const Url = await uploadToCloudinary(images);
    const userInfo = {
      username,
      fullName,
      email,
      password,
      profileImage: Url[0],
    };
    register(userInfo);
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile([file]);
    }
  };

  useEffect(() => {
    if (isError && error) {
      setIsLoading(false);
      toast.error(error?.data?.message, {
        duration: 5000,
      });
    } else if (data?.data && isSuccess) {
      navigate("/login");
      setIsLoading(false);
    }
  }, [data, isError, error, isSuccess, navigate]);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center p-5">
        <div className="w-full max-w-[500px] mx-auto gap-5">
          <div className="w-full border border-gray-700 p-5 rounded">
            <h1 className="text-3xl font-semibold text-center py-2">
              Create Your Account
            </h1>
            <RegisterFrom
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              image={image}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Register;
