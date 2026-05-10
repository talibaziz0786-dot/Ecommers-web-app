// import mongoose from "mongoose";

// const reviewSchema =
//   new mongoose.Schema(
//     {
//       user: {
//         type:
//           mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },

//       name: String,

//       rating: Number,

//       comment: String,
//     },
//     {
//       timestamps: true,
//     }
//   );

// const userSchema =
//   new mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: true,
//       },

//       email: {
//         type: String,
//         required: true,
//         unique: true,
//       },

//       password: {
//         type: String,
//         required: true,
//       },

//       role: {
//         type: String,
//         default: "user",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// const User =
//   mongoose.models.User ||
//   mongoose.model(
//     "User",
//     userSchema
//   );

// export default User;