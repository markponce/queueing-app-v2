const { Schema } = require("mongoose")
const mongoose = require("../db")
const uniqueValidator = require('mongoose-unique-validator');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  isActive: {
    type: Boolean, default: true
  }
}, { 
  timestamps: true 
})

serviceSchema.plugin(uniqueValidator)

const Service = mongoose.model('Service', serviceSchema)
module.exports = {
  Service,
  serviceSchema
}