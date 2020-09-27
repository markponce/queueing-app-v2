const { Schema } = require("mongoose")
const mongoose = require("../db")

var servicesSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: 'string',
  description: 'string'
});

var servicesSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: 'string',
  description: 'string'
});


const queueSchema = new mongoose.Schema({
  customerName: { type: String },
  customerType: { type: Number },
  ordinal: { type: Number },
  services: [servicesSchema],
  isPriority: { type: Boolean, default: false },
  status: { type: Number },
  calledAt: { type : Date },
  doneAt: { type : Date },
  counterId : { type: Schema.Types.ObjectId },
  userId : { type: Schema.Types.ObjectId },
}, { timestamps: true })

const Queue = mongoose.model('Queue', queueSchema)

module.exports = Queue;