const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
      // "return" use to prevent success case run if there is an err -> if no return statement the success case will run even if there is an error.
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({ text: 'Something to do' })
    //     .then(result => {
    //         console.log(result);
    //     })

    // deleteOne
    // db.collection('Todos').deleteOne({ text: 'Walk the dog' })
    //     .then(result => console.log(result))

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false })
    //     .then(result => console.log(result))

    //db.collection('Users').deleteMany({ name: 'Autsada' })

    db.collection('Users').findOneAndDelete({ _id: new ObjectID('5bb99a4866bfa0428cdc1582') })

    //client.close();
  }
);
