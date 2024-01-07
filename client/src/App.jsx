import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import NonAdminPage from "./Pages/nonAdminPage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="vote" element={<NonAdminPage/>}/>
        <Route path="managevote" element={<AdminPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
