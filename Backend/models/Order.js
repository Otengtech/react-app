import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  amount: Number,
  status: { type: String, default: 'pending' },
  reference: String,
});

export default mongoose.model('Order', orderSchema);
