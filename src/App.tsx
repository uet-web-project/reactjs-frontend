import "./App.css";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { deDE } from "@mui/x-date-pickers/locales";
import SignUpInformation from "./components/sign-up/SignUpInformation";
import Login from "./screens/authentication/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginInformation from "./components/login/LoginInformation";
import LandingPage from "./screens/landing-page";
import Main from "./screens/main-screen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RegistrationCertificate from "./screens/registration-certificate";
import RegistrationCertificate2 from "./screens/registration-certificate-2";
import ProfileScreen from "./screens/profile-screen";

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
        element: <RegistrationCertificate2 />,
      },
      {
        path: "profile",
        element: <ProfileScreen />,
      },
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
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
