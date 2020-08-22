const { Schema } = require("mongoose")
const mongoose = require("../db")
const uniqueValidator = require('mongoose-unique-validator');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  isActive: {
    type: Boolean, default: true
  }
}, {
  timestamps: true
})

counterSchema.plugin(uniqueValidator)

const Counter = mongoose.model('Counter', counterSchema)
module.exports = {
  Counter,
  counterSchema
}