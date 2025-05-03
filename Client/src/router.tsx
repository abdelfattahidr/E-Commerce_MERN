import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/auth/RegistrePage";
import { Home, Cart, Checkout, Blocked } from "./pages/index";
import DefaultLayout from "./layout/DefaultLayout";
import LoginPage from './pages/auth/loginPage';

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
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ]
  },
  {
    path: "/auth",
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
