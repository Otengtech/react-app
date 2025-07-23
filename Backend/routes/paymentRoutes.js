import express from 'express';
import { initializePayment, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// ✅ Remove "/pay" — it's already in app.use('/api/pay')
router.post('/', initializePayment);
router.post('/webhook', handleWebhook);

export default router;