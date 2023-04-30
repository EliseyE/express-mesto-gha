const Card = require('../models/card');
const { errorHeandler } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  Card.findByIdAndRemove(cardId)
    .orFail()
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (userId !== card.owner) return Promise.reject(new Error('Access denied'));
      res.send({ card });
    })
    .catch((err) => { errorHeandler(err, res); });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ card }))
  .catch((err) => { errorHeandler(err, res); });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.send({ card }))
  .catch((err) => { errorHeandler(err, res); });
