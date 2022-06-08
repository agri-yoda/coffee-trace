// Import Mail Service
const {
    MailService
} = require('../services')

// Send Error
const {
    SendError
} = require('../../utils')

// Mail Controllers
const MailControllers = {

    /**
     * Send Confirm EmailController
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async sendConfirmEmail(req, res, next) {
        try {

            // Fetch the data from the params
            const {
                first_name, confirm_link, email, subject
            } = req.body

            // Send Email to the user
            MailService.sendConfirmEmail(first_name, confirm_link, email, subject)
                .then(() => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Confirm email sent successfully!!'
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },
}

// Export Controllers
module.exports = MailControllers