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

    // db.collection('Todos').findOneAndUpdate({
    //   _id: new ObjectID('5bb9e8708015324ab630ca2b')
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false // set to return the updated one
    // }).then(result => console.log(result))

    db.collection('Users').findOneAndUpdate({
      _id: 12345
    }, {
      $set: { name: 'Autsada' },
      $inc: { age: 1 }
    }, { returnOriginal: false }).then(result => console.log(result))
    
    //client.close();
  }
);
