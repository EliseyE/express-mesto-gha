const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Required field name'],
      minlength: [2, 'Min length is 2 symbols. Current data is less than 2 symbols'],
      maxlength: [30, 'Max length is 30 symbols. Current data is more than 30 symbols'],
    },
    link: {
      type: String,
      required: [true, 'Required field link'],
      validate: {
        validator(v) { return isURL(v); },
        message: 'Incorrect url format',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Required field owner'],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
