// Import Models
const { Coffee, Project, User } = require('../models')

// Coffee Service
const CoffeeService = {

    /**
     * Get Coffee by Id
     * @param {*} coffeeId 
     * @returns 
     */
    async getCoffee(coffeeId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Find the Coffee
                const coffee = await Coffee.findOne({
                    _id: coffeeId
                })

                // Resolve the promise
                resolve(coffee)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },

    /**
     * Create a new coffee
     * @param {*} project_name 
     * @returns 
     */
     async createCoffee(data, requestUserId) {
        return new Promise(async (resolve, reject) => {
            try {

                // Project Data
                const coffeeData = {
                    _owner: requestUserId,
                    _project: data.projectId,
                    coffee_name: data.coffee_name,
                    coffee_botanical_variety: data.coffee_botanical_variety,
                    coffee_category: data.coffee_category,
                    coffee_description: data.coffee_description,
                    coffee_preparation_method: data.coffee_preparation_method,
                    coffee_sample_price: data.coffee_sample_price
                }

                // Create the coffee
                const coffee = await Coffee.create(coffeeData)

                // Update Project
                await Project.findOneAndUpdate(
                    { _id: data.projectId },
                    { $push: { coffees: coffee } },
                    { upsert: true }
                )

                // Resolve the promise
                resolve(coffee)

            } catch (error) {

                // Catch the error and reject the promise
                reject({ error: error })
            }
        })
    },
}

// Export Service
module.exports = CoffeeService