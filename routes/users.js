const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateUserInfo, updateUserAvatar, getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUser);
usersRouter.patch('/users/me', updateUserInfo);
usersRouter.get('/users/me/', getCurrentUserInfo);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
