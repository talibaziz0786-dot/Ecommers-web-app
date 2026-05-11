import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      adminSecret: "",
    });

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            formData
          );

       if (data.token) {

  localStorage.setItem(
    "token",
    data.token
  );

}

        navigate("/");

        window.location.reload();

      } catch (error) {

        alert(
          error.response.data.message
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
      "
    >

      <form
        onSubmit={submitHandler}
        className="
          w-full
          max-w-md
          bg-white
          dark:bg-zinc-900
          p-8
          rounded-3xl
          shadow-2xl
          space-y-5
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
          "
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={changeHandler}
          className="
            w-full
            p-4
            rounded-xl
            border
          "
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          className="
            w-full
            p-4
            rounded-xl
            border
          "
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          className="
            w-full
            p-4
            rounded-xl
            border
          "
          required
        />

        <input
          type="text"
          name="adminSecret"
          placeholder="Admin Secret (Optional)"
          onChange={changeHandler}
          className="
            w-full
            p-4
            rounded-xl
            border
          "
        />

        <button
          className="
            w-full
            bg-black
            text-white
            py-4
            rounded-xl
            font-bold
          "
        >
          Register
        </button>

      </form>

    </div>
  );
}