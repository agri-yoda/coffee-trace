// Sendgrid Module
const sgMail = require('@sendgrid/mail')

// Path Module
const path = require('path')

// EJS Module
const ejs = require('ejs')

// Environment State Variable
const env = process.env.NODE_ENV

// Check the production environment variable statw
if (env != 'production') {

    // DotEnv Module
    const dotenv = require('dotenv')

    // Load the config from the .env file
    dotenv.config()
}

// Set the API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Email Module
const Email = {

    /**
     * This function is responsible for rendering the templates
     * @param {*} templateName 
     * @param {*} templateVariables 
     * @returns 
     */
    async renderTemplate(templateName, templateVariables) {
        return new Promise((resolve, reject) => {
            ejs.renderFile(path.join(__dirname, `templates/${templateName}.ejs`), {
                first_name: 'Shubham',
                confirm_link: 'https://coffeetrace.io'
              }).then((result) => {
                    resolve(result)
                })
                .catch((error) => {
                    console.error("Error while parsing template: ", error)
                    reject(error)
                })
        })

    },

    /**
     * Standard Email function
     * @param {*} emailData 
     * @returns 
     */
    async sendEmail(emailData) {
        return new Promise((resolve, reject) => {
            const message = {
                to: emailData.email,
                from: {
                    email: "inbox.shubhamsingh@gmail.com",
                    name: "Team CoffeeTrace"
                },
                subject: emailData.subject,
                html: emailData.template
            }

            // Send Email
            sgMail.send(message)
                .then((res) => {
                    resolve({
                        message: 'Email sent successfully!'
                    })
                })
                .catch((err) => {
                    console.error(err.response.body)
                    reject({
                        message: 'Unexpected error occured while sending the email!',
                        error: JSON.stringify(err)
                    })
                })
        })
    },

    /**
     * This function is responsible for sending the confirmation email
     * @param {*} data 
     */
    async sendConfirmEmail(first_name, confirm_link, email, subject) {

        // Prepare Data
        let data = {
            first_name: first_name,
            confirm_link: confirm_link,
            email: email,
            subject: subject
        }

        // Render the template
        let template = await Email.renderTemplate('confirm-email', data)

        // Append the template to the message
        data.template = template

        // Send the email
        await Email.sendEmail(data)
    }
}

// Export Module
module.exports = Email