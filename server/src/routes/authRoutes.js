import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();


// REGISTER
router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
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

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
        });

      res.json({
        _id: user._id,
        email: user.email,
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

      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          "secret123",
          {
            expiresIn: "30d",
          }
        );

      res.json({
        token,
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