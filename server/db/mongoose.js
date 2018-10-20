const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tell mongoose to use built-in promise library

let db = {
    localhost: 'mongodb://localhost:27017/TodoApp',
    mlab: 'mongodb://autsada:ann@1ong@2@ds163162.mlab.com:63162/node-todo-api'
}

// connect mongoose to database 
mongoose.connect(process.env.PORT ? db.mlab : db.localhost, { useNewUrlParser: true });

module.exports = { mongoose };