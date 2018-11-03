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

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
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

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(
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

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(404).send();
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        return res.sendStatus(404).send();
      }
      res.send({ todo });
    })
    .catch(error => res.sendStatus(400).send());
});

app.patch('/todos/:id', (req, res) => {
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

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.sendStatus(404).send();
      }

      res.send({ todo });
    })
    .catch(error => res.sendStatus(400).send());
});

// POST /users --> sign up 
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(error => res.sendStatus(400).send(error));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login --> Login
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user)
      })
    }).catch (error => {
      res.sendStatus(400).send()
    })
})

// Logging out
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.sendStatus(200).send()
  }).catch (error => {
    res.sendStatus(400).send()
  })
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
