// Express App
const app = require('./api/app')

// HTTP Module
const http = require('http')

// DotEnv Module
const dotenv = require('dotenv')

// Load the config from the .env file
dotenv.config()

// Mongoose connection
const { connectDatabase } = require('./db')

// Redis connection
// const { getRedisClient } = require('./redis')

// Cache Queries
// const { cacheQuery } = require('./cache')

// Connect Database
connectDatabase()
    .then(() => {

        // Define Application port
        const port = process.env.PORT

        // Defining the Host Name
        const host = process.env.HOST

        // Environment State Variable
        const env = process.env.NODE_ENV

        // // Connect Redis
        // const redis = getRedisClient()

        // // Create Cache
        // cacheQuery(redis)

        // Creating Microservice Server
        const server = http.createServer(app)

        // Exposing the server to the desired port
        server.listen(port, host, async () => {
            process.stdout.write(`\n CoffeeTrace Server: http://${host}:${port}\n`)
            process.stdout.write(`\n Environment: ${env}\n`)
            process.stdout.write(`\n Process: ${process.pid} is listening to all incoming requests \n`)
        })
    })
    .catch(error => {
        process.stdout.write('\n Could not connect to database', { error }, '\n')
        throw error
    })