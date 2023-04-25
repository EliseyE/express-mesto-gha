const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((users) => res.send({ users }))
    .catch((err) => {
      if (err.message === 'Not found') res.status(400).send({ message: err.name });
      else res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'Not found') res.status(400).send({ message: err.name });
      else res.status(500).send({ message: err.name });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.name).join('; ');
        res.status(400).send({ message });
      } else res.status(500).send({ message: err.name });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'Not found') res.status(400).send({ message: err.name });
      else res.status(500).send({ message: err.name });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'Not found') res.status(404).send({ message: err.name });
      else res.status(500).send({ message: err.name });
    });
};
