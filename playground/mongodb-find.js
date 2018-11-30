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

    // No argument in find method, so it returns all data
    // db.collection('Todos').find().toArray()
    //     .then(docs => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, err => {
    //         console.log('Unable to fetch todos', err);
    //     })

    // Pass argument in find method to query data
    // db.collection('Todos').find({
    //     _id: new ObjectID('5bb982e083248f6a5cbc6a28')
    // }).toArray()
    //     .then(docs => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, err => {
    //         console.log('Unable to fetch todos', err);
    //     })

    // db.collection('Todos').find().count()
    //     .then(count => {
    //         console.log(`Todos count: ${count}`);
    //     }, err => {
    //         console.log('Unable to fetch todos', err);
    //     });

    //Pass argument in find method to query data
    db.collection('Users').find({
        name: 'Autsada'
    }).toArray()
        .then(docs => {
            console.log('Users');
            console.log(JSON.stringify(docs, undefined, 2));
        }, err => {
            console.log('Unable to fetch todos', err);
        });

    // const getUsers = async () => {
    //   try {
    //     const result = await db.collection('Users').find({ name: 'Autsada' }).toArray();
    //     console.log('Todos');
    //     console.log(JSON.stringify(result, undefined, 2));
    //   } catch (err) {
    //     console.log('Unable to fetch todos', err);
    //   }
    // };
    //getUsers();

    //client.close();
  }
);
