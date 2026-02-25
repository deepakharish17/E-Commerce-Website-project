const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

dotenv.config();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const products = require('./routes/product');
const orders = require('./routes/order');

app.use('/api/v1/', products);
app.use('/api/v1/', orders);

// Production Setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

// PORT Fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});