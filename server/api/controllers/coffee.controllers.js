// Import Coffee Service
const { CoffeeService } = require('../services')

// Send Error
const { SendError } = require('../../utils')

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
            const { coffeeId } = req.params

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
            const { data } = req.body

            CoffeeService.createCoffee(data, req.user._id)
                .then((response) => {

                    // Send Status 200 response
                    return res.status(200).json({
                        message: 'New Coffee created successfully!',
                        coffee: response
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
module.exports = CoffeeControllers