const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Routes
app.use('/api/attractions', require('./routes/attractionRoutes'));
app.use('/api/visitors', require('./routes/visitorRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
