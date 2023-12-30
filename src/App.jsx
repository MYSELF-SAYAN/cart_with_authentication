import { useState } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const data=useSelector(state=>state.auth)
  console.log(data)
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={data.isAuth?<Home/>:<Login/>} />
        <Route path="/" element={data.isAuth?<Home/>:<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
