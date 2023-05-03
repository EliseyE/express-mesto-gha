const signupRouter = require('express').Router();

const {
  JOI_PRESETS,
} = require('../appConfig');

const {
  createUser,
} = require('../controllers/users');

signupRouter.post('/', JOI_PRESETS.createUser, createUser);

module.exports = signupRouter;
