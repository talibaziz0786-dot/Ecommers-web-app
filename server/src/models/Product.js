import mongoose from "mongoose";

const reviewSchema =
  mongoose.Schema(
    {
      user: {
        type: String,
      },

      rating: {
        type: Number,
        required: true,
      },

      comment: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const productSchema =
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      brand: {
        type: String,
      },

      category: {
        type: String,
      },

      description: {
        type: String,
      },

      price: {
        type: Number,
        required: true,
      },

      countInStock: {
        type: Number,
        default: 0,
      },

      rating: {
        type: Number,
        default: 0,
      },

      numReviews: {
        type: Number,
        default: 0,
      },

      reviews: [reviewSchema],
    },
    {
      timestamps: true,
    }
  );

const Product =
  mongoose.model(
    "Product",
    productSchema
  );

export default Product;