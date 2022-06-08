// Express Module
const express = require('express')

// Mail Controllers
const { MailControllers } = require('../controllers')

// Router Module
const router = express.Router()

// Route Definitions

// Send Confirm Email Route
router.post('/confirm-email', MailControllers.sendConfirmEmail)

// Export Router
module.exports = router