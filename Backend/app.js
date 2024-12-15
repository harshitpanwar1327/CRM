import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import recordRoutes from './routes/recordRoutes.js';
import importRoutes from './routes/importRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware configurations
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://www.thewithinkers.com' || 'http://localhost:5173', // Use env variable for CORS origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if connection fails
  }
};

// Initialize database connection
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the CRM Backend!');
});

// Routes
app.use('/records', recordRoutes);

//User Routes
app.use('/api', userRoutes);

// Middleware and Routes
app.use('/api', importRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));