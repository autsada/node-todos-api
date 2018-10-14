const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // tell mongoose to use built-in promise library

// connect mongoose to database 
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

// // create model of the database - Todo
// let Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number, // Timestamp
//         default: null
//     }
// });

// // Create new todo list
// let newTodo = new Todo({
//     text: '   Eat lunch with friends     '
// });

// newTodo.save().then(doc => {
//     console.log('Saved todo', doc);
// }, e => {
//     console.log('Unable to save todo', e)
// });

// create model of the database - user
let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// create new user
let newUser = new User({
    email: 'autsada'
});

newUser.save().then(user => console.log('User saved', user),
    e => console.log('Unable to save user', e)
);