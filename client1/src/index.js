//it is folder to fetch all data.
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CreateHotels from "./components/Owners/CreateHotels";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignupPage from "./components/SignupPage";
import HotelList from "./components/Customers/HotelList";
import { Button, Result } from "antd";
import PropertyDetails from "./components/Customers/PropertyDetails";
import Login from "./components/Login";
import Owners from "./components/Owners/Owners";
import BookedRooms from "./components/Owners/BookedRooms";
import MyBookings from "./components/Customers/MyBookings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    ),
  },
  {
    path: "/property/:id",
    element: <PropertyDetails />,
  },
  {
    path: "/createProperty",
    element: <Owners />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignupPage />,
  },
  {
    path: "/hotelslist",
    element: <HotelList />,
  },
  {
    path: "/bookedRooms",
    element: <BookedRooms />,
  },
  {
    path: "/myBookings",
    element: <MyBookings />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
