const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');
const centralErrorUnit = require('./errors/centralErrorUnit');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(centralErrorUnit);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App are listening on port ${PORT}`);
});
