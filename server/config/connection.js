const mongoose = require('mongoose');

// Mongoose connection function
async function mongooseConnection(url) {
  try {
    await mongoose.connect(url, {
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
