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
            const { file_name, project } = req.body

            console.log(req.body)

            S3.getUploadUrl(file_name, project)
                .then((url) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Pre-signed for uploading file to the bucket is ready!',
                        ttl: '5 minutes',
                        url: url
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }

    },

    async getSignedFileUrl(req, res, next) {
        try {

            // FileName from body
            const { file_name } = req.body

            S3.getFileUrl(file_name)
                .then((url) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Pre-signed for fetching file to the bucket is ready!',
                        ttl: '60 minutes',
                        url: url
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }

    },

    async getObjectsByFolder(req, res, next) {
        try {

            // FileName from body
            const {
                folder_name,
            } = req.params

            // Setting up S3 parameters
            const params = {
                Bucket: process.env.S3_BUCKET,
                Delimiter: '/',
                Prefix: `${folder_name}/`,
            }

            S3.getObjects(params)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Objects for the users fetched successfully!',
                        data: data
                    })
                })
                .catch((error) => {
                    return res.status(400).json(error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    }

}

// Export Controllers
module.exports = FileControllers