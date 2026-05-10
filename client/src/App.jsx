import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";

function App() {

  const [cart, setCart] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || []
    );

  const [wishlist, setWishlist] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || []
    );

  const [dark, setDark] =
    useState(
      localStorage.getItem(
        "theme"
      ) === "dark"
    );

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);

  useEffect(() => {

    if (dark) {

      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }

  }, [dark]);

  return (
    <BrowserRouter>

     <Navbar
  cart={cart}
  dark={dark}
  setDark={setDark}
  search={search}
  setSearch={setSearch}
  wishlist={wishlist}
  setWishlist={setWishlist}
/>

      <Routes>

        <Route
          path="/"
          element={
            <Products
              cart={cart}
              setCart={setCart}
              search={search}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/success"
          element={<Success />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;