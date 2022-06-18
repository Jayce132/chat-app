const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const messageSchema = new mongoose.Schema({
  fromContactID: {
    required: true,
    type: ObjectId,
  },
  toContactID: {
    required: true,
    type: ObjectId,
  },
  message: {
    required: true,
    type: String,
  },
  sendDate: {
    required: true,
    type: Date,
  },
})

module.exports = mongoose.model('MessageModel', messageSchema)
