import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Blog from "../Pages/Blog/Blog";

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
        path: "/blog",
        Component: Blog,
      },
    ],
  },
]);
