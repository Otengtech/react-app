// backend.js or email.js
import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import axios from 'axios';
import fs from "fs/promises"; // using Promise-based fs for cleaner async/await
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = 5000;

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Middlewares
app.use(cors({
  origin: `${backendUrl}`,
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// MongoDB Schema
const Order = mongoose.model('Order', new mongoose.Schema({
  fullName: String,
  email: String,
  amount: Number,
  status: String,
  reference: String,
}));

// ✅ Paystack Payment Endpoint
app.post("/api/pay", async (req, res) => {
  try {
    const { fullName, email, totalAmount } = req.body;

    if (!fullName || !email || !totalAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await axios.post(
  "https://api.paystack.co/transaction/initialize",
  {
    email,
    amount: totalAmount * 100,
    metadata: { fullName },
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_PUBLIC_KEY}`,
      "Content-Type": "application/json",
    },
  }
);

    res.status(200).json({
      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Payment Initialization Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ✅ Paystack Webhook (optional)
app.post('/api/webhook', async (req, res) => {
  const event = req.body;
  if (event.event === 'charge.success') {
    const { reference } = event.data;
    await Order.findOneAndUpdate({ reference }, { status: 'success' });
  }
  res.sendStatus(200);
});

// ✅ Contact Form
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "otengebenezer326@gmail.com",
      subject: `Message from ${name}`,
      text: `Email: ${email}\n\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    console.log("Error sending email", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// ✅ Newsletter Subscription
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: "otengebenezer326@gmail.com",
      subject: "New Newsletter Subscriber",
      text: `A new user has subscribed to your newsletter: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.log("Newsletter subscription error:", error);
    res.status(500).json({ message: "Subscription failed." });
  }
});

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image", req.file.buffer.toString("base64"));

    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, formData, {
      headers: formData.getHeaders(),
    });

    const imageUrl = response.data.data.url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
