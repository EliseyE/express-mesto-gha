const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const usersRouter = require('./routes/users');
// const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
