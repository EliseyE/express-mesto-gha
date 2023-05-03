const { celebrate, Joi } = require('celebrate');

const {
  URL_REG_EXP,
} = require('./constants');

const userId = Joi.string().hex().required().length(24);
const name = Joi.string().min(2).max(30);
const about = Joi.string().min(2).max(30);
const link = Joi.string().pattern(URL_REG_EXP);
const cardId = Joi.string().alphanum().length(24);
const email = Joi.string().required().email();
const password = Joi.string().required().min(4).max(30);

const JOI_PRESETS = {
  getUser: celebrate({
    params: Joi.object().keys({
      userId,
    }),
  }),
  updateUserInfo: celebrate({
    body: Joi.object().keys({
      name: name.required(),
      about: about.required(),
    }),
  }),
  updateUserAvatar: celebrate({
    body: Joi.object().keys({
      avatar: link.required(),
    }),
  }),
  createCard: celebrate({
    body: Joi.object().keys({
      name: name.required(),
      link: link.required(),
    }),
  }),
  actCardById: celebrate({
    params: Joi.object().keys({
      cardId,
    }),
  }),
  login: celebrate({
    body: Joi.object().keys({
      email,
      password,
    }),
  }),
  createUser: celebrate({
    body: Joi.object().keys({
      name,
      about,
      avatar: link,
      email,
      password,
    }),
  }),
};

module.exports = {
  JOI_PRESETS,
};
