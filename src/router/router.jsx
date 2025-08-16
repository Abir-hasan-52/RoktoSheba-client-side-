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

import AdminDashboardHome from "../Pages/Dashboard/AdminDashboardHome/AdminDashboardHome";
import Funding from "../Pages/Dashboard/Funding/Funding";
import MainFunding from "../Pages/Dashboard/Funding/MainFunding";
import PrivateRoute from "../route/PrivateRoute";
import DonorDashboardHome from "../Pages/Dashboard/DonorDashboardHome/DonorDashboardHome";
import EditDonation from "../Pages/Dashboard/EditDonation/EditDonation";

import DonationDetails from "../Pages/Dashboard/DonationDetails/DonationDetails";
import AddBlog from "../Pages/Dashboard/AddBlog/AddBlog";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ProfilePage from "../Pages/Dashboard/ProfilePage/ProfilePage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequestDetails from "../Pages/DonationRequests/DonationRequestDetails";
import Forbidden from "../Pages/Forbidden/Forbidden";
import PrivateRoleRoute from "../route/PrivateRoleRoute";
import BlogDetails from "../Pages/Blog/BlogDetails";

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
      {
        path:"/blogs/:id",
        element:<BlogDetails/>
      }
      ,{
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/search",
        Component: SearchPage,
      },
      {
        path: "donation-requests",
        Component: DonationRequests,
      },
      {
        path: "/donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayOut></DashboardLayOut>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoleRoute allowedRoles={["admin", "volunteer", "donor"]}>
            <DashboardHome></DashboardHome>
          </PrivateRoleRoute>
        ),
      },

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

        element: (
          <PrivateRoleRoute allowedRoles={["admin", "volunteer"]}>
            <AllUsers />
          </PrivateRoleRoute>
        ),
      },
      {
        path: "allDonation",

        element: (
          <PrivateRoleRoute allowedRoles={["admin", "volunteer"]}>
            <AllDonation />
          </PrivateRoleRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoleRoute allowedRoles={["admin", "volunteer"]}>
            <ContentManagement></ContentManagement>
          </PrivateRoleRoute>
        ),
      },
      {
        path: "add-blog",
        element: <AddBlog></AddBlog>,
      },
      {
        path: "funding",
        Component: Funding,
      },
      {
        path: "mainFunding",
        Component: MainFunding,
      },
      {
        path: "editDonation/:id",
        Component: EditDonation,
      },
      {
        path: "donation-details/:id",
        Component: DonationDetails,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
    ],
  },
]);
