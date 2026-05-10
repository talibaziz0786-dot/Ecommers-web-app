import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// GENERATE TOKEN
const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};


// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        adminSecret,
      } = req.body;

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      let role = "user";

      // ADMIN ONLY
      if (
        adminSecret ===
        process.env.ADMIN_SECRET
      ) {
        role = "admin";
      }

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Register Failed",
      });
    }
  }
);

// LOGIN
router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "Invalid Email",
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res
          .status(400)
          .json({
            message:
              "Invalid Password",
          });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token:
          generateToken(user),
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Login Failed",
      });
    }
  }
);

export default router;