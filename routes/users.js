const usersRouter = require('express').Router();

const {
  JOI_PRESETS,
} = require('../appConfig');

const {
  getUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUserInfo);
usersRouter.get('/:userId', JOI_PRESETS.getUser, getUser);
usersRouter.patch('/me', JOI_PRESETS.updateUserInfo, updateUserInfo);
usersRouter.patch('/me/avatar', JOI_PRESETS.updateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
