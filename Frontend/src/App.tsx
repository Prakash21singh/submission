import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";
import { setUser } from "./store/authSlice";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/getdata", {
          withCredentials: true,
        });
        dispatch(setUser(data)); // Set the user data and mark them as authenticated
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  return (
    <>
      <div className="font-Inter h-screen flex items-center justify-center">
        <div className="w-[25%] h-full bg-slate-800 flex flex-col justify-start items-center">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `p-4 rounded-sm mt-1 w-full ${
                isActive ? "bg-slate-500" : "bg-slate-700"
              }`
            }>
            Courses
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-4 rounded-sm mt-1 w-full ${
                isActive ? "bg-slate-500" : "bg-slate-700"
              }`
            }>
            Dashboard
          </NavLink>
        </div>

        <div className="flex-1 h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
