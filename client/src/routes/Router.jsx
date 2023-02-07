import { Route, Routes } from "react-router-dom";
import Forgetpassword from "../components/auth/Forgetpassword";
import AuthPage from "../pages/AuthPage";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Description from "../pages/Description";
import Favourite from "../pages/Favourite";
import Footer from "../pages/Footer";
import Home from "../pages/Home";
import Navbar from "../pages/Navbar";
import Order from "../pages/Order";
import Products from "../pages/Products";
import { Private } from "./Private";
import { Public } from "./Public";

export const Router = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allProducts" element={<Products />} />
        <Route path="/men" element={<Products />} />
        <Route path="/women" element={<Products />} />
        <Route path="/kids" element={<Products />} />
        <Route path="/description" element={<Description />} />
        <Route
          path="/auth"
          element={
            <Public>
              <AuthPage />
            </Public>
          }
        />
        <Route
          path="/favourite"
          element={
            <Private>
              <Favourite />
            </Private>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <Private>
              <Checkout />
            </Private>
          }
        />
        <Route
          path="/orders"
          element={
            <Private>
              <Order />
            </Private>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <Public>
              <Forgetpassword />
            </Public>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};
