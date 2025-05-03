require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// Check for required environment variables
const requiredEnvVars = ['DB', 'JWTPRIVATEKEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('ERROR: Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`- ${envVar}`));
  console.error('Please check your .env file');
  process.exit(1);
}

// Print the node environment
console.log(`Node environment: ${process.env.NODE_ENV || 'development'}`);

// Connection call - using async/await
(async () => {
  try {
    await connection();
  } catch (error) {
    console.error('Failed to connect to database:', error);
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'OK', timestamp: new Date().toISOString() });
});

// Log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send({ message: 'Internal Server Error', error: err.message });
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));