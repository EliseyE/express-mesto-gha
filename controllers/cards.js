const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
