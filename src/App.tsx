import "./App.css";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { deDE } from "@mui/x-date-pickers/locales";
import React from "react";
import SignUpInformation from "./components/sign-up/SignUpInformation";
import Login from "./screens/authentication/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginInformation from "./components/login/LoginInformation";
import LandingPage from "./screens/landing-page";
import Main from "./screens/main-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import RegistrationCertificate from "../src/screens/registration-certificate";
import ProfileScreen from "./screens/profile-screen";
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
      {
        path: "create-account",
        element: <SignUpInformation />,
      },
      {
        path: "registration-certificate",
        element: <RegistrationCertificate />,
      },
      // {
      //   path: "profile",
      //   element: <ProfileScreen />,
      // },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
    children: [
      {
        path: "department-login",
        element: <LoginInformation isDepLogin />,
      },
      {
        path: "center-login",
        element: <LoginInformation isDepLogin={false} />,
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
      },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}
export default App;
