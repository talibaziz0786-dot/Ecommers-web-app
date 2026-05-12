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
  ImagePlus,
} from "lucide-react";

export default function Admin() {

  // =========================
  // STATES
  // =========================

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
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [products, setProducts] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  // =========================
  // INPUT HANDLER
  // =========================

  const changeHandler = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // FETCH PRODUCTS
  // =========================

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

  // =========================
  // IMAGE UPLOAD
  // =========================

  const imageHandler =
    async (e) => {

      const files =
        Array.from(
          e.target.files
        );

      if (
        files.length === 0
      )
        return;

      // PREVIEW
      const previewImages =
        files.map((file) =>
          URL.createObjectURL(
            file
          )
        );

      setPreview(
        previewImages
      );

      const data =
        new FormData();

      files.forEach((file) => {
        data.append(
          "images",
          file
        );
      });

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
  images: res.data.images,
});

setPreview(res.data.images);

        alert(
          "Images Uploaded ✅"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Upload Failed ❌"
        );

      } finally {

        setLoading(false);
      }
    };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      countInStock: "",
      images: [],
    });

    setPreview([]);

    setEditId(null);
  };

  // =========================
  // SUBMIT PRODUCT
  // =========================

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please Login First ❌"
          );

          return;
        }

        if (
          formData.images
            .length === 0
        ) {

          alert(
            "Upload Product Images ❌"
          );

          return;
        }

        // EDIT PRODUCT
        if (editId) {

          await axios.put(
            `${import.meta.env.VITE_API_URL}/products/${editId}`,
            formData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          alert(
            "Product Updated ✅"
          );

        } else {

          // CREATE PRODUCT
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
        }

        resetForm();

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Product Upload Failed ❌"
        );
      }
    };

  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteHandler =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Product?"
        );

      if (
        !confirmDelete
      )
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
          error.response?.data
            ?.message ||
            "Delete Failed ❌"
        );
      }
    };

  // =========================
  // EDIT PRODUCT
  // =========================

  const editHandler = (p) => {

    setEditId(p._id);

    setFormData({
      name: p.name,
      price: p.price,
      category:
        p.category,
      description:
        p.description,
      countInStock:
        p.countInStock,
      images: p.images,
    });

    setPreview(p.images);
  };

  // =========================
  // JSX
  // =========================

  return (

    <div
      className="
        min-h-screen
        bg-zinc-100
        dark:bg-black
        text-black
        dark:text-white
        px-5
        py-10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            gap-4
            mb-10
          "
        >

          <PackagePlus
            size={45}
          />

          <div>

            <h1
              className="
                text-5xl
                font-black
              "
            >
              Admin Dashboard
            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >
              Manage Products
            </p>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mb-10
          "
        >

          {/* TOTAL */}

          <div
            className="
              bg-white
              dark:bg-zinc-900
              p-6
              rounded-3xl
              shadow-xl
            "
          >

            <Boxes
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
                products.length
              }
            </h2>

            <p
              className="
                text-gray-500
              "
            >
              Total Products
            </p>

          </div>

          {/* LOW STOCK */}

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

            <p
              className="
                text-gray-500
              "
            >
              Low Stock
            </p>

          </div>

          {/* ADMIN */}

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

            <p
              className="
                text-gray-500
              "
            >
              Product Manager
            </p>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            submitHandler
          }
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

          <div
            className="
              space-y-5
            "
          >

            <input
              type="text"
              name="name"
              value={
                formData.name
              }
              placeholder="Product Name"
              onChange={
                changeHandler
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                bg-transparent
              "
              required
            />

            <input
              type="number"
              name="price"
              value={
                formData.price
              }
              placeholder="Price"
              onChange={
                changeHandler
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                bg-transparent
              "
              required
            />

            <select
  name="category"
  value={formData.category}
  onChange={changeHandler}
  className="
    w-full
    p-4
    rounded-2xl
    border
    bg-transparent
  "
  required
>

  <option value="">
    Select Category
  </option>

  <option value="Clothes">
    Clothes
  </option>

  <option value="Electronics">
    Electronics
  </option>

  <option value="Laptop">
    Laptop
  </option>

  <option value="Mobile">
    Mobile
  </option>

  <option value="Shoes">
    Shoes
  </option>

  <option value="Watch">
    Watch
  </option>

   <option value="Accessories">
    Accessories
  </option>

</select>

            <input
              type="number"
              name="countInStock"
              value={
                formData.countInStock
              }
              placeholder="Stock"
              onChange={
                changeHandler
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                bg-transparent
              "
              required
            />

            <textarea
              rows="6"
              name="description"
              value={
                formData.description
              }
              placeholder="Description"
              onChange={
                changeHandler
              }
              className="
                w-full
                p-4
                rounded-2xl
                border
                bg-transparent
              "
              required
            />

          </div>

          {/* RIGHT */}

          <div>

            {/* IMAGE BOX */}

            <label
              className="
                border-2
                border-dashed
                rounded-3xl
                min-h-80
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                overflow-hidden
                p-5
              "
            >

              {preview.length >
              0 ? (

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    w-full
                  "
                >

                  {preview.map(
                    (
                      img,
                      index
                    ) => (

                      <img
                        key={
                          index
                        }
                        src={img}
                        alt=""
                        className="
                          h-36
                          w-full
                          object-cover
                          rounded-2xl
                        "
                      />

                    )
                  )}

                </div>

              ) : (

                <>

                  <ImagePlus
                    size={55}
                  />

                  <p
                    className="
                      mt-4
                      text-lg
                    "
                  >
                    Upload Product Images
                  </p>

                </>

              )}

              <input
                type="file"
                multiple
                hidden
                onChange={
                  imageHandler
                }
              />

            </label>

            {/* LOADING */}

            {loading && (

              <p
                className="
                  mt-4
                  text-center
                  font-bold
                "
              >
                Uploading...
              </p>

            )}

            {/* BUTTON */}

            <button
              type="submit"
              className="
                w-full
                mt-6
                bg-black
                dark:bg-white
                dark:text-black
                text-white
                py-4
                rounded-2xl
                font-bold
                text-lg
                hover:scale-105
                transition
              "
            >

              {editId
                ? "Update Product"
                : "Add Product"}

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

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr
                className="
                  border-b
                  border-zinc-300
                  dark:border-zinc-700
                "
              >

                <th className="py-4 text-left">
                  Image
                </th>

                <th className="py-4 text-left">
                  Name
                </th>

                <th className="py-4 text-left">
                  Price
                </th>

                <th className="py-4 text-left">
                  Stock
                </th>

                <th className="py-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map(
                (p) => (

                  <tr
                    key={p._id}
                    className="
                      border-b
                      border-zinc-200
                      dark:border-zinc-800
                    "
                  >

                    <td className="py-4">

                      <img
                        src={
                          p.images?.[0]
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
                        {
                          p.countInStock
                        }
                      </span>

                    </td>

                    <td>

                      <div
                        className="
                          flex
                          gap-3
                        "
                      >

                        <button
                          onClick={() =>
                            editHandler(
                              p
                            )
                          }
                          type="button"
                          className="
                            p-3
                            rounded-xl
                            bg-zinc-200
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
                          type="button"
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

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}