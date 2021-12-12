// Filesystems module
const fs = require('fs')

// AWS Module from the runtime env variable
const { s3 } = require('./aws.config')

// S3 Module
const S3 = {

    async createBucket(bucketName) {
        return new Promise((resolve, reject) => {

            // Setting up new S3 Bucket Parameters
            const params = {
                Bucket: bucketName,
                CreateBucketConfiguration: {
                    LocationConstraint: process.env.AWS_REGION
                }
            }

            // Create a new bucket
            s3.createBucket(params).promise()
                .then((res) => {
                    console.log('Bucket Created Successfully', res.Location)
                    resolve(res)
                })
                .catch((err) => {
                    reject({})
                })
        })
    },

    async uploadFile(fileName, userId) {

        return new Promise((resolve, reject) => {

            // Read content from the file
            const fileContent = fs.readFileSync(fileName)

            // Setting up S3 upload parameters
            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: `${userId}/${fileName}`, // File name you want to save as in S3
                Body: fileContent
            }

            // Uploading files to the bucket
            s3.upload(params).promise()
                .then((res) => {
                    console.log('File uploaded Successfully', res.Location)
                    resolve(res)
                })
                .catch((err) => {
                    reject({})
                })
        })
    },

    async getUploadUrl(fileName, userId) {
        return new Promise((resolve, reject) => {

            // Setting up S3 upload parameters
            const params = {
                Bucket: process.env.S3_BUCKET,
                Key: `${userId}/${fileName}`, // File name you want to save as in S3
                Expires: 60 * 5
            }

            s3.getSignedUrlPromise('putObject', params)
                .then((url) => resolve(url))
                .catch(() => reject())

        })
    }
}

// Export Module
module.exports = S3

