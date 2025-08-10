
import express from 'express';
import { isAuthticated } from '../middleware/Authtication.js';
import { stripeCheckoutSession, stripeWebhook } from '../controllers/paymentController.js';
const paymentRouter = express.Router();


paymentRouter.post("/payment/checkout_session", isAuthticated, stripeCheckoutSession);
paymentRouter.post("/payment/webhook", stripeWebhook);

// Export paymentRouter
export default paymentRouter;
