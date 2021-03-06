require('./config/config');

const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // use middleware from third party library

app.post('/todos', authenticate, (req, res) => {
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id }).then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(
    todo => {
      if (!todo) {
        return res.sendStatus(404).send();
      }
      res.send({ todo });
    },
    e => {
      res.status(400).send();
    }
  );
});

app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      _creator: req.user._id
    });

    if (!todo) {
      return res.sendStatus(404).send();
    }
    res.send({ todo });
  } catch (error) {
    res.sendStatus(400).send();
  }

  // let id = req.params.id;

  // if (!ObjectID.isValid(id)) {
  //   return res.sendStatus(404).send();
  // }

  // Todo.findOneAndDelete({
  //   _id: id,
  //   _creator: req.user._id
  // })
  //   .then(todo => {
  //     if (!todo) {
  //       return res.sendStatus(404).send();
  //     }
  //     res.send({ todo });
  //   })
  //   .catch(error => res.sendStatus(400).send());
});

app.patch('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']); // Pick 'text' and 'completed' properties from todo object and only allow user to update these two.

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); // getTime() return timestamp (base time is midnight 1 Jan 1970) -> millisecond + or -
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.sendStatus(404).send();
      }

      res.send({ todo });
    })
    .catch(error => res.sendStatus(400).send());
});

// POST /users --> sign up
app.post('/users', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.sendStatus(400).send(error);
  }

  // let body = _.pick(req.body, ['email', 'password']);
  // let user = new User(body);

  // user
  //   .save()
  //   .then(() => {
  //     return user.generateAuthToken();
  //   })
  //   .then(token => {
  //     res.header('x-auth', token).send(user);
  //   })
  //   .catch(error => res.sendStatus(400).send(error));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login --> Login
app.post('/users/login', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (error) {
    res.sendStatus(400).send();
  }

  // let body = _.pick(req.body, ['email', 'password']);

  // User.findByCredentials(body.email, body.password)
  //   .then(user => {
  //     return user.generateAuthToken().then(token => {
  //       res.header('x-auth', token).send(user);
  //     });
  //   })
  //   .catch(error => {
  //     res.sendStatus(400).send();
  //   });
});

// Logging out
app.delete('/users/me/token', authenticate, async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.sendStatus(200).send();
  } catch (error) {
    res.sendStatus(400).send();
  }

  // req.user
  //   .removeToken(req.token)
  //   .then(() => {
  //     res.sendStatus(200).send();
  //   })
  //   .catch(error => {
  //     res.sendStatus(400).send();
  //   });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
