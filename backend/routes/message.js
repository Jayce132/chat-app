const express = require('express')
const MessageModel = require('../models/message')

const router = express.Router()

router.get('/api/messages', async (req, res) => {
  const messages = await MessageModel.find()
  res.json(messages)
})

router.get('/api/messages/:id', async (req, res) => {
  const message = await MessageModel.findOne({ _id: req.params.id })
  res.json(message)
})

router.put('/api/messages/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const { fromContactID, toContactID, message, sendDate } = req.body
  const update = {
    fromContactID,
    toContactID,
    message,
    sendDate,
  }
  await MessageModel.findOneAndUpdate(filter, update)
  res.json({ success: true })
})

router.post('/api/messages', async (req, res) => {
  const { fromContactID, toContactID, message, sendDate } = req.body
  const newMessage = new MessageModel({ fromContactID, toContactID, message, sendDate })
  await newMessage.save()
  // res.json({ success: true })
  // send request body instead of success status
  // frontend uses actions.generalActions.addMessage(response.data);
  res.json(req.body)
})

router.delete('/api/messages/:id', async (req, res) => {
  const message = await MessageModel.deleteOne({ _id: req.params.id })
  res.json(message)
})

module.exports = router
