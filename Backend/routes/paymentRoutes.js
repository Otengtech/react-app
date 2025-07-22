import express from 'express';
import { initializePayment, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();
router.post('/pay', initializePayment);
router.post('/webhook', handleWebhook);
export default router;
