// connecting the backend with the db
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/calenderReminderAppDB');
    console.log('MongoDB Connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();

module.exports = mongoose.connection;