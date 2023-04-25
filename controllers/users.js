const Users = require('../models/user');

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  Users.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users.crearte({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
