const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lotSchema = new Schema({
  client:  { type: 'ObjectId', ref: 'Client' },
  surface: Number,
  createdAt: { type: Date, default: Date.now },    
  updatedAt: { type: Date, default: Date.now },
})

lotSchema.pre('save', next => {
  const now = new Date()

  if (!this.createdAt) {
    this.createdAt = now
  } else {
    this.updatedAt = now
  }

  next()
})

module.exports = mongoose.model('Lot', lotSchema)
