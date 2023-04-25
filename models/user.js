const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Пользователь',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Описание пользователя',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
