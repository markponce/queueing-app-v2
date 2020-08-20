const { Schema } = require("mongoose")
const mongoose = require("../db")

var servicesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: 'string',
  description: 'string'
});

const queueSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerType: { type: Number },
  testLang: { type: Number },
  services: [servicesSchema],
  isPriority: { type: Boolean, default: false },
  startedAt: { type: Date },
  finishAt: { type: Date },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })


queueSchema.method('transform', function() {
  var obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
});

const Queue = mongoose.model('Queue', queueSchema)

module.exports = Queue;