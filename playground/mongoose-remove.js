const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

//Todo.deleteMany({}).then(result => console.log(result)); // -> Delete all
//Todo.deleteOne({}).then(result => console.log(result)); //-> Delete first item

//Todo.findByIdAndDelete('5bcbe81eb844e7ea6fa4ee69').then(todo => console.log(todo));
Todo.findOneAndDelete({ _id: '5bcbe927b844e7ea6fa4ef1b' }).then(todo => console.log(todo));