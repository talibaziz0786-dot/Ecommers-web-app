import express from "express";
import multer from "multer";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.array("images", 5),

  async (req, res) => {

    try {

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          message: "No files uploaded",
        });
      }

      const uploadedImages = [];

      for (const file of req.files) {

        const base64 =
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        const result =
          await cloudinary.uploader.upload(
            base64,
            {
              folder: "ecommerce",
            }
          );

        uploadedImages.push(
          result.secure_url
        );
      }

      res.json({
        images: uploadedImages,
      });

    } catch (error) {

      console.log("UPLOAD ERROR:");
      console.log(error);
      console.log(process.env.CLOUD_NAME);
console.log(process.env.CLOUDINARY_CLOUD_NAME);

      res.status(500).json({
        message: "Upload Failed",
        error: error.message,
      });
    }
  }
);

export default router;