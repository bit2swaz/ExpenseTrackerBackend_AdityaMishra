const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const reportRoutes = require('./routes/reportRoutes');

// load env vars
dotenv.config();

// connect to db
connectDB();

const app = express();

// middleware
app.use(express.json()); // body parser
app.use(cors()); // enable cors
app.use(helmet()); // set security headers
app.use(morgan('dev')); // logger
app.use('/api', authRoutes); // creates /api/login, /api/register
app.use('/api/expenses', expenseRoutes);
app.use('/api/reports', reportRoutes);

// basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// err handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});