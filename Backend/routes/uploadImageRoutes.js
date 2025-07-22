import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadImageController.js';

const upload = multer();
const router = express.Router();
router.post('/upload', upload.single('image'), uploadImage);
export default router;
