import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { deDE } from "@mui/x-date-pickers/locales";
import SignUpInformation from "./components/sign-up/SignUpInformation";
import Login from "./screens/authentication/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginInformation from "./components/login/LoginInformation";
import LandingPage from "./screens/landing-page";
import Main from "./screens/main-screen";

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
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
