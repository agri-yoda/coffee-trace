// Import Models
const {
    Coffee,
    Project,
    User
} = require('../models')

// Coffee Service
const CoffeeService = {

    /**
     * Get coffee By ID
     * @param {*} coffeeId 
     * @returns 
     */
    async getCoffee(coffeeId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the coffee
                const coffee = await Coffee.findOne({
                        _id: coffeeId
                    })
                    .populate('_owner', '_id first_name last_name email role')

                // Resolve the promise
                resolve(coffee)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * Create a new Coffee
     * @param {*} coffee_name 
     * @returns 
     */
     async createCoffee(coffeeData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Create the Coffee
                const coffee = await Coffee.create(coffeeData)

                // Pushing the Coffee into user's schema
                await Project.findByIdAndUpdate(
                    coffee.origin._plantation,
                    { $push: { coffees: coffee } },
                    { upsert: true, new: true }
                )

                // Resolve the promise
                resolve(coffee)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * This function is responsible for updating a coffee details
     * @param {*} coffeeId 
     * @param {*} coffeeData 
     * @returns 
     */
    async updateCoffee(coffeeId, coffeeData) {
        return new Promise(async (resolve, reject) => {
            try {

                // Update the Coffee Data
                const coffee = await Coffee.findByIdAndUpdate(
                    coffeeId
                , {
                    $set: coffeeData
                }, {
                    upsert: true,
                    new: true
                })

                // Resolve the promise
                resolve(coffee)

            } catch (error) {

                // Catch the error and reject the promise
                reject({
                    error: error
                })
            }
        })
    },

    /**
     * This function is responsible for removing a coffee
     * @param {*} coffeeId
     * @returns 
     */
    async removeCoffee(coffeeId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Pulling from the Coffee into user's schema
                await Project.updateMany({}, {
                    $pull: {
                        coffees: {
                            _id: coffeeId
                        }
                    }
                }, {
                    multi: true
                })

                // Update the Coffee Data
                const coffee = await Coffee.findOneAndRemove({
                    _id: coffeeId
                })

                // Resolve the promise
                resolve(coffee)

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
module.exports = CoffeeService