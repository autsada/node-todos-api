const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tell mongoose to use built-in promise library

// connect mongoose to database 
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = { mongoose };