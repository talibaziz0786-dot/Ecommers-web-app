import jwt from "jsonwebtoken";

export const protect =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {

        return res
          .status(401)
          .json({
            message:
              "Not Authorized",
          });
      }

      const token =
        authHeader.split(
          " "
        )[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user = decoded;

      next();

    } catch (error) {

      return res
        .status(401)
        .json({
          message:
            "Invalid Token",
        });
    }
  };

export const admin =
  (req, res, next) => {

    if (
      req.user &&
      req.user.role ===
        "admin"
    ) {

      next();

    } else {

      return res
        .status(401)
        .json({
          message:
            "Admin Only",
        });
    }
  };