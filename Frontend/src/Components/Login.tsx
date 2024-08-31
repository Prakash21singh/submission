import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className=" w-1/3
       flex flex-col justify-center items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="demo@email.com"
          className="w-full p-5 rounded-sm bg-zinc-300 my-2 text-black outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-5 rounded-sm bg-zinc-300 my-2 text-black outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-5 rounded-sm bg-slate-900 text-white">
          Login
        </button>
        {error && <p>{error}</p>}
      </form>
      <p>
        <a href="/login" className="text-blue-800 my-4 underline ">
          Sign up Now
        </a>
      </p>
    </div>
  );
};

export default Login;
