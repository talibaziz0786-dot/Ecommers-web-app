import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  Moon,
  Sun,
  Search,
  Heart,
  LayoutDashboard,
  Shield,
  LogOut,
} from "lucide-react";

import { useState } from "react";

export default function Navbar({
  cart,
  dark,
  setDark,
  search,
  setSearch,
  wishlist = [],
  setWishlist,
}) {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const user = token
    ? JSON.parse(
        atob(token.split(".")[1])
      )
    : null;

  const isAdmin =
    user?.role === "admin";

  const [openAdmin, setOpenAdmin] =
    useState(false);

  // LOGOUT
  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        border-b
        border-zinc-200
        dark:border-zinc-800
        bg-white/80
        dark:bg-zinc-950/80
        backdrop-blur-2xl
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
          gap-6
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="
            text-3xl
            font-black
          "
        >
          LuxeStore
        </Link>

        {/* SEARCH */}
        <div className="flex-1 hidden md:flex">

          <div className="relative w-full max-w-xl">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                pl-12
                pr-4
                py-3
                rounded-full
                border
                border-zinc-300
                dark:border-zinc-700
                bg-white
                dark:bg-zinc-900
                outline-none
              "
            />

          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="
              relative
              p-3
              rounded-full
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              transition
            "
          >
            <Heart size={22} />

            <span
              className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-xs
                h-5
                w-5
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              {wishlist.length}
            </span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="
              relative
              p-3
              rounded-full
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              transition
            "
          >
            <ShoppingBag size={22} />

            <span
              className="
                absolute
                -top-1
                -right-1
                bg-black
                text-white
                text-xs
                h-5
                w-5
                rounded-full
                flex
                items-center
                justify-center
              "
            >
              {cart.length}
            </span>
          </Link>

          {/* DARK MODE */}
          <button
            onClick={() =>
              setDark(!dark)
            }
            className="
              p-3
              rounded-full
              hover:bg-zinc-100
              dark:hover:bg-zinc-800
              transition
            "
          >
            {dark ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          {/* ADMIN */}
          {isAdmin && (
            <div className="relative">

              <button
                onClick={() =>
                  setOpenAdmin(
                    !openAdmin
                  )
                }
                className="
                  p-3
                  rounded-full
                  hover:bg-zinc-100
                  dark:hover:bg-zinc-800
                "
              >
                <Shield size={22} />
              </button>

              {openAdmin && (

                <div
                  className="
                    absolute
                    right-0
                    mt-3
                    w-52
                    bg-white
                    dark:bg-zinc-900
                    border
                    border-zinc-200
                    dark:border-zinc-800
                    rounded-3xl
                    shadow-2xl
                    overflow-hidden
                  "
                >

                  <Link
                    to="/dashboard"
                    className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-4
                      hover:bg-zinc-100
                      dark:hover:bg-zinc-800
                    "
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <Link
                    to="/admin"
                    className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-4
                      hover:bg-zinc-100
                      dark:hover:bg-zinc-800
                    "
                  >
                    <Shield size={18} />
                    Admin Panel
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-5
                      py-4
                      text-red-500
                      hover:bg-red-50
                      dark:hover:bg-red-950/30
                    "
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
             )}

            </div>
          )}

        </div>
      </nav>
    </header>
  );
}