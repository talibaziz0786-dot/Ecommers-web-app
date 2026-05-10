import {
  ShoppingBag,
  Heart,
  Globe,
  BadgeCheck,
} from "lucide-react";

export default function Footer() {

  return (
    <footer
      className="
        mt-24
        bg-zinc-100
        dark:bg-zinc-950
        border-t
        border-zinc-200
        dark:border-zinc-800
        text-black
        dark:text-white
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
          grid
          md:grid-cols-4
          gap-12
        "
      >

        {/* LOGO */}
        <div>

          <h2
            className="
              text-3xl
              font-black
              flex
              items-center
              gap-2
            "
          >
            <ShoppingBag />
            LuxeStore
          </h2>

          <p
            className="
              mt-4
              text-gray-600
              dark:text-gray-400
              leading-relaxed
            "
          >
            Premium ecommerce
            experience with modern
            UI, smooth shopping
            and luxury design.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h3
            className="
              font-bold
              mb-4
              text-lg
            "
          >
            Quick Links
          </h3>

          <div
            className="
              flex
              flex-col
              gap-3
              text-gray-600
              dark:text-gray-400
            "
          >
            <a href="/">Home</a>
            <a href="/">Products</a>
            <a href="/cart">Cart</a>
            <a href="/login">Login</a>
          </div>

        </div>

        {/* CATEGORIES */}
        <div>

          <h3
            className="
              font-bold
              mb-4
              text-lg
            "
          >
            Categories
          </h3>

          <div
            className="
              flex
              flex-col
              gap-3
              text-gray-600
              dark:text-gray-400
            "
          >
            <p>Electronics</p>
            <p>Mobiles</p>
            <p>Laptops</p>
            <p>Fashion</p>
          </div>

        </div>

        {/* SOCIAL */}
        <div>

          <h3
            className="
              font-bold
              mb-4
              text-lg
            "
          >
            Connect
          </h3>

          <div
            className="
              flex
              gap-4
            "
          >

            <button
              className="
                p-3
                rounded-full
                bg-white
                dark:bg-zinc-900
                shadow
                hover:scale-110
                transition
              "
            >
              <Heart />
            </button>

            <button
              className="
                p-3
                rounded-full
                bg-white
                dark:bg-zinc-900
                shadow
                hover:scale-110
                transition
              "
            >
              <Globe />
            </button>

            <button
              className="
                p-3
                rounded-full
                bg-white
                dark:bg-zinc-900
                shadow
                hover:scale-110
                transition
              "
            >
              <BadgeCheck />
            </button>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div
        className="
          border-t
          border-zinc-200
          dark:border-zinc-800
          py-6
          text-center
          text-sm
          text-gray-500
        "
      >
        © 2026 LuxeStore.
        All Rights Reserved.
      </div>

    </footer>
  );
}