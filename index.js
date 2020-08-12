const express = require('express');
const db = require('./database');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.json({ message: 'Helloworld' });
});

server.get('/api/users', (req, res) => {
  const users = db.getUsers();

  res.json(users);
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'user not found' });
  }
});

server.post('/api/users', (req, res) => {
  if (
    req.body.name == undefined ||
    req.body.bio == undefined ||
    req.body.name == '' ||
    req.body.bio == ''
  ) {
    res.status(400).json({
      message: 'Please provide a name and bio for the user',
    });
  } else {
    const newUser = db.createUser({
      name: req.body.name,
      bio: req.body.bio,
    });

    res.status(201).json(newUser);
  }
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  try {
    // throw new Error('Example Error');
    if (user) {
      db.deleteUser(id);
      res.status(204).end();
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The user could not be removed',
    });
  }
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    const updUser = db.updateUser(id, {
      name: req.body.name,
      bio: req.body.bio,
    });
    res.status(200).json(updUser);
  } else if (
    req.body.name == undefined ||
    req.body.bio == undefined ||
    req.body.name == '' ||
    req.body.bio == ''
  ) {
    res.status(400).json({
      message: 'Please provide a name and bio for the user',
    });
  }
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
