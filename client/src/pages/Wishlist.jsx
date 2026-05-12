import ProductCard from "../components/ProductCard";

export default function Wishlist({
  wishlist,
  cart,
  setCart,
}) {

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
          Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (

          <h2>No Wishlist Items</h2>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
            "
          >
            {wishlist.map(
              (product) => (
                <ProductCard
  key={product._id}
  product={product}
  cart={cart}
  setCart={setCart}
  wishlist={wishlist}
/>
              )
            )}
          </div>

        )}

      </div>
    </div>
  );
}