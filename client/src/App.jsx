import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import NonAdminPage from "./Pages/nonAdminPage";
import AdminPage from "./Pages/AdminPage";
import NotFoundPage from "./Pages/NotFoundPage";


const App = () => {
  return (
    <Routes>
      <Route path= "/evoting-online" element={<LoginPage/>}></Route>
      <Route path= "/evoting-online/vote" element={<NonAdminPage/>}></Route>
      <Route path= "/evoting-online/managevote" element={<AdminPage/>}></Route>
      <Route path= "*" element={<NotFoundPage/>}></Route>
    </Routes>
  );
};

export default App;