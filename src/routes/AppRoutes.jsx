import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/Landing/LandingPage";
import ScrollToTop from "../components/ScrollToTop";

// Authentication Pages
import Login from "../pages/Authentication/Login/Login";
import Signup from "../pages/Authentication/Signup/Signup";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import OTPVerification from "../pages/Authentication/OTPVerification/OTPVerification";
import ResetPassword from "../pages/Authentication/ResetPassword/ResetPassword";
import ResetSuccess from "../pages/Authentication/ResetSuccess/ResetSuccess";

// Dashboard Pages
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AppointmentList from "../pages/Dashboard/Appointments/AppointmentList";
import AppointmentDetails from "../pages/Dashboard/Appointments/AppointmentDetails";
import BookAppointment from "../pages/Dashboard/Appointments/BookAppointment";
import AppointmentSuccess from "../pages/Dashboard/Appointments/AppointmentSuccess";
import Doctors from "../pages/Dashboard/Doctors/Doctors";
import DoctorDetails from "../pages/Dashboard/Doctors/DoctorDetails";
import Departments from "../pages/Dashboard/Departments/Departments";
import DepartmentDetails from "../pages/Dashboard/Departments/DepartmentDetails";
import MedicalRecords from "../pages/Dashboard/MedicalRecords/MedicalRecords";
import MedicalRecordDetails from "../pages/Dashboard/MedicalRecords/MedicalRecordDetails";
import Payments from "../pages/Dashboard/Payments/Payments";
import PaymentDetails from "../pages/Dashboard/Payments/PaymentDetails";
import Invoices from "../pages/Dashboard/Payments/Invoices";
import InvoiceDetails from "../pages/Dashboard/Payments/InvoiceDetails";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import Notifications from "../pages/Dashboard/Notifications/Notifications";
import NotificationDetails from "../pages/Dashboard/Notifications/NotificationDetails";
import Profile from "../pages/Dashboard/Profile/Profile";
import EditProfile from "../pages/Dashboard/Profile/EditProfile";
import Settings from "../pages/Dashboard/Settings/Settings";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Root layout that renders ScrollToTop once for all routes
const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "login",
            element: (
              <PublicRoute>
                <Login />
              </PublicRoute>
            ),
          },
          {
            path: "signup",
            element: (
              <PublicRoute>
                <Signup />
              </PublicRoute>
            ),
          },
          {
            path: "forgot-password",
            element: (
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            ),
          },
          {
            path: "otp-verification",
            element: (
              <PublicRoute>
                <OTPVerification />
              </PublicRoute>
            ),
          },
          {
            path: "reset-password",
            element: (
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            ),
          },
          {
            path: "reset-success",
            element: (
              <PublicRoute>
                <ResetSuccess />
              </PublicRoute>
            ),
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "appointments",
            children: [
              {
                index: true,
                element: <AppointmentList />,
              },
              {
                path: "book",
                element: <BookAppointment />,
              },
              {
                path: ":id",
                element: <AppointmentDetails />,
              },
              {
                path: "success",
                element: <AppointmentSuccess />,
              },
            ],
          },
          {
            path: "doctors",
            children: [
              {
                index: true,
                element: <Doctors />,
              },
              {
                path: ":id",
                element: <DoctorDetails />,
              },
            ],
          },
          {
            path: "departments",
            children: [
              {
                index: true,
                element: <Departments />,
              },
              {
                path: ":id",
                element: <DepartmentDetails />,
              },
            ],
          },
          {
            path: "medical-records",
            children: [
              {
                index: true,
                element: <MedicalRecords />,
              },
              {
                path: ":id",
                element: <MedicalRecordDetails />,
              },
            ],
          },
          {
            path: "payments",
            children: [
              {
                index: true,
                element: <Payments />,
              },
              {
                path: ":id",
                element: <PaymentDetails />,
              },
              {
                path: "success",
                element: <PaymentSuccess />,
              },
            ],
          },
          {
            path: "invoices",
            children: [
              {
                index: true,
                element: <Invoices />,
              },
              {
                path: ":id",
                element: <InvoiceDetails />,
              },
            ],
          },
          {
            path: "notifications",
            children: [
              {
                index: true,
                element: <Notifications />,
              },
              {
                path: ":id",
                element: <NotificationDetails />,
              },
            ],
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "edit",
                element: <EditProfile />,
              },
            ],
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;