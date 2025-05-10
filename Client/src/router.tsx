import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/auth/RegistrePage";
import { Home, Cart, Checkout, Blocked } from "./pages/index";
import DefaultLayout from "./layout/DefaultLayout";
import LoginPage from "./pages/auth/loginPage";
import ProtedRroute from "./components/ProtedRroute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <ProtedRroute />,
        children: [
          {
            path: "",
            element: <Cart />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/auth",
    element: <DefaultLayout />,
    children: [
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Blocked />,
  },
]);

export default router;
