import express from 'express';
import sequelize from './db/connection.js';
import subscribeRoutes from './routes/subscribe.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', subscribeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Sync database and start server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('✓ Database authenticated');
        
        await sequelize.sync({ alter: true });
        console.log('✓ Database synced');
        
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('✗ Server error:', error.message);
        process.exit(1);
    }
};

startServer();