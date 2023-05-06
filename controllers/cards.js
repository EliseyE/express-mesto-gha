const Card = require('../models/card');
const errorHeandler = require('../errors/errorHeandler');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.json({ cards }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json({ card }))
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (userId !== card.owner.toString()) throw new ForbiddenError('Access denied');
      card.deleteOne({ _id: cardId });
      return card;
    })
    .then((card) => {
      res.json({ card, message: 'The card has been deleted' });
    })
    .catch((err) => { next(errorHeandler(err)); });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .orFail()
  .then((card) => res.json({ card }))
  .catch((err) => { next(errorHeandler(err)); });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .populate(['owner', 'likes'])
  .orFail()
  .then((card) => res.json({ card }))
  .catch((err) => { next(errorHeandler(err)); });
