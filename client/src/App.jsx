import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import NonAdminPage from "./Pages/nonAdminPage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
      <Routes>
        <Route>
        <Route path="/evoting-online" element={<LoginPage/>}/>
        <Route path="/evoting-online/vote" element={<NonAdminPage/>}/>
        <Route path="/evoting-online/managevote" element={<AdminPage/>}/>
        </Route>
      </Routes>
  );
};

export default App;
