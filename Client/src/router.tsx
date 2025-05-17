import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/auth/RegistrePage";
import { Home, Cart, Checkout, Blocked } from "./pages/index";
import DefaultLayout from "./layout/DefaultLayout";
import LoginPage from "./pages/auth/loginPage";
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
