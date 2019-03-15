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
  try {
    Gestionnaire.findOne({_id: ObjectId(req.params.managerId) })
      .exec((err, gestionnaireResult) => {
        if (err) {
          return res.status(500).json({message: error})
        }

        if (!gestionnaireResult) {
          return res.status(404).json({message: 'There is no manager for this id'})
        }

        const gestionnaire = gestionnaireResult.toObject()
        possibilities = []
        aggregateNumbers(gestionnaire.numeros)

        res.json(possibilities)
      })
    ;
  } catch (error) {
    res.status(400).json({message: 'You provided a bad id'})
  }
}

/**
 * Simple aggregator for numbers
 * keep first number, check left and right value
 * recursively aggregate through the next left or right value
 * until left and right are empty
 * 
 * Returns array of chained numbers formatted to string like x.x.x
 * 
 * @param {Number} number number to use
 * @param {Array} chained parent chained
 */
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