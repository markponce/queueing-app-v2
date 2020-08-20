const { Schema } = require("mongoose")
const  mongoose  = require("../db")
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true,
    unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  isAdmin: {type: Boolean, default: false},
  createdAt: {
    type: Date, default: Date.now
  },
  updatedAt: {
    type: Date, default: Date.now
  }  
})

userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next()
})

userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`
}

// userSchema.methods.isPasswordMatch = async function(password) {
//   const test = await bcrypt.compare(password, this.password);
//   console.log('isPasswordMatch', test);
//   return test;
// }

const User = mongoose.model('User', userSchema)

module.exports = User;