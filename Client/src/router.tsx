import { createBrowserRouter } from "react-router-dom";
import RegistrePage from "./pages/auth/RegistrePage";
import { Home, Cart, Checkout, Blocked } from "./pages/index";
import DefaultLayout from "./layout/DefaultLayout";

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
        path: "registre",
        element: <RegistrePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Blocked />,
  },
]);

export default router;
