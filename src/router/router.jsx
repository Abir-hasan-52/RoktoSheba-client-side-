import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blog from "../Pages/Blog/Blog";
import AuthLayOut from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/donationRequests",
        Component: DonationRequests,
      },
      {
        path: "/blogs",
        Component: Blog,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children:[
        {
            path:'/login',
            Component:Login,
        },
        {
            path:"/register",
            Component:Register,
        }
    ]
  },
]);
