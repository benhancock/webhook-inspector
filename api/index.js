const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { Pool } = require('pg');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection with Mongoose
mongoose.connect(process.env.MONGO_URI);
const mongoConnection = mongoose.connection;
mongoConnection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);
mongoConnection.once('open', () => {
  console.log('Connected to MongoDB database');
});

// PostgreSQL connection with pg
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
});

pool
  .connect()
  .then(() => console.log('Connected to PostgreSQL database\n'))
  .catch((err) => console.error('Error connecting to PostgreSQL:', err));

// Routes
const eventRoutes = require('./src/eventRoutes');
app.use('/', eventRoutes);

const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Listening on port ${port}`));

// module.exports = pool; also handling for going to the front page requestbin/userurl/endpoint
