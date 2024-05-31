import { ImSpinner } from "react-icons/im";
import { Link } from "react-router-dom";

const LoginFrom = ({ handleSubmit, isLoading }) => {
  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Username</label>
        <input
          type="text"
          name="username"
          id="username"
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
      <div className="flex justify-center items-center">
        <button
          className="w-full mt-5 px-8 py-2 flex justify-center items-center  bg-[#1CC0A9] text-white rounded font-semibold"
          type="submit"
        >
          {isLoading ? (
            <>
              <ImSpinner className="animate-spin flex justify-center items-center w-6 h-6" />{" "}
              Login
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>
      <h1 className="text-center hover:text-blue-500 hover:underline">
        <Link to={"/register"}>{`Don't have an account?`}</Link>
      </h1>
    </form>
  );
};

export default LoginFrom;
