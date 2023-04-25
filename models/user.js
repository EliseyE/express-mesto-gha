const mongoose = require('mongoose');
const { isURL } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Required field name'],
    minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
    maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
  },
  about: {
    type: String,
    required: [true, 'Required field about'],
    minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
    maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
  },
  avatar: {
    type: String,
    required: [true, 'Required field avatar'],
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg',
    validate: {
      validator(v) { return isURL.test(v); },
      message: 'Incorrect url format',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
