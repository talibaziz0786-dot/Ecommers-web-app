import { useState } from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const loginHandler =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const { data } =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/auth/login`,

            {
              email,
              password,
            }
          );

        console.log(
          "LOGIN RESPONSE:",
          data
        );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          data.token
        );

        alert(
          "Login successful ✅"
        );

        // DECODE USER
  let user = null;

try {

  const payload =
    data.token.split(".")[1];

  user = JSON.parse(
    atob(payload)
  );

} catch (error) {

  console.log("Invalid token");
}
        // ADMIN REDIRECT
        if (
          user.role === "admin"
        ) {

          navigate("/dashboard");

        } else {

          navigate("/");
        }

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
          "Login failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-zinc-100
        dark:bg-zinc-950
        px-5
      "
    >

      <form
        onSubmit={loginHandler}
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-zinc-900
          p-8
          rounded-3xl
          shadow-2xl
          border
          border-zinc-200
          dark:border-zinc-800
        "
      >

        <h1
          className="
            text-4xl
            font-black
            text-center
            mb-8
          "
        >
          Welcome Back
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-zinc-300
            dark:border-zinc-700
            bg-white
            dark:bg-zinc-950
            p-4
            rounded-2xl
            mb-5
            outline-none
          "
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-zinc-300
            dark:border-zinc-700
            bg-white
            dark:bg-zinc-950
            p-4
            rounded-2xl
            mb-6
            outline-none
          "
          required
        />

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-2xl
            font-bold
            text-lg
            hover:scale-[1.02]
            transition
          "
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

        {/* REGISTER */}
        <p
          className="
            text-center
            mt-6
            text-gray-500
          "
        >
          Don't have an account?

          <Link
            to="/register"
            className="
              text-black
              dark:text-white
              font-bold
              ml-2
            "
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}