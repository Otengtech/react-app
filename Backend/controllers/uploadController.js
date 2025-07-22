import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadProductImage = async (req, res) => {
  try {
    const { name, price, type, gender, size } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imagePath = path.join(__dirname, '../uploads', imageFile.filename);
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        image: base64Image,
        name: imageFile.originalname,
      }
    );

    await fs.unlink(imagePath); // delete temp file

    if (response.data.success) {
      const imageUrl = response.data.data.url;
      return res.status(200).json({
        success: true,
        message: 'Image uploaded',
        imageUrl,
        product: { name, price, type, gender, size },
      });
    } else {
      throw new Error('ImgBB upload failed');
    }
  } catch (error) {
    console.error(error.message || error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
