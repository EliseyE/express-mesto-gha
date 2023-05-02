const Card = require('../models/card');
const { errorHeandler } = require('../errors/errorHeandler');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.json({ cards }))
    .catch((err) => { errorHeandler(err, res); })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).json({ card }))
    .catch((err) => { errorHeandler(err, res); })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  Card.findByIdAndRemove(cardId)
    .orFail()
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (userId !== card.owner) return Promise.reject(new Error('Access denied'));
      res.json({ card });
    })
    .catch((err) => { errorHeandler(err, res); })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.json({ card }))
  .catch((err) => { errorHeandler(err, res); })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail()
  .then((card) => res.json({ card }))
  .catch((err) => { errorHeandler(err, res); })
  .catch(next);
