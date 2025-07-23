import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blog from "../Pages/Blog/Blog";
import AuthLayOut from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayOut from "../Layouts/DashboardLayOut";
import MyDonationRequests from "../Pages/Dashboard/MyDonation/MyDonation";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonation/CreateDonation";
import MyDonation from "../Pages/Dashboard/MyDonation/MyDonation";
import CreateDonation from "../Pages/Dashboard/CreateDonation/CreateDonation";
import AllUsers from "../Pages/Dashboard/AllUsers/Allusers";
import AllDonation from "../Pages/Dashboard/AllDonation/AllDonation";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/AddBlog/AddBlog";

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
        path: "/blogs",
        Component: Blog,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayOut,
    children: [
      {
        path: "myDonation",
        Component: MyDonation,
      },
      {
        path: "createDonation",
        Component: CreateDonation,
      },
      {
        path: "allUsers",
        Component: AllUsers,
      },
      {
        path: "allDonation",
        Component: AllDonation,
      },{
        path:'content-management',
        Component:ContentManagement,

      },
      {
        path: "content-management/add-blog",
        Component:AddBlog,
      },
    ],
  },
]);
