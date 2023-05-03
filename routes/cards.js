const cardsRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  JOI_PRESETS,
} = require('../appConfig');

cardsRouter.get('/', getCards);
cardsRouter.post('/', JOI_PRESETS.createCard, createCard);
cardsRouter.delete('/:cardId', JOI_PRESETS.actCardById, deleteCard);
cardsRouter.put('/:cardId/likes', JOI_PRESETS.actCardById, likeCard);
cardsRouter.delete('/:cardId/likes', JOI_PRESETS.actCardById, dislikeCard);

module.exports = cardsRouter;
