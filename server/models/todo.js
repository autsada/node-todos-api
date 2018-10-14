const mongoose = require('mongoose');

// create model of the database - Todo
let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number, // Timestamp
        default: null
    }
});

module.exports = { Todo };