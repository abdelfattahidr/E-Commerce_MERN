import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
