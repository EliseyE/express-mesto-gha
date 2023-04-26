const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: err.name }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((error) => error.name).join('; ');
        res.status(400).send({ message });
      } else res.status(500).send({ message: err.name });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error();
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.reason.name === 'BSONError') res.status(400).send({ message: err.message });
      if (err.name === 'CastError') res.status(404).send({ message: err.name });
      else res.status(500).send({ message: err.name });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send({ card }))
  .catch((err) => {
    if (err.reason.name === 'BSONError') res.status(400).send({ message: err.message });
    if (err.name === 'CastError') res.status(404).send({ message: err.name });
    else res.status(500).send({ message: err.name });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send({ card }))
  .catch((err) => {
    if (err.reason.name === 'BSONError') res.status(400).send({ message: err.message });
    if (err.name === 'CastError') res.status(404).send({ message: err.name });
    else res.status(500).send({ message: err.name });
  });
