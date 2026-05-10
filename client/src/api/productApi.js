import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// GET PRODUCTS
export const fetchProducts = async () => {

  const { data } =
    await API.get("/products");

  return data;
};


// GET SINGLE PRODUCT
export const fetchSingleProduct =
  async (id) => {

    const { data } =
      await API.get(`/products/${id}`);

    return data;
};

export default API;