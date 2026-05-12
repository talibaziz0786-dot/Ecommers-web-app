import mongoose from "mongoose";

const reviewSchema =
  mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      name: {
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

      // MULTIPLE IMAGES
      images: [
        {
          type: String,
        },
      ],

      brand: {
        type: String,
        default: "LuxeStore",
      },

      category: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
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

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
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