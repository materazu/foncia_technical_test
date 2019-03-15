const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

const clientSchema = new Schema({
  fullname:  String,
  email: String,
  email2: String,
  telDomicile: String,
  telPro: String,
  telMobile: String,
  telMobile2: String,
  fax: String,
  sexe: String,
  createdAt: { type: Date, default: Date.now },    
  updatedAt: { type: Date, default: Date.now },
})

clientSchema.pre('save', next => {
  const now = new Date()

  if (!this.createdAt) {
    this.createdAt = now
  } else {
    this.updatedAt = now
  }

  next()
})

clientSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Client', clientSchema)
