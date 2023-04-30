const mongoose = require('mongoose');
const { isURL, isEmail } = require('validator');
const bcrypt = require('bcryptjs');

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
      validate: {
        validator(v) { return isURL(v); },
        message: 'Incorrect url format',
        default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      },
      email: {
        type: String,
        required: [true, 'Required field email'],
        unique: true,
        validate: {
          validator(v) { return isEmail(v); },
          message: 'Incorrect url format',
        },
      },
      password: {
        type: String,
        required: [true, 'Required field password'],
        minlength: [4, 'Min length is 4 symbols. Current data is less than 4 symbols'],
        select: false,
      },
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Error('Incorrect email or password'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Error('Incorrect email or password'));
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
