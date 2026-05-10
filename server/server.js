import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./src/routes/productRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/auth",
  authRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});


// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB Connected ✅"
    );

    app.listen(5000, () => {
      console.log(
        "Server Running 🚀"
      );
    });

  })
  .catch((error) => {
    console.log(error);
  });