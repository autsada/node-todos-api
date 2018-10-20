const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tell mongoose to use built-in promise library

// connect mongoose to database
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',
    { useMongoClient: true }
  )
  .then(() => {});
module.exports = { mongoose };
