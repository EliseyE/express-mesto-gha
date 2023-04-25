const cardsRouter = require('express').Router();

const { getCards, createCard } = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);

module.exports = cardsRouter;
