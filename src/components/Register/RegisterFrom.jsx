/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImSpinner } from "react-icons/im";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Link } from "react-router-dom";
const RegisterFrom = ({ handleSubmit, handleImage, image, isLoading }) => {
  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          required
          className="w-full px-5 py-2 bg-transparent focus:outline-none border rounded border-gray-700 focus:border-[#1CC0A9]"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          required
          className="w-full px-5 py-2 bg-transparent focus:outline-none border rounded border-gray-700 focus:border-[#1CC0A9]"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full px-5 py-2 bg-transparent focus:outline-none border rounded border-gray-700 focus:border-[#1CC0A9]"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="w-full px-5 py-2 bg-transparent focus:outline-none border rounded border-gray-700 focus:border-[#1CC0A9]"
          placeholder="Enter your password"
        />
      </div>
      <div className="w-full flex gap-2 items-center">
        {image && (
          <img
            className="w-12 h-12 rounded-full ring-2 ring-[#1CC0A9] mt-2"
            src={image}
            alt=""
          />
        )}
        <label className="w-full cursor-pointer" htmlFor="image">
          <div className="w-full flex gap-2 items-center justify-center border border-dashed border-gray-700 px-3 py-2 mt-2">
            <MdOutlineCloudUpload className="w-7 h-7" />
            <h1>Upload Image</h1>
          </div>
        </label>
        <input
          onChange={handleImage}
          hidden
          type="file"
          name="image"
          id="image"
          required
        />
      </div>
      <div>
        {" "}
        <button
          className="w-full px-8 py-2 mt-5 flex justify-center items-center bg-[#1CC0A9] text-white rounded font-semibold"
          type="submit"
        >
          {isLoading ? (
            <>
              <ImSpinner className="animate-spin flex justify-center items-center w-6 h-6" />
              Sign Up
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
      <h1 className="text-center hover:text-blue-500 hover:underline">
        <Link to={"/login"}>Already you have an account?</Link>
      </h1>
    </form>
  );
};

export default RegisterFrom;
