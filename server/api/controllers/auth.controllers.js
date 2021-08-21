// Import Auth Service
const { AuthService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

// Auth Controllers
const AuthControllers = {

    /**
     * Sign-In Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signIn(req, res, next) {
        try {

            // Fetch the data from the request body
            let { email, password } = req.body

            // call the signIn function
            AuthService.signIn(email, password)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed In Successfully!',
                        user: data.user,
                        token: data.token
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })
        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Sign-Up Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    async signUp(req, res, next) {
        try {

            // Fetch the data from the request body
            const { user } = req.body

            // Call the signUp function
            AuthService.signUp(user)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'User signed up successfully!',
                        user: data.user,
                        token: data.token
                    })
                })
                .catch((error) => {
                    return SendError(res, error)
                })

        } catch (error) {
            return SendError(res, error)
        }
    },

    /**
     * Sign-Out Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async signOut(req, res, next) {
        try {

            // Fetch the UserId
            let userId = req.user._id

            // Fetch the token from headers
            let token = req.headers.authorization.split(' ')[1]

            AuthService.signOut(userId, token)
                .then((data) => {

                    // Unset the user
                    req.user = null

                    // Send Status 200 response
                    return res.status(200).json({
                        message: data.message
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
module.exports = AuthControllers