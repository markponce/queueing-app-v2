const { Schema } = require("mongoose")
const mongoose = require("../db")
const uniqueValidator = require('mongoose-unique-validator');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  createdAt: {
    type: Date, default: Date.now
  },
  updatedAt: {
    type: Date, default: Date.now
  }
})

serviceSchema.plugin(uniqueValidator)

const Service = mongoose.model('Service', serviceSchema)
module.exports = {
  Service,
  serviceSchema
}