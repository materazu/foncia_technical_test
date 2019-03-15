/**
 * Dependencies
 */
const mongoose = require('mongoose')

/**
 * Model
 */
const Gestionnaire = require('../schema/gestionnaire');

/**
 * Declarations
 */
const ObjectId = mongoose.Types.ObjectId
let possibilities

const getForManager = (req, res) => {
  let query = Gestionnaire.findOne({_id: ObjectId(req.params.managerId) });

  query.exec((err, gestionnaireResult) => {
    if (err) {
      res.send(err)
    }

    const gestionnaire = gestionnaireResult.toObject()
    possibilities = []
    aggregateNumbers(gestionnaire.numeros)

    res.json(possibilities)
  });
}

const aggregateNumbers = (number, chained) => {
  const chain = chained ? [...chained] : []

  chain.push(number.x)

  if (number.r) {
    aggregateNumbers(number.r, chain)
  }

  if (number.l) {
    aggregateNumbers(number.l, chain)
  }

  if (!number.l && !number.r) {
    possibilities.push(chain.join('.'))
  }
}

module.exports = { getForManager }