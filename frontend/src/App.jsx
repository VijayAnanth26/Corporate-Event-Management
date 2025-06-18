import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import AdminLogin from "./components/AdminLogin";
import Register from "./components/register";
import HomePage from "./pages/UserHome";
import ContactPage from "./pages/Contact";
import CardList from "./components/CardList";
import AboutPage from "./pages/About";
import MyBookingPage from "./pages/MyBooking";
import MyPaymentPage from "./pages/MyPayments";
// import EventBookingForm from "./pages/booking";
import PaymentPage from "./pages/paymentpage";
import AdminHome from "./pages/AdminHome";
import AdminAddEventForm from "./pages/AdminAddForm";
import BookingTable from "./pages/BookingTable";
import PaymentTable from "./pages/PaymentTable";
import "./assets/css/table.css"
import UserTable from "./pages/UserTable";
import UserProfileComponent from "./pages/userprofile";
import AdminProfileComponent from "./pages/AdminProfile";
import AdminCardList from "./components/AdminCardList";

const App = () => {
  const router= createBrowserRouter([
    {
      path: '/',
      element: <Login/>,
    },
    {
      path: '/adminlogin',
      element: <AdminLogin/>,
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/home',
      element: <HomePage/>,
    },
    {
      path: '/contact',
      element: <ContactPage/>,
    },
    // {
    //   path: '/booking',
    //   element: <EventBookingForm/>,
    // },
    {
      path: '/findevents',
      element: <CardList/>,
    },
    {
      path: '/events',
      element: <AdminCardList/>,
    },
    {
      path: '/about',
      element: <AboutPage/>,
    },
    {
      path: '/mybooking',
      element: <MyBookingPage/>,
    },
    {
      path: '/mypayment',
      element: <MyPaymentPage/>,
    },
    {
      path: '/payment',
      element: <PaymentPage/>,
    },
    {
      path: '/userprofile',
      element:<UserProfileComponent/>,
    },
    {
      path: '/adminprofile',
      element:<AdminProfileComponent/>,
    },
    {
      path: '/adminhome',
      element: <AdminHome/>,
    },
    {
      path: '/addevents',
      element: <AdminAddEventForm/>,
    },
    {
      path: '/viewbookings',
      element: <BookingTable/>,
    },
    {
      path: '/viewpayments',
      element: <PaymentTable/>,
    },
    {
      path: '/viewusergroup',
      element: <UserTable/>,
    },
  ])
  return (
    <RouterProvider router={router}/>
    
  );
};

export default App;