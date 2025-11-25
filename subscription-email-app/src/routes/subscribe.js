import express from 'express';
import { subscribe, sendEmailsToSubscribers } from '../controllers/subscriptionController.js';
import { findByEmail, create, findAll, Subscriber } from '../models/Subscription.js';
import { sendConfirmationEmail, sendOfferEmail } from '../services/emailService.js';

const router = express.Router();

const subscriptionModel = {
    create: (email) => create(email),
    findByEmail: (email) => findByEmail(email),
    findAll: () => findAll()
};

const emailService = {
    sendConfirmationEmail,
    sendOfferEmail
};

router.post('/subscribe', subscribe(subscriptionModel, emailService));
router.post('/send-campaign', sendEmailsToSubscribers(subscriptionModel, emailService));

export default router;