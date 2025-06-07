import { createBrowserRouter } from "react-router-dom";
import {
  Home,
  Cart,
  Checkout,
  Blocked,
  OrderSucces,
  Login,
  Registre,
  Orders,
} from "./pages/index";
import DefaultLayout from "./layout/DefaultLayout";
import ProtectedRoute from "./components/ProtedRroute";
import CartProvider from "./context/cart/CartProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CartProvider>
        <DefaultLayout />
      </CartProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success",
        element: <OrderSucces />,
      },
    ],
  },
  {
    path: "/profile",
    element: <DefaultLayout />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/auth",
    element: <DefaultLayout />,
    children: [
      {
        path: "registre",
        element: <Registre />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Blocked />,
  },
]);

export default router;
