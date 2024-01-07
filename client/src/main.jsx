import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import NonAdminPage from "./Pages/nonAdminPage.jsx";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/evoting-online",
    element: <App/>,
    children: [
      {
        path: "/evoting-online",
        element: <LoginPage />,
      },
      {
        path: "/evoting-online/vote",
        element: <NonAdminPage />,
      },
      {
        path: "/evoting-online/managevote",
        element: <AdminPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
