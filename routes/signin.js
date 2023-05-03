const signinRouter = require('express').Router();

const {
  JOI_PRESETS,
} = require('../appConfig');

const {
  login,
} = require('../controllers/users');

signinRouter.post('/', JOI_PRESETS.login, login);

module.exports = signinRouter;
