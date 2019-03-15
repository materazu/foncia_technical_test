/**
 * Dependencies
 */
const mongoose = require('mongoose')

/**
 * Models
 */
const Client = require('../schema/client');
const Lot = require('../schema/lot');


/**
 * Declarations
 */
const ObjectId = mongoose.Types.ObjectId

const get = (req, res) => {
  const options = {
    select:   'fullname email',
    lean: true,
    page: req.query.page || 1
  }

  Client.paginate({}, options).then((results, error) => {
    if (error) {
      return res.json(error)
    }
    
    if (!results.docs.length) {
      return res.json([])
    }

    results.docs.forEach((result, index) => {
      Lot.find({ client: ObjectId(result._id) }).lean().exec((error, lots) => {
        if (error) {
          return res.json(error)
        }

        delete result.id;
        result.lots = lots.length;

        if (results.docs.length - 1 === index) {
          res.json(results)
        }
      })
    })
  })
}

module.exports = { get }