const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tell mongoose to use built-in promise library

//connect mongoose to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://autsada:ann1ong2@ds163162.mlab.com:63162/node-todo-api'
// };

// mongoose
//   .connect(
//     db.localhost,
//     { useMongoClient: true }
//   )
//   .then(
//     () => {},
//     err => {
//       mongoose.connect(
//         db.mlab,
//         { useMongoClient: true }
//       );
//     }
//   );

// mongoose
//   .connect(
//     process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',
//     { useMongoClient: true }
//   )
//   .then(() => {});

module.exports = { mongoose };
