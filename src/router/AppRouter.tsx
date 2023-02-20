import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>ERROR</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
