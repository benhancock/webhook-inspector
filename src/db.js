const { Pool } = require('pg');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);
const mongoConnection = mongoose.connection;

mongoConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoConnection.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = { pool, mongoConnection };
