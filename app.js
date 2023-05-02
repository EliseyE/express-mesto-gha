const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const { auth } = require('./middlewares/auth');
const centralErrorUnit = require('./errors/centralErrorUnit');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Path not found' });
});

app.use(errors());
app.use(centralErrorUnit);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App are listening on port ${PORT}`);
});
