const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  URL_REG_EXP,
} = require('../utils/constants');

const {
  createUser,
} = require('../controllers/users');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REG_EXP),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4).max(30),
  }),
}), createUser);

module.exports = signupRouter;
