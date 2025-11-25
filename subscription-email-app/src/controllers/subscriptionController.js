const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const subscribe = (subscriptionModel, emailService) => async (req, res) => {
    console.log('Received subscription request:', req.body);
    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingSubscription = await subscriptionModel.findByEmail(email);
        if (existingSubscription) {
            return res.status(409).json({ message: 'Email already subscribed' });
        }

        const newSubscription = await subscriptionModel.create(email);
        emailService.sendConfirmationEmail(email).catch(err => console.error('Email error:', err));

        return res.status(201).json({ message: 'Subscription successful', subscription: newSubscription });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const sendEmailsToSubscribers = (subscriptionModel, emailService) => async (req, res) => {
    try {
        const subscribers = await subscriptionModel.findAll();
        
        (async () => {
            for (const subscriber of subscribers) {
                await emailService.sendOfferEmail(subscriber.email);
                await delay(3000);
            }
        })();

        return res.status(200).json({ message: 'Campaign started', totalSubscribers: subscribers.length });
    } catch (error) {
        return res.status(500).json({ message: 'Error starting campaign', error: error.message });
    }
};

export { subscribe, sendEmailsToSubscribers };