import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import Navbar from "./components/navbar.tsx";
import AuthProvider from "./context/Auth/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Navbar />
    <RouterProvider router={router} />
  </AuthProvider>
);
