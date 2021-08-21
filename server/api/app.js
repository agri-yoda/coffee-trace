// Cors Module
const cors = require('cors')

// Compression Module
const compression = require('compression')

// Express Module
const express = require('express')

// Morgan Module
const morgan = require('morgan')

// Define the express application
const app = express()

// Routes
const { AuthRoutes } = require('./routes')

// Cors middleware for origin and Headers
app.use(cors())

// Adding The 'body-parser' middleware only handles JSON and urlencoded data
app.use(express.json())

// Use Morgan middleware for logging every request status on console
app.use(morgan('dev'))

// Correct REST naming
app.use('/api/v1/auths', AuthRoutes)

// Invalid routes handling middleware
app.use((req, res, next) => {
    const error = new Error('Not found!')
    error.status = 404
    next(error)
})

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

// Compressing the application
app.use(compression())

// Export the application
module.exports = app