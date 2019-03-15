const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gestionnaireSchema = new Schema({
  fullname:  String,
  numero: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },    
  updatedAt: { type: Date, default: Date.now },
});

gestionnaireSchema.pre('save', next => {
  const now = new Date()

  if (!this.createdAt) {
    this.createdAt = now
  } else {
    this.updatedAt = now
  }

  next()
})

module.exports = mongoose.model('Gestionnaire', gestionnaireSchema)
