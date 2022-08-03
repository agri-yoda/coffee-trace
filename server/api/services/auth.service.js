// Import Models
const { Auth, User } = require('../models')

// Password Module
const { Password } = require('../../utils')

// JWT Module
const jwt = require('jsonwebtoken')

// Authentication Service
const AuthService = {

    /**
     * This function is responsible for creating the Authentication logs
     * @param {*} token 
     * @param {*} userId 
     * @returns 
     */
    async createAuthLog(token, userId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Authentication logs schema
                const authLog = {
                    token: token,
                    _user: userId
                }

                // Create the auth logs
                const auth = await Auth.create(authLog)

                // Resolve the promise
                resolve(auth)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for refreshing the access token
     * @param {*} accessToken 
     * @returns 
     */
    async refreshAccessToken(accessToken) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the signed token
                const token = jwt.sign({ originalToken: accessToken }, process.env.JWT_ACCESS_KEY, {
                    expiresIn: process.env.JWT_ACCESS_TIME
                })

                // If exists then, pass the request
                if (!!token) {

                    // Resolve the promise
                    resolve({ token: token })

                } else {
                    return res.status(400).json({
                        message: 'Bad request, refreshing the access token has been failed!'
                    })
                }

            } catch (error) {

                console.log(error)

                // Catch the error and reject the promise
                reject({ error: error })
            }

        })

    },

    /**
     * This function is responsible for signing out the user
     * @param {*} userId 
     * @param {*} token 
     * @returns 
     */
    async signOut(userId, token) {
        return new Promise(async (resolve, reject) => {
            try {
                await Auth.findOneAndUpdate({
                    _user: userId,
                    token: token
                }, {
                    $set: {
                        logged_in: false
                    }
                }, {
                    new: true
                })

                // Resolve the promise
                resolve({
                    message: "Logged out, successfully!"
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for signing in the user
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async signIn(email, password) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const user = await User.findOne({ email })

                // If user wasn't found or user was previously removed/disabled, return error
                if (!user || user.active === false) {
                    reject({ error: 'Either user doesn\'t exist or was disabled from the system.' })
                }

                // Decrypt the Password
                const decryptedPassword = await Password.decryptPassword(password, user.password)

                // If the password is wrong
                if (!decryptedPassword.password) {
                    reject({ error: 'Please enter a valid email or password!' })
                }

                // Create the signed token
                const token = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_KEY, {
                    expiresIn: process.env.JWT_ACCESS_TIME
                })

                // Log the auths
                this.createAuthLog(token, user._id)

                // Resolve the promise
                resolve({
                    user: user,
                    token: token
                })

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for signing up the user
     * @param {*} userData 
     * @returns 
     */
    async signUp(userData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Check if user exists in the DB 
                const checkUser = await User.findOne({ email: userData.email })

                if (checkUser) {
                    reject({ error: 'User with this email already exist.' })
                }

                // Encrypting user password
                const encryptedPass = await Password.encryptPassword(userData.password)

                // If the password is wrong
                if (!encryptedPass.password) {
                    reject({ error: 'Please choose a different password.' })
                }

                // User Data
                let data = {
                    first_name: userData.name.split(" ")[0],
                    last_name: userData.name.split(" ").slice(1).join(" "),
                    full_name: userData.name,
                    email: userData.email,
                    role: userData.type || 'grower',
                    password: encryptedPass.password
                }

                // Create the new User
                let user = await User.create(data)

                // If user is not created
                if (!user) {
                    reject({ error: 'User was not created.' })
                }

                // Sign In the current user
                let res = await this.signIn(userData.email, userData.password)

                // Resolve the promise
                resolve({
                    user: res.user,
                    token: res.token
                })


            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    }
}

// Export Service
module.exports = AuthService