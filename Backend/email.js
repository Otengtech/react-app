import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import axios from 'axios';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import FormData from 'form-data';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Middleware ----------
app.use(helmet());

app.use(cors({
  origin: ['https://react-app-7wev.onrender.com/'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ---------- MongoDB ----------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ---------- Order Schema ----------
const Order = mongoose.model('Order', new mongoose.Schema({
  fullName: String,
  email: String,
  amount: Number,
  status: { type: String, default: 'pending' },
  reference: String,
}));

// ---------- Routes ----------

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('✅ Backend server is running!');
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
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send email" });
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
      text: `A new user has subscribed: ${email}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ message: "Subscription failed" });
  }
});

// ✅ Paystack Payment Initialization
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
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save initial order to DB
    await new Order({
      fullName,
      email,
      amount: totalAmount,
      reference: response.data.data.reference,
    }).save();

    res.status(200).json({
      authorization_url: response.data.data.authorization_url,
    });
  } catch (error) {
    console.error("Payment Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ✅ Paystack Webhook
app.post('/api/webhook', async (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const { reference } = event.data;
    await Order.findOneAndUpdate({ reference }, { status: 'success' });
  }

  res.sendStatus(200);
});

// ✅ ImgBB Upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("image", req.file.buffer.toString("base64"));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );

    const imageUrl = response.data.data.url;
    res.json({ imageUrl });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unexpected Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
