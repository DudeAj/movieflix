const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const AppError = require('./utils/AppError');
const UserRoutes = require('./routes/user');
const WatchlistRoutes = require('./routes/watchlist');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.use('/api/watch', WatchlistRoutes);
app.use('/api/user', UserRoutes);

mongoose.connect(process.env.MONGO_URL, (err, res) => {
  if (err) throw err;
  console.log('connected to server');
});

app.get('/', (req, res) => {
  res.send('how are you doing today');
});

app.all('*', (req, res, next) => {
  const err = new AppError(`Requested URL ${req.path} not found!`, 404);
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.json({
    statusCode: statusCode,
    success: 0,
    message: err.message,
  });
});

app.listen(PORT, () => {});
