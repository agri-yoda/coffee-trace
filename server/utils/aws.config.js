// AWS Module
const AWS = require('aws-sdk')

// Environment State Variable
const env = process.env.NODE_ENV

// Check the production environment variable statw
if (env != 'production') {

    // DotEnv Module
    const dotenv = require('dotenv')

    // Load the config from the .env file
    dotenv.config()
}

// Set the region
AWS.config.update({ region: process.env.AWS_REGION })

// Check the connection state if AWS SDK is working
AWS.config.getCredentials(function (err) {
    if (err) console.log("Error - AWS Credentials: ", err.stack)
})

// Setting the apiVersions
AWS.config.apiVersions = {
    s3: '2006-03-01'
}

// Create new S3 instance class
const s3 = new AWS.S3()

// Export Module
module.exports = {
    s3
}