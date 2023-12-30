import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../Store/AuthSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });
      console.log(res.data.username);
      await dispatch(login(res.data.token));
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col w-full">
      <div className="md:w-3/4 max-w-[33%] p-5  mt-[10rem] bg-gray-100 rounded-md  border border-gray-100 flex items-center justify-center flex-col">
        <input
          type="text"
          className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-200  text-gray-700 border border-black"
          placeholder="Enter usrname"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="rounded-3xl h-10 px-3 my-3 outline-none  bg-gray-200   border border-black"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={handleLogin} className="px-8 rounded-3xl py-3 border-2 hover:bg-[#303030] border-[#303030] hover:text-white">Login</button>
        {error && <p style={{ color: "red" }}>Wrong password or username</p>}
      </div>
    </div>
  );
};

export default Login;
