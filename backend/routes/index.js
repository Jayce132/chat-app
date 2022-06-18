const express = require('express')

const router = express.Router()
const contactRouter = require('./contact')
const messageRouter = require('./message')

router.use('/', contactRouter)
router.use('/', messageRouter)

module.exports = router
