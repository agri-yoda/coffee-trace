// Mongoose Module
const mongoose = require('mongoose')

// Util Module
const util = require('util')

// Export Module
module.exports = {

    /**
     * This function is responsible for caching queries to redis store
     * @param {*} client 
     */
    cacheQuery(client) {

        // Ovewrite get method to return a promise
        client.hget = util.promisify(client.hget)

        // Save the default exec prototype method
        const exec = mongoose.Query.prototype.exec

        // Cache method flags he query to be cached
        mongoose.Query.prototype.cache = function (options = {}) {
            this.useCache = true
            this.hashKey = JSON.stringify(options.key || '')

            // Allow the method to be chainable
            return this
        }

        // Ovewrite the exec method with the caching strategy
        mongoose.Query.prototype.exec = async function () {
            try {
                // Check useCache flag
                if (!this.useCache) {
                    // If it's not set to use cache
                    return exec.apply(this, arguments)
                }

                // Create a new object to store the key
                const key = JSON.stringify(Object.assign({}, this.getQuery(), {
                    collection: this.mongooseCollection.name
                }))

                // Check if redis has a value for 'key'
                const cacheValue = await client.hget(this.hashKey, key)

                // If it has, return that
                if (cacheValue) {
                    const doc = JSON.parse(cacheValue)

                    // If doc is an array of records transform each element
                    // into a mongoose model object
                    return Array.isArray(doc) ? doc.map(d => new this.model(d))
                        // If doc is a single object, tranform it on a mongoose
                        // model object
                        : new this.model(doc)
                }

                // Otherwise, issue the query and store the result in redis
                const result = await exec.apply(this, arguments)

                client.hset(this.hashKey, key, JSON.stringify(result))

                return result
            } catch (err) {
                console.log(err)
            }
        }
    }
}

