// Mail Module
const {
    Email
} = require('../../utils')

// Mail Service
const MailService = {
    async sendConfirmEmail(first_name, confirm_link, email, subject) {
        return new Promise(async (resolve, reject) => {
            try {

                // Send the email
                await Email.sendConfirmEmail(first_name, confirm_link, email, subject)

                // Resolve the promise
                resolve({
                    message: 'Confirm email sent successfully!'
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    }
}

// Export Service
module.exports = MailService