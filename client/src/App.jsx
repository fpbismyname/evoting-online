import "./App.css";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <Outlet/>
  );
};

export default App;
