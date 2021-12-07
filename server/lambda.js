// Express App
const app = require('./api/app')

// Serverless Express Module 
const awsServerlessExpress = require('aws-serverless-express')

// Mongoose connection
const { connectDatabase } = require('./db')

// Export Module
module.exports.universal = (event, context) => {
    
    // Connect Database
    connectDatabase()
        .then(() => {

            // Create Server
            const server = awsServerlessExpress.createServer(app)

            // Setup the proxy for serverless
            awsServerlessExpress.proxy(server, event, context)
        })
        .catch(error => {
            process.stdout.write('\n Could not connect to database', { error }, '\n')
            throw error
        })
}

