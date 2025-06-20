import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./pages/UserHome";
import ContactPage from "./pages/Contact";
import EventList from "./components/EventList";
import AboutPage from "./pages/About";
import MyBookingPage from "./pages/MyBooking";
import MyPaymentPage from "./pages/MyPayments";
import EventBookingForm from "./pages/booking";
import PaymentPage from "./pages/paymentpage";
import UserProfile from "./pages/userprofile";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserTable from "./pages/admin/UserTable";
import BookingTable from "./pages/admin/BookingTable";
import PaymentTable from "./pages/admin/PaymentTable";
import EventTable from "./pages/admin/EventTable";
import EventForm from "./pages/admin/EventForm";
import Layout from "./components/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginForm/>,
    },
    {
      path: '/register',
      element: <RegisterForm/>,
    },
    // Routes with Navbar and Footer
    {
      element: <Layout />,
      children: [
        {
          path: '/home',
          element: <ProtectedRoute><HomePage/></ProtectedRoute>,
        },
        {
          path: '/contact',
          element: <ContactPage/>,
        },
        {
          path: '/test-events',
          element: <EventList/>, // Test route without protection
        },
        {
          path: '/test-home',
          element: <HomePage/>, // Test route without protection
        },
        {
          path: '/booking/:id',
          element: <ProtectedRoute><EventBookingForm/></ProtectedRoute>,
        },
        {
          path: '/findevents',
          element: <ProtectedRoute><EventList/></ProtectedRoute>,
        },
        {
          path: '/about',
          element: <AboutPage/>,
        },
        {
          path: '/mybooking',
          element: <ProtectedRoute><MyBookingPage/></ProtectedRoute>,
        },
        {
          path: '/mypayment',
          element: <ProtectedRoute><MyPaymentPage/></ProtectedRoute>,
        },
        {
          path: '/payment/:id',
          element: <ProtectedRoute><PaymentPage/></ProtectedRoute>,
        },
        {
          path: '/userprofile',
          element: <ProtectedRoute><UserProfile/></ProtectedRoute>,
        },
        {
          path: '/event/:id',
          element: <ProtectedRoute><EventDetail/></ProtectedRoute>,
        },
        // Admin routes
        {
          path: '/admin/dashboard',
          element: <AdminRoute><AdminDashboard/></AdminRoute>,
        },
        {
          path: '/admin/users',
          element: <AdminRoute><UserTable/></AdminRoute>,
        },
        {
          path: '/admin/bookings',
          element: <AdminRoute><BookingTable/></AdminRoute>,
        },
        {
          path: '/admin/payments',
          element: <AdminRoute><PaymentTable/></AdminRoute>,
        },
        {
          path: '/admin/events',
          element: <AdminRoute><EventTable/></AdminRoute>,
        },
        {
          path: '/admin/events/create',
          element: <AdminRoute><EventForm/></AdminRoute>,
        },
        {
          path: '/admin/events/edit/:id',
          element: <AdminRoute><EventForm/></AdminRoute>,
        },
        {
          path: '*',
          element: <NotFound/>,
        },
      ]
    }
  ]);
  
  return (
    <RouterProvider router={router}/>
  );
};

export default App;