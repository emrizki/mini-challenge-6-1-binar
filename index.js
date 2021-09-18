const express = require('express');
const app = express();
const port = 3000;

const { User } = require('./models');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');

// CREATE
app.get('/users/create', (req, res) => {
  res.render('create_user');
});
app.post('/users/create', (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then((user) => {
      res.send(
        `User data is created, check <a href="http://localhost:${port}/users">here</a>`
      );
    })
    .catch((err) => {
      res.status(422).json("Can't create user");
    });
});

// READ
app.get('/users', (req, res) => {
  User.findAll().then((users) => {
    res.render('users', { users, port });
  });
});

// UPDATE
app.get('/users/update/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((user) => {
    res.render('update_user', { user });
  });
});
app.post('/users/update/:id', (req, res) => {
  const { username, password } = req.body;

  User.update({ username, password }, { where: { id: req.params.id } }).then(
    (_) => {
      res.send(
        `user data update successfully, check <a href="http://localhost:${port}/users">here</a>`
      );
    }
  );
});

// DELETE
app.get('/users/delete/:id', (req, res) => {
  User.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect('/users');
  });
});

app.listen(port, () => {
  console.log(`access here http://localhost:${port}/users`);
});
