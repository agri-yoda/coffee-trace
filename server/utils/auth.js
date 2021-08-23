// JWT Module
const jwt = require('jsonwebtoken')

// SendError Function
const { SendError } = require('./sendError')

// Auth Model
const { Auth } = require('../api/models')

// Redis connection
// const { getRedisClient } = require('../redis')

/**
 * This function is responsible for verifying the token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAccessToken = async (req, res, next) => {
    try {

        // Authorization header is not present on request
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: 'Unauthorized request, it must include an authorization header!'
            })
        }

        // Fetch the token
        const token = await req.headers.authorization.split(' ')[1]

        // Token is not present on authorization header
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized request, it must include an authorization token!'
            })
        }

        // Verify the Token
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
            if (err || !decoded) {
                return res.status(401).json({
                    message: 'Unauthorized request, it must have a valid authorization token!'
                })
            } else {

                // Throw Error, if user is disabled
                if (decoded.active == false) {
                    return res.status(401).json({
                        message: 'Unauthorized request, user is disabled from the system!'
                    })
                }
                else {
                    req.user = decoded
                    next()
                }
            }
        })
    } catch (err) {
        return SendError(res, err)
    }
}

/**
 * This function is responsible for checking if the current user is loggedIn or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const isLoggedIn = async (req, res, next) => {
    try {

        // Find if auth is available in the logs
        const auth = await Auth.findOne({
            _user: req.user._id,
            logged_in: true,
            token: req.headers.authorization.split(' ')[1]
        })

        // If exists then, pass the request
        if (!!auth) {
            next()
        } else {
            return res.status(400).json({
                message: 'Bad request, either user never logged in or has already been logged out from the system!'
            })
        }

    } catch (err) {
        return SendError(res, err, 'Unauthorized request, Please sign in to continue!', 401)
    }
}

// Export Module
module.exports = {
    verifyAccessToken,
    isLoggedIn
}
