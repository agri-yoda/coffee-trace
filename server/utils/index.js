// Authorization
const Authorization = require('./auth')

// Password Module
const Password = require('./password')

// SendError Module
const { SendError } = require('./sendError')

// S3 Module
const S3 = require('./s3')

// Export Utilities
module.exports = { Authorization, Password, SendError, S3 }