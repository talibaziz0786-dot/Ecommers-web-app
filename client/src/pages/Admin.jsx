import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import {
  Upload,
  PackagePlus,
  Trash2,
  Pencil,
  Boxes,
  AlertTriangle,
} from "lucide-react";

export default function Admin() {

  const [formData, setFormData] =
    useState({
      name: "",
      price: "",
      category: "",
      description: "",
      countInStock: "",
      images: [],
    });

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS
  const fetchProducts =
    async () => {

      try {

        const { data } =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/products`
          );

        setProducts(data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchProducts();

  }, []);

  // INPUT HANDLER
  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // IMAGE UPLOAD
  const imageHandler =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const data =
        new FormData();

      data.append(
        "images",
        file
      );

      setPreview(
        URL.createObjectURL(file)
      );

      try {

        setLoading(true);

        const res =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/upload`,

            data,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setFormData({
          ...formData,
          images:
            res.data.images,
        });

        alert(
          "Image Uploaded ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  // ADD PRODUCT
  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(

          `${import.meta.env.VITE_API_URL}/products`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Product Added ✅"
        );

        setFormData({
          name: "",
          price: "",
          category: "",
          description: "",
          countInStock: "",
          images: [],
        });

        setPreview("");

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Product Upload Failed ❌"
        );
      }
    };

  // DELETE PRODUCT
  const deleteHandler =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Product?"
        );

      if (!confirmDelete)
        return;

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(

          `${import.meta.env.VITE_API_URL}/products/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchProducts();

        alert(
          "Product Deleted ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed ❌"
        );
      }
    };

  return (

    <div
      className="
        max-w-7xl
        mx-auto
        py-10
        px-5
      "
    >

      {/* TOP */}
      <div
        className="
          flex
          items-center
          gap-4
          mb-10
        "
      >

        <PackagePlus size={40} />

        <h1
          className="
            text-5xl
            font-black
          "
        >
          Product Manager
        </h1>

      </div>

      {/* ANALYTICS */}
      <div
        className="
          grid
          md:grid-cols-3
          gap-6
          mb-10
        "
      >

        <div
          className="
            bg-white
            dark:bg-zinc-900
            p-6
            rounded-3xl
            shadow-xl
          "
        >

          <Boxes size={35} />

          <h2
            className="
              text-4xl
              font-black
              mt-4
            "
          >
            {products.length}
          </h2>

          <p className="text-gray-500">
            Total Products
          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-zinc-900
            p-6
            rounded-3xl
            shadow-xl
          "
        >

          <AlertTriangle
            size={35}
          />

          <h2
            className="
              text-4xl
              font-black
              mt-4
            "
          >
            {
              products.filter(
                (p) =>
                  p.countInStock <
                  5
              ).length
            }
          </h2>

          <p className="text-gray-500">
            Low Stock
          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-zinc-900
            p-6
            rounded-3xl
            shadow-xl
          "
        >

          <PackagePlus
            size={35}
          />

          <h2
            className="
              text-4xl
              font-black
              mt-4
            "
          >
            Admin
          </h2>

          <p className="text-gray-500">
            Product Manager
          </p>

        </div>

      </div>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="
          grid
          md:grid-cols-2
          gap-8
          bg-white
          dark:bg-zinc-900
          p-8
          rounded-3xl
          shadow-2xl
        "
      >

        {/* LEFT */}
        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={changeHandler}
            className="
              w-full
              p-4
              rounded-2xl
              border
            "
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={changeHandler}
            className="
              w-full
              p-4
              rounded-2xl
              border
            "
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={changeHandler}
            className="
              w-full
              p-4
              rounded-2xl
              border
            "
          />

          <input
            type="number"
            name="countInStock"
            placeholder="Stock"
            value={
              formData.countInStock
            }
            onChange={changeHandler}
            className="
              w-full
              p-4
              rounded-2xl
              border
            "
          />

          <textarea
            rows="6"
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={changeHandler}
            className="
              w-full
              p-4
              rounded-2xl
              border
            "
          />

        </div>

        {/* RIGHT */}
        <div>

          <label
            className="
              border-2
              border-dashed
              rounded-3xl
              h-80
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              overflow-hidden
            "
          >

            {preview ? (

              <img
                src={preview}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            ) : (

              <>

                <Upload
                  size={50}
                />

                <p className="mt-4">
                  Drag & Drop Image
                </p>

              </>

            )}

            <input
              type="file"
              hidden
              onChange={
                imageHandler
              }
            />

          </label>

          {loading && (

            <p className="mt-3">
              Uploading...
            </p>

          )}

          <button
            className="
              w-full
              mt-6
              bg-black
              text-white
              py-4
              rounded-2xl
              font-bold
              text-lg
            "
          >
            Add Product
          </button>

        </div>

      </form>

      {/* PRODUCT TABLE */}
      <div
        className="
          mt-14
          bg-white
          dark:bg-zinc-900
          rounded-3xl
          p-6
          shadow-2xl
          overflow-x-auto
        "
      >

        <h2
          className="
            text-3xl
            font-black
            mb-6
          "
        >
          All Products
        </h2>

        <table className="w-full">

          <thead>

            <tr
              className="
                border-b
                border-zinc-200
                dark:border-zinc-800
              "
            >

              <th className="text-left py-4">
                Image
              </th>

              <th className="text-left py-4">
                Name
              </th>

              <th className="text-left py-4">
                Price
              </th>

              <th className="text-left py-4">
                Stock
              </th>

              <th className="text-left py-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((p) => (

              <tr
                key={p._id}
                className="
                  border-b
                  border-zinc-100
                  dark:border-zinc-800
                "
              >

                <td className="py-4">

                  <img
                    src={
                      p.images?.[0] ||
                      "https://via.placeholder.com/100"
                    }
                    alt=""
                    className="
                      h-16
                      w-16
                      object-cover
                      rounded-xl
                    "
                  />

                </td>

                <td>
                  {p.name}
                </td>

                <td>
                  ₹{p.price}
                </td>

                <td>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        p.countInStock <
                        5
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    `}
                  >
                    {p.countInStock}
                  </span>

                </td>

                <td>

                  <div className="flex gap-3">

                    <button
                      className="
                        p-3
                        rounded-xl
                        bg-zinc-100
                        dark:bg-zinc-800
                      "
                    >
                      <Pencil
                        size={18}
                      />
                    </button>

                    <button
                      onClick={() =>
                        deleteHandler(
                          p._id
                        )
                      }
                      className="
                        p-3
                        rounded-xl
                        bg-red-500
                        text-white
                      "
                    >
                      <Trash2
                        size={18}
                      />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}