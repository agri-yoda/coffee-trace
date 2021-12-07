// Send Error
const { SendError, S3 } = require('../../utils')

// File Controllers
const FileControllers = {

    /**
     * This function is responsible for uploading a file to the s3 bucket
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async uploadFile(req, res, next) {
        try {

            // Send Status 200 response
            return res.status(200).json({
                message: 'File has been uploaded to the S3 Bucket!'
            })

        } catch (error) {
            console.log(error)
            return SendError(res, error)
        }
    },

    async getSignedUploadUrl(req, res, next) {
        try {

            // FileName from body
            const { file_name } = req.body

            S3.getUploadUrl(file_name)
                .then((url) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Pre-signed for uploading file to the bucket is ready!',
                        ttl: '5 minutes',
                        url: url
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }

    }

}

// Export Controllers
module.exports = FileControllers