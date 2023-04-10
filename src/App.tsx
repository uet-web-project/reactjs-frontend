import "./App.css";
import SignUpInformation from "./components/sign-up/SignUpInformation";
import Login from "./screens/authentication/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginInformation from "./components/login/LoginInformation";
import LandingPage from "./screens/landing-page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/authentication",
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
