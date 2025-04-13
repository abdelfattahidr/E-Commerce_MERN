import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Cart, Checkout, Blocked } from "./pages/index";
import Navbar from "./components/navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/*" element={<Blocked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
