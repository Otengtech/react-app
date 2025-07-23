import axios from 'axios';
import Order from '../models/Order.js';

export const initializePayment = async (req, res) => {
  try {
    const { fullName, email, totalAmount } = req.body;
    if (!fullName || !email || !totalAmount) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: totalAmount * 100,
        metadata: { fullName },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    await new Order({
      fullName,
      email,
      amount: totalAmount,
      reference: response.data.data.reference
    }).save();

    res.status(200).json({
      data: {
        authorization_url: response.data.data.authorization_url
      }
    });
  } catch (err) {
    console.error('Payment Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
};

export const handleWebhook = async (req, res) => {
  const event = req.body;

  if (event.event === 'charge.success') {
    const { reference } = event.data;
    await Order.findOneAndUpdate({ reference }, { status: 'success' });
  }

  res.sendStatus(200);
};
