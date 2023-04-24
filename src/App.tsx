import "./App.css";
import React from "react";
import SignUpInformation from "./components/sign-up/SignUpInformation";
import Login from "./screens/authentication/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginInformation from "./components/login/LoginInformation";
import LandingPage from "./screens/landing-page";
import Main from "./screens/main-screen";
import CarRegistry from "./screens/car-registry";
import RegistryCenter from "./screens/registry-center/RegistryCenter";
import ExpiredCar from "./screens/expired-car/ExpiredCar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "landing-page",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
    children: [
      {
        path: "login",
        element: <LoginInformation />,
      },
      {
        path: "create-account",
        element: <SignUpInformation />,
      },
    ],
  },
  {
    path: "/stats",
    element: <Main />,
    children: [
      {
        path: "cars",
        element: <CarRegistry />,
      },
      {
        path: "centers",
        element: <RegistryCenter />,
      },
      {
        path: "expired",
        element: <ExpiredCar />,
      }
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
