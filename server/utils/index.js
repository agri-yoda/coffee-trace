// Authorization
const Authorization = require('./auth')

// Email Module
const Email = require('./mail/email')

// Password Module
const Password = require('./password')

// SendError Module
const { SendError } = require('./sendError')

// S3 Module
const S3 = require('./s3')

// Export Utilities
module.exports = { Authorization, Email, Password, SendError, S3 }