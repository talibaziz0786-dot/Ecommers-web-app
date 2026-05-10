import {
  ShoppingBag,
  IndianRupee,
  Users,
  Package,
} from "lucide-react";

export default function Dashboard() {

  const stats = [
    {
      title: "Total Sales",
      value: "₹45,000",
      icon: IndianRupee,
    },

    {
      title: "Orders",
      value: "120",
      icon: ShoppingBag,
    },

    {
      title: "Products",
      value: "35",
      icon: Package,
    },

    {
      title: "Users",
      value: "15",
      icon: Users,
    },
  ];

  return (
    <div
      className="
        pt-32
        min-h-screen
        bg-white
        dark:bg-zinc-950
        text-black
        dark:text-white
        px-6
      "
    >
      <div className="max-w-7xl mx-auto">

        <h1
          className="
            text-5xl
            font-black
            mb-10
          "
        >
          Admin Dashboard
        </h1>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {stats.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  dark:bg-zinc-900
                  border
                  border-zinc-200
                  dark:border-zinc-800
                  rounded-[30px]
                  p-6
                  shadow-lg
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <h2
                    className="
                      text-lg
                      text-gray-500
                    "
                  >
                    {item.title}
                  </h2>

                  <Icon size={28} />
                </div>

                <h3
                  className="
                    text-4xl
                    font-black
                    mt-6
                  "
                >
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}