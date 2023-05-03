const mongoose = require('mongoose');
const { isURL, isEmail } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
      maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
      maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator(v) { return isURL(v); },
        message: (props) => `Incorrect url format: ${props.value}`,
      },
    },
    email: {
      type: String,
      unique: [true, 'User with such an email already exists'],
      required: [true, 'Required field email'],
      lowercase: true,
      validate: {
        validator(v) { return isEmail(v); },
        message: (props) => `Incorrect email format: ${props.value}`,
      },
    },
    password: {
      type: String,
      required: [true, 'Required field password'],
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Incorrect email or password'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Incorrect email or password'));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
