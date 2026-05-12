import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BASE_URL from "../api/baseURL";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await axios.post(
            `${BASE_URL}/auth/login`,
            {
              email,
              password,
            }
          );

        localStorage.setItem(
          "token",
          data.token
        );

        toast.success(
          "Login Success ✅"
        );

        navigate("/");

        window.location.reload();

      } catch (error) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed ❌"
        );
      }
    };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-white
        dark:bg-zinc-950
        px-6
      "
    >
      <form
        onSubmit={submitHandler}
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-zinc-900
          p-10
          rounded-[40px]
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
            mb-8
            text-black
            dark:text-white
          "
        >
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-4
            bg-white
            dark:bg-zinc-950
            text-black
            dark:text-white
            outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            mb-6
            bg-white
            dark:bg-zinc-950
            text-black
            dark:text-white
            outline-none
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-black
            dark:bg-white
            dark:text-black
            text-white
            py-4
            rounded-2xl
            font-bold
            hover:scale-[1.02]
            transition
          "
        >
          Login
        </button>

      </form>
    </div>
  );
}