require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');

const petRouter = require('./Routes/PetRoute');
const AdoptFormRoute = require('./Routes/AdoptFormRoute');
const AdminRoute = require('./Routes/AdminRoute');

// Sequelize connection
const sequelize = new Sequelize('pawfinds', 'root', 'yourpassword', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Import Sequelize models
const User = require('./models-mysql/User');
const Pet = require('./models-mysql/Pet');
const AdoptionRequest = require('./models-mysql/AdoptionRequest');
const Admin = require('./models-mysql/Admin');

// Sync models with database
sequelize.sync()
  .then(() => {
    console.log('Database synced with Sequelize models');
  })
  .catch((err) => {
    console.error('Error syncing models:', err);
  });

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use(petRouter);
app.use('/form', AdoptFormRoute);
app.use('/admin', AdminRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});