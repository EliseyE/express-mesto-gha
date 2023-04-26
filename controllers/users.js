const User = require('../models/user');
const errorHeandler = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error();
    })
    .then((user) => res.send({ user }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error();
    })
    .then((user) => res.send({ user }))
    .catch((err) => { errorHeandler(err, res); });
};
