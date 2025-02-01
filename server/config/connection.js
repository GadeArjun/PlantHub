const mongoose = require('mongoose');
require('dotenv').config();

// Mongoose connection function
async function mongooseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/plants', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if there's an error
  }
}

module.exports = mongooseConnection;
