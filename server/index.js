const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});
app.post('/enroll', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  const { name, age, batch } = req.body;
  const user = await User.create({ name, age, batch });
  res.json(user);
});
app.get('/CompletePayment', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.json({
    message: 'Payment Successful',
  });
});
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.listen(4000, () => {
  console.log('app is running on port 4000');
});
