import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises"; // using Promise-based fs for cleaner async/await
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, price, type, gender, size } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imagePath = path.join(__dirname, imageFile.path);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        image: base64Image,
        name: imageFile.originalname,
      }
    );

    await fs.unlink(imagePath); // delete uploaded file from server

    if (response.data.success) {
      const imageUrl = response.data.data.url;

      return res.status(200).json({
        success: true,
        message: "Image uploaded",
        imageUrl,
        product: { name, price, type, gender, size },
      });
    } else {
      throw new Error("ImgBB upload failed");
    }
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});