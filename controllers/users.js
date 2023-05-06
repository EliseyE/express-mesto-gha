const bcrypt = require('bcryptjs');
const User = require('../models/user');
const errorHeandler = require('../errors/errorHeandler');
const { generateToken } = require('../utils/token');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json({ users }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.json({ user }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).json({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.updateUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.json({ user }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.json({ user }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id }, '12h');

      res.cookie('jwt', token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
        .send({
          name: user.name,
          avatar: user.avatar,
          about: user.about,
          email: user.email,
          _id: user._id,
        });
    })
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.json({ user }))
    .catch((err) => { next(errorHeandler(err)); });
};
