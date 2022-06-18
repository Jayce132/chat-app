const express = require('express')
const ContactModel = require('../models/contact')

const router = express.Router()

router.get('/api/contacts', async (req, res) => {
  const contacts = await ContactModel.find()
  res.json(contacts)
})

router.get('/api/contacts/:id', async (req, res) => {
  // eslint-disable-next-line no-console
  console.log(req.params.id)
  const contact = await ContactModel.findOne({ _id: req.params.id })
  res.json(contact)
})

router.put('/api/contacts/:id', async (req, res) => {
  const filter = { _id: req.params.id }
  const { email, firstName, lastName, createDate, checked, lastSeen } = req.body
  const update = {
    email,
    firstName,
    lastName,
    createDate,
    checked,
    lastSeen,
  }
  await ContactModel.findOneAndUpdate(filter, update)
  res.json({ success: true })
})

router.post('/api/contacts', async (req, res) => {
  // Only id, email, firstName, lastName are sent from frontend
  const { email, firstName, lastName } = req.body

  const createDate = Date.now()
  const checked = false
  const lastSeen = Date.now()

  const newContact = new ContactModel({ email, firstName, lastName, createDate, checked, lastSeen })
  await newContact.save()
  res.json({ success: true })
})

router.delete('/api/contacts/:id', async (req, res) => {
  const contact = await ContactModel.deleteOne({ _id: req.params.id })
  res.json(contact)
})

module.exports = router
