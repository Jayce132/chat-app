const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  createDate: {
    required: true,
    type: Date,
  },
  checked: {
    required: true,
    type: Boolean,
  },
  lastSeen: {
    required: true,
    type: Date,
  },
})

module.exports = mongoose.model('ContactModel', contactSchema)
