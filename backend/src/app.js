require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // 👈 custom logger

// Routes
app.use('/api/leads', leadRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API Running...');
});

// Error Middleware (ALWAYS LAST)
app.use(errorHandler);

module.exports = app;