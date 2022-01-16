// Import Coffee Service
const {
    CoffeeService
} = require('../services')

// Send Error
const {
    SendError
} = require('../../utils')

// Coffee Controllers
const CoffeeControllers = {

    /**
     * Get Coffee Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async getCoffee(req, res, next) {
        try {

            // Fetch the data from the params
            const {
                coffeeId
            } = req.params

            CoffeeService.getCoffee(coffeeId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Coffee details fetched successfully!',
                        coffee: data
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
     * Create Coffee Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async createCoffee(req, res, next) {
        try {

            // Fetch the data from the body
            const {
                coffee
            } = req.body

            CoffeeService.createCoffee(coffee)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'New Coffee created successfully!',
                        coffee: data
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
     * Update Coffee Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
     async updateCoffee(req, res, next) {
        try {

            // Fetch the data from the params
            const { coffeeId } = req.params

            // Fetch the data from the body
            const { coffee } = req.body

            CoffeeService.updateCoffee(coffeeId, coffee)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Coffee updated successfully!',
                        Coffee: data
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
     * Remove Coffee Controller
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
     async removeCoffee(req, res, next) {
        try {

            // Fetch the data from the params
            const { coffeeId } = req.params

            CoffeeService.removeCoffee(coffeeId)
                .then((data) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'Coffee removed successfully!',
                        coffee: data
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
module.exports = CoffeeControllers