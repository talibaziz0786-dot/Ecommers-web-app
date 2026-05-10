import {
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

export default function Dashboard() {

  return (
    <div
      className="
        max-w-7xl
        mx-auto
        py-10
      "
    >

      <h1
        className="
          text-4xl
          font-black
          mb-10
        "
      >
        Admin Dashboard
      </h1>

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            p-8
            rounded-3xl
            bg-white
            dark:bg-zinc-900
            shadow-xl
          "
        >
          <Package size={40} />

          <h2
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            Products
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage all products
          </p>
        </div>

        <div
          className="
            p-8
            rounded-3xl
            bg-white
            dark:bg-zinc-900
            shadow-xl
          "
        >
          <Users size={40} />

          <h2
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            Users
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage users
          </p>
        </div>

        <div
          className="
            p-8
            rounded-3xl
            bg-white
            dark:bg-zinc-900
            shadow-xl
          "
        >
          <ShoppingCart size={40} />

          <h2
            className="
              text-3xl
              font-bold
              mt-4
            "
          >
            Orders
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage orders
          </p>
        </div>

      </div>

    </div>
  );
}