import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col-reverse md:flex-row justify-end md:justify-normal ">
      <Sidebar />
      <Navigate to="/message" replace />
      <Outlet />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
