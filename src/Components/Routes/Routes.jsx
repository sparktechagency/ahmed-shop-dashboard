import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";

import Dashboard from "../Dashboard/Dashboard";

import Profile from "../../Pages/Profile/Profile";
import EditProfile from "../../Pages/Profile/EditProfile";

import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import Logout from "../Dashboard/Logout";

import AboutUs from "../Dashboard/Settings/AboutUs";

import Notifications from "../Dashboard/Notifications";
import TermsAndConditions from "../Dashboard/Settings/Terms&Conditions";
import ChangePassword from "../Dashboard/Settings/ChangePassword";
import PrivacyPolicy from "../Dashboard/Settings/PrivacyPolicy";
import Settings from "../Dashboard/Settings/Settings";
import Customer from "../Dashboard/Users/Customer";
import Seller from "../Dashboard/Users/Seller";
import Earnings from "../Dashboard/Earnings";
import Faq from "../Dashboard/Settings/Faq";
import Category from "../Dashboard/Category";

//

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/reset-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "customers",
            element: <Customer />,
          },
          {
            path: "seller",
            element: <Seller />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "earnings",
            element: <Earnings />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "terms-and-conditions",
            element: <TermsAndConditions />,
          },
          {
            path: "privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "about-us",
            element: <AboutUs />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "profile/edit-profile",
            element: <EditProfile />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "frequently-asked-questions",
            element: <Faq />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
