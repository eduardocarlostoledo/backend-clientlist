import express from 'express';
import sequelize from './db/connection.js';
import subscribeRoutes from './routes/subscribe.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const ORIGINS = [
  'http://localhost:5173', // Vite
  'http://127.0.0.1:5173',
  'http://localhost:3000', // CRA
  'http://127.0.0.1:3000'  ,
  'http://localhost:3001', // CRA
  'http://127.0.0.1:3001'  ,
  "https://exclusivememberstore.netlify.app/"

];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (como Postman, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    // Normaliza la URL quitando la barra final y minúsculas
    const cleanOrigin = origin.replace(/\/$/, '').toLowerCase();
    if (
      ORIGINS.map(o => o.replace(/\/$/, '').toLowerCase()).includes(cleanOrigin)
    ) {
      return callback(null, true);
    }
    // Mostrar el origen rechazado en el error para debug
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: false // Cambia a true si necesitas enviar cookies/autenticación
}));
app.options('*', cors());

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