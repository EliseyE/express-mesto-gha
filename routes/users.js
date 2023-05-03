const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  URL_REG_EXP,
} = require('../utils/constants');

const {
  getUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getCurrentUserInfo);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), getUser);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REG_EXP),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
